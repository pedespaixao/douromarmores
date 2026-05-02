<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');

// =============================================
// CONFIGURE SEUS DADOS DA HOSTINGER AQUI
// =============================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'u597380411_blog');       // Nome do banco (crie no cPanel)
define('DB_USER', 'u597380411_pedes');       // Usuário do banco
define('DB_PASS', '290931pedeS@');       // Senha do banco
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10MB

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão com o banco de dados: ' . $e->getMessage()]);
    exit;
}

// =============================================
// FUNÇÕES AUXILIARES
// =============================================

function json_response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function json_input() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

function require_auth() {
    if (empty($_SESSION['admin_id'])) {
        json_response(['error' => 'Não autorizado. Faça login novamente.'], 401);
    }
    return [
        'id' => $_SESSION['admin_id'],
        'name' => $_SESSION['admin_name'] ?? 'Admin',
        'email' => $_SESSION['admin_email'] ?? ''
    ];
}

function slugify($text, $pdo = null, $table = 'posts', $excludeId = null) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $slug = strtolower($text);

    if ($pdo && $table) {
        $original = $slug;
        $counter = 1;
        while (true) {
            $sql = "SELECT id FROM {$table} WHERE slug = ?";
            $params = [$slug];
            if ($excludeId) {
                $sql .= " AND id != ?";
                $params[] = $excludeId;
            }
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            if (!$stmt->fetch()) break;
            $slug = $original . '-' . $counter;
            $counter++;
        }
    }
    return $slug;
}

function upload_image($file) {
    if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
        return null;
    }
    if ($file['size'] > MAX_UPLOAD_SIZE) {
        return ['error' => 'Arquivo muito grande. Máximo 10MB.'];
    }
    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!in_array($file['type'], $allowed)) {
        return ['error' => 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP.'];
    }
    if (!is_dir(UPLOAD_DIR)) {
        mkdir(UPLOAD_DIR, 0755, true);
    }
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
    $filename = date('Y-m') . '/' . uniqid('img_') . '.' . $ext;
    $dir = dirname(UPLOAD_DIR . $filename);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $path = UPLOAD_DIR . $filename;
    if (move_uploaded_file($file['tmp_name'], $path)) {
        return ['url' => '/blog/uploads/' . $filename];
    }
    return ['error' => 'Erro ao salvar o arquivo.'];
}

function format_date($date) {
    if (!$date) return date('d M Y');
    $months = [
        '01'=>'jan','02'=>'fev','03'=>'mar','04'=>'abr','05'=>'mai','06'=>'jun',
        '07'=>'jul','08'=>'ago','09'=>'set','10'=>'out','11'=>'nov','12'=>'dez'
    ];
    $parts = explode('-', $date);
    if (count($parts) === 3) {
        return $parts[2] . ' ' . ($months[$parts[1]] ?? $parts[1]) . ' ' . $parts[0];
    }
    return $date;
}
