const API_BASE = '/blog/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: 'same-origin',
    headers: {
      ...(options.method === 'GET' ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Erro na API (${response.status})`);
  }
  return data;
}

export const api = {
  // ── Auth ──────────────────────────────
  login(email: string, password: string) {
    return apiFetch('auth.php', { method: 'POST', body: JSON.stringify({ email, password }) });
  },
  checkAuth() {
    return apiFetch('auth.php');
  },
  logout() {
    return apiFetch('auth.php?action=logout');
  },
  changePassword(currentPassword: string, newPassword: string) {
    return apiFetch('auth.php?action=change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  },

  // ── Posts ─────────────────────────────
  fetchPosts(params: { admin?: boolean; category?: string; search?: string; page?: number; perPage?: number } = {}) {
    const query = new URLSearchParams();
    if (params.admin) query.set('admin', '1');
    if (params.category) query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', String(params.page));
    if (params.perPage) query.set('per_page', String(params.perPage));
    const qs = query.toString();
    return apiFetch(`posts.php${qs ? '?' + qs : ''}`);
  },
  fetchPost(slug: string) {
    return apiFetch(`posts.php?slug=${encodeURIComponent(slug)}`);
  },
  fetchPostById(id: number) {
    return apiFetch(`posts.php?id=${id}`);
  },
  createPost(data: Record<string, unknown>) {
    return apiFetch('posts.php?action=create', { method: 'POST', body: JSON.stringify(data) });
  },
  updatePost(id: number, data: Record<string, unknown>) {
    return apiFetch(`posts.php?action=update&id=${id}`, { method: 'POST', body: JSON.stringify(data) });
  },
  deletePost(id: number) {
    return apiFetch(`posts.php?action=delete&id=${id}`, { method: 'POST' });
  },
  fetchStats() {
    return apiFetch('posts.php?action=stats');
  },

  // ── Categories ────────────────────────
  fetchCategories() {
    return apiFetch('categories.php');
  },
  createCategory(data: Record<string, unknown>) {
    return apiFetch('categories.php?action=create', { method: 'POST', body: JSON.stringify(data) });
  },
  updateCategory(id: number, data: Record<string, unknown>) {
    return apiFetch(`categories.php?action=update&id=${id}`, { method: 'POST', body: JSON.stringify(data) });
  },
  deleteCategory(id: number) {
    return apiFetch(`categories.php?action=delete&id=${id}`, { method: 'POST' });
  },

  // ── Upload ────────────────────────────
  uploadImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(`${API_BASE}/upload.php`, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    }).then((r) => r.json());
  },
};
