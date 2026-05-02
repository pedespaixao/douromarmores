export type CatalogItem = {
  name: string;
  sample: string;
  applied: string;
  tag?: string;
  /** Ajuste fino: quando a imagem vem com “respiro”/borda, aumente um pouco para preencher melhor o card */
  sampleScale?: number;
  appliedScale?: number;
};

export type ProjectCategory =
  | "cozinhas"
  | "espaco-gourmet"
  | "banheiros"
  | "lavabos"
  | "escadas"
  | "churrasqueiras"
  | "bancadas"
  | "piso-hall"
  | "mesas"
  | "area-externa"
  | "ambientes"
  | "lareiras";

export type GalleryItem = {
  thumb: string;
  full: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
};

export type Depoimento = {
  name: string;
  role: string;
  text: string;
  photo: string;
};

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const ASSETS = {
  waNumber: "5511923210038",

  // Bases extras de mídia (útil em preview/Hostinger, quando as imagens estão em srv1844-files.hstgr.io)
  // O SmartImg tenta automaticamente essas bases quando recebe um src relativo (ex.: /media/...).
  mediaExtraBases: [
    // Prime Stone (exemplo)
    "https://srv1844-files.hstgr.io/b51e505820e2677c/api/preview/small/public_html",
    "https://srv1844-files.hstgr.io/b51e505820e2677c/api/preview/medium/public_html",
    "https://srv1844-files.hstgr.io/b51e505820e2677c/api/preview/big/public_html",
    "https://srv1844-files.hstgr.io/b51e505820e2677c/files/public_html",

    // Projetos (hash cd50a...)
    "https://srv1844-files.hstgr.io/cd50a0849de2f031/api/preview/small/public_html",
    "https://srv1844-files.hstgr.io/cd50a0849de2f031/api/preview/medium/public_html",
    "https://srv1844-files.hstgr.io/cd50a0849de2f031/api/preview/big/public_html",
    "https://srv1844-files.hstgr.io/cd50a0849de2f031/files/public_html",
  ],

  hero: {
    video: "https://douromarmores.com.br/media/hero/hero.mp4",
    videoFallback: "https://cdn.coverr.co/videos/coverr-modern-house-6814/1080p.mp4",
    poster: UNSPLASH("photo-1556912173-3bb406ef7e77", 1800),
    bgImage:
      "https://douromarmores.com.br/media/catalog/quartzitos/quartzito-branco-macaubas-wood-white/aplicacao.jpg",
  },

  about: {
    video: "https://cdn.coverr.co/videos/coverr-marble-texture-1656/1080p.mp4",
    poster: UNSPLASH("photo-1541123437800-1bb1317badc2", 1600),
    audio: "https://douromarmores.com.br/media/about/sobre-nos",
  },

  produtosHub: {
    marmores: UNSPLASH("photo-1529692236671-f1f6cf9683ba", 1400),
    granitos: UNSPLASH("photo-1618219909882-29d058c6f86b", 1400),
    quartzo: UNSPLASH("photo-1556911220-e15b29be8c1b", 1400),
    quartzitos: UNSPLASH("photo-1544986581-efac024faf62", 1400),
    limestone: UNSPLASH("photo-1549187774-b4e9b0445b41", 1400),
    // Ônix não tinha imagem dedicada; usamos um fallback elegante.
    onix: UNSPLASH("photo-1541123437800-1bb1317badc2", 1400),
    aglostone: UNSPLASH("photo-1523413651479-597eb2da0ad6", 1400),
  },

  laminasHub: {
    dekton:
      "https://assetstools.cosentino.com/api/v1/bynder/image/06FB1B60-E819-4675-9FF14EC3E9CFF13E/casa-decor-u-interior-design.jpg?auto=format&w=1200",
    neolith:
      "https://www.stonetech.gr/files/files/applications/pagkoi-kouzinas/neolith/niagara_countertop.jpg",
    sinth:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,fit=crop/dJoZXDeGnDtKa4r9/img_6099-m2W87BnWMVu2qzaE.jpeg",
  },

  catalog: {
    marmores: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const sortKey = (name: string) => normalizeKey(name).replace(/^marmore\s+/i, "");

      const rawNames = [
        "Mármore Branco Paraná",
        "Mármore Bege Bahia",
        "Mármore Verde Guatemala",
        "Mármore Estatuário Venato",
        "Mármore Spring Rose",
        "Mármore Silver Wood",
        "Mármore Sofia Striato",
        "Mármore Rosso Verona",
        "Mármore Rosa Valência",
        "Mármore Rosso Lepanto",
        "Mármore Rosso Bello",
        "Mármore Rojo Alicante",
        "Mármore Rain Forest Green",
        "Mármore Perlino Bianco",
        "Mármore Perlato Beige",
        "Mármore Nero Marquina",
        "Mármore Nero Portoro",
        "Mármore Marrom Imperador",
        "Mármore Golden Spider",
        "Mármore Grey Storm",
        "Mármore Gris Armani",
        "Mármore Giallo Reale",
        "Mármore Daino Reale",
        "Mármore Crema Valência",
        "Mármore Crema Royal Seleto",
        "Mármore Crema Marfil",
        "Mármore Carrara Gioia",
        "Mármore Carrara",
        "Mármore Calacatta Macchiaoro Extra",
        "Mármore Calacatta Arabescato",
        "Mármore Breccia Oniciata",
        "Mármore Bronze Armani",
        "Mármore Botticino Royal",
        "Mármore Botticino Clássico",
        "Mármore Branco Volakas",
        "Mármore Branco Thassos",
        "Mármore Branco Sivec",
        "Mármore Branco Pigues",
        "Mármore Branco Panda",
        "Mármore Branco Moura",
        "Mármore Pinta Verde",
      ] as const;

      const names = [...rawNames].sort((a, b) =>
        sortKey(a).localeCompare(sortKey(b), "pt-BR", { sensitivity: "base" })
      );

      return names.map((name) => {
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/marmores/${slug}/amostra.webp`),
          applied: media(`/media/catalog/marmores/${slug}/aplicacao.webp`),
          tag: "Mármore • Elegância • Acabamento premium",
        };
      }) satisfies CatalogItem[];
    })(),

    granitos: (() => {
      // Usamos caminho RELATIVO para funcionar tanto no domínio principal quanto em previews/servidores.
      // O SmartImg faz variações de host quando necessário.
      const media = (path: string) => `${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const sortKey = (name: string) => normalizeKey(name).replace(/^granito\s+/i, "");

      const rawNames = [
        "Granito Ocre Itabira",
        "Granito Cinza Corumbá",
        "Granito Cinza Andorinha",
        "Granito Verde Ubatuba",
        "Granito Preto São Gabriel",
        "Granito Preto Absoluto",
        "Granito Preto Via Lactea",
        "Granito Preto Indiano",
        "Granito Branco Ceara (Polar)",
        "Granito Branco Itaunas",
        "Granito Siena",
        "Granito Capão Bonito",
        "Granito Branco Dallas",
        "Granito Amarelo Icaraí",
        "Granito Rosa Iracema",
        "Granito Cinza Mauá",
        "Granito Amendoa Capri",
        "Granito Santa Cecília",
        "Granito Azul Bahia",
        "Granito Branco Fortaleza",
        "Granito Branco Pitaya",
        "Granito Café Imperial",
        "Granito Verde Candeias",
        "Granito Amendoa Maracuja",
        "Granito Vermelho Brasilia",
      ] as const;

      const names = [...rawNames].sort((a, b) =>
        sortKey(a).localeCompare(sortKey(b), "pt-BR", { sensitivity: "base" })
      );

      return names.map((name) => {
        const slug = slugify(name);
        return {
          name,
          // Alguns itens estão em .jpg/.JPG/.jpeg/.webp dependendo do upload.
          // Mantemos .jpg como padrão e o SmartImg tenta as variações automaticamente.
          sample: media(`/media/catalog/granitos/${slug}/amostra.jpg`),
          applied: media(`/media/catalog/granitos/${slug}/aplicacao.jpg`),
          tag: "Granito • Alta resistência • Rotina intensa",
        };
      }) satisfies CatalogItem[];
    })(),

    quartzo: (() => {
      // Organização de imagens (real no seu servidor/Hostinger):
      // /media/catalog/quartzos/silestone/<slug>/amostra.*
      // /media/catalog/quartzos/silestone/<slug>/aplicacao.*
      // /media/catalog/quartzos/quartzostone/<slug>/amostra.*
      // /media/catalog/quartzos/quartzostone/<slug>/aplicacao.*
      //
      // Usamos caminho RELATIVO para funcionar tanto no domínio final quanto em preview.
      const media = (path: string) => `${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      // ===== Silestone (lista enviada) =====
      const silestone: Array<{ color: string; series: string }> = [
        { color: "Calacatta Themis", series: "Silestone - Suma" },
        { color: "Calacatta TOVANew", series: "Silestone - Suma" },
        { color: "Calacatta Tova", series: "Silestone - Suma" },
        { color: "Bronze Rivers", series: "Silestone - Suma" },
        { color: "Motion Grey", series: "Silestone - Suma" },
        { color: "Linen Cream", series: "Silestone - Suma" },

        { color: "Ffrom03", series: "Silestone - Earthic Ffrom" },
        { color: "Ffrom02", series: "Silestone - Earthic Ffrom" },
        { color: "Ffrom01", series: "Silestone - Earthic Ffrom" },

        { color: "Raw A", series: "Silestone - Earthic Raw" },

        { color: "Parisien Bleu", series: "Silestone - Le Chic" },

        { color: "Lime Delight", series: "Silestone - Urban Crush" },
        { color: "Concrete Pulse", series: "Silestone - Urban Crush" },
        { color: "Cinder Craze", series: "Silestone - Urban Crush" },
        { color: "Brass Relish", series: "Silestone - Urban Crush" },

        { color: "Ethereal Glow", series: "Silestone - Ethereal" },
        { color: "Ethereal Noctis", series: "Silestone - Ethereal" },

        { color: "Miami Vena", series: "Silestone - Nebula" },

        { color: "Desert Silver", series: "Silestone - Eternal" },
        { color: "Pearl Jasmine", series: "Silestone - Eternal" },
        { color: "Charcoal Soapstone", series: "Silestone - Eternal" },
        { color: "Et Calacatta Gold", series: "Silestone - Eternal" },
        { color: "Et Statuario", series: "Silestone - Eternal" },

        { color: "Miami White", series: "Silestone - Mythology" },
        { color: "Blanco Norte14", series: "Silestone - Mythology" },
        { color: "White Zeus", series: "Silestone - Mythology" },
        { color: "Gris Expo", series: "Silestone - Mythology" },

        { color: "Coral Clay Colour", series: "Silestone - Basiq" },
        { color: "White Storm14", series: "Silestone - Basiq" },
        { color: "Rougui", series: "Silestone - Basiq" },
        { color: "Marengo", series: "Silestone - Basiq" },

        { color: "Stellar Blanco13", series: "Silestone - Stellar" },

        { color: "Yukon", series: "Silestone - River" },

        { color: "Blanco Maple", series: "Silestone - Tropical Forest" },
      ];

      const silestoneItems: CatalogItem[] = silestone.map((it) => {
        const name = `Silestone ${it.color}`;
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/quartzos/silestone/${slug}/amostra.avif`),
          applied: media(`/media/catalog/quartzos/silestone/${slug}/aplicacao.avif`),
          tag: it.series,
        };
      });

      // ===== Quartzo Stone (lista completa) =====
      // Padrão REAL (conforme seus uploads no Hostinger):
      // /media/catalog/quartzos/quartzostone/<slug>/amostra.jpg
      // /media/catalog/quartzos/quartzostone/<slug>/aplicacao.jpg
      const rawQuartzoStoneNames = [
        "Quartzo Stone Vermelho Ferrari",
        "Quartzo Stone Calacata",
        "Quartzo Stone Vermelho Stellar",
        "Quartzo Stone Vermelho Absoluto",
        "Quartzo Stone Verde Absoluto",
        "Quartzo Stone Snowflakes",
        "Quartzo Stone Preto Stellar",
        "Quartzo Stone Preto Absoluto",
        "Quartzo Stone Marrom Stellar",
        "Quartzo Stone Marrom Absoluto",
        "Quartzo Stone Magenta",
        "Quartzo Stone Laranja Absoluto",
        "Quartzo Stone Fendi",
        "Quartzo Stone Cloudy Blanc",
        "Quartzo Stone Cinza Stellar Light",
        "Quartzo Stone Cinza Stellar Dark",
        "Quartzo Stone Cinza Absoluto Light",
        "Quartzo Stone Cinza Absoluto Dark",
        "Quartzo Stone Channel",
        "Quartzo Stone Branco Vena Oro",
        "Quartzo Stone Branco Estelar",
        "Quartzo Stone Branco Absoluto",
        "Quartzo Stone Bege Stellar",
        "Quartzo Stone Bege Absoluto",
        "Quartzo Stone Azul Stellar",
        "Quartzo Stone Azul Absoluto",
        "Quartzo Stone Amarelo Stellar",
        "Quartzo Stone Amarelo Absoluto",
      ] as const;

      const quartzoStoneItems: CatalogItem[] = rawQuartzoStoneNames.map((name) => {
        const slug = slugify(name);
        const lower = name.toLowerCase();
        const tag = lower.includes("stellar")
          ? "Quartzo Stone - Stellar"
          : lower.includes("absoluto")
            ? "Quartzo Stone - Absoluto"
            : "Quartzo Stone";

        return {
          name,
          // Upload real (Hostinger/produção): /media/catalog/quartzos/quartzostone/<slug>/amostra.jpg
          // O SmartImg tenta variações (.JPG/.jpeg/.webp/.avif) automaticamente.
          sample: media(`/media/catalog/quartzos/quartzostone/${slug}/amostra.jpg`),
          applied: media(`/media/catalog/quartzos/quartzostone/${slug}/aplicacao.jpg`),
          tag,
        };
      });

      return [...silestoneItems, ...quartzoStoneItems] satisfies CatalogItem[];
    })(),

    quartzitos: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const sortKey = (name: string) => normalizeKey(name).replace(/^quartzito\s+/i, "");

      const rawNames = [
        "Quartzito Taj Mahal / Perla Santana",
        "Quartzito Woodstone",
        "Quartzito Mont Blanc",
        "Quartzito Mandalay Green",
        "Quartzito Verde Pantanal",
        "Quartzito Artemis",
        "Quartzito Wakanda Grey",
        "Quartzito Branco Macaúbas (Wood White)",
        "Quartzito Negresco Escovado",
        "Quartzito Maldive",
        "Quartzito Verde Bambu",
        "Quartzito Azul Macaúbas",
        "Quartzito Bianco Superiore",
        "Quartzito Nybirus",
        "Quartzito Oak Bamboo",
        "Quartzito Negroni",
        "Quartzito Green Bamboo",
        "Quartzito Emerald Green",
        "Quartzito Moulin Rouge",
        "Quartzito Vitória Régia",
        "Quartzito Azulli",
        "Quartzito Wakanda Black",
        "Quartzito Magma",
        "Quartzito Fusion",
        "Quartzito Pietra Toscana",
        "Quartzito Grey",
      ] as const;

      const names = [...rawNames].sort((a, b) =>
        sortKey(a).localeCompare(sortKey(b), "pt-BR", { sensitivity: "base" })
      );

      return names.map((name) => {
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/quartzitos/${slug}/amostra.webp`),
          applied: media(`/media/catalog/quartzitos/${slug}/aplicacao.webp`),
          tag: "Quartzito premium • Alta resistência",
        };
      }) satisfies CatalogItem[];
    })(),

    limestone: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const sortKey = (name: string) => normalizeKey(name).replace(/^limestone\s+/i, "");

      const rawNames = [
        "Limestone Crema Danubian",
        "Limestone Caliza Marbella",
        "Limestone Caliza Capri",
        "Limestone Crema Persiano Athenas",
        "Limestone Crema Persiano Kulp",
        "Limestone Jasmin White",
        "Limestone Moca Creme Vena D´Oro",
        "Limestone Palha Mel",
        "Limestone Bateig Blue",
        "Limestone Crema Belo",
        "Limestone Cinza Místico",
        "Limestone Cetim Real",
        "Limestone Atlantic Blue",
        "Limestone Algarve Bege",
        "Limestone Pietra Olivo",
        "Limestone Terra Antiga",
        "Limestone Pietra Paloma",
        "Limestone Golden Oasis",
        "Limestone Moca Creme Vermont",
        "Limestone Moca Creme Saint Remy",
        "Limestone Moca Creme Mont Dore",
        "Limestone Manto Dourado",
        "Limestone Luna Beige",
        "Limestone Crema Nova",
      ] as const;

      const names = [...rawNames].sort((a, b) => sortKey(a).localeCompare(sortKey(b), "pt-BR", { sensitivity: "base" }));

      return names.map((name) => {
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/limestone/${slug}/amostra.webp`),
          applied: media(`/media/catalog/limestone/${slug}/aplicacao.webp`),
          tag: "Limestone • Orgânico • Sofisticação",
        };
      }) satisfies CatalogItem[];
    })(),

    onix: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const items = [
        "Ônix Miele (Mel)",
        "Ônix Green",
        "Ônix Giallo",
        "Ônix White Estriato",
        "Ônix White",
        "Ônix Blue",
      ] as const;

      return items.map((name) => {
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/onix/${slug}/amostra.webp`),
          applied: media(`/media/catalog/onix/${slug}/aplicacao.webp`),
          tag: "Ônix • Translúcido • Backlight",
        };
      }) satisfies CatalogItem[];
    })(),

    // Prime Stone (rota interna mantém ?p=aglostone para compatibilidade)
    aglostone: (() => {
      // Usamos caminho RELATIVO para funcionar tanto no domínio final quanto em preview (Hostinger).
      const media = (path: string) => `${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      // Produtos (nomes exatamente como você passou)
      const rawNames = [
        "Crema Prime",
        "Cinza Prime",
        "Branco Prime Infinity",
        "Branco Prime",
        "Bege Prime",
      ] as const;

      return rawNames.map((name) => {
        const slug = slugify(name);
        return {
          name,
          sample: media(`/media/catalog/prime-stone/${slug}/amostra.jpg`),
          applied: media(`/media/catalog/prime-stone/${slug}/aplicacao.jpg`),
          tag: "Prime Stone",
        };
      }) satisfies CatalogItem[];
    })(),

    dekton: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const series: Array<{ series: string; colors: string[] }> = [
        {
          series: "Série Natural (DK Natural)",
          colors: [
            "Nara",
            "Kovik",
            "Aeris",
            "Eter",
            "Rem",
            "Laurent",
            "Bromo",
            "Kira",
            "Entzo",
            "Kelya",
            "Aura",
            "Danae",
          ],
        },
        { series: "Série Pietra Edition", colors: ["Polar", "Sandik", "Adia", "Nebu", "Trevi", "Ava"] },
        { series: "Série Pietra Kode", colors: ["Grigio", "Grafite", "Marmorio", "Sabbia", "Avorio", "Nebbia"] },
        { series: "Série Silverkoast", colors: ["Salina", "Marina"] },
        { series: "Série Kraftizen", colors: ["Albarium", "Argentium", "Umber", "Nacre"] },
        { series: "Série Onirika", colors: ["Somnia", "Awake", "Trance", "Morpheus", "Lucid", "Neural", "Reverie"] },
        { series: "Série Stonika", colors: ["Khalo", "Arga", "Natura"] },
        { series: "Série Solid (DK Solid)", colors: ["Moone", "Domoos", "Sirius", "Zenith"] },
        { series: "Série Industrial (DK Industrial)", colors: ["Lunar", "Kreta", "Soke", "Laos", "Trilium"] },
        { series: "Série XGloss Basiq", colors: ["Riobranco"] },
        { series: "Série XGloss Solid", colors: ["Halo"] },
      ];

      const items: CatalogItem[] = [];
      for (const s of series) {
        for (const c of s.colors) {
          const name = `Dekton ${c}`;
          const slug = slugify(name);
          items.push({
            name,
            sample: media(`/media/catalog/laminas/dekton/${slug}/amostra.avif`),
            applied: media(`/media/catalog/laminas/dekton/${slug}/aplicacao.avif`),
            tag: s.series,
          });
        }
      }

      return items;
    })() satisfies CatalogItem[],

    neolith: [
      {
        name: "Neolith – Calacatta",
        sample: UNSPLASH("photo-1529692236671-f1f6cf9683ba", 1200),
        applied: UNSPLASH("photo-1556912167-f556f1f39faa", 1200),
        tag: "Grandes planos",
      },
      {
        name: "Neolith – Beton",
        sample: UNSPLASH("photo-1556912173-3bb406ef7e77", 1200),
        applied: UNSPLASH("photo-1549187774-b4e9b0445b41", 1200),
        tag: "Cimento sofisticado",
      },
      {
        name: "Neolith – Basalt",
        sample: UNSPLASH("photo-1618219909882-29d058c6f86b", 1200),
        applied: UNSPLASH("photo-1556911220-bff31c812dba", 1200),
        tag: "Escuro premium",
      },
    ] satisfies CatalogItem[],

    sinth: (() => {
      const MEDIA_BASE = "https://douromarmores.com.br";
      const media = (path: string) => `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

      const normalizeKey = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const slugify = (s: string) =>
        normalizeKey(s)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const raw = [
        "Taj",
        "Nero Marquina",
        "Gris Armani",
        "Travertino",
        "Super White Fosco",
        "Super White Polido",
        "Beige",
        "Arena",
        "Grey Light",
        "Grey",
        "Black",
        "Calacatta",
        "Statuario",
        "Calacatta Oro",
        "Calacatta Venatto",
        "Gris Pulpis Light",
        "Gris Pulpis Bronze",
        "Iron Corten",
      ] as const;

      const names = [...raw].sort((a, b) =>
        normalizeKey(a).localeCompare(normalizeKey(b), "pt-BR", { sensitivity: "base" })
      );

      return names.map((c) => {
        const name = `Sinth ${c}`;
        const slug = slugify(name);
        const sampleExt = "jpg";
        const appliedExt = slug === "sinth-nero-marquina" ? "jfif" : "jpg";

        const sampleScale = slug === "sinth-arena" ? 1.12 : undefined;

        return {
          name,
          sample: media(`/media/catalog/laminas/sinth/${slug}/amostra.${sampleExt}`),
          applied: media(`/media/catalog/laminas/sinth/${slug}/aplicacao.${appliedExt}`),
          tag: "Sinth • Sinterizado",
          sampleScale,
        };
      }) satisfies CatalogItem[];
    })() satisfies CatalogItem[],
  },

  galeria: [
    // ===== Piso & hall =====
    ...Array.from({ length: 7 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/piso-hall/piso-hall-${n}.jpg`,
        full: `/media/projetos/piso-hall/piso-hall-${n}.jpg`,
        title: `Piso & Hall ${n}`,
        subtitle: "Piso & hall",
        category: "piso-hall" as const,
      };
    }),

    // ===== Mesas (uploads reais) =====
    { thumb: "/media/projetos/mesas/mesa-1.jpg", full: "/media/projetos/mesas/mesa-1.jpg", title: "Mesa", subtitle: "Mesas", category: "mesas" },
    { thumb: "/media/projetos/mesas/mesa-2.jpg", full: "/media/projetos/mesas/mesa-2.jpg", title: "Mesa", subtitle: "Mesas", category: "mesas" },
    { thumb: "/media/projetos/mesas/mesa-3.jpg", full: "/media/projetos/mesas/mesa-3.jpg", title: "Mesa", subtitle: "Mesas", category: "mesas" },
    { thumb: "/media/projetos/mesas/mesa-4.jpg", full: "/media/projetos/mesas/mesa-4.jpg", title: "Mesa", subtitle: "Mesas", category: "mesas" },
    { thumb: "/media/projetos/mesas/mesa-5.jpg", full: "/media/projetos/mesas/mesa-5.jpg", title: "Mesa", subtitle: "Mesas", category: "mesas" },

    // ===== Bancadas (uploads reais) =====
    { thumb: "/media/projetos/bancadas/bancada-1.jpg", full: "/media/projetos/bancadas/bancada-1.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-2.jpg", full: "/media/projetos/bancadas/bancada-2.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-3.jpg", full: "/media/projetos/bancadas/bancada-3.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-4.jpg", full: "/media/projetos/bancadas/bancada-4.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-5.jpg", full: "/media/projetos/bancadas/bancada-5.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-6.jpg", full: "/media/projetos/bancadas/bancada-6.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-7.jpg", full: "/media/projetos/bancadas/bancada-7.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-8.jpg", full: "/media/projetos/bancadas/bancada-8.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-9.jpg", full: "/media/projetos/bancadas/bancada-9.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-10.jpg", full: "/media/projetos/bancadas/bancada-10.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-11.jpg", full: "/media/projetos/bancadas/bancada-11.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-12.jpg", full: "/media/projetos/bancadas/bancada-12.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },
    { thumb: "/media/projetos/bancadas/bancada-13.jpg", full: "/media/projetos/bancadas/bancada-13.jpg", title: "Bancada", subtitle: "Bancadas", category: "bancadas" },

    // ===== Lavabos (uploads reais) =====
    // Mantemos apenas lavabo-1 até lavabo-11
    // OBS: lavabo-1 é um vídeo (.mp4). Os demais são imagens (.jpg).
    ...Array.from({ length: 11 }, (_, i) => {
      const n = i + 1;

      if (n === 1) {
        const mp4 = "https://douromarmores.com.br/media/projetos/lavabos/lavabo-1.mp4";
        return {
          thumb: mp4,
          full: mp4,
          title: "Lavabo",
          subtitle: "Lavabos",
          category: "lavabos" as const,
        };
      }

      return {
        thumb: `/media/projetos/lavabos/lavabo-${n}.jpg`,
        full: `/media/projetos/lavabos/lavabo-${n}.jpg`,
        title: "Lavabo",
        subtitle: "Lavabos",
        category: "lavabos" as const,
      };
    }),

    // ===== Churrasqueiras (uploads reais) =====
    ...Array.from({ length: 19 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/churrasqueiras/churrasqueira-${n}.jpg`,
        full: `/media/projetos/churrasqueiras/churrasqueira-${n}.jpg`,
        title: "Churrasqueira",
        subtitle: "Churrasqueiras",
        category: "churrasqueiras" as const,
      };
    }),

    // ===== Espaço gourmet (uploads reais) =====
    // Arquivos conforme informado: goumert-1.jpg ... goumert-7.jpg
    ...Array.from({ length: 7 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/espaco-gourmet/goumert-${n}.jpg`,
        full: `/media/projetos/espaco-gourmet/goumert-${n}.jpg`,
        title: "Espaço gourmet",
        subtitle: "Espaço gourmet",
        category: "espaco-gourmet" as const,
      };
    }),

    // ===== Banheiros (uploads reais) =====
    // Mantidos apenas: banheiro-1.jpg ... banheiro-19.jpg
    ...Array.from({ length: 19 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/banheiros/banheiro-${n}.jpg`,
        full: `/media/projetos/banheiros/banheiro-${n}.jpg`,
        title: "Banheiro",
        subtitle: "Banheiros",
        category: "banheiros" as const,
      };
    }),

    // ===== Lareiras (uploads reais) =====
    // Mantemos apenas lareira-1.jpg ... lareira-12.jpg
    ...Array.from({ length: 12 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/lareiras/lareira-${n}.jpg`,
        full: `/media/projetos/lareiras/lareira-${n}.jpg`,
        title: "Lareira",
        subtitle: "Lareiras",
        category: "lareiras" as const,
      };
    }),

    // ===== Cozinhas (uploads reais) =====
    // Arquivos corretos: cozinha-1.jpg ... cozinha-12.jpg
    ...(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
        const file = `https://douromarmores.com.br/media/projetos/cozinhas/cozinha-${n}.jpg`;
        return {
          thumb: file,
          full: file,
          title: "Cozinha",
          subtitle: "Cozinhas",
          category: "cozinhas" as const,
        };
      })
    ),

    // ===== Escadas (uploads reais) =====
    // Mantemos apenas: escada-1.jpg ... escada-9.jpg
    ...Array.from({ length: 9 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/escadas/escada-${n}.jpg`,
        full: `/media/projetos/escadas/escada-${n}.jpg`,
        title: "Escada",
        subtitle: "Escadas",
        category: "escadas" as const,
      };
    }),

    // ===== Área externa (uploads reais) =====
    // Mantendo apenas are-externa-1 e area-externa-2 até area-externa-5
    ...Array.from({ length: 5 }, (_, i) => {
      const n = i + 1;
      const baseDir = "/media/projetos/area-externa";

      if (n === 1) {
        return {
          thumb: `${baseDir}/area-externa-1.jpg`,
          full: `${baseDir}/are-externa-1.jpg`,
          title: "Área externa",
          subtitle: "Área externa",
          category: "area-externa" as const,
        };
      }

      const file = `area-externa-${n}.jpg`;
      return {
        thumb: `${baseDir}/${file}`,
        full: `${baseDir}/${file}`,
        title: "Área externa",
        subtitle: "Área externa",
        category: "area-externa" as const,
      };
    }),

    // ===== Ambientes (uploads reais) =====
    // Mantidos apenas: ambiente-1.jpg ... ambiente-3.jpg
    ...Array.from({ length: 3 }, (_, i) => {
      const n = i + 1;
      return {
        thumb: `/media/projetos/ambientes/ambiente-${n}.jpg`,
        full: `/media/projetos/ambientes/ambiente-${n}.jpg`,
        title: "Ambiente",
        subtitle: "Ambientes",
        category: "ambientes" as const,
      };
    }),

    // (placeholders antigos removidos para manter apenas as fotos reais configuradas)

    // (placeholder removido — agora banheiros tem galeria real banheiro-1..banheiro-90)
    // {
    //   thumb: "https://douromarmores.com.br/media/projetos/banheiro-com-pedra/4.JPG",
    //   full: "https://douromarmores.com.br/media/projetos/banheiro-com-pedra/4.JPG",
    //   title: "Banheiro com pedra",
    //   subtitle: "Cuba esculpida em Onix Translúcido",
    //   category: "banheiros",
    // },
    // (placeholders removidos — agora ambientes tem galeria real ambiente-1..ambiente-11)
  ] satisfies GalleryItem[],

  depoimentos: [
    {
      name: "Mariana A.",
      role: "Cliente final",
      text: "A paginação dos veios ficou perfeita. O acabamento e a instalação foram impecáveis — dá para ver o cuidado em cada detalhe.",
      photo: "https://i.pravatar.cc/200?img=47",
    },
    {
      name: "Ricardo L.",
      role: "Arquiteto",
      text: "Equipe muito técnica. Ajudaram a escolher o material certo e entregaram no prazo, com instalação limpa.",
      photo: "https://i.pravatar.cc/200?img=12",
    },
    {
      name: "Carolina S.",
      role: "Cliente final",
      text: "Eu tinha medo de mancha e trinca. Eles explicaram tudo com clareza e o resultado ficou acima do esperado.",
      photo: "https://i.pravatar.cc/200?img=32",
    },
  ] satisfies Depoimento[],
};
