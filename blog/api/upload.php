<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Método não permitido. Use POST.'], 405);
}

// Auth required for upload
$admin = require_auth();

try {
    if (empty($_FILES['image'])) {
        json_response(['error' => 'Nenhum arquivo enviado. Use o campo "image".'], 400);
    }

    $file = $_FILES['image'];
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'Arquivo excede o limite do servidor.',
            UPLOAD_ERR_FORM_SIZE => 'Arquivo excede o limite do formulário.',
            UPLOAD_ERR_PARTIAL => 'Upload incompleto.',
            UPLOAD_ERR_NO_FILE => 'Nenhum arquivo enviado.',
        ];
        json_response(['error' => $errors[$file['error']] ?? 'Erro no upload.'], 400);
    }

    $result = upload_image($file);
    
    if (isset($result['error'])) {
        json_response(['error' => $result['error']], 400);
    }

    json_response([
        'success' => true,
        'url' => $result['url'],
        'message' => 'Imagem enviada com sucesso!'
    ]);

} catch (Exception $e) {
    json_response(['error' => 'Erro no upload: ' . $e->getMessage()], 500);
}
