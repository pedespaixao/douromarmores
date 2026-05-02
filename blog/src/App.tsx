import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { api } from './lib/api';
import AdminApp from './admin/AdminApp';

/* ════════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════════ */

type Page = 'home' | 'post' | 'admin';

type Category = {
  slug: string;
  label: string;
  icon: string;
  accent: string;
  description: string;
  count: number;
};

type Author = {
  name: string;
  role: string;
  avatar: string;
};

type SectionBlock =
  | { type: 'paragraph'; content: string[] }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; title: string; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'subsection'; id: string; title: string; content: string[] }
  | { type: 'table'; title: string; columns: string[]; rows: string[][] }
  | { type: 'specs'; title: string; items: Array<{ label: string; value: string }> }
  | { type: 'gallery'; title: string; images: Array<{ src: string; alt: string; caption: string }> }
  | { type: 'quote'; content: string; author: string };

type ArticleSection = {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: SectionBlock[];
};

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  categorySlug: string;
  categoryName?: string;
  date: string;
  isoDate: string;
  updated: string;
  readingTime: number;
  views: number;
  featured?: boolean;
  image: string;
  imageAlt: string;
  author: Author;
  socialProof: string;
  tags: string[];
  palette: string;
  material?: {
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
  htmlContent?: string;
  sections: ArticleSection[];
  related: number[];
};

type CommentItem = {
  id: number;
  name: string;
  role: string;
  date: string;
  content: string;
  likes: number;
};

/* ════════════════════════════════════════════════════════════════
   CONSTANTS & STATIC DATA
   ════════════════════════════════════════════════════════════════ */

const whatsappUrl =
  'https://wa.me/5511923210038?text=Olá! Vim do blog da Douro Mármores e gostaria de orientação para o meu projeto.';

const douroLogoDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="douroGold" x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c9a961"/>
      <stop offset="0.5" stop-color="#f0d78c"/>
      <stop offset="1" stop-color="#c9a961"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#000"/>
  <rect x="7" y="7" width="50" height="50" rx="14" stroke="url(#douroGold)" stroke-width="2"/>
  <path d="M23 46V18h12.4c9.9 0 17.6 5.9 17.6 14s-7.7 14-17.6 14H23Z" stroke="url(#douroGold)" stroke-width="4" stroke-linejoin="round"/>
  <path d="M27 40c5.5-6.4 11.2-4.5 13.6-8.2 2.5-3.8 6.4-3.1 9.8-7.4" stroke="#F0D78C" stroke-opacity="0.9" stroke-width="1.8" stroke-linecap="round"/>
</svg>`)}`;

const heroImage =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80';

function DouroLogoMark() {
  return <img src={douroLogoDataUrl} alt="Logo Douro Mármores" className="douro-brand-icon" />;
}

/* ── Static categories (fallback) ── */
const staticCategories: Category[] = [
  { slug: 'todos', label: 'Todos', icon: 'fa-solid fa-border-all', accent: '#C8A961', description: 'Uma visão editorial completa do universo Douro Mármores.', count: 10 },
  { slug: 'marmores', label: 'Mármores', icon: 'fa-regular fa-gem', accent: '#C8A961', description: 'Materiais clássicos, nobres e atemporais para projetos sofisticados.', count: 3 },
  { slug: 'granitos', label: 'Granitos', icon: 'fa-solid fa-mountain', accent: '#11182A', description: 'Alta resistência, baixa manutenção e excelente custo-benefício.', count: 2 },
  { slug: 'quartzitos', label: 'Quartzitos', icon: 'fa-solid fa-fire-flame-curved', accent: '#4A7C59', description: 'Performance premium para cozinhas e áreas de uso intenso.', count: 2 },
  { slug: 'porcelanatos', label: 'Porcelanatos', icon: 'fa-regular fa-square', accent: '#8D6E63', description: 'Versatilidade visual para painéis, pisos e revestimentos.', count: 1 },
  { slug: 'tendencias', label: 'Tendências & Inspiração', icon: 'fa-regular fa-star', accent: '#9C7A3A', description: 'Referências de interiores, arquitetura e superfícies em alta.', count: 2 },
  { slug: 'manutencao', label: 'Dicas de Manutenção', icon: 'fa-solid fa-sparkles', accent: '#577590', description: 'Cuidados, limpeza e conservação para manter o material impecável.', count: 1 },
  { slug: 'projetos', label: 'Projetos Realizados', icon: 'fa-solid fa-ruler-combined', accent: '#A68B45', description: 'Aplicações reais com soluções sob medida para alto padrão.', count: 1 },
  { slug: 'guias', label: 'Guia de Materiais', icon: 'fa-regular fa-folder-open', accent: '#6D597A', description: 'Conteúdos profundos para decidir com mais segurança.', count: 3 },
  { slug: 'arquitetura', label: 'Arquitetura & Design', icon: 'fa-solid fa-compass-drafting', accent: '#3A506B', description: 'Como cada superfície conversa com o estilo do ambiente.', count: 2 },
];

const authorTeam: Author = {
  name: 'Equipe Douro Mármores',
  role: 'Curadoria técnica em pedras naturais e superfícies premium',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
};

/* ── Static posts (fallback / demo) ── */
const staticPosts: Post[] = [
  {
    id: 1,
    slug: 'marmore-calacatta-vs-carrara',
    title: 'Mármore Calacatta vs Carrara: qual escolher para uma cozinha sofisticada?',
    excerpt: 'Entenda as diferenças de desenho, presença visual, manutenção e custo entre dois dos mármores mais desejados por arquitetos e clientes de alto padrão.',
    summary: 'Um guia técnico e visual para comparar dois clássicos do design de interiores e escolher o material ideal para cozinhas, ilhas e ambientes integrados.',
    categorySlug: 'marmores',
    date: '22 mar 2026',
    isoDate: '2026-03-22',
    updated: '2026-03-22',
    readingTime: 9,
    views: 2187,
    featured: true,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Cozinha sofisticada com ilha central e superfícies claras de pedra natural.',
    author: authorTeam,
    socialProof: 'Mais de 2 mil leitores consultaram este comparativo nas últimas semanas.',
    tags: ['mármore', 'cozinha', 'calacatta', 'carrara'],
    palette: 'palette-marble',
    material: { name: 'Mármore Calacatta', origin: 'Itália', classification: 'Mármore natural', mohs: '3 a 4', absorption: 'Média', uses: 'Painéis, banheiros, ilhas decorativas, nichos e revestimentos internos', finishes: 'Polido, levigado, escovado', price: '$$$$', ctaLabel: 'Solicitar orçamento deste material' },
    related: [3, 4, 7],
    sections: [
      {
        id: 'como-comparar', title: 'Como comparar Calacatta e Carrara da forma certa', level: 2,
        blocks: [
          { type: 'paragraph', content: ['Quando o cliente chega com a dúvida entre Calacatta e Carrara, a decisão quase nunca é apenas estética. O desenho do veio, a intensidade do branco, a sensação de exclusividade e o contexto de uso influenciam diretamente no resultado final do projeto.', 'Na prática, o Calacatta costuma transmitir uma imagem mais marcante, com contraste mais evidente e apelo cenográfico. Já o Carrara conversa melhor com propostas leves, elegantes e atemporais, especialmente quando a intenção é iluminar o ambiente sem exagero visual.', 'O ponto mais importante é entender se a pedra será protagonista do espaço ou se ela precisa atuar como base sofisticada para marcenaria, metais e iluminação. Essa leitura evita escolhas bonitas no showroom, mas desalinhadas com a rotina ou com o conceito do projeto.'] },
          { type: 'callout', variant: 'tip', title: 'Dica da Douro', content: 'Em projetos com ilha central, o padrão do veio precisa ser analisado em chapa real. Isso faz diferença na continuidade visual e no impacto final do ambiente.' },
          { type: 'list', items: ['Calacatta tende a entregar presença visual mais forte.', 'Carrara funciona muito bem em composições claras e elegantes.', 'A escolha ideal depende da marcenaria, da iluminação e do uso do ambiente.'] },
        ],
      },
      {
        id: 'diferencas-visuais', title: 'Diferenças visuais que realmente mudam o projeto', level: 2,
        blocks: [
          { type: 'subsection', id: 'calacatta-personalidade', title: 'Calacatta: personalidade e alto impacto visual', content: ['O Calacatta é associado a cozinhas mais autorais, com linguagem contemporânea e foco em sofisticação. Seus veios mais dramáticos criam um desenho forte que costuma funcionar muito bem em ilhas, paredes e painéis de destaque.'] },
          { type: 'subsection', id: 'carrara-equilibrio', title: 'Carrara: elegância clássica e equilíbrio visual', content: ['O Carrara é uma escolha excelente quando o objetivo é criar um ambiente claro, refinado e menos contrastado. Ele conversa bem com madeiras claras, metais escovados e marcenaria off-white ou cinza suave.'] },
          { type: 'table', title: 'Comparativo rápido para decisão inicial', columns: ['Critério', 'Calacatta', 'Carrara'], rows: [['Impacto visual', 'Alto, com veios marcantes', 'Suave e elegante'], ['Estilo predominante', 'Contemporâneo / autoral', 'Clássico / atemporal'], ['Uso recomendado', 'Ilhas e áreas de destaque', 'Bancadas e revestimentos delicados'], ['Percepção de luxo', 'Muito alta', 'Alta e discreta']] },
        ],
      },
      {
        id: 'desempenho-no-uso', title: 'O que considerar no desempenho e na manutenção', level: 2,
        blocks: [
          { type: 'paragraph', content: ['Tanto o Calacatta quanto o Carrara exigem atenção com impermeabilização, uso de produtos adequados e prevenção contra agentes ácidos. Em cozinhas de uso intenso, vale avaliar se a expectativa estética compensa a necessidade de maior cuidado diário.', 'Quando o cliente deseja o visual do mármore, mas busca um comportamento mais robusto na rotina, a recomendação técnica pode migrar para quartzitos claros ou para superfícies industrializadas que reproduzem esse desenho com maior estabilidade de uso.'] },
          { type: 'quote', content: 'Em projetos premium, a melhor pedra não é a mais cara. É a que entrega beleza, coerência e desempenho para a vida real do cliente.', author: 'Curadoria Douro Mármores' },
          { type: 'specs', title: 'Ficha técnica da pedra em análise', items: [{ label: 'Origem', value: 'Itália' }, { label: 'Classificação', value: 'Mármore natural' }, { label: 'Dureza Mohs', value: '3 a 4' }, { label: 'Absorção de água', value: 'Média' }, { label: 'Usos recomendados', value: 'Painéis, banheiros, ilhas decorativas e revestimentos internos' }, { label: 'Acabamentos', value: 'Polido, levigado, escovado' }, { label: 'Faixa de preço', value: '$$$$' }] },
        ],
      },
      {
        id: 'aplicacoes-ideais', title: 'Onde cada material funciona melhor', level: 2,
        blocks: [
          { type: 'paragraph', content: ['Se a proposta é criar um ambiente memorável, com ilha protagonista, frontão contínuo e marcenaria limpa, o Calacatta costuma oferecer um resultado visual muito forte. Para projetos que pedem elegância calma e longevidade estética, o Carrara frequentemente é a escolha mais segura.', 'Em residências com uso mais intenso, a indicação precisa considerar também o perfil da família, a frequência de cocção, o cuidado com utensílios quentes e o tipo de limpeza adotado. Esse olhar consultivo evita arrependimentos e melhora muito a satisfação final do cliente.'] },
          { type: 'gallery', title: 'Galeria de referências para inspirar o projeto', images: [{ src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80', alt: 'Cozinha contemporânea clara com ilha em pedra natural.', caption: 'Ilha com leitura visual leve e desenho contínuo.' }, { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', alt: 'Ambiente integrado com acabamento sofisticado em pedra clara.', caption: 'Integração entre marcenaria clara, metais e pedra nobre.' }, { src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80', alt: 'Banheiro sofisticado com pedra em destaque.', caption: 'Aplicação em banheiros de alto padrão com atmosfera acolhedora.' }] },
        ],
      },
      {
        id: 'conclusao', title: 'Conclusão: qual faz mais sentido para o seu projeto?', level: 2,
        blocks: [
          { type: 'paragraph', content: ['Se você quer um material com presença cênica, leitura mais exclusiva e protagonismo no ambiente, o Calacatta tende a ser a escolha mais impactante. Se a prioridade é leveza visual, equilíbrio e elegância atemporal, o Carrara continua sendo uma excelente referência.', 'A melhor decisão nasce quando estética, rotina e nível de manutenção caminham juntos. Por isso, antes do orçamento, faz sentido conversar com uma equipe que entenda o comportamento das superfícies no uso real.'] },
          { type: 'callout', variant: 'info', title: 'Próximo passo recomendado', content: 'Envie uma foto do ambiente ou do projeto pelo WhatsApp. A Douro pode orientar o material mais coerente antes mesmo da etapa de orçamento.' },
        ],
      },
    ],
  },
  { id: 2, slug: 'tendencias-bancadas-pedra-2025', title: '10 tendências em bancadas de pedra para 2025', excerpt: 'As superfícies estão mais integradas à arquitetura, com espessuras visuais elegantes, paginações contínuas e materiais que valorizam o projeto sem excesso.', summary: 'Tendências de composição, acabamentos e materiais para cozinhas, lavabos e áreas gourmet com linguagem contemporânea.', categorySlug: 'tendencias', date: '18 mar 2026', isoDate: '2026-03-18', updated: '2026-03-18', readingTime: 7, views: 1834, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Cozinha moderna com bancada de pedra e armários claros.', author: authorTeam, socialProof: 'Um dos conteúdos mais salvos por arquitetos e designers.', tags: ['tendências', 'bancadas', 'arquitetura'], palette: 'palette-kitchen', related: [1, 4, 8], sections: [] },
  { id: 3, slug: 'como-limpar-e-manter-marmore', title: 'Como limpar e manter seu mármore: guia completo', excerpt: 'Produtos, frequência de limpeza, impermeabilização e os erros mais comuns que encurtam a vida útil do mármore em cozinhas e banheiros.', summary: 'Boas práticas de conservação com linguagem clara e base técnica.', categorySlug: 'manutencao', date: '15 mar 2026', isoDate: '2026-03-15', updated: '2026-03-15', readingTime: 8, views: 1568, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Banheiro claro com pedra natural e composição minimalista.', author: authorTeam, socialProof: 'Leitura recorrente entre clientes que buscam preservar superfícies claras.', tags: ['manutenção', 'mármore', 'limpeza'], palette: 'palette-bath', related: [1, 7, 9], sections: [] },
  { id: 4, slug: 'quartzito-taj-mahal-guia', title: 'Quartzito Taj Mahal: o guia definitivo do material mais desejado', excerpt: 'Saiba por que o Taj Mahal se tornou referência em cozinhas sofisticadas, áreas gourmet e projetos que pedem desempenho com visual delicado.', summary: 'Um dos materiais preferidos de arquitetos para conciliar estética suave e alta performance.', categorySlug: 'quartzitos', date: '11 mar 2026', isoDate: '2026-03-11', updated: '2026-03-11', readingTime: 10, views: 2415, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Bancada clara elegante com desenho suave de pedra natural.', author: authorTeam, socialProof: 'Conteúdo frequentemente consultado por quem busca quartzitos premium.', tags: ['quartzito', 'taj mahal', 'cozinha'], palette: 'palette-taj', related: [1, 2, 8], sections: [] },
  { id: 5, slug: 'granito-preto-sao-gabriel', title: 'Granito Preto São Gabriel: elegância acessível para seu projeto', excerpt: 'Conheça aplicações, vantagens e combinações do granito preto São Gabriel em cozinhas, áreas gourmet e projetos com visual contemporâneo.', summary: 'Uma escolha segura para quem busca sofisticação, resistência e melhor previsibilidade de manutenção.', categorySlug: 'granitos', date: '08 mar 2026', isoDate: '2026-03-08', updated: '2026-03-08', readingTime: 6, views: 1989, image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Projeto escuro sofisticado com superfícies pretas e iluminação quente.', author: authorTeam, socialProof: 'Um dos materiais com maior procura para cozinhas de uso intenso.', tags: ['granito', 'são gabriel', 'cozinha'], palette: 'palette-black', related: [2, 9, 10], sections: [] },
  { id: 6, slug: 'porcelanato-que-imita-marmore', title: 'Porcelanato que imita mármore: vale a pena?', excerpt: 'Quando o porcelanato atende melhor, quando a pedra natural entrega mais valor e como fazer essa comparação de forma honesta e técnica.', summary: 'Um comparativo útil para equilibrar estética, desempenho, orçamento e contexto de uso.', categorySlug: 'porcelanatos', date: '03 mar 2026', isoDate: '2026-03-03', updated: '2026-03-03', readingTime: 7, views: 1176, image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Cozinha clean com revestimento claro e iluminação natural.', author: authorTeam, socialProof: 'Ajuda leitores em fase de comparação entre pedra e revestimento.', tags: ['porcelanato', 'comparativo', 'mármore'], palette: 'palette-porcelain', related: [1, 3, 9], sections: [] },
  { id: 7, slug: 'nanoglass-vs-silestone', title: 'Nanoglass vs Silestone: comparativo técnico completo', excerpt: 'Brancura, resistência, manutenção, emendas e contexto ideal de uso em projetos de cozinha e banheiro de alto padrão.', summary: 'Guia comparativo para especificar superfícies industrializadas com mais clareza.', categorySlug: 'guias', date: '28 fev 2026', isoDate: '2026-02-28', updated: '2026-02-28', readingTime: 9, views: 1642, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Lavabo elegante com superfície clara e iluminação sofisticada.', author: authorTeam, socialProof: 'Um dos comparativos mais úteis para especificadores e clientes finais.', tags: ['nanoglass', 'silestone', 'comparativo'], palette: 'palette-white', related: [1, 6, 8], sections: [] },
  { id: 8, slug: 'pedra-ideal-para-area-gourmet', title: 'Como escolher a pedra ideal para área gourmet', excerpt: 'Uma leitura prática sobre sol, calor, gordura, uso intenso e materiais que funcionam melhor em espaços gourmet de alto padrão.', summary: 'Para decidir com mais segurança entre granito, quartzito e superfícies industrializadas.', categorySlug: 'arquitetura', date: '24 fev 2026', isoDate: '2026-02-24', updated: '2026-02-24', readingTime: 8, views: 1498, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Área gourmet moderna com bancada sofisticada e elementos claros.', author: authorTeam, socialProof: 'Leitura estratégica para clientes que ainda estão definindo material.', tags: ['área gourmet', 'quartzito', 'granito'], palette: 'palette-gourmet', related: [2, 4, 5], sections: [] },
  { id: 9, slug: 'acabamentos-em-pedras-naturais', title: 'Acabamentos em pedras naturais: polido, levigado, escovado e mais', excerpt: 'O acabamento muda brilho, toque, manutenção e leitura do projeto. Veja como especificar com mais precisão.', summary: 'Um guia essencial para alinhar estética, segurança e usabilidade em cada ambiente.', categorySlug: 'guias', date: '20 fev 2026', isoDate: '2026-02-20', updated: '2026-02-20', readingTime: 6, views: 1320, image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Detalhe de ambiente com textura sofisticada e acabamento fosco.', author: authorTeam, socialProof: 'Conteúdo importante para quem quer evitar erros de especificação.', tags: ['acabamento', 'pedras naturais', 'especificação'], palette: 'palette-texture', related: [1, 3, 5], sections: [] },
  { id: 10, slug: 'apartamento-alphaville-300m', title: 'Projeto realizado: apartamento de 300m² em Alphaville', excerpt: 'Uma seleção de soluções aplicadas em cozinha, lavabo, painéis e banheiros para um apartamento contemporâneo com linguagem elegante.', summary: 'Case de projeto com foco em integração visual, materiais claros e acabamento preciso.', categorySlug: 'projetos', date: '16 fev 2026', isoDate: '2026-02-16', updated: '2026-02-16', readingTime: 5, views: 1092, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80', imageAlt: 'Apartamento contemporâneo com interiores claros e superfícies sofisticadas.', author: authorTeam, socialProof: 'Inspiração real para arquitetos, designers e clientes em fase de obra.', tags: ['projetos', 'alphaville', 'interiores'], palette: 'palette-project', related: [2, 4, 8], sections: [] },
];

const staticComments: CommentItem[] = [
  { id: 1, name: 'Marina A.', role: 'Arquiteta', date: 'há 3 dias', content: 'Excelente comparativo. Esse tipo de conteúdo ajuda muito na conversa com o cliente, principalmente quando ele chega focado apenas na estética e não no desempenho.', likes: 18 },
  { id: 2, name: 'Carlos R.', role: 'Cliente residencial', date: 'há 1 semana', content: 'Gostei da explicação sobre rotina e manutenção. Eu estava em dúvida entre mármore e quartzito para a ilha e esse ponto fez diferença na decisão.', likes: 12 },
];

/* ════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════ */

function formatViews(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function ensureMeta(selector: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) { el = create(); document.head.appendChild(el); }
  return el;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const m = ensureMeta(`meta[${attr}="${key}"]`, () => { const e = document.createElement('meta'); e.setAttribute(attr, key); return e; }) as HTMLMetaElement;
  m.content = content;
}

function upsertCanonical(href: string) {
  const l = ensureMeta('link[rel="canonical"]', () => { const e = document.createElement('link'); e.setAttribute('rel', 'canonical'); return e; }) as HTMLLinkElement;
  l.href = href;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((p, i) => (p.toLowerCase() === query.toLowerCase() ? <mark key={`${p}-${i}`}>{p}</mark> : p));
}

/* ════════════════════════════════════════════════════════════════
   APP COMPONENT
   ════════════════════════════════════════════════════════════════ */

function App() {
  /* ── State ── */
  const [page, setPage] = useState<Page>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/admin')) return 'admin';
    return 'home';
  });
  const [selectedPostSlug, setSelectedPostSlug] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});
  const [isFiltering, setIsFiltering] = useState(false);

  /* ── API state ── */
  const [apiMode, setApiMode] = useState(false);
  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [apiCategories, setApiCategories] = useState<Category[]>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const articleContentRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const publicationsRef = useRef<HTMLElement | null>(null);

  /* ── API fetch (PHP backend) ── */
  useEffect(() => {
    let cancelled = false;

    async function loadApi() {
      try {
        const [postsData, catsData] = await Promise.all([
          api.fetchPosts({ perPage: 50 }),
          api.fetchCategories(),
        ]);

        if (cancelled) return;

        if (postsData.success && postsData.posts?.length > 0) {
          const transformed: Post[] = postsData.posts.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt || '',
            summary: p.summary || '',
            categorySlug: p.category_slug,
            date: p.date || p.iso_date,
            isoDate: p.iso_date,
            updated: p.updated_date || p.iso_date,
            readingTime: p.reading_time || 5,
            views: p.views || 0,
            featured: !!p.featured,
            image: p.image || '',
            imageAlt: p.image_alt || '',
            author: { name: p.author_name || 'Equipe Douro Mármores', role: p.author_role || '', avatar: p.author_avatar || '' },
            socialProof: p.social_proof || '',
            tags: Array.isArray(p.tags) ? p.tags : [],
            palette: p.palette || 'palette-default',
            material: p.material || undefined,
            sections: Array.isArray(p.sections) ? p.sections : [],
            related: Array.isArray(p.related_posts) ? p.related_posts : [],
          }));

          if (!transformed.some((t: Post) => t.featured) && transformed.length > 0) {
            transformed[0].featured = true;
          }

          setApiPosts(transformed);
          setApiMode(true);
        }

        if (catsData.success && catsData.categories?.length > 0) {
          setApiCategories(catsData.categories.map((c: any) => ({
            slug: c.slug,
            label: c.label,
            icon: c.icon,
            accent: c.accent,
            description: c.description || '',
            count: c.count || 0,
          })));
        }
      } catch (err) {
        console.warn('API PHP indisponível, usando dados estáticos.', err);
      }
    }

    loadApi();
    return () => { cancelled = true; };
  }, []);

  /* ── Derived data ── */
  const activeCategories: Category[] = useMemo(() => {
    if (apiCategories.length > 0) {
      const todos: Category = { slug: 'todos', label: 'Todos', icon: 'fa-solid fa-border-all', accent: '#C8A961', description: 'Visão completa.', count: apiCategories.reduce((s, c) => s + c.count, 0) };
      return [todos, ...apiCategories];
    }
    return staticCategories;
  }, [apiCategories]);

  const activePosts: Post[] = useMemo(() => {
    if (apiMode && apiPosts.length > 0) return apiPosts;
    return staticPosts;
  }, [apiMode, apiPosts]);

  const activeComments: CommentItem[] = useMemo(() => {
    return staticComments;
  }, []);

  const featuredPost = activePosts.find((p) => p.featured) ?? activePosts[0];
  const currentPost = activePosts.find((p) => p.slug === selectedPostSlug) ?? featuredPost;
  const relatedPosts = activePosts.filter((p) => currentPost.related.includes(p.id));
  const popularPosts = [...activePosts].sort((a, b) => b.views - a.views).slice(0, 5);
  const materialOfMonth = activePosts.find((p) => p.material) ?? featuredPost;

  const filteredPosts = useMemo(() => {
    return activePosts.filter((p) => {
      const matchCat = activeCategory === 'todos' || p.categorySlug === activeCategory;
      const content = `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase();
      const matchSearch = searchTerm.trim() ? content.includes(searchTerm.toLowerCase()) : true;
      return matchCat && matchSearch;
    });
  }, [activePosts, activeCategory, searchTerm]);

  const masonryPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);
  const publicationResults = searchTerm.trim() ? filteredPosts : masonryPosts;

  const articleReadingTime = currentPost.sections.length
    ? (() => {
        const chunks: string[] = [];
        currentPost.sections.forEach((s) => s.blocks.forEach((b) => {
          if (b.type === 'paragraph') chunks.push(...b.content);
          if (b.type === 'list') chunks.push(...b.items);
          if (b.type === 'subsection') chunks.push(b.title, ...b.content);
          if (b.type === 'callout') chunks.push(b.title, b.content);
          if (b.type === 'quote') chunks.push(b.content, b.author);
          if (b.type === 'table') chunks.push(b.title, ...b.columns, ...b.rows.flat());
          if (b.type === 'specs') chunks.push(b.title, ...b.items.map((i) => `${i.label} ${i.value}`));
          if (b.type === 'gallery') chunks.push(b.title, ...b.images.map((i) => `${i.alt} ${i.caption}`));
        }));
        return Math.max(4, Math.ceil(chunks.join(' ').split(/\s+/).length / 220));
      })()
    : currentPost.readingTime;

  const articleHeadings = useMemo(
    () => currentPost.sections.map((s) => ({ id: s.id, title: s.title, level: s.level })),
    [currentPost.sections],
  );

  const allHeadings = articleHeadings;

  /* ── Effects ── */
  useEffect(() => { setIsFiltering(true); const t = window.setTimeout(() => setIsFiltering(false), 220); return () => window.clearTimeout(t); }, [activeCategory, searchTerm]);

  useEffect(() => {
    const handle = () => {
      setShowBackToTop(window.scrollY > 640);
      if (page === 'post' && articleContentRef.current) {
        const rect = articleContentRef.current.getBoundingClientRect();
        const aTop = rect.top + window.scrollY - 140;
        const aH = articleContentRef.current.offsetHeight;
        const cur = window.scrollY - aTop;
        setScrollProgress(Math.max(0, Math.min(100, (cur / aH) * 100)));
        const entries = Object.entries(sectionRefs.current).map(([id, n]) => ({ id, top: n ? n.getBoundingClientRect().top : Number.POSITIVE_INFINITY })).filter((e) => e.top <= 180).sort((a, b) => b.top - a.top);
        if (entries[0]) setActiveHeading(entries[0].id);
      } else { setScrollProgress(0); }
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [page, currentPost]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) { cards.forEach((c) => c.classList.add('is-visible')); return; }
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }); }, { threshold: 0.12 });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [page, activeCategory, searchTerm, isFiltering, apiPosts]);

  useEffect(() => {
    const seen = sessionStorage.getItem('douro-exit-popup');
    if (seen) return;
    const handle = (e: MouseEvent) => { if (e.clientY <= 10) { setPopupOpen(true); sessionStorage.setItem('douro-exit-popup', '1'); } };
    document.addEventListener('mouseout', handle);
    return () => document.removeEventListener('mouseout', handle);
  }, []);

  useEffect(() => {
    const p = currentPost;
    const title = page === 'post' ? `${p.title} | Blog Douro Mármores` : 'Blog Douro Mármores | Pedras naturais, design e materiais premium';
    const desc = page === 'post' ? p.summary : 'Inspiração, tendências e conhecimento técnico sobre mármore, granito, quartzito, porcelanato e superfícies de alto padrão para projetos sofisticados.';
    const url = page === 'post' ? `https://douromarmores.com.br/blog/${p.slug}` : 'https://douromarmores.com.br/blog';
    const img = page === 'post' ? p.image : heroImage;
    document.title = title;
    document.documentElement.lang = 'pt-BR';
    upsertMeta('name', 'description', desc);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', page === 'post' ? 'article' : 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', img);
    upsertCanonical(url);
  }, [page, currentPost]);

  /* ── Navigation ── */
  const navigateHome = () => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const openPost = (slug: string) => {
    setSelectedPostSlug(slug);
    setPage('post');
    setSearchPanelOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => { setPage('home'); setMobileMenuOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40); };

  const copyLink = async () => {
    const url = page === 'post' ? `https://douromarmores.com.br/blog/${currentPost.slug}` : 'https://douromarmores.com.br/blog';
    await navigator.clipboard.writeText(url);
  };

  const submitNewsletter = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setNewsletterSent(true); };

  const toggleCommentLike = (id: number) => setCommentLikes((p) => ({ ...p, [id]: !p[id] }));

  const activateOnEnterOrSpace = (e: React.KeyboardEvent<HTMLElement>, cb: () => void) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cb(); } };

  const applyCategoryFilter = (slug: string) => { setActiveCategory(slug); requestAnimationFrame(() => publicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };

  /* ── Schemas ── */
  const organizationSchema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Douro Mármores', url: 'https://douromarmores.com.br', logo: douroLogoDataUrl, sameAs: ['https://www.instagram.com/douromarmores'] };
  const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Douro Mármores', url: 'https://douromarmores.com.br', telephone: '+55 11 92321-0038', image: heroImage, address: { '@type': 'PostalAddress', addressCountry: 'BR', addressRegion: 'SP', addressLocality: 'São Paulo' }, description: 'Marmoraria premium especializada em mármore, granito, quartzito, nanoglass, silestone, dekton e porcelanato para projetos de alto padrão.' };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: page === 'post' ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://douromarmores.com.br' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://douromarmores.com.br/blog' }, { '@type': 'ListItem', position: 3, name: activeCategories.find((c) => c.slug === currentPost.categorySlug)?.label ?? 'Categoria', item: `https://douromarmores.com.br/blog/${currentPost.categorySlug}` }, { '@type': 'ListItem', position: 4, name: currentPost.title, item: `https://douromarmores.com.br/blog/${currentPost.slug}` }] : [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://douromarmores.com.br' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://douromarmores.com.br/blog' }] };
  const articleSchema = page === 'post' ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: currentPost.title, description: currentPost.summary, image: [currentPost.image], datePublished: currentPost.isoDate, dateModified: currentPost.updated, mainEntityOfPage: `https://douromarmores.com.br/blog/${currentPost.slug}`, author: { '@type': 'Organization', name: currentPost.author.name }, publisher: { '@type': 'Organization', name: 'Douro Mármores', logo: { '@type': 'ImageObject', url: douroLogoDataUrl } } } : null;
  const faqSchema = page === 'post' ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Calacatta ou Carrara: qual parece mais sofisticado?', acceptedAnswer: { '@type': 'Answer', text: 'O Calacatta costuma transmitir uma imagem mais marcante e luxuosa, enquanto o Carrara oferece elegância mais leve e atemporal.' } }, { '@type': 'Question', name: 'Posso usar mármore em uma cozinha de uso intenso?', acceptedAnswer: { '@type': 'Answer', text: 'É possível, mas o comportamento da rotina precisa ser considerado. Em alguns casos, quartzitos claros ou superfícies industrializadas podem ser tecnicamente mais adequados.' } }] } : null;

  /* ══════════════════════════════════════════════════════════════
     RENDER HELPERS
     ══════════════════════════════════════════════════════════════ */

  const renderTopBar = () => (
    <div className="douro-topbar" role="presentation">
      <div className="douro-container douro-topbar-row">
        <div className="douro-topbar-contact">
          <span className="douro-phone-icon"><i className="fa-solid fa-phone" aria-hidden="true" /></span>
          <a href="tel:+5511923210038">(11) 92321-0038</a>
        </div>
        <div className="douro-topbar-socials" aria-label="Redes sociais da Douro Mármores">
          <a href="https://www.instagram.com/douromarmores" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
          <a href="https://www.facebook.com" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></a>
          <a href={whatsappUrl} aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header className="douro-header" id="topo">
      <a className="skip-link" href="#conteudo-principal">Ir para o conteúdo</a>
      <div className="douro-container douro-header-row">
        <button className="douro-logo-link" onClick={navigateHome} aria-label="Ir para a home do blog">
          <span className="douro-brand-icon-wrap"><DouroLogoMark /></span>
          <span className="douro-brand-lockup">
            <span className="douro-brand-wordmark"><span className="brand-douro">DOURO</span><span className="brand-marmores">MÁRMORES</span></span>
            <span className="douro-brand-blog">Blog</span>
          </span>
        </button>
        <nav className="douro-nav" aria-label="Navegação principal do blog">
          <button className="nav-link" onClick={navigateHome}>Início</button>
          <button className="nav-link" onClick={() => scrollToSection('categorias')}>Categorias</button>
          <button className="nav-link" onClick={() => scrollToSection('sobre-blog')}>Sobre</button>
          <button className="nav-link" onClick={() => scrollToSection('cta-final')}>Contato</button>
          <button className="douro-search-toggle" aria-expanded={searchPanelOpen} onClick={() => { setSearchPanelOpen((v) => !v); setTimeout(() => searchInputRef.current?.focus(), 120); }}>
            <span className="douro-search-icon" aria-hidden="true"><i className="fa-solid fa-magnifying-glass" /></span>
            <span>Buscar</span>
          </button>
        </nav>
        <div className="douro-header-actions">
          <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Orçamento Grátis</a>
          <button className="douro-mobile-toggle" aria-label="Abrir menu" onClick={() => setMobileMenuOpen((v) => !v)}>
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>
        </div>
      </div>
      {searchPanelOpen ? (
        <div className="douro-search-panel" role="search">
          <div className="douro-container douro-search-panel-inner">
            <form className="douro-search-form" onSubmit={(e) => { e.preventDefault(); setSearchPanelOpen(false); publicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              <div className="douro-search-field-wrap">
                <span className="douro-search-field-icon" aria-hidden="true"><i className="fa-solid fa-magnifying-glass" /></span>
                <input ref={searchInputRef} type="search" placeholder="Busque por materiais, ambientes, acabamentos ou dúvidas frequentes" aria-label="Buscar no blog" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <button type="button" className="douro-search-close" onClick={() => setSearchPanelOpen(false)}>Fechar</button>
            </form>
          </div>
        </div>
      ) : null}
      {mobileMenuOpen ? (
        <div className="douro-mobile-panel">
          <div className="douro-container douro-mobile-nav">
            <button className="nav-link" onClick={navigateHome}>Início</button>
            <button className="nav-link" onClick={() => scrollToSection('categorias')}>Categorias</button>
            <button className="nav-link" onClick={() => scrollToSection('sobre-blog')}>Sobre</button>
            <button className="nav-link" onClick={() => scrollToSection('cta-final')}>Contato</button>
            <a className="douro-cta douro-mobile-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Solicitar orientação</a>
          </div>
        </div>
      ) : null}
    </header>
  );

  const renderHeroHeader = () => (
    <section className="douro-blog-hero douro-blog-hero--filters-only">
      <div className="douro-container douro-blog-hero-content douro-blog-hero-content--compact">
        <div className="douro-hero-filter-wrap douro-hero-filter-wrap--top">
          <div className="douro-filter-bar" role="tablist" aria-label="Filtrar artigos por categoria">
            {activeCategories.map((cat) => (
              <button key={cat.slug} className={`douro-filter-chip ${activeCategory === cat.slug ? 'is-active' : ''}`} onClick={() => applyCategoryFilter(cat.slug)} role="tab" aria-selected={activeCategory === cat.slug} style={{ '--chip-accent': cat.accent } as React.CSSProperties}>
                <i className={cat.icon} aria-hidden="true" /><span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderFeaturedSection = () => (
    <section className="douro-section douro-section-top-tight">
      <div className="douro-container douro-grid-hero">
        <article className="douro-card douro-hero-card" data-reveal>
          <div className="douro-hero-media"><img src={featuredPost.image} alt={featuredPost.imageAlt} loading="eager" /></div>
          <div className="douro-hero-overlay" />
          <div className="douro-hero-content">
            <span className="douro-pill-dark">Destaque</span>
            <div className="douro-hero-meta-pills">
              <span>{activeCategories.find((c) => c.slug === featuredPost.categorySlug)?.label ?? 'Categoria'}</span>
              <span className="douro-hero-badge">em alta</span>
            </div>
            <h2 className="douro-hero-title">{featuredPost.title}</h2>
            <p className="douro-hero-highlight">{featuredPost.summary}</p>
            <p className="douro-hero-text">{featuredPost.excerpt}</p>
            <div className="douro-hero-meta">
              <span>{featuredPost.date}</span><span>{featuredPost.readingTime} min de leitura</span><span>{formatViews(featuredPost.views)} visualizações</span>
            </div>
            <div className="douro-hero-actions">
              <button className="hero-btn" onClick={() => openPost(featuredPost.slug)}>Ler artigo completo</button>
              <button className="douro-ghost-button" onClick={() => scrollToSection('mais-lidos')}>Ver publicações em destaque</button>
            </div>
          </div>
        </article>
        <aside className="douro-card douro-sidebar-card douro-sidebar-card--latest" data-reveal>
          <div className="douro-latest-head">
            <span className="douro-kicker">Blog Douro Mármores</span>
            <h2 className="douro-sidebar-title douro-title-black">Últimas publicações</h2>
          </div>
          <div className="douro-sidebar-divider" />
          <div className="douro-latest-list">
            {activePosts.slice(0, 4).map((post, i) => (
              <div key={post.id} className="douro-latest-item" role="button" tabIndex={0} onClick={() => openPost(post.slug)} onKeyDown={(e) => activateOnEnterOrSpace(e, () => openPost(post.slug))}>
                <span className="douro-latest-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="douro-latest-thumb"><img src={post.image} alt={post.imageAlt} loading="lazy" /></span>
                <div className="douro-latest-body">
                  <div className="douro-latest-category">{activeCategories.find((c) => c.slug === post.categorySlug)?.label}</div>
                  <div className="douro-latest-link-title">{post.title}</div>
                  <div className="douro-latest-meta">{post.date} • {post.readingTime} min</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );

  const renderCard = (post: Post, index: number) => {
    const cat = activeCategories.find((c) => c.slug === post.categorySlug);
    return (
      <article key={post.id} className="douro-post-card" data-reveal style={{ animationDelay: `${index * 70}ms` }}>
        <button className="douro-post-thumb" onClick={() => openPost(post.slug)} aria-label={`Abrir artigo ${post.title}`}>
          <img src={post.image} alt={post.imageAlt} loading="lazy" />
          <span className="douro-post-chip" style={{ backgroundColor: cat?.accent ?? '#11182A' }}>{cat?.label ?? 'Blog'}</span>
        </button>
        <div className="douro-post-body">
          <time className="douro-post-date" dateTime={post.isoDate}>{post.date}</time>
          <h3 className="douro-post-title"><button onClick={() => openPost(post.slug)}>{highlightText(post.title, searchTerm)}</button></h3>
          <p className="douro-post-excerpt">{highlightText(post.excerpt, searchTerm)}</p>
          <div className="douro-post-meta">
            <span className="douro-author-mini"><img src={post.author.avatar} alt={post.author.name} className="douro-author-avatar-mini" loading="lazy" /><span>{post.author.name}</span></span>
            <span><i className="fa-regular fa-clock" aria-hidden="true" /> {post.readingTime} min</span>
          </div>
          <button className="douro-link-inline" onClick={() => openPost(post.slug)}>Ler artigo completo <i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
        </div>
      </article>
    );
  };

  const renderSkeletons = () => Array.from({ length: 6 }).map((_, i) => (
    <article key={`skeleton-${i}`} className="douro-post-card douro-skeleton-card">
      <div className="douro-skeleton douro-skeleton-media" />
      <div className="douro-post-body">
        <div className="douro-skeleton douro-skeleton-line short" />
        <div className="douro-skeleton douro-skeleton-line large" />
        <div className="douro-skeleton douro-skeleton-line medium" />
        <div className="douro-skeleton douro-skeleton-line short" />
      </div>
    </article>
  ));

  const renderSidebar = () => (
    <aside className="douro-home-sidebar" aria-label="Widgets do blog">
      <div className="douro-widget" data-reveal>
        <h3 className="douro-widget-title">Posts mais lidos</h3>
        <div className="douro-widget-list">
          {popularPosts.slice(0, 4).map((p) => (
            <div key={p.id} className="douro-widget-post" role="button" tabIndex={0} onClick={() => openPost(p.slug)} onKeyDown={(e) => activateOnEnterOrSpace(e, () => openPost(p.slug))}>
              <img src={p.image} alt={p.imageAlt} loading="lazy" />
              <div className="douro-widget-post-body"><strong>{p.title}</strong><small>{formatViews(p.views)} leituras</small></div>
            </div>
          ))}
        </div>
      </div>
      <div className="douro-widget" data-reveal>
        <h3 className="douro-widget-title">Categorias</h3>
        <div className="douro-category-list">
          {activeCategories.filter((c) => c.slug !== 'todos').map((cat) => (
            <div key={cat.slug} className="douro-category-list-item" role="button" tabIndex={0} onClick={() => applyCategoryFilter(cat.slug)} onKeyDown={(e) => activateOnEnterOrSpace(e, () => applyCategoryFilter(cat.slug))}>
              <div className="douro-category-list-label">{cat.label}</div><strong>{cat.count}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="douro-widget douro-widget-cta" data-reveal>
        <span className="douro-kicker">Solicite seu orçamento</span>
        <h3>Receba orientação para escolher o material certo.</h3>
        <p>Fale com a Douro para comparar opções, entender acabamentos e avançar com mais segurança no seu projeto.</p>
        <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Falar no WhatsApp</a>
      </div>
      <div className="douro-widget" data-reveal>
        <h3 className="douro-widget-title">Receba inspirações e novidades em pedras naturais</h3>
        <form className="douro-newsletter-form" onSubmit={submitNewsletter}>
          <input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" required />
          <button type="submit">Quero receber</button>
        </form>
        {newsletterSent ? <p className="douro-form-feedback">Cadastro recebido. Em breve você recebe nossas novidades.</p> : null}
      </div>
      <div className="douro-widget" data-reveal>
        <h3 className="douro-widget-title">Siga-nos</h3>
        <div className="douro-social-row">
          <a href="https://www.instagram.com/douromarmores" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
          <a href="https://www.pinterest.com" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p" aria-hidden="true" /></a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></a>
          <a href={whatsappUrl} aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="douro-widget douro-material-widget" data-reveal>
        <span className="douro-kicker">Material do mês</span>
        <img src={materialOfMonth.image} alt={materialOfMonth.imageAlt} loading="lazy" />
        <h3>{materialOfMonth.material?.name ?? materialOfMonth.title}</h3>
        <p>{materialOfMonth.summary}</p>
        <button className="douro-link-inline" onClick={() => openPost(materialOfMonth.slug)}>Ver aplicações e diferenciais <i className="fa-solid fa-arrow-right" aria-hidden="true" /></button>
      </div>
    </aside>
  );

  const renderInsightSection = () => (
    <section className="douro-alt-section" id="mais-lidos">
      <div className="douro-container douro-split-large">
        <div className="douro-card douro-panel" data-reveal>
          <span className="douro-kicker">Mais lidos</span>
          <h2 className="douro-section-title douro-title-black">Os conteúdos mais consultados por quem quer escolher melhor antes de comprar</h2>
          <div className="douro-most-read-stack">
            {popularPosts.slice(0, 2).map((p, i) => (
              <div key={p.id} className="douro-most-read-row" role="button" tabIndex={0} onClick={() => openPost(p.slug)} onKeyDown={(e) => activateOnEnterOrSpace(e, () => openPost(p.slug))}>
                <span className="douro-most-read-index">{String(i + 1).padStart(2, '0')}</span>
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
                <div className="douro-most-read-body"><strong>{p.title}</strong><small>{formatViews(p.views)} visualizações</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="douro-grid-small">
          <div className="douro-card douro-panel" id="sobre-blog" data-reveal>
            <span className="douro-kicker">Sobre o blog</span>
            <h2 className="douro-section-title douro-title-black">Escolha com mais segurança, bom gosto e clareza técnica.</h2>
            <p className="douro-section-text">Aqui você encontra orientações sobre materiais, aplicações, acabamentos e manutenção para tomar decisões mais seguras em cozinhas, banheiros, áreas gourmet, escadas, painéis e revestimentos.</p>
          </div>
          <div className="douro-card douro-panel douro-panel-dark" data-reveal>
            <span className="douro-kicker">Precisa de ajuda agora?</span>
            <h2 className="douro-section-title">Fale com a Douro e evite errar na escolha do material.</h2>
            <p>Receba uma orientação rápida para entender qual pedra ou superfície combina melhor com o seu uso, o estilo do ambiente e o resultado que você deseja alcançar.</p>
            <div className="douro-action-row">
              <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Solicitar orientação</a>
              <a className="douro-ghost-button" href={whatsappUrl} target="_blank" rel="noreferrer noopener">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCategories = () => (
    <section className="douro-section douro-section-white" id="categorias">
      <div className="douro-container">
        <div className="douro-center-head">
          <span className="douro-kicker">Explore por categoria</span>
          <h2 className="douro-section-title douro-title-black">Encontre mais rápido o conteúdo ideal para o seu projeto</h2>
          <p>Navegue por materiais, ambientes, manutenção, tendências e aplicações para chegar com mais segurança à escolha certa.</p>
        </div>
        <div className="douro-category-grid">
          {activeCategories.filter((c) => c.slug !== 'todos').map((cat) => (
            <button key={cat.slug} className="douro-category-card" onClick={() => applyCategoryFilter(cat.slug)} data-reveal>
              <div className="douro-category-media"><img src={activePosts.find((p) => p.categorySlug === cat.slug)?.image ?? heroImage} alt={cat.description} loading="lazy" /></div>
              <div className="douro-category-body"><h3>{cat.label}</h3><p>{cat.count} artigos</p></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Loading indicator ── */
  /* ── Admin routing ── */
  useEffect(() => {
    const checkAdmin = () => {
      if (window.location.hash.startsWith('#/admin')) {
        setPage('admin');
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  /* ── Home page ── */
  const renderHome = () => (
    <main id="conteudo-principal" className="douro-main" aria-label="Conteúdo do blog Douro Mármores">
      {renderFeaturedSection()}
      {renderHeroHeader()}
      <section className="douro-section" id="publicacoes" ref={publicationsRef}>
        <div className="douro-container douro-home-layout">
          <div>
            <div className="douro-section-head-inline">
              <div>
                <span className="douro-kicker">Publicações</span>
                <h2 className="douro-section-title douro-title-black">Conteúdo para comparar materiais, evitar erros e escolher com mais segurança</h2>
              </div>
              <p>Guias, comparativos e orientações práticas para ajudar você a definir o melhor material antes de falar com a nossa equipe.</p>
            </div>
            {searchTerm.trim() ? (
              <div className="douro-search-feedback" aria-live="polite">
                {filteredPosts.length > 0 ? `Mostrando ${filteredPosts.length} resultado(s) para "${searchTerm}".` : `Nenhum resultado encontrado para "${searchTerm}".`}
              </div>
            ) : null}
            <div className="douro-card-grid">
              {isFiltering ? renderSkeletons() : publicationResults.map((p, i) => renderCard(p, i))}
            </div>
          </div>
          {renderSidebar()}
        </div>
      </section>
      {renderInsightSection()}
      {renderCategories()}
      <section className="douro-dark-section" id="cta-final">
        <div className="douro-container douro-final-cta">
          <div>
            <span className="douro-kicker">Atendimento consultivo</span>
            <h2>Tem um projeto em mente? Fale com a Douro e avance com mais segurança.</h2>
            <p>Tire dúvidas, compare materiais e entenda qual solução faz mais sentido para o seu ambiente antes de seguir para o orçamento.</p>
          </div>
          <div className="douro-final-cta-actions">
            <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Falar no WhatsApp</a>
            <a className="douro-ghost-button" href="tel:+5511923210038">Ligar agora</a>
          </div>
        </div>
      </section>
    </main>
  );

  /* ── Article block renderers ── */
  const renderArticleBlocks = (section: ArticleSection, sectionIndex: number) => (
    <section key={section.id} className="douro-article-section" ref={(node) => { sectionRefs.current[section.id] = node; }}>
      <h2 id={section.id}>{section.title}</h2>
      {section.blocks.map((block, bi) => {
        if (block.type === 'paragraph') {
          return (
            <Fragment key={`${section.id}-p-${bi}`}>
              {block.content.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              {sectionIndex === 0 && bi === 0 ? (
                <div className="douro-inline-cta">
                  <span className="douro-kicker">Orientação técnica</span>
                  <h3>Quer saber qual material vale mais a pena para o seu projeto?</h3>
                  <p>Fale com a Douro para comparar opções e entender qual escolha entrega o melhor resultado para o seu ambiente.</p>
                  <div className="douro-action-row">
                    <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Solicitar orientação</a>
                    <button className="douro-social-action" onClick={copyLink}><span className="douro-social-icon-wrap"><i className="fa-solid fa-link" aria-hidden="true" /></span>Copiar link</button>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        }
        if (block.type === 'callout') return <div key={`${section.id}-co-${bi}`} className={`douro-highlight-box douro-${block.variant}`}><strong>{block.title}</strong><p>{block.content}</p></div>;
        if (block.type === 'list') return <ul key={`${section.id}-l-${bi}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        if (block.type === 'subsection') return <div key={block.id} ref={(node) => { sectionRefs.current[block.id] = node; }}><h3 id={block.id}>{block.title}</h3>{block.content.map((p) => <p key={p.slice(0, 22)}>{p}</p>)}</div>;
        if (block.type === 'table') return <div key={`${section.id}-t-${bi}`} className="douro-table-wrap"><h3>{block.title}</h3><table className="douro-compare-table"><thead><tr>{block.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead><tbody>{block.rows.map((r, ri) => <tr key={`${ri}-${r[0]}`}>{r.map((cell, ci) => <td key={`${cell}-${ci}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
        if (block.type === 'specs') return <div key={`${section.id}-s-${bi}`} className="douro-spec-card"><div className="douro-spec-card-head"><span className="douro-kicker">Ficha técnica da pedra</span><h3>{block.title}</h3></div><div className="douro-spec-grid">{block.items.map((item) => <div key={item.label} className="douro-spec-item"><small>{item.label}</small><strong>{item.value}</strong></div>)}</div>{currentPost.material ? <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">{currentPost.material.ctaLabel}</a> : null}</div>;
        if (block.type === 'gallery') return <div key={`${section.id}-g-${bi}`} className="douro-gallery-block"><h3>{block.title}</h3><div className="douro-gallery-grid">{block.images.map((img) => <figure key={img.alt}><img src={img.src} alt={img.alt} loading="lazy" /><figcaption>{img.caption}</figcaption></figure>)}</div></div>;
        if (block.type === 'quote') return <blockquote key={`${section.id}-q-${bi}`} className="douro-quote-block"><p>{block.content}</p><cite>{block.author}</cite></blockquote>;
        return null;
      })}
    </section>
  );

  /* ── HTML content renderer (from PHP API) ── */
  const renderHtmlContent = () => {
    if (!currentPost.htmlContent) return null;
    return (
      <div
        className="douro-prose html-content"
        ref={articleContentRef}
        dangerouslySetInnerHTML={{ __html: currentPost.htmlContent }}
      />
    );
  };

  /* ── Post page ── */
  const renderPost = () => (
    <main id="conteudo-principal" className="douro-main">
      <div className="douro-reading-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <section className="douro-post-hero">
        <img src={currentPost.image} alt={currentPost.imageAlt} className="douro-post-hero-media" loading="eager" />
        <div className="douro-post-hero-overlay" />
        <div className="douro-container douro-post-hero-content">
          <div className="douro-breadcrumb-row is-light">
            <button onClick={navigateHome}>Home</button>
            <i className="fa-solid fa-angle-right" aria-hidden="true" />
            <button onClick={navigateHome}>Blog</button>
            <i className="fa-solid fa-angle-right" aria-hidden="true" />
            <span>{activeCategories.find((c) => c.slug === currentPost.categorySlug)?.label}</span>
          </div>
          <span className="douro-pill-dark is-gold">{activeCategories.find((c) => c.slug === currentPost.categorySlug)?.label}</span>
          <h1>{currentPost.title}</h1>
          <p className="douro-post-hero-summary">{currentPost.summary}</p>
          <div className="douro-post-hero-meta">
            <span className="douro-author-meta">
              <img src={currentPost.author.avatar} alt={currentPost.author.name} loading="lazy" />
              <span><strong>{currentPost.author.name}</strong><small>{currentPost.author.role}</small></span>
            </span>
            <time dateTime={currentPost.isoDate}>{currentPost.date}</time>
            <span>{articleReadingTime} min de leitura</span>
            <span>{formatViews(currentPost.views)} leituras</span>
            <span>Atualizado em {currentPost.updated}</span>
          </div>
        </div>
      </section>
      <section className="douro-section">
        <div className="douro-container douro-single-layout">
          <aside className="douro-share-rail" aria-label="Compartilhar artigo">
            <button className="douro-social-action" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(currentPost.title)}`)}><span className="douro-social-icon-wrap"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></span>WhatsApp</button>
            <button className="douro-social-action" onClick={() => window.open('https://www.linkedin.com')}><span className="douro-social-icon-wrap"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></span>LinkedIn</button>
            <button className="douro-social-action" onClick={() => window.open('https://www.pinterest.com')}><span className="douro-social-icon-wrap"><i className="fa-brands fa-pinterest-p" aria-hidden="true" /></span>Pinterest</button>
            <button className="douro-social-action" onClick={copyLink}><span className="douro-social-icon-wrap"><i className="fa-solid fa-link" aria-hidden="true" /></span>Copiar link</button>
          </aside>
          <article className="douro-single-card douro-card">
            <div className="douro-featured-image"><img src={currentPost.image} alt={currentPost.imageAlt} loading="lazy" /></div>
            <div className="douro-single-grid">
              <div>
                {/* Content: structured blocks OR HTML from API */}
                {currentPost.sections.length > 0 ? (
                  <div className="douro-prose" ref={articleContentRef}>
                    {currentPost.sections.map((s, si) => renderArticleBlocks(s, si))}
                  </div>
                ) : (
                  renderHtmlContent()
                )}

                {/* CTA Dark */}
                <div className="douro-cta-dark">
                  <span className="douro-kicker">Gostou deste material?</span>
                  <h3>Receba uma orientação rápida para entender se ele faz sentido para o seu projeto.</h3>
                  <p>Tire dúvidas sobre uso, acabamento, manutenção e combinação com o ambiente antes de seguir para a próxima etapa.</p>
                  <form className="douro-mini-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Seu nome" aria-label="Seu nome" />
                    <input type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" />
                    <input type="tel" placeholder="Seu telefone" aria-label="Seu telefone" />
                    <input type="text" placeholder="Material de interesse" aria-label="Material de interesse" />
                    <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Enviar no WhatsApp</a>
                  </form>
                </div>

                {/* Author box */}
                <div className="douro-author-box">
                  <img src={currentPost.author.avatar} alt={currentPost.author.name} loading="lazy" />
                  <div>
                    <span className="douro-kicker">Autor</span>
                    <h3>{currentPost.author.name}</h3>
                    <p>Conteúdo produzido pela curadoria da Douro Mármores para orientar arquitetos, designers, construtoras e clientes finais na escolha de materiais, aplicações e acabamentos em superfícies premium.</p>
                    <div className="douro-social-row compact">
                      <a href="https://www.instagram.com/douromarmores" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
                      <a href="https://www.linkedin.com" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></a>
                      <a href={whatsappUrl} aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></a>
                    </div>
                  </div>
                </div>

                {/* Related */}
                {relatedPosts.length > 0 ? (
                  <section className="douro-related-posts">
                    <div className="douro-related-heading"><span className="douro-related-line" /><h2>Você também pode gostar</h2></div>
                    <div className="douro-related-grid">{relatedPosts.map((p, i) => renderCard(p, i))}</div>
                  </section>
                ) : null}

                {/* Comments */}
                <section className="douro-comments-card douro-widget">
                  <h2 className="douro-comments-title">Comentários e interações</h2>
                  <div className="douro-comments-list">
                    {activeComments.map((comment) => {
                      const liked = commentLikes[comment.id];
                      const likes = liked ? comment.likes + 1 : comment.likes;
                      return (
                        <article key={comment.id} className="douro-comment-item">
                          <header><strong>{comment.name}</strong><span>{comment.role}</span><time>{comment.date}</time></header>
                          <p>{comment.content}</p>
                          <div className="douro-comment-actions">
                            <button className={`douro-social-action ${liked ? 'is-liked' : ''}`} onClick={() => toggleCommentLike(comment.id)}><span className="douro-social-icon-wrap"><i className="fa-regular fa-heart" aria-hidden="true" /></span>Curtir ({likes})</button>
                            <button className="douro-social-action"><span className="douro-social-icon-wrap"><i className="fa-regular fa-comment" aria-hidden="true" /></span>Responder</button>
                            <button className="douro-social-action" onClick={copyLink}><span className="douro-social-icon-wrap"><i className="fa-solid fa-share-nodes" aria-hidden="true" /></span>Compartilhar</button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="douro-article-aside">
                {allHeadings.length > 0 ? (
                  <div className="douro-widget douro-toc-widget">
                    <span className="douro-kicker">Neste artigo</span>
                    <nav aria-label="Sumário do artigo">
                      <ul className="douro-article-outline">
                        {allHeadings.map((h) => (
                          <li key={h.id} className={h.level === 3 ? 'douro-outline-level-3' : ''}>
                            <button className={`douro-outline-link ${activeHeading === h.id ? 'is-active' : ''}`} onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{h.title}</button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                ) : null}
                <div className="douro-widget douro-widget-cta">
                  <span className="douro-kicker">Precisa de ajuda agora?</span>
                  <h3>Converse com a Douro e escolha com mais segurança.</h3>
                  <p>Receba uma orientação objetiva para entender qual material combina melhor com o seu uso e com o resultado que você espera.</p>
                  <a className="douro-cta" href={whatsappUrl} target="_blank" rel="noreferrer noopener">Solicitar orientação</a>
                  <a className="douro-ghost-button dark" href={whatsappUrl} target="_blank" rel="noreferrer noopener">WhatsApp</a>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </section>
    </main>
  );

  /* ══════════════════════════════════════════════════════════════
     MAIN RENDER
     ══════════════════════════════════════════════════════════════ */
  /* ── Admin route ── */
  if (page === 'admin') {
    return <AdminApp />;
  }

  return (
    <div className="blog-app douro-shell">
      {renderTopBar()}
      {renderHeader()}
      {page === 'home' ? renderHome() : renderPost()}

      {/* Data source indicator */}
      {apiMode && (
        <div className="douro-wp-badge" title="Conteúdo carregado da API">
          <i className="fa-solid fa-database" aria-hidden="true" /> API
        </div>
      )}

      <footer className="douro-footer">
        <div className="douro-container douro-footer-grid">
          <div>
            <div className="douro-footer-brand">
              <DouroLogoMark />
              <div className="douro-footer-brand-copy">
                <strong><span className="brand-douro">DOURO</span><span className="brand-marmores">MÁRMORES</span></strong>
                <span className="douro-brand-blog">Blog</span>
              </div>
            </div>
            <p>Conteúdo editorial para orientar escolhas em mármore, granito, quartzito e superfícies premium com mais segurança, repertório e confiança.</p>
          </div>
          <div>
            <h3>Conteúdo</h3>
            <ul>
              <li><button className="footer-link" onClick={navigateHome}>Início do blog</button></li>
              <li><button className="footer-link" onClick={() => scrollToSection('categorias')}>Categorias</button></li>
              <li><button className="footer-link" onClick={() => openPost(featuredPost.slug)}>Artigo em destaque</button></li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="tel:+5511923210038">(11) 92321-0038</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noreferrer noopener">WhatsApp</a></li>
              <li><a href="mailto:contato@douromarmores.com.br">contato@douromarmores.com.br</a></li>
            </ul>
          </div>
          <div>
            <h3>Relacionados</h3>
            <ul>
              <li><a href="https://douromarmores.com.br" target="_blank" rel="noreferrer noopener">Site institucional</a></li>
              <li><a href="https://www.instagram.com/douromarmores" target="_blank" rel="noreferrer noopener">Instagram</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noreferrer noopener">Atendimento consultivo</a></li>
            </ul>
          </div>
        </div>
        <div className="douro-container douro-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 Douro Mármores. Todos os direitos reservados.</span>
          <a href="#/admin" style={{ color: 'rgba(201,169,97,0.5)', fontSize: 12, transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a961')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201,169,97,0.5)')}>Painel Admin</a>
        </div>
      </footer>

      {/* WhatsApp float */}
      <div className="douro-whatsapp-float">
        <a className="douro-whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer noopener">
          <span className="douro-whatsapp-note"><span>Online agora</span><strong>Fale com a Douro Mármores</strong></span>
          <span className="douro-whatsapp-bubble" aria-hidden="true"><i className="fa-brands fa-whatsapp douro-whatsapp-icon" /></span>
        </a>
      </div>

      <button className={`douro-backtop ${showBackToTop ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo">
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      </button>

      {popupOpen ? (
        <div className="douro-popup-backdrop" role="dialog" aria-modal="true" aria-label="Baixe o guia de pedras naturais">
          <div className="douro-popup-card">
            <button className="douro-popup-close" onClick={() => setPopupOpen(false)} aria-label="Fechar popup"><i className="fa-solid fa-xmark" aria-hidden="true" /></button>
            <span className="douro-kicker">Antes de sair</span>
            <h2>Baixe nosso Guia de Pedras Naturais 2025</h2>
            <p>Um material objetivo para comparar superfícies, entender aplicações e escolher com mais segurança antes do orçamento.</p>
            <form className="douro-popup-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Seu nome" aria-label="Seu nome" />
              <input type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" />
              <button type="submit" className="douro-cta">Quero receber</button>
            </form>
          </div>
        </div>
      ) : null}

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {articleSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /> : null}
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
    </div>
  );
}

export default App;
