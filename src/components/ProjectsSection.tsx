import React, { useEffect, useMemo, useRef, useState } from "react";

import { ASSETS, type GalleryItem, type ProjectCategory } from "@/data/assets";
import watermarkUrl from "@/assets/watermark.svg";

// NOTE: We avoid importing PageKey from App.tsx (not exported). The navigation prop is typed as `any`.

type ProjectsSectionProps = {
  show: boolean;
  page: string;
  onNav: (page: any, hash?: string) => void;
  onOpenLightbox: (img: { src: string; alt: string }) => void;
  SmartImg: React.ComponentType<{
    src: string;
    alt: string;
    className?: string;
    loading?: "lazy" | "eager";
    fallbackSrcs?: string[];
    sizes?: string;
    fetchPriority?: "high" | "low" | "auto";
  }>;
};

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  cozinhas: "Cozinhas",
  "espaco-gourmet": "Espaço gourmet",
  banheiros: "Banheiros",
  lavabos: "Lavabos",
  escadas: "Escadas",
  churrasqueiras: "Churrasqueiras",
  lareiras: "Lareiras",
  bancadas: "Bancadas",
  "piso-hall": "Piso & hall",
  mesas: "Mesas",
  "area-externa": "Área externa",
  ambientes: "Ambientes",
};

const CATEGORY_ICON: Record<ProjectCategory, string> = {
  cozinhas: "fa-utensils",
  "espaco-gourmet": "fa-champagne-glasses",
  banheiros: "fa-bath",
  lavabos: "fa-sink",
  escadas: "fa-stairs",
  churrasqueiras: "fa-fire",
  lareiras: "fa-fireplace",
  bancadas: "fa-ruler-combined",
  "piso-hall": "fa-border-all",
  mesas: "fa-table",
  "area-externa": "fa-tree",
  ambientes: "fa-house",
};

const CATEGORY_COPY: Record<ProjectCategory, { title: string; subtitle: string; bullets: string[] }> = {
  cozinhas: {
    title: "Cozinhas",
    subtitle:
      "Cozinha boa não é só ‘bonita’: é proporção, luz e textura. Aqui você vê bancadas/ilhas onde o material conversa com a marcenaria, metais e iluminação — e o acabamento some para o ambiente aparecer.",
    bullets: [
      "Escolha de material por rotina + estética",
      "Paginação do veio e emendas onde ‘desaparecem’",
      "Detalhe premium: meia‑esquadria 45º",
    ],
  },
  "espaco-gourmet": {
    title: "Espaço gourmet",
    subtitle:
      "Espaço gourmet bonito é aquele que ‘aguenta’ o uso e ainda assim parece cenário: contraste certo, textura certa e materiais que não te deixam refém de manutenção.",
    bullets: ["Material certo para calor + manchas", "Bordas e recortes com desenho limpo", "Detalhe que eleva: paginação + 45º"],
  },
  banheiros: {
    title: "Banheiros",
    subtitle:
      "Banheiro sofisticado tem um segredo: continuidade. Menos recortes aparentes, menos juntas, mais planos bem resolvidos e uma pedra que conversa com a luz.",
    bullets: ["Lavatórios e nichos sob medida", "Encontros limpos (menos ‘ruído’)", "Escolha guiada para área molhada"],
  },
  lavabos: {
    title: "Lavabos",
    subtitle:
      "Lavabo é o ‘uau’ rápido: aqui vale ousar. Pedra com personalidade, contraste e iluminação pensada transformam poucos metros em assinatura.",
    bullets: ["Parede de destaque", "Cuba esculpida / tampos especiais", "Materiais de efeito e acabamento fino"],
  },
  escadas: {
    title: "Escadas",
    subtitle:
      "Escada bonita parece ‘nascida’ no lugar: alinhamento, proporção e cortes precisos. Quando o detalhe está certo, o olhar só vê elegância.",
    bullets: ["Cortes no esquadro", "Peças alinhadas e niveladas", "Acabamento resistente"],
  },
  churrasqueiras: {
    title: "Churrasqueiras",
    subtitle:
      "Aqui a estética precisa caminhar com desempenho: calor, gordura, uso intenso. A solução certa é a que mantém o visual premium na rotina real.",
    bullets: ["Material adequado ao calor/uso", "Detalhes que facilitam limpeza", "Instalação segura"],
  },
  lareiras: {
    title: "Lareiras",
    subtitle:
      "Lareira é ponto focal. O que deixa ‘caro’ é proporção + paginação do veio + cortes limpos. A pedra vira moldura do ambiente.",
    bullets: ["Painéis e molduras sob medida", "Paginação do veio e cortes limpos", "Compatibilidade com calor (conforme projeto)"],
  },
  bancadas: {
    title: "Bancadas",
    subtitle:
      "Bancada premium não grita — ela ‘assina’. O que define é a combinação de material, borda, emenda bem posicionada e um nível perfeito.",
    bullets: ["Recortes limpos", "Emendas discretas", "Bordas premium (45º)"],
  },
  "piso-hall": {
    title: "Piso & hall",
    subtitle:
      "Entrada é primeira impressão. Pedras bem aplicadas em halls e pisos criam continuidade visual e sensação imediata de ‘alto padrão’.",
    bullets: ["Transições elegantes", "Acabamentos bem fechados", "Durabilidade"],
  },
  mesas: {
    title: "Mesas",
    subtitle:
      "Mesa em pedra é peça-joia: textura, brilho e desenho do veio determinam o clima do ambiente — do minimal ao dramático.",
    bullets: ["Tampo com borda premium", "Escolha do desenho do veio", "Entrega sob medida"],
  },
  "area-externa": {
    title: "Área externa",
    subtitle:
      "Área externa pede beleza com critério: sol, chuva e variação térmica exigem material e acabamento certos — para durar sem perder cor e presença.",
    bullets: ["Seleção correta por desempenho", "Acabamento para uso externo", "Planejamento de instalação"],
  },
  ambientes: {
    title: "Ambientes",
    subtitle:
      "Quando a pedra vira protagonista, o segredo é equilíbrio: textura, proporção e luz. O resultado é aquele ‘parece revista’ sem exagero.",
    bullets: ["Painéis e paredes de destaque", "Paginação do veio", "Acabamento silencioso"],
  },
};

const CATEGORIES_ORDER: ProjectCategory[] = [
  "cozinhas",
  "espaco-gourmet",
  "banheiros",
  "lavabos",
  "escadas",
  "churrasqueiras",
  "lareiras",
  "bancadas",
  "piso-hall",
  "mesas",
  "area-externa",
  "ambientes",
];

function categoryFromPage(page: string): ProjectCategory | null {
  if (!page.startsWith("projetos-")) return null;
  const slug = page.slice("projetos-".length);
  const match = CATEGORIES_ORDER.find((c) => c === (slug as any));
  return match || null;
}

function pageFromCategory(category: ProjectCategory) {
  return `projetos-${category}`;
}

function pickCoverForCategory(items: GalleryItem[], category: ProjectCategory, seed: number) {
  // Evita escolher vídeo como capa (SmartImg não renderiza MP4).
  const isVideo = (u?: string) => (u || "").toLowerCase().endsWith(".mp4");

  const pool = items.filter((g) => g.category === category && !isVideo(g.thumb) && !isVideo(g.full));
  if (pool.length === 0) return ASSETS.produtosHub.quartzitos;

  const hash32 = (str: string) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const mulberry32 = (a: number) => {
    return () => {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const rng = mulberry32((seed ^ hash32(category)) >>> 0);
  const idx = Math.floor(rng() * pool.length);
  const it = pool[Math.min(Math.max(idx, 0), pool.length - 1)];
  return it?.thumb || it?.full || ASSETS.produtosHub.quartzitos;
}

type ProjectGroup = { key: string; title: string; items: GalleryItem[] };

function mediaCandidates(src: string) {
  const out: string[] = [];
  const add = (u: string) => {
    if (!u) return;
    if (!out.includes(u)) out.push(u);
  };

  const clean = (u: string) => u;
  const isVideo = clean(src).toLowerCase().endsWith(".mp4");

  // original first
  add(clean(src));

  // If it's a relative /media/... path, try the extra Hostinger bases.
  if (src.startsWith("/media/")) {
    const bases = (ASSETS as any).mediaExtraBases as string[] | undefined;
    if (Array.isArray(bases)) {
      // For images, prefer preview small/medium first (faster).
      // For videos (mp4), prefer the real files/public_html (preview endpoints usually don't serve mp4).
      const orderedBases = isVideo
        ? bases.filter((b) => b.includes("/files/public_html"))
        : bases;

      for (const base of orderedBases) {
        if (!base) continue;
        add(`${base}${src}`);
      }

      // If it's a video and we filtered too much, still try all bases as fallback.
      if (isVideo) {
        for (const base of bases) {
          if (!base) continue;
          add(`${base}${src}`);
        }
      }
    }

    // Also try the hostinger-style path prefixes even without base.
    if (isVideo) {
      add(src.replace("/media/", "/files/public_html/media/"));
    } else {
      add(src.replace("/media/", "/api/preview/small/public_html/media/"));
      add(src.replace("/media/", "/api/preview/medium/public_html/media/"));
      add(src.replace("/media/", "/api/preview/big/public_html/media/"));
      add(src.replace("/media/", "/files/public_html/media/"));
    }
  }

  // If absolute, try mapping to /media/... when possible.
  try {
    const u = new URL(src);
    const p = u.pathname;
    const idx = p.indexOf("/media/");
    if (idx >= 0) {
      add(p.slice(idx));
    }
  } catch {
    // ignore
  }

  return out;
}

function optimizedImageSources(src: string, mode: "thumb" | "main") {
  const all = mediaCandidates(src);
  if (!src || src.toLowerCase().endsWith(".mp4")) return all;

  const score = (u: string) => {
    let s = 0;
    if (mode === "thumb") {
      if (u.includes("/api/preview/small/")) s += 100;
      if (u.includes("/api/preview/medium/")) s += 60;
      if (u.includes("/files/public_html/")) s += 20;
      if (u.includes("/api/preview/big/")) s -= 10;
    } else {
      if (u.includes("/api/preview/medium/")) s += 100;
      if (u.includes("/api/preview/big/")) s += 70;
      if (u.includes("/files/public_html/")) s += 25;
      if (u.includes("/api/preview/small/")) s += 10;
    }

    if (u.startsWith("/media/")) s += 8;
    if (u.includes("douromarmores.com.br/media/")) s += 6;
    return s;
  };

  return [...all].sort((a, b) => score(b) - score(a));
}


function ProjectShowcase({
  group,
  SmartImg,
  onOpenLightbox,
}: {
  group: ProjectGroup;
  SmartImg: ProjectsSectionProps["SmartImg"];
  onOpenLightbox: ProjectsSectionProps["onOpenLightbox"];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleThumbCount, setVisibleThumbCount] = useState(8);
  const safeIdx = Math.min(Math.max(activeIdx, 0), Math.max(group.items.length - 1, 0));
  const active = group.items[safeIdx] || group.items[0];
  if (!active) return null;

  const mainRef = useRef<HTMLButtonElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleThumbCount(8);
  }, [group.key]);

  useEffect(() => {
    if (safeIdx + 4 > visibleThumbCount) {
      setVisibleThumbCount((prev) => Math.min(prev + 6, group.items.length));
    }
  }, [safeIdx, visibleThumbCount, group.items.length]);

  const displayedThumbs = group.items.slice(0, visibleThumbCount);

  const scrollThumbs = (dir: -1 | 1) => {
    const el = thumbsRef.current;
    if (!el) return;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    if (isDesktop) {
      el.scrollBy({ top: dir * 320, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const ensureMainInView = () => {
    const el = mainRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 12;
    const fullyVisible = r.top >= margin && r.bottom <= window.innerHeight - margin;
    if (!fullyVisible) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isAllGallery = group.key === "__all__";

  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-gray-500">{isAllGallery ? "Galeria" : "Projeto"}</div>
          <div className="mt-1 font-bold text-gray-900 text-xl">{group.title}</div>
          <div className="mt-1 text-sm text-gray-600">{group.items.length} foto(s)</div>
        </div>

        <div className="text-sm text-gray-500">Clique nas miniaturas para ampliar</div>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-5 xl:gap-6">
        <div className="sticky top-[calc(var(--douro-header-offset,0px)+12px)] z-10 min-w-0 lg:max-w-full">
          {active.full.toLowerCase().endsWith(".mp4") ? (
            <div className="group relative overflow-hidden rounded-2xl aspect-[16/10] bg-gray-950 hover-lift w-full">
              {/* Importante: não colocamos o vídeo dentro de <button>, senão o clique no play acaba disparando navegação/lightbox. */}
              <video
                key={active.full}
                className="absolute inset-0 w-full h-full object-contain"
                playsInline
                controls
                preload="metadata"
                controlsList="nodownload"
              >
                {mediaCandidates(active.full).map((u) => (
                  <source key={u} src={u} type="video/mp4" />
                ))}
                Seu navegador não suporta vídeo.
              </video>

              <div className="wm-overlay wm-strong" aria-hidden="true" style={{ backgroundImage: `url('${watermarkUrl}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white font-semibold">{active.title}</div>
                    <div className="text-white/75 text-sm">{active.subtitle}</div>
                  </div>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-black/45 border border-white/15 px-3 py-1 text-[11px] tracking-widest uppercase text-white">
                    Vídeo
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <button
              ref={mainRef}
              type="button"
              className="group relative overflow-hidden rounded-2xl aspect-[16/10] bg-gray-100 hover-lift text-left w-full"
              onClick={() => onOpenLightbox({ src: active.full, alt: active.title })}
              aria-label={`Abrir mídia ampliada: ${active.title}`}
            >
              <SmartImg
                key={active.full}
                src={optimizedImageSources(active.full, "main")[0] || active.full}
                fallbackSrcs={Array.from(new Set([active.thumb, ...optimizedImageSources(active.full, "main").slice(1)]))}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 900px, (min-width: 1024px) 760px, 100vw"
              />
              <div className="wm-overlay wm-strong" aria-hidden="true" style={{ backgroundImage: `url('${watermarkUrl}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white font-semibold">{active.title}</div>
                    <div className="text-white/75 text-sm">{active.subtitle}</div>
                  </div>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-black/45 border border-white/15 px-3 py-1 text-[11px] tracking-widest uppercase text-white">
                    Foto {safeIdx + 1} / {group.items.length}
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="min-w-0 lg:sticky lg:top-[calc(var(--douro-header-offset,0px)+12px)] lg:w-full">
          <div className="flex items-center justify-between gap-3 lg:mb-3">
            <div className="text-sm font-semibold text-gray-900">Miniaturas</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollThumbs(-1)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition"
                aria-label="Miniaturas anteriores"
                title="Anterior"
              >
                <i className="fas fa-chevron-left lg:fa-chevron-up" />
              </button>
              <button
                type="button"
                onClick={() => scrollThumbs(1)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition"
                aria-label="Próximas miniaturas"
                title="Próximo"
              >
                <i className="fas fa-chevron-right lg:fa-chevron-down" />
              </button>
            </div>
          </div>

          <div
            ref={thumbsRef}
            className="carousel-track flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[620px] lg:pr-1 lg:w-full"
          >
            {displayedThumbs.map((g, i) => {
              const isActive = i === safeIdx;
              const isVideo = (g.full || "").toLowerCase().endsWith(".mp4");
              return (
                <button
                  key={`${g.full}_${i}`}
                  type="button"
                  onClick={() => {
                    setActiveIdx(i);
                    requestAnimationFrame(() => ensureMainInView());
                  }}
                  className={[
                    "carousel-item relative shrink-0 overflow-hidden rounded-xl aspect-square bg-gray-100 border transition w-[84px] sm:w-[96px] lg:w-full lg:min-w-0",
                    isActive ? "border-gold ring-2 ring-[rgba(201,169,97,0.35)]" : "border-gray-200 hover:border-gray-400",
                  ].join(" ")}
                  aria-label={`Selecionar ${isVideo ? "vídeo" : "foto"} ${i + 1}: ${g.title}`}
                  aria-pressed={isActive}
                >
                  {isVideo ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                        <i className="fas fa-play text-gold" />
                      </div>
                      <div className="mt-2 text-[10px] tracking-widest uppercase text-white/80">Vídeo</div>
                    </div>
                  ) : (
                    <SmartImg
                      src={optimizedImageSources(g.thumb || g.full, "thumb")[0] || g.thumb || g.full}
                      fallbackSrcs={Array.from(new Set([g.full, ...optimizedImageSources(g.thumb || g.full, "thumb").slice(1)]))}
                      alt={g.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      sizes="(min-width: 1024px) 120px, (min-width: 640px) 96px, 84px"
                      fetchPriority="low"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {visibleThumbCount < group.items.length ? (
            <div className="mt-3 flex justify-center lg:justify-stretch">
              <button
                type="button"
                onClick={() => setVisibleThumbCount((prev) => Math.min(prev + 6, group.items.length))}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition w-full"
              >
                Carregar mais miniaturas
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection(props: ProjectsSectionProps) {
  const { show, page, onNav, onOpenLightbox, SmartImg } = props;
  if (!show) return null;

  const isHub = page === "projetos";
  const cat = categoryFromPage(page);
  const isCategoryPage = Boolean(cat);

  // Capa aleatória das categorias: muda sempre que você entra em ?p=projetos
  // (estável durante a mesma visita ao hub, sem "piscar" a cada render)
  const [coverSeed, setCoverSeed] = useState<number>(() => Date.now());
  useEffect(() => {
    if (page === "projetos") setCoverSeed(Date.now());
  }, [page]);

  const counts = useMemo(() => {
    const base: Record<ProjectCategory, number> = {
      cozinhas: 0,
      "espaco-gourmet": 0,
      banheiros: 0,
      lavabos: 0,
      escadas: 0,
      churrasqueiras: 0,
      lareiras: 0,
      bancadas: 0,
      "piso-hall": 0,
      mesas: 0,
      "area-externa": 0,
      ambientes: 0,
    };
    for (const g of ASSETS.galeria) base[g.category] += 1;
    return base;
  }, []);

  const items = useMemo(() => {
    if (cat) return ASSETS.galeria.filter((g) => g.category === cat);
    // Home shows all (the App routes home to this same section id)
    if (!isHub) return ASSETS.galeria;
    // Hub page does not show the full gallery (performance). It shows just categories.
    return [] as GalleryItem[];
  }, [cat, isHub]);

  return (
    <section id="galeria" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {isHub ? (
          <>
            <div className="max-w-5xl mb-10 text-left">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Projetos</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-5">
                Projetos por <span className="text-gold">ambiente</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Olhe como um decorador olha: <strong>luz</strong> (quente/fria), <strong>contraste</strong> com marcenaria e metais, <strong>textura</strong> do acabamento (polido/leather/fosco) e <strong>proporção</strong> dos planos.
                Escolha um ambiente e veja referências reais — com foco no que mais muda a sensação de “alto padrão”: <strong>continuidade</strong>, <strong>paginação</strong> do veio e <strong>detalhe limpo</strong>.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES_ORDER.slice(0, 12).map((c) => {
                const count = counts[c] || 0;
                const cover = pickCoverForCategory(ASSETS.galeria, c, coverSeed);
                return (
                  <a
                    key={c}
                    href={`?p=${pageFromCategory(c)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNav(pageFromCategory(c));
                    }}
                    className="group relative overflow-hidden rounded-3xl aspect-[16/10] hover-lift border border-white/30"
                    aria-label={`Abrir categoria: ${CATEGORY_LABEL[c]}`}
                  >
                    <SmartImg
                      src={cover}
                      alt={CATEGORY_LABEL[c]}
                      className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      fetchPriority="low"
                    />
                    <div
                      className="wm-overlay"
                      aria-hidden="true"
                      style={{ backgroundImage: `url('${watermarkUrl}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs tracking-widest uppercase text-white">
                      <i className={`fas ${CATEGORY_ICON[c]} text-gold`} />
                      {CATEGORY_LABEL[c]}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-white font-bold text-2xl leading-tight">{CATEGORY_LABEL[c]}</div>
                          <div className="text-white/80 text-sm mt-1">
                            {count > 0 ? `${count} foto(s)` : "Em breve"
                            }
                          </div>
                        </div>
                        <span className="inline-flex items-center text-gold font-semibold">
                          Ver <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition" />
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        ) : isCategoryPage && cat ? (
          <>
            {(() => {
              // Na galeria e nas miniaturas mantemos a ordem original dos arquivos.
              const groupAll: ProjectGroup = {
                key: "__all__",
                title: CATEGORY_LABEL[cat],
                items,
              };

              return (
                <>
                  <div className="max-w-5xl mb-10 text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-[11px] tracking-widest uppercase text-gray-900">
                        <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                        Projetos
                      </span>
                      <a
                        href="?p=projetos"
                        onClick={(e) => {
                          e.preventDefault();
                          onNav("projetos");
                        }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-black"
                      >
                        <i className="fas fa-arrow-left text-gold" />
                        Voltar para categorias
                      </a>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4">{CATEGORY_COPY[cat].title}</h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl">{CATEGORY_COPY[cat].subtitle}</p>

                    <div className="mt-6 grid sm:grid-cols-3 gap-3">
                      {CATEGORY_COPY[cat].bullets.map((b) => (
                        <div key={b} className="rounded-2xl bg-white border border-gray-100 p-4">
                          <div className="text-xs uppercase tracking-widest text-gray-500">Destaque</div>
                          <div className="mt-1 font-semibold text-gray-900">{b}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {groupAll.items.length ? (
                    <ProjectShowcase group={groupAll} SmartImg={SmartImg} onOpenLightbox={onOpenLightbox} />
                  ) : (
                    <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-6 text-gray-600">
                      Ainda não há fotos nesta categoria. Quando você adicionar, elas aparecerão aqui.
                    </div>
                  )}
                </>
              );
            })()}
          </>
        ) : (
          // Home page variant (shows a highlight grid)
          <>
            <div className="max-w-4xl mb-16 text-left">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Nossos Projetos</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Transformações que Inspiram <span className="text-gold">Excepcionalidade</span>
              </h2>
              <p className="text-xl text-gray-600">
                Descubra projetos reais que demonstram nosso compromisso com a qualidade e perfeição.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ASSETS.galeria.slice(0, 8).map((g) => (
                <button
                  key={g.full}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift text-left"
                  onClick={() => onOpenLightbox({ src: g.full, alt: g.title })}
                  aria-label={`Abrir imagem: ${g.title}`}
                  type="button"
                >
                  <SmartImg
                    src={optimizedImageSources(g.thumb, "thumb")[0] || g.thumb}
                    fallbackSrcs={optimizedImageSources(g.thumb, "thumb").slice(1)}
                    alt={g.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    fetchPriority="low"
                  />
                  <div
                    className="wm-overlay"
                    aria-hidden="true"
                    style={{ backgroundImage: `url('${watermarkUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{g.title}</h3>
                    <p className="text-gray-300 text-sm">{g.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center">
              <a
                href="?p=projetos"
                className="inline-flex items-center rounded-full bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-black transition btn-glow"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("projetos");
                }}
              >
                Ver projetos por ambiente <i className="fas fa-arrow-right ml-2 text-gold" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
