<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id = intval($_GET['id'] ?? 0);
$slug = $_GET['slug'] ?? '';
$admin = !empty($_GET['admin']);

try {

// ==========================================
// LISTAR POSTS
// ==========================================
if ($method === 'GET' && !$id && !$slug && $action !== 'stats') {
    $where = $admin ? "1=1" : "p.status = 'published'";
    $params = [];

    $categorySlug = $_GET['category'] ?? '';
    if ($categorySlug) {
        $where .= " AND c.slug = ?";
        $params[] = $categorySlug;
    }

    $search = $_GET['search'] ?? '';
    if ($search) {
        $where .= " AND (p.title LIKE ? OR p.excerpt LIKE ? OR p.tags LIKE ?)";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
    }

    $featured = $_GET['featured'] ?? '';
    if ($featured !== '') {
        $where .= " AND p.featured = ?";
        $params[] = intval($featured);
    }

    $page = max(1, intval($_GET['page'] ?? 1));
    $perPage = min(50, max(1, intval($_GET['per_page'] ?? 20)));
    $offset = ($page - 1) * $perPage;

    $countSql = "SELECT COUNT(*) FROM posts p JOIN categories c ON p.category_id = c.id WHERE {$where}";
    $stmt = $pdo->prepare($countSql);
    $stmt->execute($params);
    $total = intval($stmt->fetchColumn());

    $sql = "SELECT p.*, c.slug as category_slug, c.label as category_label, c.accent as category_accent, c.icon as category_icon
            FROM posts p
            JOIN categories c ON p.category_id = c.id
            WHERE {$where}
            ORDER BY p.featured DESC, p.iso_date DESC, p.created_at DESC
            LIMIT {$perPage} OFFSET {$offset}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $posts = array_map(function($row) {
        return format_post($row);
    }, $rows);

    json_response([
        'success' => true,
        'posts' => $posts,
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
        'total_pages' => ceil($total / $perPage)
    ]);
}

// ==========================================
// BUSCAR POST POR SLUG OU ID
// ==========================================
if ($method === 'GET' && ($id || $slug)) {
    if ($slug) {
        $stmt = $pdo->prepare("SELECT p.*, c.slug as category_slug, c.label as category_label, c.accent as category_accent, c.icon as category_icon
            FROM posts p JOIN categories c ON p.category_id = c.id WHERE p.slug = ?");
        $stmt->execute([$slug]);
    } else {
        $stmt = $pdo->prepare("SELECT p.*, c.slug as category_slug, c.label as category_label, c.accent as category_accent, c.icon as category_icon
            FROM posts p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
        $stmt->execute([$id]);
    }
    $row = $stmt->fetch();
    if (!$row) {
        json_response(['error' => 'Post não encontrado.'], 404);
    }

    // Incrementar views
    $pdo->prepare("UPDATE posts SET views = views + 1 WHERE id = ?")->execute([$row['id']]);

    json_response([
        'success' => true,
        'post' => format_post($row)
    ]);
}

// ==========================================
// CRIAR POST
// ==========================================
if ($method === 'POST' && $action === 'create') {
    $admin = require_auth();
    $input = json_input();

    $title = trim($input['title'] ?? '');
    if (!$title) json_response(['error' => 'Título é obrigatório.'], 400);

    $categoryId = intval($input['category_id'] ?? 0);
    if (!$categoryId) json_response(['error' => 'Categoria é obrigatória.'], 400);

    $slug = slugify($input['slug'] ?? $title, $pdo, 'posts');
    $isoDate = $input['iso_date'] ?? date('Y-m-d');
    $sections = $input['sections'] ?? [];
    $material = $input['material'] ?? null;
    $tags = $input['tags'] ?? [];
    $related = $input['related_posts'] ?? [];

    $stmt = $pdo->prepare("INSERT INTO posts
        (slug, title, excerpt, summary, category_id, iso_date, updated_date, reading_time, views, featured,
         image, image_alt, author_name, author_role, author_avatar, social_proof, tags, palette,
         status, sections, material, related_posts)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([
        $slug,
        $title,
        $input['excerpt'] ?? '',
        $input['summary'] ?? '',
        $categoryId,
        $isoDate,
        $input['updated_date'] ?? $isoDate,
        intval($input['reading_time'] ?? 5),
        intval($input['featured'] ?? 0),
        $input['image'] ?? '',
        $input['image_alt'] ?? '',
        $input['author_name'] ?? 'Equipe Douro Mármores',
        $input['author_role'] ?? 'Curadoria técnica em pedras naturais e superfícies premium',
        $input['author_avatar'] ?? '',
        $input['social_proof'] ?? '',
        is_array($tags) ? implode(',', $tags) : $tags,
        $input['palette'] ?? 'palette-default',
        $input['status'] ?? 'published',
        is_string($sections) ? $sections : json_encode($sections, JSON_UNESCAPED_UNICODE),
        $material ? (is_string($material) ? $material : json_encode($material, JSON_UNESCAPED_UNICODE)) : null,
        is_array($related) ? implode(',', $related) : $related
    ]);

    $newId = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT p.*, c.slug as category_slug, c.label as category_label FROM posts p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
    $stmt->execute([$newId]);

    json_response([
        'success' => true,
        'message' => 'Post criado com sucesso!',
        'post' => format_post($stmt->fetch())
    ], 201);
}

// ==========================================
// ATUALIZAR POST
// ==========================================
if ($method === 'POST' && $action === 'update' && $id) {
    $admin = require_auth();
    $input = json_input();

    $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) json_response(['error' => 'Post não encontrado.'], 404);

    $title = trim($input['title'] ?? $existing['title']);
    $slug = $input['slug'] ?? $existing['slug'];
    if (!empty($input['title']) && empty($input['slug'])) {
        $slug = slugify($input['title'], $pdo, 'posts', $id);
    }

    $sections = $input['sections'] ?? $existing['sections'];
    $material = array_key_exists('material', $input) ? $input['material'] : $existing['material'];
    $tags = $input['tags'] ?? $existing['tags'];
    $related = $input['related_posts'] ?? $existing['related_posts'];

    $stmt = $pdo->prepare("UPDATE posts SET
        slug = ?, title = ?, excerpt = ?, summary = ?, category_id = ?,
        iso_date = ?, updated_date = ?, reading_time = ?, featured = ?,
        image = ?, image_alt = ?, author_name = ?, author_role = ?, author_avatar = ?,
        social_proof = ?, tags = ?, palette = ?, status = ?,
        sections = ?, material = ?, related_posts = ?
        WHERE id = ?");

    $stmt->execute([
        $slug,
        $title,
        $input['excerpt'] ?? $existing['excerpt'],
        $input['summary'] ?? $existing['summary'],
        intval($input['category_id'] ?? $existing['category_id']),
        $input['iso_date'] ?? $existing['iso_date'],
        date('Y-m-d'),
        intval($input['reading_time'] ?? $existing['reading_time']),
        intval($input['featured'] ?? $existing['featured']),
        $input['image'] ?? $existing['image'],
        $input['image_alt'] ?? $existing['image_alt'],
        $input['author_name'] ?? $existing['author_name'],
        $input['author_role'] ?? $existing['author_role'],
        $input['author_avatar'] ?? $existing['author_avatar'],
        $input['social_proof'] ?? $existing['social_proof'],
        is_array($tags) ? implode(',', $tags) : $tags,
        $input['palette'] ?? $existing['palette'],
        $input['status'] ?? $existing['status'],
        is_string($sections) ? $sections : json_encode($sections, JSON_UNESCAPED_UNICODE),
        $material ? (is_string($material) ? $material : json_encode($material, JSON_UNESCAPED_UNICODE)) : null,
        is_array($related) ? implode(',', $related) : $related,
        $id
    ]);

    $stmt = $pdo->prepare("SELECT p.*, c.slug as category_slug, c.label as category_label FROM posts p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
    $stmt->execute([$id]);

    json_response([
        'success' => true,
        'message' => 'Post atualizado com sucesso!',
        'post' => format_post($stmt->fetch())
    ]);
}

// ==========================================
// EXCLUIR POST
// ==========================================
if ($method === 'POST' && $action === 'delete' && $id) {
    $admin = require_auth();

    $stmt = $pdo->prepare("SELECT id, image FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    if (!$post) json_response(['error' => 'Post não encontrado.'], 404);

    $pdo->prepare("DELETE FROM posts WHERE id = ?")->execute([$id]);

    json_response(['success' => true, 'message' => 'Post excluído com sucesso.']);
}

// ==========================================
// DASHBOARD STATS
// ==========================================
if ($method === 'GET' && $action === 'stats') {
    $require_auth_result = require_auth();

    $totalPosts = $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
    $publishedPosts = $pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'published'")->fetchColumn();
    $draftPosts = $pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'draft'")->fetchColumn();
    $totalViews = $pdo->query("SELECT COALESCE(SUM(views), 0) FROM posts")->fetchColumn();
    $totalCategories = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
    $featuredCount = $pdo->query("SELECT COUNT(*) FROM posts WHERE featured = 1")->fetchColumn();

    $topPosts = $pdo->query("SELECT id, title, views, status FROM posts ORDER BY views DESC LIMIT 5")->fetchAll();

    $recentPosts = $pdo->query("SELECT id, title, status, created_at FROM posts ORDER BY created_at DESC LIMIT 5")->fetchAll();

    json_response([
        'success' => true,
        'stats' => [
            'total_posts' => intval($totalPosts),
            'published_posts' => intval($publishedPosts),
            'draft_posts' => intval($draftPosts),
            'total_views' => intval($totalViews),
            'total_categories' => intval($totalCategories),
            'featured_posts' => intval($featuredCount),
            'top_posts' => $topPosts,
            'recent_posts' => $recentPosts
        ]
    ]);
}

json_response(['error' => 'Ação não reconhecida.'], 400);

} catch (Exception $e) {
    json_response(['error' => 'Erro: ' . $e->getMessage()], 500);
}

// ==========================================
// FUNÇÃO AUXILIAR
// ==========================================
function format_post($row) {
    $sections = $row['sections'];
    if (is_string($sections)) {
        $sections = json_decode($sections, true) ?: [];
    }

    $material = $row['material'];
    if (is_string($material)) {
        $material = json_decode($material, true);
    }

    $tags = $row['tags'];
    if (is_string($tags) && $tags) {
        $tags = explode(',', $tags);
    } else {
        $tags = [];
    }

    $related = $row['related_posts'];
    if (is_string($related) && $related) {
        $related = array_map('intval', explode(',', $related));
    } else {
        $related = [];
    }

    return [
        'id' => intval($row['id']),
        'slug' => $row['slug'],
        'title' => $row['title'],
        'excerpt' => $row['excerpt'] ?? '',
        'summary' => $row['summary'] ?? '',
        'category_id' => intval($row['category_id']),
        'category_slug' => $row['category_slug'] ?? '',
        'category_label' => $row['category_label'] ?? '',
        'category_accent' => $row['category_accent'] ?? '#C8A961',
        'category_icon' => $row['category_icon'] ?? 'fa-solid fa-folder',
        'date' => format_date($row['iso_date']),
        'iso_date' => $row['iso_date'],
        'updated_date' => $row['updated_date'] ?? $row['iso_date'],
        'reading_time' => intval($row['reading_time'] ?? 5),
        'views' => intval($row['views'] ?? 0),
        'featured' => intval($row['featured'] ?? 0) === 1,
        'image' => $row['image'] ?? '',
        'image_alt' => $row['image_alt'] ?? '',
        'author_name' => $row['author_name'] ?? 'Equipe Douro Mármores',
        'author_role' => $row['author_role'] ?? '',
        'author_avatar' => $row['author_avatar'] ?? '',
        'social_proof' => $row['social_proof'] ?? '',
        'tags' => $tags,
        'palette' => $row['palette'] ?? 'palette-default',
        'status' => $row['status'] ?? 'published',
        'sections' => $sections,
        'material' => $material,
        'related_posts' => $related,
        'created_at' => $row['created_at'] ?? ''
    ];
}
