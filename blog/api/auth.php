<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    if ($method === 'POST') {
        // LOGIN
        if ($action === 'login' || empty($action)) {
            $input = json_input();
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';

            if (!$email || !$password) {
                json_response(['error' => 'Preencha email e senha.'], 400);
            }

            $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
            $stmt->execute([$email]);
            $admin = $stmt->fetch();

            if (!$admin || !password_verify($password, $admin['password'])) {
                json_response(['error' => 'Email ou senha incorretos.'], 401);
            }

            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_name'] = $admin['name'];
            $_SESSION['admin_email'] = $admin['email'];

            json_response([
                'success' => true,
                'admin' => [
                    'id' => $admin['id'],
                    'name' => $admin['name'],
                    'email' => $admin['email']
                ]
            ]);
        }

        // ALTERAR SENHA
        if ($action === 'change-password') {
            $admin = require_auth();
            $input = json_input();
            $current = $input['current_password'] ?? '';
            $new = $input['new_password'] ?? '';

            if (strlen($new) < 6) {
                json_response(['error' => 'A nova senha deve ter pelo menos 6 caracteres.'], 400);
            }

            $stmt = $pdo->prepare("SELECT password FROM admins WHERE id = ?");
            $stmt->execute([$admin['id']]);
            $row = $stmt->fetch();

            if (!password_verify($current, $row['password'])) {
                json_response(['error' => 'Senha atual incorreta.'], 400);
            }

            $stmt = $pdo->prepare("UPDATE admins SET password = ? WHERE id = ?");
            $stmt->execute([password_hash($new, PASSWORD_DEFAULT), $admin['id']]);

            json_response(['success' => true, 'message' => 'Senha alterada com sucesso.']);
        }
    }

    if ($method === 'GET') {
        // CHECK AUTH
        if (empty($_SESSION['admin_id'])) {
            json_response(['authenticated' => false], 401);
        }
        json_response([
            'authenticated' => true,
            'admin' => [
                'id' => $_SESSION['admin_id'],
                'name' => $_SESSION['admin_name'] ?? 'Admin',
                'email' => $_SESSION['admin_email'] ?? ''
            ]
        ]);
    }

    if ($method === 'DELETE' || $action === 'logout') {
        session_destroy();
        json_response(['success' => true, 'message' => 'Logout realizado.']);
    }

} catch (Exception $e) {
    json_response(['error' => 'Erro: ' . $e->getMessage()], 500);
}
