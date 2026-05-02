# 🚀 Guia de Deploy — Blog Douro Mármores na Hostinger

## ⚠️ IMPORTANTE — Entenda como o /admin funciona

O endereço `#/admin` **NÃO é uma pasta** no servidor. É uma rota controlada pelo JavaScript dentro do `index.html`. Existe **UM ÚNICO arquivo** `index.html` que cuida de tudo:

```
douromarmores.com.br/blog/            → Blog público (index.html)
douromarmores.com.br/blog/#/admin     → Painel admin  (MESMO index.html)
douromarmores.com.br/blog/#/admin/posts → Posts      (MESMO index.html)
```

O símbolo `#` significa que tudo depois dele é processado pelo JavaScript, **não pelo servidor**. Então **não precisa criar pasta `/admin/`** — basta acessar o endereço.

---

## Visão geral da arquitetura

```
Sua Hostinger (douromarmores.com.br)
│
├── /blog/
│   ├── index.html                   → Blog público + Painel admin (1 arquivo!)
│   ├── .htaccess                    → Roteamento
│   ├── uploads/                     → Imagens dos posts
│   └── api/                         → PHP API (6 arquivos)
│       ├── config.php               → Conexão com MySQL
│       ├── install.php              → Criar tabelas + dados iniciais
│       ├── auth.php                 → Login / logout
│       ├── posts.php                → CRUD de posts
│       ├── categories.php           → CRUD de categorias
│       └── upload.php               → Upload de imagens
```

---

## PASSO 1 — Criar banco de dados MySQL

### 1.1 Acesse o painel da Hostinger

1. Entre em **hpanel.hostinger.com**
2. Clique no seu domínio **douromarmores.com.br**
3. No menu lateral, clique em **Bancos de dados**

### 1.2 Criar o banco

1. Clique em **Criar novo banco de dados**
2. Preencha:

| Campo | Valor |
|-------|-------|
| **Nome do banco** | `douromar_blog` |
| **Nome de usuário** | `douromar_admin` |
| **Senha** | Escolha uma senha forte e ANOTE ela |
| **Host** | `localhost` (padrão da Hostinger) |

3. Clique em **Criar**
4. ✅ **Anote** o nome do banco, usuário e senha — vai precisar no Passo 3

---

## PASSO 2 — Subir os arquivos para a Hostinger

### 2.1 Acessar o Gerenciador de Arquivos

1. No painel da Hostinger, clique em **Gerenciador de arquivos**
2. Navegue até a pasta `public_html`

### 2.2 Criar a pasta /blog/

1. Dentro de `public_html`, clique em **Nova pasta**
2. Nome: `blog`
3. Entre na pasta `blog`

### 2.3 Subir os arquivos PHP

1. Dentro da pasta `blog`, clique em **Nova pasta**
2. Nome: `api`
3. Entre na pasta `api`
4. Clique em **Upload** e suba os 6 arquivos PHP:
   - `config.php`
   - `install.php`
   - `auth.php`
   - `posts.php`
   - `categories.php`
   - `upload.php`

> 📁 Os arquivos PHP estão na pasta `php-api/` do projeto

### 2.4 Subir o blog React (dist/index.html)

1. Volte para a pasta `blog`
2. Clique em **Upload**
3. Suba o arquivo `dist/index.html`
4. Renomeie para `index.html` (se necessário)

### 2.5 Criar a pasta de uploads

1. Ainda na pasta `blog`
2. Clique em **Nova pasta**
3. Nome: `uploads`

---

## PASSO 3 — Configurar a conexão com o banco

### 3.1 Editar o config.php

1. No Gerenciador de arquivos, entre em `blog/api/`
2. Clique com o botão direito em `config.php` → **Editar**
3. Altere as 3 linhas com seus dados:

```php
define('DB_NAME', 'douromar_blog');        // Nome do banco (Passo 1)
define('DB_USER', 'douromar_admin');        // Usuário do banco (Passo 1)
define('DB_PASS', 'sua_senha_aqui');        // Senha que você anotou (Passo 1)
```

4. Clique em **Salvar**

---

## PASSO 4 — Criar o arquivo .htaccess

### 4.1 Criar o arquivo

1. Na pasta `blog`
2. Clique em **Novo arquivo**
3. Nome: `.htaccess`
4. Cole o conteúdo abaixo:

```apache
# Ativar reescrita de URL
RewriteEngine On

# ── Segurança ──────────────────────────────────
# Bloquear acesso direto a arquivos PHP sensíveis
<Files "config.php">
    Require all denied
</Files>

# ── API PHP ────────────────────────────────────
# Requisições para /blog/api/* vão para os arquivos PHP
RewriteRule ^api/(.*)$ api/$1 [L,QSA]

# ── Uploads ────────────────────────────────────
# Permitir acesso às imagens
RewriteRule ^uploads/(.*)$ uploads/$1 [L]

# ── SPA Routing (React) ────────────────────────
# Tudo que NÃO seja arquivo real vai para index.html
# Isso permite que /blog/admin funcione sem erro 404
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /blog/index.html [L,QSA]

# ── Cache de imagens ───────────────────────────
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# ── Compressão gzip ────────────────────────────
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>
```

5. Clique em **Salvar**

---

## PASSO 5 — Instalar o blog (criar tabelas + dados iniciais)

### 5.1 Rodar o instalador

1. Abra o navegador e acesse:
```
https://douromarmores.com.br/blog/api/install.php
```

2. Você verá uma resposta JSON como:
```json
{
  "success": true,
  "message": "Blog instalado com sucesso!",
  "admin_email": "admin@douromarmores.com.br",
  "admin_password": "Douro@2026"
}
```

3. ✅ **Anote o email e senha** — são suas credenciais de acesso ao painel!

### 5.2 DEPOIS de instalar, bloqueie o install.php

1. No Gerenciador de arquivos
2. Entre em `blog/api/`
3. Delete o arquivo `install.php` (OU renomeie para `install.php.bak`)

> ⚠️ Isso é importante para segurança — impede que alguém reinstale o blog

---

## PASSO 6 — Acessar o painel administrativo

### 6.1 Abrir o painel

1. Acesse no navegador:
```
https://douromarmores.com.br/blog/#/admin
```

2. Faça login com:
   - **Email:** `admin@douromarmores.com.br`
   - **Senha:** (a que apareceu no Passo 5)

### 6.2 Alterar a senha padrão

1. Após fazer login, vá em **⚙️ Configurações**
2. Altere a senha para uma senha forte pessoal
3. Salve

---

## PASSO 7 — Verificar se tudo funciona

### 7.1 Checklist final

| # | Teste | URL | Esperado |
|---|-------|-----|----------|
| 1 | Blog público | `douromarmores.com.br/blog` | Página inicial do blog com posts |
| 2 | Painel admin | `douromarmores.com.br/blog/#/admin` | Tela de login |
| 3 | API posts | `douromarmores.com.br/blog/api/posts.php` | Lista de posts em JSON |
| 4 | API categorias | `douromarmores.com.br/blog/api/categories.php` | Lista de categorias em JSON |
| 5 | Imagem de teste | Qualquer imagem em `/blog/uploads/` | Imagem carrega |

---

## 📝 Como usar no dia a dia

### Para criar um novo post:

1. Acesse `douromarmores.com.br/blog/#/admin`
2. Faça login
3. Clique em **📝 Posts → + Novo Post**
4. Preencha título, resumo, categoria, tags
5. Faça upload da imagem destacada
6. Escreva o conteúdo no editor
7. Clique em **Publicar**
8. ✅ O post aparece automaticamente no blog público!

### Para criar/editar categorias:

1. Acesse o painel admin
2. Clique em **📂 Categorias**
3. Crie, edite ou exclua categorias
4. Defina nome, ícone, cor e descrição

### Para alterar informações de contato:

1. Acesse o painel admin
2. Clique em **⚙️ Configurações**
3. Altere WhatsApp, telefone, redes sociais

---

## 🔧 Estrutura de arquivos no servidor (resumo)

```
public_html/
└── blog/
    ├── .htaccess                   ← Roteamento + cache + segurança
    ├── index.html                  ← Blog React (build)
    ├── uploads/                    ← Imagens dos posts
    │   ├── calacatta-carrara.jpg
    │   ├── cozinha-moderna.jpg
    │   └── ...
    └── api/
        ├── config.php              ← Conexão MySQL (EDITE COM SEUS DADOS)
        ├── auth.php                ← Login / logout
        ├── posts.php               ← CRUD de posts
        ├── categories.php          ← CRUD de categorias
        └── upload.php              ← Upload de imagens
        (install.php)               ← DELETE depois de instalar!
```

---

## ❓ Perguntas frequentes

### Como altero a senha do admin?
Acesse o painel → ⚙️ Configurações → Alterar senha

### Posso usar o blog sem o painel admin?
Sim! O blog mostra os dados de exemplo (fallback) quando não consegue conectar na API. Mas para adicionar novos posts, precisa do painel.

### As imagens ficam onde?
Na pasta `/blog/uploads/` no servidor. O upload é feito pelo painel admin.

### Preciso fazer deploy toda vez que escrevo um post?
**Não!** Você só escreve no painel admin e o post aparece automaticamente. Só precisa fazer deploy novamente se quiser mudar o **design** do blog.

### Como faço backup?
1. Painel da Hostinger → Backups
2. Ou exporte o banco MySQL pelo phpMyAdmin

### O blog funciona sem banco de dados?
Sim! Se a API estiver fora do ar, o blog mostra os dados estáticos de exemplo. Mas o painel admin precisa do banco para funcionar.

---

## 🔐 Segurança

- ✅ Senhas com hash bcrypt (nunca salvas em texto plano)
- ✅ Sessão PHP com `session_start()`
- ✅ `config.php` bloqueado de acesso direto
- ✅ `install.php` deve ser deletado após instalação
- ✅ Upload limitado a imagens (jpg, png, webp, gif)
- ✅ Tamanho máximo de upload: 10MB
- ✅ SQL com PDO prepared statements (proteção contra SQL injection)

---

## 📞 Suporte

Se tiver problemas:

1. Verifique se o banco MySQL está ativo na Hostinger
2. Verifique se `config.php` tem os dados corretos
3. Acesse `douromarmores.com.br/blog/api/posts.php` para ver se a API responde
4. Verifique se o `.htaccess` está correto
5. Verifique os logs de erro no painel da Hostinger
