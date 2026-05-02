<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id = intval($_GET['id'] ?? 0);

try {

// ==========================================
// LISTAR CATEGORIAS
// ==========================================
if ($method === 'GET' && !$id && $action !== 'counts') {
    $stmt = $pdo->query("SELECT c.*, 
        (SELECT COUNT(*) FROM posts WHERE category_id = c.id AND status = 'published') as post_count
        FROM categories c ORDER BY c.sort_order ASC, c.label ASC");
    $rows = $stmt->fetchAll();

    $categories = array_map(function($row) {
        return [
            'id' => intval($row['id']),
            'slug' => $row['slug'],
            'label' => $row['label'],
            'icon' => $row['icon'],
            'accent' => $row['accent'],
            'description' => $row['description'] ?? '',
            'sort_order' => intval($row['sort_order'] ?? 0),
            'count' => intval($row['post_count'] ?? 0)
        ];
    }, $rows);

    json_response([
        'success' => true,
        'categories' => $categories
    ]);
}

// ==========================================
// BUSCAR POR ID
// ==========================================
if ($method === 'GET' && $id) {
    $stmt = $pdo->prepare("SELECT c.*, 
        (SELECT COUNT(*) FROM posts WHERE category_id = c.id AND status = 'published') as post_count
        FROM categories c WHERE c.id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) json_response(['error' => 'Categoria não encontrada.'], 404);

    json_response([
        'success' => true,
        'category' => [
            'id' => intval($row['id']),
            'slug' => $row['slug'],
            'label' => $row['label'],
            'icon' => $row['icon'],
            'accent' => $row['accent'],
            'description' => $row['description'] ?? '',
            'sort_order' => intval($row['sort_order'] ?? 0),
            'count' => intval($row['post_count'] ?? 0)
        ]
    ]);
}

// ==========================================
// CRIAR CATEGORIA
// ==========================================
if ($method === 'POST' && $action === 'create') {
    require_auth();
    $input = json_input();

    $label = trim($input['label'] ?? '');
    if (!$label) json_response(['error' => 'Nome da categoria é obrigatório.'], 400);

    $slug = slugify($input['slug'] ?? $label, $pdo, 'categories');
    $maxOrder = $pdo->query("SELECT COALESCE(MAX(sort_order), 0) FROM categories")->fetchColumn();

    $stmt = $pdo->prepare("INSERT INTO categories (slug, label, icon, accent, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $slug,
        $label,
        $input['icon'] ?? 'fa-solid fa-folder',
        $input['accent'] ?? '#C8A961',
        $input['description'] ?? '',
        intval($input['sort_order'] ?? ($maxOrder + 1))
    ]);

    $newId = $pdo->lastInsertId();

    json_response([
        'success' => true,
        'message' => 'Categoria criada com sucesso!',
        'category' => [
            'id' => intval($newId),
            'slug' => $slug,
            'label' => $label
        ]
    ], 201);
}

// ==========================================
// ATUALIZAR CATEGORIA
// ==========================================
if ($method === 'POST' && $action === 'update' && $id) {
    require_auth();
    $input = json_input();

    $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) json_response(['error' => 'Categoria não encontrada.'], 404);

    $label = trim($input['label'] ?? $existing['label']);
    $slug = $input['slug'] ?? $existing['slug'];
    if (!empty($input['label']) && empty($input['slug'])) {
        $slug = slugify($input['label'], $pdo, 'categories', $id);
    }

    $stmt = $pdo->prepare("UPDATE categories SET slug = ?, label = ?, icon = ?, accent = ?, description = ?, sort_order = ? WHERE id = ?");
    $stmt->execute([
        $slug,
        $label,
        $input['icon'] ?? $existing['icon'],
        $input['accent'] ?? $existing['accent'],
        $input['description'] ?? $existing['description'],
        intval($input['sort_order'] ?? $existing['sort_order']),
        $id
    ]);

    json_response([
        'success' => true,
        'message' => 'Categoria atualizada com sucesso!'
    ]);
}

// ==========================================
// EXCLUIR CATEGORIA
// ==========================================
if ($method === 'POST' && $action === 'delete' && $id) {
    require_auth();

    $stmt = $pdo->prepare("SELECT c.*, (SELECT COUNT(*) FROM posts WHERE category_id = c.id) as post_count FROM categories c WHERE c.id = ?");
    $stmt->execute([$id]);
    $cat = $stmt->fetch();
    if (!$cat) json_response(['error' => 'Categoria não encontrada.'], 404);

    if (intval($cat['post_count']) > 0) {
        json_response(['error' => "Esta categoria tem {$cat['post_count']} post(s). Mova ou exclua os posts antes de excluir a categoria."], 400);
    }

    $pdo->prepare("DELETE FROM categories WHERE id = ?")->execute([$id]);

    json_response(['success' => true, 'message' => 'Categoria excluída com sucesso.']);
}

json_response(['error' => 'Ação não reconhecida.'], 400);

} catch (Exception $e) {
    json_response(['error' => 'Erro: ' . $e->getMessage()], 500);
}
