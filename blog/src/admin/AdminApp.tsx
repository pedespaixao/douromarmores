import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '../lib/api';

/* ────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────── */

type AdminPage = 'dashboard' | 'posts' | 'posts-new' | 'posts-edit' | 'categories' | 'settings';

type ApiCategory = {
  id: number;
  slug: string;
  label: string;
  icon: string;
  accent: string;
  description: string;
  sort_order: number;
  count: number;
};

type ApiPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  category_id: number;
  category_slug: string;
  category_label: string;
  category_accent: string;
  date: string;
  iso_date: string;
  updated_date: string;
  reading_time: number;
  views: number;
  featured: boolean;
  image: string;
  image_alt: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  social_proof: string;
  tags: string[];
  palette: string;
  status: string;
  sections: SectionData[];
  material: MaterialData | null;
  related_posts: number[];
  created_at: string;
};

type SectionData = {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: BlockData[];
};

type BlockData =
  | { type: 'paragraph'; content: string[] }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; title: string; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'subsection'; id: string; title: string; content: string[] }
  | { type: 'table'; title: string; columns: string[]; rows: string[][] }
  | { type: 'specs'; title: string; items: { label: string; value: string }[] }
  | { type: 'gallery'; title: string; images: { src: string; alt: string; caption: string }[] }
  | { type: 'quote'; content: string; author: string };

type MaterialData = {
  name: string;
  origin: string;
  classification: string;
  mohs: string;
  absorption: string;
  uses: string;
  finishes: string;
  price: string;
  ctaLabel: string;
};

/* ────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────── */

function uid() {
  return 's' + Math.random().toString(36).slice(2, 8);
}

function emptySection(): SectionData {
  return { id: uid(), title: '', level: 2, blocks: [{ type: 'paragraph', content: [''] }] };
}

function emptyPost(): Partial<ApiPost> {
  return {
    title: '',
    excerpt: '',
    summary: '',
    category_id: 0,
    iso_date: new Date().toISOString().split('T')[0],
    reading_time: 5,
    featured: false,
    image: '',
    image_alt: '',
    tags: [],
    palette: 'palette-default',
    status: 'draft',
    sections: [emptySection()],
    material: null,
    related_posts: [],
  };
}

const PALETTE_OPTIONS = [
  { value: 'palette-default', label: 'Padrão' },
  { value: 'palette-marble', label: 'Mármore' },
  { value: 'palette-kitchen', label: 'Cozinha' },
  { value: 'palette-bath', label: 'Banheiro' },
  { value: 'palette-taj', label: 'Taj Mahal' },
  { value: 'palette-black', label: 'Preto' },
  { value: 'palette-porcelain', label: 'Porcelanato' },
  { value: 'palette-white', label: 'Branco' },
  { value: 'palette-gourmet', label: 'Gourmet' },
  { value: 'palette-project', label: 'Projeto' },
];

const ICON_OPTIONS = [
  'fa-regular fa-gem',
  'fa-solid fa-mountain',
  'fa-solid fa-fire-flame-curved',
  'fa-regular fa-square',
  'fa-regular fa-star',
  'fa-solid fa-sparkles',
  'fa-solid fa-ruler-combined',
  'fa-regular fa-folder-open',
  'fa-solid fa-compass-drafting',
  'fa-solid fa-border-all',
  'fa-solid fa-paint-roller',
  'fa-solid fa-house',
  'fa-solid fa-kitchen-set',
  'fa-solid fa-bath',
  'fa-solid fa-hammer',
  'fa-solid fa-leaf',
];

/* ────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────── */

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');
  const [page, setPage] = useState<AdminPage>('dashboard');
  const [editPostId, setEditPostId] = useState<number | null>(null);

  // Check session on mount
  useEffect(() => {
    api.checkAuth().then((data) => {
      if (data.authenticated) {
        setLoggedIn(true);
        setAdminName(data.admin.name);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Parse hash for navigation
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (hash.includes('/posts/new')) setPage('posts-new');
      else if (hash.includes('/posts/edit')) {
        const match = hash.match(/\/posts\/edit\/(\d+)/);
        if (match) { setEditPostId(Number(match[1])); setPage('posts-edit'); }
      }
      else if (hash.includes('/posts')) setPage('posts');
      else if (hash.includes('/categories')) setPage('categories');
      else if (hash.includes('/settings')) setPage('settings');
      else setPage('dashboard');
    };
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigate = (p: AdminPage, postId?: number) => {
    const routes: Record<AdminPage, string> = {
      dashboard: '#/admin',
      posts: '#/admin/posts',
      'posts-new': '#/admin/posts/new',
      'posts-edit': `#/admin/posts/edit/${postId ?? ''}`,
      categories: '#/admin/categories',
      settings: '#/admin/settings',
    };
    if (p === 'posts-edit' && postId) setEditPostId(postId);
    window.location.hash = routes[p];
  };

  const handleLogin = async (email: string, password: string) => {
    const data = await api.login(email, password);
    if (data.success) {
      setLoggedIn(true);
      setAdminName(data.admin.name);
    }
    return data;
  };

  const handleLogout = async () => {
    await api.logout();
    setLoggedIn(false);
    setAdminName('');
    window.location.hash = '#/admin';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f1629' }}>
        <div style={{ textAlign: 'center', color: '#c9a961' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32 }} />
          <p style={{ marginTop: 16 }}>Carregando painel...</p>
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <strong><span style={{ color: '#c9a961' }}>DOURO</span> ADMIN</strong>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-link ${page === 'dashboard' ? 'is-active' : ''}`} onClick={() => navigate('dashboard')}>
            <i className="fa-solid fa-chart-line" /> Dashboard
          </button>
          <button className={`admin-nav-link ${page === 'posts' || page === 'posts-new' || page === 'posts-edit' ? 'is-active' : ''}`} onClick={() => navigate('posts')}>
            <i className="fa-solid fa-newspaper" /> Posts
          </button>
          <button className={`admin-nav-link ${page === 'categories' ? 'is-active' : ''}`} onClick={() => navigate('categories')}>
            <i className="fa-solid fa-layer-group" /> Categorias
          </button>
          <button className={`admin-nav-link ${page === 'settings' ? 'is-active' : ''}`} onClick={() => navigate('settings')}>
            <i className="fa-solid fa-gear" /> Configurações
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-nav-link" onClick={() => { window.location.hash = ''; window.location.reload(); }}>
            <i className="fa-solid fa-eye" /> Ver Blog
          </button>
          <button className="admin-nav-link" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" /> Sair
          </button>
          <div className="admin-user-badge">{adminName}</div>
        </div>
      </aside>
      <main className="admin-main">
        {page === 'dashboard' && <DashboardPage />}
        {page === 'posts' && <PostsPage onEdit={(id) => navigate('posts-edit', id)} onNew={() => navigate('posts-new')} />}
        {page === 'posts-new' && <PostEditorPage onBack={() => navigate('posts')} />}
        {page === 'posts-edit' && editPostId && <PostEditorPage postId={editPostId} onBack={() => navigate('posts')} />}
        {page === 'categories' && <CategoriesPage />}
        {page === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────
   LOGIN SCREEN
   ──────────────────────────────────────────── */

function LoginScreen({ onLogin }: { onLogin: (e: string, p: string) => Promise<any> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await onLogin(email, password);
      if (!data.success) setError(data.error || 'Erro ao fazer login.');
    } catch (err: any) {
      setError(err.message || 'Erro de conexão.');
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <strong><span style={{ color: '#c9a961' }}>DOURO</span> MÁRMORES</strong>
          <span className="admin-login-subtitle">Painel Administrativo</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@douromarmores.com.br" required />
          </div>
          <div className="admin-field">
            <label>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" required />
          </div>
          {error && <div className="admin-alert admin-alert-error">{error}</div>}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
            {submitting ? <><i className="fa-solid fa-spinner fa-spin" /> Entrando...</> : 'Entrar'}
          </button>
        </form>
        <p className="admin-login-hint">Primeiro acesso? Rode <code>/blog/api/install.php</code> no navegador para configurar.</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   DASHBOARD
   ──────────────────────────────────────────── */

function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchStats().then((data) => {
      if (data.success) setStats(data.stats);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLoader />;

  return (
    <div className="admin-page">
      <AdminHeader title="Dashboard" subtitle="Visão geral do blog" />
      {stats ? (
        <>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <i className="fa-solid fa-newspaper" />
              <strong>{stats.total_posts}</strong>
              <span>Total de posts</span>
            </div>
            <div className="admin-stat-card">
              <i className="fa-solid fa-circle-check" />
              <strong>{stats.published_posts}</strong>
              <span>Publicados</span>
            </div>
            <div className="admin-stat-card">
              <i className="fa-solid fa-file-pen" />
              <strong>{stats.draft_posts}</strong>
              <span>Rascunhos</span>
            </div>
            <div className="admin-stat-card">
              <i className="fa-solid fa-eye" />
              <strong>{new Intl.NumberFormat('pt-BR').format(stats.total_views)}</strong>
              <span>Visualizações</span>
            </div>
            <div className="admin-stat-card">
              <i className="fa-solid fa-layer-group" />
              <strong>{stats.total_categories}</strong>
              <span>Categorias</span>
            </div>
            <div className="admin-stat-card">
              <i className="fa-solid fa-star" />
              <strong>{stats.featured_posts}</strong>
              <span>Destaque</span>
            </div>
          </div>

          <div className="admin-grid-2">
            <div className="admin-card">
              <h3><i className="fa-solid fa-trophy" /> Mais lidos</h3>
              <div className="admin-list">
                {stats.top_posts?.map((post: any, i: number) => (
                  <div key={post.id} className="admin-list-item">
                    <span className="admin-list-rank">#{i + 1}</span>
                    <div className="admin-list-body">
                      <strong>{post.title}</strong>
                      <small>{new Intl.NumberFormat('pt-BR').format(post.views)} visualizações</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-card">
              <h3><i className="fa-solid fa-clock" /> Recentes</h3>
              <div className="admin-list">
                {stats.recent_posts?.map((post: any) => (
                  <div key={post.id} className="admin-list-item">
                    <span className={`admin-badge ${post.status === 'published' ? 'admin-badge-green' : 'admin-badge-yellow'}`}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                    <div className="admin-list-body">
                      <strong>{post.title}</strong>
                      <small>{new Date(post.created_at).toLocaleDateString('pt-BR')}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="admin-alert admin-alert-warning">
          Não foi possível carregar as estatísticas. Verifique a conexão com a API.
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   POSTS PAGE
   ──────────────────────────────────────────── */

function PostsPage({ onEdit, onNew }: { onEdit: (id: number) => void; onNew: () => void }) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  const loadPosts = useCallback(() => {
    setLoading(true);
    api.fetchPosts({ admin: true }).then((data) => {
      if (data.success) setPosts(data.posts);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return;
    setDeleting(id);
    try {
      await api.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
    setDeleting(null);
  };

  const filtered = posts.filter((p) => {
    if (filterStatus && p.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.tags?.some((t) => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="admin-page">
      <AdminHeader title="Posts" subtitle={`${posts.length} post(s) no total`}>
        <button className="admin-btn admin-btn-primary" onClick={onNew}>
          <i className="fa-solid fa-plus" /> Novo Post
        </button>
      </AdminHeader>

      <div className="admin-toolbar">
        <div className="admin-search-box">
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Buscar por título ou tag..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="admin-select">
          <option value="">Todos os status</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>
      </div>

      {loading ? <AdminLoader /> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 64 }}></th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Views</th>
                <th>Data</th>
                <th style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="admin-empty">Nenhum post encontrado.</td></tr>
              ) : filtered.map((post) => (
                <tr key={post.id}>
                  <td>
                    {post.image ? <img src={post.image} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder"><i className="fa-solid fa-image" /></div>}
                  </td>
                  <td>
                    <strong>{post.title}</strong>
                    {post.featured && <span className="admin-badge admin-badge-gold" style={{ marginLeft: 8 }}>★ Destaque</span>}
                  </td>
                  <td><span className="admin-badge" style={{ background: post.category_accent || '#666', color: '#fff' }}>{post.category_label}</span></td>
                  <td><span className={`admin-badge ${post.status === 'published' ? 'admin-badge-green' : 'admin-badge-yellow'}`}>{post.status === 'published' ? 'Publicado' : 'Rascunho'}</span></td>
                  <td>{new Intl.NumberFormat('pt-BR').format(post.views)}</td>
                  <td>{post.iso_date ? new Date(post.iso_date).toLocaleDateString('pt-BR') : '—'}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-sm" onClick={() => onEdit(post.id)} title="Editar">
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className="admin-btn-sm admin-btn-danger" onClick={() => handleDelete(post.id, post.title)} disabled={deleting === post.id} title="Excluir">
                        <i className={`fa-solid ${deleting === post.id ? 'fa-spinner fa-spin' : 'fa-trash'}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   POST EDITOR
   ──────────────────────────────────────────── */

function PostEditorPage({ postId, onBack }: { postId?: number; onBack: () => void }) {
  const [post, setPost] = useState<Partial<ApiPost>>(emptyPost());
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [allPosts, setAllPosts] = useState<ApiPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!postId);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.fetchCategories().then((d) => { if (d.success) setCategories(d.categories); }).catch(() => {});
    api.fetchPosts({ admin: true, perPage: 50 }).then((d) => { if (d.success) setAllPosts(d.posts); }).catch(() => {});
    if (postId) {
      api.fetchPostById(postId).then((d) => {
        if (d.success) {
          const p = d.post;
          setPost({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags : [],
            sections: Array.isArray(p.sections) ? p.sections : [],
            related_posts: Array.isArray(p.related_posts) ? p.related_posts : [],
          });
        }
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [postId]);

  const update = (field: string, value: any) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.uploadImage(file);
      if (result.success && result.url) {
        update('image', result.url);
      } else {
        setMessage({ type: 'error', text: result.error || 'Erro no upload.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
    setUploading(false);
  };

  const handleSave = async (status?: string) => {
    if (!post.title?.trim()) { setMessage({ type: 'error', text: 'Título é obrigatório.' }); return; }
    if (!post.category_id) { setMessage({ type: 'error', text: 'Selecione uma categoria.' }); return; }
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        ...post,
        status: status || post.status || 'draft',
        tags: Array.isArray(post.tags) ? post.tags.join(',') : post.tags,
        related_posts: Array.isArray(post.related_posts) ? post.related_posts.join(',') : post.related_posts,
      };
      if (postId) {
        const data = await api.updatePost(postId, payload);
        if (data.success) setMessage({ type: 'success', text: 'Post atualizado com sucesso!' });
        else setMessage({ type: 'error', text: data.error || 'Erro ao atualizar.' });
      } else {
        const data = await api.createPost(payload);
        if (data.success) {
          setMessage({ type: 'success', text: 'Post criado com sucesso!' });
          setTimeout(() => onBack(), 1200);
        } else setMessage({ type: 'error', text: data.error || 'Erro ao criar.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  if (loading) return <AdminLoader />;

  return (
    <div className="admin-page">
      <AdminHeader title={postId ? 'Editar Post' : 'Novo Post'} onBack={onBack}>
        <div className="admin-header-actions">
          <button className="admin-btn" onClick={() => handleSave('draft')} disabled={saving}>
            <i className="fa-solid fa-floppy-disk" /> Salvar rascunho
          </button>
          <button className="admin-btn admin-btn-primary" onClick={() => handleSave('published')} disabled={saving}>
            {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-paper-plane" />}
            Publicar
          </button>
        </div>
      </AdminHeader>

      {message && <div className={`admin-alert ${message.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>{message.text}</div>}

      <div className="admin-editor-grid">
        {/* Main content */}
        <div className="admin-editor-main">
          <div className="admin-card">
            <div className="admin-field">
              <label>Título do artigo *</label>
              <input type="text" value={post.title || ''} onChange={(e) => update('title', e.target.value)} placeholder="Ex: Mármore Calacatta vs Carrara: qual escolher?" className="admin-input-lg" />
            </div>
            <div className="admin-field">
              <label>Resumo curto (excerpt)</label>
              <textarea value={post.excerpt || ''} onChange={(e) => update('excerpt', e.target.value)} placeholder="Um parágrafo que aparece nos cards do blog..." rows={3} />
            </div>
            <div className="admin-field">
              <label>Resumo expandido (summary)</label>
              <textarea value={post.summary || ''} onChange={(e) => update('summary', e.target.value)} placeholder="Resumo mais detalhado que aparece no hero do artigo..." rows={2} />
            </div>
          </div>

          {/* Sections / Blocks editor */}
          <div className="admin-card">
            <h3><i className="fa-solid fa-layer-group" /> Seções do Artigo</h3>
            <p className="admin-help">Adicione seções para organizar o conteúdo. Cada seção contém blocos (parágrafos, listas, tabelas, etc.).</p>

            {(post.sections || []).map((section, si) => (
              <SectionEditor
                key={section.id}
                section={section}
                onChange={(updated) => {
                  const sections = [...(post.sections || [])];
                  sections[si] = updated;
                  update('sections', sections);
                }}
                onRemove={() => {
                  const sections = (post.sections || []).filter((_, i) => i !== si);
                  update('sections', sections);
                }}
              />
            ))}

            <button className="admin-btn admin-btn-outline" onClick={() => update('sections', [...(post.sections || []), emptySection()])}>
              <i className="fa-solid fa-plus" /> Adicionar seção
            </button>
          </div>

          {/* Material specs */}
          <div className="admin-card">
            <h3><i className="fa-solid fa-gem" /> Ficha Técnica do Material (opcional)</h3>
            <label className="admin-toggle-label">
              <input type="checkbox" checked={!!post.material} onChange={(e) => update('material', e.target.checked ? {
                name: '', origin: '', classification: '', mohs: '', absorption: '', uses: '', finishes: '', price: '', ctaLabel: 'Solicitar orçamento deste material',
              } : null)} />
              Incluir ficha técnica
            </label>
            {post.material && (
              <div className="admin-grid-2" style={{ marginTop: 16 }}>
                <div className="admin-field"><label>Nome</label><input value={post.material.name} onChange={(e) => update('material', { ...post.material!, name: e.target.value })} /></div>
                <div className="admin-field"><label>Origem</label><input value={post.material.origin} onChange={(e) => update('material', { ...post.material!, origin: e.target.value })} /></div>
                <div className="admin-field"><label>Classificação</label><input value={post.material.classification} onChange={(e) => update('material', { ...post.material!, classification: e.target.value })} /></div>
                <div className="admin-field"><label>Dureza Mohs</label><input value={post.material.mohs} onChange={(e) => update('material', { ...post.material!, mohs: e.target.value })} /></div>
                <div className="admin-field"><label>Absorção</label><input value={post.material.absorption} onChange={(e) => update('material', { ...post.material!, absorption: e.target.value })} /></div>
                <div className="admin-field"><label>Usos recomendados</label><input value={post.material.uses} onChange={(e) => update('material', { ...post.material!, uses: e.target.value })} /></div>
                <div className="admin-field"><label>Acabamentos</label><input value={post.material.finishes} onChange={(e) => update('material', { ...post.material!, finishes: e.target.value })} /></div>
                <div className="admin-field"><label>Faixa de preço</label><input value={post.material.price} onChange={(e) => update('material', { ...post.material!, price: e.target.value })} placeholder="$$$$" /></div>
                <div className="admin-field" style={{ gridColumn: '1 / -1' }}><label>Texto do botão CTA</label><input value={post.material.ctaLabel} onChange={(e) => update('material', { ...post.material!, ctaLabel: e.target.value })} /></div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="admin-editor-sidebar">
          <div className="admin-card">
            <h3>Imagem destacada</h3>
            {post.image ? (
              <div className="admin-image-preview">
                <img src={post.image} alt="Preview" />
                <button className="admin-btn-sm admin-btn-danger" onClick={() => update('image', '')}><i className="fa-solid fa-xmark" /> Remover</button>
              </div>
            ) : (
              <div className="admin-upload-area" onClick={() => fileInputRef.current?.click()}>
                {uploading ? <i className="fa-solid fa-spinner fa-spin" /> : <>
                  <i className="fa-solid fa-cloud-arrow-up" />
                  <span>Clique para enviar imagem</span>
                </>}
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} hidden />
            <div className="admin-field" style={{ marginTop: 12 }}>
              <label>Texto alternativo</label>
              <input value={post.image_alt || ''} onChange={(e) => update('image_alt', e.target.value)} placeholder="Descreva a imagem..." />
            </div>
            <div className="admin-field">
              <label>Ou cole URL da imagem</label>
              <input value={post.image || ''} onChange={(e) => update('image', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="admin-card">
            <h3>Categoria *</h3>
            <select value={post.category_id || ''} onChange={(e) => update('category_id', Number(e.target.value))} className="admin-select">
              <option value="">Selecione...</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
            </select>
          </div>

          <div className="admin-card">
            <h3>Tags</h3>
            <input value={Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')} onChange={(e) => update('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} placeholder="mármore, cozinha, design" />
            <small className="admin-help">Separadas por vírgula</small>
          </div>

          <div className="admin-card">
            <h3>Posts relacionados</h3>
            <div className="admin-related-list">
              {allPosts.filter((p) => p.id !== postId).map((p) => (
                <label key={p.id} className="admin-checkbox-label">
                  <input type="checkbox" checked={(post.related_posts || []).includes(p.id)} onChange={(e) => {
                    const related = e.target.checked
                      ? [...(post.related_posts || []), p.id]
                      : (post.related_posts || []).filter((id) => id !== p.id);
                    update('related_posts', related);
                  }} />
                  <span>{p.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h3>Configurações</h3>
            <div className="admin-field">
              <label>Data de publicação</label>
              <input type="date" value={post.iso_date || ''} onChange={(e) => update('iso_date', e.target.value)} />
            </div>
            <div className="admin-field">
              <label>Tempo de leitura (min)</label>
              <input type="number" min={1} max={30} value={post.reading_time || 5} onChange={(e) => update('reading_time', Number(e.target.value))} />
            </div>
            <div className="admin-field">
              <label>Paleta</label>
              <select value={post.palette || 'palette-default'} onChange={(e) => update('palette', e.target.value)} className="admin-select">
                {PALETTE_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <label className="admin-toggle-label">
              <input type="checkbox" checked={!!post.featured} onChange={(e) => update('featured', e.target.checked)} />
              Post em destaque
            </label>
            <label className="admin-toggle-label">
              <input type="checkbox" checked={post.status === 'published'} onChange={(e) => update('status', e.target.checked ? 'published' : 'draft')} />
              Publicado
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SECTION EDITOR
   ──────────────────────────────────────────── */

function SectionEditor({ section, onChange, onRemove }: { section: SectionData; onChange: (s: SectionData) => void; onRemove: () => void }) {
  const updateBlock = (index: number, block: BlockData) => {
    const blocks = [...section.blocks];
    blocks[index] = block;
    onChange({ ...section, blocks });
  };

  const addBlock = (type: BlockData['type']) => {
    let block: BlockData;
    switch (type) {
      case 'paragraph': block = { type: 'paragraph', content: [''] }; break;
      case 'callout': block = { type: 'callout', variant: 'tip', title: '', content: '' }; break;
      case 'list': block = { type: 'list', items: [''] }; break;
      case 'subsection': block = { type: 'subsection', id: uid(), title: '', content: [''] }; break;
      case 'table': block = { type: 'table', title: '', columns: ['Coluna 1', 'Coluna 2'], rows: [['', '']] }; break;
      case 'specs': block = { type: 'specs', title: 'Ficha técnica', items: [{ label: '', value: '' }] }; break;
      case 'gallery': block = { type: 'gallery', title: '', images: [{ src: '', alt: '', caption: '' }] }; break;
      case 'quote': block = { type: 'quote', content: '', author: '' }; break;
      default: block = { type: 'paragraph', content: [''] };
    }
    onChange({ ...section, blocks: [...section.blocks, block] });
  };

  const removeBlock = (index: number) => {
    onChange({ ...section, blocks: section.blocks.filter((_, i) => i !== index) });
  };

  return (
    <div className="admin-section-block">
      <div className="admin-section-header">
        <div className="admin-field" style={{ flex: 1 }}>
          <input value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Título da seção (H2)" className="admin-input-lg" />
        </div>
        <select value={section.level} onChange={(e) => onChange({ ...section, level: Number(e.target.value) as 2 | 3 })} className="admin-select" style={{ width: 80 }}>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
        </select>
        <button className="admin-btn-sm admin-btn-danger" onClick={onRemove} title="Remover seção">
          <i className="fa-solid fa-trash" />
        </button>
      </div>

      {section.blocks.map((block, bi) => (
        <BlockEditor key={bi} block={block} onChange={(b) => updateBlock(bi, b)} onRemove={() => removeBlock(bi)} />
      ))}

      <div className="admin-add-block">
        <span>Adicionar bloco:</span>
        <button onClick={() => addBlock('paragraph')}>📝 Parágrafo</button>
        <button onClick={() => addBlock('callout')}>💡 Callout</button>
        <button onClick={() => addBlock('list')}>📋 Lista</button>
        <button onClick={() => addBlock('subsection')}>📑 Subseção</button>
        <button onClick={() => addBlock('table')}>📊 Tabela</button>
        <button onClick={() => addBlock('specs')}>📐 Ficha técnica</button>
        <button onClick={() => addBlock('gallery')}>🖼️ Galeria</button>
        <button onClick={() => addBlock('quote')}>❝ Citação</button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   BLOCK EDITOR
   ──────────────────────────────────────────── */

function BlockEditor({ block, onChange, onRemove }: { block: BlockData; onChange: (b: BlockData) => void; onRemove: () => void }) {
  const typeLabels: Record<string, string> = {
    paragraph: '📝 Parágrafo',
    callout: '💡 Callout',
    list: '📋 Lista',
    subsection: '📑 Subseção',
    table: '📊 Tabela',
    specs: '📐 Ficha técnica',
    gallery: '🖼️ Galeria',
    quote: '❝ Citação',
  };

  return (
    <div className="admin-block-editor">
      <div className="admin-block-header">
        <span className="admin-block-type">{typeLabels[block.type] || block.type}</span>
        <button className="admin-btn-sm admin-btn-danger" onClick={onRemove} title="Remover bloco">
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="admin-block-content">
        {block.type === 'paragraph' && (
          <>
            {block.content.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <textarea value={text} onChange={(e) => {
                  const content = [...block.content];
                  content[i] = e.target.value;
                  onChange({ ...block, content });
                }} placeholder="Escreva o parágrafo..." rows={3} style={{ flex: 1 }} />
                {block.content.length > 1 && (
                  <button className="admin-btn-sm admin-btn-danger" onClick={() => {
                    const content = block.content.filter((_, j) => j !== i);
                    onChange({ ...block, content });
                  }}><i className="fa-solid fa-minus" /></button>
                )}
              </div>
            ))}
            <button className="admin-btn-sm" onClick={() => onChange({ ...block, content: [...block.content, ''] })}>
              <i className="fa-solid fa-plus" /> Parágrafo
            </button>
          </>
        )}

        {block.type === 'callout' && (
          <>
            <div className="admin-field">
              <label>Variante</label>
              <select value={block.variant} onChange={(e) => onChange({ ...block, variant: e.target.value as any })} className="admin-select">
                <option value="tip">💡 Dica</option>
                <option value="warning">⚠️ Atenção</option>
                <option value="info">ℹ️ Informação</option>
              </select>
            </div>
            <div className="admin-field">
              <label>Título</label>
              <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} placeholder="Ex: Dica da Douro" />
            </div>
            <div className="admin-field">
              <label>Conteúdo</label>
              <textarea value={block.content} onChange={(e) => onChange({ ...block, content: e.target.value })} rows={3} />
            </div>
          </>
        )}

        {block.type === 'list' && (
          <>
            {block.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#8a93a0', paddingTop: 10 }}>•</span>
                <input value={item} onChange={(e) => {
                  const items = [...block.items];
                  items[i] = e.target.value;
                  onChange({ ...block, items });
                }} placeholder="Item da lista" style={{ flex: 1 }} />
                {block.items.length > 1 && (
                  <button className="admin-btn-sm admin-btn-danger" onClick={() => {
                    onChange({ ...block, items: block.items.filter((_, j) => j !== i) });
                  }}><i className="fa-solid fa-minus" /></button>
                )}
              </div>
            ))}
            <button className="admin-btn-sm" onClick={() => onChange({ ...block, items: [...block.items, ''] })}>
              <i className="fa-solid fa-plus" /> Item
            </button>
          </>
        )}

        {block.type === 'subsection' && (
          <>
            <div className="admin-field">
              <label>Título da subseção</label>
              <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} placeholder="Título H3" />
            </div>
            {block.content.map((text, i) => (
              <textarea key={i} value={text} onChange={(e) => {
                const content = [...block.content];
                content[i] = e.target.value;
                onChange({ ...block, content });
              }} placeholder="Parágrafo..." rows={3} style={{ marginBottom: 8, width: '100%' }} />
            ))}
            <button className="admin-btn-sm" onClick={() => onChange({ ...block, content: [...block.content, ''] })}>
              <i className="fa-solid fa-plus" /> Parágrafo
            </button>
          </>
        )}

        {block.type === 'table' && (
          <>
            <div className="admin-field">
              <label>Título da tabela</label>
              <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Colunas (separadas por | )</label>
              <input value={block.columns.join(' | ')} onChange={(e) => onChange({ ...block, columns: e.target.value.split('|').map((s) => s.trim()) })} />
            </div>
            {block.rows.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                {row.map((cell, ci) => (
                  <input key={ci} value={cell} onChange={(e) => {
                    const rows = block.rows.map((r) => [...r]);
                    rows[ri][ci] = e.target.value;
                    onChange({ ...block, rows });
                  }} placeholder={`Coluna ${ci + 1}`} style={{ flex: 1 }} />
                ))}
                <button className="admin-btn-sm admin-btn-danger" onClick={() => {
                  onChange({ ...block, rows: block.rows.filter((_, j) => j !== ri) });
                }}><i className="fa-solid fa-minus" /></button>
              </div>
            ))}
            <button className="admin-btn-sm" onClick={() => {
              const cols = block.columns.length || 2;
              onChange({ ...block, rows: [...block.rows, Array(cols).fill('')] });
            }}><i className="fa-solid fa-plus" /> Linha</button>
          </>
        )}

        {block.type === 'specs' && (
          <>
            <div className="admin-field">
              <label>Título</label>
              <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
            </div>
            {block.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input value={item.label} onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], label: e.target.value };
                  onChange({ ...block, items });
                }} placeholder="Rótulo" style={{ flex: 1 }} />
                <input value={item.value} onChange={(e) => {
                  const items = [...block.items];
                  items[i] = { ...items[i], value: e.target.value };
                  onChange({ ...block, items });
                }} placeholder="Valor" style={{ flex: 1 }} />
                <button className="admin-btn-sm admin-btn-danger" onClick={() => {
                  onChange({ ...block, items: block.items.filter((_, j) => j !== i) });
                }}><i className="fa-solid fa-minus" /></button>
              </div>
            ))}
            <button className="admin-btn-sm" onClick={() => onChange({ ...block, items: [...block.items, { label: '', value: '' }] })}>
              <i className="fa-solid fa-plus" /> Item
            </button>
          </>
        )}

        {block.type === 'gallery' && (
          <>
            <div className="admin-field">
              <label>Título</label>
              <input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
            </div>
            {block.images.map((img, i) => (
              <div key={i} className="admin-gallery-item">
                <input value={img.src} onChange={(e) => {
                  const images = [...block.images];
                  images[i] = { ...images[i], src: e.target.value };
                  onChange({ ...block, images });
                }} placeholder="URL da imagem" />
                <input value={img.alt} onChange={(e) => {
                  const images = [...block.images];
                  images[i] = { ...images[i], alt: e.target.value };
                  onChange({ ...block, images });
                }} placeholder="Texto alternativo" />
                <input value={img.caption} onChange={(e) => {
                  const images = [...block.images];
                  images[i] = { ...images[i], caption: e.target.value };
                  onChange({ ...block, images });
                }} placeholder="Legenda" />
                <button className="admin-btn-sm admin-btn-danger" onClick={() => {
                  onChange({ ...block, images: block.images.filter((_, j) => j !== i) });
                }}><i className="fa-solid fa-minus" /></button>
              </div>
            ))}
            <button className="admin-btn-sm" onClick={() => onChange({ ...block, images: [...block.images, { src: '', alt: '', caption: '' }] })}>
              <i className="fa-solid fa-plus" /> Imagem
            </button>
          </>
        )}

        {block.type === 'quote' && (
          <>
            <div className="admin-field">
              <label>Citação</label>
              <textarea value={block.content} onChange={(e) => onChange({ ...block, content: e.target.value })} rows={3} placeholder="Texto da citação..." />
            </div>
            <div className="admin-field">
              <label>Autor</label>
              <input value={block.author} onChange={(e) => onChange({ ...block, author: e.target.value })} placeholder="Nome do autor" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   CATEGORIES PAGE
   ──────────────────────────────────────────── */

function CategoriesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ApiCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ label: '', slug: '', icon: 'fa-solid fa-folder', accent: '#C8A961', description: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadCategories = useCallback(() => {
    setLoading(true);
    api.fetchCategories().then((d) => { if (d.success) setCategories(d.categories); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories]);

  const resetForm = () => {
    setForm({ label: '', slug: '', icon: 'fa-solid fa-folder', accent: '#C8A961', description: '' });
    setEditing(null);
    setCreating(false);
  };

  const startEdit = (cat: ApiCategory) => {
    setEditing(cat);
    setCreating(true);
    setForm({ label: cat.label, slug: cat.slug, icon: cat.icon, accent: cat.accent, description: cat.description });
  };

  const handleSave = async () => {
    if (!form.label.trim()) { setMessage({ type: 'error', text: 'Nome é obrigatório.' }); return; }
    setSaving(true);
    setMessage(null);
    try {
      if (editing) {
        const data = await api.updateCategory(editing.id, form);
        if (data.success) { setMessage({ type: 'success', text: 'Categoria atualizada!' }); resetForm(); loadCategories(); }
        else setMessage({ type: 'error', text: data.error });
      } else {
        const data = await api.createCategory(form);
        if (data.success) { setMessage({ type: 'success', text: 'Categoria criada!' }); resetForm(); loadCategories(); }
        else setMessage({ type: 'error', text: data.error });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  const handleDelete = async (cat: ApiCategory) => {
    if (!confirm(`Excluir categoria "${cat.label}"?`)) return;
    try {
      const data = await api.deleteCategory(cat.id);
      if (data.success) { loadCategories(); setMessage({ type: 'success', text: 'Categoria excluída.' }); }
      else setMessage({ type: 'error', text: data.error });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="admin-page">
      <AdminHeader title="Categorias" subtitle={`${categories.length} categoria(s)`}>
        <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setCreating(true); }}>
          <i className="fa-solid fa-plus" /> Nova Categoria
        </button>
      </AdminHeader>

      {message && <div className={`admin-alert ${message.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>{message.text}</div>}

      {creating && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3>{editing ? `Editando: ${editing.label}` : 'Nova Categoria'}</h3>
          <div className="admin-grid-2">
            <div className="admin-field">
              <label>Nome *</label>
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value, slug: form.slug || '' })} placeholder="Ex: Mármores" />
            </div>
            <div className="admin-field">
              <label>Slug (preenchido automaticamente)</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="marmores" />
            </div>
            <div className="admin-field">
              <label>Ícone</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="admin-select">
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}><i className={icon} /> {icon}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Cor</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="color" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} style={{ width: 44, height: 44, padding: 2, border: '1px solid #ddd', borderRadius: 8 }} />
                <input value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} placeholder="#C8A961" style={{ flex: 1 }} />
              </div>
            </div>
            <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
              <label>Descrição</label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Breve descrição da categoria..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-check" />}
              {editing ? 'Salvar alterações' : 'Criar categoria'}
            </button>
            <button className="admin-btn" onClick={resetForm}>Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <AdminLoader /> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 48 }}></th>
                <th>Nome</th>
                <th>Slug</th>
                <th>Ícone</th>
                <th>Cor</th>
                <th>Posts</th>
                <th style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td><div style={{ width: 32, height: 32, borderRadius: 8, background: cat.accent, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 14 }}><i className={cat.icon} /></div></td>
                  <td><strong>{cat.label}</strong></td>
                  <td><code>{cat.slug}</code></td>
                  <td><i className={cat.icon} /></td>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: 4, background: cat.accent, display: 'inline-block' }} /> {cat.accent}</span></td>
                  <td>{cat.count}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-sm" onClick={() => startEdit(cat)} title="Editar"><i className="fa-solid fa-pen" /></button>
                      <button className="admin-btn-sm admin-btn-danger" onClick={() => handleDelete(cat)} title="Excluir"><i className="fa-solid fa-trash" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   SETTINGS PAGE
   ──────────────────────────────────────────── */

function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' }); return; }
    setSaving(true);
    try {
      const data = await api.changePassword(currentPassword, newPassword);
      if (data.success) {
        setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao alterar senha.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  return (
    <div className="admin-page">
      <AdminHeader title="Configurações" subtitle="Configurações do painel administrativo" />
      <div className="admin-grid-2">
        <div className="admin-card">
          <h3><i className="fa-solid fa-key" /> Alterar Senha</h3>
          {message && <div className={`admin-alert ${message.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>{message.text}</div>}
          <form onSubmit={handleChangePassword}>
            <div className="admin-field">
              <label>Senha atual</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </div>
            <div className="admin-field">
              <label>Nova senha</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-check" />}
              Alterar senha
            </button>
          </form>
        </div>

        <div className="admin-card">
          <h3><i className="fa-solid fa-circle-info" /> Informações do Sistema</h3>
          <div className="admin-list">
            <div className="admin-list-item">
              <strong>Versão</strong>
              <span>1.0.0</span>
            </div>
            <div className="admin-list-item">
              <strong>Plataforma</strong>
              <span>React + PHP + MySQL</span>
            </div>
            <div className="admin-list-item">
              <strong>API</strong>
              <span>/blog/api/</span>
            </div>
            <div className="admin-list-item">
              <strong>Uploads</strong>
              <span>/blog/uploads/</span>
            </div>
            <div className="admin-list-item">
              <strong>Painel</strong>
              <span>/blog/#/admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   REUSABLE COMPONENTS
   ──────────────────────────────────────────── */

function AdminHeader({ title, subtitle, onBack, children }: { title: string; subtitle?: string; onBack?: () => void; children?: React.ReactNode }) {
  return (
    <div className="admin-header">
      <div>
        {onBack && <button className="admin-back-btn" onClick={onBack}><i className="fa-solid fa-arrow-left" /> Voltar</button>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="admin-header-actions">{children}</div>}
    </div>
  );
}

function AdminLoader() {
  return (
    <div style={{ padding: 60, textAlign: 'center', color: '#8a93a0' }}>
      <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 28 }} />
      <p style={{ marginTop: 12 }}>Carregando...</p>
    </div>
  );
}
