import React, { Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import { ASSETS, type CatalogItem } from "@/data/assets";
import { ProjectsSection } from "@/components/ProjectsSection";
import watermarkUrl from "@/assets/watermark.svg";
import { FAQ_DATA } from "@/data/faq";

const LazyFaqSection = React.lazy(() => import("@/components/FaqSection").then((m) => ({ default: m.FaqSection })));

type PageKey =
  | "home"
  | "como-funciona"
  | "sobre-nos"
  | "sobre"
  | "sobre-inspiracao"
  | "quem-somos"
  | "produtos"
  | "quartzito-material"
  | "granito-material"
  | "marmore-material"
  | "silestone-material"
  | "quartzo-stone-material"
  | "dekton-material"
  | "sinth-material"
  | "marmores"
  | "marmores-2"
  | "marmores-3"
  | "granitos"
  | "granitos-2"
  | "granitos-3"
  | "quartzo"
  | "silestone"
  | "silestone-2"
  | "silestone-3"
  | "quartzo-stone"
  | "quartzo-stone-2"
  | "quartzo-stone-3"
  | "quartzitos"
  | "quartzitos-2"
  | "quartzitos-3"
  | "limestone"
  | "limestone-2"
  | "limestone-3"
  | "onix"
  | "onix-2"
  | "laminas"
  | "dekton"
  | "dekton-2"
  | "dekton-3"
  | "neolith"
  | "sinth"
  | "sinth-2"
  | "sinth-3"
  | "aglostone"
  | "aglostone-2"
  | "aglostone-3"
  | "projetos"
  | "projetos-cozinhas"
  | "projetos-espaco-gourmet"
  | "projetos-banheiros"
  | "projetos-lavabos"
  | "projetos-escadas"
  | "projetos-churrasqueiras"
  | "projetos-lareiras"
  | "projetos-bancadas"
  | "projetos-piso-hall"
  | "projetos-mesas"
  | "projetos-area-externa"
  | "projetos-ambientes"
  | "depoimentos"
  | "duvidas"
  | "blog"
  | "marmoraria-sao-paulo"
  | "marmoraria-zona-sul-sao-paulo"
  | "bancadas-granito-sao-paulo"
  | "quartzo-cozinha-sao-paulo"
  | "escadas-marmore-sao-paulo"
  | "lavabo-marmore-sao-paulo"
  | "granito-churrasqueira-sao-paulo"
  | "quartzito-ilha-sao-paulo"
  | "marmoraria-moema"
  | "marmoraria-morumbi"
  | "marmoraria-santo-amaro"
  | "marmoraria-brooklin"
  | "marmoraria-vila-mariana"
  | "marmoraria-pinheiros"
  | "marmoraria-interlagos"
  | "marmoraria-alphaville"
  | "marmoraria-vila-mascote"
  | "marmoraria-chacara-santo-antonio"
  | "marmoraria-jabaquara"
  | "marmoraria-saude"
  | "marmoraria-planalto-paulista"
  | "marmoraria-jardim-paulista"
  | "marmoraria-jardins"
  | "marmoraria-vila-nova-conceicao"
  | "marmoraria-ibirapuera"
  | "marmoraria-panamby"
  | "marmoraria-campo-belo"
  | "marmoraria-vila-olimpia"
  | "marmoraria-itaim-bibi"
  | "marmoraria-perdizes"
  | "marmoraria-pompeia"
  | "marmoraria-tatuape"
  | "marmoraria-ipiranga"
  | "marmoraria-vila-sonia"
  | "marmoraria-vila-andrade"
  | "marmoraria-bela-vista"
  | "marmoraria-jardim-europa"
  | "marmoraria-jardim-america"
  | "marmoraria-higienopolis"
  | "marmoraria-mooca"
  | "marmoraria-anhangabau"
  | "marmoraria-vila-leopoldina"
  | "marmoraria-vila-madalena"
  | "marmoraria-cerqueira-cesar"
  | "marmoraria-sumare"
  | "marmoraria-socorro"
  | "marmoraria-alto-da-boa-vista"
  | "marmoraria-vila-suzana"
  | "marmoraria-vila-santa-catarina"
  | "marmoraria-jardim-marajoara"
  | "marmoraria-chacara-flora"
  | "marmoraria-jurubatuba"
  | "marmoraria-campo-grande"
  | "marmoraria-mirandopolis"
  | "marmoraria-veleiros"
  | "marmoraria-vila-cordeiro"
  | "marmoraria-vila-cruzeiro"
  | "marmoraria-jardim-guedala"
  | "marmoraria-vila-gumercindo"
  | "marmoraria-aconchego-da-zona-sul"
  | "banheiro-quartzo-sao-paulo"
  | "lavatório-sob-medida-sao-paulo"
  | "painel-marmore-sao-paulo"
  | "area-gourmet-granito-sao-paulo"
  | "bancada-cozinha-sob-medida-sao-paulo"
  | "bancada-banheiro-sao-paulo"
  | "nicho-banheiro-sao-paulo"
  | "cuba-esculpida-sao-paulo"
  | "lareira-marmore-sao-paulo"
  | "mesa-quartzito-sao-paulo"
  | "bancada-quartzito-sao-paulo"
  | "bancada-dekton-sao-paulo"
  | "bancada-silestone-sao-paulo"
  | "ilha-cozinha-quartzito-sao-paulo"
  | "escada-granito-sao-paulo"
  | "lavabo-onix-sao-paulo"
  | "painel-quartzito-sao-paulo"
  | "pia-cozinha-granito-sao-paulo"
  | "bancada-quartzo-branco-sao-paulo"
  | "bancada-preto-sao-gabriel-sao-paulo"
  | "cuba-esculpida-marmore-sao-paulo"
  | "lavatorio-quartzito-sao-paulo"
  | "ilha-dekton-sao-paulo"
  | "churrasqueira-quartzito-sao-paulo"
  | "revestimento-lareira-marmore-sao-paulo"
  | "escada-quartzito-sao-paulo"
  | "bancada-porcelanato-sao-paulo"
  | "bancada-area-gourmet-sao-paulo"
  | "lavatorio-marmore-sao-paulo"
  | "bancada-lavabo-sao-paulo"
  | "soleira-peitoril-sao-paulo"
  | "mesa-pedra-sao-paulo"
  | "nicho-marmore-sao-paulo"
  | "pia-esculpida-sao-paulo"
  | "bancada-ilha-cozinha-sao-paulo"
  | "pedra-para-cozinha-sao-paulo"
  | "marmoraria-perto-de-mim-sao-paulo"
  | "regioes-servicos"
  | "logo"
  | "contato";

const ROUTES: Record<PageKey, string[]> = {
  home: ["home", "hero-copy", "sobre-nos", "como-funciona", "diferenciais", "depoimentos", "contato"],
  "como-funciona": ["como-funciona"],
  "sobre-nos": ["sobre-nos"],
  sobre: ["sobre-nos"],
  "sobre-inspiracao": ["sobre-nos"],
  "quem-somos": ["sobre-nos"],
  produtos: ["produtos"],
  "quartzito-material": ["quartzito-material"],
  "granito-material": ["granito-material"],
  "marmore-material": ["marmore-material"],
  "silestone-material": ["silestone-material"],
  "quartzo-stone-material": ["quartzo-stone-material"],
  "dekton-material": ["dekton-material"],
  "sinth-material": ["sinth-material"],
  marmores: ["marmores"],
  "marmores-2": ["marmores-2"],
  "marmores-3": ["marmores-3"],
  granitos: ["granitos"],
  "granitos-2": ["granitos-2"],
  "granitos-3": ["granitos-3"],
  quartzo: ["quartzo"],
  silestone: ["silestone"],
  "silestone-2": ["silestone-2"],
  "silestone-3": ["silestone-3"],
  "quartzo-stone": ["quartzo-stone"],
  "quartzo-stone-2": ["quartzo-stone-2"],
  "quartzo-stone-3": ["quartzo-stone-3"],
  quartzitos: ["quartzitos"],
  "quartzitos-2": ["quartzitos-2"],
  "quartzitos-3": ["quartzitos-3"],
  limestone: ["limestone"],
  "limestone-2": ["limestone-2"],
  "limestone-3": ["limestone-3"],
  onix: ["onix"],
  "onix-2": ["onix-2"],
  laminas: ["laminas"],
  dekton: ["dekton"],
  "dekton-2": ["dekton-2"],
  "dekton-3": ["dekton-3"],
  neolith: ["neolith"],
  sinth: ["sinth"],
  "sinth-2": ["sinth-2"],
  "sinth-3": ["sinth-3"],
  aglostone: ["aglostone"],
  "aglostone-2": ["aglostone"],
  "aglostone-3": ["aglostone"],
  projetos: ["galeria"],
  "projetos-cozinhas": ["galeria"],
  "projetos-espaco-gourmet": ["galeria"],
  "projetos-banheiros": ["galeria"],
  "projetos-lavabos": ["galeria"],
  "projetos-escadas": ["galeria"],
  "projetos-churrasqueiras": ["galeria"],
  "projetos-lareiras": ["galeria"],
  "projetos-bancadas": ["galeria"],
  "projetos-piso-hall": ["galeria"],
  "projetos-mesas": ["galeria"],
  "projetos-area-externa": ["galeria"],
  "projetos-ambientes": ["galeria"],
  depoimentos: ["depoimentos"],
  duvidas: ["faq"],
  blog: ["blog"],
  "marmoraria-sao-paulo": ["seo-local"],
  "marmoraria-zona-sul-sao-paulo": ["seo-local"],
  "bancadas-granito-sao-paulo": ["seo-local"],
  "quartzo-cozinha-sao-paulo": ["seo-local"],
  "escadas-marmore-sao-paulo": ["seo-local"],
  "lavabo-marmore-sao-paulo": ["seo-local"],
  "granito-churrasqueira-sao-paulo": ["seo-local"],
  "quartzito-ilha-sao-paulo": ["seo-local"],
  "marmoraria-moema": ["seo-local"],
  "marmoraria-morumbi": ["seo-local"],
  "marmoraria-santo-amaro": ["seo-local"],
  "marmoraria-brooklin": ["seo-local"],
  "marmoraria-vila-mariana": ["seo-local"],
  "marmoraria-pinheiros": ["seo-local"],
  "marmoraria-interlagos": ["seo-local"],
  "marmoraria-alphaville": ["seo-local"],
  "marmoraria-vila-mascote": ["seo-local"],
  "marmoraria-chacara-santo-antonio": ["seo-local"],
  "marmoraria-jabaquara": ["seo-local"],
  "marmoraria-saude": ["seo-local"],
  "marmoraria-planalto-paulista": ["seo-local"],
  "marmoraria-jardim-paulista": ["seo-local"],
  "marmoraria-jardins": ["seo-local"],
  "marmoraria-vila-nova-conceicao": ["seo-local"],
  "marmoraria-ibirapuera": ["seo-local"],
  "marmoraria-panamby": ["seo-local"],
  "marmoraria-campo-belo": ["seo-local"],
  "marmoraria-vila-olimpia": ["seo-local"],
  "marmoraria-itaim-bibi": ["seo-local"],
  "marmoraria-perdizes": ["seo-local"],
  "marmoraria-pompeia": ["seo-local"],
  "marmoraria-tatuape": ["seo-local"],
  "marmoraria-ipiranga": ["seo-local"],
  "marmoraria-vila-sonia": ["seo-local"],
  "marmoraria-vila-andrade": ["seo-local"],
  "marmoraria-bela-vista": ["seo-local"],
  "marmoraria-jardim-europa": ["seo-local"],
  "marmoraria-jardim-america": ["seo-local"],
  "marmoraria-higienopolis": ["seo-local"],
  "marmoraria-mooca": ["seo-local"],
  "marmoraria-anhangabau": ["seo-local"],
  "marmoraria-vila-leopoldina": ["seo-local"],
  "marmoraria-vila-madalena": ["seo-local"],
  "marmoraria-cerqueira-cesar": ["seo-local"],
  "marmoraria-sumare": ["seo-local"],
  "marmoraria-socorro": ["seo-local"],
  "marmoraria-alto-da-boa-vista": ["seo-local"],
  "marmoraria-vila-suzana": ["seo-local"],
  "marmoraria-vila-santa-catarina": ["seo-local"],
  "marmoraria-jardim-marajoara": ["seo-local"],
  "marmoraria-chacara-flora": ["seo-local"],
  "marmoraria-jurubatuba": ["seo-local"],
  "marmoraria-campo-grande": ["seo-local"],
  "marmoraria-mirandopolis": ["seo-local"],
  "marmoraria-veleiros": ["seo-local"],
  "marmoraria-vila-cordeiro": ["seo-local"],
  "marmoraria-vila-cruzeiro": ["seo-local"],
  "marmoraria-jardim-guedala": ["seo-local"],
  "marmoraria-vila-gumercindo": ["seo-local"],
  "marmoraria-aconchego-da-zona-sul": ["seo-local"],
  "banheiro-quartzo-sao-paulo": ["seo-local"],
  "lavatório-sob-medida-sao-paulo": ["seo-local"],
  "painel-marmore-sao-paulo": ["seo-local"],
  "area-gourmet-granito-sao-paulo": ["seo-local"],
  "bancada-cozinha-sob-medida-sao-paulo": ["seo-local"],
  "bancada-banheiro-sao-paulo": ["seo-local"],
  "nicho-banheiro-sao-paulo": ["seo-local"],
  "cuba-esculpida-sao-paulo": ["seo-local"],
  "lareira-marmore-sao-paulo": ["seo-local"],
  "mesa-quartzito-sao-paulo": ["seo-local"],
  "bancada-quartzito-sao-paulo": ["seo-local"],
  "bancada-dekton-sao-paulo": ["seo-local"],
  "bancada-silestone-sao-paulo": ["seo-local"],
  "ilha-cozinha-quartzito-sao-paulo": ["seo-local"],
  "escada-granito-sao-paulo": ["seo-local"],
  "lavabo-onix-sao-paulo": ["seo-local"],
  "painel-quartzito-sao-paulo": ["seo-local"],
  "pia-cozinha-granito-sao-paulo": ["seo-local"],
  "bancada-quartzo-branco-sao-paulo": ["seo-local"],
  "bancada-preto-sao-gabriel-sao-paulo": ["seo-local"],
  "cuba-esculpida-marmore-sao-paulo": ["seo-local"],
  "lavatorio-quartzito-sao-paulo": ["seo-local"],
  "ilha-dekton-sao-paulo": ["seo-local"],
  "churrasqueira-quartzito-sao-paulo": ["seo-local"],
  "revestimento-lareira-marmore-sao-paulo": ["seo-local"],
  "escada-quartzito-sao-paulo": ["seo-local"],
  "bancada-porcelanato-sao-paulo": ["seo-local"],
  "bancada-area-gourmet-sao-paulo": ["seo-local"],
  "lavatorio-marmore-sao-paulo": ["seo-local"],
  "bancada-lavabo-sao-paulo": ["seo-local"],
  "soleira-peitoril-sao-paulo": ["seo-local"],
  "mesa-pedra-sao-paulo": ["seo-local"],
  "nicho-marmore-sao-paulo": ["seo-local"],
  "pia-esculpida-sao-paulo": ["seo-local"],
  "bancada-ilha-cozinha-sao-paulo": ["seo-local"],
  "pedra-para-cozinha-sao-paulo": ["seo-local"],
  "marmoraria-perto-de-mim-sao-paulo": ["seo-local"],
  "regioes-servicos": ["seo-index"],
  logo: ["logo"],
  contato: ["contato"],
};

function getPageFromLocation(): PageKey {
  const url = new URL(window.location.href);
  const p = (url.searchParams.get("p") || "home").toLowerCase();
  return (ROUTES[p as PageKey] ? (p as PageKey) : "home") as PageKey;
}

function setQueryPage(page: PageKey, hash?: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("p", page);
  if (typeof hash === "string") url.hash = hash;
  history.pushState({ p: page }, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function useQueryPage() {
  const [page, setPage] = useState<PageKey>(() => {
    if (typeof window === "undefined") return "home";
    return getPageFromLocation();
  });

  useEffect(() => {
    const onPopState = () => setPage(getPageFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return page;
}

function normalizeQuartzitoSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^quartzito\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getQuartzitoSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeQuartzitoSlug(url.searchParams.get("slug") || "");
}

function buildQuartzitoPageUrl(slug: string) {
  const safe = normalizeQuartzitoSlug(slug);
  return `?p=quartzito-material&slug=${encodeURIComponent(safe)}`;
}

function useQuartzitoSlug() {
  const [slug, setSlug] = useState(() => getQuartzitoSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getQuartzitoSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeGranitoSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^granito\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getGranitoSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeGranitoSlug(url.searchParams.get("slug") || "");
}

function buildGranitoPageUrl(slug: string) {
  const safe = normalizeGranitoSlug(slug);
  return `?p=granito-material&slug=${encodeURIComponent(safe)}`;
}

function useGranitoSlug() {
  const [slug, setSlug] = useState(() => getGranitoSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getGranitoSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeMarmoreSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^marmore\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getMarmoreSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeMarmoreSlug(url.searchParams.get("slug") || "");
}

function buildMarmorePageUrl(slug: string) {
  const safe = normalizeMarmoreSlug(slug);
  return `?p=marmore-material&slug=${encodeURIComponent(safe)}`;
}

function useMarmoreSlug() {
  const [slug, setSlug] = useState(() => getMarmoreSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getMarmoreSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeSilestoneSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^silestone\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getSilestoneSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeSilestoneSlug(url.searchParams.get("slug") || "");
}

function buildSilestonePageUrl(slug: string) {
  const safe = normalizeSilestoneSlug(slug);
  return `?p=silestone-material&slug=${encodeURIComponent(safe)}`;
}

function useSilestoneSlug() {
  const [slug, setSlug] = useState(() => getSilestoneSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getSilestoneSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeQuartzoStoneSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^quartzo\s+stone\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getQuartzoStoneSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeQuartzoStoneSlug(url.searchParams.get("slug") || "");
}

function buildQuartzoStonePageUrl(slug: string) {
  const safe = normalizeQuartzoStoneSlug(slug);
  return `?p=quartzo-stone-material&slug=${encodeURIComponent(safe)}`;
}

function useQuartzoStoneSlug() {
  const [slug, setSlug] = useState(() => getQuartzoStoneSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getQuartzoStoneSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeDektonSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^dekton\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getDektonSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeDektonSlug(url.searchParams.get("slug") || "");
}

function buildDektonPageUrl(slug: string) {
  const safe = normalizeDektonSlug(slug);
  return `?p=dekton-material&slug=${encodeURIComponent(safe)}`;
}

function useDektonSlug() {
  const [slug, setSlug] = useState(() => getDektonSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getDektonSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function normalizeSinthSlug(slug: string) {
  return String(slug || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^sinth\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getSinthSlugFromLocation() {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return normalizeSinthSlug(url.searchParams.get("slug") || "");
}

function buildSinthPageUrl(slug: string) {
  const safe = normalizeSinthSlug(slug);
  return `?p=sinth-material&slug=${encodeURIComponent(safe)}`;
}

function useSinthSlug() {
  const [slug, setSlug] = useState(() => getSinthSlugFromLocation());

  useEffect(() => {
    const onPopState = () => setSlug(getSinthSlugFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return slug;
}

function useInViewOnce<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function LogoMark({ mode }: { mode: "header" | "footer" }) {
  const gradId = useId();
  const gradient = mode === "header" ? `douroGold_${gradId}` : `douroGoldFooter_${gradId}`;

  return (
    <span
      className={
        mode === "header"
          ? "inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black border border-[rgba(201,169,97,0.3)] shadow-sm"
          : "inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/15"
      }
    >
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={gradient} x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a961" />
            <stop offset="0.5" stopColor="#f0d78c" />
            <stop offset="1" stopColor="#c9a961" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="50" height="50" rx="14" stroke={`url(#${gradient})`} strokeWidth="2" />
        <path d="M23 46V18h12.4c9.9 0 17.6 5.9 17.6 14s-7.7 14-17.6 14H23Z" stroke={`url(#${gradient})`} strokeWidth="4" strokeLinejoin="round" />
        <path d="M27 40c5.5-6.4 11.2-4.5 13.6-8.2 2.5-3.8 6.4-3.1 9.8-7.4" stroke="rgba(240,215,140,0.85)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function SmartImg({
  src,
  alt,
  className,
  loading,
  fallbackSrcs = [],
  style,
  sizes,
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackSrcs?: string[];
  style?: React.CSSProperties;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}) {
  const placeholder =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='900'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20x2='1'%20y1='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23f3f4f6'/%3E%3Cstop%20offset='1'%20stop-color='%23e5e7eb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='900'%20fill='url(%23g)'/%3E%3Ctext%20x='50%25'%20y='50%25'%20text-anchor='middle'%20dominant-baseline='middle'%20font-family='Montserrat%2C%20Arial'%20font-size='34'%20fill='%236b7280'%3EImagem%20indispon%C3%ADvel%3C/text%3E%3C/svg%3E";

  const candidates = useMemo(() => {
    const seeds = [src, ...(fallbackSrcs || [])].filter(Boolean);
    if (seeds.length === 0) return [placeholder];

    const uniq = new Set<string>();
    const add = (u: string) => {
      if (!u) return;
      uniq.add(u);
    };

    const ORIGIN = typeof window !== "undefined" ? window.location.origin : "";
    const MAIN_HOST = "https://douromarmores.com.br";
    const IS_HSTGR = typeof window !== "undefined" && window.location.hostname.includes("hstgr.io");

    const withHostVariants = (u: string) => {
      const out: string[] = [];
      const push = (v: string) => {
        if (!v) return;
        out.push(v);
      };

      if (u.startsWith(MAIN_HOST)) push(u.replace(MAIN_HOST, ""));
      if (ORIGIN && u.startsWith(ORIGIN)) push(u.replace(ORIGIN, ""));

      const isMainDomain = typeof window !== "undefined" && window.location.hostname === "douromarmores.com.br";

      if (u.startsWith("/")) {
        if (u.startsWith("/media/")) {
          const extra = (ASSETS as any).mediaExtraBases as string[] | undefined;
          if (Array.isArray(extra) && extra.length > 0 && !isMainDomain) {
            for (const base of extra) push(`${base}${u}`);
          }
        }

        push(u);
        push(`${MAIN_HOST}${u}`);
        if (ORIGIN) push(`${ORIGIN}${u}`);

        if (u.startsWith("/media/")) {
          const extra = (ASSETS as any).mediaExtraBases as string[] | undefined;
          if (Array.isArray(extra)) {
            for (const base of extra) push(`${base}${u}`);
          }
        }
      } else {
        push(u);
      }

      return out;
    };

    const pathVariants = (u: string) => {
      const out: string[] = [];
      const push = (v: string) => {
        for (const h of withHostVariants(v)) out.push(h);
      };

      if (IS_HSTGR) {
        const hasFiles = u.includes("/files/public_html/media/");
        const hasPreviewBig = u.includes("/api/preview/big/public_html/media/");
        const hasPreviewMed = u.includes("/api/preview/medium/public_html/media/");
        const hasPreviewSmall = u.includes("/api/preview/small/public_html/media/");
        const hasAnyPreview = u.includes("/api/preview/");
        const hasRootMedia = u.includes("/media/") && !u.includes("/public_html/media/");

        if (hasFiles) {
          push(u.replace("/files/public_html/media/", "/api/preview/small/public_html/media/"));
          push(u.replace("/files/public_html/media/", "/api/preview/medium/public_html/media/"));
          push(u.replace("/files/public_html/media/", "/api/preview/big/public_html/media/"));
          push(u);
          push(u.replace("/files/public_html/media/", "/media/"));
        } else if (hasPreviewBig) {
          push(u.replace("/api/preview/big/public_html/media/", "/api/preview/small/public_html/media/"));
          push(u.replace("/api/preview/big/public_html/media/", "/api/preview/medium/public_html/media/"));
          push(u);
          push(u.replace("/api/preview/big/public_html/media/", "/files/public_html/media/"));
          push(u.replace("/api/preview/big/public_html/media/", "/media/"));
        } else if (hasPreviewMed) {
          push(u.replace("/api/preview/medium/public_html/media/", "/api/preview/small/public_html/media/"));
          push(u);
          push(u.replace("/api/preview/medium/public_html/media/", "/api/preview/big/public_html/media/"));
          push(u.replace("/api/preview/medium/public_html/media/", "/files/public_html/media/"));
          push(u.replace("/api/preview/medium/public_html/media/", "/media/"));
        } else if (hasPreviewSmall) {
          push(u);
          push(u.replace("/api/preview/small/public_html/media/", "/api/preview/medium/public_html/media/"));
          push(u.replace("/api/preview/small/public_html/media/", "/api/preview/big/public_html/media/"));
          push(u.replace("/api/preview/small/public_html/media/", "/files/public_html/media/"));
          push(u.replace("/api/preview/small/public_html/media/", "/media/"));
        } else if (!hasAnyPreview && hasRootMedia) {
          push(u.replace("/media/", "/api/preview/small/public_html/media/"));
          push(u.replace("/media/", "/api/preview/medium/public_html/media/"));
          push(u.replace("/media/", "/api/preview/big/public_html/media/"));
          push(u.replace("/media/", "/files/public_html/media/"));
          push(u);
        } else {
          push(u);
        }
      } else {
        push(u);
        push(u.replace("/media/", "/files/public_html/media/"));
        push(u.replace("/files/public_html/media/", "/media/"));
        push(u.replace("/media/", "/api/preview/big/public_html/media/"));
        push(u.replace("/api/preview/big/public_html/media/", "/media/"));
        push(u.replace("/api/preview/big/", "/api/preview/medium/"));
        push(u.replace("/api/preview/big/", "/api/preview/small/"));
      }

      push(u.replace("/quartzitos/", "/quartizitos/"));
      push(u.replace("/quartizitos/", "/quartzitos/"));
      push(u.replace("/media/catalog/dekton/", "/media/catalog/laminas/dekton/"));
      push(u.replace("/media/catalog/laminas/dekton/", "/media/catalog/dekton/"));
      push(u.replace("/media/catalog/quartzo/", "/media/catalog/quartzos/"));
      push(u.replace("/media/catalog/quartzos/", "/media/catalog/quartzo/"));
      push(u.replace("/media/catalog/laminas/sinth/sinth-", "/media/catalog/laminas/sinth/"));
      push(u.replace("/media/catalog/quartzos/silestone/silestone-", "/media/catalog/quartzos/silestone/"));
      push(u.replace("/media/catalog/quartzo/silestone/silestone-", "/media/catalog/quartzo/silestone/"));
      if (u.includes("/silestone/")) push(u.replace(/([a-z])([0-9]{1,3})(\/)/gi, "$1-$2$3"));
      push(u.replace(/tovanew/gi, "tova-new"));
      push(u.replace(/tova-new/gi, "tovanew"));
      push(u.replace("/media/catalog/granitos/granito-", "/media/catalog/granitos/"));
      push(u.replace("/media/catalog/marmores/marmore-", "/media/catalog/marmores/"));
      push(u.replace("/media/catalog/quartzitos/quartzito-", "/media/catalog/quartzitos/"));
      push(u.replace("/media/catalog/limestone/limestone-", "/media/catalog/limestone/"));
      push(u.replace("/media/catalog/onix/onix-", "/media/catalog/onix/"));
      push(u.replace("/media/catalog/granitos/granito-branco-ceara-polar/", "/media/catalog/granitos/branco-ceara-polar/"));
      push(u.replace("/media/catalog/granitos/granito-branco-ceara-polar/", "/media/catalog/granitos/branco-polar/"));
      push(u.replace("/media/catalog/granitos/granito-branco-pitaya/", "/media/catalog/granitos/branco-pitaya/"));
      push(u.replace("/media/catalog/granitos/granito-branco-pitaya/", "/media/catalog/granitos/pitaya/"));
      push(u.replace("pitaya", "pitaia"));
      push(u.replace("/aplicacao", "/aplicação"));
      push(u.replace("/aplicação", "/aplicacao"));
      push(u.replace("/amostra.", "/Amostra."));
      push(u.replace("/amostra.", "/AMOSTRA."));
      push(u.replace("/aplicacao.", "/Aplicacao."));
      push(u.replace("/aplicacao.", "/APLICACAO."));
      return out;
    };

    const splitUrl = (u: string) => {
      const m = u.match(/^(^[^?#]+)([?#].*)?$/);
      return { core: m?.[1] ?? u, tail: m?.[2] ?? "" };
    };

    const addWithVariants = (base: string) => {
      const { core, tail } = splitUrl(base);
      const addFull = (u: string) => add(`${u}${tail}`);
      const addCoreVariants = (u: string) => {
        for (const v of pathVariants(u)) addFull(v);
      };

      const m = core.match(/^(.*)\.(avif|webp|jpg|jpeg|png|jfif)$/i);

      const addUnsplashOptimized = (u: string) => {
        if (!u.includes("images.unsplash.com/")) return;
        try {
          const url = new URL(u);
          if (!url.searchParams.get("w")) url.searchParams.set("w", "1200");
          if (!url.searchParams.get("q")) url.searchParams.set("q", "60");
          url.searchParams.set("auto", url.searchParams.get("auto") || "format");
          addCoreVariants(url.toString());
        } catch {
          // ignore
        }
      };

      addUnsplashOptimized(core);
      addCoreVariants(core);

      const exts = ["avif", "AVIF", "webp", "WEBP", "jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "jfif", "JFIF"] as const;
      const originalExts = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "jfif", "JFIF"] as const;
      const convertedExts = ["webp", "WEBP", "avif", "AVIF"] as const;

      if (m) {
        const noExt = m[1] || core;
        for (const ext of exts) addCoreVariants(`${noExt}.${ext}`);
        for (const o of originalExts) {
          for (const c of convertedExts) addCoreVariants(`${noExt}.${o}.${c}`);
        }
        addCoreVariants(noExt);
        return;
      }

      for (const ext of exts) addCoreVariants(`${core}.${ext}`);
      for (const o of originalExts) {
        for (const c of convertedExts) addCoreVariants(`${core}.${o}.${c}`);
      }
      addCoreVariants(core);
    };

    for (const seed of seeds) addWithVariants(seed);

    add(placeholder);
    return Array.from(uniq);
  }, [src, fallbackSrcs]);

  const [idx, setIdx] = useState(0);
  const fallbackKey = (fallbackSrcs || []).join("|");
  useEffect(() => {
    setIdx(0);
  }, [src, fallbackKey]);

  const current = candidates[Math.min(idx, candidates.length - 1)] || placeholder;

  const derivedSizes =
    sizes ||
    (className?.includes("aspect-square")
      ? "(min-width: 1024px) 120px, (min-width: 640px) 96px, 84px"
      : className?.includes("aspect-[16/10]") || className?.includes("aspect-[16/9]")
        ? "(min-width: 1280px) 900px, (min-width: 1024px) 760px, 100vw"
        : "100vw");

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      sizes={derivedSizes}
      fetchPriority={fetchPriority}
      style={style}
      onError={() => setIdx((v) => Math.min(v + 1, candidates.length - 1))}
    />
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const [showApplied, setShowApplied] = useState(false);
  const wa = useMemo(
    () => `https://wa.me/5511923210038?text=${encodeURIComponent("Olá! Quero orçamento para " + item.name + ".")}`,
    [item.name]
  );
  const isQuartzitoItem = item.name.toLowerCase().startsWith("quartzito ");
  const quartzitoMaterialUrl = isQuartzitoItem ? buildQuartzitoPageUrl(normalizeQuartzitoSlug(item.name)) : "#";
  const isGranitoItem = item.name.toLowerCase().startsWith("granito ");
  const granitoMaterialUrl = isGranitoItem ? buildGranitoPageUrl(normalizeGranitoSlug(item.name)) : "#";
  const isMarmoreItem = item.name.toLowerCase().startsWith("mármore ") || item.name.toLowerCase().startsWith("marmore ");
  const marmoreMaterialUrl = isMarmoreItem ? buildMarmorePageUrl(normalizeMarmoreSlug(item.name)) : "#";
  const isSilestoneItem = item.name.toLowerCase().startsWith("silestone ");
  const silestoneMaterialUrl = isSilestoneItem ? buildSilestonePageUrl(normalizeSilestoneSlug(item.name)) : "#";
  const isQuartzoStoneItem = item.name.toLowerCase().startsWith("quartzo stone ");
  const quartzoStoneMaterialUrl = isQuartzoStoneItem ? buildQuartzoStonePageUrl(normalizeQuartzoStoneSlug(item.name)) : "#";
  const isDektonItem = item.name.toLowerCase().startsWith("dekton ");
  const dektonMaterialUrl = isDektonItem ? buildDektonPageUrl(normalizeDektonSlug(item.name)) : "#";
  const isSinthItem = item.name.toLowerCase().startsWith("sinth ");
  const sinthMaterialUrl = isSinthItem ? buildSinthPageUrl(normalizeSinthSlug(item.name)) : "#";

  const isDekton =
    item.name.toLowerCase().startsWith("dekton ") ||
    item.sample.includes("/laminas/dekton/") ||
    item.applied.includes("/laminas/dekton/");

  const dektonSample = [item.sample, item.applied].find((u) => u.includes("/amostra")) || item.sample;
  const dektonApplied = [item.sample, item.applied].find((u) => u.includes("/aplicacao")) || item.applied;

  const sampleSrc = isDekton ? dektonSample : item.sample;
  const appliedSrc = isDekton ? dektonApplied : item.applied;
  const sampleFallbackSrcs = isDekton ? [] : [appliedSrc];
  const appliedFallbackSrcs = isDekton ? [] : [sampleSrc];

  const isQuartzoStone = item.name.toLowerCase().startsWith("quartzo stone ");
  const allowApplied = !isQuartzoStone;
  const { ref: cardRef, inView } = useInViewOnce<HTMLElement>(0.05);
  const [mountAppliedLayer, setMountAppliedLayer] = useState(() => allowApplied);

  const toggleView = () => {
    if (!allowApplied) return;
    setShowApplied((v) => {
      const next = !v;
      if (next) setMountAppliedLayer(true);
      return next;
    });
  };

  const effectiveSampleSrc = isQuartzoStone && !inView ? "" : sampleSrc;
  const effectiveAppliedSrc = isQuartzoStone && !inView ? "" : appliedSrc;
  const effectiveSampleFallbacks = isQuartzoStone && !inView ? [] : sampleFallbackSrcs;
  const effectiveAppliedFallbacks = isQuartzoStone && !inView ? [] : appliedFallbackSrcs;

  return (
    <article
      ref={cardRef}
      className={[
        "catalog-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 hover-lift",
        showApplied ? "show-applied" : "",
      ].join(" ")}
      data-name={item.name}
    >
      <button
        type="button"
        className="w-full text-left"
        onClick={toggleView}
        aria-label="Alternar visualização (amostra/aplicação)"
        aria-pressed={showApplied}
      >
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <SmartImg
              src={effectiveSampleSrc}
              fallbackSrcs={effectiveSampleFallbacks}
              alt={`${item.name} - amostra`}
              className={[
                "catalog-img catalog-img-sample absolute inset-0 w-full h-full object-cover",
                effectiveSampleSrc.toLowerCase().endsWith(".png") ? "catalog-img-tight" : "",
              ].join(" ")}
              style={item.sampleScale ? ({ ["--catalog-img-scale" as any]: item.sampleScale } as any) : undefined}
              loading="lazy"
            />
            {allowApplied && mountAppliedLayer ? (
              <SmartImg
                src={effectiveAppliedSrc}
                fallbackSrcs={effectiveAppliedFallbacks}
                alt={`${item.name} aplicado`}
                className={[
                  "catalog-img catalog-img-applied absolute inset-0 w-full h-full object-cover",
                  effectiveAppliedSrc.toLowerCase().endsWith(".png") ? "catalog-img-tight" : "",
                ].join(" ")}
                style={item.appliedScale ? ({ ["--catalog-img-scale" as any]: item.appliedScale } as any) : undefined}
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-flex items-center bg-black/70 text-white text-[11px] px-3 py-1 rounded-full tracking-widest">AMOSTRA</span>
            {allowApplied ? (
              <span className="catalog-label-applied inline-flex items-center bg-gold text-white text-[11px] px-3 py-1 rounded-full tracking-widest">APLICAÇÃO</span>
            ) : null}
          </div>
        </div>
      </button>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900 leading-snug">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.tag ? item.tag : "Clique para ver aplicação (projeto)"}</p>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition btn-glow"
            aria-label="Pedir orçamento no WhatsApp"
          >
            <i className="fab fa-whatsapp text-lg text-green-400" />
          </a>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            {allowApplied ? (
              <button type="button" className="text-sm font-semibold text-gray-900 hover:text-black" onClick={toggleView}>
                <i className="fas fa-repeat mr-2 text-gold" />
                Ver aplicação
              </button>
            ) : (
              <span className="text-sm text-gray-500">Amostra</span>
            )}
            {isQuartzitoItem ? (
              <a href={quartzitoMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isGranitoItem ? (
              <a href={granitoMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isMarmoreItem ? (
              <a href={marmoreMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isSilestoneItem ? (
              <a href={silestoneMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isQuartzoStoneItem ? (
              <a href={quartzoStoneMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isDektonItem ? (
              <a href={dektonMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
            {isSinthItem ? (
              <a href={sinthMaterialUrl} className="text-sm font-semibold text-gray-900 hover:text-black transition">
                Ver detalhes <i className="fas fa-arrow-up-right-from-square ml-1 text-gold" />
              </a>
            ) : null}
          </div>
          <a href={wa} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gold hover:text-yellow-700 transition">
            Orçamento <i className="fas fa-arrow-right ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
}

function CatalogSection({
  id,
  title,
  subtitle,
  items,
  onNav,
  show,
  backTo,
  extraActions,
  footerActions,
}: {
  id: string;
  title: string;
  subtitle: React.ReactNode;
  items: CatalogItem[];
  show: boolean;
  onNav: (page: PageKey) => void;
  backTo?: PageKey;
  extraActions?: React.ReactNode;
  footerActions?: React.ReactNode;
}) {
  if (!show) return null;

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold">Catálogo</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
            <div className="text-gray-600 mt-3 max-w-2xl space-y-3 leading-relaxed">{subtitle}</div>
          </div>

          <div className="w-full sm:w-auto flex flex-col gap-3 sm:items-end">
            {backTo || extraActions ? (
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
                {backTo ? (
                  <a
                    href={`?p=${backTo}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNav(backTo);
                    }}
                    className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition"
                    aria-label="Voltar"
                    title="Voltar"
                  >
                    <i className="fas fa-arrow-left" />
                  </a>
                ) : null}

                {extraActions ? <div className="min-w-0 flex-1 sm:flex-none flex justify-end">{extraActions}</div> : null}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 justify-start sm:justify-end">
              {backTo ? (
                <a
                  href={`?p=${backTo}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(backTo);
                  }}
                  className="hidden sm:inline-flex items-center px-5 py-3 rounded-full font-semibold border border-gray-200 hover:border-gray-900 hover:text-gray-900 transition"
                >
                  <i className="fas fa-arrow-left mr-2" />
                  Voltar
                </a>
              ) : null}

              <a
                href="?p=contato"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("contato");
                }}
                className="bg-gold text-white px-7 py-3 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow w-full sm:w-auto text-center"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <CatalogCard key={it.name} item={it} />
          ))}
        </div>

        {footerActions ? (
          <div className="mt-10 flex items-center justify-center">
            <div className="inline-flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-500">Navegação:</span>
              {footerActions}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FadeInUp({ children, delayMs = 0 }: { children: React.ReactNode; delayMs?: number }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={["fade-in-up", inView ? "visible" : ""].join(" ")} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}

function HashLinkInterceptor({ onHash }: { onHash: (hash: string) => void }) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      onHash(href);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onHash]);

  return null;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (attrs.name) el.setAttribute("name", attrs.name);
    if (attrs.property) el.setAttribute("property", attrs.property);
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "content") el.setAttribute("content", v);
    else if (k !== "name" && k !== "property") el.setAttribute(k, v);
  }
}

function upsertLinkRel(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

type QuartzitoMaterialCopy = {
  eyebrow?: string;
  intro: string;
  technical: string;
  practical: string;
  value: string;
  indicationTitle: string;
  indicationText: string;
  benefitTitle: string;
  benefitText: string;
  executionTitle: string;
  executionText: string;
  seoDescription?: string;
};

type GranitoMaterialCopy = {
  eyebrow?: string;
  intro: string;
  technical: string;
  practical: string;
  value: string;
  indicationTitle: string;
  indicationText: string;
  benefitTitle: string;
  benefitText: string;
  executionTitle: string;
  executionText: string;
  seoDescription?: string;
};

type MarmoreMaterialCopy = {
  eyebrow?: string;
  intro: string;
  technical: string;
  practical: string;
  value: string;
  indicationTitle: string;
  indicationText: string;
  benefitTitle: string;
  benefitText: string;
  executionTitle: string;
  executionText: string;
  seoDescription?: string;
};

type QuartzoEngenhariaMaterialCopy = {
  eyebrow?: string;
  intro: string;
  technical: string;
  practical: string;
  value: string;
  indicationTitle: string;
  indicationText: string;
  benefitTitle: string;
  benefitText: string;
  executionTitle: string;
  executionText: string;
  seoDescription?: string;
};

const QUARTZITO_MATERIAL_COPY: Record<string, QuartzitoMaterialCopy> = {
  "quartzito-taj-mahal-perla-santana": {
    eyebrow: "Quartzito claro para cozinhas, ilhas e ambientes de alto padrão",
    intro:
      "O Quartzito Taj Mahal é procurado por quem quer uma pedra natural clara, sofisticada e extremamente versátil para cozinhas, ilhas, bancadas, painéis e áreas gourmet. Ele entrega aquela leitura elegante e luminosa que valoriza o ambiente inteiro, com um desenho orgânico que transmite equilíbrio, refinamento e sensação de projeto bem resolvido.",
    technical:
      "Em termos técnicos, o Taj Mahal é um quartzito natural com estrutura mineral rica em quartzo, alta dureza e excelente desempenho para aplicações que exigem resistência e estabilidade. É uma escolha forte para quem pesquisa quartzito para cozinha, quartzito para ilha e pedra natural resistente para bancada, especialmente quando o objetivo é unir desempenho prático com estética nobre.",
    practical:
      "Na prática, o maior benefício do Taj Mahal é a facilidade de construir ambientes claros, acolhedores e atemporais sem abrir mão de segurança para a rotina. Ele amplia a percepção de luz, conversa muito bem com marcenaria em tons de madeira, fendi, off-white e bege, e cria uma atmosfera sofisticada sem pesar visualmente o espaço.",
    value:
      "O Taj Mahal é uma decisão que agrega valor porque funciona muito bem hoje e continua elegante com o passar do tempo. É a pedra de quem quer abrir a cozinha, olhar o conjunto pronto e sentir que fez uma escolha segura, bonita e coerente com um projeto de alto nível.",
    indicationTitle: "Cozinhas claras, ilhas e ambientes autorais",
    indicationText: "Ideal para quem busca uma bancada clara com presença, luz e elegância duradoura, sem abrir mão de desempenho real no uso cotidiano.",
    benefitTitle: "Luz, sofisticação e versatilidade",
    benefitText: "O Taj Mahal valoriza a iluminação, harmoniza facilmente com marcenaria e metais e cria um visual sofisticado que não fica datado.",
    executionTitle: "Paginação e borda mudam o nível do resultado",
    executionText: "No Taj Mahal, a força do projeto aparece quando a escolha da chapa, a direção do veio, a emenda e a borda são tratadas como parte do design.",
    seoDescription:
      "Quartzito Taj Mahal em São Paulo para cozinhas, ilhas, bancadas e painéis sob medida. Pedra natural clara, sofisticada e resistente, com acabamento premium e paginação impecável.",
  },
  "quartzito-mont-blanc": {
    eyebrow: "Quartzito branco com movimento suave e leitura sofisticada",
    intro:
      "O Quartzito Mont Blanc é uma das escolhas mais elegantes para quem quer uma pedra natural clara com personalidade, leveza visual e forte apelo arquitetônico. Ele funciona muito bem em cozinhas, ilhas, painéis e bancadas que pedem um visual limpo, refinado e contemporâneo.",
    technical:
      "Tecnicamente, o Mont Blanc combina a beleza de uma pedra de veios suaves com a estrutura e a dureza características do quartzito natural. Isso faz dele uma alternativa muito valorizada por quem procura pedra que parece mármore mas é mais resistente, especialmente em projetos onde estética e rotina precisam caminhar juntas.",
    practical:
      "Na prática, o Mont Blanc entrega amplitude, sensação de limpeza visual e enorme facilidade de composição com marcenaria clara, madeira natural, serralheria preta e metais escovados. É uma pedra que deixa o ambiente mais leve sem perder impacto, e ajuda a construir cozinhas e ilhas com aparência de projeto editorial.",
    value:
      "Escolher Mont Blanc é optar por uma pedra que eleva a percepção do imóvel e deixa o projeto mais elegante no primeiro olhar. É o tipo de material que transmite bom gosto, critério e uma estética premium que continua atual com o tempo.",
    indicationTitle: "Ilhas e bancadas com leitura clara e elegante",
    indicationText: "Excelente para cozinhas sofisticadas, ambientes integrados e projetos onde a pedra precisa iluminar e organizar visualmente o espaço.",
    benefitTitle: "Amplitude com presença",
    benefitText: "O Mont Blanc amplia visualmente o ambiente, melhora a leitura da luz e entrega uma elegância limpa, muito valorizada em projetos contemporâneos.",
    executionTitle: "Veios suaves pedem recorte inteligente",
    executionText: "No Mont Blanc, a execução premium está em respeitar o desenho natural da chapa e usar paginação, borda e emendas para reforçar continuidade e leveza.",
    seoDescription:
      "Quartzito Mont Blanc em São Paulo para bancada, cozinha, ilha e painéis sob medida. Pedra natural clara, elegante e resistente, ideal para projetos de alto padrão.",
  },
  "quartzito-branco-macaubas-wood-white": {
    eyebrow: "Quartzito branco sofisticado para ambientes leves e atemporais",
    intro:
      "O Quartzito Branco Macaúbas, também conhecido como Wood White, é muito valorizado por quem quer uma pedra natural clara, elegante e com desenho delicado para cozinhas, ilhas, bancadas e painéis. Ele cria um visual sereno, refinado e extremamente arquitetônico, com uma presença mais silenciosa e sofisticada.",
    technical:
      "Em termos técnicos, trata-se de um quartzito natural com boa dureza, estrutura estável e excelente desempenho para aplicações internas de alto padrão. É uma pedra muito buscada por quem quer quartzito branco para cozinha, pedra natural clara para ilha ou bancada branca sofisticada com mais segurança para uso diário.",
    practical:
      "No uso prático, o Branco Macaúbas funciona muito bem para quem quer iluminar o ambiente, criar sensação de amplitude e manter uma estética limpa sem cair na frieza de superfícies artificiais muito chapadas. Ele conversa com marcenaria clara, madeira natural, linhas minimalistas e metais mais discretos.",
    value:
      "É uma pedra que entrega valor pelo conjunto: exclusividade de desenho, leveza visual, refinamento e uma presença premium que faz o ambiente parecer mais bem pensado, mais sofisticado e mais valorizado.",
    indicationTitle: "Projetos claros e atemporais",
    indicationText: "Indicado para quem quer um quartzito branco com leitura elegante e natural para cozinhas integradas, ilhas, painéis e bancadas premium.",
    benefitTitle: "Clareza com naturalidade",
    benefitText: "Ele ilumina o projeto e amplia o espaço sem perder profundidade, deixando o ambiente mais sofisticado e menos artificial.",
    executionTitle: "Elegância está no detalhe silencioso",
    executionText: "No Branco Macaúbas, o resultado premium depende de paginação delicada, cortes limpos e acabamento que preserve a leveza do material.",
    seoDescription:
      "Quartzito Branco Macaúbas em São Paulo para cozinhas, ilhas, bancadas e painéis. Pedra natural clara, elegante e resistente, com acabamento premium sob medida.",
  },
  "quartzito-azul-macaubas": {
    eyebrow: "Quartzito azul de alto impacto visual para projetos autorais",
    intro:
      "O Quartzito Azul Macaúbas é um material de presença marcante, indicado para quem quer transformar bancada, ilha, painel ou mesa em protagonista do ambiente. É uma pedra natural extremamente expressiva, com desenho exclusivo e forte apelo estético em projetos de arquitetura e interiores de alto padrão.",
    technical:
      "Tecnicamente, o Azul Macaúbas reúne as características estruturais do quartzito natural, com alta dureza e desempenho superior ao de materiais mais sensíveis. É uma escolha procurada por quem busca quartzito azul em São Paulo, pedra natural exótica para ilha ou bancada premium com impacto visual e boa resistência.",
    practical:
      "Na prática, ele é perfeito para ambientes onde a pedra precisa criar identidade. Funciona muito bem em ilhas centrais, painéis de destaque, bancadas especiais e mesas, principalmente quando o projeto quer sair do óbvio e trabalhar profundidade, cor e sofisticação de forma controlada.",
    value:
      "O Azul Macaúbas agrega valor por exclusividade. Não é uma pedra para simplesmente compor: é uma pedra para assinar o espaço, gerar conversa, criar lembrança e posicionar o ambiente em outro nível de percepção estética.",
    indicationTitle: "Ilhas, painéis e peças de destaque",
    indicationText: "Ideal para projetos que querem usar a pedra como protagonista e transformar o ambiente em uma composição autoral de alto impacto.",
    benefitTitle: "Exclusividade que valoriza",
    benefitText: "O Azul Macaúbas imprime identidade, diferencia o projeto e cria uma percepção de sofisticação difícil de reproduzir com materiais genéricos.",
    executionTitle: "Desenho da chapa é parte do projeto",
    executionText: "Nesse material, escolher a chapa certa e planejar paginação, emendas e recortes faz toda a diferença entre uma peça bonita e uma peça memorável.",
    seoDescription:
      "Quartzito Azul Macaúbas em São Paulo para ilhas, bancadas, painéis e mesas sob medida. Pedra natural exótica, sofisticada e resistente para projetos premium.",
  },
  "quartzito-verde-pantanal": {
    eyebrow: "Quartzito verde sofisticado para projetos naturais e exclusivos",
    intro:
      "O Quartzito Verde Pantanal é uma escolha muito valorizada em projetos que buscam sofisticação orgânica, profundidade visual e personalidade. Ele funciona muito bem em ilhas, bancadas, painéis e áreas gourmet onde a pedra precisa ter identidade própria e reforçar a assinatura do ambiente.",
    technical:
      "Em termos técnicos, o Verde Pantanal reúne a estrutura resistente do quartzito natural com uma composição visual marcante, rica em movimento e textura mineral. É indicado para quem procura quartzito verde para cozinha, pedra natural exótica para bancada ou uma solução de alto desempenho para projetos sofisticados em São Paulo.",
    practical:
      "Na prática, essa é uma pedra que combina muito bem com madeira, metais escovados, serralheria preta e iluminação quente. O resultado costuma ser um ambiente mais acolhedor, sofisticado e autoral, com presença forte sem perder elegância.",
    value:
      "O Verde Pantanal gera valor porque diferencia o projeto. Ele tira a bancada do campo do comum e leva o espaço para uma leitura mais exclusiva, mais arquitetônica e muito mais memorável para quem vive e para quem visita.",
    indicationTitle: "Ambientes com assinatura e calor visual",
    indicationText: "Excelente para ilhas, bancadas e painéis onde o objetivo é unir naturalidade, sofisticação e personalidade em uma mesma peça.",
    benefitTitle: "Sofisticação orgânica",
    benefitText: "O Verde Pantanal cria um ambiente mais acolhedor e exclusivo, valorizando marcenaria, metais e iluminação com muita elegância.",
    executionTitle: "Composição define o nível do resultado",
    executionText: "Nesse quartzito, marcenaria, luz, direção do veio e recorte precisam conversar para que o projeto fique verdadeiramente premium.",
    seoDescription:
      "Quartzito Verde Pantanal em São Paulo para cozinhas, ilhas, bancadas e painéis sob medida. Pedra natural verde, sofisticada e resistente para projetos autorais.",
  },
  "quartzito-negresco-escovado": {
    eyebrow: "Quartzito escuro premium para cozinhas elegantes e de presença",
    intro:
      "O Quartzito Negresco Escovado é indicado para quem quer uma pedra escura de grande presença, com visual sofisticado e acabamento marcante. Ele funciona muito bem em cozinhas, ilhas, áreas gourmet e painéis onde o objetivo é criar profundidade, contraste e personalidade com uma leitura contemporânea.",
    technical:
      "Tecnicamente, trata-se de um quartzito natural com excelente resistência e acabamento escovado, que reforça textura e caráter do material. É uma opção muito procurada por quem busca quartzito preto para cozinha, bancada escura premium ou pedra natural escovada em São Paulo.",
    practical:
      "No uso prático, o Negresco Escovado oferece um visual muito sofisticado e, quando bem combinado com iluminação, marcenaria e metais, cria uma sensação de ambiente mais refinado e mais exclusivo. O acabamento escovado também ajuda a construir uma leitura mais tátil, menos fria e mais arquitetônica.",
    value:
      "É uma pedra para quem quer autoridade visual no projeto. O Negresco Escovado transforma a bancada em um elemento de assinatura, eleva a percepção do imóvel e imprime um padrão de acabamento que chama atenção pelo conjunto, não pelo excesso.",
    indicationTitle: "Cozinhas, ilhas e gourmet com contraste premium",
    indicationText: "Perfeito para projetos que precisam de profundidade visual, contraste sofisticado e uma pedra escura com leitura contemporânea.",
    benefitTitle: "Presença com sofisticação",
    benefitText: "Ele cria uma bancada de forte impacto visual, com acabamento elegante e linguagem arquitetônica madura e atemporal.",
    executionTitle: "Luz e acabamento definem a percepção final",
    executionText: "No Negresco Escovado, a escolha da borda, da iluminação e do posicionamento da chapa é o que transforma a pedra em peça realmente premium.",
    seoDescription:
      "Quartzito Negresco Escovado em São Paulo para cozinhas, ilhas e áreas gourmet. Pedra natural escura, sofisticada e resistente, com acabamento premium sob medida.",
  },
  "quartzito-bianco-superiore": {
    eyebrow: "Quartzito claro premium para projetos elegantes e luminosos",
    intro:
      "O Quartzito Bianco Superiore é uma escolha muito forte para quem quer uma pedra natural clara, sofisticada e com desenho elegante para cozinhas, ilhas, bancadas e painéis. Ele entrega luminosidade, presença e uma sensação de projeto elevado, sem abrir mão da naturalidade da rocha.",
    technical:
      "Em termos técnicos, o Bianco Superiore reúne a estrutura de um quartzito natural com boa dureza, estabilidade e excelente desempenho em superfícies que exigem beleza e resistência. É uma pedra muito buscada por quem pesquisa quartzito branco para bancada e pedra natural clara para cozinha de alto padrão.",
    practical:
      "Na prática, ele ajuda a ampliar a percepção de espaço, valoriza a luz natural e combina com uma enorme variedade de linguagens de interiores — do contemporâneo ao clássico sofisticado. É uma pedra que funciona tanto para ambientes mais leves quanto para composições mais contrastadas.",
    value:
      "O Bianco Superiore agrega valor porque entrega refinamento com naturalidade. Ele deixa a bancada mais elegante, o ambiente mais claro e o projeto mais coerente com uma estética premium e atemporal.",
    indicationTitle: "Bancadas claras e ambientes sofisticados",
    indicationText: "Excelente para quem quer uma pedra clara e natural com leitura premium para cozinhas, ilhas, painéis e lavatórios marcantes.",
    benefitTitle: "Leveza que valoriza o conjunto",
    benefitText: "O Bianco Superiore melhora a leitura da luz, amplia visualmente o espaço e deixa o projeto mais elegante e mais bem resolvido.",
    executionTitle: "Beleza natural pede acabamento fino",
    executionText: "Nesse material, paginação, emendas discretas e acabamento preciso são o que fazem a pedra parecer ainda mais nobre no conjunto final.",
    seoDescription:
      "Quartzito Bianco Superiore em São Paulo para bancadas, cozinhas, ilhas e painéis sob medida. Pedra natural clara, sofisticada e resistente para projetos premium.",
  },
  "quartzito-wakanda-black": {
    eyebrow: "Quartzito preto de alto impacto para projetos sofisticados",
    intro:
      "O Quartzito Wakanda Black é indicado para quem quer uma pedra natural escura, contemporânea e de forte presença visual. Ele funciona muito bem em cozinhas, ilhas, bancadas, áreas gourmet e painéis que pedem profundidade, elegância e uma linguagem mais ousada e autoral.",
    technical:
      "Tecnicamente, o Wakanda Black reúne a resistência característica do quartzito natural com um visual escuro de grande impacto. É uma escolha procurada por quem busca quartzito preto em São Paulo, pedra natural escura para bancada ou superfície premium para cozinhas e ilhas de alto padrão.",
    practical:
      "Na prática, ele entrega contraste forte, sofisticação imediata e enorme potencial de composição com madeira, inox, metais pretos, champagne e iluminação quente. É uma pedra que transforma o ambiente e dá à bancada um papel protagonista na arquitetura do espaço.",
    value:
      "O Wakanda Black agrega valor porque foge do comum e reforça identidade. É uma escolha para quem quer um projeto memorável, com personalidade, acabamento premium e uma percepção clara de sofisticação e exclusividade.",
    indicationTitle: "Projetos escuros e de forte assinatura visual",
    indicationText: "Indicado para cozinhas, ilhas e áreas gourmet onde a bancada precisa se destacar como elemento central do projeto.",
    benefitTitle: "Contraste que impressiona",
    benefitText: "O Wakanda Black cria profundidade, eleva a leitura de luxo e reforça a identidade do ambiente com muita personalidade.",
    executionTitle: "Projeto, luz e chapa precisam conversar",
    executionText: "Nesse quartzito, o impacto final depende da escolha certa da chapa, da iluminação e do acabamento para revelar toda a força do material.",
    seoDescription:
      "Quartzito Wakanda Black em São Paulo para cozinhas, ilhas, bancadas e áreas gourmet. Pedra natural preta, sofisticada e resistente para projetos exclusivos.",
  },
  "quartzito-artemis": {
    eyebrow: "Quartzito claro e sofisticado para cozinhas, ilhas e painéis premium",
    intro:
      "O Quartzito Artemis é uma escolha muito forte para quem quer uma pedra natural clara com presença elegante, leitura refinada e excelente versatilidade de composição. Ele funciona muito bem em cozinhas, ilhas, bancadas e painéis de alto padrão, principalmente em projetos que pedem sofisticação sem exagero e uma estética luminosa com personalidade.",
    technical:
      "Em termos técnicos, o Artemis reúne as características estruturais do quartzito natural: alta dureza, boa estabilidade e desempenho muito valorizado em superfícies que exigem resistência para o uso cotidiano. É uma opção bastante coerente para quem pesquisa quartzito claro para cozinha, pedra natural resistente para bancada e quartzito para ilha em São Paulo.",
    practical:
      "Na prática, o Artemis entrega um ambiente mais claro, mais elegante e mais fácil de harmonizar com marcenaria em madeira, off-white, bege, cinza claro e metais escovados. Ele cria uma sensação de projeto bem resolvido, com luminosidade e acabamento de alto nível, sem perder a naturalidade do desenho da pedra.",
    value:
      "O Artemis vale a escolha porque combina imagem premium, segurança de uso e uma estética que continua atual com o tempo. É a pedra de quem quer investir em um resultado bonito hoje e continuar sentindo orgulho do ambiente no dia a dia.",
    indicationTitle: "Cozinhas, ilhas e painéis com leitura clara",
    indicationText: "Excelente para projetos que buscam elegância, luz e presença natural em bancadas, ilhas e superfícies de destaque.",
    benefitTitle: "Clareza que valoriza o ambiente",
    benefitText: "O Artemis amplia a percepção de luz, deixa o espaço mais sofisticado e facilita composições elegantes com marcenaria e metais.",
    executionTitle: "Continuidade visual é o que faz parecer premium",
    executionText: "No Artemis, a escolha da chapa, a direção do veio e as emendas discretas são fundamentais para construir um resultado limpo e elegante.",
    seoDescription:
      "Quartzito Artemis em São Paulo para cozinhas, ilhas, bancadas e painéis sob medida. Pedra natural clara, sofisticada e resistente para projetos de alto padrão.",
  },
  "quartzito-emerald-green": {
    eyebrow: "Quartzito verde premium para projetos autorais e sofisticados",
    intro:
      "O Quartzito Emerald Green é indicado para quem quer uma pedra natural verde com impacto visual, profundidade e forte assinatura estética. É um material que funciona muito bem em ilhas, bancadas, painéis e áreas gourmet onde a pedra precisa participar ativamente da identidade do ambiente.",
    technical:
      "Tecnicamente, o Emerald Green combina a estrutura resistente do quartzito natural com uma leitura mineral marcante, rica em movimento e variações de cor. É uma excelente alternativa para quem busca quartzito verde em São Paulo, pedra natural exótica para bancada ou quartzito para ilha premium com personalidade.",
    practical:
      "Na prática, ele cria espaços mais exclusivos, sofisticados e memoráveis, especialmente quando combinado com madeira natural, serralheria preta, metais escovados e iluminação quente. O resultado costuma ser um ambiente com mais profundidade, mais design e uma sensação clara de projeto autoral.",
    value:
      "O Emerald Green agrega valor porque diferencia o projeto de forma elegante. Ele não apenas compõe; ele posiciona o ambiente em outro patamar de percepção estética e reforça a sensação de escolha criteriosa e acabamento premium.",
    indicationTitle: "Ilhas, bancadas e painéis de destaque",
    indicationText: "Ideal para projetos que querem usar a pedra como elemento protagonista, com personalidade e sofisticação orgânica.",
    benefitTitle: "Identidade visual com exclusividade",
    benefitText: "O Emerald Green transforma a bancada em assinatura do ambiente, reforçando design, profundidade e valor percebido.",
    executionTitle: "Material marcante pede composição bem pensada",
    executionText: "Nesse quartzito, paginação, luz e combinação com os demais materiais do projeto são decisivos para revelar todo o potencial da pedra.",
    seoDescription:
      "Quartzito Emerald Green em São Paulo para ilhas, bancadas, painéis e áreas gourmet. Pedra natural verde, sofisticada e resistente para projetos exclusivos.",
  },
  "quartzito-fusion": {
    eyebrow: "Quartzito exótico para projetos que pedem movimento e alto impacto visual",
    intro:
      "O Quartzito Fusion é uma pedra natural indicada para projetos que querem transformar bancada, ilha ou painel em uma peça de forte expressão visual. Seu desenho marcante e sua composição cheia de movimento fazem dele uma escolha muito valorizada em interiores premium que buscam personalidade e presença.",
    technical:
      "Em termos técnicos, o Fusion reúne a resistência do quartzito natural com uma leitura estética mais dramática e artística. Ele é procurado por quem pesquisa quartzito exótico em São Paulo, pedra natural para ilha de cozinha premium e bancada de quartzito com desenho marcante.",
    practical:
      "Na prática, o maior benefício do Fusion é criar um ambiente memorável. Ele funciona especialmente bem em ilhas centrais, painéis, mesas e bancadas protagonistas, ajudando o projeto a ganhar identidade, sofisticação e uma sensação de peça exclusiva.",
    value:
      "O Fusion vale a escolha porque eleva o ambiente pela emoção visual. É o tipo de pedra que faz o espaço ser lembrado, reforça a percepção de alto padrão e mostra que o projeto foi pensado com intenção estética e curadoria de material.",
    indicationTitle: "Ilhas, painéis e peças protagonistas",
    indicationText: "Perfeito para projetos autorais onde a pedra precisa ser elemento central de design e valorização estética do espaço.",
    benefitTitle: "Movimento que cria impacto",
    benefitText: "O Fusion transforma o ambiente em uma composição muito mais expressiva, exclusiva e visualmente rica.",
    executionTitle: "Paginação define o resultado final",
    executionText: "Nesse material, o estudo da chapa e a direção dos veios são essenciais para o projeto parecer realmente sofisticado e intencional.",
    seoDescription:
      "Quartzito Fusion em São Paulo para ilhas, bancadas, painéis e mesas sob medida. Pedra natural exótica, sofisticada e resistente para projetos premium.",
  },
  "quartzito-magma": {
    eyebrow: "Quartzito de presença intensa para ambientes com personalidade",
    intro:
      "O Quartzito Magma é indicado para quem quer uma pedra natural de grande impacto, com movimento forte e presença visual marcante. Ele funciona muito bem em ilhas, bancadas, painéis e mesas onde o objetivo é criar um ambiente exclusivo, sofisticado e com linguagem mais autoral.",
    technical:
      "Tecnicamente, o Magma combina a dureza e a resistência do quartzito natural com um desenho de grande dramaticidade visual. É uma escolha buscada por quem procura quartzito exótico em São Paulo, pedra natural para bancada premium e ilha de cozinha com forte assinatura estética.",
    practical:
      "Na prática, o Magma transforma o espaço. Ele cria contraste, profundidade e uma leitura de design muito mais forte, principalmente quando usado em projetos que combinam iluminação correta, marcenaria equilibrada e uma composição que deixa a pedra assumir protagonismo.",
    value:
      "O Magma agrega valor porque ele não passa despercebido. É a escolha de quem quer um ambiente com identidade, impacto e sensação de exclusividade real, sem abrir mão de uma base técnica confiável para o uso cotidiano.",
    indicationTitle: "Bancadas, ilhas e painéis com protagonismo",
    indicationText: "Excelente para projetos onde a pedra precisa gerar impacto visual e reforçar o caráter autoral do ambiente.",
    benefitTitle: "Presença que diferencia o projeto",
    benefitText: "O Magma cria um efeito memorável, valoriza o espaço e reforça a percepção de um ambiente muito mais exclusivo.",
    executionTitle: "Direção do desenho precisa ser estratégica",
    executionText: "Nesse quartzito, estudar a chapa e planejar cortes, emendas e bordas faz toda a diferença no resultado final.",
    seoDescription:
      "Quartzito Magma em São Paulo para bancadas, ilhas, painéis e mesas sob medida. Pedra natural exótica, marcante e resistente para projetos de alto padrão.",
  },
  "quartzito-maldive": {
    eyebrow: "Quartzito claro e elegante para projetos leves e sofisticados",
    intro:
      "O Quartzito Maldive é uma opção muito interessante para quem busca uma pedra natural clara com desenho elegante, leitura suave e grande versatilidade estética. Ele funciona muito bem em cozinhas, ilhas, bancadas e painéis que pedem um visual refinado, contemporâneo e fácil de integrar ao restante do projeto.",
    technical:
      "Em termos técnicos, o Maldive reúne boa dureza, estabilidade e as características valorizadas do quartzito natural para superfícies de alto padrão. É uma escolha coerente para quem pesquisa quartzito claro em São Paulo, bancada de quartzito para cozinha e pedra natural para ilha com resistência e elegância.",
    practical:
      "Na prática, ele entrega leveza visual, sensação de amplitude e enorme flexibilidade para combinar com diferentes estilos de marcenaria e metais. O resultado costuma ser um ambiente claro, harmonioso e com aparência de projeto bem resolvido, sem excesso visual.",
    value:
      "O Maldive agrega valor porque ajuda a construir uma estética sofisticada e atemporal. É uma escolha que favorece a luminosidade do ambiente e reforça a percepção de acabamento premium com naturalidade.",
    indicationTitle: "Cozinhas e ilhas com leitura leve",
    indicationText: "Indicado para projetos que procuram uma pedra clara, elegante e versátil para bancadas, ilhas e painéis de alto padrão.",
    benefitTitle: "Leveza que organiza o espaço",
    benefitText: "O Maldive melhora a leitura da luz e ajuda o ambiente a parecer mais amplo, claro e sofisticado.",
    executionTitle: "Detalhe bem resolvido valoriza ainda mais",
    executionText: "No Maldive, emendas discretas, paginação correta e borda bem escolhida elevam a percepção final do projeto.",
    seoDescription:
      "Quartzito Maldive em São Paulo para cozinhas, ilhas, bancadas e painéis sob medida. Pedra natural clara, elegante e resistente para projetos premium.",
  },
  "quartzito-mandalay-green": {
    eyebrow: "Quartzito verde elegante para projetos com sofisticação natural",
    intro:
      "O Quartzito Mandalay Green é indicado para quem quer uma pedra natural verde com sofisticação, profundidade e uma leitura mais orgânica do luxo. Ele se destaca muito bem em bancadas, ilhas, painéis e áreas gourmet onde a pedra precisa adicionar identidade sem perder elegância.",
    technical:
      "Tecnicamente, o Mandalay Green reúne a resistência típica do quartzito natural com uma composição visual muito valorizada por arquitetos e clientes que buscam quartzito verde em São Paulo, pedra natural diferenciada para bancada e materiais premium para cozinhas e ilhas.",
    practical:
      "Na prática, ele funciona muito bem com madeira, metais escovados, serralheria preta e iluminação quente, criando uma atmosfera sofisticada, acolhedora e muito mais autoral. É uma pedra que ajuda o ambiente a ter personalidade sem cair no excesso.",
    value:
      "O Mandalay Green vale a pena porque entrega exclusividade, identidade e um tipo de beleza natural que valoriza o imóvel e reforça a percepção de projeto premium em cada detalhe.",
    indicationTitle: "Ambientes com sofisticação orgânica",
    indicationText: "Excelente para quem quer usar uma pedra verde de alto padrão em ilhas, bancadas e painéis sofisticados.",
    benefitTitle: "Personalidade com elegância",
    benefitText: "O Mandalay Green cria um ambiente mais exclusivo, acolhedor e visualmente rico, com uma presença muito refinada.",
    executionTitle: "Composição certa é o que revela a pedra",
    executionText: "Nesse material, o resultado premium aparece quando a chapa, a luz, a marcenaria e os metais trabalham em harmonia.",
    seoDescription:
      "Quartzito Mandalay Green em São Paulo para cozinhas, ilhas, bancadas e painéis sob medida. Pedra natural verde, sofisticada e resistente para projetos exclusivos.",
  },
  "quartzito-green-bamboo": {
    eyebrow: "Quartzito verde para projetos elegantes, naturais e autorais",
    intro:
      "O Quartzito Green Bamboo é uma escolha muito valorizada em projetos que procuram uma pedra natural verde com leitura refinada, movimento orgânico e forte potencial decorativo. Ele funciona muito bem em ilhas, bancadas, painéis e espaços gourmet de alto padrão.",
    technical:
      "Em termos técnicos, o Green Bamboo reúne boa resistência, dureza e estabilidade, características próprias do quartzito natural em aplicações sob medida. É um material buscado por quem pesquisa quartzito verde para cozinha, bancada premium em São Paulo e pedra natural exclusiva para ilha e painel.",
    practical:
      "Na prática, ele ajuda a criar ambientes mais sofisticados e acolhedores, especialmente quando combinado com madeira, metais discretos e iluminação quente. O resultado é uma composição muito mais autoral, com sensação de curadoria e design intencional.",
    value:
      "O Green Bamboo agrega valor porque foge do padrão óbvio sem perder elegância. É uma pedra para quem quer um ambiente mais memorável, mais exclusivo e com clara percepção de acabamento premium.",
    indicationTitle: "Ilhas, bancadas e painéis com identidade natural",
    indicationText: "Indicado para projetos que buscam um quartzito verde sofisticado e exclusivo para superfícies de destaque.",
    benefitTitle: "Naturalidade com assinatura visual",
    benefitText: "O Green Bamboo cria uma composição mais rica e refinada, fortalecendo a identidade do ambiente com muita elegância.",
    executionTitle: "Projeto e pedra precisam conversar",
    executionText: "Nesse quartzito, o nível do resultado depende do encaixe entre a escolha da chapa, a paginação e a linguagem geral do ambiente.",
    seoDescription:
      "Quartzito Green Bamboo em São Paulo para bancadas, ilhas, painéis e áreas gourmet. Pedra natural verde, elegante e resistente para projetos premium.",
  },
  "quartzito-woodstone": {
    eyebrow: "Quartzito para cozinhas e áreas gourmet com leitura natural e sofisticada",
    intro:
      "O Quartzito Woodstone é muito procurado por quem quer uma pedra natural com aparência acolhedora, desenho elegante e enorme capacidade de integração com marcenaria, iluminação quente e projetos contemporâneos. Ele funciona muito bem em bancadas, ilhas, áreas gourmet e painéis que pedem naturalidade com presença.",
    technical:
      "Em termos técnicos, o Woodstone reúne as características mais valorizadas do quartzito natural: boa dureza, estrutura estável e excelente desempenho em superfícies que precisam unir beleza e resistência. É uma opção coerente para quem pesquisa quartzito para cozinha, quartzito para área gourmet e pedra natural resistente para bancada em São Paulo.",
    practical:
      "Na prática, ele entrega um ambiente mais acolhedor, sofisticado e fácil de harmonizar. É uma pedra que funciona especialmente bem quando a proposta do projeto é criar conforto visual sem abrir mão de uma leitura premium e de uma superfície confiável para o uso diário.",
    value:
      "O Woodstone vale a pena porque constrói um resultado elegante, equilibrado e muito mais atemporal. É o tipo de escolha que melhora a sensação do ambiente no dia a dia e reforça a percepção de projeto bem pensado e bem executado.",
    indicationTitle: "Cozinhas, ilhas e gourmet com calor visual",
    indicationText: "Excelente para quem quer uma pedra natural com leitura acolhedora e sofisticada em bancadas, ilhas e áreas de convivência.",
    benefitTitle: "Acolhimento com desempenho",
    benefitText: "O Woodstone ajuda a criar um ambiente mais confortável visualmente, com aparência premium e excelente versatilidade de composição.",
    executionTitle: "O desenho da chapa precisa ser respeitado",
    executionText: "Nesse quartzito, a direção do veio, a borda e as emendas bem resolvidas são decisivas para transformar a pedra em parte do design.",
    seoDescription:
      "Quartzito Woodstone em São Paulo para cozinhas, ilhas, bancadas e áreas gourmet sob medida. Pedra natural sofisticada, resistente e ideal para projetos premium.",
  },
  "quartzito-wakanda-grey": {
    eyebrow: "Quartzito cinza premium para cozinhas, ilhas e bancadas sofisticadas",
    intro:
      "O Quartzito Wakanda Grey é uma excelente escolha para quem busca uma pedra natural cinza com presença elegante, leitura contemporânea e grande potencial de composição em cozinhas, ilhas, bancadas e painéis. Ele entrega sofisticação sem excesso e conversa muito bem com arquitetura limpa e materiais de alto padrão.",
    technical:
      "Tecnicamente, o Wakanda Grey reúne resistência, estabilidade e o desempenho típico do quartzito natural em aplicações sob medida. É muito coerente para quem pesquisa quartzito cinza para cozinha, bancada em quartzito em São Paulo e pedra natural resistente para ilha e área gourmet.",
    practical:
      "Na prática, essa é uma pedra que facilita projetos maduros, equilibrados e com visual premium. Ela harmoniza com madeira, preto, inox, champagne e tons neutros, criando ambientes sofisticados e fáceis de manter esteticamente consistentes com o passar do tempo.",
    value:
      "O Wakanda Grey agrega valor porque entrega versatilidade com personalidade. É uma escolha segura para quem quer um projeto elegante, forte e com percepção clara de acabamento premium.",
    indicationTitle: "Projetos contemporâneos e bancadas de presença",
    indicationText: "Indicado para cozinhas, ilhas e bancadas que pedem uma pedra cinza sofisticada, equilibrada e de alto desempenho.",
    benefitTitle: "Elegância versátil",
    benefitText: "O Wakanda Grey cria um ambiente mais sofisticado e coerente, com facilidade de composição e forte valor estético.",
    executionTitle: "Acabamento define o tom do projeto",
    executionText: "Nesse material, paginação, iluminação e escolha de borda ajudam a transformar a bancada em uma peça muito mais refinada.",
    seoDescription:
      "Quartzito Wakanda Grey em São Paulo para cozinhas, ilhas, bancadas e painéis. Pedra natural cinza, sofisticada e resistente para projetos de alto padrão.",
  },
  "quartzito-verde-bambu": {
    eyebrow: "Quartzito verde para ambientes sofisticados com apelo natural",
    intro:
      "O Quartzito Verde Bambu é indicado para quem quer uma pedra natural verde com forte apelo decorativo, sofisticação orgânica e excelente potencial para bancadas, ilhas, painéis e áreas gourmet. Ele cria uma leitura refinada, natural e muito valorizada em projetos autorais.",
    technical:
      "Em termos técnicos, o Verde Bambu apresenta boa resistência, estabilidade e o desempenho típico do quartzito natural em superfícies sob medida. É um material muito alinhado a buscas como quartzito verde para bancada, quartzito para cozinha e pedra natural premium em São Paulo.",
    practical:
      "Na prática, ele ajuda a construir ambientes mais acolhedores, mais exclusivos e visualmente mais ricos, especialmente quando combinado com madeira natural, metais escovados e uma iluminação que valorize seus tons e movimentos.",
    value:
      "O Verde Bambu vale a escolha porque diferencia o projeto com elegância. É uma pedra que imprime personalidade, reforça a curadoria do ambiente e aumenta a percepção de sofisticação do conjunto.",
    indicationTitle: "Ilhas, bancadas e painéis com identidade natural",
    indicationText: "Excelente para projetos que procuram uma pedra verde elegante e autoral para superfícies de destaque.",
    benefitTitle: "Sofisticação orgânica e memorável",
    benefitText: "O Verde Bambu ajuda o ambiente a ganhar calor visual, exclusividade e uma presença muito mais refinada.",
    executionTitle: "Composição certa potencializa a pedra",
    executionText: "Nesse quartzito, a direção do veio e a combinação com marcenaria e metais são fundamentais para alcançar um resultado premium.",
    seoDescription:
      "Quartzito Verde Bambu em São Paulo para bancadas, ilhas, painéis e áreas gourmet. Pedra natural verde, sofisticada e resistente para projetos exclusivos.",
  },
  "quartzito-nybirus": {
    eyebrow: "Quartzito exótico para bancadas, ilhas e painéis de alto impacto",
    intro:
      "O Quartzito Nybirus é uma escolha indicada para projetos que querem transformar a pedra em protagonista. Ele funciona muito bem em ilhas, bancadas, painéis e mesas de destaque, especialmente quando o objetivo é criar um ambiente exclusivo, sofisticado e com forte identidade visual.",
    technical:
      "Tecnicamente, o Nybirus reúne a resistência do quartzito natural com uma leitura estética muito marcante, rica em movimento e personalidade. É uma opção valorizada por quem busca quartzito exótico em São Paulo, pedra natural para ilha e bancada premium com desenho autoral.",
    practical:
      "Na prática, o Nybirus entrega efeito de peça única. Ele ajuda a criar um ambiente memorável, reforça a assinatura do projeto e dá à bancada ou ao painel uma presença que muda completamente a percepção do espaço.",
    value:
      "O Nybirus agrega valor porque posiciona o projeto em outro patamar visual. É uma decisão para quem quer mais do que revestir: quer construir uma experiência estética de alto nível.",
    indicationTitle: "Peças protagonistas e ambientes autorais",
    indicationText: "Perfeito para ilhas, bancadas e painéis que precisam funcionar como elemento central do design do espaço.",
    benefitTitle: "Impacto com exclusividade",
    benefitText: "O Nybirus cria um ambiente muito mais singular e valoriza o projeto pela força visual e pela personalidade da pedra.",
    executionTitle: "Paginação transforma a peça em assinatura",
    executionText: "Nesse material, estudar a chapa e a direção do desenho é essencial para transformar a pedra em um verdadeiro destaque arquitetônico.",
    seoDescription:
      "Quartzito Nybirus em São Paulo para ilhas, bancadas, painéis e mesas sob medida. Pedra natural exótica, sofisticada e resistente para projetos premium.",
  },
  "quartzito-oak-bamboo": {
    eyebrow: "Quartzito com leitura natural e elegante para cozinhas e áreas gourmet",
    intro:
      "O Quartzito Oak Bamboo é indicado para projetos que procuram uma pedra natural com presença acolhedora, desenho elegante e forte capacidade de composição com madeira, tons neutros e iluminação quente. Ele funciona muito bem em cozinhas, ilhas, bancadas e áreas gourmet premium.",
    technical:
      "Em termos técnicos, o Oak Bamboo reúne as características valorizadas do quartzito natural, com boa resistência, estabilidade e excelente desempenho para superfícies de uso cotidiano. É coerente para quem busca quartzito para cozinha, bancada de quartzito em São Paulo e pedra natural para área gourmet.",
    practical:
      "Na prática, ele cria ambientes mais confortáveis visualmente e com aparência de projeto bem resolvido. É uma pedra que ajuda a construir elegância de forma natural, sem excesso e sem perder a força de presença que um material premium deve ter.",
    value:
      "O Oak Bamboo agrega valor porque une imagem sofisticada, funcionalidade e uma sensação de permanência que deixa o ambiente mais maduro e mais valorizado.",
    indicationTitle: "Bancadas e ilhas com leitura acolhedora",
    indicationText: "Excelente para quem quer uma pedra natural versátil, elegante e com grande capacidade de harmonização.",
    benefitTitle: "Conforto visual com assinatura premium",
    benefitText: "O Oak Bamboo deixa o espaço mais acolhedor e sofisticado, melhorando a sensação de equilíbrio no projeto.",
    executionTitle: "Detalhe silencioso é o que eleva o resultado",
    executionText: "Nesse quartzito, borda, paginação e continuidade visual são os pontos que fazem a pedra parecer ainda mais nobre.",
    seoDescription:
      "Quartzito Oak Bamboo em São Paulo para cozinhas, ilhas, bancadas e áreas gourmet sob medida. Pedra natural sofisticada, resistente e ideal para projetos premium.",
  },
  "quartzito-negroni": {
    eyebrow: "Quartzito marcante para projetos com identidade e sofisticação",
    intro:
      "O Quartzito Negroni é uma excelente escolha para quem quer uma pedra natural de presença forte, leitura sofisticada e personalidade bem definida em bancadas, ilhas, painéis e mesas. É um material que funciona muito bem em projetos que valorizam exclusividade e assinatura visual.",
    technical:
      "Tecnicamente, o Negroni reúne a resistência do quartzito natural com um desenho expressivo e muito valorizado em aplicações sob medida. É uma opção coerente para quem pesquisa quartzito exótico em São Paulo, pedra natural para bancada premium e ilha com forte impacto visual.",
    practical:
      "Na prática, ele ajuda o ambiente a sair do comum. O Negroni cria profundidade, reforça a identidade do projeto e gera uma sensação clara de curadoria, intenção estética e acabamento de alto padrão.",
    value:
      "O Negroni vale a escolha porque transforma a bancada em parte da narrativa do espaço. É uma pedra para quem quer mais presença, mais design e mais percepção de exclusividade.",
    indicationTitle: "Projetos autorais e peças protagonistas",
    indicationText: "Ideal para ilhas, bancadas e painéis que precisam ter impacto, personalidade e valor estético evidente.",
    benefitTitle: "Assinatura visual real",
    benefitText: "O Negroni diferencia o projeto e ajuda o ambiente a ser lembrado pela força do conjunto e pela personalidade da pedra.",
    executionTitle: "A leitura final depende da composição",
    executionText: "Nesse material, a escolha da chapa, o recorte e a paginação são fundamentais para transformar potencial estético em resultado premium.",
    seoDescription:
      "Quartzito Negroni em São Paulo para bancadas, ilhas, painéis e mesas sob medida. Pedra natural exótica, sofisticada e resistente para projetos autorais.",
  },
  "quartzito-moulin-rouge": {
    eyebrow: "Quartzito exótico para ambientes exclusivos e memoráveis",
    intro:
      "O Quartzito Moulin Rouge é indicado para projetos que querem usar a pedra como elemento de assinatura. Ele funciona muito bem em ilhas, bancadas, painéis e peças especiais onde o objetivo é criar impacto visual, exclusividade e uma estética verdadeiramente autoral.",
    technical:
      "Em termos técnicos, o Moulin Rouge apresenta a resistência e a estabilidade típicas do quartzito natural, somadas a um desenho expressivo que valoriza aplicações premium. É uma excelente escolha para quem busca quartzito exótico em São Paulo e pedra natural para bancadas e ilhas com alto valor estético.",
    practical:
      "Na prática, ele transforma a percepção do ambiente. O Moulin Rouge ajuda a construir espaços mais sofisticados e únicos, onde a pedra deixa de ser apenas superfície e passa a participar ativamente da identidade do projeto.",
    value:
      "O Moulin Rouge agrega valor porque entrega presença, exclusividade e uma sensação clara de curadoria de material. É uma pedra para quem quer um ambiente com mais emoção visual e mais assinatura.",
    indicationTitle: "Bancadas, ilhas e painéis protagonistas",
    indicationText: "Perfeito para projetos que precisam de uma pedra natural com impacto visual e grande potencial de diferenciação.",
    benefitTitle: "Exclusividade que se percebe no primeiro olhar",
    benefitText: "O Moulin Rouge reforça a identidade do espaço e valoriza o projeto pela força estética e pela singularidade do material.",
    executionTitle: "Desenho e recorte determinam o nível da peça",
    executionText: "Nesse quartzito, estudar o movimento da chapa é essencial para que a pedra seja instalada como um verdadeiro elemento de design.",
    seoDescription:
      "Quartzito Moulin Rouge em São Paulo para bancadas, ilhas, painéis e peças especiais sob medida. Pedra natural exótica, sofisticada e resistente para projetos premium.",
  },
  "quartzito-vitoria-regia": {
    eyebrow: "Quartzito sofisticado para projetos com naturalidade e alto padrão",
    intro:
      "O Quartzito Vitória Régia é uma escolha muito interessante para quem quer uma pedra natural elegante, com desenho diferenciado e presença refinada em bancadas, ilhas, painéis e áreas gourmet. Ele cria uma estética premium com forte leitura de exclusividade.",
    technical:
      "Tecnicamente, o Vitória Régia reúne boa dureza, resistência e estabilidade, características valorizadas no quartzito natural em aplicações sob medida. É uma pedra alinhada a buscas como quartzito premium em São Paulo, pedra natural para bancada e quartzito para ilha de cozinha.",
    practical:
      "Na prática, ele ajuda a deixar o ambiente mais sofisticado e mais memorável, principalmente quando integrado a uma marcenaria bem desenhada e a uma iluminação que valorize o movimento do material. É uma pedra que constrói presença sem perder elegância.",
    value:
      "O Vitória Régia agrega valor porque reforça a percepção de critério, bom gosto e acabamento superior. É uma escolha que melhora o conjunto do projeto e posiciona o ambiente em um padrão mais alto de sofisticação.",
    indicationTitle: "Ilhas, bancadas e painéis com elegância natural",
    indicationText: "Excelente para projetos que buscam uma pedra natural sofisticada, exclusiva e visualmente equilibrada.",
    benefitTitle: "Beleza que valoriza o conjunto",
    benefitText: "O Vitória Régia cria um ambiente mais nobre, mais bem resolvido e com muito mais personalidade visual.",
    executionTitle: "A instalação certa revela a pedra",
    executionText: "Nesse quartzito, paginação, acabamento e leitura do desenho são os pontos que elevam o material a um resultado realmente premium.",
    seoDescription:
      "Quartzito Vitória Régia em São Paulo para bancadas, ilhas, painéis e áreas gourmet sob medida. Pedra natural sofisticada, resistente e ideal para projetos de alto padrão.",
  },
  "quartzito-azulli": {
    eyebrow: "Quartzito de expressão autoral para projetos marcantes e sofisticados",
    intro:
      "O Quartzito Azulli é indicado para quem quer uma pedra natural com forte identidade estética e grande capacidade de transformar bancada, ilha ou painel em um ponto focal do ambiente. É uma escolha de alto valor visual para projetos contemporâneos e autorais.",
    technical:
      "Em termos técnicos, o Azulli reúne as características estruturais do quartzito natural, com resistência e estabilidade importantes para aplicações sob medida. Ele é muito coerente para quem pesquisa quartzito exótico em São Paulo, pedra natural para ilha e bancada premium com personalidade.",
    practical:
      "Na prática, o Azulli cria ambientes com muito mais presença e diferenciação. Ele ajuda a construir um projeto que foge do padrão comum e ganha força estética, sofisticação e memorabilidade no primeiro olhar.",
    value:
      "O Azulli vale a pena porque reforça exclusividade. É uma pedra para quem quer um ambiente com assinatura própria, percepção de alto padrão e valor estético muito acima do convencional.",
    indicationTitle: "Peças protagonistas e composições autorais",
    indicationText: "Ideal para ilhas, bancadas e painéis onde a pedra precisa ser parte central da identidade do projeto.",
    benefitTitle: "Design com personalidade real",
    benefitText: "O Azulli diferencia o ambiente e fortalece a sensação de um projeto exclusivo, sofisticado e muito bem curado.",
    executionTitle: "O estudo da chapa muda tudo",
    executionText: "Nesse material, a paginação correta é essencial para transformar o potencial visual da pedra em um resultado marcante e elegante.",
    seoDescription:
      "Quartzito Azulli em São Paulo para ilhas, bancadas, painéis e peças especiais sob medida. Pedra natural exótica, sofisticada e resistente para projetos premium.",
  },
  "quartzito-pietra-toscana": {
    eyebrow: "Quartzito elegante para projetos atemporais e sofisticados",
    intro:
      "O Quartzito Pietra Toscana é uma excelente escolha para quem quer uma pedra natural com aparência sofisticada, leitura equilibrada e grande potencial para bancadas, ilhas, painéis e áreas gourmet. Ele funciona muito bem em projetos que pedem refinamento e naturalidade no mesmo conjunto.",
    technical:
      "Tecnicamente, a Pietra Toscana reúne boa resistência, estabilidade e desempenho valorizado em superfícies sob medida. É alinhada a buscas como quartzito para cozinha, pedra natural para bancada em São Paulo e quartzito premium para ilha e gourmet.",
    practical:
      "Na prática, ela ajuda a construir um ambiente elegante, maduro e fácil de harmonizar com marcenaria, metais e iluminação. É uma pedra que transmite bom gosto e organização visual, sem perder profundidade e riqueza natural.",
    value:
      "A Pietra Toscana agrega valor porque entrega sofisticação com equilíbrio. É uma pedra para quem quer investir em um ambiente bonito, duradouro e com percepção clara de acabamento superior.",
    indicationTitle: "Cozinhas, ilhas e áreas gourmet refinadas",
    indicationText: "Excelente para projetos que buscam uma pedra natural versátil, elegante e premium para superfícies de destaque.",
    benefitTitle: "Elegância que atravessa o tempo",
    benefitText: "A Pietra Toscana valoriza o ambiente e ajuda a construir uma estética sofisticada, sólida e coerente com projetos de alto padrão.",
    executionTitle: "Acabamento discreto, percepção premium",
    executionText: "Nesse quartzito, o valor aparece quando paginação, borda e emendas são resolvidas de forma limpa e precisa.",
    seoDescription:
      "Quartzito Pietra Toscana em São Paulo para cozinhas, ilhas, bancadas e áreas gourmet sob medida. Pedra natural sofisticada, resistente e ideal para projetos premium.",
  },
  "quartzito-grey": {
    eyebrow: "Quartzito cinza para projetos contemporâneos e sofisticados",
    intro:
      "O Quartzito Grey é indicado para quem busca uma pedra natural cinza com leitura elegante, forte capacidade de composição e excelente desempenho em bancadas, ilhas, painéis e áreas gourmet. Ele funciona muito bem em projetos contemporâneos que valorizam equilíbrio, sofisticação e presença sem excesso.",
    technical:
      "Em termos técnicos, o Grey reúne resistência, estabilidade e as qualidades mais valorizadas do quartzito natural para aplicações sob medida. É uma pedra muito coerente para quem procura quartzito cinza em São Paulo, pedra natural para bancada e quartzito para cozinha e ilha com estética premium.",
    practical:
      "Na prática, ele é uma escolha versátil e segura para composições com madeira, preto, inox, metais escovados e paletas neutras. O resultado costuma ser um ambiente elegante, maduro e visualmente bem resolvido, com grande longevidade estética.",
    value:
      "O Quartzito Grey agrega valor porque entrega sofisticação sem esforço visual. É uma pedra que melhora a leitura do projeto, reforça a percepção de acabamento premium e ajuda o espaço a parecer mais coerente e mais valorizado.",
    indicationTitle: "Cozinhas, ilhas e bancadas contemporâneas",
    indicationText: "Indicado para projetos que querem uma pedra natural cinza premium com leitura equilibrada e excelente capacidade de harmonização.",
    benefitTitle: "Versatilidade com presença", 
    benefitText: "O Grey facilita composições sofisticadas e deixa o ambiente mais elegante, atual e visualmente consistente.",
    executionTitle: "Detalhes limpos reforçam a sofisticação",
    executionText: "Nesse quartzito, borda, paginação e encaixes bem resolvidos são os pontos que transformam a bancada em um elemento realmente premium.",
    seoDescription:
      "Quartzito Grey em São Paulo para cozinhas, ilhas, bancadas e áreas gourmet sob medida. Pedra natural cinza, sofisticada e resistente para projetos premium.",
  },
};

const GRANITO_MATERIAL_COPY: Record<string, GranitoMaterialCopy> = {
  "preto-sao-gabriel": {
    eyebrow: "Granito preto para cozinhas, áreas gourmet e projetos de rotina intensa",
    intro:
      "O Granito Preto São Gabriel é um dos materiais mais procurados para quem quer uma cozinha elegante, prática e muito segura para o dia a dia. Ele entrega profundidade visual, leitura contemporânea e uma sensação de projeto bem resolvido, sem abrir mão de resistência real.",
    technical:
      "Em termos técnicos, é um granito natural de alta densidade, baixa absorção relativa e excelente comportamento para bancadas, ilhas, cozinhas e áreas gourmet. É um material valorizado pela estabilidade, pela dureza e pela boa performance em uso intenso.",
    practical:
      "Na prática, é a escolha de quem quer cozinhar com mais tranquilidade, manter a bancada bonita por mais tempo e reduzir a preocupação com marcas do uso diário. Também funciona muito bem com marcenaria amadeirada, cinza, off-white e metais pretos ou inox.",
    value:
      "É um investimento que vale a pena porque une estética forte, rotina prática e uma imagem de durabilidade que valoriza o ambiente e transmite segurança na escolha.",
    indicationTitle: "Cozinhas, ilhas e áreas gourmet de uso intenso",
    indicationText: "Excelente para quem quer um granito preto elegante, funcional e muito confiável para rotina real.",
    benefitTitle: "Baixa manutenção com presença visual",
    benefitText: "Entrega sensação de cozinha premium, leitura contemporânea e praticidade no uso diário.",
    executionTitle: "Acabamento premium muda a percepção final",
    executionText: "No São Gabriel, borda, meia-esquadria, recortes e emendas bem resolvidas são o que fazem a pedra sair do básico e entrar no alto padrão.",
    seoDescription: "Granito Preto São Gabriel em São Paulo para bancadas, ilhas, cozinhas e áreas gourmet sob medida. Granito natural resistente, elegante e ideal para rotina intensa.",
  },
  "preto-absoluto": {
    eyebrow: "Granito preto uniforme para projetos sofisticados e de alta presença",
    intro:
      "O Granito Preto Absoluto é indicado para quem busca uma bancada com leitura mais limpa, uniforme e sofisticada, sem perder a robustez e a confiança de um granito natural premium.",
    technical:
      "Em termos técnicos, é um granito de alta densidade e excelente desempenho para bancadas, cozinhas, ilhas, lavatórios e áreas gourmet. Seu destaque está na coloração mais homogênea, que valoriza cortes, volumes e detalhes de acabamento.",
    practical:
      "Na prática, ele entrega uma aparência mais arquitetônica e refinada, combinando muito bem com projetos contemporâneos, marcenaria escura, madeira natural, cinzas e metais sofisticados.",
    value:
      "É uma escolha que reforça elegância, precisão visual e sensação de exclusividade, transformando a bancada em uma peça de impacto sem abrir mão de durabilidade.",
    indicationTitle: "Cozinhas contemporâneas, ilhas e lavatórios sofisticados",
    indicationText: "Ideal para quem quer um preto mais uniforme e uma leitura visual mais limpa no projeto.",
    benefitTitle: "Visual monolítico e elegante",
    benefitText: "A uniformidade do material valoriza volumes, linhas retas e acabamentos premium.",
    executionTitle: "Precisão de execução é o que revela o nível da peça",
    executionText: "No Preto Absoluto, pequenas diferenças de emenda, borda e polimento aparecem mais. Por isso, a execução precisa ser realmente fina.",
    seoDescription: "Granito Preto Absoluto em São Paulo para cozinhas, bancadas, ilhas e lavatórios sob medida. Granito natural uniforme, sofisticado e resistente para projetos premium.",
  },
  "preto-via-lactea": {
    eyebrow: "Granito preto com movimento natural para projetos de alto impacto",
    intro:
      "O Granito Preto Via Láctea é uma excelente escolha para quem quer a força de um granito preto com mais desenho natural e personalidade visual. Ele cria bancadas e ilhas marcantes, sem perder a segurança do uso diário.",
    technical:
      "Em termos técnicos, é um granito natural resistente, indicado para cozinhas, ilhas, bancadas e áreas gourmet. A presença de movimento natural na superfície ajuda a construir uma leitura mais orgânica e autoral.",
    practical:
      "Na prática, ele combina muito bem com cozinhas contemporâneas, ambientes com madeira, metais pretos ou escovados e projetos que pedem presença sem parecer excessivamente homogêneos.",
    value:
      "É uma escolha que agrega valor porque une resistência, identidade visual e uma estética mais sofisticada para quem quer fugir do preto totalmente liso.",
    indicationTitle: "Cozinhas, ilhas e áreas gourmet com personalidade",
    indicationText: "Excelente para quem quer granito preto resistente com mais desenho e presença natural.",
    benefitTitle: "Impacto visual com rotina tranquila",
    benefitText: "Entrega força estética, identidade e excelente desempenho para uso intenso.",
    executionTitle: "Paginação valoriza o desenho natural",
    executionText: "No Via Láctea, estudar a direção do movimento e posicionar bem as emendas é o que transforma a pedra em destaque real do ambiente.",
    seoDescription: "Granito Preto Via Láctea em São Paulo para cozinhas, ilhas e áreas gourmet sob medida. Granito natural preto, sofisticado e resistente para projetos premium.",
  },
  "branco-itaunas": {
    eyebrow: "Granito claro para cozinhas luminosas e projetos práticos",
    intro:
      "O Granito Branco Itaúnas é muito procurado por quem quer uma cozinha clara, acolhedora e funcional. É uma pedra que amplia a percepção de luz e combina muito bem com ambientes residenciais de uso intenso.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas de cozinha, ilhas, áreas gourmet e lavatórios, com bom desempenho estrutural e excelente relação entre resistência, versatilidade e estética clara.",
    practical:
      "Na prática, ele ajuda a deixar o ambiente mais leve, conversa bem com marcenaria branca, bege, madeira e tons neutros, e funciona muito bem para quem quer claridade sem abrir mão da confiança de um granito.",
    value:
      "É uma escolha que vale a pena porque combina sensação de amplitude, facilidade de composição e a segurança de um material natural muito aceito em projetos residenciais.",
    indicationTitle: "Cozinhas claras, ilhas e áreas gourmet acolhedoras",
    indicationText: "Ideal para quem quer luz, praticidade e uma bancada de granito clara com boa performance.",
    benefitTitle: "Claridade com resistência",
    benefitText: "Ajuda a iluminar o ambiente e entrega a robustez esperada para uso diário.",
    executionTitle: "Detalhe bem resolvido evita leitura comum",
    executionText: "No Branco Itaúnas, borda, recorte e paginação são essenciais para que o projeto fique sofisticado e não pareça apenas mais uma cozinha clara.",
    seoDescription: "Granito Branco Itaúnas em São Paulo para cozinhas, bancadas, ilhas e áreas gourmet sob medida. Granito natural claro, resistente e ideal para projetos funcionais.",
  },
  "branco-dallas": {
    eyebrow: "Granito claro versátil para cozinhas elegantes e uso diário",
    intro:
      "O Granito Branco Dallas é uma opção muito equilibrada para quem quer uma pedra clara, versátil e confiável para cozinhas, ilhas e áreas gourmet. Ele combina luminosidade com leitura prática para a rotina.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas de uso intenso, com boa resistência e um padrão visual que favorece diferentes estilos de projeto.",
    practical:
      "Na prática, ele ajuda a compor cozinhas claras, aconchegantes e fáceis de harmonizar com madeira, off-white, cinzas suaves e metais escovados.",
    value:
      "É uma escolha inteligente para quem quer equilíbrio entre beleza, funcionalidade e uma aparência acolhedora que permanece atual por muito tempo.",
    indicationTitle: "Cozinhas residenciais, ilhas e áreas gourmet",
    indicationText: "Ótimo para quem quer granito claro, versátil e seguro para o dia a dia.",
    benefitTitle: "Versatilidade que facilita o projeto",
    benefitText: "Combina com vários estilos e ajuda a construir ambientes claros e agradáveis.",
    executionTitle: "Borda e emenda fazem diferença no resultado",
    executionText: "No Branco Dallas, acabamento premium é o que separa uma bancada comum de uma peça mais elegante e bem resolvida.",
    seoDescription: "Granito Branco Dallas em São Paulo para bancadas, cozinhas, ilhas e áreas gourmet sob medida. Granito natural claro, versátil e resistente para rotina diária.",
  },
  "verde-ubatuba": {
    eyebrow: "Granito escuro e resistente para cozinhas práticas e duráveis",
    intro:
      "O Granito Verde Ubatuba é uma escolha clássica para quem quer uma bancada resistente, de baixa manutenção visual e muito funcional para cozinhas e áreas de uso intenso.",
    technical:
      "Em termos técnicos, é um granito natural de excelente desempenho, indicado para bancadas, áreas gourmet e cozinhas que pedem resistência e boa estabilidade no longo prazo.",
    practical:
      "Na prática, ele disfarça melhor pequenos sinais do dia a dia, conversa bem com ambientes contemporâneos e continua sendo uma opção muito segura para quem prioriza durabilidade com estética sóbria.",
    value:
      "É um investimento consistente porque entrega confiança de uso, presença elegante e longa vida útil com baixa complexidade de manutenção.",
    indicationTitle: "Cozinhas, bancadas e áreas gourmet de alta rotina",
    indicationText: "Perfeito para quem quer uma pedra escura, robusta e muito confiável para o uso real.",
    benefitTitle: "Tranquilidade no dia a dia",
    benefitText: "Ajuda a manter a bancada bonita e funcional mesmo em rotinas mais intensas.",
    executionTitle: "Acabamento certo renova um clássico",
    executionText: "No Verde Ubatuba, a diferença está em fugir do visual básico por meio de bordas, paginação e instalação de nível premium.",
    seoDescription: "Granito Verde Ubatuba em São Paulo para cozinhas, bancadas e áreas gourmet sob medida. Granito natural resistente, funcional e ideal para rotina intensa.",
  },
  "branco-fortaleza": {
    eyebrow: "Granito claro para cozinhas luminosas, funcionais e acolhedoras",
    intro:
      "O Granito Branco Fortaleza é uma excelente opção para quem quer uma cozinha clara, leve e muito prática para o dia a dia. Ele ajuda a ampliar a percepção de luz e combina bem com projetos que pedem sensação de limpeza visual e funcionalidade.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas, cozinhas, ilhas e áreas gourmet, com boa resistência mecânica e desempenho confiável para aplicações de uso intenso.",
    practical:
      "Na prática, ele funciona muito bem com marcenaria branca, amadeirada, cinza-clara e tons neutros, ajudando a construir um ambiente mais aberto, agradável e fácil de compor.",
    value:
      "É uma escolha que vale a pena porque une claridade, versatilidade e a confiança de um material natural resistente, mantendo o ambiente bonito e funcional ao longo do tempo.",
    indicationTitle: "Cozinhas claras, bancadas e ilhas residenciais",
    indicationText: "Ideal para quem quer um granito claro, versátil e confiável para o uso diário.",
    benefitTitle: "Ambiente mais leve e funcional",
    benefitText: "Ajuda a valorizar a luz do espaço e entrega a segurança prática que se espera de uma bancada de granito.",
    executionTitle: "Detalhes definem a elegância do claro",
    executionText: "No Branco Fortaleza, borda, paginação e recortes bem resolvidos evitam que o resultado fique comum e elevam muito a percepção final.",
    seoDescription: "Granito Branco Fortaleza em São Paulo para cozinhas, bancadas, ilhas e áreas gourmet sob medida. Granito natural claro, resistente e versátil para rotina diária.",
  },
  "santa-cecilia": {
    eyebrow: "Granito versátil para cozinhas acolhedoras e de rotina real",
    intro:
      "O Granito Santa Cecília é muito procurado por quem quer unir praticidade, calor visual e boa aceitação estética em cozinhas, bancadas e áreas gourmet. É um material que funciona muito bem em projetos residenciais e conversa com vários estilos.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas de uso intenso, com resistência compatível com cozinhas e áreas de preparo, além de boa versatilidade em diferentes composições de projeto.",
    practical:
      "Na prática, ele ajuda a suavizar a percepção de sujeira do uso cotidiano, combina com madeira, bege, off-white e tons terrosos, e cria uma leitura mais acolhedora no ambiente.",
    value:
      "É uma escolha inteligente porque entrega funcionalidade, versatilidade estética e uma aparência confortável para quem quer uma cozinha bonita e fácil de viver.",
    indicationTitle: "Cozinhas, bancadas e áreas gourmet residenciais",
    indicationText: "Excelente para quem busca um granito funcional, agradável visualmente e muito fácil de compor.",
    benefitTitle: "Equilíbrio entre beleza e praticidade",
    benefitText: "Ajuda a criar cozinhas mais acolhedoras e funcionais, com ótima convivência com a rotina diária.",
    executionTitle: "O acabamento define se ele parece comum ou premium",
    executionText: "No Santa Cecília, a diferença está em bordas bem executadas, recortes limpos e instalação cuidadosa para valorizar o conjunto.",
    seoDescription: "Granito Santa Cecília em São Paulo para cozinhas, bancadas e áreas gourmet sob medida. Granito natural versátil, resistente e ideal para rotina residencial.",
  },
  "capao-bonito": {
    eyebrow: "Granito mesclado para cozinhas práticas, quentes e elegantes",
    intro:
      "O Granito Capão Bonito é uma ótima escolha para quem quer uma pedra natural com aparência acolhedora, boa leitura de movimento e excelente adaptação à rotina da cozinha. Ele combina praticidade com presença mais orgânica.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas, cozinhas, áreas gourmet e superfícies sob medida, valorizado pela resistência e pela boa performance em aplicações de uso frequente.",
    practical:
      "Na prática, ele tende a lidar muito bem com o dia a dia, ajuda a disfarçar mais a dinâmica real da cozinha e combina com marcenaria clara, amadeirada, cinza e tons quentes.",
    value:
      "É um material que vale a pena porque une robustez, estética confortável e uma sensação de projeto mais natural e bem resolvido para o uso contínuo.",
    indicationTitle: "Cozinhas residenciais, bancadas e áreas gourmet",
    indicationText: "Ideal para quem quer granito resistente com leitura visual acolhedora e prática.",
    benefitTitle: "Rotina mais leve visualmente",
    benefitText: "O movimento natural do material ajuda a manter uma aparência agradável mesmo no uso intenso.",
    executionTitle: "O desenho natural precisa ser bem aproveitado",
    executionText: "No Capão Bonito, paginação, bordas e transições bem resolvidas ajudam o material a parecer mais sofisticado e menos comum.",
    seoDescription: "Granito Capão Bonito em São Paulo para cozinhas, bancadas e áreas gourmet sob medida. Granito natural resistente, acolhedor e ideal para o dia a dia.",
  },
  "siena": {
    eyebrow: "Granito de tonalidade quente para cozinhas acolhedoras e duráveis",
    intro:
      "O Granito Siena é indicado para quem quer uma bancada com sensação mais calorosa, confortável e muito funcional. Ele valoriza ambientes que pedem acolhimento, praticidade e uma leitura natural da pedra.",
    technical:
      "Em termos técnicos, é um granito natural adequado para bancadas de cozinha, áreas gourmet e superfícies de uso intenso, com resistência e durabilidade compatíveis com a rotina real.",
    practical:
      "Na prática, ele conversa muito bem com madeira, bege, off-white, greige e projetos que buscam uma estética mais calorosa e menos fria, sem perder segurança no uso.",
    value:
      "É uma escolha que agrega valor porque equilibra uso diário, acolhimento visual e uma estética natural que continua agradável e relevante com o tempo.",
    indicationTitle: "Cozinhas, bancadas e áreas gourmet com tons quentes",
    indicationText: "Perfeito para quem quer uma pedra funcional com estética acolhedora e natural.",
    benefitTitle: "Calor visual com segurança de uso",
    benefitText: "Traz mais conforto visual ao ambiente sem abrir mão da robustez esperada para a rotina.",
    executionTitle: "A execução valoriza o tom e o movimento",
    executionText: "No Siena, bordas, paginação e instalação refinada ajudam a revelar o melhor da pedra e elevar a percepção final do ambiente.",
    seoDescription: "Granito Siena em São Paulo para cozinhas, bancadas e áreas gourmet sob medida. Granito natural de tonalidade quente, resistente e versátil para projetos residenciais.",
  },
  "branco-ceara-polar": {
    eyebrow: "Granito branco para projetos claros, elegantes e de uso diário",
    intro:
      "O Granito Branco Ceará Polar é procurado por quem deseja uma bancada clara com presença sofisticada e excelente adaptação à rotina. Ele ajuda a valorizar luz, sensação de amplitude e leitura premium no projeto.",
    technical:
      "Em termos técnicos, é um granito natural indicado para bancadas, ilhas e cozinhas sob medida, reunindo resistência, estabilidade e desempenho confiável para uso frequente.",
    practical:
      "Na prática, funciona muito bem em cozinhas contemporâneas, com marcenaria clara, amadeirada ou contrastes mais escuros, criando uma atmosfera mais leve e refinada.",
    value:
      "É uma escolha de valor porque une claridade, sofisticação e a segurança de uma pedra natural preparada para a rotina real do ambiente.",
    indicationTitle: "Cozinhas claras, ilhas e bancadas premium",
    indicationText: "Excelente para quem quer granito branco com visual refinado e bom desempenho no dia a dia.",
    benefitTitle: "Ampla sensação de luz e elegância",
    benefitText: "Ajuda o ambiente a parecer maior, mais claro e mais sofisticado sem perder funcionalidade.",
    executionTitle: "Acabamento certo destaca ainda mais o branco",
    executionText: "No Branco Ceará Polar, a qualidade da execução é o que garante um resultado limpo, elegante e coerente com projetos de alto padrão.",
    seoDescription: "Granito Branco Ceará Polar em São Paulo para bancadas, ilhas e cozinhas sob medida. Granito natural branco, resistente e sofisticado para projetos claros e premium.",
  },
};

function getQuartzitoMaterialCopy(item: CatalogItem | null): QuartzitoMaterialCopy {
  if (!item) {
    return {
      intro: "Quartzito premium para quem quer unir força visual, desenho natural e excelente desempenho em cozinhas, ilhas, bancadas, painéis e projetos de alto padrão.",
      technical: "Em termos técnicos, o quartzito é uma rocha metamórfica formada pela recristalização do quartzo sob alta pressão e temperatura, o que gera alta dureza, boa estabilidade e um desempenho muito valorizado em superfícies que pedem beleza e resistência.",
      practical: "Na prática, ele entrega mais segurança para a rotina do que materiais mais sensíveis, ao mesmo tempo em que mantém a exclusividade visual e a riqueza de desenho que só uma pedra natural oferece.",
      value: "É uma decisão que agrega valor ao projeto porque combina presença, autenticidade e um resultado final que transmite sofisticação, critério e permanência.",
      indicationTitle: "Cozinhas, ilhas, bancadas e painéis",
      indicationText: "Excelente para projetos que exigem estética premium, personalidade e desempenho real para o dia a dia.",
      benefitTitle: "Beleza natural com confiança",
      benefitText: "O quartzito une visual autoral, sensação de alto padrão e mais tranquilidade para aplicações exigentes.",
      executionTitle: "Chapa, paginação e acabamento",
      executionText: "No quartzito, o valor final aparece quando a escolha da chapa, a direção do veio e a execução trabalham juntas para criar um resultado limpo e memorável.",
    };
  }

  return QUARTZITO_MATERIAL_COPY[normalizeQuartzitoSlug(item.name)] || {
    intro: `${item.name} é um quartzito premium indicado para quem quer transformar cozinha, ilha, bancada, painel ou área gourmet em um ponto de destaque do projeto, com desenho natural, identidade própria e forte valorização estética do ambiente.`,
    technical: `Em termos técnicos, ${item.name} reúne as características do quartzito natural: alta dureza, estrutura mineral rica em quartzo e excelente desempenho para aplicações que pedem uma pedra natural resistente para bancada, ilha, cozinha e superfícies sob medida.`,
    practical: `Na prática, ele combina presença visual com confiança de uso, criando um projeto mais sofisticado, mais autoral e mais seguro para a rotina do que materiais mais sensíveis.`,
    value: `${item.name} agrega valor porque transforma a pedra em assinatura visual do ambiente, reforçando exclusividade, acabamento premium e a percepção de um projeto bem pensado em todos os detalhes.`,
    indicationTitle: "Cozinhas, ilhas, bancadas e painéis",
    indicationText: "Excelente para quem busca uma pedra natural de alto padrão, com personalidade e desempenho para aplicações de destaque.",
    benefitTitle: "Presença com segurança",
    benefitText: "Entrega visual premium, desenho exclusivo e uma experiência de uso mais tranquila para quem quer beleza sem abrir mão de performance.",
    executionTitle: "O resultado depende do conjunto",
    executionText: "No quartzito, escolher a chapa certa e trabalhar bem paginação, emendas, bordas e instalação é o que transforma o material em peça realmente memorável.",
  };
}

function getGranitoMaterialCopy(item: CatalogItem | null): GranitoMaterialCopy {
  if (!item) {
    return {
      intro: "Granito premium para quem quer unir resistência real, estética consistente e excelente desempenho em cozinhas, ilhas, bancadas e áreas gourmet.",
      technical: "Em termos técnicos, o granito é uma rocha magmática de alta dureza, muito valorizada pela resistência mecânica, pela estabilidade e pela excelente performance em superfícies de uso intenso.",
      practical: "Na prática, ele entrega muito mais tranquilidade para a rotina, boa durabilidade e uma estética que pode ir do clássico ao contemporâneo com enorme segurança de uso.",
      value: "É uma escolha que agrega valor porque combina funcionalidade, confiança e acabamento premium, criando um ambiente bonito, sólido e pensado para durar.",
      indicationTitle: "Cozinhas, ilhas, bancadas e áreas gourmet",
      indicationText: "Excelente para projetos que exigem resistência, praticidade e um acabamento bem resolvido.",
      benefitTitle: "Resistência com tranquilidade",
      benefitText: "O granito entrega segurança para a rotina real sem abrir mão de presença visual e sofisticação.",
      executionTitle: "Borda, recorte e instalação fazem diferença",
      executionText: "No granito, a percepção final de alto padrão aparece quando paginação, emendas, bordas e nivelamento são tratados com precisão.",
    };
  }

  return GRANITO_MATERIAL_COPY[normalizeGranitoSlug(item.name)] || {
    intro: `${item.name} é um granito natural indicado para quem quer unir resistência, estabilidade visual e excelente desempenho em cozinhas, bancadas, ilhas e áreas gourmet sob medida.`,
    technical: `Em termos técnicos, ${item.name} reúne as características mais valorizadas do granito natural: alta dureza, boa resistência para uso intenso e comportamento confiável em aplicações que pedem uma pedra sólida para o dia a dia.`,
    practical: `Na prática, ele oferece mais tranquilidade de uso, composição versátil com a marcenaria e uma presença visual que ajuda o ambiente a parecer mais resolvido e duradouro.`,
    value: `${item.name} agrega valor porque combina desempenho real, estética consistente e a percepção de um projeto pensado para durar e continuar bonito ao longo dos anos.`,
    indicationTitle: "Cozinhas, bancadas, ilhas e áreas gourmet",
    indicationText: "Excelente para quem busca um material natural resistente, versátil e confiável para uso diário.",
    benefitTitle: "Praticidade com presença",
    benefitText: "Entrega segurança para a rotina e um resultado visual mais sólido e elegante.",
    executionTitle: "Acabamento é o que define o nível do resultado",
    executionText: "No granito, borda, recortes, emendas e instalação bem executados são o que transformam uma bancada funcional em uma peça realmente premium.",
  };
}

const MARMORE_MATERIAL_COPY: Record<string, MarmoreMaterialCopy> = {
  "branco-parana": {
    eyebrow: "Mármore brasileiro claro para projetos elegantes, luminosos e atemporais",
    intro:
      "O Mármore Branco Paraná é muito procurado por quem quer um material natural claro, sofisticado e com leitura leve para lavabos, banheiros, painéis e ambientes de alto padrão. Ele ajuda o espaço a parecer mais claro, mais refinado e mais silencioso visualmente.",
    technical:
      "Em termos técnicos, é um mármore natural indicado principalmente para aplicações internas, onde o objetivo é valorizar desenho, luz e acabamento. Como outros mármores, pede especificação correta conforme o uso e atenção aos cuidados compatíveis com pedras carbonáticas.",
    practical:
      "Na prática, ele entrega um resultado muito elegante em lavatórios, banheiros, painéis, nichos, lareiras e paredes de destaque. Funciona muito bem com metais dourados, pretos ou cromados e conversa com marcenaria clara, amadeirada ou mais contemporânea.",
    value:
      "É um investimento que vale a pena porque transforma o ambiente em algo mais nobre, mais leve e mais memorável. O Branco Paraná carrega uma sensação de sofisticação natural que dificilmente passa despercebida quando a execução está bem resolvida.",
    indicationTitle: "Lavabos, banheiros, painéis e interiores premium",
    indicationText: "Ideal para quem quer um mármore claro com presença elegante e estética atemporal em áreas internas de destaque.",
    benefitTitle: "Luz, delicadeza e assinatura visual",
    benefitText: "Ajuda a criar espaços mais claros, sofisticados e visualmente valiosos, com forte percepção de alto padrão.",
    executionTitle: "O refinamento aparece no detalhe",
    executionText: "No Branco Paraná, paginação, recortes, encontros e bordas bem executadas são o que transformam uma chapa bonita em um resultado realmente premium.",
    seoDescription: "Mármore Branco Paraná em São Paulo para lavabos, banheiros, painéis e interiores de alto padrão. Mármore natural claro, sofisticado e ideal para projetos internos premium.",
  },
  carrara: {
    eyebrow: "Mármore clássico para banheiros, lavabos e painéis com estética internacional",
    intro:
      "O Mármore Carrara é um dos materiais mais desejados quando o objetivo é transmitir elegância clássica, referência de design e uma estética que atravessa o tempo. Ele é muito valorizado em lavabos, banheiros, painéis e superfícies internas onde a beleza da pedra é protagonista.",
    technical:
      "Em termos técnicos, o Carrara é um mármore natural de uso interno, escolhido especialmente pelo desenho de seus veios e pela leitura sofisticada da superfície. Como mármore, deve ser especificado com critério para aplicações adequadas e com orientação de uso compatível com sua natureza.",
    practical:
      "Na prática, ele cria ambientes com forte apelo estético e sensação imediata de projeto autoral. Funciona muito bem em banheiros, lavatórios, paredes de destaque, lareiras e tampos decorativos, principalmente quando combinado com marcenaria delicada e iluminação bem trabalhada.",
    value:
      "É um investimento que vale a pena porque carrega uma referência estética que o mercado reconhece imediatamente. O Carrara eleva a percepção do ambiente, reforça elegância e transforma a pedra em elemento central da arquitetura.",
    indicationTitle: "Banheiros, lavabos, painéis e lareiras internas",
    indicationText: "Perfeito para quem quer um mármore clássico, reconhecido e de forte valor estético para interiores.",
    benefitTitle: "Beleza clássica com prestígio visual",
    benefitText: "Entrega uma assinatura estética imediatamente associada a sofisticação, tradição e bom gosto em projetos premium.",
    executionTitle: "A paginação é o que faz parecer obra autoral",
    executionText: "No Carrara, a escolha do veio, das emendas e da direção da pedra muda completamente a percepção final do projeto e valoriza muito mais o resultado.",
    seoDescription: "Mármore Carrara em São Paulo para lavabos, banheiros, lareiras e painéis sob medida. Mármore natural clássico e sofisticado para interiores de alto padrão.",
  },
  "carrara-gioia": {
    eyebrow: "Mármore claro para projetos internos sofisticados e cheios de leveza",
    intro:
      "O Mármore Carrara Gioia é uma leitura mais refinada do universo dos mármores claros, muito procurado por quem deseja um ambiente elegante, leve e com veios sutis para banheiros, lavabos, painéis e revestimentos internos.",
    technical:
      "Em termos técnicos, trata-se de um mármore natural indicado para aplicações internas de destaque, onde o desenho do material e a qualidade do acabamento são determinantes para a percepção final do projeto.",
    practical:
      "Na prática, ele ajuda a construir interiores claros, acolhedores e sofisticados, funcionando muito bem com paletas neutras, metais delicados e projetos que pedem uma elegância mais serena do que ostensiva.",
    value:
      "É uma escolha que agrega valor porque transmite sutileza, critério e acabamento de alto padrão, reforçando a sensação de um ambiente pensado com mais cuidado em cada detalhe.",
    indicationTitle: "Lavabos, banheiros e painéis claros",
    indicationText: "Excelente para quem quer um mármore claro, refinado e com leitura elegante para interiores autorais.",
    benefitTitle: "Sutileza que valoriza o ambiente",
    benefitText: "Ajuda o espaço a parecer mais leve, refinado e coerente com uma estética premium e bem resolvida.",
    executionTitle: "Quanto mais limpo o desenho, maior a exigência da execução",
    executionText: "No Carrara Gioia, recortes, encontros e paginação precisam ser muito bem resolvidos para manter a leveza e a sofisticação visual da pedra.",
    seoDescription: "Mármore Carrara Gioia em São Paulo para banheiros, lavabos e painéis internos sob medida. Mármore natural claro e sofisticado para projetos premium.",
  },
  "nero-marquina": {
    eyebrow: "Mármore preto para interiores de impacto, contraste e presença sofisticada",
    intro:
      "O Mármore Nero Marquina é a escolha de quem quer um ambiente marcante, elegante e visualmente memorável. Seu fundo preto profundo com veios claros cria contraste forte e transforma lavabos, painéis, lareiras e paredes em pontos centrais do projeto.",
    technical:
      "Em termos técnicos, é um mármore natural indicado para uso interno, especialmente em aplicações decorativas e superfícies de destaque em que a força estética do material é parte essencial da composição arquitetônica.",
    practical:
      "Na prática, ele funciona muito bem em lavabos, painéis, paredes de destaque, lareiras e tampos internos, principalmente quando a proposta do ambiente pede sofisticação, dramaticidade controlada e leitura de alto padrão.",
    value:
      "É um investimento que vale a pena porque transforma o ambiente em algo muito mais autoral, expressivo e premium. O Nero Marquina é daquelas pedras que fazem o espaço parecer assinado e não apenas decorado.",
    indicationTitle: "Lavabos, painéis, lareiras e interiores de destaque",
    indicationText: "Ideal para projetos que buscam contraste, elegância e protagonismo visual em ambientes internos.",
    benefitTitle: "Presença que eleva o nível do ambiente",
    benefitText: "Cria impacto visual imediato e reforça a sensação de sofisticação com identidade forte e memorável.",
    executionTitle: "No escuro, o detalhe malfeito aparece mais",
    executionText: "No Nero Marquina, precisão de corte, borda e paginação são fundamentais para que o resultado pareça realmente nobre e não apenas chamativo.",
    seoDescription: "Mármore Nero Marquina em São Paulo para lavabos, painéis, lareiras e interiores de destaque. Mármore preto sofisticado para projetos premium sob medida.",
  },
  "crema-marfil": {
    eyebrow: "Mármore bege para interiores acolhedores, elegantes e atemporais",
    intro:
      "O Mármore Crema Marfil é muito valorizado por quem quer um ambiente mais acolhedor, sofisticado e atemporal. Seu tom bege claro cria uma atmosfera elegante, confortável e muito fácil de harmonizar em banheiros, lavabos, painéis e revestimentos internos.",
    technical:
      "Em termos técnicos, é um mármore natural indicado para aplicações internas onde o objetivo é valorizar o acabamento, a textura e a sensação de conforto visual do projeto.",
    practical:
      "Na prática, ele funciona muito bem em lavatórios, banheiros, pisos internos, paredes e painéis, especialmente em composições com madeira, metais dourados, off-white e paletas quentes ou neutras.",
    value:
      "É uma escolha que agrega valor porque cria ambientes mais acolhedores e sofisticados, com uma linguagem visual elegante que continua atual e relevante com o passar do tempo.",
    indicationTitle: "Banheiros, lavabos, pisos internos e painéis",
    indicationText: "Excelente para quem busca um mármore bege refinado, versátil e muito elegante para interiores premium.",
    benefitTitle: "Conforto visual com sofisticação",
    benefitText: "Entrega sensação de acolhimento, equilíbrio e elegância, sem pesar visualmente o ambiente.",
    executionTitle: "A leveza depende de acabamento limpo",
    executionText: "No Crema Marfil, paginação, borda e continuidade bem resolvidas ajudam a manter o projeto leve, elegante e visualmente muito mais valioso.",
    seoDescription: "Mármore Crema Marfil em São Paulo para banheiros, lavabos, painéis e interiores sob medida. Mármore bege elegante e atemporal para projetos premium.",
  },
  "estatuario-venato": {
    eyebrow: "Mármore branco de luxo para interiores sofisticados e autorais",
    intro:
      "O Mármore Estatuário Venato é uma pedra natural para quem quer um interior com forte leitura de luxo, desenho marcante e uma presença visual muito valorizada em banheiros, lavabos, painéis e superfícies de destaque.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno, escolhido especialmente por seu desenho expressivo, contraste de veios e impacto visual em composições de alto padrão.",
    practical:
      "Na prática, ele transforma ambientes internos em espaços muito mais exclusivos e fotogênicos, funcionando muito bem em lavabos, banheiros, lareiras, painéis e paredes com iluminação valorizando o movimento da pedra.",
    value:
      "É um investimento que vale a pena porque entrega uma percepção imediata de sofisticação e projeto de alto nível. O Estatuário Venato não apenas compõe o ambiente — ele o valoriza e o assina visualmente.",
    indicationTitle: "Lavabos, banheiros, painéis e lareiras premium",
    indicationText: "Ideal para quem quer um mármore branco expressivo e realmente protagonista em interiores de alto padrão.",
    benefitTitle: "Impacto visual com linguagem de luxo",
    benefitText: "Eleva a percepção do espaço e ajuda o ambiente a parecer mais sofisticado, exclusivo e memorável.",
    executionTitle: "Veio forte exige projeto forte",
    executionText: "No Estatuário Venato, a paginação certa é o que transforma o desenho da pedra em um diferencial visual de verdade e não apenas em uma superfície bonita.",
    seoDescription: "Mármore Estatuário Venato em São Paulo para lavabos, banheiros, lareiras e painéis sob medida. Mármore branco de luxo para interiores premium.",
  },
  "calacatta-macchiaoro-extra": {
    eyebrow: "Mármore branco com veios dourados para interiores de luxo e assinatura visual forte",
    intro:
      "O Mármore Calacatta Macchiaoro Extra é procurado por quem deseja um interior com forte leitura de luxo, desenho nobre e uma presença visual que valoriza imediatamente lavabos, banheiros, painéis e áreas internas de destaque.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno, valorizado pelo contraste entre fundo claro e veios quentes, o que o torna uma escolha muito forte para superfícies que pedem protagonismo e alto valor estético.",
    practical:
      "Na prática, ele funciona muito bem em lavabos, banheiros, painéis, paredes de destaque e lareiras, especialmente quando o objetivo é criar um ambiente elegante, marcante e visualmente sofisticado desde o primeiro olhar.",
    value:
      "É um investimento que vale a pena porque transforma a pedra em um elemento de prestígio dentro do projeto, reforçando exclusividade, sofisticação e sensação de acabamento realmente premium.",
    indicationTitle: "Lavabos, banheiros, painéis e lareiras de alto padrão",
    indicationText: "Ideal para projetos que pedem uma pedra clara com presença nobre, veios expressivos e forte impacto visual em interiores.",
    benefitTitle: "Luxo visível e ambiente memorável",
    benefitText: "Ajuda o espaço a parecer mais valioso, mais autoral e muito mais refinado, com percepção imediata de projeto premium.",
    executionTitle: "Veios nobres pedem paginação impecável",
    executionText: "No Calacatta Macchiaoro Extra, a leitura do veio, as emendas e a direção da pedra são decisivas para transformar a superfície em um verdadeiro ponto focal do ambiente.",
    seoDescription: "Mármore Calacatta Macchiaoro Extra em São Paulo para lavabos, banheiros, painéis e lareiras sob medida. Mármore branco com veios dourados para interiores de luxo.",
  },
  "calacatta-arabescato": {
    eyebrow: "Mármore branco de desenho sofisticado para interiores claros e muito valorizados",
    intro:
      "O Mármore Calacatta Arabescato é escolhido por quem quer um ambiente claro, sofisticado e com desenho de veios marcante, sem abrir mão de uma leitura elegante e refinada em banheiros, lavabos, painéis e interiores de destaque.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno, valorizado pela expressividade do veio e pelo equilíbrio entre fundo claro e movimento visual, o que o torna muito desejado em projetos de padrão elevado.",
    practical:
      "Na prática, ele ajuda o ambiente a parecer mais luminoso, mais sofisticado e mais autoral, funcionando muito bem em superfícies onde a pedra deve participar ativamente da identidade visual do projeto.",
    value:
      "É um investimento que vale a pena porque cria uma percepção imediata de luxo e cuidado estético, reforçando a sensação de um ambiente desenhado com mais critério e mais valor percebido.",
    indicationTitle: "Lavabos, banheiros, painéis e revestimentos internos",
    indicationText: "Excelente para quem quer uma pedra clara e nobre, com forte desenho natural e grande capacidade de valorização estética.",
    benefitTitle: "Clareza com personalidade",
    benefitText: "Entrega luminosidade, elegância e desenho marcante, sem perder a sensação de sofisticação silenciosa que define interiores premium.",
    executionTitle: "O desenho precisa ser conduzido com intenção",
    executionText: "No Calacatta Arabescato, paginação, sentido do veio e encontros bem planejados são fundamentais para extrair o máximo da beleza natural da pedra.",
    seoDescription: "Mármore Calacatta Arabescato em São Paulo para lavabos, banheiros, painéis e interiores premium. Mármore branco sofisticado com veios marcantes para projetos de alto padrão.",
  },
  "branco-thassos": {
    eyebrow: "Mármore branco para projetos minimalistas, luminosos e extremamente sofisticados",
    intro:
      "O Mármore Branco Thassos é procurado por quem quer uma leitura clara, limpa e altamente sofisticada em interiores, especialmente em lavabos, banheiros, painéis e composições onde a pureza visual da pedra é parte central do projeto.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno muito valorizado por sua leitura branca e pela capacidade de criar superfícies visualmente leves, elegantes e extremamente refinadas.",
    practical:
      "Na prática, ele funciona muito bem em projetos minimalistas, contemporâneos ou mais silenciosos visualmente, ajudando o ambiente a parecer maior, mais claro e mais premium sem depender de excesso de informação.",
    value:
      "É um investimento que vale a pena porque entrega exclusividade, pureza visual e uma sensação de acabamento sofisticado que transforma o espaço de maneira sutil, mas muito potente.",
    indicationTitle: "Lavabos, banheiros e painéis minimalistas",
    indicationText: "Ideal para quem busca uma pedra clara e muito refinada para interiores de linguagem mais limpa e elegante.",
    benefitTitle: "Leveza visual com alto valor percebido",
    benefitText: "Ajuda o ambiente a parecer mais amplo, mais luminoso e mais sofisticado, com uma estética serena e de alto padrão.",
    executionTitle: "No branco, o acabamento precisa ser impecável",
    executionText: "No Branco Thassos, qualquer desnível ou encontro mal resolvido aparece com mais força, por isso o resultado premium depende muito da qualidade da execução.",
    seoDescription: "Mármore Branco Thassos em São Paulo para lavabos, banheiros e painéis sob medida. Mármore branco sofisticado para interiores minimalistas e premium.",
  },
  "branco-pigues": {
    eyebrow: "Mármore branco elegante para interiores claros, sofisticados e atemporais",
    intro:
      "O Mármore Branco Pigues é uma escolha muito interessante para quem quer um interior claro, refinado e com desenho natural delicado, criando ambientes mais elegantes e valorizados em lavabos, banheiros e painéis.",
    technical:
      "Em termos técnicos, é um mármore natural indicado para aplicações internas em que a pedra deve contribuir para uma leitura clara, suave e visualmente sofisticada do projeto.",
    practical:
      "Na prática, ele ajuda a compor espaços com linguagem mais leve e equilibrada, funcionando muito bem com marcenaria clara, metais delicados e iluminação que favorece a textura natural da pedra.",
    value:
      "É um investimento que vale a pena porque amplia a percepção de elegância do ambiente sem exagero, entregando um resultado muito refinado e fácil de harmonizar em projetos premium.",
    indicationTitle: "Lavabos, banheiros e painéis claros",
    indicationText: "Excelente para quem busca um mármore branco com sofisticação suave e presença elegante em ambientes internos.",
    benefitTitle: "Elegância leve e versátil",
    benefitText: "Valoriza o ambiente com clareza, delicadeza e uma estética atemporal que conversa com diferentes estilos de projeto.",
    executionTitle: "Sutileza também exige precisão",
    executionText: "No Branco Pigues, acabamento limpo, paginação bem resolvida e bordas coerentes são o que mantêm a leveza e a sofisticação da pedra no resultado final.",
    seoDescription: "Mármore Branco Pigues em São Paulo para lavabos, banheiros e painéis sob medida. Mármore branco elegante para interiores claros e sofisticados.",
  },
  "marrom-imperador": {
    eyebrow: "Mármore marrom para interiores quentes, sofisticados e de forte presença visual",
    intro:
      "O Mármore Marrom Imperador é ideal para quem quer um ambiente com mais profundidade, elegância e sensação de conforto visual. Ele é muito valorizado em lavabos, banheiros, painéis e lareiras onde a pedra precisa transmitir sofisticação com identidade forte.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno, reconhecido por sua coloração intensa e pelos veios que reforçam movimento, profundidade e leitura de acabamento premium em superfícies de destaque.",
    practical:
      "Na prática, ele ajuda a criar interiores mais acolhedores, mais nobres e visualmente impactantes, funcionando muito bem com madeira escura, iluminação quente, metais dourados ou preto fosco.",
    value:
      "É um investimento que vale a pena porque transforma o ambiente em algo mais envolvente, sofisticado e memorável, reforçando uma estética de alto padrão com personalidade.",
    indicationTitle: "Lavabos, banheiros, lareiras e painéis marcantes",
    indicationText: "Ideal para projetos que pedem uma pedra com mais profundidade visual, calor e presença sofisticada.",
    benefitTitle: "Conforto visual com imponência",
    benefitText: "Cria ambientes mais acolhedores e elegantes, com uma linguagem sofisticada que transmite maturidade estética e valor.",
    executionTitle: "Escuro quente exige composição inteligente",
    executionText: "No Marrom Imperador, luz, paginação e combinação com marcenaria e metais definem se o resultado ficará apenas bonito ou realmente luxuoso.",
    seoDescription: "Mármore Marrom Imperador em São Paulo para lavabos, banheiros, lareiras e painéis sob medida. Mármore sofisticado para interiores com presença e alto valor estético.",
  },
  "bronze-armani": {
    eyebrow: "Mármore sofisticado para interiores contemporâneos, elegantes e muito valorizados",
    intro:
      "O Mármore Bronze Armani é uma escolha muito forte para quem busca um ambiente contemporâneo, sofisticado e com uma estética mais silenciosa, porém extremamente elegante, em painéis, banheiros, lavabos e superfícies internas de destaque.",
    technical:
      "Em termos técnicos, é um mármore natural de uso interno com leitura visual refinada, tons profundos e uma textura que combina muito bem com projetos contemporâneos e interiores de padrão elevado.",
    practical:
      "Na prática, ele funciona muito bem para quem quer sofisticação sem excessos, criando ambientes mais maduros, equilibrados e coerentes com arquitetura contemporânea, marcenaria escura e iluminação bem trabalhada.",
    value:
      "É um investimento que vale a pena porque entrega requinte, coerência visual e uma sensação de projeto muito mais autoral, com forte valor percebido para quem entra no ambiente.",
    indicationTitle: "Banheiros, lavabos, painéis e interiores contemporâneos",
    indicationText: "Excelente para quem quer uma pedra elegante, sofisticada e com leitura mais discreta, porém muito nobre.",
    benefitTitle: "Sofisticação madura e atemporal",
    benefitText: "Ajuda o projeto a parecer mais refinado, mais equilibrado e muito mais alinhado com uma linguagem arquitetônica premium.",
    executionTitle: "O refinamento depende da proporção certa",
    executionText: "No Bronze Armani, corte, paginação, direção do veio e combinação com os outros acabamentos fazem toda a diferença na força final do ambiente.",
    seoDescription: "Mármore Bronze Armani em São Paulo para lavabos, banheiros e painéis sob medida. Mármore sofisticado para interiores contemporâneos e premium.",
  },
};

function getMarmoreMaterialCopy(item: CatalogItem | null): MarmoreMaterialCopy {
  if (!item) {
    return {
      intro: "Mármore premium para quem quer transformar interiores em ambientes mais elegantes, autorais e memoráveis por meio de veios naturais, profundidade e acabamento refinado.",
      technical: "Em termos técnicos, o mármore é uma rocha natural muito valorizada em aplicações internas pela riqueza visual, pela sofisticação dos veios e pela capacidade de elevar a percepção estética de lavabos, banheiros, painéis, lareiras e revestimentos de destaque.",
      practical: "Na prática, ele entrega atmosfera, personalidade e sensação de projeto de alto padrão, especialmente em áreas internas onde a pedra pode ser protagonista e a beleza do material realmente aparece.",
      value: "É um investimento que vale a pena porque dá ao ambiente uma assinatura visual que poucos materiais conseguem oferecer, reforçando exclusividade, refinamento e valor percebido no conjunto final.",
      indicationTitle: "Lavabos, banheiros, painéis e interiores premium",
      indicationText: "Excelente para projetos internos em que a pedra deve criar presença, sofisticação e identidade visual.",
      benefitTitle: "Beleza que valoriza o espaço",
      benefitText: "O mármore ajuda o ambiente a parecer mais nobre, mais elegante e mais memorável.",
      executionTitle: "O luxo aparece quando o detalhe está certo",
      executionText: "No mármore, a diferença entre uma peça bonita e um resultado realmente premium está na paginação, na borda, nos encontros e na qualidade da instalação.",
    };
  }

  return MARMORE_MATERIAL_COPY[normalizeMarmoreSlug(item.name)] || {
    intro: `${item.name} é um mármore natural indicado para quem quer elevar lavabos, banheiros, painéis, lareiras e interiores de destaque com uma pedra de forte valor estético, veios elegantes e acabamento premium.`,
    technical: `Em termos técnicos, ${item.name} reúne as características que fazem do mármore um material tão valorizado em interiores: desenho natural, profundidade visual e capacidade de transformar superfícies em elementos protagonistas da arquitetura.`,
    practical: `Na prática, ele cria ambientes mais sofisticados, mais autorais e com maior percepção de cuidado, principalmente quando combinado com iluminação, paginação e materiais de apoio bem escolhidos.`,
    value: `${item.name} agrega valor porque transforma a pedra em parte da identidade do projeto, reforçando sofisticação, exclusividade e um resultado final muito mais memorável.`,
    indicationTitle: "Lavabos, banheiros, painéis e interiores de destaque",
    indicationText: "Excelente para quem busca uma pedra natural com elegância, presença e forte valor estético para ambientes internos.",
    benefitTitle: "Atmosfera premium e assinatura visual",
    benefitText: "Entrega uma sensação imediata de sofisticação e ajuda o ambiente a parecer mais elegante e valorizado.",
    executionTitle: "Mármore exige olhar e execução refinados",
    executionText: "No mármore, paginação, recortes, emendas e acabamento são decisivos para que o resultado final pareça realmente autoral e de alto padrão.",
  };
}

const SILESTONE_MATERIAL_COPY: Record<string, QuartzoEngenhariaMaterialCopy> = {
  "white-zeus": {
    eyebrow: "Silestone branco para cozinhas claras, elegantes e muito funcionais",
    intro: "Silestone White Zeus é uma escolha forte para quem busca uma bancada clara, sofisticada e visualmente limpa para cozinhas, ilhas, banheiros e lavabos de linguagem contemporânea.",
    technical: "Em termos técnicos, trata-se de um quartzo de engenharia de baixa porosidade, com superfície uniforme e excelente adaptação a projetos que pedem visual claro, leitura contínua e praticidade de manutenção.",
    practical: "Na prática, ele ajuda o ambiente a parecer maior, mais iluminado e mais organizado visualmente, combinando muito bem com madeira, laca, marcenaria clara, metais dourados, pretos ou inox.",
    value: "É um investimento que vale a pena porque entrega uma estética limpa e muito valorizada pelo mercado, com linguagem contemporânea e forte percepção de acabamento premium.",
    indicationTitle: "Cozinhas, ilhas, banheiros e lavabos contemporâneos",
    indicationText: "Ideal para quem busca quartzo branco com aparência sofisticada, uniforme e elegante para projetos claros.",
    benefitTitle: "Clareza visual e sensação de projeto resolvido",
    benefitText: "Ajuda o ambiente a parecer mais amplo, mais leve e mais sofisticado, com uma leitura de bancada muito bem acabada.",
    executionTitle: "No branco, acabamento impecável faz toda a diferença",
    executionText: "No White Zeus, recortes, encontros, bordas e paginação da bancada precisam ser muito bem executados para que o resultado fique realmente premium.",
    seoDescription: "Silestone White Zeus em São Paulo para cozinhas, ilhas, banheiros e lavabos sob medida. Quartzo branco premium com baixa porosidade e visual sofisticado.",
  },
  yukon: {
    eyebrow: "Silestone claro marmorizado para projetos contemporâneos e sofisticados",
    intro: "Silestone Yukon é uma opção muito procurada por quem quer uma bancada de quartzo clara, refinada e com leitura inspirada em pedra natural, sem perder a praticidade de uma superfície de engenharia.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, indicado para bancadas, ilhas, banheiros e lavabos em que a uniformidade do material e a facilidade de manutenção são muito valorizadas.",
    practical: "Na prática, ele ajuda a criar cozinhas mais elegantes, luminosas e equilibradas, com uma estética suave que conversa bem com projetos contemporâneos, marcenaria amadeirada ou tons neutros.",
    value: "É uma escolha que agrega valor porque oferece uma leitura mais nobre e sofisticada do quartzo, reforçando acabamento premium e uma percepção visual muito mais autoral no conjunto final.",
    indicationTitle: "Cozinhas, ilhas e bancadas claras premium",
    indicationText: "Excelente para quem quer quartzo claro com linguagem mais sofisticada e sensação de pedra natural contemporânea.",
    benefitTitle: "Sofisticação clara com rotina prática",
    benefitText: "Une a estética valorizada dos tons claros com a tranquilidade de um material pensado para o uso real do dia a dia.",
    executionTitle: "A linguagem premium aparece nos detalhes",
    executionText: "No Yukon, bordas, emendas e integração com a marcenaria são o que transformam a bancada em um elemento de valor real dentro do projeto.",
    seoDescription: "Silestone Yukon em São Paulo para bancadas, ilhas e cozinhas sob medida. Quartzo claro premium com baixa porosidade e visual sofisticado.",
  },
  "et-calacatta-gold": {
    eyebrow: "Silestone marmorizado para cozinhas premium com forte valor estético",
    intro: "Silestone Et Calacatta Gold é indicado para quem quer uma bancada de quartzo com leitura mais nobre, desenho sofisticado e forte valorização visual em cozinhas, ilhas e banheiros de alto padrão.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, desenvolvido para unir estética marmorizada, estabilidade visual e praticidade em superfícies muito usadas no dia a dia.",
    practical: "Na prática, ele entrega uma imagem de cozinha mais refinada e mais autoral, especialmente quando combinado com marcenaria clara, metais dourados, iluminação quente e bordas bem resolvidas.",
    value: "É um investimento que vale a pena porque eleva a percepção do ambiente, aproxima o visual do universo das pedras nobres e cria uma leitura de projeto mais sofisticada e valorizada.",
    indicationTitle: "Cozinhas, ilhas e banheiros de alto padrão",
    indicationText: "Ideal para quem quer quartzo marmorizado com forte apelo visual e linguagem premium.",
    benefitTitle: "Leitura de luxo com praticidade de quartzo",
    benefitText: "Cria um ambiente mais elegante e valorizado sem abrir mão da rotina prática que o quartzo proporciona.",
    executionTitle: "Desenho marmorizado pede recorte inteligente",
    executionText: "No Et Calacatta Gold, paginação visual, recortes e proporção da borda são decisivos para que o desenho do material apareça de forma realmente sofisticada.",
    seoDescription: "Silestone Et Calacatta Gold em São Paulo para cozinhas, ilhas e banheiros sob medida. Quartzo marmorizado premium com baixa porosidade e visual sofisticado.",
  },
  "miami-white": {
    eyebrow: "Silestone branco para projetos limpos, leves e muito versáteis",
    intro: "Silestone Miami White é uma excelente alternativa para quem quer uma bancada branca de leitura uniforme, limpa e elegante em cozinhas, ilhas, lavabos e banheiros contemporâneos.",
    technical: "Em termos técnicos, é um quartzo de engenharia indicado para superfícies que pedem baixa porosidade, facilidade de limpeza e visual homogêneo, muito valorizado em bancadas de uso frequente.",
    practical: "Na prática, ele ajuda o ambiente a parecer mais claro, organizado e contemporâneo, com uma presença discreta e sofisticada que funciona muito bem em composições minimalistas.",
    value: "É uma escolha que agrega valor porque reforça a sensação de projeto limpo, coerente e elegante, entregando uma estética clara que o mercado percebe como atual e premium.",
    indicationTitle: "Cozinhas, banheiros e lavabos de linguagem clean",
    indicationText: "Excelente para quem quer quartzo branco uniforme com visual contemporâneo e muita versatilidade.",
    benefitTitle: "Leveza visual com manutenção prática",
    benefitText: "Ajuda o ambiente a parecer mais leve e sofisticado, sem complicar a rotina de quem usa a bancada todos os dias.",
    executionTitle: "O uniforme valoriza ainda mais a boa execução",
    executionText: "No Miami White, qualquer desnível ou recorte mal resolvido aparece mais, por isso acabamento preciso é essencial para o resultado premium.",
    seoDescription: "Silestone Miami White em São Paulo para cozinhas, lavabos e banheiros sob medida. Quartzo branco uniforme, elegante e prático para o dia a dia.",
  },
  "et-statuario": {
    eyebrow: "Silestone marmorizado para cozinhas elegantes e projetos de presença",
    intro: "Silestone Et Statuario é indicado para quem quer uma bancada de quartzo com desenho marmorizado sofisticado, forte presença visual e excelente integração com cozinhas, ilhas e banheiros de padrão elevado.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, pensado para superfícies internas sob medida que precisam unir desenho valorizado, estabilidade visual e boa convivência com a rotina.",
    practical: "Na prática, ele entrega uma bancada que chama atenção pela elegância do desenho e pela capacidade de transformar o ambiente em algo mais autoral, refinado e memorável.",
    value: "É um investimento que vale a pena porque aproxima o projeto do universo das pedras nobres, mantendo a praticidade do quartzo e aumentando muito a percepção de valor do ambiente.",
    indicationTitle: "Cozinhas, ilhas e banheiros de leitura marmorizada premium",
    indicationText: "Ideal para quem quer quartzo com desenho sofisticado e presença visual marcante.",
    benefitTitle: "Desenho valorizado com praticidade de quartzo",
    benefitText: "Ajuda o espaço a parecer mais nobre e mais bem resolvido sem abrir mão de uma rotina prática.",
    executionTitle: "O desenho pede paginação e recorte bem pensados",
    executionText: "No Et Statuario, proporção, recorte e integração com marcenaria e metais são o que fazem o material aparecer de forma realmente premium.",
    seoDescription: "Silestone Et Statuario em São Paulo para cozinhas, ilhas e banheiros sob medida. Quartzo marmorizado premium com baixa porosidade e desenho sofisticado.",
  },
  "pearl-jasmine": {
    eyebrow: "Silestone claro marmorizado para ambientes luminosos e sofisticados",
    intro: "Silestone Pearl Jasmine é uma opção muito interessante para quem quer uma bancada clara, delicada e elegante, com desenho suave e linguagem contemporânea para cozinhas, ilhas, lavabos e banheiros.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade indicado para superfícies internas sob medida que pedem boa estabilidade visual, manutenção prática e leitura mais refinada.",
    practical: "Na prática, ele ajuda o ambiente a parecer mais leve, mais luminoso e mais acolhedor, com um desenho que adiciona sofisticação sem pesar na composição.",
    value: "É uma escolha que agrega valor porque entrega uma estética clara e elegante, muito apreciada em projetos que buscam refinamento, suavidade e sensação de ambiente bem resolvido.",
    indicationTitle: "Cozinhas, ilhas e lavabos claros com desenho suave",
    indicationText: "Excelente para quem quer quartzo claro com mais personalidade visual e linguagem sofisticada.",
    benefitTitle: "Leveza visual com desenho elegante",
    benefitText: "Cria um ambiente mais luminoso, delicado e valorizado sem perder a praticidade esperada do quartzo.",
    executionTitle: "A sutileza valoriza acabamento preciso",
    executionText: "No Pearl Jasmine, a boa execução de bordas, emendas e recortes é o que sustenta a leitura limpa e premium da bancada.",
    seoDescription: "Silestone Pearl Jasmine em São Paulo para cozinhas, ilhas, lavabos e banheiros sob medida. Quartzo claro marmorizado com baixa porosidade e visual sofisticado.",
  },
  "desert-silver": {
    eyebrow: "Silestone cinza marmorizado para projetos contemporâneos e elegantes",
    intro: "Silestone Desert Silver é indicado para quem quer uma bancada contemporânea com base clara, desenho cinza sofisticado e excelente equilíbrio entre presença visual e versatilidade.",
    technical: "Em termos técnicos, trata-se de um quartzo de engenharia de baixa porosidade desenvolvido para bancadas internas sob medida com uso frequente, mantendo estabilidade visual e boa praticidade.",
    practical: "Na prática, ele ajuda a construir cozinhas e ilhas com uma estética mais urbana e elegante, conversando muito bem com madeira, marcenaria cinza, preta ou off-white.",
    value: "É uma escolha que agrega valor porque oferece desenho valorizado, composição contemporânea e uma linguagem de bancada muito apreciada em projetos atuais.",
    indicationTitle: "Cozinhas, ilhas e áreas internas contemporâneas",
    indicationText: "Ideal para quem quer quartzo cinza marmorizado com versatilidade e forte apelo estético.",
    benefitTitle: "Equilíbrio entre desenho e neutralidade",
    benefitText: "Ajuda a criar um ambiente sofisticado, atual e fácil de compor com diferentes estilos de marcenaria e metais.",
    executionTitle: "Detalhes bem resolvidos elevam o cinza marmorizado",
    executionText: "No Desert Silver, borda, paginação visual e integração com os demais acabamentos definem a leitura premium da bancada.",
    seoDescription: "Silestone Desert Silver em São Paulo para cozinhas e ilhas sob medida. Quartzo cinza marmorizado premium com baixa porosidade e visual contemporâneo.",
  },
  "charcoal-soapstone": {
    eyebrow: "Silestone escuro para projetos sofisticados, marcantes e contemporâneos",
    intro: "Silestone Charcoal Soapstone é uma escolha muito forte para quem quer uma bancada escura, sofisticada e de presença autoral em cozinhas, ilhas, lavabos e banheiros contemporâneos.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade indicado para superfícies internas sob medida em que se busca visual escuro, composição elegante e praticidade de manutenção.",
    practical: "Na prática, ele cria um ambiente mais profundo, mais refinado e com forte identidade visual, funcionando muito bem com metais escovados, madeira e iluminação quente.",
    value: "É um investimento que vale a pena porque transforma a bancada em elemento protagonista do projeto, aumentando muito a percepção de sofisticação e assinatura visual do espaço.",
    indicationTitle: "Cozinhas, ilhas e lavabos escuros premium",
    indicationText: "Excelente para quem quer quartzo escuro com presença forte e linguagem contemporânea.",
    benefitTitle: "Presença visual e sofisticação imediata",
    benefitText: "Ajuda o ambiente a parecer mais exclusivo, mais autoral e mais valorizado visualmente.",
    executionTitle: "Escuros premium pedem acabamento de alto nível",
    executionText: "No Charcoal Soapstone, bordas, recortes e integração com marcenaria e iluminação precisam ser muito bem resolvidos para sustentar a leitura premium.",
    seoDescription: "Silestone Charcoal Soapstone em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo escuro premium com baixa porosidade e forte presença visual.",
  },
  "bronze-rivers": {
    eyebrow: "Silestone escuro sofisticado para cozinhas e ilhas de forte assinatura visual",
    intro: "Silestone Bronze Rivers é indicado para quem quer uma bancada marcante, elegante e muito contemporânea, com leitura escura sofisticada e presença forte no projeto.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade pensado para superfícies internas sob medida em que a combinação entre desenho valorizado, estabilidade visual e praticidade faz diferença.",
    practical: "Na prática, ele cria cozinhas e ilhas mais autorais, mais refinadas e com cara de projeto muito bem pensado, especialmente em composições com madeira, metais escovados e luz quente.",
    value: "É uma escolha que agrega valor porque deixa a bancada com status de protagonista, elevando o ambiente e reforçando percepção de sofisticação e exclusividade.",
    indicationTitle: "Cozinhas, ilhas e áreas internas de linguagem escura premium",
    indicationText: "Ideal para quem quer quartzo de forte impacto visual e composição sofisticada.",
    benefitTitle: "Contraste, profundidade e assinatura estética",
    benefitText: "Ajuda o ambiente a parecer mais sofisticado, mais maduro e muito mais memorável visualmente.",
    executionTitle: "Em materiais protagonistas, detalhe define resultado",
    executionText: "No Bronze Rivers, borda, recorte e composição com marcenaria e metais precisam ser planejados para que a bancada apareça no nível certo.",
    seoDescription: "Silestone Bronze Rivers em São Paulo para cozinhas e ilhas sob medida. Quartzo premium escuro com baixa porosidade e forte assinatura visual.",
  },
};

const QUARTZO_STONE_MATERIAL_COPY: Record<string, QuartzoEngenhariaMaterialCopy> = {
  "branco-absoluto": {
    eyebrow: "Quartzo Stone branco para projetos claros, limpos e sofisticados",
    intro: "Quartzo Stone Branco Absoluto é ideal para quem quer uma bancada clara, uniforme e muito elegante para cozinhas, ilhas, banheiros e lavabos com linguagem contemporânea.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, indicado para superfícies sob medida em que a praticidade de manutenção e o visual homogêneo são grandes diferenciais.",
    practical: "Na prática, ele ajuda o espaço a parecer maior, mais organizado e mais iluminado, funcionando muito bem com marcenaria clara, amadeirada ou contrastes escuros bem planejados.",
    value: "É um investimento que vale a pena porque entrega uma estética limpa e muito valorizada, reforçando a sensação de projeto premium e bem resolvido em todos os detalhes.",
    indicationTitle: "Cozinhas, ilhas, banheiros e lavabos claros",
    indicationText: "Ideal para quem quer quartzo branco uniforme com leitura sofisticada e linguagem contemporânea.",
    benefitTitle: "Clareza, ordem visual e sensação premium",
    benefitText: "Ajuda o ambiente a parecer mais leve, mais amplo e mais elegante, com um resultado muito valorizado visualmente.",
    executionTitle: "No branco, o capricho do acabamento aparece mais",
    executionText: "No Branco Absoluto, bordas, recortes e encontros bem feitos são fundamentais para sustentar a leitura premium da bancada.",
    seoDescription: "Quartzo Stone Branco Absoluto em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo branco premium com baixa porosidade e visual uniforme.",
  },
  snowflakes: {
    eyebrow: "Quartzo Stone claro com textura para projetos leves e sofisticados",
    intro: "Quartzo Stone Snowflakes é uma escolha interessante para quem quer uma bancada clara com mais textura visual, sem perder a linguagem elegante e prática do quartzo de engenharia.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, indicado para superfícies sob medida em cozinhas, banheiros e lavabos que pedem facilidade de manutenção e aparência consistente.",
    practical: "Na prática, ele cria uma bancada com mais profundidade visual do que um branco totalmente liso, ajudando a trazer sofisticação e ao mesmo tempo boa convivência com a rotina diária.",
    value: "É uma escolha que agrega valor porque combina leveza, elegância e uma leitura visual mais rica, deixando o projeto mais interessante sem perder versatilidade.",
    indicationTitle: "Cozinhas e lavabos claros com textura suave",
    indicationText: "Excelente para quem quer quartzo claro com um pouco mais de presença visual e sofisticação discreta.",
    benefitTitle: "Visual claro sem ficar monótono",
    benefitText: "Ajuda a criar uma bancada elegante, luminosa e mais interessante visualmente para o uso diário.",
    executionTitle: "A textura precisa conversar com o conjunto",
    executionText: "No Snowflakes, borda, iluminação e relação com a marcenaria são o que fazem a bancada parecer comum ou realmente premium.",
    seoDescription: "Quartzo Stone Snowflakes em São Paulo para cozinhas, lavabos e bancadas sob medida. Quartzo claro com textura suave, baixa porosidade e visual sofisticado.",
  },
  fendi: {
    eyebrow: "Quartzo Stone bege para cozinhas acolhedoras, elegantes e muito funcionais",
    intro: "Quartzo Stone Fendi é uma ótima opção para quem quer sair do branco puro e criar uma bancada mais acolhedora, sofisticada e bem conectada com marcenaria amadeirada, tons quentes e projetos contemporâneos.",
    technical: "Em termos técnicos, é um quartzo de engenharia indicado para bancadas sob medida com baixa porosidade, boa estabilidade visual e excelente adaptação a ambientes de uso frequente.",
    practical: "Na prática, ele ajuda a construir cozinhas mais confortáveis visualmente, com cara de projeto mais maduro, sofisticado e fácil de manter bonito ao longo da rotina.",
    value: "É um investimento que vale a pena porque adiciona calor visual e personalidade ao ambiente sem abrir mão da praticidade e da leitura premium do quartzo de engenharia.",
    indicationTitle: "Cozinhas, ilhas e bancadas em tons quentes",
    indicationText: "Ideal para quem quer uma bancada mais acolhedora, elegante e fácil de integrar com marcenaria e metais.",
    benefitTitle: "Calor visual com praticidade de rotina",
    benefitText: "Traz mais aconchego ao ambiente e ajuda a cozinha a parecer mais sofisticada, sem perder funcionalidade.",
    executionTitle: "Tom médio valoriza composição e borda",
    executionText: "No Fendi, a força do projeto aparece quando o material se integra bem com marcenaria, iluminação e detalhes de acabamento.",
    seoDescription: "Quartzo Stone Fendi em São Paulo para cozinhas, ilhas e bancadas sob medida. Quartzo bege premium com baixa porosidade e visual sofisticado.",
  },
  "preto-absoluto": {
    eyebrow: "Quartzo Stone preto para bancadas marcantes, elegantes e contemporâneas",
    intro: "Quartzo Stone Preto Absoluto é indicado para quem quer uma bancada de presença forte, leitura sofisticada e linguagem muito atual em cozinhas, ilhas, lavabos e banheiros.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade, com visual uniforme e excelente adaptação a superfícies sob medida em projetos contemporâneos.",
    practical: "Na prática, ele cria uma composição mais marcante e elegante, especialmente quando combinado com madeira, metais escovados, marcenaria clara ou contrastes bem construídos.",
    value: "É uma escolha que agrega valor porque transforma a bancada em um elemento protagonista do ambiente, reforçando sofisticação, contraste e percepção de acabamento premium.",
    indicationTitle: "Cozinhas, ilhas e lavabos contemporâneos",
    indicationText: "Excelente para quem quer quartzo preto com visual forte, uniforme e de alto impacto estético.",
    benefitTitle: "Contraste sofisticado e forte assinatura visual",
    benefitText: "Ajuda o projeto a parecer mais autoral, mais refinado e com presença marcante sem depender de exagero.",
    executionTitle: "Superfícies escuras pedem precisão total",
    executionText: "No Preto Absoluto, alinhamento, borda e integração com o restante do projeto são essenciais para que o resultado fique realmente elegante.",
    seoDescription: "Quartzo Stone Preto Absoluto em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo preto premium com baixa porosidade e forte presença visual.",
  },
  "branco-vena-oro": {
    eyebrow: "Quartzo Stone branco marmorizado para cozinhas sofisticadas e luminosas",
    intro: "Quartzo Stone Branco Vena Oro é indicado para quem quer uma bancada clara com desenho sofisticado e presença elegante em cozinhas, ilhas, lavabos e banheiros de linguagem contemporânea.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade desenvolvido para superfícies internas sob medida, com forte apelo visual e boa estabilidade para uso frequente.",
    practical: "Na prática, ele ajuda a construir ambientes mais luminosos, sofisticados e valorizados, entregando uma leitura de bancada mais nobre e muito versátil na composição com marcenaria e metais.",
    value: "É uma escolha que agrega valor porque aproxima o visual do universo das pedras claras premium e reforça a percepção de ambiente bem resolvido e elegante.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros premium",
    indicationText: "Ideal para quem quer quartzo branco com desenho mais sofisticado e forte apelo estético.",
    benefitTitle: "Leitura nobre com rotina prática",
    benefitText: "Ajuda o ambiente a parecer mais refinado, mais luminoso e mais valorizado sem complicar o dia a dia.",
    executionTitle: "O desenho pede boa proporção e acabamento limpo",
    executionText: "No Branco Vena Oro, bordas, emendas e recortes precisam ser muito bem resolvidos para que o desenho apareça com elegância.",
    seoDescription: "Quartzo Stone Branco Vena Oro em São Paulo para cozinhas, ilhas e banheiros sob medida. Quartzo branco marmorizado premium com baixa porosidade e visual sofisticado.",
  },
  "cinza-absoluto-light": {
    eyebrow: "Quartzo Stone cinza claro para bancadas atuais, discretas e elegantes",
    intro: "Quartzo Stone Cinza Absoluto Light é uma boa escolha para quem quer uma bancada contemporânea, sofisticada e fácil de integrar com projetos neutros, claros ou urbanos.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade indicado para superfícies internas sob medida, com visual uniforme e boa estabilidade para o uso diário.",
    practical: "Na prática, ele ajuda a criar ambientes organizados, elegantes e visualmente maduros, funcionando muito bem com madeira, branco, preto e metais escovados.",
    value: "É uma escolha que agrega valor porque entrega neutralidade sofisticada, forte versatilidade e uma leitura premium que envelhece muito bem no projeto.",
    indicationTitle: "Cozinhas, ilhas, lavabos e banheiros contemporâneos",
    indicationText: "Excelente para quem quer quartzo cinza claro uniforme com leitura elegante e versátil.",
    benefitTitle: "Sofisticação neutra e fácil composição",
    benefitText: "Ajuda o projeto a parecer mais atual, equilibrado e refinado sem depender de excessos visuais.",
    executionTitle: "Uniformidade valoriza precisão",
    executionText: "No Cinza Absoluto Light, acabamento, alinhamento e integração com o restante do projeto são decisivos para a percepção premium.",
    seoDescription: "Quartzo Stone Cinza Absoluto Light em São Paulo para cozinhas, ilhas e banheiros sob medida. Quartzo cinza claro premium com baixa porosidade e visual uniforme.",
  },
  "cinza-stellar-light": {
    eyebrow: "Quartzo Stone cinza com brilho sutil para projetos elegantes e atuais",
    intro: "Quartzo Stone Cinza Stellar Light é indicado para quem quer uma bancada cinza clara com um toque extra de textura e sofisticação, mantendo a praticidade do quartzo de engenharia.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade com leitura estável, indicado para superfícies internas sob medida em cozinhas, ilhas, lavabos e banheiros.",
    practical: "Na prática, ele ajuda a criar uma bancada mais interessante visualmente do que um cinza liso, adicionando refinamento e leve movimento sem perder versatilidade.",
    value: "É uma escolha que agrega valor porque entrega uma estética atual e mais rica visualmente, deixando o projeto mais sofisticado sem perder funcionalidade.",
    indicationTitle: "Cozinhas e lavabos contemporâneos com toque de textura",
    indicationText: "Ideal para quem quer quartzo cinza claro com leitura elegante e mais personalidade visual.",
    benefitTitle: "Textura discreta com aparência premium",
    benefitText: "Ajuda o ambiente a parecer mais refinado e mais interessante sem comprometer a praticidade do uso.",
    executionTitle: "Brilho sutil pede acabamento coerente",
    executionText: "No Cinza Stellar Light, bordas, iluminação e composição com a marcenaria são o que definem a leitura final da bancada.",
    seoDescription: "Quartzo Stone Cinza Stellar Light em São Paulo para cozinhas e lavabos sob medida. Quartzo cinza premium com brilho sutil e baixa porosidade.",
  },
  "bege-absoluto": {
    eyebrow: "Quartzo Stone bege para ambientes acolhedores, sofisticados e versáteis",
    intro: "Quartzo Stone Bege Absoluto é uma excelente opção para quem quer uma bancada com mais calor visual, sofisticação discreta e ótima integração com marcenaria amadeirada e tons neutros.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade indicado para superfícies internas sob medida, com visual uniforme e boa adaptação a cozinhas, ilhas e lavabos de uso frequente.",
    practical: "Na prática, ele ajuda a criar ambientes mais acolhedores e equilibrados, com uma estética elegante que evita a frieza dos tons muito claros e a rigidez dos tons muito escuros.",
    value: "É uma escolha que agrega valor porque deixa o espaço mais confortável visualmente, mais sofisticado e mais fácil de manter atual ao longo do tempo.",
    indicationTitle: "Cozinhas, ilhas e lavabos em tons quentes e naturais",
    indicationText: "Excelente para quem quer quartzo bege uniforme com leitura elegante e acolhedora.",
    benefitTitle: "Aconchego com percepção premium",
    benefitText: "Ajuda o ambiente a parecer mais confortável, mais maduro e mais bem resolvido no conjunto final.",
    executionTitle: "Tom quente valoriza composição completa",
    executionText: "No Bege Absoluto, a força do resultado aparece quando bancada, marcenaria, metais e iluminação trabalham em harmonia.",
    seoDescription: "Quartzo Stone Bege Absoluto em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo bege premium com baixa porosidade e visual acolhedor.",
  },
  "preto-stellar": {
    eyebrow: "Quartzo Stone preto com brilho sutil para bancadas de forte presença",
    intro: "Quartzo Stone Preto Stellar é indicado para quem quer uma bancada escura, sofisticada e com mais riqueza visual, criando ambientes contemporâneos e muito marcantes.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade indicado para superfícies internas sob medida, com visual escuro valorizado por partículas e leitura estável para o uso frequente.",
    practical: "Na prática, ele entrega uma bancada protagonista, elegante e muito atual, especialmente quando combinada com madeira, metais escovados e iluminação bem pensada.",
    value: "É uma escolha que agrega valor porque aumenta a sensação de sofisticação e exclusividade, dando à bancada uma assinatura visual muito forte.",
    indicationTitle: "Cozinhas, ilhas e lavabos de composição escura premium",
    indicationText: "Ideal para quem quer quartzo preto com presença visual forte e toque extra de sofisticação.",
    benefitTitle: "Profundidade visual e personalidade",
    benefitText: "Ajuda o ambiente a parecer mais autoral, mais refinado e mais impactante visualmente.",
    executionTitle: "Escuros com brilho pedem projeto bem coordenado",
    executionText: "No Preto Stellar, acabamento, iluminação e composição com os demais materiais são determinantes para o efeito premium da bancada.",
    seoDescription: "Quartzo Stone Preto Stellar em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo preto premium com brilho sutil, baixa porosidade e forte presença visual.",
  },
  channel: {
    eyebrow: "Quartzo Stone neutro para bancadas elegantes, atuais e versáteis",
    intro: "Quartzo Stone Channel é indicado para quem quer uma bancada contemporânea, equilibrada e muito fácil de integrar com diferentes linguagens de projeto.",
    technical: "Em termos técnicos, é um quartzo de engenharia de baixa porosidade pensado para superfícies internas sob medida em cozinhas, ilhas, lavabos e banheiros de uso frequente.",
    practical: "Na prática, ele ajuda a construir ambientes mais organizados visualmente, sofisticados e duráveis em linguagem, funcionando bem tanto com composições claras quanto mais contrastadas.",
    value: "É uma escolha que agrega valor porque oferece neutralidade elegante, versatilidade e uma estética capaz de atravessar o tempo com muita coerência visual.",
    indicationTitle: "Cozinhas, ilhas e lavabos contemporâneos e versáteis",
    indicationText: "Excelente para quem quer quartzo neutro com leitura elegante e boa compatibilidade com diferentes estilos.",
    benefitTitle: "Versatilidade com sensação premium",
    benefitText: "Ajuda o projeto a parecer atual e bem resolvido, com uma bancada que conversa com vários tipos de composição.",
    executionTitle: "O neutro exige leitura limpa do conjunto",
    executionText: "No Channel, recortes, bordas e integração com marcenaria e metais são o que sustentam a percepção de acabamento premium.",
    seoDescription: "Quartzo Stone Channel em São Paulo para cozinhas, ilhas e lavabos sob medida. Quartzo premium neutro com baixa porosidade e visual contemporâneo.",
  },
};

function getSilestoneMaterialCopy(item: CatalogItem | null): QuartzoEngenhariaMaterialCopy {
  if (!item) {
    return {
      intro: "Silestone é uma superfície de quartzo de engenharia indicada para cozinhas, ilhas, banheiros e lavabos que pedem baixa porosidade, visual sofisticado e acabamento contemporâneo.",
      technical: "Em termos técnicos, Silestone é um material de engenharia pensado para bancadas sob medida, com leitura visual consistente, baixa porosidade e excelente adaptação a projetos internos de uso frequente.",
      practical: "Na prática, ele ajuda a criar ambientes mais limpos, mais sofisticados e mais fáceis de manter bonitos no dia a dia, especialmente em cozinhas e banheiros contemporâneos.",
      value: "É um investimento que vale a pena porque equilibra estética premium, praticidade e uma linguagem visual muito valorizada em projetos atuais.",
      indicationTitle: "Cozinhas, ilhas, lavabos e banheiros contemporâneos",
      indicationText: "Excelente para quem busca um quartzo premium com baixa porosidade e visual sofisticado.",
      benefitTitle: "Praticidade com aparência premium",
      benefitText: "Entrega rotina mais tranquila e um resultado visual muito valorizado em bancadas sob medida.",
      executionTitle: "Borda, recorte e integração definem o resultado",
      executionText: "No Silestone, a percepção de alto padrão aparece quando a bancada é bem resolvida em recortes, bordas, encontros e composição com a marcenaria.",
    };
  }

  return SILESTONE_MATERIAL_COPY[normalizeSilestoneSlug(item.name)] || {
    intro: `${item.name} é uma opção de quartzo de engenharia indicada para quem quer uma bancada de visual sofisticado, baixa porosidade e excelente integração com cozinhas, ilhas, banheiros e lavabos contemporâneos.`,
    technical: `Em termos técnicos, ${item.name} reúne as qualidades mais valorizadas do quartzo de engenharia: baixa porosidade, leitura visual estável e excelente adaptação a superfícies sob medida em ambientes internos.`,
    practical: `Na prática, ele ajuda a criar um projeto mais elegante, organizado e funcional, com estética contemporânea e boa convivência com a rotina do dia a dia.`,
    value: `${item.name} agrega valor porque combina praticidade, acabamento premium e forte percepção de sofisticação em bancadas e superfícies bem executadas.`,
    indicationTitle: "Cozinhas, ilhas, banheiros e lavabos premium",
    indicationText: "Excelente para quem busca quartzo sofisticado, de baixa porosidade e visual muito coerente com projetos contemporâneos.",
    benefitTitle: "Estética refinada com rotina prática",
    benefitText: "Ajuda a construir um ambiente mais valorizado visualmente sem abrir mão da praticidade esperada para o uso frequente.",
    executionTitle: "O acabamento define o nível do quartzo",
    executionText: "No Silestone, borda, encontro, recorte e composição com a marcenaria são determinantes para que a bancada pareça realmente premium.",
  };
}

function getQuartzoStoneMaterialCopy(item: CatalogItem | null): QuartzoEngenhariaMaterialCopy {
  if (!item) {
    return {
      intro: "Quartzo Stone é uma superfície de quartzo de engenharia indicada para cozinhas, ilhas, lavabos e banheiros que pedem visual uniforme, baixa porosidade e uma leitura contemporânea de bancada premium.",
      technical: "Em termos técnicos, trata-se de um quartzo de engenharia desenvolvido para aplicações sob medida em ambientes internos, com baixa porosidade e forte estabilidade visual para bancadas de uso frequente.",
      practical: "Na prática, ele ajuda a criar bancadas mais organizadas visualmente, mais elegantes e mais fáceis de manter no dia a dia, especialmente em projetos contemporâneos e bem resolvidos.",
      value: "É um investimento que vale a pena porque entrega equilíbrio entre estética, praticidade e percepção de acabamento premium em cozinhas, ilhas e lavabos sob medida.",
      indicationTitle: "Cozinhas, ilhas, lavabos e banheiros contemporâneos",
      indicationText: "Excelente para quem quer uma bancada de quartzo com baixa porosidade e linguagem visual atual.",
      benefitTitle: "Rotina prática com imagem sofisticada",
      benefitText: "Entrega um ambiente mais organizado visualmente, mais elegante e mais coerente com projetos premium.",
      executionTitle: "O resultado premium depende do conjunto",
      executionText: "No Quartzo Stone, bordas, recortes, paginação visual e integração com a marcenaria são o que fazem a bancada parecer realmente bem resolvida.",
    };
  }

  return QUARTZO_STONE_MATERIAL_COPY[normalizeQuartzoStoneSlug(item.name)] || {
    intro: `${item.name} é uma opção de quartzo de engenharia indicada para quem quer uma bancada contemporânea, elegante e de baixa porosidade para cozinhas, ilhas, lavabos e banheiros sob medida.`,
    technical: `Em termos técnicos, ${item.name} reúne as características mais buscadas em superfícies de quartzo de engenharia: visual uniforme, baixa porosidade e boa adaptação a bancadas internas de uso frequente.`,
    practical: `Na prática, ele ajuda a construir ambientes mais sofisticados, bem organizados visualmente e mais tranquilos para o uso diário, especialmente em projetos contemporâneos.`,
    value: `${item.name} agrega valor porque oferece estética consistente, praticidade e uma leitura premium que valoriza cozinhas, ilhas e lavabos bem executados.`,
    indicationTitle: "Cozinhas, ilhas, banheiros e lavabos sob medida",
    indicationText: "Excelente para quem busca uma bancada de quartzo com linguagem contemporânea e boa convivência com a rotina.",
    benefitTitle: "Visual limpo com percepção de alto padrão",
    benefitText: "Ajuda o projeto a parecer mais elegante, mais atual e mais bem resolvido no conjunto final.",
    executionTitle: "Recorte e acabamento elevam o material",
    executionText: "No Quartzo Stone, a percepção de bancada premium aparece quando bordas, encontros e integração com o restante do projeto são muito bem executados.",
  };
}

const DEKTON_MATERIAL_COPY: Record<string, QuartzoEngenhariaMaterialCopy> = {
  laurent: {
    eyebrow: "Dekton escuro marmorizado para cozinhas e ilhas de forte assinatura visual",
    intro: "Dekton Laurent é indicado para quem quer uma bancada protagonista, com leitura sofisticada, contraste elegante e presença marcante em cozinhas, ilhas, painéis e áreas gourmet de alto padrão.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance, com baixíssima absorção, excelente estabilidade visual e ótima resistência para projetos que pedem material contemporâneo e muito bem resolvido.",
    practical: "Na prática, ele ajuda a criar ambientes mais autorais e memoráveis, com uma bancada que valoriza marcenaria, metais e iluminação, transmitindo uma sensação imediata de projeto premium.",
    value: "É um investimento que vale a pena porque transforma a superfície em um elemento de identidade do ambiente, elevando a percepção de sofisticação e a qualidade visual do conjunto final.",
    indicationTitle: "Cozinhas, ilhas e painéis de forte presença estética",
    indicationText: "Ideal para quem quer uma superfície escura premium, com desenho sofisticado e linguagem arquitetônica contemporânea.",
    benefitTitle: "Protagonismo com alto valor percebido",
    benefitText: "Ajuda o espaço a parecer mais exclusivo, mais maduro e muito mais marcante no primeiro olhar.",
    executionTitle: "Desenho marcante pede recorte e paginação inteligentes",
    executionText: "No Laurent, borda, paginação visual, emendas e integração com os demais materiais são decisivos para sustentar a leitura premium.",
    seoDescription: "Dekton Laurent em São Paulo para cozinhas, ilhas, painéis e áreas gourmet sob medida. Superfície sinterizada premium com visual sofisticado, baixa absorção e acabamento impecável.",
  },
  kelya: {
    eyebrow: "Dekton escuro para projetos contemporâneos com profundidade e elegância",
    intro: "Dekton Kelya é uma escolha forte para quem quer uma superfície escura, refinada e versátil, capaz de dar profundidade visual a cozinhas, ilhas, áreas gourmet e painéis de linguagem contemporânea.",
    technical: "Em termos técnicos, trata-se de uma superfície sinterizada de alta performance, com baixa porosidade e excelente estabilidade para aplicações sob medida em ambientes exigentes.",
    practical: "Na prática, ele cria uma leitura sofisticada e muito atual, funcionando muito bem com madeira, metais escovados, iluminação quente e composições que pedem contraste elegante.",
    value: "É uma escolha que agrega valor porque dá à bancada ou ao painel uma presença forte, coerente e duradoura, reforçando a sensação de projeto bem pensado e premium.",
    indicationTitle: "Cozinhas, ilhas e painéis escuros premium",
    indicationText: "Excelente para quem busca uma superfície escura contemporânea com forte impacto visual e ótimo desempenho.",
    benefitTitle: "Profundidade visual com linguagem arquitetônica",
    benefitText: "Ajuda o ambiente a parecer mais sofisticado, mais autoral e visualmente mais rico.",
    executionTitle: "Superfícies escuras valorizam precisão total",
    executionText: "No Kelya, alinhamento, borda e integração com marcenaria e metais são fundamentais para o resultado premium.",
    seoDescription: "Dekton Kelya em São Paulo para bancadas, ilhas e painéis sob medida. Superfície sinterizada escura premium com baixa porosidade e visual contemporâneo.",
  },
  entzo: {
    eyebrow: "Dekton claro marmorizado para cozinhas e ilhas sofisticadas",
    intro: "Dekton Entzo é muito procurado por quem quer uma superfície clara, elegante e de forte apelo estético para cozinhas, ilhas, painéis e banheiros com linguagem premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alto desempenho, com baixa absorção e ótima estabilidade, indicada para superfícies sob medida que exigem estética valorizada e boa performance de uso.",
    practical: "Na prática, ele ajuda a criar ambientes mais luminosos, nobres e muito bem resolvidos, aproximando o projeto do universo das pedras claras premium com a linguagem contemporânea dos sinterizados.",
    value: "É um investimento que vale a pena porque entrega luz, elegância e percepção imediata de alto padrão, deixando o ambiente mais valorizado e mais memorável.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros de alto padrão",
    indicationText: "Ideal para quem quer uma superfície clara, sofisticada e muito valorizada visualmente no conjunto do projeto.",
    benefitTitle: "Clareza visual com presença premium",
    benefitText: "Ajuda o espaço a parecer mais amplo, mais luminoso e mais refinado, sem abrir mão de uma leitura contemporânea.",
    executionTitle: "Claros marmorizados pedem composição inteligente",
    executionText: "No Entzo, paginação, recortes, bordas e relação com marcenaria e metais são essenciais para o efeito premium final.",
    seoDescription: "Dekton Entzo em São Paulo para cozinhas, ilhas, painéis e banheiros sob medida. Superfície sinterizada clara premium com baixa absorção e visual sofisticado.",
  },
  aura: {
    eyebrow: "Dekton claro para projetos limpos, elegantes e contemporâneos",
    intro: "Dekton Aura é indicado para quem quer uma superfície clara, luminosa e muito sofisticada para cozinhas, ilhas, banheiros e painéis com leitura premium e linguagem atual.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance, com baixa porosidade e excelente adaptação a superfícies sob medida em ambientes de uso frequente.",
    practical: "Na prática, ele ajuda o ambiente a parecer mais leve, mais valorizado e mais coerente com uma arquitetura contemporânea de alto padrão.",
    value: "É uma escolha que agrega valor porque reforça luz, elegância e sensação de acabamento premium, com uma estética muito apreciada em projetos atuais.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros contemporâneos",
    indicationText: "Excelente para quem busca uma superfície clara premium com imagem sofisticada e ótima versatilidade compositiva.",
    benefitTitle: "Leveza visual e sofisticação imediata",
    benefitText: "Ajuda o projeto a parecer mais claro, mais organizado visualmente e mais refinado no resultado final.",
    executionTitle: "Nos claros, acabamento impecável é decisivo",
    executionText: "No Aura, bordas, recortes e integração com marcenaria precisam ser muito bem resolvidos para sustentar a leitura premium.",
    seoDescription: "Dekton Aura em São Paulo para cozinhas, ilhas, banheiros e painéis sob medida. Superfície sinterizada clara premium com baixa absorção e visual sofisticado.",
  },
  khalo: {
    eyebrow: "Dekton de desenho marcante para projetos autorais e de alto impacto",
    intro: "Dekton Khalo é indicado para quem quer uma superfície de personalidade forte, desenho impactante e leitura absolutamente protagonista em cozinhas, ilhas, painéis e espaços de alto padrão.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance desenvolvida para unir visual expressivo, baixa absorção e estabilidade em aplicações sob medida de grande valor estético.",
    practical: "Na prática, ele transforma a bancada ou o painel em ponto focal do ambiente, sendo ideal para projetos em que a superfície deve carregar identidade, assinatura visual e percepção imediata de exclusividade.",
    value: "É um investimento que vale a pena porque dá ao projeto uma imagem rara, autoral e memorável, aumentando a percepção de sofisticação e singularidade do espaço.",
    indicationTitle: "Ilhas, painéis e cozinhas de forte protagonismo",
    indicationText: "Ideal para quem quer uma superfície de alto impacto visual, com proposta autoral e acabamento premium.",
    benefitTitle: "Exclusividade e presença arquitetônica",
    benefitText: "Ajuda o ambiente a ganhar identidade própria e uma assinatura estética que dificilmente passa despercebida.",
    executionTitle: "Materiais protagonistas exigem execução premium",
    executionText: "No Khalo, paginação visual, recortes e proporção da superfície precisam ser tratados como parte central do design.",
    seoDescription: "Dekton Khalo em São Paulo para ilhas, painéis e cozinhas sob medida. Superfície sinterizada premium com desenho marcante, baixa absorção e forte presença visual.",
  },
  rem: {
    eyebrow: "Dekton neutro sofisticado para projetos versáteis e contemporâneos",
    intro: "Dekton Rem é uma excelente opção para quem quer uma superfície clara e sofisticada, com desenho elegante e ótima versatilidade para cozinhas, ilhas, banheiros e lavabos sob medida.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, pensada para aplicações sob medida em ambientes internos de uso frequente, com linguagem visual premium e estável.",
    practical: "Na prática, ele ajuda a criar ambientes equilibrados, luminosos e muito atuais, com uma estética refinada que funciona bem em diferentes estilos de marcenaria e metais.",
    value: "É uma escolha que agrega valor porque combina versatilidade, leitura sofisticada e desempenho, deixando o ambiente mais elegante e mais fácil de manter contemporâneo ao longo do tempo.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros e versáteis",
    indicationText: "Excelente para quem busca uma superfície premium capaz de unir sofisticação, neutralidade e flexibilidade de composição.",
    benefitTitle: "Versatilidade com imagem premium",
    benefitText: "Ajuda o projeto a parecer equilibrado, atual e bem resolvido, sem perder refinamento.",
    executionTitle: "O neutro premium depende da leitura do conjunto",
    executionText: "No Rem, acabamento, borda e relação com marcenaria e iluminação são o que sustentam o resultado final no nível certo.",
    seoDescription: "Dekton Rem em São Paulo para cozinhas, ilhas, banheiros e lavabos sob medida. Superfície sinterizada premium com baixa absorção e visual sofisticado.",
  },
  danae: {
    eyebrow: "Dekton claro e elegante para projetos atemporais e sofisticados",
    intro: "Dekton Danae é indicado para quem quer uma superfície clara, acolhedora e muito elegante para cozinhas, ilhas, banheiros, lavabos e painéis com linguagem premium e estética mais atemporal.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance, com baixa absorção e excelente estabilidade visual para bancadas e planos sob medida em ambientes de uso intenso.",
    practical: "Na prática, ele ajuda a criar ambientes leves, luminosos e mais convidativos, funcionando muito bem com madeira clara, metais escovados e marcenaria de linhas limpas.",
    value: "É um investimento que vale a pena porque entrega um visual refinado, fácil de combinar e muito valorizado em projetos residenciais e comerciais de alto padrão.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros com leitura elegante",
    indicationText: "Excelente para quem quer um visual claro premium, sofisticado e fácil de integrar ao restante do projeto.",
    benefitTitle: "Luz, equilíbrio e elegância duradoura",
    benefitText: "Ajuda o ambiente a parecer mais claro, mais harmonioso e mais acolhedor, com forte sensação de acabamento premium.",
    executionTitle: "Claros sofisticados pedem recortes e bordas muito bem resolvidos",
    executionText: "No Danae, acabamento, paginação visual e proporção com a marcenaria são determinantes para o resultado final parecer realmente premium.",
    seoDescription: "Dekton Danae em São Paulo para bancadas, ilhas, banheiros e lavabos sob medida. Superfície sinterizada clara premium com baixa absorção e visual elegante.",
  },
  kovik: {
    eyebrow: "Dekton de linguagem mineral para projetos contemporâneos e urbanos",
    intro: "Dekton Kovik é uma escolha muito interessante para quem quer uma superfície com leitura mineral, sofisticada e contemporânea para cozinhas, ilhas, áreas gourmet, painéis e banheiros sob medida.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance, com baixa porosidade e ótima adaptação a projetos que pedem imagem arquitetônica forte e boa estabilidade visual.",
    practical: "Na prática, ele ajuda a criar ambientes mais maduros, urbanos e atuais, funcionando muito bem com madeira, preto, inox e composições de linguagem mais sóbria.",
    value: "É uma escolha que agrega valor porque entrega uma superfície de personalidade, com forte presença visual e percepção imediata de projeto bem desenhado.",
    indicationTitle: "Cozinhas, ilhas e painéis de linguagem arquitetônica",
    indicationText: "Ideal para quem quer uma superfície contemporânea com leitura mineral e imagem sofisticada.",
    benefitTitle: "Identidade visual forte sem excessos",
    benefitText: "Ajuda o projeto a parecer mais autoral, mais consistente e mais valorizado sem depender de exageros estéticos.",
    executionTitle: "Texturas minerais exigem composição inteligente",
    executionText: "No Kovik, recorte, borda e integração com marcenaria e metais são fundamentais para sustentar a leitura premium.",
    seoDescription: "Dekton Kovik em São Paulo para cozinhas, ilhas, áreas gourmet e painéis sob medida. Superfície sinterizada premium com visual mineral e baixa absorção.",
  },
  nara: {
    eyebrow: "Dekton sofisticado para cozinhas e ilhas de leitura clara e premium",
    intro: "Dekton Nara é indicado para quem quer uma superfície clara e muito sofisticada, capaz de valorizar cozinhas, ilhas, painéis e banheiros com uma linguagem contemporânea e premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, pensada para aplicações sob medida em projetos que exigem estética valorizada, boa performance e estabilidade visual.",
    practical: "Na prática, ele ajuda a construir ambientes mais claros, elegantes e bem resolvidos, com uma presença refinada que conversa muito bem com marcenaria neutra ou amadeirada.",
    value: "É um investimento que vale a pena porque entrega luz, sofisticação e uma leitura de alto padrão muito valorizada em cozinhas e ilhas contemporâneas.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros de alto valor estético",
    indicationText: "Excelente para quem quer uma superfície clara premium, sofisticada e muito bem aceita em projetos contemporâneos.",
    benefitTitle: "Ambientes mais claros e mais nobres",
    benefitText: "Ajuda o espaço a ganhar amplitude visual, elegância e uma sensação imediata de acabamento premium.",
    executionTitle: "Leitura clara premium depende do detalhe",
    executionText: "No Nara, paginação, borda e integração com metais e marcenaria são decisivos para o resultado parecer realmente superior.",
    seoDescription: "Dekton Nara em São Paulo para cozinhas, ilhas, banheiros e painéis sob medida. Superfície sinterizada clara premium com baixa absorção e visual sofisticado.",
  },
  bromo: {
    eyebrow: "Dekton escuro e sofisticado para ambientes contemporâneos com profundidade",
    intro: "Dekton Bromo é ideal para quem quer uma superfície escura, contemporânea e muito elegante em cozinhas, ilhas, áreas gourmet e painéis com linguagem arquitetônica mais madura.",
    technical: "Em termos técnicos, é uma superfície sinterizada premium, com baixa absorção e excelente adaptação a superfícies sob medida que pedem estética forte e alta estabilidade visual.",
    practical: "Na prática, ele ajuda a criar ambientes mais profundos, sofisticados e coerentes com projetos de alto padrão que usam contraste, textura e iluminação para valorizar o conjunto.",
    value: "É uma escolha que agrega valor porque transforma a bancada ou o painel em uma base visual sólida, elegante e muito valorizada por quem busca design contemporâneo.",
    indicationTitle: "Cozinhas, ilhas e painéis escuros de linguagem contemporânea",
    indicationText: "Ideal para quem quer uma superfície escura premium com sofisticação e presença visual consistente.",
    benefitTitle: "Contraste sofisticado e imagem madura",
    benefitText: "Ajuda o ambiente a parecer mais arquitetônico, mais refinado e mais marcante, com uma leitura premium imediata.",
    executionTitle: "Escuros minerais pedem acabamento preciso",
    executionText: "No Bromo, precisão de borda, encontro entre planos e integração com metais e iluminação fazem toda a diferença no nível da entrega.",
    seoDescription: "Dekton Bromo em São Paulo para cozinhas, ilhas, painéis e áreas gourmet sob medida. Superfície sinterizada escura premium com baixa absorção e visual sofisticado.",
  },
  sirius: {
    eyebrow: "Dekton preto fosco para projetos contemporâneos de grande presença visual",
    intro: "Dekton Sirius é indicado para quem busca uma superfície escura, intensa e sofisticada para cozinhas, ilhas, áreas gourmet e painéis com linguagem premium e muito protagonismo.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, excelente estabilidade visual e ótima adequação a projetos sob medida em que a superfície precisa transmitir força e sofisticação.",
    practical: "Na prática, ele ajuda a construir ambientes mais impactantes, mais elegantes e mais autorais, funcionando muito bem com madeira, inox, metais pretos e iluminação bem planejada.",
    value: "É um investimento que vale a pena porque entrega contraste, personalidade e uma forte sensação de projeto exclusivo, bem desenhado e visualmente memorável.",
    indicationTitle: "Cozinhas, ilhas e painéis escuros de alto impacto",
    indicationText: "Excelente para quem quer uma superfície preta premium com presença, profundidade e leitura contemporânea.",
    benefitTitle: "Protagonismo com estética arquitetônica forte",
    benefitText: "Ajuda o espaço a parecer mais sofisticado, mais exclusivo e mais coerente com um projeto de alto padrão.",
    executionTitle: "Superfícies pretas pedem excelência em cada detalhe",
    executionText: "No Sirius, paginação, borda, recortes e integração com o conjunto definem se a superfície vai realmente parecer premium.",
    seoDescription: "Dekton Sirius em São Paulo para cozinhas, ilhas, áreas gourmet e painéis sob medida. Superfície sinterizada preta premium com baixa absorção e visual contemporâneo.",
  },
  moone: {
    eyebrow: "Dekton claro neutro para ambientes leves e muito sofisticados",
    intro: "Dekton Moone é indicado para quem quer uma superfície clara, neutra e elegante para cozinhas, ilhas, banheiros e lavabos que pedem leveza visual e imagem premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, ótima estabilidade visual e excelente adaptação a projetos sob medida de linguagem limpa e contemporânea.",
    practical: "Na prática, ele ajuda a criar espaços mais luminosos, organizados e refinados, com grande facilidade de composição com marcenaria clara, amadeirada ou metais escovados.",
    value: "É uma escolha que agrega valor porque entrega uma base sofisticada, versátil e muito valorizada em projetos que buscam elegância sem excessos.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros e contemporâneos",
    indicationText: "Ideal para quem quer uma superfície clara premium, versátil e muito elegante no conjunto do ambiente.",
    benefitTitle: "Leveza visual com forte percepção de acabamento",
    benefitText: "Ajuda o ambiente a parecer mais amplo, mais claro e mais bem resolvido, com leitura premium e atemporal.",
    executionTitle: "Neutros claros valorizam o rigor da execução",
    executionText: "No Moone, borda, paginação e integração com iluminação e marcenaria são essenciais para sustentar o resultado premium.",
    seoDescription: "Dekton Moone em São Paulo para cozinhas, ilhas, banheiros e lavabos sob medida. Superfície sinterizada clara premium com baixa absorção e visual elegante.",
  },
  soke: {
    eyebrow: "Dekton de leitura industrial sofisticada para cozinhas e áreas gourmet",
    intro: "Dekton Soke é uma excelente escolha para quem quer uma superfície com estética contemporânea, urbana e muito elegante para cozinhas, ilhas, painéis e áreas gourmet sob medida.",
    technical: "Em termos técnicos, trata-se de uma superfície sinterizada premium, de baixa absorção e ótima estabilidade visual, indicada para projetos de linguagem arquitetônica mais sóbria e atual.",
    practical: "Na prática, ele ajuda a construir ambientes com personalidade, sofisticação e uma leitura industrial refinada, que funciona muito bem com madeira, metais pretos e iluminação quente.",
    value: "É um investimento que vale a pena porque dá ao projeto uma imagem contemporânea forte, equilibrada e muito valorizada em ambientes de alto padrão.",
    indicationTitle: "Cozinhas, ilhas e painéis de linguagem industrial premium",
    indicationText: "Ideal para quem quer uma superfície contemporânea com textura sofisticada e forte valor arquitetônico.",
    benefitTitle: "Estética urbana com refinamento real",
    benefitText: "Ajuda o espaço a parecer mais atual, mais maduro e visualmente mais interessante sem perder elegância.",
    executionTitle: "Texturas contemporâneas exigem composição refinada",
    executionText: "No Soke, proporção dos planos, borda e integração com marcenaria e iluminação são decisivos para a leitura premium.",
    seoDescription: "Dekton Soke em São Paulo para cozinhas, ilhas, painéis e áreas gourmet sob medida. Superfície sinterizada premium com visual industrial sofisticado e baixa absorção.",
  },
  trilium: {
    eyebrow: "Dekton de forte identidade visual para projetos autorais e contemporâneos",
    intro: "Dekton Trilium é indicado para quem quer uma superfície marcante, autoral e de grande presença estética para cozinhas, ilhas, áreas gourmet e painéis com proposta contemporânea premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de alta performance, com baixa absorção e excelente adequação a projetos sob medida em que a superfície deve ter protagonismo visual e estabilidade.",
    practical: "Na prática, ele transforma a bancada ou o painel em um elemento de identidade do ambiente, ajudando a criar projetos mais exclusivos, ousados e visualmente memoráveis.",
    value: "É uma escolha que agrega valor porque entrega singularidade, imagem autoral e forte percepção de design, tornando o ambiente mais marcante e mais valorizado.",
    indicationTitle: "Ilhas, cozinhas e painéis de forte assinatura visual",
    indicationText: "Excelente para quem quer uma superfície protagonista, com identidade própria e proposta arquitetônica marcante.",
    benefitTitle: "Superfície que vira assinatura do projeto",
    benefitText: "Ajuda o ambiente a ganhar personalidade, exclusividade e um impacto visual que reforça a percepção premium.",
    executionTitle: "Materiais autorais pedem paginação e composição impecáveis",
    executionText: "No Trilium, paginação, borda, recortes e diálogo com o restante do projeto são determinantes para sustentar a sofisticação final.",
    seoDescription: "Dekton Trilium em São Paulo para ilhas, cozinhas, áreas gourmet e painéis sob medida. Superfície sinterizada premium com forte identidade visual e baixa absorção.",
  },
};

function getDektonMaterialCopy(item: CatalogItem | null): QuartzoEngenhariaMaterialCopy {
  if (!item) {
    return {
      intro: "Dekton é uma superfície sinterizada indicada para cozinhas, ilhas, painéis, banheiros e áreas gourmet que pedem linguagem contemporânea, alta performance e acabamento premium.",
      technical: "Em termos técnicos, trata-se de uma superfície sinterizada de alta performance, com baixa absorção e excelente adaptação a projetos sob medida em que estética e desempenho caminham juntos.",
      practical: "Na prática, ele ajuda a criar ambientes mais sofisticados, atuais e bem resolvidos, com uma superfície que transmite segurança, elegância e leitura premium do projeto.",
      value: "É um investimento que vale a pena porque combina tecnologia, estética valorizada e forte percepção de acabamento premium em cozinhas, ilhas e painéis de alto padrão.",
      indicationTitle: "Cozinhas, ilhas, painéis e áreas gourmet contemporâneas",
      indicationText: "Excelente para quem quer uma superfície premium com visual sofisticado, linguagem atual e ótima percepção de valor no projeto.",
      benefitTitle: "Tecnologia com imagem de alto padrão",
      benefitText: "Entrega um ambiente mais contemporâneo, mais elegante e com forte sensação de projeto bem executado.",
      executionTitle: "Sinterizado premium pede leitura de projeto completa",
      executionText: "No Dekton, recorte, borda, paginação visual e integração com marcenaria, metais e iluminação são o que definem o nível final da entrega.",
    };
  }

  return DEKTON_MATERIAL_COPY[normalizeDektonSlug(item.name)] || {
    intro: `${item.name} é uma superfície sinterizada indicada para quem quer uma bancada, ilha, painel ou área gourmet com linguagem contemporânea, visual sofisticado e forte percepção de acabamento premium.`,
    technical: `Em termos técnicos, ${item.name} reúne as qualidades mais valorizadas das superfícies sinterizadas para projetos sob medida: baixa absorção, estabilidade visual e excelente adaptação a composições contemporâneas.`,
    practical: `Na prática, ele ajuda a construir ambientes mais elegantes, mais atuais e muito bem resolvidos, com uma superfície que reforça a imagem premium do projeto.`,
    value: `${item.name} agrega valor porque combina estética forte, linguagem contemporânea e uma percepção de tecnologia e sofisticação muito valorizada em bancadas e painéis sob medida.`,
    indicationTitle: "Cozinhas, ilhas, painéis e superfícies premium sob medida",
    indicationText: "Excelente para quem busca uma superfície contemporânea, sofisticada e com forte valor percebido no projeto.",
    benefitTitle: "Imagem premium com leitura contemporânea",
    benefitText: "Ajuda o ambiente a parecer mais atual, mais elegante e mais valorizado visualmente.",
    executionTitle: "Detalhe técnico e visual precisam andar juntos",
    executionText: "No Dekton, paginação visual, borda, recortes e integração com o conjunto são o que fazem a superfície parecer realmente premium.",
  };
}

const SINTH_MATERIAL_COPY: Record<string, QuartzoEngenhariaMaterialCopy> = {
  taj: {
    intro: "Sinth Taj é indicado para quem quer uma superfície de linguagem leve, sofisticada e extremamente elegante para cozinhas, ilhas, lavabos e painéis sob medida.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, ótima estabilidade visual e excelente adaptação a projetos contemporâneos em que continuidade, leitura de superfície e refinamento importam muito.",
    practical: "Na prática, ele ajuda a criar ambientes mais claros, mais acolhedores e visualmente mais nobres, com uma estética inspirada em pedras de alto valor percebido e excelente facilidade de composição.",
    value: "É um investimento que vale a pena porque entrega uma base muito sofisticada, luminosa e elegante, capaz de valorizar marcenaria, metais, iluminação e arquitetura de forma imediata.",
    indicationTitle: "Cozinhas, ilhas e painéis claros de alto padrão",
    indicationText: "Excelente para quem quer uma superfície clara com visual refinado, leitura premium e forte apelo estético no projeto.",
    benefitTitle: "Leveza visual com forte percepção de sofisticação",
    benefitText: "Ajuda o ambiente a parecer mais claro, mais amplo e mais valorizado, com uma leitura elegante e atual.",
    executionTitle: "Materiais claros exigem rigor visual na execução",
    executionText: "No Sinth Taj, paginação, borda, recortes e integração com a luz do ambiente são decisivos para o resultado final parecer realmente premium.",
    seoDescription: "Sinth Taj em São Paulo para cozinhas, ilhas, painéis e lavabos sob medida. Superfície sinterizada clara premium com baixa absorção e visual sofisticado.",
  },
  "nero-marquina": {
    intro: "Sinth Nero Marquina é indicado para quem quer uma superfície escura, sofisticada e de forte presença visual para cozinhas, ilhas, lavabos e painéis de linguagem premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, ótima estabilidade visual e excelente adequação a projetos sob medida que pedem contraste, profundidade e desenho marcante.",
    practical: "Na prática, ele ajuda a criar ambientes mais impactantes, elegantes e autorais, funcionando muito bem com marcenaria amadeirada, metais escovados, preto fosco e iluminação bem planejada.",
    value: "É um investimento que vale a pena porque entrega contraste, presença e uma leitura visual muito valorizada em projetos de arquitetura de interiores com proposta sofisticada.",
    indicationTitle: "Cozinhas, ilhas, painéis e lavabos escuros premium",
    indicationText: "Ideal para quem quer uma superfície preta com veio marcante, presença forte e excelente valor estético no conjunto.",
    benefitTitle: "Contraste que dá protagonismo ao ambiente",
    benefitText: "Ajuda o projeto a parecer mais elegante, mais arquitetônico e visualmente mais exclusivo.",
    executionTitle: "Superfícies escuras pedem detalhe impecável",
    executionText: "No Nero Marquina, borda, recortes e diálogo com iluminação e marcenaria são fundamentais para sustentar o aspecto premium.",
    seoDescription: "Sinth Nero Marquina em São Paulo para cozinhas, ilhas, painéis e lavabos sob medida. Superfície sinterizada preta premium com baixa absorção e visual sofisticado.",
  },
  calacatta: {
    intro: "Sinth Calacatta é indicado para quem quer uma superfície clara marmorizada, elegante e muito valorizada para cozinhas, ilhas, painéis e banheiros contemporâneos.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção, excelente estabilidade visual e ótimo desempenho para projetos sob medida em que desenho, leitura de veio e acabamento são decisivos.",
    practical: "Na prática, ele ajuda a criar ambientes mais sofisticados, luminosos e bem resolvidos, com a imponência do marmorizado e a conveniência de uma superfície tecnológica.",
    value: "É um investimento que vale a pena porque entrega imagem de alto padrão, forte apelo visual e excelente harmonização com marcenaria clara, amadeirada ou metálica.",
    indicationTitle: "Cozinhas, ilhas e painéis marmorizados premium",
    indicationText: "Excelente para quem quer uma leitura clara, elegante e de grande presença visual no projeto.",
    benefitTitle: "Marmorizado sofisticado com imagem contemporânea",
    benefitText: "Ajuda o ambiente a parecer mais nobre, mais leve e muito mais valorizado visualmente.",
    executionTitle: "Marmorizados pedem paginação e recorte bem resolvidos",
    executionText: "No Sinth Calacatta, paginação, orientação do desenho e proporção dos planos são o que definem a percepção final de sofisticação.",
    seoDescription: "Sinth Calacatta em São Paulo para cozinhas, ilhas, painéis e banheiros sob medida. Superfície sinterizada marmorizada premium com baixa absorção e acabamento sofisticado.",
  },
  statuario: {
    intro: "Sinth Statuario é uma superfície indicada para quem quer um visual claro, elegante e muito refinado em cozinhas, ilhas, painéis e banheiros de proposta premium.",
    technical: "Em termos técnicos, trata-se de uma superfície sinterizada com baixa absorção, excelente estabilidade visual e ótima adaptação a projetos sob medida que pedem leitura clara e desenho sofisticado.",
    practical: "Na prática, ele ajuda a deixar o ambiente mais leve, mais luminoso e mais sofisticado, com um desenho marmorizado que transmite alto padrão sem excessos.",
    value: "É um investimento que vale a pena porque cria uma imagem nobre, limpa e valorizada, muito desejada em interiores de arquitetura contemporânea e elegante.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros e sofisticados",
    indicationText: "Excelente para quem quer uma superfície clara premium com visual elegante, limpo e de forte valor percebido.",
    benefitTitle: "Clareza com leitura premium e atemporal",
    benefitText: "Ajuda o espaço a parecer mais claro, mais organizado e mais sofisticado, com grande aceitação estética.",
    executionTitle: "Claros nobres exigem execução visual rigorosa",
    executionText: "No Statuario, borda, paginação, recortes e integração com iluminação são determinantes para o resultado parecer realmente refinado.",
    seoDescription: "Sinth Statuario em São Paulo para cozinhas, ilhas, banheiros e painéis sob medida. Superfície sinterizada clara premium com baixa absorção e visual sofisticado.",
  },
  "super-white-fosco": {
    intro: "Sinth Super White Fosco é indicado para quem quer uma superfície clara, contemporânea e muito elegante para cozinhas, ilhas, banheiros e lavabos com linguagem minimalista premium.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção e ótima estabilidade visual, indicada para projetos sob medida que buscam uniformidade, leveza e leitura sofisticada sem brilho excessivo.",
    practical: "Na prática, ele ajuda a criar ambientes mais leves, silenciosos e arquitetonicamente maduros, com uma superfície clara que valoriza marcenaria, iluminação e metais de forma equilibrada.",
    value: "É um investimento que vale a pena porque entrega elegância discreta, sensação de organização visual e forte percepção de projeto contemporâneo bem resolvido.",
    indicationTitle: "Cozinhas, ilhas e banheiros claros de linguagem minimalista",
    indicationText: "Ideal para quem quer uma superfície clara premium com acabamento fosco e leitura contemporânea refinada.",
    benefitTitle: "Elegância silenciosa e muito atual",
    benefitText: "Ajuda o ambiente a parecer mais calmo, mais sofisticado e mais coerente com um design de alto padrão.",
    executionTitle: "Foscos claros valorizam muito a precisão da execução",
    executionText: "No Super White Fosco, borda, paginação e integração com o restante do projeto são o que sustentam a percepção final de qualidade.",
    seoDescription: "Sinth Super White Fosco em São Paulo para cozinhas, ilhas, banheiros e lavabos sob medida. Superfície sinterizada clara premium com baixa absorção e acabamento fosco sofisticado.",
  },
  black: {
    intro: "Sinth Black é indicado para quem quer uma superfície escura, uniforme e muito sofisticada para cozinhas, ilhas, painéis e lavabos de linguagem contemporânea.",
    technical: "Em termos técnicos, é uma superfície sinterizada de baixa absorção e ótima estabilidade visual, adequada para projetos sob medida que pedem uma leitura escura mais limpa e contínua.",
    practical: "Na prática, ele ajuda a criar espaços mais sofisticados, equilibrados e visualmente fortes, funcionando muito bem com madeira natural, metais pretos e iluminação quente.",
    value: "É um investimento que vale a pena porque entrega contraste, sobriedade e uma leitura arquitetônica elegante, muito valorizada em interiores de alto padrão.",
    indicationTitle: "Cozinhas, ilhas e painéis escuros e contemporâneos",
    indicationText: "Excelente para quem quer uma superfície preta premium, uniforme e com forte presença visual.",
    benefitTitle: "Contraste sofisticado com leitura limpa",
    benefitText: "Ajuda o espaço a parecer mais maduro, mais elegante e visualmente mais forte sem excesso de informação.",
    executionTitle: "Superfícies escuras pedem integração visual de alto nível",
    executionText: "No Sinth Black, borda, paginação e relação com iluminação e marcenaria são o que fazem a superfície parecer realmente premium.",
    seoDescription: "Sinth Black em São Paulo para cozinhas, ilhas, painéis e lavabos sob medida. Superfície sinterizada preta premium com baixa absorção e visual contemporâneo.",
  },
};

function getSinthMaterialCopy(item: CatalogItem | null): QuartzoEngenhariaMaterialCopy {
  if (!item) {
    return {
      intro: "Sinth é uma superfície sinterizada indicada para cozinhas, ilhas, banheiros, painéis e lavabos que pedem linguagem contemporânea, baixa absorção e forte percepção de acabamento premium.",
      technical: "Em termos técnicos, trata-se de uma superfície sinterizada de baixa absorção, ótima estabilidade visual e excelente adaptação a projetos sob medida em que desenho, proporção e acabamento são determinantes.",
      practical: "Na prática, isso significa uma superfície que ajuda a construir ambientes mais sofisticados, mais atuais e muito bem resolvidos, com leitura arquitetônica madura e elegante.",
      value: "É um investimento que vale a pena porque combina estética contemporânea, percepção de tecnologia e forte valorização visual do ambiente em bancadas, ilhas e painéis sob medida.",
      indicationTitle: "Cozinhas, ilhas, banheiros, lavabos e painéis contemporâneos",
      indicationText: "Excelente para quem busca uma superfície premium de linguagem atual, com ótimo valor percebido e visual sofisticado.",
      benefitTitle: "Imagem premium com estética limpa e arquitetônica",
      benefitText: "Entrega um ambiente mais elegante, mais atual e com forte percepção de projeto bem pensado.",
      executionTitle: "Sinterizado premium pede leitura completa do conjunto",
      executionText: "No Sinth, borda, paginação, recortes e integração com marcenaria, iluminação e metais são fundamentais para o nível final da entrega.",
    };
  }

  return SINTH_MATERIAL_COPY[normalizeSinthSlug(item.name)] || {
    intro: `${item.name} é uma superfície sinterizada indicada para quem quer uma bancada, ilha, painel, banheiro ou lavabo com linguagem contemporânea, visual sofisticado e forte percepção de acabamento premium.`,
    technical: `Em termos técnicos, ${item.name} reúne as qualidades mais valorizadas das superfícies sinterizadas para projetos sob medida: baixa absorção, ótima estabilidade visual e excelente adaptação a composições contemporâneas.`,
    practical: `Na prática, ele ajuda a construir ambientes mais elegantes, mais atuais e muito bem resolvidos, com uma superfície que reforça a imagem premium do projeto.`,
    value: `${item.name} agrega valor porque combina estética forte, linguagem contemporânea e uma percepção de tecnologia e sofisticação muito valorizada em bancadas, ilhas e painéis sob medida.`,
    indicationTitle: "Cozinhas, ilhas, painéis, banheiros e superfícies premium sob medida",
    indicationText: "Excelente para quem busca uma superfície contemporânea, sofisticada e com forte valor percebido no projeto.",
    benefitTitle: "Imagem premium com leitura contemporânea",
    benefitText: "Ajuda o ambiente a parecer mais atual, mais elegante e mais valorizado visualmente.",
    executionTitle: "Detalhe técnico e visual precisam andar juntos",
    executionText: "No Sinth, paginação visual, borda, recortes e integração com o conjunto são o que fazem a superfície parecer realmente premium.",
  };
}

export function App() {
  const page = useQueryPage();
  const quartzitoSlug = useQuartzitoSlug();
  const granitoSlug = useGranitoSlug();
  const marmoreSlug = useMarmoreSlug();
  const silestoneSlug = useSilestoneSlug();
  const quartzoStoneSlug = useQuartzoStoneSlug();
  const dektonSlug = useDektonSlug();
  const sinthSlug = useSinthSlug();
  const visible = useMemo(() => new Set(ROUTES[page] || ROUTES.home), [page]);

  const quartzitoItems = useMemo(() => ASSETS.catalog.quartzitos || [], []);
  const quartzitoBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of quartzitoItems) map.set(normalizeQuartzitoSlug(item.name), item);
    return map;
  }, [quartzitoItems]);
  const currentQuartzitoItem = useMemo(() => quartzitoBySlug.get(quartzitoSlug) || null, [quartzitoBySlug, quartzitoSlug]);
  const currentQuartzitoContent = useMemo(() => getQuartzitoMaterialCopy(currentQuartzitoItem), [currentQuartzitoItem]);

  const granitoItems = useMemo(() => ASSETS.catalog.granitos || [], []);
  const granitoBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of granitoItems) map.set(normalizeGranitoSlug(item.name), item);
    return map;
  }, [granitoItems]);
  const currentGranitoItem = useMemo(() => granitoBySlug.get(granitoSlug) || null, [granitoBySlug, granitoSlug]);
  const currentGranitoContent = useMemo(() => getGranitoMaterialCopy(currentGranitoItem), [currentGranitoItem]);

  const marmoreItems = useMemo(() => ASSETS.catalog.marmores || [], []);
  const marmoreBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of marmoreItems) map.set(normalizeMarmoreSlug(item.name), item);
    return map;
  }, [marmoreItems]);
  const currentMarmoreItem = useMemo(() => marmoreBySlug.get(marmoreSlug) || null, [marmoreBySlug, marmoreSlug]);
  const currentMarmoreContent = useMemo(() => getMarmoreMaterialCopy(currentMarmoreItem), [currentMarmoreItem]);

  const silestoneItems = useMemo(() => (ASSETS.catalog.quartzo || []).filter((item) => item.name.toLowerCase().startsWith("silestone ")), []);
  const silestoneBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of silestoneItems) map.set(normalizeSilestoneSlug(item.name), item);
    return map;
  }, [silestoneItems]);
  const currentSilestoneItem = useMemo(() => silestoneBySlug.get(silestoneSlug) || null, [silestoneBySlug, silestoneSlug]);
  const currentSilestoneContent = useMemo(() => getSilestoneMaterialCopy(currentSilestoneItem), [currentSilestoneItem]);

  const quartzoStoneItems = useMemo(() => (ASSETS.catalog.quartzo || []).filter((item) => item.name.toLowerCase().startsWith("quartzo stone ")), []);
  const quartzoStoneBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of quartzoStoneItems) map.set(normalizeQuartzoStoneSlug(item.name), item);
    return map;
  }, [quartzoStoneItems]);
  const currentQuartzoStoneItem = useMemo(() => quartzoStoneBySlug.get(quartzoStoneSlug) || null, [quartzoStoneBySlug, quartzoStoneSlug]);
  const currentQuartzoStoneContent = useMemo(() => getQuartzoStoneMaterialCopy(currentQuartzoStoneItem), [currentQuartzoStoneItem]);

  const dektonItems = useMemo(() => ASSETS.catalog.dekton || [], []);
  const dektonBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of dektonItems) map.set(normalizeDektonSlug(item.name), item);
    return map;
  }, [dektonItems]);
  const currentDektonItem = useMemo(() => dektonBySlug.get(dektonSlug) || null, [dektonBySlug, dektonSlug]);
  const currentDektonContent = useMemo(() => getDektonMaterialCopy(currentDektonItem), [currentDektonItem]);

  const sinthItems = useMemo(() => ASSETS.catalog.sinth || [], []);
  const sinthBySlug = useMemo(() => {
    const map = new Map<string, CatalogItem>();
    for (const item of sinthItems) map.set(normalizeSinthSlug(item.name), item);
    return map;
  }, [sinthItems]);
  const currentSinthItem = useMemo(() => sinthBySlug.get(sinthSlug) || null, [sinthBySlug, sinthSlug]);
  const currentSinthContent = useMemo(() => getSinthMaterialCopy(currentSinthItem), [currentSinthItem]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [produtosHubSeed, setProdutosHubSeed] = useState<number>(() => Date.now());
  const [quartzoHubSeed, setQuartzoHubSeed] = useState<number>(() => Date.now());

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

  const pickSeeded = (items: CatalogItem[], key: string, seed: number) => {
    if (!items || items.length === 0) return null;
    const rng = mulberry32((seed ^ hash32(key)) >>> 0);
    const idx = Math.floor(rng() * items.length);
    return items[Math.min(Math.max(idx, 0), items.length - 1)] || null;
  };

  const quartzitoSuggestions = useMemo(() => {
    if (!currentQuartzitoItem) return [] as CatalogItem[];
    const pool = quartzitoItems.filter((it) => normalizeQuartzitoSlug(it.name) !== normalizeQuartzitoSlug(currentQuartzitoItem.name));
    const rng = mulberry32(hash32(`quartzito-suggestions:${normalizeQuartzitoSlug(currentQuartzitoItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentQuartzitoItem, quartzitoItems]);

  const granitoSuggestions = useMemo(() => {
    if (!currentGranitoItem) return [] as CatalogItem[];
    const pool = granitoItems.filter((it) => normalizeGranitoSlug(it.name) !== normalizeGranitoSlug(currentGranitoItem.name));
    const rng = mulberry32(hash32(`granito-suggestions:${normalizeGranitoSlug(currentGranitoItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentGranitoItem, granitoItems]);

  const marmoreSuggestions = useMemo(() => {
    if (!currentMarmoreItem) return [] as CatalogItem[];
    const pool = marmoreItems.filter((it) => normalizeMarmoreSlug(it.name) !== normalizeMarmoreSlug(currentMarmoreItem.name));
    const rng = mulberry32(hash32(`marmore-suggestions:${normalizeMarmoreSlug(currentMarmoreItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentMarmoreItem, marmoreItems]);

  const silestoneSuggestions = useMemo(() => {
    if (!currentSilestoneItem) return [] as CatalogItem[];
    const pool = silestoneItems.filter((it) => normalizeSilestoneSlug(it.name) !== normalizeSilestoneSlug(currentSilestoneItem.name));
    const rng = mulberry32(hash32(`silestone-suggestions:${normalizeSilestoneSlug(currentSilestoneItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentSilestoneItem, silestoneItems]);

  const quartzoStoneSuggestions = useMemo(() => {
    if (!currentQuartzoStoneItem) return [] as CatalogItem[];
    const pool = quartzoStoneItems.filter((it) => normalizeQuartzoStoneSlug(it.name) !== normalizeQuartzoStoneSlug(currentQuartzoStoneItem.name));
    const rng = mulberry32(hash32(`quartzo-stone-suggestions:${normalizeQuartzoStoneSlug(currentQuartzoStoneItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentQuartzoStoneItem, quartzoStoneItems]);

  const dektonSuggestions = useMemo(() => {
    if (!currentDektonItem) return [] as CatalogItem[];
    const pool = dektonItems.filter((it) => normalizeDektonSlug(it.name) !== normalizeDektonSlug(currentDektonItem.name));
    const rng = mulberry32(hash32(`dekton-suggestions:${normalizeDektonSlug(currentDektonItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentDektonItem, dektonItems]);

  const sinthSuggestions = useMemo(() => {
    if (!currentSinthItem) return [] as CatalogItem[];
    const pool = sinthItems.filter((it) => normalizeSinthSlug(it.name) !== normalizeSinthSlug(currentSinthItem.name));
    const rng = mulberry32(hash32(`sinth-suggestions:${normalizeSinthSlug(currentSinthItem.name)}`));
    const items = [...pool];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, 6);
  }, [currentSinthItem, sinthItems]);

  const produtosHubCards = useMemo(() => {
    const mk = (cfg: { p: PageKey; label: string; desc: string; items: CatalogItem[]; fallback: string; key: string }) => {
      const it = pickSeeded(cfg.items || [], cfg.key, produtosHubSeed);
      const img = it?.sample || it?.applied || cfg.fallback;
      const fallbackSrcs = Array.from(new Set([it?.sample, it?.applied, cfg.fallback].filter(Boolean) as string[]));
      return { p: cfg.p, label: cfg.label, desc: cfg.desc, img, fallbackSrcs };
    };

    const laminasAll = [...(ASSETS.catalog.dekton || []), ...(ASSETS.catalog.neolith || []), ...(ASSETS.catalog.sinth || [])];

    return [
      mk({ p: "marmores", label: "Mármores", desc: "Veios marcantes e elegância clássica", items: ASSETS.catalog.marmores || [], fallback: ASSETS.produtosHub.marmores, key: "marmores" }),
      mk({ p: "granitos", label: "Granitos", desc: "Alta resistência para uso intenso", items: ASSETS.catalog.granitos || [], fallback: ASSETS.produtosHub.granitos, key: "granitos" }),
      mk({ p: "quartzitos", label: "Quartzitos", desc: "Beleza natural + resistência superior", items: ASSETS.catalog.quartzitos || [], fallback: ASSETS.produtosHub.quartzitos, key: "quartzitos" }),
      mk({ p: "quartzo", label: "Quartzo", desc: "Visual uniforme + praticidade", items: ASSETS.catalog.quartzo || [], fallback: ASSETS.produtosHub.quartzo, key: "quartzo" }),
      mk({ p: "limestone", label: "Limestone", desc: "Tons quentes e textura sofisticada", items: ASSETS.catalog.limestone || [], fallback: ASSETS.produtosHub.limestone, key: "limestone" }),
      mk({ p: "onix", label: "Ônix", desc: "Efeito translúcido e impacto máximo", items: ASSETS.catalog.onix || [], fallback: ASSETS.produtosHub.onix, key: "onix" }),
      mk({ p: "laminas", label: "Lâminas", desc: "Dekton • Neolith • Sinth", items: laminasAll, fallback: ASSETS.laminasHub.dekton, key: "laminas" }),
      mk({ p: "aglostone", label: "Prime Stone", desc: "Composto de mármore (não recomendado para cozinha)", items: ASSETS.catalog.aglostone || [], fallback: ASSETS.produtosHub.aglostone, key: "aglostone" }),
    ];
  }, [produtosHubSeed]);

  const quartzitosDecorTips = useMemo(
    () => [
      "Em cozinhas pequenas, quartzitos claros (Taj Mahal, Mont Blanc) ampliam a luz e deixam o ambiente mais ‘caro’ sem pesar.",
      "Quer um resultado premium? Combine quartzito com iluminação quente (2700–3000K) e marcenaria em tons naturais. O veio vira protagonista com elegância.",
      "Quartzitos verdes (Pantanal, Bamboo, Emerald) ficam impecáveis com metais escovados (inox, champagne) e madeira nogueira/carvalho.",
      "Para bancadas longas, o segredo não é só a pedra: é a paginação do veio + emendas planejadas. É isso que faz parecer peça única.",
      "Se você quer ‘design de revista’ com rotina real, prefira quartzito ao mármore na cozinha: estética orgânica com muito mais resistência.",
      "Acabamento acetinado/leather é lindo e esconde marcas, mas pede impermeabilização bem feita e limpeza suave (detergente neutro).",
      "Quartzitos escuros (Negresco, Wakanda Black) ficam mais sofisticados quando a cozinha tem boa luz: pendentes e fitas de LED fazem a pedra ‘acender’.",
      "Em ilha gourmet, uma borda mais robusta (meia‑esquadria 45º) muda o nível do projeto na primeira olhada.",
    ] as const,
    []
  );
  const quartzitosTipStorageKey = "douro_quartzitos_tip_idx";
  const [quartzitosDecorTipIdx, setQuartzitosDecorTipIdx] = useState(0);
  const quartzitosDecorTip = quartzitosDecorTips[quartzitosDecorTipIdx] || quartzitosDecorTips[0] || "";
  const advanceQuartzitosTip = () => {
    const len = quartzitosDecorTips.length;
    if (!len) return;
    setQuartzitosDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(quartzitosTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const limestoneDecorTips = useMemo(
    () => [
      "Limestone traz um visual orgânico e acolhedor. Fica perfeito com madeira clara, palhinha e iluminação quente.",
      "Para áreas molhadas, combine com impermeabilização bem feita e limpeza suave (detergente neutro).",
      "Em projetos contemporâneos, limestone em acabamento acetinado/levigado deixa o ambiente mais elegante e ‘silencioso’.",
      "Tons bege e creme ficam mais ‘premium’ com metais champagne/inox escovado; tons azulados pedem paleta mais neutra para destacar a pedra.",
      "O segredo do limestone é a composição: ele funciona melhor quando o resto do ambiente deixa a textura aparecer (pouco contraste, boa luz).",
    ] as const,
    []
  );
  const limestoneTipStorageKey = "douro_limestone_tip_idx";
  const [limestoneDecorTipIdx, setLimestoneDecorTipIdx] = useState(0);
  const limestoneDecorTip = limestoneDecorTips[limestoneDecorTipIdx] || limestoneDecorTips[0] || "";
  const advanceLimestoneTip = () => {
    const len = limestoneDecorTips.length;
    if (!len) return;
    setLimestoneDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(limestoneTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const onixDecorTips = useMemo(
    () => [
      "Ônix fica ‘absurdo’ com backlight (iluminação por trás). Use em painéis, bares e lavabos para criar efeito de joia.",
      "Para um resultado de alto padrão, planeje o painel com paginação (desenho do veio) e iluminação quente (2700–3000K).",
      "Ônix é protagonista: combine com marcenaria mais neutra e metais escovados para não ‘brigar’ com o desenho.",
      "Em áreas molhadas, o que define durabilidade é selagem/impermeabilização + uso correto (limpeza suave, sem ácido).",
      "Quer um visual mais contemporâneo? Ônix branco/estriado com linhas retas e cortes limpos dá efeito minimalista premium.",
    ] as const,
    []
  );
  const onixTipStorageKey = "douro_onix_tip_idx";
  const [onixDecorTipIdx, setOnixDecorTipIdx] = useState(0);
  const onixDecorTip = onixDecorTips[onixDecorTipIdx] || onixDecorTips[0] || "";
  const advanceOnixTip = () => {
    const len = onixDecorTips.length;
    if (!len) return;
    setOnixDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(onixTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const silestoneDecorTips = useMemo(
    () => [
      "Em cozinha com luz fria, tons quentes (como Bronze Rivers) ficam mais elegantes. Em luz quente, brancos marmorizados ganham profundidade sem “estourar” o ambiente.",
      "Para ilha gourmet, o que muda o nível do quartzo não é só a cor: é borda bem planejada + recorte limpo + paginação (mesmo em material uniforme).",
      "Quartzo é perfeito para rotina, mas respeite o calor: use apoio para panela muito quente — isso mantém a peça bonita por anos.",
      "Quer um visual mais ‘caro’? Combine Silestone claro com metais escovados (inox/champagne) e marcenaria em madeira natural. O contraste faz a bancada ‘assinar’ o ambiente.",
      "Antes de escolher uma cor, pense em 3 coisas: luz (quente/fria), marcenaria (clara/escura) e nível de manutenção que você quer (brancos mostram mais migalhas; tons médios são campeões de praticidade).",
    ] as const,
    []
  );
  const silestoneTipStorageKey = "douro_silestone_tip_idx";
  const [silestoneDecorTipIdx, setSilestoneDecorTipIdx] = useState(0);
  const silestoneDecorTip = silestoneDecorTips[silestoneDecorTipIdx] || silestoneDecorTips[0] || "";
  const advanceSilestoneTip = () => {
    const len = silestoneDecorTips.length;
    if (!len) return;
    setSilestoneDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(silestoneTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const quartzoStoneDecorTips = useMemo(
    () => [
      "Quartzo é ideal para rotina: baixa porosidade e visual uniforme. Para manter perfeito, respeite o calor: use apoio para panela muito quente.",
      "Tons médios (cinzas e beges) são campeões de praticidade no dia a dia: disfarçam migalhas e marcas mais do que brancos puros.",
      "Quer um resultado mais premium? Combine quartzo com meia‑esquadria 45º, recortes limpos e uma paginação alinhada com marcenaria e metais.",
      "Em cozinhas com luz fria, tons mais quentes (fendi, bege) ficam mais elegantes. Em luz quente, brancos marmorizados ganham profundidade.",
      "Para uma ilha protagonista, escolha uma cor com textura (Stellar/Snowflakes) e use iluminação quente para a bancada ‘acender’.",
    ] as const,
    []
  );
  const quartzoStoneTipStorageKey = "douro_quartzostone_tip_idx";
  const [quartzoStoneDecorTipIdx, setQuartzoStoneDecorTipIdx] = useState(0);
  const quartzoStoneDecorTip = quartzoStoneDecorTips[quartzoStoneDecorTipIdx] || quartzoStoneDecorTips[0] || "";
  const advanceQuartzoStoneTip = () => {
    const len = quartzoStoneDecorTips.length;
    if (!len) return;
    setQuartzoStoneDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(quartzoStoneTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const primeStoneDecorTips = useMemo(
    () => [
      "Prime Stone é um composto de mármore: visual uniforme e acabamento consistente — excelente para ambientes internos de menor agressão.",
      "Não recomendamos Prime Stone para cozinha/área gourmet: ácidos (limão/vinagre), gordura e rotina intensa tendem a marcar/atacar com o tempo.",
      "Onde funciona melhor: lavabos, banheiros (uso controlado), painéis e tampos decorativos em áreas secas.",
      "Quer estética clara e rotina tranquila na cozinha? Prefira quartzo de engenharia (Silestone/Quartzo Stone), quartzito ou sinterizados (Dekton/Neolith).",
      "Se a escolha for Prime Stone, a beleza depende do uso correto: limpeza suave e proteção contra químicos/agressões.",
    ] as const,
    []
  );
  const primeStoneTipStorageKey = "douro_primestone_tip_idx";
  const [primeStoneDecorTipIdx, setPrimeStoneDecorTipIdx] = useState(0);
  const primeStoneDecorTip = primeStoneDecorTips[primeStoneDecorTipIdx] || primeStoneDecorTips[0] || "";
  const advancePrimeStoneTip = () => {
    const len = primeStoneDecorTips.length;
    if (!len) return;
    setPrimeStoneDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(primeStoneTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const granitosDecorTips = useMemo(
    () => [
      "Granito é a escolha do dia a dia: quando você quer cozinhar de verdade sem medo de mancha, risco bobo ou manutenção chata.",
      "Granitos escuros (São Gabriel, Via Láctea, Preto Absoluto) ficam impecáveis com metais pretos ou inox e marcenaria amadeirada — visual contemporâneo e fácil de manter.",
      "Granitos claros (Itaúnas, Dallas, Fortaleza) iluminam a cozinha e combinam com portas em laca/off-white. O segredo é impermeabilização bem feita e limpeza simples.",
      "Para um acabamento ‘de revista’, o que muda tudo é borda em meia‑esquadria 45º + emenda planejada. Granito pode ser extremamente premium.",
      "Quer esconder migalhas e poeira do dia a dia? Tons médios e mesclados (Santa Cecília, Capão Bonito, Siena) são campeões de praticidade.",
      "Em área gourmet/churrasqueira, granito é excelente: aguenta rotina intensa e tem ótimo custo-benefício frente a algumas superfícies tecnológicas.",
    ] as const,
    []
  );
  const granitosTipStorageKey = "douro_granitos_tip_idx";
  const [granitosDecorTipIdx, setGranitosDecorTipIdx] = useState(0);
  const granitosDecorTip = granitosDecorTips[granitosDecorTipIdx] || granitosDecorTips[0] || "";
  const advanceGranitosTip = () => {
    const len = granitosDecorTips.length;
    if (!len) return;
    setGranitosDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(granitosTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const marmoresDecorTips = useMemo(
    () => ["Mármore é para quem quer sensação de hotel boutique: use em lavatórios e painéis.", "O segredo do mármore não é só a chapa: é a paginação do veio."] as const,
    []
  );
  const marmoresTipStorageKey = "douro_marmores_tip_idx";
  const [marmoresDecorTipIdx, setMarmoresDecorTipIdx] = useState(0);
  const marmoresDecorTip = marmoresDecorTips[marmoresDecorTipIdx] || marmoresDecorTips[0] || "";
  const advanceMarmoresTip = () => {
    const len = marmoresDecorTips.length;
    if (!len) return;
    setMarmoresDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(marmoresTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const dektonDecorTips = useMemo(
    () => [
      "Dekton é perfeito para quem quer bancada bonita e ‘sem medo’: baixa porosidade, ótima resistência ao calor e excelente performance no dia a dia.",
      "Sinterizado é forte, mas borda pode lascar por impacto. Se a sua rotina é intensa, planeje quinas com raio e evite bater panela na quina.",
      "Para um visual premium, combine Dekton claro com metais escovados e iluminação quente. A superfície ‘acende’ e deixa o ambiente mais sofisticado.",
      "Vai usar em área externa? Sinterizados costumam performar muito bem em UV e variações de clima — ótimo para gourmet e fachada (conforme especificação).",
      "Escolha o acabamento pensando na limpeza: foscos e texturizados são lindos, mas pedem pano macio e detergente neutro (sem abrasivo).",
      "Em ilha grande, o que muda o resultado não é só a cor: é paginação + recortes + instalação nivelada. É isso que faz parecer peça única.",
    ] as const,
    []
  );
  const dektonTipStorageKey = "douro_dekton_tip_idx";
  const [dektonDecorTipIdx, setDektonDecorTipIdx] = useState(0);
  const dektonDecorTip = dektonDecorTips[dektonDecorTipIdx] || dektonDecorTips[0] || "";
  const advanceDektonTip = () => {
    const len = dektonDecorTips.length;
    if (!len) return;
    setDektonDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(dektonTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const sinthDecorTips = useMemo(() => ["Sinth é ideal para quem quer visual contemporâneo com praticidade.", "Acabamentos foscos são discretos; polidos dão ‘efeito joia’."] as const, []);
  const sinthTipStorageKey = "douro_sinth_tip_idx";
  const [sinthDecorTipIdx, setSinthDecorTipIdx] = useState(0);
  const sinthDecorTip = sinthDecorTips[sinthDecorTipIdx] || sinthDecorTips[0] || "";
  const advanceSinthTip = () => {
    const len = sinthDecorTips.length;
    if (!len) return;
    setSinthDecorTipIdx((prev) => {
      const next = (prev + 1) % len;
      try {
        localStorage.setItem(sinthTipStorageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const prevPageRef = useRef<PageKey | null>(null);
  useEffect(() => {
    const prev = prevPageRef.current;
    prevPageRef.current = page;

    const isQuartzitos = page === "quartzitos" || page === "quartzitos-2" || page === "quartzitos-3";
    const wasQuartzitos = prev === "quartzitos" || prev === "quartzitos-2" || prev === "quartzitos-3";
    const isGranitos = page === "granitos" || page === "granitos-2" || page === "granitos-3";
    const wasGranitos = prev === "granitos" || prev === "granitos-2" || prev === "granitos-3";
    const isMarmores = page === "marmores" || page === "marmores-2" || page === "marmores-3";
    const wasMarmores = prev === "marmores" || prev === "marmores-2" || prev === "marmores-3";
    const isSilestone = page === "silestone" || page === "silestone-2" || page === "silestone-3";
    const wasSilestone = prev === "silestone" || prev === "silestone-2" || prev === "silestone-3";
    const isDekton = page === "dekton" || page === "dekton-2" || page === "dekton-3";
    const wasDekton = prev === "dekton" || prev === "dekton-2" || prev === "dekton-3";
    const isSinth = page === "sinth" || page === "sinth-2" || page === "sinth-3";
    const wasSinth = prev === "sinth" || prev === "sinth-2" || prev === "sinth-3";
    const isOnix = page === "onix" || page === "onix-2";
    const wasOnix = prev === "onix" || prev === "onix-2";
    const isLimestone = page === "limestone" || page === "limestone-2" || page === "limestone-3";
    const wasLimestone = prev === "limestone" || prev === "limestone-2" || prev === "limestone-3";
    const isProdutos = page === "produtos";
    const wasProdutos = prev === "produtos";
    const isQuartzoHub = page === "quartzo";
    const wasQuartzoHub = prev === "quartzo";
    const isQuartzoStone = page === "quartzo-stone" || page === "quartzo-stone-2" || page === "quartzo-stone-3";
    const wasQuartzoStone = prev === "quartzo-stone" || prev === "quartzo-stone-2" || prev === "quartzo-stone-3";
    const isPrimeStone = page === "aglostone" || page === "aglostone-2" || page === "aglostone-3";
    const wasPrimeStone = prev === "aglostone" || prev === "aglostone-2" || prev === "aglostone-3";

    if (isProdutos && !wasProdutos) setProdutosHubSeed(Date.now());
    if (isQuartzoHub && !wasQuartzoHub) setQuartzoHubSeed(Date.now());

    const rotate = (key: string, len: number, setter: (idx: number) => void) => {
      if (!len) return;
      try {
        const raw = localStorage.getItem(key);
        const last = raw ? Number.parseInt(raw, 10) : -1;
        const lastSafe = Number.isFinite(last) ? last : -1;
        const next = (lastSafe + 1) % len;
        localStorage.setItem(key, String(next));
        setter(next);
      } catch {
        setter(0);
      }
    };

    if (isQuartzitos && !wasQuartzitos) rotate(quartzitosTipStorageKey, quartzitosDecorTips.length, setQuartzitosDecorTipIdx);
    if (isGranitos && !wasGranitos) rotate(granitosTipStorageKey, granitosDecorTips.length, setGranitosDecorTipIdx);
    if (isMarmores && !wasMarmores) rotate(marmoresTipStorageKey, marmoresDecorTips.length, setMarmoresDecorTipIdx);
    if (isSilestone && !wasSilestone) rotate(silestoneTipStorageKey, silestoneDecorTips.length, setSilestoneDecorTipIdx);
    if (isQuartzoStone && !wasQuartzoStone) rotate(quartzoStoneTipStorageKey, quartzoStoneDecorTips.length, setQuartzoStoneDecorTipIdx);
    if (isPrimeStone && !wasPrimeStone) rotate(primeStoneTipStorageKey, primeStoneDecorTips.length, setPrimeStoneDecorTipIdx);
    if (isDekton && !wasDekton) rotate(dektonTipStorageKey, dektonDecorTips.length, setDektonDecorTipIdx);
    if (isSinth && !wasSinth) rotate(sinthTipStorageKey, sinthDecorTips.length, setSinthDecorTipIdx);
    if (isLimestone && !wasLimestone) rotate(limestoneTipStorageKey, limestoneDecorTips.length, setLimestoneDecorTipIdx);
    if (isOnix && !wasOnix) rotate(onixTipStorageKey, onixDecorTips.length, setOnixDecorTipIdx);
  }, [
    page,
    quartzitosDecorTips,
    granitosDecorTips,
    marmoresDecorTips,
    dektonDecorTips,
    sinthDecorTips,
    silestoneDecorTips,
    quartzoStoneDecorTips,
    limestoneDecorTips,
    onixDecorTips,
  ]);

  const topBarRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const lightboxCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const [botOpen, setBotOpen] = useState(false);
  const botCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const aboutVideoSrc = ASSETS.about.video;
  const aboutAudioCandidates = useMemo(() => {
    const list = [
      ASSETS.about.audio,
      "/media/about/sobre-nos.mp3",
      "/media/about/sobre-nos",
      "https://douromarmores.com.br/media/about/sobre-nos.mp3",
      "https://douromarmores.com.br/media/about/sobre-nos",
    ].filter(Boolean) as string[];
    return Array.from(new Set(list));
  }, []);

  const [aboutAudioSrcIdx, setAboutAudioSrcIdx] = useState(0);
  const aboutAudioSrc = aboutAudioCandidates[aboutAudioSrcIdx];
  const aboutAudioSrcIdxRef = useRef(0);
  useEffect(() => {
    aboutAudioSrcIdxRef.current = aboutAudioSrcIdx;
  }, [aboutAudioSrcIdx]);

  const aboutAudioRef = useRef<HTMLAudioElement | null>(null);
  const [aboutAudioStatus, setAboutAudioStatus] = useState<"idle" | "playing" | "paused" | "error">("idle");
  const [aboutAudioErrorMsg, setAboutAudioErrorMsg] = useState<string | null>(null);
  const [aboutAudioProgress, setAboutAudioProgress] = useState<{ current: number; duration: number }>({ current: 0, duration: 0 });

  useEffect(() => {
    const a = aboutAudioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setAboutAudioStatus("idle");
    setAboutAudioProgress({ current: 0, duration: 0 });
  }, [aboutAudioSrc]);

  const formatAudioTime = (s: number) => {
    if (!Number.isFinite(s) || s <= 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const stopAboutAudio = () => {
    const a = aboutAudioRef.current;
    setAboutAudioErrorMsg(null);
    if (!a) {
      setAboutAudioStatus("idle");
      setAboutAudioProgress({ current: 0, duration: 0 });
      return;
    }
    a.pause();
    a.currentTime = 0;
    setAboutAudioStatus("idle");
    setAboutAudioProgress({ current: 0, duration: Number.isFinite(a.duration) ? a.duration : 0 });
  };

  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [ttsStatus, setTtsStatus] = useState<"idle" | "speaking" | "paused">("idle");
  const [ttsProgress, setTtsProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const ttsUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const ttsPartsRef = useRef<string[]>([]);
  const ttsIndexRef = useRef(0);
  const ttsCancelledRef = useRef(false);
  const ttsVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const sobreNosAudioParts = useMemo(
    () => [
      "Sobre nós.",
      "Respira fundo por um segundo. Sabe quando você entra em um ambiente… e sente na hora? Não é só bonito. É um silêncio bom. É um conforto que abraça. É presença.",
      "A gente acredita que casa é isso: um lugar que conta a sua história sem dizer uma palavra. E a pedra, quando é bem escolhida e bem colocada, vira parte dessa história. Ela não é um detalhe… ela é uma assinatura.",
      "Porque pedra é verdade. Veios que não se repetem. Profundidade. Textura. E aquela sensação de ‘uau’ que não vem de exagero — vem de harmonia.",
      "O nosso trabalho é transformar intenção em realidade. Da primeira conversa até o último ajuste, o objetivo é simples: você olhar e sentir… era exatamente isso.",
      "Para arquitetos: você traz a visão. Nós entramos com execução para que o desenho sobreviva ao mundo real — e fique ainda mais bonito quando a luz bate, quando a rotina começa, quando a casa é vivida.",
      "Para clientes finais: você não precisa saber o nome da pedra. Você só precisa ter certeza de uma coisa: você escolheu certo. E essa certeza é uma paz.",
      "A nossa inspiração vem do Douro, em Portugal. Um rio que serpenteia entre encostas de vinhas em socalcos — pedra sobre pedra — como se o tempo tivesse aprendido a desenhar.",
      "No Douro, os melhores vinhos não nascem da pressa. Nascem de escolhas silenciosas: a uva certa, o corte no momento certo, a espera certa. E então o vinho aparece… como um ouro líquido. Nobre. Vivo. Memorável.",
      "Com pedra, é a mesma filosofia. A natureza entrega a matéria‑prima com personalidade própria. Nós entramos com olhar, técnica e paciência — para revelar o que ela tem de mais bonito.",
      "E quando tudo encaixa… você não vê ‘obra’. Você vê um ambiente pronto. Leve. Elegante. Um lugar que dá orgulho. Um lugar que dá vontade de ficar.",
      "Se o vinho do Douro é ouro líquido, a nossa pedra é ouro sólido. Não pelo brilho. Mas pelo valor de durar… e de emocionar todos os dias.",
    ],
    []
  );

  useEffect(() => {
    if (!ttsSupported) return;
    const synth = window.speechSynthesis;

    const pickVoice = () => {
      try {
        const voices = synth.getVoices();
        const isPt = (v: SpeechSynthesisVoice) => (v.lang || "").toLowerCase().startsWith("pt");
        const isPtBr = (v: SpeechSynthesisVoice) => (v.lang || "").toLowerCase().startsWith("pt-br");

        const score = (v: SpeechSynthesisVoice) => {
          const name = (v.name || "").toLowerCase();
          const lang = (v.lang || "").toLowerCase();
          let s = 0;
          if (lang.startsWith("pt-br")) s += 100;
          else if (lang.startsWith("pt")) s += 60;
          if (name.includes("google")) s += 25;
          if (name.includes("microsoft")) s += 22;
          if (v.localService) s += 4;
          if (name.includes("compact")) s -= 8;
          return s;
        };

        const candidates = voices.filter((v) => isPt(v));
        if (candidates.length === 0) {
          ttsVoiceRef.current = null;
          return;
        }

        const bestPtBr = candidates.filter(isPtBr).sort((a, b) => score(b) - score(a))[0] || null;
        const bestAnyPt = candidates.sort((a, b) => score(b) - score(a))[0] || null;
        ttsVoiceRef.current = bestPtBr || bestAnyPt;
      } catch {
        ttsVoiceRef.current = null;
      }
    };

    pickVoice();
    synth.onvoiceschanged = () => pickVoice();
    return () => {
      synth.onvoiceschanged = null;
    };
  }, [ttsSupported]);

  const speakNextTtsPart = () => {
    if (!ttsSupported) return;
    const synth = window.speechSynthesis;
    const parts = ttsPartsRef.current;
    const idx = ttsIndexRef.current;
    if (ttsCancelledRef.current) return;

    if (idx >= parts.length) {
      ttsUtteranceRef.current = null;
      setTtsStatus("idle");
      setTtsProgress({ current: 0, total: parts.length || 0 });
      return;
    }

    const text = parts[idx] || "";
    const u = new SpeechSynthesisUtterance(text);
    const voice = ttsVoiceRef.current;
    u.lang = voice?.lang || "pt-BR";
    u.rate = 0.98;
    u.pitch = 1.03;
    u.volume = 1;
    if (voice) u.voice = voice;

    u.onend = () => {
      if (ttsCancelledRef.current) return;
      ttsIndexRef.current += 1;
      setTimeout(() => {
        if (ttsCancelledRef.current) return;
        speakNextTtsPart();
      }, 170);
    };

    u.onerror = () => {
      ttsUtteranceRef.current = null;
      setTtsStatus("idle");
    };

    ttsUtteranceRef.current = u;
    setTtsProgress({ current: idx + 1, total: parts.length });
    synth.speak(u);
  };

  const onTtsStop = () => {
    if (!ttsSupported) return;
    ttsCancelledRef.current = true;
    window.speechSynthesis.cancel();
    ttsUtteranceRef.current = null;
    ttsPartsRef.current = [];
    ttsIndexRef.current = 0;
    setTtsStatus("idle");
    setTtsProgress({ current: 0, total: 0 });
  };

  const onTtsMain = () => {
    if (!ttsSupported) return;
    const synth = window.speechSynthesis;
    if (ttsStatus === "speaking") {
      synth.pause();
      setTtsStatus("paused");
      return;
    }
    if (ttsStatus === "paused") {
      synth.resume();
      setTtsStatus("speaking");
      return;
    }

    onTtsStop();
    ttsCancelledRef.current = false;
    ttsPartsRef.current = sobreNosAudioParts;
    ttsIndexRef.current = 0;
    setTtsStatus("speaking");
    setTtsProgress({ current: 1, total: sobreNosAudioParts.length });

    setTimeout(() => {
      if (ttsCancelledRef.current) return;
      speakNextTtsPart();
    }, 60);
  };

  const onAboutAudioMain = async () => {
    const a = aboutAudioRef.current;
    if (!a) return;

    onTtsStop();

    try {
      if (aboutAudioStatus === "playing") {
        a.pause();
        setAboutAudioStatus("paused");
        return;
      }

      setAboutAudioErrorMsg(null);
      a.load();
      await a.play();
      setAboutAudioStatus("playing");
    } catch {
      setAboutAudioStatus("error");
      setAboutAudioErrorMsg(aboutAudioSrc ? `Não consegui reproduzir o áudio: ${aboutAudioSrc}` : "Não consegui reproduzir o áudio agora.");
    }
  };

  useEffect(() => {
    const topBar = topBarRef.current;
    const header = headerRef.current;
    if (!topBar || !header) return;

    const apply = () => {
      const topH = topBar.offsetHeight || 0;
      const headerH = header.offsetHeight || 0;
      const total = topH + headerH;
      document.documentElement.style.setProperty("--douro-topbar-h", `${topH}px`);
      document.documentElement.style.setProperty("--douro-header-h", `${headerH}px`);
      document.documentElement.style.setProperty("--douro-header-offset", `${total}px`);
    };

    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(topBar);
    ro.observe(header);
    window.addEventListener("resize", apply, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(() => ASSETS.hero.video);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("douroHeroVideo");
      if (saved && saved !== ASSETS.hero.video) setHeroVideoUrl(saved);
    } catch {
      // ignore
    }
  }, []);

  const openExternal = (url: string) => {
    try {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (w) return;
    } catch {
      // ignore
    }
    try {
      window.top?.location.assign(url);
    } catch {
      window.location.assign(url);
    }
  };

  const onNav = (next: PageKey, hash?: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    setQueryPage(next, hash);
  };

  const goToQuartzitoMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "quartzito-material");
    url.searchParams.set("slug", slug);
    url.hash = "#quartzito-material";
    history.pushState({ p: "quartzito-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToGranitoMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "granito-material");
    url.searchParams.set("slug", slug);
    url.hash = "#granito-material";
    history.pushState({ p: "granito-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToMarmoreMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "marmore-material");
    url.searchParams.set("slug", slug);
    url.hash = "#marmore-material";
    history.pushState({ p: "marmore-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToSilestoneMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "silestone-material");
    url.searchParams.set("slug", slug);
    url.hash = "#silestone-material";
    history.pushState({ p: "silestone-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToQuartzoStoneMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "quartzo-stone-material");
    url.searchParams.set("slug", slug);
    url.hash = "#quartzo-stone-material";
    history.pushState({ p: "quartzo-stone-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToDektonMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "dekton-material");
    url.searchParams.set("slug", slug);
    url.hash = "#dekton-material";
    history.pushState({ p: "dekton-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToSinthMaterial = (slug: string) => {
    stopAboutAudio();
    onTtsStop();
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("p", "sinth-material");
    url.searchParams.set("slug", slug);
    url.hash = "#sinth-material";
    history.pushState({ p: "sinth-material", slug }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const scrollOrRouteToHash = (hash: string) => {
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!id) return;
    if (!visible.has(id)) {
      onNav("home", `#${id}`);
      return;
    }
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    document.body.classList.add("scroll-smooth");
    return () => document.body.classList.remove("scroll-smooth");
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--hero-bg-image", `url('${ASSETS.hero.bgImage}')`);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 100);
      setShowScrollTop(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    stopAboutAudio();
    onTtsStop();

    const baseTitle = "Douro Mármores";
    const titles: Partial<Record<PageKey, string>> = {
      home: "Douro Mármores em São Paulo | Mármores, Granitos e Quartzo Premium",
      "sobre-nos": "Sobre a Douro Mármores | Marmoraria em São Paulo",
      "sobre-inspiracao": "Nossa Inspiração | Douro Mármores em São Paulo",
      "quem-somos": "Quem Somos | Marmoraria em São Paulo - Douro Mármores",
      "como-funciona": "Como Funciona | Marmoraria em São Paulo - Douro Mármores",
      produtos: "Produtos | Mármores, Granitos e Quartzo em São Paulo",
      marmores: "Mármores em São Paulo | Catálogo Douro Mármores",
      "marmores-2": "Mármores em São Paulo | Catálogo 2 | Douro Mármores",
      "marmores-3": "Mármores em São Paulo | Catálogo 3 | Douro Mármores",
      granitos: "Granitos em São Paulo | Catálogo Douro Mármores",
      "granitos-2": "Granitos em São Paulo | Catálogo 2 | Douro Mármores",
      "granitos-3": "Granitos em São Paulo | Catálogo 3 | Douro Mármores",
      quartzo: "Quartzo em São Paulo | Marcas e Cores Premium",
      silestone: "Silestone em São Paulo | Quartzo Premium Douro Mármores",
      "silestone-2": "Silestone em São Paulo | Catálogo 2 | Douro Mármores",
      "silestone-3": "Silestone em São Paulo | Catálogo 3 | Douro Mármores",
      "quartzo-stone": "Quartzo Stone em São Paulo | Catálogo Douro Mármores",
      "quartzo-stone-2": "Quartzo Stone em São Paulo | Catálogo 2 | Douro Mármores",
      "quartzo-stone-3": "Quartzo Stone em São Paulo | Catálogo 3 | Douro Mármores",
      quartzitos: "Quartzitos em São Paulo | Catálogo Douro Mármores",
      "quartzitos-2": "Quartzitos (2) | Catálogo | Douro Mármores",
      "quartzitos-3": "Quartzitos (3) | Catálogo | Douro Mármores",
      limestone: "Limestone | Catálogo | Douro Mármores",
      "limestone-2": "Limestone (2) | Catálogo | Douro Mármores",
      "limestone-3": "Limestone (3) | Catálogo | Douro Mármores",
      onix: "Ônix | Catálogo | Douro Mármores",
      "onix-2": "Ônix (2) | Catálogo | Douro Mármores",
      laminas: "Lâminas | Marcas Premium | Douro Mármores",
      dekton: "Dekton | Cores | Douro Mármores",
      "dekton-2": "Dekton (2) | Cores | Douro Mármores",
      "dekton-3": "Dekton (3) | Cores | Douro Mármores",
      neolith: "Neolith | Cores | Douro Mármores",
      sinth: "Sinth | Cores | Douro Mármores",
      "sinth-2": "Sinth (2) | Cores | Douro Mármores",
      "sinth-3": "Sinth (3) | Cores | Douro Mármores",
      aglostone: "Prime Stone | Catálogo | Douro Mármores",
      projetos: "Projetos | Douro Mármores",
      depoimentos: "Depoimentos de Clientes | Douro Mármores",
      duvidas: "Dúvidas Frequentes | Marmoraria em São Paulo",
      blog: "Blog de Marmoraria, Decoração e Arquitetura | Douro Mármores",
      contato: "Contato | Orçamento de Marmoraria em São Paulo",
      logo: "Logomarca | Douro Mármores",
      "regioes-servicos": "Regiões e Serviços em São Paulo | Douro Mármores",
      "marmoraria-campo-belo": "Marmoraria no Campo Belo | Douro Mármores",
      "marmoraria-vila-olimpia": "Marmoraria na Vila Olímpia | Douro Mármores",
      "marmoraria-itaim-bibi": "Marmoraria no Itaim Bibi | Douro Mármores",
      "marmoraria-perdizes": "Marmoraria em Perdizes | Douro Mármores",
      "marmoraria-pompeia": "Marmoraria na Pompeia | Douro Mármores",
      "marmoraria-tatuape": "Marmoraria no Tatuapé | Douro Mármores",
      "marmoraria-ipiranga": "Marmoraria no Ipiranga | Douro Mármores",
      "marmoraria-vila-sonia": "Marmoraria na Vila Sônia | Douro Mármores",
      "marmoraria-vila-andrade": "Marmoraria na Vila Andrade | Douro Mármores",
      "marmoraria-bela-vista": "Marmoraria na Bela Vista | Douro Mármores",
      "marmoraria-jardim-europa": "Marmoraria no Jardim Europa | Douro Mármores",
      "marmoraria-jardim-america": "Marmoraria no Jardim América | Douro Mármores",
      "marmoraria-higienopolis": "Marmoraria em Higienópolis | Douro Mármores",
      "marmoraria-mooca": "Marmoraria na Mooca | Douro Mármores",
      "marmoraria-anhangabau": "Marmoraria no Anhangabaú | Douro Mármores",
      "marmoraria-vila-leopoldina": "Marmoraria na Vila Leopoldina | Douro Mármores",
      "marmoraria-vila-madalena": "Marmoraria na Vila Madalena | Douro Mármores",
      "marmoraria-cerqueira-cesar": "Marmoraria em Cerqueira César | Douro Mármores",
      "marmoraria-sumare": "Marmoraria no Sumaré | Douro Mármores",
      "marmoraria-socorro": "Marmoraria no Socorro | Douro Mármores",
      "marmoraria-alto-da-boa-vista": "Marmoraria no Alto da Boa Vista | Douro Mármores",
      "marmoraria-vila-suzana": "Marmoraria na Vila Suzana | Douro Mármores",
      "marmoraria-vila-santa-catarina": "Marmoraria na Vila Santa Catarina | Douro Mármores",
      "marmoraria-jardim-marajoara": "Marmoraria no Jardim Marajoara | Douro Mármores",
      "marmoraria-chacara-flora": "Marmoraria na Chácara Flora | Douro Mármores",
      "marmoraria-jurubatuba": "Marmoraria em Jurubatuba | Douro Mármores",
      "marmoraria-campo-grande": "Marmoraria no Campo Grande | Douro Mármores",
      "marmoraria-mirandopolis": "Marmoraria em Mirandópolis | Douro Mármores",
      "marmoraria-veleiros": "Marmoraria em Veleiros | Douro Mármores",
      "marmoraria-vila-cordeiro": "Marmoraria na Vila Cordeiro | Douro Mármores",
      "marmoraria-vila-cruzeiro": "Marmoraria na Vila Cruzeiro | Douro Mármores",
      "marmoraria-jardim-guedala": "Marmoraria no Jardim Guedala | Douro Mármores",
      "marmoraria-vila-gumercindo": "Marmoraria na Vila Gumercindo | Douro Mármores",
      "marmoraria-aconchego-da-zona-sul": "Marmoraria na Zona Sul de São Paulo | Douro Mármores",
      "bancada-quartzito-sao-paulo": "Bancada em Quartzito em São Paulo | Douro Mármores",
      "bancada-dekton-sao-paulo": "Bancada em Dekton em São Paulo | Douro Mármores",
      "bancada-silestone-sao-paulo": "Bancada em Silestone em São Paulo | Douro Mármores",
      "ilha-cozinha-quartzito-sao-paulo": "Ilha de Cozinha em Quartzito em São Paulo | Douro Mármores",
      "escada-granito-sao-paulo": "Escada em Granito em São Paulo | Douro Mármores",
      "lavabo-onix-sao-paulo": "Lavabo em Ônix em São Paulo | Douro Mármores",
      "painel-quartzito-sao-paulo": "Painel em Quartzito em São Paulo | Douro Mármores",
      "pia-cozinha-granito-sao-paulo": "Pia de Cozinha em Granito em São Paulo | Douro Mármores",
      "bancada-quartzo-branco-sao-paulo": "Bancada de Quartzo Branco em São Paulo | Douro Mármores",
      "bancada-preto-sao-gabriel-sao-paulo": "Bancada em Preto São Gabriel em São Paulo | Douro Mármores",
      "cuba-esculpida-marmore-sao-paulo": "Cuba Esculpida em Mármore em São Paulo | Douro Mármores",
      "lavatorio-quartzito-sao-paulo": "Lavatório em Quartzito em São Paulo | Douro Mármores",
      "ilha-dekton-sao-paulo": "Ilha em Dekton em São Paulo | Douro Mármores",
      "churrasqueira-quartzito-sao-paulo": "Churrasqueira em Quartzito em São Paulo | Douro Mármores",
      "revestimento-lareira-marmore-sao-paulo": "Revestimento de Lareira em Mármore em São Paulo | Douro Mármores",
      "escada-quartzito-sao-paulo": "Escada em Quartzito em São Paulo | Douro Mármores",
      "bancada-porcelanato-sao-paulo": "Bancada em Porcelanato em São Paulo | Douro Mármores",
      "bancada-area-gourmet-sao-paulo": "Bancada para Área Gourmet em São Paulo | Douro Mármores",
      "lavatorio-marmore-sao-paulo": "Lavatório em Mármore em São Paulo | Douro Mármores",
      "bancada-lavabo-sao-paulo": "Bancada para Lavabo em São Paulo | Douro Mármores",
      "soleira-peitoril-sao-paulo": "Soleiras e Peitoris em São Paulo | Douro Mármores",
      "mesa-pedra-sao-paulo": "Mesa em Pedra em São Paulo | Douro Mármores",
      "nicho-marmore-sao-paulo": "Nicho em Mármore em São Paulo | Douro Mármores",
      "pia-esculpida-sao-paulo": "Pia Esculpida em São Paulo | Douro Mármores",
      "bancada-ilha-cozinha-sao-paulo": "Bancada para Ilha de Cozinha em São Paulo | Douro Mármores",
      "pedra-para-cozinha-sao-paulo": "Pedra para Cozinha em São Paulo | Douro Mármores",
      "marmoraria-perto-de-mim-sao-paulo": "Marmoraria Perto de Mim em São Paulo | Douro Mármores",
    };

    const descBase =
      "Douro Mármores: mármores, granitos, quartzitos e superfícies premium com seleção de chapa, acabamento cuidadoso e instalação impecável em São Paulo e Grande São Paulo.";

    const descByPage: Partial<Record<PageKey, string>> = {
      home: "Marmoraria em São Paulo especializada em mármores, granitos, quartzitos, quartzo e superfícies premium para bancadas, lavatórios, escadas, cozinhas, banheiros e projetos sob medida.",
      produtos: "Catálogo Douro Mármores com mármores, granitos, quartzitos, quartzo, lâminas premium e superfícies sob medida para projetos em São Paulo.",
      projetos: "Veja projetos reais da Douro Mármores em cozinhas, banheiros, lavabos, escadas, bancadas, áreas gourmet e outros ambientes em São Paulo e Grande São Paulo.",
      duvidas: "Tire dúvidas sobre materiais, engenharia, instalação, prazos, orçamento e manutenção de pedras e superfícies.",
      contato: "Solicite orçamento técnico e fale com a Douro Mármores via WhatsApp ou formulário.",
      blog: "Acesse o blog da Douro Mármores com conteúdos sobre mármore, granito, quartzito, quartzo, decoração, arquitetura, bancadas sob medida e tendências de marmoraria em São Paulo.",
      "marmoraria-campo-belo": "Marmoraria no Campo Belo para bancadas, lavatórios, painéis, escadas e projetos sob medida em mármore, granito, quartzito, quartzo e superfícies premium.",
      "marmoraria-vila-olimpia": "Marmoraria na Vila Olímpia com atendimento para cozinhas, banheiros, lavabos, áreas gourmet e projetos corporativos ou residenciais em pedra natural e superfícies premium.",
      "marmoraria-itaim-bibi": "Marmoraria no Itaim Bibi para bancadas, lavatórios, painéis, cozinhas e projetos de alto padrão em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-perdizes": "Marmoraria em Perdizes com atendimento para bancadas, lavabos, banheiros, áreas gourmet e projetos sob medida em pedra natural e superfícies premium.",
      "marmoraria-pompeia": "Marmoraria na Pompeia para cozinhas, banheiros, lavabos, áreas gourmet, escadas e painéis sob medida em mármore, granito, quartzo e quartzito.",
      "marmoraria-tatuape": "Marmoraria no Tatuapé com soluções sob medida para bancadas, cozinhas, banheiros, lavatórios e áreas gourmet em pedras naturais e superfícies premium.",
      "marmoraria-ipiranga": "Marmoraria no Ipiranga para bancadas, escadas, painéis, lavatórios e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-vila-sonia": "Marmoraria na Vila Sônia para cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida com acabamento premium em pedra natural e superfícies industrializadas.",
      "marmoraria-vila-andrade": "Marmoraria na Vila Andrade para bancadas, painéis, lavatórios, escadas e ambientes de alto padrão em mármore, granito, quartzo, quartzito e Dekton.",
      "marmoraria-bela-vista": "Marmoraria na Bela Vista com atendimento para bancadas, banheiros, cozinhas, lavabos e projetos sob medida em mármore, granito, quartzo e superfícies premium.",
      "marmoraria-jardim-europa": "Marmoraria no Jardim Europa para bancadas, painéis, lavatórios, cozinhas e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-jardim-america": "Marmoraria no Jardim América com atendimento para cozinhas, banheiros, lavabos, áreas gourmet e projetos de alto padrão em pedra natural e superfícies premium.",
      "marmoraria-higienopolis": "Marmoraria em Higienópolis para bancadas, lavatórios, escadas, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-mooca": "Marmoraria na Mooca com atendimento para cozinhas, banheiros, áreas gourmet, lavabos e projetos residenciais ou comerciais em pedra natural e superfícies premium.",
      "marmoraria-anhangabau": "Marmoraria no Anhangabaú para bancadas, painéis, lavatórios e projetos corporativos ou residenciais sob medida em mármore, granito, quartzo e quartzito.",
      "marmoraria-vila-leopoldina": "Marmoraria na Vila Leopoldina para cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-vila-madalena": "Marmoraria na Vila Madalena para bancadas, escadas, lavatórios, painéis e ambientes autorais em pedra natural e superfícies premium sob medida.",
      "marmoraria-cerqueira-cesar": "Marmoraria em Cerqueira César com atendimento para bancadas, cozinhas, banheiros, lavabos e projetos de alto padrão em mármore, granito, quartzo e quartzito.",
      "marmoraria-sumare": "Marmoraria no Sumaré para bancadas, lavatórios, painéis, escadas e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-socorro": "Marmoraria no Socorro com atendimento para bancadas, cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-alto-da-boa-vista": "Marmoraria no Alto da Boa Vista para bancadas, escadas, lavatórios, painéis e projetos sob medida em pedra natural e superfícies premium.",
      "marmoraria-vila-suzana": "Marmoraria na Vila Suzana para cozinhas, banheiros, lavabos, áreas gourmet e projetos sofisticados em mármore, granito, quartzo e quartzito.",
      "marmoraria-vila-santa-catarina": "Marmoraria na Vila Santa Catarina com soluções sob medida para bancadas, lavatórios, nichos, painéis e áreas gourmet em pedras naturais e superfícies premium.",
      "marmoraria-jardim-marajoara": "Marmoraria no Jardim Marajoara para bancadas, escadas, lavatórios, painéis e projetos especiais em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-chacara-flora": "Marmoraria na Chácara Flora com atendimento para projetos residenciais de alto padrão em bancadas, escadas, lavabos, cozinhas e áreas gourmet sob medida.",
      "marmoraria-jurubatuba": "Marmoraria em Jurubatuba para bancadas de cozinha, banheiros, lavabos, áreas gourmet e projetos comerciais ou residenciais com acabamento premium.",
      "marmoraria-campo-grande": "Marmoraria no Campo Grande para bancadas, lavatórios, escadas, painéis e projetos sob medida em mármore, granito, quartzo e quartzito.",
      "marmoraria-mirandopolis": "Marmoraria em Mirandópolis com atendimento para cozinhas, banheiros, lavabos, áreas gourmet e projetos de marmoraria sob medida com acabamento premium.",
      "marmoraria-veleiros": "Marmoraria em Veleiros para bancadas, nichos, lavatórios, escadas e projetos sob medida em pedra natural e superfícies industrializadas premium.",
      "marmoraria-vila-cordeiro": "Marmoraria na Vila Cordeiro com atendimento para bancadas, lavatórios, painéis, áreas gourmet e projetos sob medida em pedras naturais e superfícies premium.",
      "marmoraria-vila-cruzeiro": "Marmoraria na Vila Cruzeiro para cozinhas, banheiros, lavabos, escadas e áreas gourmet com medição, produção e instalação sob medida.",
      "marmoraria-jardim-guedala": "Marmoraria no Jardim Guedala para projetos residenciais de alto padrão em bancadas, escadas, lavatórios, painéis e mesas em pedra natural.",
      "marmoraria-vila-gumercindo": "Marmoraria na Vila Gumercindo para bancadas, cozinhas, banheiros, lavabos e projetos especiais em mármore, granito, quartzo, quartzito e superfícies premium.",
      "marmoraria-aconchego-da-zona-sul": "Marmoraria na Zona Sul de São Paulo com forte presença em bairros residenciais e nobres, atendendo bancadas, lavatórios, escadas, painéis e projetos sob medida.",
      "bancada-quartzito-sao-paulo": "Bancada em quartzito em São Paulo para cozinhas, ilhas, banheiros e áreas gourmet com veios naturais, alta resistência e acabamento premium.",
      "bancada-dekton-sao-paulo": "Bancada em Dekton em São Paulo para cozinhas, áreas gourmet e projetos contemporâneos com superfície sinterizada de alta performance.",
      "bancada-silestone-sao-paulo": "Bancada em Silestone em São Paulo para cozinhas e banheiros com baixa porosidade, estética uniforme e acabamento premium sob medida.",
      "ilha-cozinha-quartzito-sao-paulo": "Ilha de cozinha em quartzito em São Paulo com paginação premium, visual sofisticado, alta resistência e acabamento sob medida.",
      "escada-granito-sao-paulo": "Escada em granito em São Paulo com corte técnico, acabamento premium e instalação sob medida para projetos residenciais e comerciais.",
      "lavabo-onix-sao-paulo": "Lavabo em ônix em São Paulo com painéis, cubas, bancadas e projetos com translucidez, impacto visual e acabamento premium.",
      "painel-quartzito-sao-paulo": "Painel em quartzito em São Paulo para salas, lareiras, halls e ambientes sofisticados com paginação do veio e acabamento de alto padrão.",
      "pia-cozinha-granito-sao-paulo": "Pia de cozinha em granito em São Paulo com bancada sob medida, resistência para rotina intensa e acabamento premium para cozinhas e áreas gourmet.",
      "bancada-quartzo-branco-sao-paulo": "Bancada de quartzo branco em São Paulo para cozinhas, ilhas, lavabos e banheiros com visual uniforme, baixa porosidade e acabamento premium.",
      "bancada-preto-sao-gabriel-sao-paulo": "Bancada em Preto São Gabriel em São Paulo para cozinhas, áreas gourmet e lavabos com alta resistência, baixa manutenção e acabamento premium.",
      "cuba-esculpida-marmore-sao-paulo": "Cuba esculpida em mármore em São Paulo para lavabos e banheiros sob medida com acabamento premium, desenho autoral e integração com a bancada.",
      "lavatorio-quartzito-sao-paulo": "Lavatório em quartzito em São Paulo com veios naturais, resistência superior e acabamento premium para lavabos e banheiros sofisticados.",
      "ilha-dekton-sao-paulo": "Ilha em Dekton em São Paulo para cozinhas contemporâneas com superfície sinterizada de alta performance, baixa porosidade e acabamento premium.",
      "churrasqueira-quartzito-sao-paulo": "Churrasqueira em quartzito em São Paulo para áreas gourmet com beleza natural, resistência e acabamento premium sob medida.",
      "revestimento-lareira-marmore-sao-paulo": "Revestimento de lareira em mármore em São Paulo com paginação premium, cortes limpos e acabamento sofisticado para ambientes de alto padrão.",
      "escada-quartzito-sao-paulo": "Escada em quartzito em São Paulo com veios naturais, alta resistência e instalação sob medida para projetos residenciais e comerciais.",
      "bancada-porcelanato-sao-paulo": "Bancada em porcelanato em São Paulo para cozinhas, banheiros e áreas gourmet com acabamento contemporâneo, grandes formatos e execução sob medida.",
      "bancada-area-gourmet-sao-paulo": "Bancada para área gourmet em São Paulo com granito, quartzito, quartzo ou superfícies sinterizadas, sempre com orientação técnica e acabamento premium.",
      "lavatorio-marmore-sao-paulo": "Lavatório em mármore em São Paulo para lavabos e banheiros sob medida com desenho sofisticado, paginação premium e acabamento de alto padrão.",
      "bancada-lavabo-sao-paulo": "Bancada para lavabo em São Paulo em mármore, quartzo, quartzito, granito ou ônix, feita sob medida para ambientes sofisticados.",
      "soleira-peitoril-sao-paulo": "Soleiras e peitoris em São Paulo em granito, mármore e outras pedras naturais com corte sob medida e acabamento premium para portas, janelas e transições.",
      "mesa-pedra-sao-paulo": "Mesa em pedra em São Paulo com tampo sob medida em mármore, granito, quartzito e superfícies premium para ambientes residenciais ou corporativos.",
      "nicho-marmore-sao-paulo": "Nicho em mármore em São Paulo para banheiros, lavabos e ambientes sofisticados com acabamento limpo, paginação e produção sob medida.",
      "pia-esculpida-sao-paulo": "Pia esculpida em São Paulo para lavabos e banheiros sob medida com escoamento correto, acabamento premium e integração total com a bancada.",
      "bancada-ilha-cozinha-sao-paulo": "Bancada para ilha de cozinha em São Paulo com quartzito, granito, quartzo, Dekton ou mármore para projetos contemporâneos e sofisticados.",
      "pedra-para-cozinha-sao-paulo": "Pedra para cozinha em São Paulo com orientação técnica para escolher entre granito, quartzito, quartzo, mármore e superfícies sinterizadas conforme uso e estética.",
      "marmoraria-perto-de-mim-sao-paulo": "Marmoraria perto de mim em São Paulo com atendimento na Zona Sul, bairros nobres e Grande São Paulo para bancadas, lavatórios, escadas e projetos sob medida.",
    };

    const siteUrl = "https://douromarmores.com.br/";
    const siteName = "Douro Mármores";
    const quartzitoMaterialTitle = currentQuartzitoItem
      ? `${currentQuartzitoItem.name} em São Paulo | Quartzito Premium | Douro Mármores`
      : "Quartzito em São Paulo | Quartzito Premium | Douro Mármores";
    const granitoMaterialTitle = currentGranitoItem
      ? `${currentGranitoItem.name} em São Paulo | Granito Premium | Douro Mármores`
      : "Granito em São Paulo | Granito Premium | Douro Mármores";
    const marmoreMaterialTitle = currentMarmoreItem
      ? `${currentMarmoreItem.name} em São Paulo | Mármore Premium | Douro Mármores`
      : "Mármore em São Paulo | Mármore Premium | Douro Mármores";
    const silestoneMaterialTitle = currentSilestoneItem
      ? `${currentSilestoneItem.name} em São Paulo | Silestone Premium | Douro Mármores`
      : "Silestone em São Paulo | Quartzo Premium | Douro Mármores";
    const quartzoStoneMaterialTitle = currentQuartzoStoneItem
      ? `${currentQuartzoStoneItem.name} em São Paulo | Quartzo Stone Premium | Douro Mármores`
      : "Quartzo Stone em São Paulo | Quartzo Premium | Douro Mármores";
    const dektonMaterialTitle = currentDektonItem
      ? `${currentDektonItem.name} em São Paulo | Dekton Premium | Douro Mármores`
      : "Dekton em São Paulo | Superfície Sinterizada Premium | Douro Mármores";
    const sinthMaterialTitle = currentSinthItem
      ? `${currentSinthItem.name} em São Paulo | Sinth Premium | Douro Mármores`
      : "Sinth em São Paulo | Superfície Sinterizada Premium | Douro Mármores";

    const quartzitoMaterialDescription = currentQuartzitoItem
      ? currentQuartzitoContent.seoDescription || `${currentQuartzitoItem.name} em São Paulo para bancadas, ilhas, lavatórios, painéis e projetos sob medida com alta resistência, paginação premium e acabamento impecável.`
      : "Quartzito em São Paulo para bancadas, ilhas, lavatórios, painéis e projetos sob medida com alta resistência, paginação premium e acabamento impecável.";
    const granitoMaterialDescription = currentGranitoItem
      ? currentGranitoContent.seoDescription || `${currentGranitoItem.name} em São Paulo para bancadas, ilhas, cozinhas e áreas gourmet sob medida com alta resistência, acabamento premium e excelente desempenho no dia a dia.`
      : "Granito em São Paulo para bancadas, ilhas, cozinhas e áreas gourmet sob medida com alta resistência, acabamento premium e excelente desempenho no dia a dia.";
    const marmoreMaterialDescription = currentMarmoreItem
      ? currentMarmoreContent.seoDescription || `${currentMarmoreItem.name} em São Paulo para lavabos, banheiros, painéis, lareiras e interiores sob medida com acabamento premium e forte valor estético.`
      : "Mármore em São Paulo para lavabos, banheiros, painéis, lareiras e interiores sob medida com acabamento premium e forte valor estético.";
    const silestoneMaterialDescription = currentSilestoneItem
      ? currentSilestoneContent.seoDescription || `${currentSilestoneItem.name} em São Paulo para bancadas, ilhas, cozinhas, banheiros e lavabos sob medida com baixa porosidade, visual sofisticado e acabamento premium.`
      : "Silestone em São Paulo para bancadas, ilhas, cozinhas, banheiros e lavabos sob medida com baixa porosidade, visual sofisticado e acabamento premium.";
    const quartzoStoneMaterialDescription = currentQuartzoStoneItem
      ? currentQuartzoStoneContent.seoDescription || `${currentQuartzoStoneItem.name} em São Paulo para bancadas, ilhas, cozinhas, banheiros e lavabos sob medida com baixa porosidade, visual contemporâneo e acabamento premium.`
      : "Quartzo Stone em São Paulo para bancadas, ilhas, cozinhas, banheiros e lavabos sob medida com baixa porosidade, visual contemporâneo e acabamento premium.";
    const dektonMaterialDescription = currentDektonItem
      ? currentDektonContent.seoDescription || `${currentDektonItem.name} em São Paulo para bancadas, ilhas, painéis, banheiros e áreas gourmet sob medida com superfície sinterizada premium, baixa absorção e acabamento impecável.`
      : "Dekton em São Paulo para bancadas, ilhas, painéis, banheiros e áreas gourmet sob medida com superfície sinterizada premium, baixa absorção e acabamento impecável.";
    const sinthMaterialDescription = currentSinthItem
      ? currentSinthContent.seoDescription || `${currentSinthItem.name} em São Paulo para bancadas, ilhas, painéis, banheiros e lavabos sob medida com superfície sinterizada premium, baixa absorção e acabamento sofisticado.`
      : "Sinth em São Paulo para bancadas, ilhas, painéis, banheiros e lavabos sob medida com superfície sinterizada premium, baixa absorção e acabamento sofisticado.";

    const currentTitle = page === "quartzito-material" ? quartzitoMaterialTitle : page === "granito-material" ? granitoMaterialTitle : page === "marmore-material" ? marmoreMaterialTitle : page === "silestone-material" ? silestoneMaterialTitle : page === "quartzo-stone-material" ? quartzoStoneMaterialTitle : page === "dekton-material" ? dektonMaterialTitle : page === "sinth-material" ? sinthMaterialTitle : titles[page] || baseTitle;
    const currentDescription = page === "quartzito-material" ? quartzitoMaterialDescription : page === "granito-material" ? granitoMaterialDescription : page === "marmore-material" ? marmoreMaterialDescription : page === "silestone-material" ? silestoneMaterialDescription : page === "quartzo-stone-material" ? quartzoStoneMaterialDescription : page === "dekton-material" ? dektonMaterialDescription : page === "sinth-material" ? sinthMaterialDescription : descByPage[page] || descBase;
    const canonicalUrl = page === "quartzito-material"
      ? `${siteUrl}?p=quartzito-material&slug=${encodeURIComponent(quartzitoSlug || "")}`
      : page === "granito-material"
        ? `${siteUrl}?p=granito-material&slug=${encodeURIComponent(granitoSlug || "")}`
        : page === "marmore-material"
          ? `${siteUrl}?p=marmore-material&slug=${encodeURIComponent(marmoreSlug || "")}`
          : page === "silestone-material"
            ? `${siteUrl}?p=silestone-material&slug=${encodeURIComponent(silestoneSlug || "")}`
            : page === "quartzo-stone-material"
              ? `${siteUrl}?p=quartzo-stone-material&slug=${encodeURIComponent(quartzoStoneSlug || "")}`
              : page === "dekton-material"
                ? `${siteUrl}?p=dekton-material&slug=${encodeURIComponent(dektonSlug || "")}`
                : page === "sinth-material"
                  ? `${siteUrl}?p=sinth-material&slug=${encodeURIComponent(sinthSlug || "")}`
                  : `${siteUrl}${page === "home" ? "" : `?p=${page}`}`;
    const ogImage = page === "quartzito-material"
      ? currentQuartzitoItem?.applied || currentQuartzitoItem?.sample || ASSETS.hero.bgImage
      : page === "granito-material"
        ? currentGranitoItem?.applied || currentGranitoItem?.sample || ASSETS.hero.bgImage
        : page === "marmore-material"
          ? currentMarmoreItem?.applied || currentMarmoreItem?.sample || ASSETS.hero.bgImage
          : page === "silestone-material"
            ? currentSilestoneItem?.applied || currentSilestoneItem?.sample || ASSETS.hero.bgImage
            : page === "quartzo-stone-material"
              ? currentQuartzoStoneItem?.applied || currentQuartzoStoneItem?.sample || ASSETS.hero.bgImage
              : page === "dekton-material"
                ? currentDektonItem?.applied || currentDektonItem?.sample || ASSETS.hero.bgImage
                : page === "sinth-material"
                  ? currentSinthItem?.applied || currentSinthItem?.sample || ASSETS.hero.bgImage
                  : ASSETS.hero.bgImage;

    const seoAreas = [
      "São Paulo",
      "Grande São Paulo",
      "Zona Sul de São Paulo",
      "Zona Oeste de São Paulo",
      "Zona Leste de São Paulo",
      "Moema",
      "Morumbi",
      "Santo Amaro",
      "Brooklin",
      "Vila Mariana",
      "Pinheiros",
      "Interlagos",
      "Alphaville",
      "Vila Mascote",
      "Chácara Santo Antônio",
      "Jabaquara",
      "Saúde",
      "Planalto Paulista",
      "Jardim Paulista",
      "Jardins",
      "Vila Nova Conceição",
      "Ibirapuera",
      "Panamby",
      "Campo Belo",
      "Vila Olímpia",
      "Itaim Bibi",
      "Perdizes",
      "Pompeia",
      "Tatuapé",
      "Ipiranga",
      "Vila Sônia",
      "Vila Andrade",
      "Bela Vista",
      "Jardim Europa",
      "Jardim América",
      "Higienópolis",
      "Mooca",
      "Anhangabaú",
      "Vila Leopoldina",
      "Vila Madalena",
      "Cerqueira César",
      "Sumaré",
      "Socorro",
      "Alto da Boa Vista",
      "Vila Suzana",
      "Vila Santa Catarina",
      "Jardim Marajoara",
      "Chácara Flora",
      "Jurubatuba",
      "Campo Grande",
      "Mirandópolis",
      "Veleiros",
      "Vila Cordeiro",
      "Vila Cruzeiro",
      "Jardim Guedala",
      "Vila Gumercindo",
    ];

    const seoKeywords = [
      "marmoraria em São Paulo",
      "marmoraria na zona sul de São Paulo",
      "marmoraria em SP",
      "marmoraria perto de mim",
      "marmoraria grande São Paulo",
      "marmoraria zona sul",
      "marmoraria perto de mim em são paulo",
      "marmoraria para cozinha",
      "marmoraria para banheiro",
      "marmoraria para lavabo",
      "marmoraria para área gourmet",
      "marmoraria para escadas",
      "marmoraria para lareira",
      "marmoraria para painel de tv",
      "marmoraria sob medida",
      "marmoraria alto padrão",
      "marmorista em são paulo",
      "mármores e granitos em são paulo",
      "pedras para cozinha em são paulo",
      "pedras para banheiro em são paulo",
      "bancada de cozinha sob medida em São Paulo",
      "bancada em granito em São Paulo",
      "bancada em quartzito em São Paulo",
      "bancada em quartzo em São Paulo",
      "bancada em silestone em São Paulo",
      "bancada em dekton em São Paulo",
      "bancada em porcelanato em são paulo",
      "bancada de área gourmet em são paulo",
      "bancada de lavabo em são paulo",
      "ilha de cozinha em quartzito em São Paulo",
      "ilha em dekton em são paulo",
      "bancada ilha cozinha são paulo",
      "escada em mármore em São Paulo",
      "escada em granito em São Paulo", 
      "lavatório sob medida em São Paulo",
      "painel em mármore em São Paulo",
      "painel em quartzito em São Paulo",
      "lavabo em ônix em São Paulo",
      "cuba esculpida em São Paulo",
      "nicho para banheiro em São Paulo",
      "área gourmet em granito em São Paulo",
      "pia de cozinha em granito em São Paulo",
      "soleira em granito em são paulo",
      "peitoril em mármore em são paulo",
      "mesa em pedra em são paulo",
      "mesa em quartzito em são paulo",
      "mesa em mármore em são paulo",
      "pia esculpida em mármore em são paulo",
      "lavatório em mármore em são paulo",
      "lavatório em quartzito em são paulo",
      "pedra para bancada de cozinha",
      "melhor pedra para bancada de cozinha",
      "granito preto são gabriel",
      "quartzo branco para cozinha",
      "silestone para cozinha",
      "dekton para cozinha",
      "quartzito taj mahal são paulo",
      "marmoraria zona sul sp",
      "marmoraria interlagos zona sul",
      "marmoraria santo amaro zona sul",
      "marmoraria brooklin zona sul",
      ...seoAreas.map((b) => `marmoraria em ${b}`),
      ...seoAreas.map((b) => `marmoraria perto de ${b}`),
      ...seoAreas.map((b) => `bancadas de mármore e granito em ${b}`),
    ];

    document.title = currentTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: currentDescription });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seoKeywords.join(", ") });
    upsertLinkRel("canonical", canonicalUrl);
    upsertMeta('meta[name="robots"]', { name: "robots", content: page === "logo" ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    upsertMeta('meta[name="author"]', { name: "author", content: siteName });
    upsertMeta('meta[name="application-name"]', { name: "application-name", content: siteName });

    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: currentTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: currentDescription });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: currentTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: currentDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: currentTitle });

    const pageJsonLd = {
      "@context": "https://schema.org",
      "@type": page === "produtos" || page === "projetos" ? "CollectionPage" : page === "contato" ? "ContactPage" : "WebPage",
      name: currentTitle,
      url: canonicalUrl,
      description: currentDescription,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: currentTitle.replace(" | Douro Mármores", ""), item: canonicalUrl },
      ],
    };

    const websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}?p=produtos&q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    const serviceJsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteName,
      url: siteUrl,
      image: ogImage,
      telephone: "+55 11 92321-0038",
      areaServed: seoAreas,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Paulo Guilguer Reimberg, 3311",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      serviceType: [
        "Marmoraria em São Paulo",
        "Bancadas em mármore e granito",
        "Bancadas em quartzito",
        "Bancadas em quartzo e Silestone",
        "Bancadas em Dekton",
        "Escadas em pedra",
        "Lavatórios e cubas esculpidas",
        "Painéis em mármore e quartzito",
        "Projetos sob medida para cozinhas, banheiros e áreas gourmet",
      ],
      knowsAbout: seoKeywords,
      description: currentDescription,
    };

    const faqJsonLd =
      page === "duvidas"
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.slice(0, 100).map((item: (typeof FAQ_DATA)[number]) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answerHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
              },
            })),
          }
        : null;

    const quartzitoMaterialJsonLd =
      page === "quartzito-material" && currentQuartzitoItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentQuartzitoItem.name,
            image: [currentQuartzitoItem.applied, currentQuartzitoItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Quartzito",
            material: "Quartzito natural",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const granitoMaterialJsonLd =
      page === "granito-material" && currentGranitoItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentGranitoItem.name,
            image: [currentGranitoItem.applied, currentGranitoItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Granito",
            material: "Granito natural",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const marmoreMaterialJsonLd =
      page === "marmore-material" && currentMarmoreItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentMarmoreItem.name,
            image: [currentMarmoreItem.applied, currentMarmoreItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Mármore",
            material: "Mármore natural",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const silestoneMaterialJsonLd =
      page === "silestone-material" && currentSilestoneItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentSilestoneItem.name,
            image: [currentSilestoneItem.applied, currentSilestoneItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Silestone",
            material: "Quartzo de engenharia",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const quartzoStoneMaterialJsonLd =
      page === "quartzo-stone-material" && currentQuartzoStoneItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentQuartzoStoneItem.name,
            image: [currentQuartzoStoneItem.applied, currentQuartzoStoneItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Quartzo Stone",
            material: "Quartzo de engenharia",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const dektonMaterialJsonLd =
      page === "dekton-material" && currentDektonItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentDektonItem.name,
            image: [currentDektonItem.applied, currentDektonItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Dekton",
            material: "Superfície sinterizada",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    const sinthMaterialJsonLd =
      page === "sinth-material" && currentSinthItem
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: currentSinthItem.name,
            image: [currentSinthItem.applied, currentSinthItem.sample].filter(Boolean),
            description: currentDescription,
            category: "Sinth",
            material: "Superfície sinterizada",
            brand: {
              "@type": "Brand",
              name: siteName,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: canonicalUrl,
            },
          }
        : null;

    upsertJsonLd("douro-dynamic-seo-jsonld", pageJsonLd);
    upsertJsonLd("douro-breadcrumb-jsonld", breadcrumbJsonLd);
    upsertJsonLd("douro-website-jsonld", websiteJsonLd);
    upsertJsonLd("douro-service-jsonld", serviceJsonLd);
    if (faqJsonLd) upsertJsonLd("douro-faq-jsonld", faqJsonLd);
    else {
      const faqNode = document.getElementById("douro-faq-jsonld");
      if (faqNode) faqNode.remove();
    }
    if (quartzitoMaterialJsonLd) upsertJsonLd("douro-quartzito-material-jsonld", quartzitoMaterialJsonLd);
    else {
      const quartzitoNode = document.getElementById("douro-quartzito-material-jsonld");
      if (quartzitoNode) quartzitoNode.remove();
    }
    if (granitoMaterialJsonLd) upsertJsonLd("douro-granito-material-jsonld", granitoMaterialJsonLd);
    else {
      const granitoNode = document.getElementById("douro-granito-material-jsonld");
      if (granitoNode) granitoNode.remove();
    }
    if (marmoreMaterialJsonLd) upsertJsonLd("douro-marmore-material-jsonld", marmoreMaterialJsonLd);
    else {
      const marmoreNode = document.getElementById("douro-marmore-material-jsonld");
      if (marmoreNode) marmoreNode.remove();
    }
    if (silestoneMaterialJsonLd) upsertJsonLd("douro-silestone-material-jsonld", silestoneMaterialJsonLd);
    else {
      const silestoneNode = document.getElementById("douro-silestone-material-jsonld");
      if (silestoneNode) silestoneNode.remove();
    }
    if (quartzoStoneMaterialJsonLd) upsertJsonLd("douro-quartzo-stone-material-jsonld", quartzoStoneMaterialJsonLd);
    else {
      const quartzoStoneNode = document.getElementById("douro-quartzo-stone-material-jsonld");
      if (quartzoStoneNode) quartzoStoneNode.remove();
    }
    if (dektonMaterialJsonLd) upsertJsonLd("douro-dekton-material-jsonld", dektonMaterialJsonLd);
    else {
      const dektonNode = document.getElementById("douro-dekton-material-jsonld");
      if (dektonNode) dektonNode.remove();
    }
    if (sinthMaterialJsonLd) upsertJsonLd("douro-sinth-material-jsonld", sinthMaterialJsonLd);
    else {
      const sinthNode = document.getElementById("douro-sinth-material-jsonld");
      if (sinthNode) sinthNode.remove();
    }

    const hash = window.location.hash;
    if (hash && hash !== "#") {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains("hidden")) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "auto" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page, quartzitoSlug, granitoSlug, marmoreSlug, silestoneSlug, quartzoStoneSlug, dektonSlug, sinthSlug, currentQuartzitoItem, currentGranitoItem, currentMarmoreItem, currentSilestoneItem, currentQuartzoStoneItem, currentDektonItem, currentSinthItem]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLightbox(null);
      setBotOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    (window as any).setHeroVideo = (url: string) => {
      if (!url) return;
      try {
        localStorage.setItem("douroHeroVideo", url);
      } catch {
        // ignore
      }
      setHeroVideoUrl(url);
    };
  }, []);

  useEffect(() => {
    const lock = lightbox || botOpen || mobileOpen;
    document.body.style.overflow = lock ? "hidden" : "";

    if (lightbox) {
      requestAnimationFrame(() => lightboxCloseBtnRef.current?.focus());
      return;
    }

    if (botOpen) {
      requestAnimationFrame(() => botCloseBtnRef.current?.focus());
    }
  }, [lightbox, botOpen, mobileOpen]);

  const footerLinks: Array<{ p: PageKey; label: string; hash?: string }> = [
    { p: "sobre-inspiracao", label: "Nossa Inspiração" },
    { p: "quem-somos", label: "Quem Somos" },
    { p: "como-funciona", label: "Como Funciona" },
    { p: "depoimentos", label: "Depoimentos" },
    { p: "contato", label: "Contato" },
  ];

  const isQuemSomosPage = page === "quem-somos";

  const [contatoTipo, setContatoTipo] = useState<"visita" | "duvida" | "orcamento">("visita");
  const [contatoSent, setContatoSent] = useState(false);

  const buildContatoWaText = (data: {
    nome: string;
    telefone: string;
    email: string;
    tipoProjeto?: string;
    cidade?: string;
    prazo?: string;
    mensagem?: string;
  }) => {
    const lines: string[] = [];

    if (contatoTipo === "visita") {
      lines.push("Olá! Quero agendar uma visita técnica.");
    } else if (contatoTipo === "duvida") {
      lines.push("Olá! Quero tirar dúvidas e receber orientação técnica.");
    } else {
      lines.push("Olá! Quero solicitar um orçamento técnico.");
    }

    lines.push("");
    lines.push(`Nome: ${data.nome}`);
    lines.push(`Telefone: ${data.telefone}`);
    lines.push(`E-mail: ${data.email}`);

    if (data.cidade) lines.push(`Cidade/Bairro: ${data.cidade}`);
    if (data.tipoProjeto && data.tipoProjeto !== "Selecione...") lines.push(`Projeto: ${data.tipoProjeto}`);
    if (data.prazo) lines.push(`Prazo/Quando pretende instalar: ${data.prazo}`);

    if (data.mensagem) {
      lines.push("");
      lines.push("Detalhes:");
      lines.push(data.mensagem);
    }

    lines.push("");
    lines.push("(Se tiver, vou enviar fotos e medidas aproximadas na sequência.)");

    return lines.join("\n");
  };

  const onSubmitContato = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const nome = String(fd.get("nome") || "").trim();
    const telefone = String(fd.get("telefone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const tipoProjeto = String(fd.get("tipo") || "").trim();
    const cidade = String(fd.get("cidade") || "").trim();
    const prazo = String(fd.get("prazo") || "").trim();
    const mensagem = String(fd.get("mensagem") || "").trim();

    const waText = buildContatoWaText({ nome, telefone, email, tipoProjeto, cidade, prazo, mensagem });
    const waUrl = `https://wa.me/${ASSETS.waNumber}?text=${encodeURIComponent(waText)}`;

    openExternal(waUrl);
    setContatoSent(true);
    e.currentTarget.reset();
    setTimeout(() => setContatoSent(false), 4500);
  };

  const brandSize = `text-xl sm:text-2xl md:text-3xl`;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <a href="#mainContent" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-white focus:text-gray-900 focus:px-4 focus:py-3 focus:rounded-xl focus:shadow-lg">
        Pular para o conteúdo
      </a>

      <div ref={topBarRef} className="bg-black text-white text-sm border-b border-gray-800 fixed top-0 left-0 right-0 z-[80] pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-phone text-gold" />
              (11) 92321-0038
            </span>
            <span className="hidden md:flex items-center gap-2">
              <i className="fas fa-envelope text-gold" />
              contato@douromarmores.com.br
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/douromarmores/" className="hover:text-gold transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openExternal("https://www.instagram.com/douromarmores/"); }}>
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="hover:text-gold transition" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://wa.me/5511923210038" className="hover:text-gold transition" aria-label="WhatsApp" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>
      </div>

      <header ref={headerRef} id="header" className={["bg-white shadow-md fixed left-0 right-0 z-[70] transition-all duration-300", headerScrolled ? "shadow-lg" : ""].join(" ")} style={{ top: "var(--douro-topbar-h, 0px)" } as React.CSSProperties}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-5">
            <a href="?p=home" className="flex items-center gap-3 group min-w-0" onClick={(e) => { e.preventDefault(); onNav("home"); }} aria-label="Douro Mármores - Página inicial">
              <LogoMark mode="header" />
              <span className={["min-w-0 max-w-[58vw] sm:max-w-none uppercase tracking-wide sm:tracking-wider leading-none font-bold", brandSize].join(" ")}>
                <span className="text-black group-hover:text-gray-900 transition">DOURO</span>
                <span className="text-gold">MÁRMORES</span>
              </span>
            </a>

            <button className="lg:hidden shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full border border-gray-200 text-2xl" aria-label="Abrir menu" aria-expanded={mobileOpen} aria-controls="mobileMenu" onClick={() => setMobileOpen((v) => !v)}>
              <i className="fas fa-bars" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <a href="?p=sobre-inspiracao" className="nav-link text-gray-700 hover:text-gold font-medium transition" onClick={(e) => { e.preventDefault(); onNav("sobre-inspiracao"); }}>
                  Sobre Nós
                </a>

                <div className="absolute top-full left-0 mt-2 w-[320px] bg-white shadow-2xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-3 flex flex-col">
                    {([
                      { p: "sobre-inspiracao", label: "Nossa Inspiração" },
                      { p: "quem-somos", label: "Quem Somos" },
                      { p: "como-funciona", label: "Como Funciona" },
                    ] as const).map((l) => (
                      <a
                        key={l.p}
                        href={`?p=${l.p}`}
                        className="px-4 py-3 rounded-lg text-gray-700 hover:text-gold hover:bg-gray-50 transition font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          onNav(l.p);
                        }}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <a href="?p=produtos" className="nav-link text-gray-700 hover:text-gold font-medium transition" onClick={(e) => { e.preventDefault(); onNav("produtos"); }}>
                  Produtos
                </a>

                <div className="absolute top-full left-0 mt-2 w-[460px] bg-white shadow-2xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Pedras Naturais</div>
                      <div className="flex flex-col">
                        {([
                          { p: "marmores", label: "Mármores" },
                          { p: "granitos", label: "Granitos" },
                          { p: "limestone", label: "Limestone" },
                          { p: "quartzitos", label: "Quartzitos" },
                          { p: "onix", label: "Ônix" },
                        ] as const).map((l) => (
                          <a key={l.p} href={`?p=${l.p}`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-gold hover:bg-gray-50 transition" onClick={(e) => { e.preventDefault(); onNav(l.p); }}>
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Pedras Industrializadas</div>
                      <div className="flex flex-col">
                        {([
                          { p: "laminas", label: "Lâminas" },
                          { p: "quartzo", label: "Quartzo" },
                          { p: "aglostone", label: "Prime Stone" },
                        ] as const).map((l) => (
                          <a key={l.p} href={`?p=${l.p}`} className="px-4 py-2 rounded-lg text-gray-700 hover:text-gold hover:bg-gray-50 transition" onClick={(e) => { e.preventDefault(); onNav(l.p); }}>
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <a href="?p=produtos" className="flex items-center justify-between gap-3 rounded-xl bg-gray-900 text-white px-4 py-3 hover:bg-black transition btn-glow" onClick={(e) => { e.preventDefault(); onNav("produtos"); }}>
                      <span className="font-semibold">Ver catálogo completo</span>
                      <i className="fas fa-arrow-right text-gold" />
                    </a>
                  </div>
                </div>
              </div>

              <a href="?p=projetos" className="nav-link text-gray-700 hover:text-gold font-medium transition" onClick={(e) => { e.preventDefault(); onNav("projetos"); }}>
                Projetos
              </a>
              <a href="?p=blog" className="nav-link text-gray-700 hover:text-gold font-medium transition" onClick={(e) => { e.preventDefault(); onNav("blog"); }}>
                Blog
              </a>
              <a href="?p=duvidas" className="nav-link text-gray-700 hover:text-gold font-medium transition" onClick={(e) => { e.preventDefault(); onNav("duvidas"); }}>
                Dúvidas
              </a>
              <a href="#contato" className="bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow shadow-lg" onClick={(e) => { e.preventDefault(); scrollOrRouteToHash("#contato"); }}>
                Orçamento Grátis
              </a>
            </nav>
          </div>

          {mobileOpen ? (
            <div className="lg:hidden fixed left-0 right-0 bottom-0 z-[90]" style={{ top: "var(--douro-topbar-h, 0px)" } as React.CSSProperties} aria-label="Menu mobile">
              <button type="button" className="absolute inset-0 bg-black/40" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />
              <div id="mobileMenu" className="absolute right-0 top-0 h-full w-[78vw] max-w-xs sm:w-[360px] sm:max-w-[360px] md:w-[380px] md:max-w-[380px] bg-white shadow-2xl border-l border-gray-100 flex flex-col" role="dialog" aria-modal="true">
                <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <LogoMark mode="header" />
                    <div className="min-w-0 leading-tight">
                      <div className="min-w-0 truncate font-extrabold uppercase tracking-wide text-base sm:text-lg leading-none"><span className="text-gray-900">DOURO</span></div>
                      <div className="mt-1 text-[11px] uppercase tracking-widest text-gray-500 font-semibold">Menu</div>
                    </div>
                  </div>
                  <button type="button" className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-900" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}>
                    <i className="fas fa-xmark" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="flex flex-col gap-4">
                    <div className="pt-1">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Sobre Nós</div>
                      <div className="flex flex-col">
                        {([
                          { p: "sobre-inspiracao", label: "Nossa Inspiração" },
                          { p: "quem-somos", label: "Quem Somos" },
                          { p: "como-funciona", label: "Como Funciona" },
                        ] as const).map((l) => (
                          <a key={l.p} href={`?p=${l.p}`} className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav(l.p); }}>
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Produtos</div>
                      <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-2">Pedras Naturais</div>
                      <div className="flex flex-col">
                        {([
                          { p: "marmores", label: "Mármores" },
                          { p: "granitos", label: "Granitos" },
                          { p: "limestone", label: "Limestone" },
                          { p: "quartzitos", label: "Quartzitos" },
                          { p: "onix", label: "Ônix" },
                        ] as const).map((l) => (
                          <a key={l.p} href={`?p=${l.p}`} className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav(l.p); }}>
                            {l.label}
                          </a>
                        ))}
                      </div>

                      <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-4">Pedras Industrializadas</div>
                      <div className="flex flex-col">
                        {([
                          { p: "laminas", label: "Lâminas" },
                          { p: "quartzo", label: "Quartzo" },
                          { p: "aglostone", label: "Prime Stone" },
                        ] as const).map((l) => (
                          <a key={l.p} href={`?p=${l.p}`} className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav(l.p); }}>
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <a href="?p=projetos" className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav("projetos"); }}>
                      Projetos
                    </a>
                    <a href="?p=blog" className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav("blog"); }}>
                      Blog
                    </a>
                    <a href="?p=duvidas" className="text-gray-700 hover:text-gold font-medium py-2 border-b" onClick={(e) => { e.preventDefault(); onNav("duvidas"); }}>
                      Dúvidas
                    </a>

                    <a href="#contato" className="bg-gold text-white px-6 py-3 rounded-full font-semibold text-center" onClick={(e) => { e.preventDefault(); scrollOrRouteToHash("#contato"); setMobileOpen(false); }}>
                      Orçamento Grátis
                    </a>
                  </div>
                </nav>

                <div className="px-4 py-4 border-t border-gray-100">
                  <a href="https://wa.me/5511923210038" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-5 py-3 rounded-full font-semibold hover:bg-black transition btn-glow" onClick={() => setMobileOpen(false)}>
                    <i className="fab fa-whatsapp mr-2 text-green-400" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main id="mainContent" style={{ paddingTop: "var(--douro-header-offset, 0px)" } as React.CSSProperties}>
        <section id="home" aria-labelledby="home-hero-title" className={["hero-bg hero-fit flex items-start md:items-center relative", visible.has("home") ? "" : "hidden"].join(" ")}>
          <video key={heroVideoUrl} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={ASSETS.hero.poster}>
            <source src={heroVideoUrl} type="video/mp4" />
            <source src={ASSETS.hero.videoFallback} type="video/mp4" />
            Seu navegador não suporta vídeo em HTML5.
          </video>

          <div className="hero-video-scrim" />
          <div className="absolute inset-0 gradient-gold-radial z-[2] opacity-[0.08] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 pt-8 pb-10 md:py-20">
            <FadeInUp delayMs={60}>
              <div className="hero-quad max-w-6xl">
                <div className="max-w-4xl mx-auto">
                  <div className="text-left pt-6 md:pt-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/55 border border-white/15 backdrop-blur-md px-4 py-2 text-[11px] tracking-widest uppercase text-white hero-text-shadow">
                      <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                      Pedras naturais e superfícies premium
                    </div>

                    <h1 id="home-hero-title" className="mt-5 text-[2.35rem] sm:text-[3.25rem] md:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight hero-text-shadow">
                      Pedra com alma.
                      <br />
                      <span className="text-gold">Ambiente com presença.</span>
                    </h1>
                  </div>

                  <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                    <a href="#contato" className="bg-gold text-white px-8 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow shadow-lg inline-flex items-center justify-center" onClick={(e) => { e.preventDefault(); scrollOrRouteToHash("#contato"); }}>
                      Quero orçamento
                    </a>
                    <a href="?p=projetos" className="bg-white/12 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/18 transition border border-white/12 backdrop-blur-md inline-flex items-center justify-center" onClick={(e) => { e.preventDefault(); onNav("projetos"); }}>
                      Ver projetos
                      <i className="fas fa-arrow-right ml-2 text-gold" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        <section id="hero-copy" className={["bg-white", visible.has("hero-copy") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4 -mt-12 sm:-mt-14 relative z-20 pb-6">
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-950 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85" aria-hidden="true" />
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold" aria-hidden="true" />

                <div className="relative p-6 sm:hidden">
                  <p className="text-white/95 text-[14px] leading-relaxed">
                    <span className="text-white font-semibold">A diferença não é só a pedra.</span> É a escolha, o desenho dos veios e o encaixe.
                    <span className="text-white font-semibold"> No fim,</span> você vê um ambiente pronto — <span className="text-gold font-semibold">com presença</span>.
                  </p>
                </div>

                <div className="relative p-7 hidden sm:grid gap-7 md:grid-cols-[1.35fr_1fr] md:items-center">
                  <div className="md:pr-3">
                    <p className="text-white/95 text-[15px] md:text-[16px] leading-relaxed">
                      <span className="text-white font-semibold">A diferença não é só a pedra.</span> É como ela é escolhida, como os veios conversam com o projeto e como cada recorte encaixa.
                      <span className="text-white font-semibold"> No fim, você não vê “obra”.</span> Você vê um ambiente pronto — <span className="text-gold font-semibold">com presença</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {([
                      { n: "01", t: "Escolha guiada", d: "Material certo para seu uso" },
                      { n: "02", t: "Veios & corte", d: "Harmonia no desenho final" },
                      { n: "03", t: "Instalação fina", d: "Encaixe limpo e seguro" },
                    ] as const).map((m) => (
                      <div key={m.n} className="rounded-2xl bg-white/6 border border-white/10 px-3 py-4">
                        <div className="text-gold font-extrabold tracking-tight text-lg">{m.n}</div>
                        <div className="text-white font-semibold text-xs mt-1">{m.t}</div>
                        <div className="text-white/70 text-[11px] mt-1 leading-snug">{m.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre-nos" className={["py-24 bg-white relative overflow-hidden", visible.has("sobre-nos") ? "" : "hidden"].join(" ")}>
          <div className="absolute inset-0 gradient-gold-radial opacity-40" />
          <div className="absolute -top-28 -left-28 w-96 h-96 bg-[rgba(201,169,97,0.1)] rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-[rgba(201,169,97,0.1)] rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {([
                { p: "sobre-inspiracao", label: "Nossa Inspiração" },
                { p: "quem-somos", label: "Quem Somos" },
                { p: "como-funciona", label: "Como Funciona" },
              ] as const).map((tab) => (
                <a
                  key={tab.p}
                  href={`?p=${tab.p}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(tab.p);
                  }}
                  className={[
                    "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border transition",
                    page === tab.p || (tab.p === "sobre-inspiracao" && (page === "sobre-nos" || page === "sobre"))
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 border-gray-200 hover:border-gray-900 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {tab.label}
                </a>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12">
              <div className="lg:col-span-7 xl:col-span-8 lg:pr-2">
                <span className="text-gold font-semibold uppercase tracking-widest text-sm">Sobre nós</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                  {page === "quem-somos" ? (
                    <>Quem Somos — <span className="text-gold">marmoraria em São Paulo, Zona Sul, com atuação na Grande São Paulo e região</span></>
                  ) : page === "como-funciona" ? (
                    <>Como Funciona — <span className="text-gold">do primeiro contato à instalação sem surpresa</span></>
                  ) : (
                    <>Douro Mármores — <span className="text-gold">o detalhe que faz a casa virar cenário de vida</span></>
                  )}
                </h2>

                {page !== "quem-somos" && aboutAudioSrc ? (
                  <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">Prefere ouvir?</span> Toque e escute a história.
                        {aboutAudioProgress.duration > 0 ? (
                          <span className="ml-2 text-gray-500">
                            {formatAudioTime(aboutAudioProgress.current)} / {formatAudioTime(aboutAudioProgress.duration)}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={onAboutAudioMain} className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition">
                          <i className={aboutAudioStatus === "idle" ? "fas fa-volume-high mr-2 text-gold" : aboutAudioStatus === "playing" ? "fas fa-pause mr-2 text-gold" : "fas fa-play mr-2 text-gold"} />
                          {aboutAudioStatus === "idle" ? "Ouvir" : aboutAudioStatus === "playing" ? "Pausar" : "Continuar"}
                        </button>

                        {aboutAudioStatus !== "idle" ? (
                          <button type="button" onClick={stopAboutAudio} className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition">
                            <i className="fas fa-stop mr-2 text-gold" />
                            Parar
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <audio ref={aboutAudioRef} src={aboutAudioSrc} preload="metadata" onLoadedMetadata={(e) => {
                      const a = e.currentTarget;
                      setAboutAudioProgress({ current: a.currentTime || 0, duration: Number.isFinite(a.duration) ? a.duration : 0 });
                    }} onTimeUpdate={(e) => {
                      const a = e.currentTarget;
                      setAboutAudioProgress((prev) => ({ ...prev, current: a.currentTime || 0 }));
                    }} onEnded={() => { setAboutAudioStatus("idle"); }} onError={() => {
                      const next = aboutAudioSrcIdxRef.current + 1;
                      if (next < aboutAudioCandidates.length) {
                        setAboutAudioSrcIdx(next);
                        setAboutAudioStatus("idle");
                        setAboutAudioErrorMsg(null);
                        return;
                      }
                      setAboutAudioStatus("error");
                      setAboutAudioErrorMsg(aboutAudioSrc ? `Não consegui carregar o áudio: ${aboutAudioSrc}` : "Não consegui carregar o áudio agora.");
                    }} className="sr-only" />

                    {aboutAudioStatus === "error" ? (
                      <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
                        <div className="font-semibold text-gray-900">Áudio indisponível</div>
                        <p className="mt-1 text-gray-600">{aboutAudioErrorMsg || "Não consegui reproduzir o áudio agora."}</p>
                        <div className="mt-3 flex flex-col sm:flex-row gap-2">
                          {aboutAudioSrc ? (
                            <a href={aboutAudioSrc} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition">
                              Abrir arquivo de áudio
                              <i className="fas fa-arrow-up-right-from-square ml-2 text-gold" />
                            </a>
                          ) : null}

                          {ttsSupported ? (
                            <button type="button" onClick={onTtsMain} className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-4 py-2 font-semibold hover:bg-black transition">
                              Ouvir pela voz do navegador
                              <i className="fas fa-volume-high ml-2 text-gold" />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : page !== "quem-somos" && ttsSupported ? (
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      Prefere ouvir? <span className="text-gray-900 font-semibold">Toque para escutar a história.</span>
                      {ttsStatus !== "idle" && ttsProgress.total > 0 ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-[12px] text-gray-700">
                          Trecho <span className="font-semibold mx-1">{ttsProgress.current}</span>de <span className="font-semibold ml-1">{ttsProgress.total}</span>
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button type="button" onClick={onTtsMain} className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition">
                        <i className={ttsStatus === "idle" ? "fas fa-volume-high mr-2 text-gold" : ttsStatus === "speaking" ? "fas fa-pause mr-2 text-gold" : "fas fa-play mr-2 text-gold"} />
                        {ttsStatus === "idle" ? "Ouvir" : ttsStatus === "speaking" ? "Pausar" : "Continuar"}
                      </button>

                      {ttsStatus !== "idle" ? (
                        <button type="button" onClick={onTtsStop} className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition">
                          <i className="fas fa-stop mr-2 text-gold" />
                          Parar
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="mt-7 max-w-none space-y-5 text-gray-700 leading-relaxed text-[16px] md:text-[17px]">
                  {page === "quem-somos" ? (
                    <>
                      <p>Somos uma <strong>marmoraria em São Paulo</strong>, localizada na <strong>Zona Sul da cidade de São Paulo</strong>, especializada em transformar mármores, granitos, quartzitos e superfícies premium em bancadas, ilhas, lavatórios, escadas, painéis, nichos, pisos e projetos sob medida.</p>
                      <p>Atendemos clientes finais, arquitetos, designers de interiores, construtoras e obras residenciais ou comerciais que procuram <strong>marmoraria na Zona Sul</strong>, <strong>marmoraria em São Paulo capital</strong> e uma <strong>marmoraria que atende a Grande São Paulo e região</strong> com orientação técnica, acabamento premium e instalação cuidadosa.</p>
                      <p>O que fazemos vai além de cortar pedra: orientamos na escolha do material ideal, ajudamos a definir acabamento, paginação dos veios, bordas e recortes, e executamos cada peça para que o resultado final pareça elegante, limpo e coerente com o projeto.</p>
                      <p>Para quem busca <strong>marmoraria em SP</strong> com atendimento técnico, seleção de chapas, execução sob medida e instalação de alto padrão, a proposta da Douro Mármores é simples: unir beleza, durabilidade e detalhe bem resolvido.</p>
                    </>
                  ) : (
                    <>
                      <p>Existe um momento que todo mundo reconhece: você entra em um ambiente e sente. Não é só “bonito”. É acolhedor, elegante, com presença. É o tipo de espaço que dá vontade de ficar — e de mostrar.</p>
                      <p>A gente acredita que a pedra tem esse poder. Não porque ela é cara. Mas porque ela é <strong>verdadeira</strong>: veios únicos, profundidade, textura. Quando bem escolhida e bem executada, ela não compete com o seu projeto — ela <strong>eleva</strong> tudo.</p>
                      <p>A <strong>Douro Mármores</strong> nasceu para transformar esse “uau” em realidade. Da primeira conversa até o último ajuste, o nosso foco é um só: você olhar para sua bancada, seu painel, sua escada… e pensar: <strong>“era exatamente isso.”</strong></p>
                    </>
                  )}
                </div>

                {page !== "quem-somos" ? (
                  <>
                    <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-none">
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 h-full">
                        <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold">
                          <i className="fas fa-compass-drafting" />
                        </div>
                        <div className="font-bold text-gray-900 mt-4">Para arquitetos</div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">Você traz a intenção do projeto. Nós cuidamos da execução para que o desenho sobreviva ao mundo real: encaixes, veios, recortes e acabamento que valorizam a arquitetura.</p>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 h-full">
                        <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold">
                          <i className="fas fa-home" />
                        </div>
                        <div className="font-bold text-gray-900 mt-4">Para clientes finais</div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">Você não precisa saber o nome da pedra. Só precisa ter a certeza de que escolheu certo — e a paz de ver tudo pronto, do jeito que imaginou.</p>
                      </div>
                    </div>

                    <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-7 md:p-8 shadow-sm max-w-none">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(201,169,97,0.15)] flex items-center justify-center text-gold shrink-0">
                          <i className="fas fa-gem" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="font-bold text-gray-900 text-lg">{isQuemSomosPage ? "O que fazemos e onde atuamos" : "Nossa inspiração"}</div>
                            <div className="text-[11px] tracking-widest uppercase text-gray-500">{isQuemSomosPage ? "São Paulo • Zona Sul • Grande São Paulo" : "Inspiração: Douro • Portugal"}</div>
                          </div>

                          {isQuemSomosPage ? (
                            <div className="mt-5 text-gray-700 leading-relaxed space-y-4">
                              <p>Atuamos como <strong>marmoraria em São Paulo</strong> com foco em projetos sob medida para cozinhas, banheiros, lavabos, escadas, áreas gourmet, painéis, mesas, nichos, pisos e revestimentos em pedra natural ou superfícies industrializadas.</p>
                              <p>Estamos na <strong>Zona Sul de São Paulo</strong> e atendemos clientes que procuram <strong>marmoraria na Zona Sul</strong>, <strong>marmoraria em São Paulo capital</strong> e <strong>marmoraria na Grande São Paulo</strong> com solução completa: escolha do material, medição, paginação, produção e instalação.</p>
                              <p>Trabalhamos com <strong>mármores, granitos, quartzitos, quartzos e lâminas sinterizadas</strong>, sempre orientando o cliente sobre qual material faz mais sentido para o uso, a rotina e o estilo do ambiente.</p>
                              <p>Mais do que entregar pedra, entregamos execução limpa, detalhe bem resolvido e um resultado final pensado para valorizar o imóvel e durar no dia a dia.</p>
                            </div>
                          ) : (
                            <>
                              <div className="mt-5 text-gray-700 leading-relaxed space-y-4">
                                <p>Assim como o rio Douro serpenteia entre encostas de vinhas em socalcos, existe ali uma lição simples — e poderosa: o que é realmente extraordinário não nasce da pressa. Naquela paisagem de pedra e sol, cada safra é feita de escolhas silenciosas: a uva certa, o corte no tempo certo, o repouso certo.</p>
                                <p>É assim que o Douro entrega seus vinhos mais nobres — como um <strong>ouro líquido</strong> que carrega origem, cuidado e memória. A Douro Mármores bebe dessa mesma filosofia: para nós, a pedra também tem um tempo — e um respeito.</p>
                              </div>

                              <div className="mt-6 text-gray-700 leading-relaxed space-y-4">
                                <p>A natureza entrega a matéria‑prima com veios únicos e personalidade própria; nós entramos com técnica, olhar e paciência para revelar o melhor dela. Porque quando a peça é bem pensada, bem cortada e bem encaixada, ela não “aparece” como um item da obra: ela vira presença. Vira o ponto onde a sua casa ganha assinatura.</p>
                                <p>Somos apaixonados por pedra e por detalhes que fazem tudo parecer inevitável. Trabalhamos com <strong>mármores, granitos, quartzitos e superfícies premium</strong> para criar peças sob medida que parecem ter nascido no lugar certo.</p>
                                <p>A gente conhece o que dá errado — e é justamente por isso que a nossa entrega é silenciosa. Nada chama atenção para “emenda”, “linha”, “desnível”. O que aparece é só a sensação de <strong>um ambiente pronto</strong>.</p>
                                <p className="font-semibold text-gray-900">Douro é para quem quer abrir a porta e sentir orgulho. Para quem quer receber visitas e ouvir: “Nossa… ficou incrível.”</p>
                                <p><strong>Douro Mármores:</strong> a beleza da pedra, do jeito que ela merece ser vista.</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-7 flex flex-col sm:flex-row gap-4">
                        <a href="?p=contato" className="inline-flex items-center justify-center bg-gray-900 text-white px-7 py-4 rounded-full font-semibold hover:bg-black transition btn-glow" onClick={(e) => { e.preventDefault(); onNav("contato"); }}>
                          <i className="fas fa-calendar-check mr-2 text-gold" />
                          Quero falar do meu projeto
                        </a>
                        <a href="https://wa.me/5511923210038?text=Olá!%20Quero%20orientação%20para%20escolher%20a%20pedra%20ideal%20e%20entender%20a%20faixa%20de%20investimento%20do%20meu%20projeto." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 px-7 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition">
                          <i className="fab fa-whatsapp mr-2" />
                          Falar no WhatsApp
                        </a>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="relative lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-black">
                  <div className="relative aspect-[4/5] bg-black">
                    <video key={aboutVideoSrc} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={ASSETS.about.poster} aria-label="Vídeo sobre nós">
                      <source src={aboutVideoSrc} type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl bg-gray-50 border border-gray-100 p-6">
                  <div className="font-bold text-gray-900">O que você leva para casa</div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Um material escolhido para o seu uso — e não só para a foto.</span></li>
                    <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Veios e recortes que conversam com a arquitetura, sem ruído visual.</span></li>
                    <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Encaixes limpos e acabamento que deixa o ambiente leve.</span></li>
                    <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Um ambiente pronto — com presença — para você sentir orgulho todos os dias.</span></li>
                  </ul>

                  <div className="mt-4 rounded-2xl bg-white border border-gray-100 p-4">
                    <div className="text-xs uppercase tracking-widest text-gray-500">Em uma frase</div>
                    <div className="mt-2 font-semibold text-gray-900 leading-snug">Se o vinho do Douro é <span className="text-gold">ouro líquido</span>, a pedra que entregamos é <span className="text-gold">ouro sólido</span>.</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {([
                    { icon: "fa-eye", title: "Escolha com clareza", text: "Você entende o que combina com o seu estilo e com a sua rotina." },
                    { icon: "fa-ruler-combined", title: "Encaixe perfeito", text: "Medidas, recortes e alinhamentos pensados no detalhe." },
                    { icon: "fa-star", title: "Acabamento que encanta", text: "Uma peça que parece única — e eleva o ambiente inteiro." },
                  ] as const).map((c) => (
                    <div key={c.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 h-full">
                      <div className="text-gold text-lg"><i className={`fas ${c.icon}`} /></div>
                      <div className="font-bold text-gray-900 mt-2">{c.title}</div>
                      <div className="text-sm text-gray-600 mt-1 leading-relaxed">{c.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className={["py-24 bg-gray-50 relative overflow-hidden", visible.has("como-funciona") ? "" : "hidden"].join(" ")}>
          <div className="absolute inset-0 gradient-gold-radial opacity-20" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[rgba(201,169,97,0.10)] rounded-full blur-3xl" aria-hidden="true" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto md:mx-0 text-left">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Como funciona</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">Um processo simples para você <span className="text-gold">escolher certo</span> — e instalar sem surpresa</h2>
              <p className="text-lg md:text-xl text-gray-600 mt-5 leading-relaxed">Você não compra “uma pedra”. Você compra <strong>resultado final</strong>: encaixe perfeito, veios bem posicionados e um ambiente que parece pronto desde sempre.</p>
            </div>

            <div className="mt-10 md:mt-12 grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="md:col-span-5 lg:col-span-5">
                <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(201,169,97,0.15)] flex items-center justify-center text-gold shrink-0">
                      <i className="fas fa-shield-check" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-lg">O que você ganha seguindo o padrão Douro</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span><strong>Decisão segura:</strong> material certo para seu uso (e não só para a foto).</span></li>
                        <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span><strong>Orçamento claro:</strong> você entende o que está pagando (material + engenharia).</span></li>
                        <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span><strong>Acabamento premium:</strong> emendas discretas, borda limpa e nível perfeito.</span></li>
                        <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span><strong>Pós‑obra real:</strong> orientação de uso e suporte para manter a beleza no dia a dia.</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-3 gap-3">
                    {([
                      { k: "Tempo", v: "15–30min", d: "Briefing" },
                      { k: "Visita", v: "1–2h", d: "Medição" },
                      { k: "Entrega", v: "15–20 dias úteis", d: "Média" },
                    ] as const).map((m) => (
                      <div key={m.k} className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                        <div className="text-[11px] uppercase tracking-widest text-gray-500">{m.k}</div>
                        <div className="mt-1 font-bold text-gray-900">{m.v}</div>
                        <div className="mt-1 text-xs text-gray-600">{m.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-3xl bg-gray-900 text-white p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0"><i className="fas fa-bolt text-gold" /></div>
                    <div className="min-w-0">
                      <div className="font-bold text-lg">Quer acelerar seu orçamento?</div>
                      <p className="text-white/80 text-sm mt-2 leading-relaxed">Envie <strong>fotos</strong>, <strong>medidas aproximadas</strong> e uma referência de estilo. Você recebe 2–3 opções ideais (com prós/contras) e uma faixa de investimento.</p>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <a href="https://wa.me/5511923210038?text=Olá!%20Quero%20orientação%20técnica%20(material%20%2B%20faixa%20de%20investimento).%20Vou%20enviar%20fotos%20e%20medidas." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">
                          <i className="fab fa-whatsapp mr-2" />
                          Enviar agora
                        </a>
                        <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Prefiro formulário</a>
                      </div>
                      <div className="mt-3 text-xs text-white/65">Sem compromisso. Resposta em dias úteis.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 lg:col-span-7">
                <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-7 md:p-8 md:mt-0">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500">O processo (6 passos)</div>
                      <div className="mt-1 font-bold text-gray-900 text-xl">Da conversa ao encaixe perfeito</div>
                    </div>
                    <div className="text-sm text-gray-600">Transparente, previsível e sem improviso.</div>
                  </div>

                  <ol className="mt-8 relative border-s border-gray-200">
                    {([
                      { n: "01", icon: "fa-comments", title: "Briefing (15–30 min)", text: "Você conta o que quer sentir no ambiente (estilo, rotina, prioridades). A gente traduz isso em direção de material + acabamento — para você decidir com clareza.", out: "Direção certa, sem dúvida" },
                      { n: "02", icon: "fa-calculator", title: "Orçamento técnico (com ou sem medidas)", text: "Com fotos e medidas aproximadas, você recebe uma proposta transparente: opções de material + faixa de investimento + escopo do que está incluso. Se você não tiver medidas, podemos fazer uma visita de pré‑medida para orçamento. A medição final (fina) acontece somente após a aprovação do pedido e com a base pronta.", out: "Preço com contexto, sem surpresa" },
                      { n: "03", icon: "fa-file-signature", title: "Aprovação do pedido (fechamento)", text: "Você aprova a proposta e a gente trava o escopo: acabamento, bordas, recortes, prazos e logística. Quando o material exige, já reservamos a chapa para você não perder a ‘sua’ pedra.", out: "Pedido confirmado, planejamento fechado" },
                      { n: "04", icon: "fa-ruler-combined", title: "Medição final (no local)", text: "Com móveis/alvenaria prontos, fazemos a medição fina: nível, esquadro e interferências. Pedra não perdoa ‘quase’ — é aqui que evitamos retrabalho e emenda no lugar errado.", out: "Medida exata para corte perfeito" },
                      { n: "05", icon: "fa-cut", title: "Chapa + paginação + produção", text: "Você aprova a chapa real e nós paginamos veios, emendas e recortes. Depois, corte e beneficiamento em oficina: quina 45º, polimento, furos e reforços invisíveis para segurança.", out: "Peças prontas, acabamento premium" },
                      { n: "06", icon: "fa-circle-check", title: "Instalação + pós‑obra", text: "Instalamos, nivelamos e finalizamos com checklist. Depois, você recebe orientação de uso/limpeza e suporte — para a beleza continuar na rotina.", out: "Entrega + suporte no dia a dia" },
                    ] as const).map((s) => (
                      <li key={s.n} className="ms-7 pb-7 last:pb-0">
                        <span className="absolute -start-[11px] mt-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[rgba(201,169,97,0.55)]"><span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" /></span>
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 hover:bg-white transition">
                          <div className="flex items-start gap-4 flex-wrap">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0"><i className={`fas ${s.icon}`} /></div>
                                <div className="min-w-0">
                                  <div className="text-[11px] tracking-widest uppercase text-gray-500">Passo {s.n}</div>
                                  <div className="font-bold text-gray-900">{s.title}</div>
                                </div>
                              </div>
                              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{s.text}</p>
                              <span className="hidden sm:inline-flex lg:hidden mt-4 items-center rounded-full bg-[rgba(201,169,97,0.14)] border border-[rgba(201,169,97,0.35)] px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-gray-900">{s.out}</span>
                            </div>
                            <span className="hidden lg:inline-flex items-center rounded-full bg-[rgba(201,169,97,0.14)] border border-[rgba(201,169,97,0.35)] px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-gray-900 shrink-0">{s.out}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">Quer o melhor resultado sem estresse? <strong className="text-gray-900">Comece com fotos + medidas aproximadas.</strong></div>
                    <a href="?p=contato" className="inline-flex items-center bg-gray-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-black transition btn-glow" onClick={(e) => { e.preventDefault(); onNav("contato"); }}>
                      <i className="fas fa-calendar-check mr-2 text-gold" />
                      Quero meu orçamento técnico
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="produtos" className={["py-24 bg-white", visible.has("produtos") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-16 text-left">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Produtos</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Escolha o Material Ideal para o <span className="text-gold">Seu Projeto</span></h2>
              <p className="text-xl text-gray-600">Aqui você encontra as categorias mais usadas. Em cada uma, mostramos <strong>amostra real</strong> e <strong>aplicação real</strong> (quando aplicável).</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {produtosHubCards.map((c) => (
                <a key={c.p} href={`?p=${c.p}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover-lift" onClick={(e) => { e.preventDefault(); onNav(c.p); }}>
                  <SmartImg src={c.img} fallbackSrcs={c.fallbackSrcs} alt={c.label} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{c.label}</h3>
                    <p className="text-gray-300 text-sm">{c.desc}</p>
                    <span className="inline-flex items-center text-gold mt-3 font-semibold">Ver opções <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition" /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {(() => {
          const all = ASSETS.catalog.marmores;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);

          const isP1 = visible.has("marmores");
          const isP2 = visible.has("marmores-2");
          const isP3 = visible.has("marmores-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === 1 ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav("marmores")} aria-current={active === 1 ? "page" : undefined}>
                <span aria-hidden="true" className="tracking-widest">01</span>
                <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
              </button>
              <div className="w-px self-stretch bg-gray-200" aria-hidden="true" />
              <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === 2 ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav("marmores-2")} aria-current={active === 2 ? "page" : undefined}>
                <span aria-hidden="true" className="tracking-widest">02</span>
                <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
              </button>
              <div className="w-px self-stretch bg-gray-200" aria-hidden="true" />
              <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === 3 ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav("marmores-3")} aria-current={active === 3 ? "page" : undefined}>
                <span aria-hidden="true" className="tracking-widest">03</span>
                <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
              </button>
            </div>
          );

          return (
            <>
              <CatalogSection id="marmores" title="Mármores" subtitle={<><p>Mármore é <strong>atmosfera</strong>. Ele entra no ambiente e muda tudo: luz, textura, silêncio visual. É a pedra do <strong>luxo clássico</strong> e do <strong>hotel boutique</strong> — perfeita para lavatórios, banheiros, painéis e áreas onde a estética é protagonista.</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Sensação</div><div className="mt-1 font-semibold text-gray-900">Elegância imediata</div><div className="mt-1 text-sm">Veios e profundidade que não existem em material “feito em série”.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Onde brilha</div><div className="mt-1 font-semibold text-gray-900">Banhos &amp; painéis</div><div className="mt-1 text-sm">Lavatórios, paredes de destaque, lareiras e pisos internos.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Decisão segura</div><div className="mt-1 font-semibold text-gray-900">Beleza + orientação</div><div className="mt-1 text-sm">A escolha certa depende do seu uso (ácidos, água, rotina).</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceMarmoresTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica de decorador (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{marmoresDecorTip}</p></div></div></div></>} items={page1} show={isP1} onNav={onNav} backTo="produtos" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="marmores-2" title="Mármores" subtitle={<><p>Mais opções para você comparar <strong>veio</strong>, cor e personalidade. Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p><p>Quer um acabamento de alto padrão? Combine o mármore com <strong>meia‑esquadria 45º</strong>, paginação bem pensada e uma instalação nivelada. O luxo, no fim, é o <strong>silêncio do detalhe</strong>.</p></>} items={page2} show={isP2} onNav={onNav} backTo="produtos" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="marmores-3" title="Mármores" subtitle={<><p>Última seleção — aqui estão os mármores para quem quer um resultado com assinatura: contrastes, movimentos e texturas que parecem uma peça de galeria.</p><p>Se você estiver em dúvida entre dois materiais, me mande fotos do ambiente + referências de estilo. Eu te digo qual vai ficar mais elegante <strong>com a sua marcenaria, luz e metais</strong>.</p><p className="text-sm text-gray-600">Dica prática: mármore bem cuidado (limpeza suave e impermeabilização em dia) atravessa anos com beleza — e, quando precisa, dá para restaurar com polimento.</p></>} items={page3} show={isP3} onNav={onNav} backTo="produtos" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        {(() => {
          const all = ASSETS.catalog.granitos;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);
          const isP1 = visible.has("granitos");
          const isP2 = visible.has("granitos-2");
          const isP3 = visible.has("granitos-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "granitos" : n === 2 ? "granitos-2" : "granitos-3")} aria-current={active === n ? "page" : undefined} aria-label={`Granitos — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="granitos" title="Granitos" subtitle={<><p>Granito é a escolha de quem quer <strong>tranquilidade na rotina</strong>. Ele aguenta cozinha de verdade, área gourmet, família e festa — com baixa manutenção e uma estética que vai do clássico ao super contemporâneo.</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Performance</div><div className="mt-1 font-semibold text-gray-900">Resistência real</div><div className="mt-1 text-sm">Ótimo para quem cozinha muito e quer durabilidade sem drama.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Estilo</div><div className="mt-1 font-semibold text-gray-900">Do neutro ao exótico</div><div className="mt-1 text-sm">Pretos profundos, claros iluminados e mesclados práticos.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Melhor resultado</div><div className="mt-1 font-semibold text-gray-900">Acabamento premium</div><div className="mt-1 text-sm">A mesma pedra muda de nível com meia‑esquadria 45º e emenda planejada.</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceGranitosTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica de decorador (rotativa)</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{granitosDecorTip}</p></div></div></div></>} items={page1} show={isP1} onNav={onNav} backTo="produtos" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="granitos-2" title="Granitos" subtitle={<><p>Segunda seleção — mais opções para você comparar <strong>tonalidade</strong>, <strong>granulação</strong> e presença. Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p><p>Quer escolher sem erro? Envie fotos + medidas aproximadas e me diga seu uso (cozinha pesada, gourmet, família). A gente indica 2–3 opções ideais com prós/contras e uma faixa de investimento.</p><p className="text-sm text-gray-600">Granito bem instalado parece simples — mas é justamente a execução (nível, pingadeira, química e acabamento) que define se ele vai ficar perfeito por décadas.</p></>} items={page2} show={isP2} onNav={onNav} backTo="produtos" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="granitos-3" title="Granitos" subtitle={<><p>Terceira seleção — final. Se você estiver em dúvida entre 2–3 opções, me mande uma foto do ambiente + medidas aproximadas. Eu te digo qual vai ficar mais elegante <strong>com a sua marcenaria, luz e metais</strong>.</p><p className="text-sm text-gray-600">Para resultado premium: planeje bordas (meia‑esquadria 45º), emendas discretas e instalação nivelada.</p></>} items={page3} show={isP3} onNav={onNav} backTo="produtos" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        <section id="quartzo" className={["py-16 bg-white", visible.has("quartzo") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
              <div className="min-w-0">
                <p className="text-sm uppercase tracking-widest text-gold font-semibold">Catálogo</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Quartzo</h2>
                <div className="text-gray-600 mt-3 max-w-2xl space-y-3 leading-relaxed">
                  <p>Quartzo é uma superfície de engenharia: visual uniforme, baixa porosidade e excelente para projetos contemporâneos.</p>
                  <p className="text-sm">Escolha a marca para comparar cores e ver <strong>aplicações reais</strong> com mais clareza.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-start sm:justify-end">
                <a href="?p=contato" className="bg-gold text-white px-7 py-3 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow w-full sm:w-auto text-center" onClick={(e) => { e.preventDefault(); onNav("contato"); }}>
                  Solicitar orçamento
                </a>
              </div>
            </div>

            <div className="max-w-5xl text-left">
              {(() => {
                const silestoneItems = ASSETS.catalog.quartzo.filter((it) => it.name.toLowerCase().startsWith("silestone "));
                const qsItems = ASSETS.catalog.quartzo.filter((it) => it.name.toLowerCase().startsWith("quartzo stone ") || (it.tag || "").toLowerCase().includes("quartzo stone"));
                const silestonePick = pickSeeded(silestoneItems, "quartzo_silestone", quartzoHubSeed);
                const qsPick = pickSeeded(qsItems, "quartzo_quartzostone", quartzoHubSeed);
                const cards = [
                  { p: "silestone" as const, label: "Silestone", badge: "QUARTZO", desc: "Cores premium e uniformidade.", img: silestonePick?.applied || silestonePick?.sample || ASSETS.produtosHub.quartzo, fallbackSrcs: [silestonePick?.applied, silestonePick?.sample, ASSETS.produtosHub.quartzo].filter(Boolean) as string[] },
                  { p: "quartzo-stone" as const, label: "Quartzo Stone", badge: "QUARTZO", desc: "Opções versáteis e excelente custo-benefício.", img: qsPick?.sample || qsPick?.applied || ASSETS.produtosHub.quartzo, fallbackSrcs: [qsPick?.sample, qsPick?.applied, ASSETS.produtosHub.quartzo].filter(Boolean) as string[] },
                ];
                return (
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    {cards.map((b) => (
                      <a key={b.p} href={`?p=${b.p}`} className="group relative overflow-hidden rounded-2xl hover-lift aspect-[16/10] sm:aspect-[16/9]" onClick={(e) => { e.preventDefault(); onNav(b.p); }}>
                        <SmartImg src={b.img} fallbackSrcs={b.fallbackSrcs} alt={`${b.label} - quartzo`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute top-4 left-4"><span className="inline-flex items-center bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs tracking-widest">{b.badge}</span></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6"><h3 className="text-2xl font-bold text-white">{b.label}</h3><p className="text-gray-200 text-sm mt-2">{b.desc}</p><span className="inline-flex items-center text-gold mt-3 font-semibold">Ver cores <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition" /></span></div>
                      </a>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {(() => {
          const allSilestone = ASSETS.catalog.quartzo.filter((it) => it.name.toLowerCase().startsWith("silestone "));
          const size = Math.ceil(allSilestone.length / 3);
          const page1 = allSilestone.slice(0, size);
          const page2 = allSilestone.slice(size, size * 2);
          const page3 = allSilestone.slice(size * 2);
          const isP1 = visible.has("silestone");
          const isP2 = visible.has("silestone-2");
          const isP3 = visible.has("silestone-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "silestone" : n === 2 ? "silestone-2" : "silestone-3")} aria-current={active === n ? "page" : undefined} aria-label={`Silestone — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="silestone" title="Silestone" subtitle={<><p>Silestone é quartzo de engenharia com estética uniforme e acabamento sofisticado — ideal para cozinhas e banheiros contemporâneos.</p><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceSilestoneTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica de decorador (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{silestoneDecorTip}</p></div></div></div><p className="text-sm text-gray-600">Clique no card para alternar <strong>amostra</strong> e <strong>aplicação</strong>. A tag mostra a <strong>coleção</strong> de cada cor.</p></>} items={page1} show={isP1} onNav={onNav} backTo="quartzo" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="silestone-2" title="Silestone" subtitle={<><p>Segunda seleção — mais cores para você comparar visual, brilho e personalidade. Use a tag do card para ver a <strong>coleção</strong>.</p></>} items={page2} show={isP2} onNav={onNav} backTo="quartzo" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="silestone-3" title="Silestone" subtitle={<><p>Terceira seleção — final. Se você estiver entre 2–3 opções, me envie uma foto do ambiente e eu te ajudo a harmonizar com <strong>marcenaria</strong>, <strong>metais</strong> e <strong>iluminação</strong>.</p></>} items={page3} show={isP3} onNav={onNav} backTo="quartzo" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        {(() => {
          const allQS = ASSETS.catalog.quartzo.filter((it) => it.name.toLowerCase().startsWith("quartzo stone "));
          const size = Math.ceil(allQS.length / 3);
          const page1 = allQS.slice(0, size);
          const page2 = allQS.slice(size, size * 2);
          const page3 = allQS.slice(size * 2);
          const isP1 = visible.has("quartzo-stone");
          const isP2 = visible.has("quartzo-stone-2");
          const isP3 = visible.has("quartzo-stone-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "quartzo-stone" : n === 2 ? "quartzo-stone-2" : "quartzo-stone-3")} aria-current={active === n ? "page" : undefined} aria-label={`Quartzo Stone — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="quartzo-stone" title="Quartzo Stone" subtitle={<><p>Quartzo Stone é quartzo de engenharia: visual uniforme, baixa porosidade e ótima praticidade para cozinhas e banheiros contemporâneos. Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação</strong>.</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Rotina</div><div className="mt-1 font-semibold text-gray-900">Baixa porosidade</div><div className="mt-1 text-sm">Excelente para o dia a dia: limpeza simples e aparência consistente.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Linhas</div><div className="mt-1 font-semibold text-gray-900">Absoluto &amp; Stellar</div><div className="mt-1 text-sm">Absoluto = cores sólidas • Stellar = partículas e brilho discreto.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Atenção</div><div className="mt-1 font-semibold text-gray-900">Calor extremo</div><div className="mt-1 text-sm">Use apoio térmico para panela muito quente (protege a resina).</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceQuartzoStoneTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{quartzoStoneDecorTip}</p></div></div></div><p className="text-sm text-gray-600">A tag do card indica a linha (ex.: <strong>Stellar</strong> / <strong>Absoluto</strong>).</p></>} items={page1} show={isP1} onNav={onNav} backTo="quartzo" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="quartzo-stone-2" title="Quartzo Stone" subtitle={<><p>Segunda seleção — mais cores para você comparar com sua marcenaria, metais e iluminação.</p><p className="text-sm text-gray-600">Dica: tons médios (cinzas e beges) costumam ser os mais fáceis de manter bonitos no dia a dia.</p></>} items={page2} show={isP2} onNav={onNav} backTo="quartzo" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="quartzo-stone-3" title="Quartzo Stone" subtitle={<><p>Terceira seleção — final. Se você estiver entre 2 opções, me mande uma foto do ambiente (luz + marcenaria) e eu te ajudo a escolher.</p></>} items={page3} show={isP3} onNav={onNav} backTo="quartzo" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        {(() => {
          const all = ASSETS.catalog.quartzitos;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);
          const isP1 = visible.has("quartzitos");
          const isP2 = visible.has("quartzitos-2");
          const isP3 = visible.has("quartzitos-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "quartzitos" : n === 2 ? "quartzitos-2" : "quartzitos-3")} aria-current={active === n ? "page" : undefined} aria-label={`Quartzitos — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection
                id="quartzitos"
                title="Quartzitos"
                subtitle={
                  <>
                    <p>
                      Quartzito é para quem quer o visual nobre das pedras mais desejadas da arquitetura com um desempenho excelente para <strong>cozinhas</strong>, <strong>ilhas</strong>, <strong>bancadas</strong> e <strong>áreas gourmet</strong>. Ele combina veios marcantes, presença natural e uma estrutura mineral muito mais preparada para a rotina real.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Estética</div>
                        <div className="mt-1 font-semibold text-gray-900">Veios naturais e exclusivos</div>
                        <div className="mt-1 text-sm">Cada chapa tem movimento próprio e cria uma leitura sofisticada no ambiente.</div>
                      </div>
                      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Desempenho</div>
                        <div className="mt-1 font-semibold text-gray-900">Mais segurança no uso</div>
                        <div className="mt-1 text-sm">Excelente para quem busca uma pedra natural resistente para bancada sem abrir mão do impacto visual.</div>
                      </div>
                      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Resultado</div>
                        <div className="mt-1 font-semibold text-gray-900">Chapa + paginação + acabamento</div>
                        <div className="mt-1 text-sm">No quartzito, o resultado premium aparece quando a escolha da chapa conversa com o corte e a instalação.</div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={advanceQuartzitosTip}
                          className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition"
                          aria-label="Trocar dica"
                          title="Trocar dica"
                        >
                          <i className="fas fa-wand-magic-sparkles" />
                        </button>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-xs uppercase tracking-widest text-gray-500">Dica de decorador (rotativa)</div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{quartzitosDecorTip}</p>
                        </div>
                      </div>
                    </div>
                  </>
                }
                items={page1}
                show={isP1}
                onNav={onNav}
                backTo="produtos"
                extraActions={pager(1)}
                footerActions={pager(1)}
              />
              <CatalogSection id="quartzitos-2" title="Quartzitos" subtitle={<><p>Segunda seleção — mais quartzitos para você comparar <strong>movimento do veio</strong>, tonalidade e presença. Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p><p className="text-sm text-gray-600">Para um resultado premium: combine quartzito com <strong>meia‑esquadria 45º</strong>, emendas planejadas e acabamento bem fechado.</p></>} items={page2} show={isP2} onNav={onNav} backTo="produtos" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="quartzitos-3" title="Quartzitos" subtitle={<><p>Terceira seleção — final. Se você estiver em dúvida entre 2–3 opções, me mande fotos do ambiente + medidas aproximadas. Eu te digo qual vai ficar mais elegante <strong>com a sua marcenaria, luz e metais</strong>.</p></>} items={page3} show={isP3} onNav={onNav} backTo="produtos" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        {page === "granito-material" && currentGranitoItem ? (
          <section id="granito-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=granitos" onClick={(e) => { e.preventDefault(); onNav("granitos"); }} className="hover:text-gray-900 transition">Granitos</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentGranitoItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentGranitoItem.applied} fallbackSrcs={[currentGranitoItem.sample]} alt={`${currentGranitoItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentGranitoItem.sample} fallbackSrcs={[currentGranitoItem.applied]} alt={`${currentGranitoItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentGranitoItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentGranitoItem.tag || "Granito premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Alta resistência para cozinhas e áreas gourmet</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Excelente desempenho para rotina intensa</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com paginação premium</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentGranitoContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentGranitoItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentGranitoContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentGranitoContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentGranitoContent.practical}</p>
                      <p>{currentGranitoContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste granito
                      </a>
                      <a href="?p=granitos" onClick={(e) => { e.preventDefault(); onNav("granitos"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para granitos
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentGranitoContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentGranitoContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentGranitoContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentGranitoContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentGranitoContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentGranitoContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500">Outros granitos</div>
                      <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                      <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar tonalidade, granulação, presença e harmonia com a marcenaria e os metais, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {granitoSuggestions.map((it) => {
                      const slug = normalizeGranitoSlug(it.name);
                      return (
                        <a
                          key={it.name}
                          href={buildGranitoPageUrl(slug)}
                          onClick={(e) => {
                            e.preventDefault();
                            goToGranitoMaterial(slug);
                          }}
                          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition"
                        >
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg
                              src={it.applied}
                              fallbackSrcs={[it.sample]}
                              alt={it.name}
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Granito\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">
                              Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" />
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "quartzito-material" && currentQuartzitoItem ? (
          <section id="quartzito-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=quartzitos" onClick={(e) => { e.preventDefault(); onNav("quartzitos"); }} className="hover:text-gray-900 transition">Quartzitos</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentQuartzitoItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentQuartzitoItem.applied} fallbackSrcs={[currentQuartzitoItem.sample]} alt={`${currentQuartzitoItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentQuartzitoItem.sample} fallbackSrcs={[currentQuartzitoItem.applied]} alt={`${currentQuartzitoItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentQuartzitoItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentQuartzitoItem.tag || "Quartzito premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Veios naturais e visual exclusivo</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Alta resistência para cozinhas, ilhas e painéis</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com paginação premium</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentQuartzitoContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentQuartzitoItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentQuartzitoContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentQuartzitoContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentQuartzitoContent.practical}</p>
                      <p>{currentQuartzitoContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste quartzito
                      </a>
                      <a href="?p=quartzitos" onClick={(e) => { e.preventDefault(); onNav("quartzitos"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para quartzitos
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzitoContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzitoContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzitoContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzitoContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzitoContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzitoContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500">Outros quartzitos</div>
                      <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                      <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar movimento de veio, temperatura visual, presença e harmonia com marcenaria e metais, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {quartzitoSuggestions.map((it) => {
                      const slug = normalizeQuartzitoSlug(it.name);
                      return (
                        <a
                          key={it.name}
                          href={buildQuartzitoPageUrl(slug)}
                          onClick={(e) => {
                            e.preventDefault();
                            goToQuartzitoMaterial(slug);
                          }}
                          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition"
                        >
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg
                              src={it.applied}
                              fallbackSrcs={[it.sample]}
                              alt={it.name}
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Quartzito\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">
                              Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" />
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "marmore-material" && currentMarmoreItem ? (
          <section id="marmore-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=marmores" onClick={(e) => { e.preventDefault(); onNav("marmores"); }} className="hover:text-gray-900 transition">Mármores</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentMarmoreItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentMarmoreItem.applied} fallbackSrcs={[currentMarmoreItem.sample]} alt={`${currentMarmoreItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentMarmoreItem.sample} fallbackSrcs={[currentMarmoreItem.applied]} alt={`${currentMarmoreItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentMarmoreItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentMarmoreItem.tag || "Mármore premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Elegância natural para interiores de alto padrão</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Ideal para lavabos, banheiros, painéis e lareiras</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com paginação premium</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentMarmoreContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentMarmoreItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentMarmoreContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentMarmoreContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentMarmoreContent.practical}</p>
                      <p>{currentMarmoreContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste mármore
                      </a>
                      <a href="?p=marmores" onClick={(e) => { e.preventDefault(); onNav("marmores"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para mármores
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentMarmoreContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentMarmoreContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentMarmoreContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentMarmoreContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentMarmoreContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentMarmoreContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500">Outros mármores</div>
                      <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                      <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar movimento de veio, temperatura visual, sofisticação e harmonia com metais, iluminação e marcenaria, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marmoreSuggestions.map((it) => {
                      const slug = normalizeMarmoreSlug(it.name);
                      return (
                        <a
                          key={it.name}
                          href={buildMarmorePageUrl(slug)}
                          onClick={(e) => {
                            e.preventDefault();
                            goToMarmoreMaterial(slug);
                          }}
                          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition"
                        >
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg
                              src={it.applied}
                              fallbackSrcs={[it.sample]}
                              alt={it.name}
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Mármore\s+/i, "").replace(/^Marmore\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">
                              Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" />
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "silestone-material" && currentSilestoneItem ? (
          <section id="silestone-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=quartzo" onClick={(e) => { e.preventDefault(); onNav("quartzo"); }} className="hover:text-gray-900 transition">Quartzo</a>
                  <span>/</span>
                  <a href="?p=silestone" onClick={(e) => { e.preventDefault(); onNav("silestone"); }} className="hover:text-gray-900 transition">Silestone</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentSilestoneItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentSilestoneItem.applied} fallbackSrcs={[currentSilestoneItem.sample]} alt={`${currentSilestoneItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentSilestoneItem.sample} fallbackSrcs={[currentSilestoneItem.applied]} alt={`${currentSilestoneItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentSilestoneItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentSilestoneItem.tag || "Silestone premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Baixa porosidade e estética sofisticada</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Indicado para cozinhas, ilhas, banheiros e lavabos</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com visual contemporâneo</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentSilestoneContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentSilestoneItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentSilestoneContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentSilestoneContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentSilestoneContent.practical}</p>
                      <p>{currentSilestoneContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste Silestone
                      </a>
                      <a href="?p=silestone" onClick={(e) => { e.preventDefault(); onNav("silestone"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para Silestone
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentSilestoneContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSilestoneContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentSilestoneContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSilestoneContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentSilestoneContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSilestoneContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Outros Silestone</div>
                  <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                  <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar branco, marmorizado e leitura visual com marcenaria e metais, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {silestoneSuggestions.map((it) => {
                      const slug = normalizeSilestoneSlug(it.name);
                      return (
                        <a key={it.name} href={buildSilestonePageUrl(slug)} onClick={(e) => { e.preventDefault(); goToSilestoneMaterial(slug); }} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition">
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg src={it.applied} fallbackSrcs={[it.sample]} alt={it.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Silestone\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" /></div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "quartzo-stone-material" && currentQuartzoStoneItem ? (
          <section id="quartzo-stone-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=quartzo" onClick={(e) => { e.preventDefault(); onNav("quartzo"); }} className="hover:text-gray-900 transition">Quartzo</a>
                  <span>/</span>
                  <a href="?p=quartzo-stone" onClick={(e) => { e.preventDefault(); onNav("quartzo-stone"); }} className="hover:text-gray-900 transition">Quartzo Stone</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentQuartzoStoneItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentQuartzoStoneItem.applied} fallbackSrcs={[currentQuartzoStoneItem.sample]} alt={`${currentQuartzoStoneItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentQuartzoStoneItem.sample} fallbackSrcs={[currentQuartzoStoneItem.applied]} alt={`${currentQuartzoStoneItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentQuartzoStoneItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentQuartzoStoneItem.tag || "Quartzo Stone premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Baixa porosidade e visual contemporâneo</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Indicado para cozinhas, ilhas, banheiros e lavabos</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com leitura uniforme</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentQuartzoStoneContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentQuartzoStoneItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentQuartzoStoneContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentQuartzoStoneContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentQuartzoStoneContent.practical}</p>
                      <p>{currentQuartzoStoneContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste Quartzo Stone
                      </a>
                      <a href="?p=quartzo-stone" onClick={(e) => { e.preventDefault(); onNav("quartzo-stone"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para Quartzo Stone
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzoStoneContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzoStoneContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzoStoneContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzoStoneContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentQuartzoStoneContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentQuartzoStoneContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Outros Quartzo Stone</div>
                  <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                  <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar branco, preto, bege e textura visual com a marcenaria e os metais, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {quartzoStoneSuggestions.map((it) => {
                      const slug = normalizeQuartzoStoneSlug(it.name);
                      return (
                        <a key={it.name} href={buildQuartzoStonePageUrl(slug)} onClick={(e) => { e.preventDefault(); goToQuartzoStoneMaterial(slug); }} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition">
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg src={it.sample} fallbackSrcs={[it.applied]} alt={it.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Quartzo\s+Stone\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar amostra, aplicação e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" /></div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "dekton-material" && currentDektonItem ? (
          <section id="dekton-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=laminas" onClick={(e) => { e.preventDefault(); onNav("laminas"); }} className="hover:text-gray-900 transition">Lâminas</a>
                  <span>/</span>
                  <a href="?p=dekton" onClick={(e) => { e.preventDefault(); onNav("dekton"); }} className="hover:text-gray-900 transition">Dekton</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentDektonItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentDektonItem.applied} fallbackSrcs={[currentDektonItem.sample]} alt={`${currentDektonItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentDektonItem.sample} fallbackSrcs={[currentDektonItem.applied]} alt={`${currentDektonItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentDektonItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentDektonItem.tag || "Dekton premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Superfície sinterizada com linguagem premium</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Indicada para cozinhas, ilhas, painéis e áreas gourmet</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com estética contemporânea</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentDektonContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentDektonItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentDektonContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentDektonContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentDektonContent.practical}</p>
                      <p>{currentDektonContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste Dekton
                      </a>
                      <a href="?p=dekton" onClick={(e) => { e.preventDefault(); onNav("dekton"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para Dekton
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentDektonContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentDektonContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentDektonContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentDektonContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentDektonContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentDektonContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Outros Dekton</div>
                  <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                  <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar claros, escuros, marmorizados e superfícies contemporâneas com marcenaria, metais e iluminação, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {dektonSuggestions.map((it) => {
                      const slug = normalizeDektonSlug(it.name);
                      return (
                        <a key={it.name} href={buildDektonPageUrl(slug)} onClick={(e) => { e.preventDefault(); goToDektonMaterial(slug); }} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition">
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg src={it.applied} fallbackSrcs={[it.sample]} alt={it.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Dekton\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" /></div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {page === "sinth-material" && currentSinthItem ? (
          <section id="sinth-material" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-[1380px] mx-auto">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                  <a href="?p=produtos" onClick={(e) => { e.preventDefault(); onNav("produtos"); }} className="hover:text-gray-900 transition">Produtos</a>
                  <span>/</span>
                  <a href="?p=laminas" onClick={(e) => { e.preventDefault(); onNav("laminas"); }} className="hover:text-gray-900 transition">Lâminas</a>
                  <span>/</span>
                  <a href="?p=sinth" onClick={(e) => { e.preventDefault(); onNav("sinth"); }} className="hover:text-gray-900 transition">Sinth</a>
                  <span>/</span>
                  <span className="text-gray-900 font-semibold">{currentSinthItem.name}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">
                  <div className="space-y-5 lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                      <SmartImg src={currentSinthItem.applied} fallbackSrcs={[currentSinthItem.sample]} alt={`${currentSinthItem.name} aplicado`} className="w-full aspect-[16/10] object-cover" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <SmartImg src={currentSinthItem.sample} fallbackSrcs={[currentSinthItem.applied]} alt={`${currentSinthItem.name} amostra`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Material</div>
                        <div className="mt-2 font-bold text-gray-900 text-xl">{currentSinthItem.name}</div>
                        <div className="mt-2 text-sm text-gray-600">{currentSinthItem.tag || "Sinth premium"}</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Superfície sinterizada de linguagem contemporânea</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Indicada para bancadas, ilhas, painéis e banheiros</span></li>
                          <li className="flex gap-3"><i className="fas fa-check text-gold mt-1" /><span>Acabamento sob medida com leitura premium</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:pl-2">
                    <p className="text-sm uppercase tracking-widest text-gold font-semibold">{currentSinthContent.eyebrow || "Página exclusiva do material"}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">{currentSinthItem.name}</h1>
                    <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
                      <p>{currentSinthContent.intro}</p>
                      <p><strong className="text-gray-900">Em termos técnicos:</strong> {currentSinthContent.technical}</p>
                      <p><strong className="text-gray-900">Na prática:</strong> {currentSinthContent.practical}</p>
                      <p>{currentSinthContent.value}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a href="?p=contato" onClick={(e) => { e.preventDefault(); onNav("contato"); }} className="inline-flex items-center justify-center bg-gold text-white px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow">
                        Solicitar orçamento deste Sinth
                      </a>
                      <a href="?p=sinth" onClick={(e) => { e.preventDefault(); onNav("sinth"); }} className="inline-flex items-center justify-center border border-gray-300 text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition">
                        Voltar para Sinth
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Indicação</div><div className="mt-1 font-semibold text-gray-900">{currentSinthContent.indicationTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSinthContent.indicationText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Benefício real</div><div className="mt-1 font-semibold text-gray-900">{currentSinthContent.benefitTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSinthContent.benefitText}</div></div>
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Execução</div><div className="mt-1 font-semibold text-gray-900">{currentSinthContent.executionTitle}</div><div className="mt-1 text-sm text-gray-600">{currentSinthContent.executionText}</div></div>
                </div>

                <div className="mt-10 rounded-3xl bg-gray-50 border border-gray-100 p-6 lg:p-7">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Outros Sinth</div>
                  <div className="mt-1 font-bold text-gray-900 text-lg">Veja outras opções que podem combinar com a proposta do seu projeto</div>
                  <p className="mt-2 text-sm text-gray-600 max-w-3xl">Se a sua ideia é comparar claros, escuros, marmorizados e superfícies contemporâneas com marcenaria, metais e iluminação, estas sugestões ajudam a ampliar o repertório sem perder o nível do projeto.</p>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sinthSuggestions.map((it) => {
                      const slug = normalizeSinthSlug(it.name);
                      return (
                        <a key={it.name} href={buildSinthPageUrl(slug)} onClick={(e) => { e.preventDefault(); goToSinthMaterial(slug); }} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition">
                          <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                            <SmartImg src={it.applied} fallbackSrcs={[it.sample]} alt={it.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-gray-900 leading-snug">{it.name.replace(/^Sinth\s+/i, "")}</div>
                            <div className="mt-1 text-sm text-gray-600">Ver detalhes deste material e comparar aplicação, amostra e proposta estética.</div>
                            <div className="mt-3 inline-flex items-center text-sm font-semibold text-gold">Ver detalhes <i className="fas fa-arrow-right ml-2 transition group-hover:translate-x-1" /></div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {(() => {
          const all = ASSETS.catalog.limestone;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);
          const isP1 = visible.has("limestone");
          const isP2 = visible.has("limestone-2");
          const isP3 = visible.has("limestone-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "limestone" : n === 2 ? "limestone-2" : "limestone-3")} aria-current={active === n ? "page" : undefined} aria-label={`Limestone — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="limestone" title="Limestone" subtitle={<><p>Limestone é a pedra do <strong>orgânico sofisticado</strong>: tons quentes, textura elegante e uma estética que deixa o ambiente mais acolhedor. É muito usado em banheiros, lavabos, paredes de destaque e projetos onde a sensação de conforto é prioridade.</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Estética</div><div className="mt-1 font-semibold text-gray-900">Textura &amp; calor</div><div className="mt-1 text-sm">Tons creme, bege e variações naturais que deixam o espaço mais humano.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Onde brilha</div><div className="mt-1 font-semibold text-gray-900">Banhos &amp; paredes</div><div className="mt-1 text-sm">Lavatórios, painéis, nichos e revestimentos internos.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Resultado</div><div className="mt-1 font-semibold text-gray-900">Detalhe silencioso</div><div className="mt-1 text-sm">Acabamento certo (borda/paginação) faz o material parecer ainda mais premium.</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceLimestoneTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{limestoneDecorTip}</p></div></div></div><p className="text-sm text-gray-600">Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p></>} items={page1} show={isP1} onNav={onNav} backTo="produtos" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="limestone-2" title="Limestone" subtitle={<><p>Segunda seleção — mais opções para você comparar <strong>tonalidade</strong>, <strong>textura</strong> e presença. Use as imagens de <strong>aplicação</strong> para sentir como o material conversa com luz e marcenaria.</p><p className="text-sm text-gray-600">Quer que eu te ajude a escolher? Envie uma foto do seu ambiente e diga a sensação que você quer (mais claro, mais quente, mais minimalista). Eu te devolvo 2–3 opções com prós/contras.</p></>} items={page2} show={isP2} onNav={onNav} backTo="produtos" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="limestone-3" title="Limestone" subtitle={<><p>Terceira seleção — final. Aqui estão as últimas opções para você fechar sua escolha.</p><p className="text-sm text-gray-600">Se você estiver entre 2 materiais, me mande uma foto do ambiente (luz + marcenaria). Eu te digo qual vai ficar mais elegante e mais coerente com o conjunto.</p></>} items={page3} show={isP3} onNav={onNav} backTo="produtos" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        {(() => {
          const all = ASSETS.catalog.onix;
          const mid = Math.ceil(all.length / 2);
          const page1 = all.slice(0, mid);
          const page2 = all.slice(mid);
          const isP1 = visible.has("onix");
          const isP2 = visible.has("onix-2");

          const pager = (active: 1 | 2) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === 1 ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav("onix")} aria-current={active === 1 ? "page" : undefined}>
                <span aria-hidden="true" className="tracking-widest">01</span>
                <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
              </button>
              <div className="w-px self-stretch bg-gray-200" aria-hidden="true" />
              <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === 2 ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav("onix-2")} aria-current={active === 2 ? "page" : undefined}>
                <span aria-hidden="true" className="tracking-widest">02</span>
                <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
              </button>
            </div>
          );

          return (
            <>
              <CatalogSection id="onix" title="Ônix" subtitle={<><p>Ônix é uma pedra para <strong>impacto máximo</strong>. Quando você usa em painel, bar, lavabo ou parede de destaque, o ambiente vira uma peça de galeria — principalmente com <strong>backlight</strong> (iluminação por trás).</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Efeito</div><div className="mt-1 font-semibold text-gray-900">Translúcido (backlight)</div><div className="mt-1 text-sm">Iluminação por trás transforma a pedra em “joia”.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Onde brilha</div><div className="mt-1 font-semibold text-gray-900">Painéis &amp; bares</div><div className="mt-1 text-sm">Lavabos, bares, paredes de destaque e nichos premium.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Resultado</div><div className="mt-1 font-semibold text-gray-900">Paginação do desenho</div><div className="mt-1 text-sm">O luxo aparece quando o desenho do veio é planejado.</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceOnixTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{onixDecorTip}</p></div></div></div><p className="text-sm text-gray-600">Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p></>} items={page1} show={isP1} onNav={onNav} backTo="produtos" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="onix-2" title="Ônix" subtitle={<><p>Segunda seleção de Ônix — mais opções para você comparar cor, translucidez e presença no ambiente.</p><p className="text-sm text-gray-600">Se você quiser backlight, me diga o tamanho do painel e onde será instalado: a escolha da chapa e a iluminação definem o resultado final.</p></>} items={page2} show={isP2} onNav={onNav} backTo="produtos" extraActions={pager(2)} footerActions={pager(2)} />
            </>
          );
        })()}

        <section id="laminas" className={["py-16 bg-white", visible.has("laminas") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
              <div className="min-w-0">
                <p className="text-sm uppercase tracking-widest text-gold font-semibold">Catálogo</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Lâminas</h2>
                <div className="text-gray-600 mt-3 max-w-2xl space-y-3 leading-relaxed">
                  <p>Trabalhamos com lâminas (ultra compactas / sinterizadas) para bancadas, ilhas, painéis e fachadas — alta performance com estética premium.</p>
                  <p className="text-sm">Escolha a marca e veja as <strong>cores</strong> disponíveis.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-start sm:justify-end">
                <a href="?p=contato" className="bg-gold text-white px-7 py-3 rounded-full font-semibold hover:bg-yellow-600 transition btn-glow w-full sm:w-auto text-center" onClick={(e) => { e.preventDefault(); onNav("contato"); }}>
                  Solicitar orçamento
                </a>
              </div>
            </div>

            <div className="max-w-5xl lg:max-w-6xl">
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {([
                  { p: "dekton", label: "Dekton", badge: "ULTRA COMPACTO", desc: "Alta resistência", img: ASSETS.laminasHub.dekton },
                  { p: "neolith", label: "Neolith", badge: "SINTERIZADO", desc: "Design premium", img: ASSETS.laminasHub.neolith },
                  { p: "sinth", label: "Sinth", badge: "SINTERIZADO", desc: "Grande formato", img: ASSETS.laminasHub.sinth },
                ] as const).map((b) => (
                  <a key={b.p} href={`?p=${b.p}`} className="group relative overflow-hidden rounded-2xl hover-lift aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3]" onClick={(e) => { e.preventDefault(); onNav(b.p); }}>
                    <img src={b.img} alt={`${b.label} - lâmina`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4"><span className="inline-flex items-center bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs tracking-widest">{b.badge}</span></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5"><h3 className="text-2xl font-bold text-white">{b.label}</h3><p className="text-gray-200 text-sm mt-2">{b.desc}</p><span className="inline-flex items-center text-gold mt-3 font-semibold">Ver cores <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition" /></span></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {(() => {
          const all = ASSETS.catalog.dekton;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);
          const isP1 = visible.has("dekton");
          const isP2 = visible.has("dekton-2");
          const isP3 = visible.has("dekton-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "dekton" : n === 2 ? "dekton-2" : "dekton-3")} aria-current={active === n ? "page" : undefined}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="dekton" title="Dekton" subtitle={<><p>Dekton é uma <strong>superfície sinterizada ultra compacta</strong> — feita para quem quer estética premium com performance: baixa porosidade, alta resistência ao calor e excelente estabilidade de cor. É o tipo de material que dá liberdade: cozinha, área gourmet e painéis com visual impecável.</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Para o dia a dia</div><div className="mt-1 font-semibold text-gray-900">Baixa porosidade</div><div className="mt-1 text-sm">Menos absorção, mais tranquilidade com respingos e rotina.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Performance</div><div className="mt-1 font-semibold text-gray-900">Calor &amp; química</div><div className="mt-1 text-sm">Ótimo para quem cozinha e quer uma superfície de alto desempenho.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Resultado</div><div className="mt-1 font-semibold text-gray-900">Linhas limpas</div><div className="mt-1 text-sm">Perfeito para projetos contemporâneos e grandes planos.</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceDektonTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{dektonDecorTip}</p></div></div></div></>} items={page1} show={isP1} onNav={onNav} backTo="laminas" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="dekton-2" title="Dekton" subtitle={<><p>Segunda seleção de cores Dekton. Aqui você vai perceber o que faz o material ser tão versátil: ele funciona do marmorizado elegante ao cimento moderno, passando por pedras escuras e tons industriais.</p><p className="text-sm text-gray-600">Dica técnica: sinterizados são excelentes, mas bordas podem lascar por impacto. Em cozinhas muito movimentadas, planeje quinas com raio e evite pancadas.</p></>} items={page2} show={isP2} onNav={onNav} backTo="laminas" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="dekton-3" title="Dekton" subtitle={<><p>Terceira seleção — final. Se você estiver em dúvida entre 2–3 cores, me mande fotos do ambiente e a referência de estilo. Eu te digo qual vai ficar mais elegante com a sua marcenaria, luz e metais.</p><p className="text-sm text-gray-600">Para um resultado de alto padrão, combine com paginação e instalação nivelada. Superfície premium pede execução premium.</p></>} items={page3} show={isP3} onNav={onNav} backTo="laminas" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        <CatalogSection id="neolith" title="Neolith" subtitle={<>Superfície sinterizada com estética sofisticada.</>} items={ASSETS.catalog.neolith} show={visible.has("neolith")} onNav={onNav} backTo="laminas" />

        {(() => {
          const all = ASSETS.catalog.sinth;
          const size = Math.ceil(all.length / 3);
          const page1 = all.slice(0, size);
          const page2 = all.slice(size, size * 2);
          const page3 = all.slice(size * 2);
          const isP1 = visible.has("sinth");
          const isP2 = visible.has("sinth-2");
          const isP3 = visible.has("sinth-3");

          const pager = (active: 1 | 2 | 3) => (
            <div className="selection-pager inline-flex items-center rounded-full border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <button type="button" className={["px-4 py-2 text-sm font-semibold transition min-w-[120px] flex items-center justify-center gap-2", active === n ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"].join(" ")} onClick={() => onNav(n === 1 ? "sinth" : n === 2 ? "sinth-2" : "sinth-3")} aria-current={active === n ? "page" : undefined} aria-label={`Sinth — Seleção ${n}`} title={`Seleção ${n}`}>
                    <span aria-hidden="true" className="tracking-widest">{String(n).padStart(2, "0")}</span>
                    <span className="text-[11px] tracking-widest uppercase opacity-80">Seleção</span>
                  </button>
                  {n !== 3 ? <div className="w-px self-stretch bg-gray-200" aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          );

          return (
            <>
              <CatalogSection id="sinth" title="Sinth" subtitle={<><p>Sinth é uma lâmina sinterizada pensada para projetos contemporâneos: <strong>grandes planos</strong>, estética limpa e um acabamento que eleva cozinhas, lavabos e painéis. Aqui você encontra desde brancos premium (Super White) até clássicos (Nero Marquina, Gris Armani) e efeitos de design (Iron Corten).</p><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Estética</div><div className="mt-1 font-semibold text-gray-900">Visual de alto padrão</div><div className="mt-1 text-sm">Mármore, cimento, tons neutros e efeitos especiais — sem ruído visual.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Projeto</div><div className="mt-1 font-semibold text-gray-900">Grandes formatos</div><div className="mt-1 text-sm">Ótimo para ilhas, bancadas e painéis contínuos com menos recortes.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Resultado</div><div className="mt-1 font-semibold text-gray-900">Acabamento que define</div><div className="mt-1 text-sm">Meia‑esquadria 45º e paginação correta deixam o conjunto mais premium.</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advanceSinthTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{sinthDecorTip}</p></div></div></div></>} items={page1} show={isP1} onNav={onNav} backTo="laminas" extraActions={pager(1)} footerActions={pager(1)} />
              <CatalogSection id="sinth-2" title="Sinth" subtitle={<><p>Segunda seleção de cores Sinth. Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação</strong> e compare com mais clareza.</p><p className="text-sm text-gray-600">Se você estiver entre 2 opções, me diga seu uso (cozinha, gourmet, lavabo) e o estilo do ambiente. Eu te devolvo uma recomendação rápida.</p></>} items={page2} show={isP2} onNav={onNav} backTo="laminas" extraActions={pager(2)} footerActions={pager(2)} />
              <CatalogSection id="sinth-3" title="Sinth" subtitle={<><p>Terceira seleção — final. Se quiser, me mande uma foto do ambiente (luz + marcenaria) e eu te ajudo a escolher a opção mais elegante.</p><p className="text-sm text-gray-600">Dica técnica: como sinterizado, o material é excelente, mas bordas podem lascar por impacto. Planeje quinas e manuseio para o longo prazo.</p></>} items={page3} show={isP3} onNav={onNav} backTo="laminas" extraActions={pager(3)} footerActions={pager(3)} />
            </>
          );
        })()}

        <CatalogSection id="aglostone" title="Prime Stone" subtitle={<><p><strong>Prime Stone é um composto de mármore</strong> (mármore + resinas), na mesma família de materiais como <strong>Quarella</strong>, <strong>Aglostone</strong> e <strong>Marmol Compac</strong>. Ele entrega um visual mais <strong>uniforme</strong> e um acabamento consistente — excelente para projetos internos com proposta contemporânea.</p><div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-gray-900"><div className="font-bold">Importante: não recomendamos Prime Stone para cozinha</div><p className="mt-2 text-sm text-gray-800 leading-relaxed">Por ser base mármore, pode sofrer <strong>ataque químico</strong> com ácidos (limão, vinagre, tomate) e ficar fosco/manchado. Além disso, por conter resina, <strong>calor extremo</strong> pode marcar/queimar. Para cozinha, prefira quartzo de engenharia, quartzito ou sinterizados.</p></div><div className="grid sm:grid-cols-3 gap-3"><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">O que é</div><div className="mt-1 font-semibold text-gray-900">Composto de mármore</div><div className="mt-1 text-sm">Estética homogênea, padrão consistente e excelente acabamento.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Onde funciona bem</div><div className="mt-1 font-semibold text-gray-900">Uso interno (baixo risco)</div><div className="mt-1 text-sm">Lavabos, banheiros (uso controlado), painéis e tampos decorativos em áreas secas.</div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-4"><div className="text-xs uppercase tracking-widest text-gray-500">Cuidados</div><div className="mt-1 font-semibold text-gray-900">Ácidos &amp; calor</div><div className="mt-1 text-sm">Evite limão/vinagre direto e proteja contra calor/impactos (apoio térmico).</div></div></div><div className="rounded-2xl bg-gray-50 border border-gray-100 p-5"><div className="flex items-start gap-3"><button type="button" onClick={advancePrimeStoneTip} className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gold shrink-0 hover:bg-gray-50 hover:border-gray-200 transition" aria-label="Trocar dica" title="Trocar dica"><i className="fas fa-wand-magic-sparkles" /></button><div className="min-w-0"><div className="flex items-center gap-2"><div className="text-xs uppercase tracking-widest text-gray-500">Dica (rotativa)</div><div className="text-[11px] text-gray-400">• clique no ícone para trocar</div></div><p className="mt-2 text-sm text-gray-700 leading-relaxed">{primeStoneDecorTip}</p></div></div></div><p className="text-sm text-gray-600">Clique no card para alternar entre <strong>amostra</strong> e <strong>aplicação real</strong>.</p></>} items={ASSETS.catalog.aglostone} show={visible.has("aglostone")} onNav={onNav} backTo="produtos" />
        <section id="diferenciais" className={["py-24 gradient-dark text-white relative overflow-hidden", visible.has("diferenciais") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Diferenciais • Autoridade técnica</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">O que separa uma bancada <span className="text-gold">bonita hoje</span> de uma bancada <span className="text-gold">perfeita por décadas</span></h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {([
                { icon: "fa-camera", title: "Chapa aprovada", text: "Você escolhe a chapa real (fotos/vídeo/showroom)." },
                { icon: "fa-bezier-curve", title: "Paginação & veios", text: "Emendas discretas e continuidade." },
                { icon: "fa-angle-right", title: "Meia‑esquadria 45º", text: "Acabamento que muda o nível do projeto." },
              ] as const).map((d) => (
                <div key={d.title} className="glass rounded-2xl p-8 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[rgba(201,169,97,0.2)] rounded-2xl flex items-center justify-center shrink-0"><i className={`fas ${d.icon} text-2xl text-gold`} /></div>
                    <div><h3 className="text-xl font-bold">{d.title}</h3><p className="text-gray-300 text-sm mt-2 leading-relaxed">{d.text}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectsSection show={visible.has("galeria")} page={page} onNav={(p: any, hash?: string) => onNav(p as any, hash)} onOpenLightbox={(img) => setLightbox(img)} SmartImg={SmartImg} />

        <section id="depoimentos" className={["py-24 bg-white", visible.has("depoimentos") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Clientes Reais</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Quem Já Vive a <span className="text-gold">Experiência Douro</span></h2>
              <p className="text-xl text-gray-600">Qualidade se mede no detalhe. E se sente no dia a dia.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {ASSETS.depoimentos.map((d) => (
                <div key={d.name} className="testimonial-card hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={d.photo} alt={`Foto de ${d.name}`} className="w-12 h-12 rounded-full object-cover ring-2 ring-[rgba(201,169,97,0.45)]" loading="lazy" />
                    <div>
                      <div className="font-bold text-gray-900">{d.name}</div>
                      <div className="text-sm text-gray-500">{d.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{d.text}</p>
                  <div className="mt-5 flex gap-1 text-gold" aria-label="Avaliação 5 estrelas"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<section id="faq" className="py-16 bg-gray-50"><div className="container mx-auto px-4"><div className="rounded-2xl bg-white border border-gray-100 p-6 text-gray-600">Carregando dúvidas…</div></div></section>}>
          <LazyFaqSection show={visible.has("faq")} variant={page === "duvidas" ? "page" : "home"} onNav={(p) => onNav(p as PageKey)} onHash={scrollOrRouteToHash} />
        </Suspense>

        <section id="logo" className={["py-24 bg-white", visible.has("logo") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="text-gold font-semibold uppercase tracking-widest text-sm">Branding</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">Download da Logomarca</h1>
              <p className="text-gray-600 mt-4 leading-relaxed">Baixe a marca em <strong>JPG</strong>. Se quiser outro tamanho/fundo (PNG transparente, versão horizontal etc.), me diga que eu adiciono aqui.</p>
              <div className="mt-8 flex items-center gap-4 flex-wrap"><div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 inline-flex items-center gap-4"><LogoMark mode="header" /><div><div className="font-bold text-gray-900">Marca (ícone)</div><div className="text-sm text-gray-600">Baseado no SVG usado no site.</div></div></div></div>
              <div className="mt-8 text-sm text-gray-500">Endereço desta página: <code className="px-2 py-1 rounded bg-gray-100 border border-gray-200">?p=logo</code></div>
            </div>
          </div>
        </section>

        <section id="contato" className={["py-24 bg-white", visible.has("contato") ? "" : "hidden"].join(" ")}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-gold font-semibold uppercase tracking-widest text-sm">Vamos Conversar</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Comece a transformação do seu espaço <span className="text-gold">hoje</span></h2>
                <p className="text-xl text-gray-600 mb-8">Preencha o formulário ou fale direto no WhatsApp.</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4"><div className="w-14 h-14 bg-[rgba(201,169,97,0.1)] rounded-full flex items-center justify-center"><i className="fab fa-whatsapp text-2xl text-gold" /></div><div><p className="font-semibold text-gray-900">WhatsApp</p><p className="text-gray-600">(11) 92321-0038</p></div></div>
                  <div className="flex items-center gap-4"><div className="w-14 h-14 bg-[rgba(201,169,97,0.1)] rounded-full flex items-center justify-center"><i className="fas fa-envelope text-2xl text-gold" /></div><div><p className="font-semibold text-gray-900">E-mail</p><p className="text-gray-600">contato@douromarmores.com.br</p></div></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div><div className="font-bold text-gray-900">Escolha o objetivo do contato</div><div className="text-sm text-gray-600">Nós abrimos seu WhatsApp com uma mensagem pronta (você só confirma o envio).</div></div>
                  {contatoSent ? <span className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700">Abrindo WhatsApp…</span> : null}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button type="button" className={["px-3 py-2 rounded-xl text-sm font-semibold border transition", contatoTipo === "visita" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:border-gray-900"].join(" ")} onClick={() => setContatoTipo("visita")} aria-pressed={contatoTipo === "visita"}>Visita</button>
                  <button type="button" className={["px-3 py-2 rounded-xl text-sm font-semibold border transition", contatoTipo === "duvida" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:border-gray-900"].join(" ")} onClick={() => setContatoTipo("duvida")} aria-pressed={contatoTipo === "duvida"}>Dúvidas</button>
                  <button type="button" className={["px-3 py-2 rounded-xl text-sm font-semibold border transition", contatoTipo === "orcamento" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:border-gray-900"].join(" ")} onClick={() => setContatoTipo("orcamento")} aria-pressed={contatoTipo === "orcamento"}>Orçamento</button>
                </div>

                <form className="mt-6 space-y-6" onSubmit={onSubmitContato}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Nome *</label><input name="nome" type="text" required autoComplete="name" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" /></div>
                    <div><label className="block text-gray-700 font-medium mb-2">WhatsApp / Telefone *</label><input name="telefone" type="tel" required autoComplete="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" placeholder="(11) 9xxxx-xxxx" /></div>
                  </div>

                  <div><label className="block text-gray-700 font-medium mb-2">E-mail *</label><input name="email" type="email" required autoComplete="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" /></div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Cidade / Bairro</label><input name="cidade" type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" placeholder="Ex.: São Paulo • Moema" /></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Tipo de projeto</label><select name="tipo" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" defaultValue="Selecione..."><option>Selecione...</option><option>Cozinha (Bancada/Ilha)</option><option>Banheiro (Bancada/Nicho)</option><option>Área Gourmet</option><option>Escada</option><option>Piso/Revestimentos</option><option>Fachada</option><option>Outros</option></select></div>
                  </div>

                  <div><label className="block text-gray-700 font-medium mb-2">Quando você pretende instalar?</label><input name="prazo" type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" placeholder="Ex.: 15–20 dias / mês que vem / ainda em planejamento" /></div>

                  <div><label className="block text-gray-700 font-medium mb-2">Conte-nos sobre seu projeto</label><textarea name="mensagem" rows={5} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition bg-white" placeholder={contatoTipo === "visita" ? "Descreva o ambiente, medidas aproximadas, o que você quer sentir no espaço e qualquer detalhe importante." : contatoTipo === "duvida" ? "Escreva sua dúvida (mancha, calor, emenda, meia-esquadria, cuba, prazo, garantia…)." : "Descreva o que você precisa (bancada, ilha, nicho, painel…), medidas aproximadas e referências de estilo."} /></div>

                  <button type="submit" className="w-full bg-gold text-white py-5 rounded-xl text-lg font-bold hover:bg-yellow-600 transition btn-glow shadow-xl">{contatoTipo === "visita" ? "Agendar visita técnica no WhatsApp" : contatoTipo === "duvida" ? "Enviar dúvida no WhatsApp" : "Solicitar orçamento no WhatsApp"}</button>
                  <p className="text-sm text-gray-500 text-center">Dica: se você já tiver fotos + medidas aproximadas, mande no WhatsApp depois do envio — acelera sua orientação.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className={["py-0 bg-white", visible.has("blog") ? "" : "hidden"].join(" ")}>
          <div className="w-full px-0 py-0 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white z-[1] pointer-events-none">
              <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/95 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
                Carregando blog…
              </div>
            </div>

            <div className="border-y border-gray-100 bg-white">
              <iframe src="https://douromarmores.com.br/blog" title="Blog Douro Mármores" className="relative z-[2] w-full min-h-[82vh] md:min-h-[88vh] lg:min-h-[92vh] bg-white" loading="eager" referrerPolicy="strict-origin-when-cross-origin" />
            </div>
          </div>
        </section>

        {(() => {
          const seoIndexGroups = {
            regioes: [
              { p: "marmoraria-sao-paulo" as const, label: "Marmoraria em São Paulo" },
              { p: "marmoraria-zona-sul-sao-paulo" as const, label: "Marmoraria na Zona Sul" },
              { p: "marmoraria-moema" as const, label: "Marmoraria em Moema" },
              { p: "marmoraria-morumbi" as const, label: "Marmoraria no Morumbi" },
              { p: "marmoraria-santo-amaro" as const, label: "Marmoraria em Santo Amaro" },
              { p: "marmoraria-brooklin" as const, label: "Marmoraria no Brooklin" },
              { p: "marmoraria-vila-mariana" as const, label: "Marmoraria na Vila Mariana" },
              { p: "marmoraria-pinheiros" as const, label: "Marmoraria em Pinheiros" },
              { p: "marmoraria-interlagos" as const, label: "Marmoraria em Interlagos" },
              { p: "marmoraria-alphaville" as const, label: "Marmoraria em Alphaville" },
              { p: "marmoraria-vila-mascote" as const, label: "Marmoraria na Vila Mascote" },
              { p: "marmoraria-chacara-santo-antonio" as const, label: "Marmoraria na Chácara Santo Antônio" },
              { p: "marmoraria-jabaquara" as const, label: "Marmoraria no Jabaquara" },
              { p: "marmoraria-saude" as const, label: "Marmoraria na Saúde" },
              { p: "marmoraria-planalto-paulista" as const, label: "Marmoraria no Planalto Paulista" },
              { p: "marmoraria-jardim-paulista" as const, label: "Marmoraria no Jardim Paulista" },
              { p: "marmoraria-jardins" as const, label: "Marmoraria nos Jardins" },
              { p: "marmoraria-vila-nova-conceicao" as const, label: "Marmoraria na Vila Nova Conceição" },
              { p: "marmoraria-ibirapuera" as const, label: "Marmoraria no Ibirapuera" },
              { p: "marmoraria-panamby" as const, label: "Marmoraria no Panamby" },
              { p: "marmoraria-campo-belo" as const, label: "Marmoraria no Campo Belo" },
              { p: "marmoraria-vila-olimpia" as const, label: "Marmoraria na Vila Olímpia" },
              { p: "marmoraria-itaim-bibi" as const, label: "Marmoraria no Itaim Bibi" },
              { p: "marmoraria-perdizes" as const, label: "Marmoraria em Perdizes" },
              { p: "marmoraria-pompeia" as const, label: "Marmoraria na Pompeia" },
              { p: "marmoraria-tatuape" as const, label: "Marmoraria no Tatuapé" },
              { p: "marmoraria-ipiranga" as const, label: "Marmoraria no Ipiranga" },
              { p: "marmoraria-vila-sonia" as const, label: "Marmoraria na Vila Sônia" },
              { p: "marmoraria-vila-andrade" as const, label: "Marmoraria na Vila Andrade" },
              { p: "marmoraria-bela-vista" as const, label: "Marmoraria na Bela Vista" },
              { p: "marmoraria-jardim-europa" as const, label: "Marmoraria no Jardim Europa" },
              { p: "marmoraria-jardim-america" as const, label: "Marmoraria no Jardim América" },
              { p: "marmoraria-higienopolis" as const, label: "Marmoraria em Higienópolis" },
              { p: "marmoraria-mooca" as const, label: "Marmoraria na Mooca" },
              { p: "marmoraria-anhangabau" as const, label: "Marmoraria no Anhangabaú" },
              { p: "marmoraria-vila-leopoldina" as const, label: "Marmoraria na Vila Leopoldina" },
              { p: "marmoraria-vila-madalena" as const, label: "Marmoraria na Vila Madalena" },
              { p: "marmoraria-cerqueira-cesar" as const, label: "Marmoraria em Cerqueira César" },
              { p: "marmoraria-sumare" as const, label: "Marmoraria no Sumaré" },
              { p: "marmoraria-socorro" as const, label: "Marmoraria no Socorro" },
              { p: "marmoraria-alto-da-boa-vista" as const, label: "Marmoraria no Alto da Boa Vista" },
              { p: "marmoraria-vila-suzana" as const, label: "Marmoraria na Vila Suzana" },
              { p: "marmoraria-vila-santa-catarina" as const, label: "Marmoraria na Vila Santa Catarina" },
              { p: "marmoraria-jardim-marajoara" as const, label: "Marmoraria no Jardim Marajoara" },
              { p: "marmoraria-chacara-flora" as const, label: "Marmoraria na Chácara Flora" },
              { p: "marmoraria-jurubatuba" as const, label: "Marmoraria em Jurubatuba" },
              { p: "marmoraria-campo-grande" as const, label: "Marmoraria no Campo Grande" },
              { p: "marmoraria-mirandopolis" as const, label: "Marmoraria em Mirandópolis" },
              { p: "marmoraria-veleiros" as const, label: "Marmoraria em Veleiros" },
              { p: "marmoraria-vila-cordeiro" as const, label: "Marmoraria na Vila Cordeiro" },
              { p: "marmoraria-vila-cruzeiro" as const, label: "Marmoraria na Vila Cruzeiro" },
              { p: "marmoraria-jardim-guedala" as const, label: "Marmoraria no Jardim Guedala" },
              { p: "marmoraria-vila-gumercindo" as const, label: "Marmoraria na Vila Gumercindo" },
            ],
            servicos: [
              { p: "bancadas-granito-sao-paulo" as const, label: "Bancadas em Granito" },
              { p: "quartzo-cozinha-sao-paulo" as const, label: "Quartzo para Cozinha" },
              { p: "escadas-marmore-sao-paulo" as const, label: "Escadas em Mármore" },
              { p: "lavabo-marmore-sao-paulo" as const, label: "Lavabo em Mármore" },
              { p: "granito-churrasqueira-sao-paulo" as const, label: "Granito para Churrasqueira" },
              { p: "quartzito-ilha-sao-paulo" as const, label: "Quartzito para Ilha" },
              { p: "banheiro-quartzo-sao-paulo" as const, label: "Banheiro em Quartzo" },
              { p: "lavatório-sob-medida-sao-paulo" as const, label: "Lavatório Sob Medida" },
              { p: "painel-marmore-sao-paulo" as const, label: "Painel em Mármore" },
              { p: "area-gourmet-granito-sao-paulo" as const, label: "Área Gourmet em Granito" },
              { p: "bancada-cozinha-sob-medida-sao-paulo" as const, label: "Bancada de Cozinha Sob Medida" },
              { p: "bancada-banheiro-sao-paulo" as const, label: "Bancada para Banheiro" },
              { p: "nicho-banheiro-sao-paulo" as const, label: "Nicho para Banheiro" },
              { p: "cuba-esculpida-sao-paulo" as const, label: "Cuba Esculpida" },
              { p: "lareira-marmore-sao-paulo" as const, label: "Lareira em Mármore" },
              { p: "mesa-quartzito-sao-paulo" as const, label: "Mesa em Quartzito" },
              { p: "bancada-quartzito-sao-paulo" as const, label: "Bancada em Quartzito" },
              { p: "bancada-dekton-sao-paulo" as const, label: "Bancada em Dekton" },
              { p: "bancada-silestone-sao-paulo" as const, label: "Bancada em Silestone" },
              { p: "ilha-cozinha-quartzito-sao-paulo" as const, label: "Ilha de Cozinha em Quartzito" },
              { p: "escada-granito-sao-paulo" as const, label: "Escada em Granito" },
              { p: "lavabo-onix-sao-paulo" as const, label: "Lavabo em Ônix" },
              { p: "painel-quartzito-sao-paulo" as const, label: "Painel em Quartzito" },
              { p: "pia-cozinha-granito-sao-paulo" as const, label: "Pia de Cozinha em Granito" },
              { p: "bancada-quartzo-branco-sao-paulo" as const, label: "Bancada de Quartzo Branco" },
              { p: "bancada-preto-sao-gabriel-sao-paulo" as const, label: "Bancada em Preto São Gabriel" },
              { p: "cuba-esculpida-marmore-sao-paulo" as const, label: "Cuba Esculpida em Mármore" },
              { p: "lavatorio-quartzito-sao-paulo" as const, label: "Lavatório em Quartzito" },
              { p: "ilha-dekton-sao-paulo" as const, label: "Ilha em Dekton" },
              { p: "churrasqueira-quartzito-sao-paulo" as const, label: "Churrasqueira em Quartzito" },
              { p: "revestimento-lareira-marmore-sao-paulo" as const, label: "Revestimento de Lareira em Mármore" },
              { p: "escada-quartzito-sao-paulo" as const, label: "Escada em Quartzito" },
              { p: "bancada-porcelanato-sao-paulo" as const, label: "Bancada em Porcelanato" },
              { p: "bancada-area-gourmet-sao-paulo" as const, label: "Bancada para Área Gourmet" },
              { p: "lavatorio-marmore-sao-paulo" as const, label: "Lavatório em Mármore" },
              { p: "bancada-lavabo-sao-paulo" as const, label: "Bancada para Lavabo" },
              { p: "soleira-peitoril-sao-paulo" as const, label: "Soleiras e Peitoris" },
              { p: "mesa-pedra-sao-paulo" as const, label: "Mesa em Pedra" },
              { p: "nicho-marmore-sao-paulo" as const, label: "Nicho em Mármore" },
              { p: "pia-esculpida-sao-paulo" as const, label: "Pia Esculpida" },
              { p: "bancada-ilha-cozinha-sao-paulo" as const, label: "Bancada para Ilha de Cozinha" },
              { p: "pedra-para-cozinha-sao-paulo" as const, label: "Pedra para Cozinha" },
              { p: "marmoraria-perto-de-mim-sao-paulo" as const, label: "Marmoraria Perto de Mim" },
            ],
          };

          if (page === "regioes-servicos") {
            return (
              <section id="seo-index" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-[1380px] mx-auto">
                    <span className="text-gold font-semibold uppercase tracking-widest text-sm">Regiões e serviços</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Regiões atendidas e páginas úteis</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Explore páginas informativas sobre regiões atendidas e serviços da Douro Mármores. Estamos localizados na Zona Sul de São Paulo, o que facilita o atendimento de bairros próximos, mas nossa atuação abrange toda a cidade de São Paulo, Grande São Paulo e região. Aqui você encontra conteúdos úteis sobre bancadas, cozinhas, escadas, lavabos, áreas gourmet e soluções em mármore, granito, quartzo, quartzito e superfícies premium.
                    </p>

                    <div className="mt-10 grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 xl:gap-10">
                      <div className="rounded-3xl bg-gray-50 border border-gray-100 p-6">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Regiões</div>
                        <ul className="mt-4 space-y-3">
                          {seoIndexGroups.regioes.map((l) => (
                            <li key={l.p}>
                              <a
                                href={`?p=${l.p}`}
                                className="text-gray-900 font-semibold hover:text-gold transition"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onNav(l.p);
                                }}
                              >
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl bg-gray-50 border border-gray-100 p-6">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Serviços e soluções</div>
                        <ul className="mt-4 space-y-3">
                          {seoIndexGroups.servicos.map((l) => (
                            <li key={l.p}>
                              <a
                                href={`?p=${l.p}`}
                                className="text-gray-900 font-semibold hover:text-gold transition"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onNav(l.p);
                                }}
                              >
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          const seoLandingMap: Partial<Record<PageKey, { title: string; intro: string; bullets: string[]; cta: string }>> = {
            "marmoraria-sao-paulo": {
              title: "Marmoraria em São Paulo",
              intro:
                "A Douro Mármores é uma marmoraria em São Paulo especializada em bancadas, escadas, lavatórios, painéis, cozinhas, banheiros, lavabos e projetos sob medida em mármore, granito, quartzito, quartzo e superfícies premium.",
              bullets: [
                "Bancadas sob medida para cozinhas, banheiros e áreas gourmet",
                "Escadas, painéis e revestimentos em pedra natural e superfícies premium",
                "Atendimento em São Paulo, Grande São Paulo e regiões estratégicas da capital",
              ],
              cta: "Solicitar orçamento em São Paulo",
            },
            "marmoraria-zona-sul-sao-paulo": {
              title: "Marmoraria na Zona Sul de São Paulo",
              intro:
                "A Douro Mármores está localizada na Zona Sul de São Paulo, o que facilita o atendimento para bairros próximos como Interlagos, Moema, Vila Mariana, Santo Amaro, Jabaquara, Saúde, Brooklin, Vila Mascote e Chácara Santo Antônio. Ainda assim, nossa atuação não se limita a essa região: atendemos toda a cidade de São Paulo, Grande São Paulo e região.",
              bullets: [
                "Base na Zona Sul, com facilidade logística para bairros próximos",
                "Atendimento em toda São Paulo, Grande São Paulo e região",
                "Medição, orientação técnica, acabamento premium e instalação sob medida",
              ],
              cta: "Solicitar orçamento em São Paulo",
            },
            "bancadas-granito-sao-paulo": {
              title: "Bancadas em Granito em São Paulo",
              intro:
                "Produzimos bancadas em granito em São Paulo para cozinhas, áreas gourmet, banheiros e lavabos, com corte sob medida, acabamento premium, meia-esquadria 45º e instalação técnica.",
              bullets: [
                "Granitos escuros, claros e exóticos para cozinha e gourmet",
                "Alta resistência para rotina intensa e fácil manutenção",
                "Atendimento em São Paulo e Grande São Paulo com projeto sob medida",
              ],
              cta: "Quero bancada em granito",
            },
            "quartzo-cozinha-sao-paulo": {
              title: "Quartzo para Cozinha em São Paulo",
              intro:
                "Trabalhamos com quartzo para cozinha em São Paulo, incluindo linhas como Silestone e Quartzo Stone, ideais para bancadas, ilhas e projetos contemporâneos com baixa porosidade e estética uniforme.",
              bullets: [
                "Opções de quartzo premium para bancadas e ilhas",
                "Orientação para escolher a cor ideal conforme luz, marcenaria e uso",
                "Instalação sob medida em São Paulo e região",
              ],
              cta: "Solicitar orçamento de quartzo",
            },
            "escadas-marmore-sao-paulo": {
              title: "Escadas em Mármore em São Paulo",
              intro:
                "Executamos escadas em mármore em São Paulo com corte sob medida, paginação, acabamento premium e instalação técnica para projetos residenciais e comerciais de alto padrão.",
              bullets: [
                "Escadas em mármore, granito e outras pedras naturais",
                "Acabamento limpo, alinhamento preciso e visual sofisticado",
                "Atendimento em São Paulo capital, Zona Sul e Grande São Paulo",
              ],
              cta: "Solicitar orçamento de escada",
            },
            "lavabo-marmore-sao-paulo": {
              title: "Lavabo em Mármore em São Paulo",
              intro:
                "Criamos lavabos em mármore em São Paulo com lavatórios sob medida, tampos, nichos e acabamentos premium para projetos residenciais e comerciais que buscam sofisticação e presença.",
              bullets: [
                "Lavatórios, nichos e tampos em mármore sob medida",
                "Acabamentos premium para lavabos e banheiros elegantes",
                "Atendimento na capital, Grande São Paulo e região",
              ],
              cta: "Quero lavabo em mármore",
            },
            "granito-churrasqueira-sao-paulo": {
              title: "Granito para Churrasqueira em São Paulo",
              intro:
                "Trabalhamos com granito para churrasqueira em São Paulo, ideal para áreas gourmet, bancadas externas e projetos que exigem resistência, baixa manutenção e acabamento de alto padrão.",
              bullets: [
                "Granitos indicados para calor e rotina intensa",
                "Bancadas para churrasqueira e área gourmet sob medida",
                "Instalação técnica e acabamento premium",
              ],
              cta: "Solicitar orçamento para churrasqueira",
            },
            "quartzito-ilha-sao-paulo": {
              title: "Quartzito para Ilha em São Paulo",
              intro:
                "Executamos ilhas em quartzito em São Paulo com paginação premium, visual sofisticado e alta resistência para cozinhas contemporâneas e áreas gourmet de alto padrão.",
              bullets: [
                "Quartzitos claros e exóticos para ilhas de destaque",
                "Paginação, emenda planejada e acabamento premium",
                "Atendimento na capital, Grande São Paulo e bairros nobres",
              ],
              cta: "Quero ilha em quartzito",
            },
            "marmoraria-moema": {
              title: "Marmoraria em Moema",
              intro:
                "Atendemos clientes que buscam marmoraria em Moema para bancadas, lavatórios, painéis, escadas e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos residenciais e comerciais em Moema",
                "Bancadas, lavabos, escadas e painéis sob medida",
                "Atendimento com medição, produção e instalação técnica",
              ],
              cta: "Solicitar orçamento em Moema",
            },
            "marmoraria-morumbi": {
              title: "Marmoraria no Morumbi",
              intro:
                "Somos uma marmoraria no Morumbi com atendimento para cozinhas, banheiros, áreas gourmet, lavabos e projetos premium em pedra natural e superfícies industrializadas sob medida.",
              bullets: [
                "Atendimento a apartamentos, casas e projetos de alto padrão",
                "Materiais como mármore, granito, quartzito, quartzo e Dekton",
                "Acabamento premium e instalação com precisão",
              ],
              cta: "Quero atendimento no Morumbi",
            },
            "marmoraria-santo-amaro": {
              title: "Marmoraria em Santo Amaro",
              intro:
                "Atendemos quem procura marmoraria em Santo Amaro para bancadas, escadas, lavatórios, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos para cozinhas, banheiros, lavabos e áreas gourmet",
                "Medição, produção e instalação sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região, com facilidade para Santo Amaro e proximidades",
              ],
              cta: "Solicitar orçamento em Santo Amaro",
            },
            "marmoraria-brooklin": {
              title: "Marmoraria no Brooklin",
              intro:
                "Atendemos clientes que procuram marmoraria no Brooklin para bancadas, lavatórios, painéis, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos para cozinhas, banheiros, lavabos e áreas gourmet",
                "Acabamento premium e instalação cuidadosa",
                "Atendimento em São Paulo, Grande São Paulo e região, com facilidade para o Brooklin e bairros próximos",
              ],
              cta: "Solicitar orçamento no Brooklin",
            },
            "marmoraria-vila-mariana": {
              title: "Marmoraria na Vila Mariana",
              intro:
                "Para quem busca marmoraria na Vila Mariana, atendemos projetos sob medida em bancadas, lavatórios, escadas, painéis e soluções em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas e lavatórios sob medida",
                "Escadas, painéis e projetos residenciais ou comerciais",
                "Atendimento em toda São Paulo, Grande São Paulo e região, com facilidade para a Vila Mariana e entorno",
              ],
              cta: "Solicitar orçamento na Vila Mariana",
            },
            "marmoraria-pinheiros": {
              title: "Marmoraria em Pinheiros",
              intro:
                "Atendemos quem procura marmoraria em Pinheiros para cozinhas, banheiros, lavabos, áreas gourmet e projetos premium em pedra natural e superfícies industrializadas sob medida.",
              bullets: [
                "Projetos sob medida para residências e comércios",
                "Granito, mármore, quartzo, quartzito e superfícies premium",
                "Atendimento em toda a cidade de São Paulo e Grande São Paulo, com facilidade para Pinheiros e região",
              ],
              cta: "Solicitar orçamento em Pinheiros",
            },
            "marmoraria-interlagos": {
              title: "Marmoraria em Interlagos",
              intro:
                "Para quem procura marmoraria em Interlagos, atendemos bancadas, escadas, lavatórios, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas para cozinhas, banheiros e áreas gourmet",
                "Escadas, painéis, tampos e projetos especiais",
                "Atendimento em São Paulo, Grande São Paulo e região, com proximidade de Interlagos e Zona Sul",
              ],
              cta: "Solicitar orçamento em Interlagos",
            },
            "marmoraria-alphaville": {
              title: "Marmoraria em Alphaville",
              intro:
                "Atendemos quem busca marmoraria em Alphaville para cozinhas, banheiros, lavabos, áreas gourmet e projetos sofisticados em pedra natural e superfícies premium sob medida.",
              bullets: [
                "Projetos premium para residências e empreendimentos",
                "Bancadas, lavatórios, painéis, escadas e áreas gourmet",
                "Atendimento em São Paulo, Grande São Paulo e região, incluindo Alphaville e entorno",
              ],
              cta: "Solicitar orçamento em Alphaville",
            },
            "marmoraria-vila-mascote": {
              title: "Marmoraria na Vila Mascote",
              intro:
                "Atendemos quem procura marmoraria na Vila Mascote para bancadas, cozinhas, banheiros, lavabos e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas e lavatórios sob medida para ambientes residenciais e comerciais",
                "Atendimento em toda São Paulo e Grande São Paulo, com facilidade logística para a Vila Mascote e entorno",
                "Projetos em pedra natural e superfícies premium com acabamento de alto padrão",
              ],
              cta: "Solicitar orçamento na Vila Mascote",
            },
            "marmoraria-chacara-santo-antonio": {
              title: "Marmoraria na Chácara Santo Antônio",
              intro:
                "Para quem busca marmoraria na Chácara Santo Antônio, atendemos bancadas, lavatórios, áreas gourmet, painéis e projetos premium em pedra natural e superfícies industrializadas sob medida.",
              bullets: [
                "Projetos para cozinhas, banheiros, lavabos e espaços gourmet",
                "Acabamento premium, medição e instalação técnica",
                "Atendimento em São Paulo, Grande São Paulo e região, com facilidade para a Chácara Santo Antônio",
              ],
              cta: "Solicitar orçamento na Chácara Santo Antônio",
            },
            "marmoraria-jabaquara": {
              title: "Marmoraria no Jabaquara",
              intro:
                "Atendemos quem procura marmoraria no Jabaquara para bancadas, escadas, lavatórios, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas para cozinhas, banheiros e áreas gourmet",
                "Escadas, painéis, lavatórios e projetos especiais sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região, com proximidade do Jabaquara e Zona Sul",
              ],
              cta: "Solicitar orçamento no Jabaquara",
            },
            "marmoraria-saude": {
              title: "Marmoraria na Saúde",
              intro:
                "Para quem busca marmoraria na Saúde, atendemos cozinhas, banheiros, lavabos, áreas gourmet e projetos sofisticados em pedra natural e superfícies premium sob medida.",
              bullets: [
                "Atendimento para apartamentos, casas e projetos comerciais",
                "Granito, mármore, quartzo, quartzito e superfícies premium",
                "Atuação em toda São Paulo e Grande São Paulo, com facilidade para a Saúde e bairros próximos",
              ],
              cta: "Solicitar orçamento na Saúde",
            },
            "marmoraria-planalto-paulista": {
              title: "Marmoraria no Planalto Paulista",
              intro:
                "Atendemos clientes que procuram marmoraria no Planalto Paulista para bancadas, lavatórios, escadas, painéis e soluções sob medida em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos de cozinha, banheiro, lavabo e áreas de destaque",
                "Medição, produção e instalação com acabamento premium",
                "Atendimento em São Paulo, Grande São Paulo e região, com facilidade para o Planalto Paulista",
              ],
              cta: "Solicitar orçamento no Planalto Paulista",
            },
            "marmoraria-jardim-paulista": {
              title: "Marmoraria no Jardim Paulista",
              intro:
                "Somos uma opção para quem procura marmoraria no Jardim Paulista com atendimento para cozinhas, banheiros, lavabos, áreas gourmet e projetos premium em pedra natural e superfícies sob medida.",
              bullets: [
                "Projetos sofisticados para residências e empreendimentos",
                "Bancadas, lavatórios, painéis, áreas gourmet e escadas",
                "Atendimento em São Paulo, Grande São Paulo e região, com facilidade para o Jardim Paulista",
              ],
              cta: "Solicitar orçamento no Jardim Paulista",
            },
            "marmoraria-jardins": {
              title: "Marmoraria nos Jardins",
              intro:
                "Atendemos quem busca marmoraria nos Jardins para bancadas, lavatórios, escadas, painéis e projetos de alto padrão em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos autorais para residências e ambientes sofisticados",
                "Acabamento premium, paginação e instalação técnica",
                "Atuação em São Paulo, Grande São Paulo e região, com facilidade para os Jardins e entorno",
              ],
              cta: "Solicitar orçamento nos Jardins",
            },
            "banheiro-quartzo-sao-paulo": {
              title: "Banheiro em Quartzo em São Paulo",
              intro:
                "Desenvolvemos banheiros em quartzo em São Paulo com bancadas, nichos e lavatórios sob medida para projetos que pedem baixa porosidade, visual uniforme e acabamento premium.",
              bullets: [
                "Quartzo para banheiros, lavabos e bancadas contemporâneas",
                "Baixa porosidade e manutenção prática no dia a dia",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Quero banheiro em quartzo",
            },
            "lavatório-sob-medida-sao-paulo": {
              title: "Lavatório Sob Medida em São Paulo",
              intro:
                "Criamos lavatórios sob medida em São Paulo para lavabos, banheiros e projetos residenciais ou comerciais de alto padrão em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Lavatórios esculpidos e tampos personalizados",
                "Projetos para lavabos, banheiros e ambientes sofisticados",
                "Produção e instalação sob medida com acabamento premium",
              ],
              cta: "Solicitar lavatório sob medida",
            },
            "painel-marmore-sao-paulo": {
              title: "Painel em Mármore em São Paulo",
              intro:
                "Executamos painéis em mármore em São Paulo para salas, lavabos, lareiras e ambientes de destaque, com paginação planejada, recortes limpos e acabamento premium.",
              bullets: [
                "Painéis em mármore para interiores sofisticados",
                "Paginação do veio e composição visual de alto padrão",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Quero painel em mármore",
            },
            "area-gourmet-granito-sao-paulo": {
              title: "Área Gourmet em Granito em São Paulo",
              intro:
                "Desenvolvemos áreas gourmet em granito em São Paulo com bancadas, churrasqueiras e superfícies resistentes para uso intenso, unindo performance, baixa manutenção e acabamento premium.",
              bullets: [
                "Granito ideal para calor, rotina intensa e fácil limpeza",
                "Bancadas e áreas gourmet sob medida para residências e apartamentos",
                "Atendimento em toda São Paulo, Grande São Paulo e região",
              ],
              cta: "Quero área gourmet em granito",
            },
            "bancada-cozinha-sob-medida-sao-paulo": {
              title: "Bancada de Cozinha Sob Medida em São Paulo",
              intro:
                "Produzimos bancadas de cozinha sob medida em São Paulo com mármore, granito, quartzo, quartzito e superfícies premium, sempre considerando rotina, estética e acabamento de alto padrão.",
              bullets: [
                "Bancadas para cozinhas residenciais e áreas gourmet",
                "Medição, orientação técnica, produção e instalação premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada de cozinha",
            },
            "bancada-banheiro-sao-paulo": {
              title: "Bancada para Banheiro em São Paulo",
              intro:
                "Desenvolvemos bancadas para banheiro em São Paulo com mármore, granito, quartzo, quartzito e superfícies premium para projetos sob medida, sempre com foco em acabamento, praticidade e estética sofisticada.",
              bullets: [
                "Bancadas sob medida para banheiros e lavabos",
                "Materiais premium com orientação técnica conforme uso",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada para banheiro",
            },
            "nicho-banheiro-sao-paulo": {
              title: "Nicho para Banheiro em São Paulo",
              intro:
                "Produzimos nichos para banheiro em São Paulo com pedra natural ou superfície premium, sob medida para projetos residenciais e comerciais que pedem acabamento limpo e integração com o ambiente.",
              bullets: [
                "Nichos sob medida para banheiros e áreas molhadas",
                "Acabamento premium e solução personalizada por projeto",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar nicho para banheiro",
            },
            "cuba-esculpida-sao-paulo": {
              title: "Cuba Esculpida em São Paulo",
              intro:
                "Criamos cubas esculpidas em São Paulo para lavabos e banheiros com acabamento sob medida em mármore, granito, quartzito e outras superfícies premium, valorizando desenho, proporção e escoamento correto.",
              bullets: [
                "Cubas esculpidas para lavabos e banheiros sob medida",
                "Design personalizado com foco em acabamento e funcionalidade",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar cuba esculpida",
            },
            "lareira-marmore-sao-paulo": {
              title: "Lareira em Mármore em São Paulo",
              intro:
                "Executamos lareiras em mármore em São Paulo com painéis, molduras e acabamento premium para projetos sofisticados e ambientes de alto padrão, sempre com composição visual elegante e sob medida.",
              bullets: [
                "Painéis e molduras para lareiras em mármore",
                "Paginação e composição para ambientes sofisticados",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar lareira em mármore",
            },
            "mesa-quartzito-sao-paulo": {
              title: "Mesa em Quartzito em São Paulo",
              intro:
                "Produzimos mesas em quartzito em São Paulo com tampo sob medida, visual sofisticado, veios naturais e acabamento premium para ambientes elegantes, residenciais e corporativos.",
              bullets: [
                "Tampos em quartzito para mesas sob medida",
                "Visual sofisticado com veios naturais e personalidade",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar mesa em quartzito",
            },
            "marmoraria-campo-belo": {
              title: "Marmoraria no Campo Belo",
              intro:
                "Atendemos quem procura marmoraria no Campo Belo para bancadas, lavatórios, painéis, escadas, cozinhas e projetos sob medida em mármore, granito, quartzito, quartzo e superfícies premium.",
              bullets: [
                "Projetos para apartamentos, casas e ambientes de alto padrão",
                "Bancadas, lavabos, cozinhas e áreas gourmet sob medida",
                "Atendimento em São Paulo e Grande São Paulo, com facilidade para o Campo Belo",
              ],
              cta: "Solicitar orçamento no Campo Belo",
            },
            "marmoraria-vila-olimpia": {
              title: "Marmoraria na Vila Olímpia",
              intro:
                "Atendemos clientes que buscam marmoraria na Vila Olímpia para bancadas, cozinhas, banheiros, lavabos e projetos residenciais ou corporativos em pedra natural e superfícies premium.",
              bullets: [
                "Atendimento para residências, escritórios e projetos comerciais",
                "Granito, mármore, quartzo, quartzito e Dekton",
                "Medição, produção e instalação sob medida",
              ],
              cta: "Solicitar orçamento na Vila Olímpia",
            },
            "marmoraria-itaim-bibi": {
              title: "Marmoraria no Itaim Bibi",
              intro:
                "Somos uma opção para quem procura marmoraria no Itaim Bibi com atendimento para bancadas, lavatórios, painéis, cozinhas, áreas gourmet e projetos de alto padrão.",
              bullets: [
                "Projetos sofisticados para residências e empreendimentos",
                "Acabamento premium, paginação e instalação técnica",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento no Itaim Bibi",
            },
            "marmoraria-perdizes": {
              title: "Marmoraria em Perdizes",
              intro:
                "Atendemos quem busca marmoraria em Perdizes para bancadas, banheiros, lavabos, escadas, áreas gourmet e projetos sob medida em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos residenciais e comerciais sob medida",
                "Bancadas, painéis, lavatórios e cozinhas premium",
                "Atendimento em São Paulo e Grande São Paulo, com facilidade para Perdizes",
              ],
              cta: "Solicitar orçamento em Perdizes",
            },
            "marmoraria-pompeia": {
              title: "Marmoraria na Pompeia",
              intro:
                "Atendemos clientes que procuram marmoraria na Pompeia para cozinhas, bancadas, banheiros, lavatórios, áreas gourmet e projetos em pedra natural e superfícies premium.",
              bullets: [
                "Projetos para cozinhas, banheiros, lavabos e áreas gourmet",
                "Granito, mármore, quartzito, quartzo e superfícies premium",
                "Medição e instalação com acabamento de alto padrão",
              ],
              cta: "Solicitar orçamento na Pompeia",
            },
            "marmoraria-tatuape": {
              title: "Marmoraria no Tatuapé",
              intro:
                "Atendemos quem procura marmoraria no Tatuapé para bancadas, cozinhas, banheiros, escadas, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas sob medida para cozinhas e banheiros",
                "Escadas, painéis e áreas gourmet em pedra natural",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento no Tatuapé",
            },
            "marmoraria-ipiranga": {
              title: "Marmoraria no Ipiranga",
              intro:
                "Atendemos clientes que buscam marmoraria no Ipiranga para bancadas, lavatórios, cozinhas, áreas gourmet, escadas e painéis em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos para residências e ambientes comerciais",
                "Pedras naturais e superfícies premium sob medida",
                "Atendimento em São Paulo e Grande São Paulo, com facilidade para o Ipiranga",
              ],
              cta: "Solicitar orçamento no Ipiranga",
            },
            "marmoraria-vila-sonia": {
              title: "Marmoraria na Vila Sônia",
              intro:
                "Atendemos quem procura marmoraria na Vila Sônia para bancadas, banheiros, lavabos, áreas gourmet, cozinhas e projetos sob medida em pedra natural e superfícies premium.",
              bullets: [
                "Projetos sob medida para residências e comércios",
                "Granito, mármore, quartzo, quartzito e superfícies premium",
                "Medição, produção e instalação técnica",
              ],
              cta: "Solicitar orçamento na Vila Sônia",
            },
            "marmoraria-vila-andrade": {
              title: "Marmoraria na Vila Andrade",
              intro:
                "Atendemos clientes que buscam marmoraria na Vila Andrade para bancadas, cozinhas, banheiros, painéis, lavatórios e projetos premium em pedra natural e superfícies industrializadas.",
              bullets: [
                "Projetos para apartamentos e casas de alto padrão",
                "Bancadas, escadas, painéis e áreas gourmet",
                "Atendimento em São Paulo e Grande São Paulo, com facilidade para a Vila Andrade",
              ],
              cta: "Solicitar orçamento na Vila Andrade",
            },
            "marmoraria-bela-vista": {
              title: "Marmoraria na Bela Vista",
              intro:
                "Atendemos quem procura marmoraria na Bela Vista para bancadas, cozinhas, banheiros, lavatórios e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas, painéis e lavatórios sob medida",
                "Atendimento para residências e ambientes comerciais",
                "Medição, produção e instalação com acabamento premium",
              ],
              cta: "Solicitar orçamento na Bela Vista",
            },
            "marmoraria-jardim-europa": {
              title: "Marmoraria no Jardim Europa",
              intro:
                "Atendemos quem busca marmoraria no Jardim Europa para bancadas, lavatórios, painéis, cozinhas e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos sob medida para residências e ambientes de alto padrão",
                "Bancadas, lavatórios, painéis e cozinhas em pedra natural e superfícies premium",
                "Atendimento em São Paulo, Grande São Paulo e região com acabamento premium",
              ],
              cta: "Solicitar orçamento no Jardim Europa",
            },
            "marmoraria-jardim-america": {
              title: "Marmoraria no Jardim América",
              intro:
                "Somos uma opção para quem procura marmoraria no Jardim América com atendimento para cozinhas, banheiros, lavabos, áreas gourmet e projetos premium em pedra natural e superfícies sob medida.",
              bullets: [
                "Projetos sofisticados para residências e empreendimentos",
                "Bancadas, painéis, lavatórios e áreas gourmet sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento no Jardim América",
            },
            "marmoraria-higienopolis": {
              title: "Marmoraria em Higienópolis",
              intro:
                "Atendemos quem busca marmoraria em Higienópolis para bancadas, lavatórios, escadas, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos para apartamentos, casas e ambientes de alto padrão",
                "Escadas, painéis, bancadas e lavatórios sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento em Higienópolis",
            },
            "marmoraria-mooca": {
              title: "Marmoraria na Mooca",
              intro:
                "Atendemos quem procura marmoraria na Mooca para cozinhas, banheiros, áreas gourmet, lavabos e projetos residenciais ou comerciais em pedra natural e superfícies premium.",
              bullets: [
                "Projetos para cozinhas, banheiros e áreas gourmet",
                "Mármore, granito, quartzo, quartzito e superfícies premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento na Mooca",
            },
            "marmoraria-anhangabau": {
              title: "Marmoraria no Anhangabaú",
              intro:
                "Atendemos quem busca marmoraria no Anhangabaú para bancadas, painéis, lavatórios e projetos corporativos ou residenciais sob medida em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos corporativos e residenciais sob medida",
                "Painéis, bancadas, lavatórios e ambientes de destaque",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento no Anhangabaú",
            },
            "marmoraria-vila-leopoldina": {
              title: "Marmoraria na Vila Leopoldina",
              intro:
                "Atendemos quem procura marmoraria na Vila Leopoldina para cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos sob medida para residências e empreendimentos",
                "Bancadas, lavatórios, áreas gourmet e painéis premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento na Vila Leopoldina",
            },
            "marmoraria-vila-madalena": {
              title: "Marmoraria na Vila Madalena",
              intro:
                "Atendemos quem busca marmoraria na Vila Madalena para bancadas, escadas, lavatórios, painéis e ambientes autorais em pedra natural e superfícies premium sob medida.",
              bullets: [
                "Projetos autorais para interiores sofisticados",
                "Escadas, bancadas, lavatórios e painéis de destaque",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento na Vila Madalena",
            },
            "marmoraria-cerqueira-cesar": {
              title: "Marmoraria em Cerqueira César",
              intro:
                "Atendemos quem procura marmoraria em Cerqueira César para bancadas, cozinhas, banheiros, lavabos e projetos de alto padrão em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos premium para residências e ambientes sofisticados",
                "Bancadas, lavatórios, cozinhas e lavabos sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento em Cerqueira César",
            },
            "marmoraria-sumare": {
              title: "Marmoraria no Sumaré",
              intro:
                "Atendemos quem busca marmoraria no Sumaré para bancadas, lavatórios, painéis, escadas e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos sob medida para residências e empreendimentos",
                "Escadas, bancadas, painéis e lavatórios premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar orçamento no Sumaré",
            },
            "bancada-quartzito-sao-paulo": {
              title: "Bancada em Quartzito em São Paulo",
              intro:
                "Produzimos bancadas em quartzito em São Paulo para cozinhas, ilhas, banheiros e áreas gourmet com veios naturais, alta resistência e acabamento premium sob medida.",
              bullets: [
                "Quartzitos claros, exóticos e sofisticados para bancadas",
                "Paginação do veio, emenda planejada e acabamento premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada em quartzito",
            },
            "bancada-dekton-sao-paulo": {
              title: "Bancada em Dekton em São Paulo",
              intro:
                "Executamos bancadas em Dekton em São Paulo para cozinhas, áreas gourmet, ilhas e projetos contemporâneos com superfície sinterizada de alta performance.",
              bullets: [
                "Dekton para cozinhas, ilhas e bancadas premium",
                "Baixa porosidade, resistência e visual contemporâneo",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada em Dekton",
            },
            "bancada-silestone-sao-paulo": {
              title: "Bancada em Silestone em São Paulo",
              intro:
                "Produzimos bancadas em Silestone em São Paulo para cozinhas e banheiros com visual uniforme, baixa porosidade e acabamento premium sob medida.",
              bullets: [
                "Silestone para bancadas de cozinha e banheiro",
                "Cores premium com estética uniforme",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada em Silestone",
            },
            "ilha-cozinha-quartzito-sao-paulo": {
              title: "Ilha de Cozinha em Quartzito em São Paulo",
              intro:
                "Criamos ilhas de cozinha em quartzito em São Paulo com paginação premium, visual sofisticado, alta resistência e acabamento sob medida para projetos de alto padrão.",
              bullets: [
                "Quartzitos premium para ilhas protagonistas",
                "Paginação, meia-esquadria e acabamento de alto padrão",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar ilha em quartzito",
            },
            "escada-granito-sao-paulo": {
              title: "Escada em Granito em São Paulo",
              intro:
                "Executamos escadas em granito em São Paulo com corte técnico, acabamento premium e instalação sob medida para projetos residenciais e comerciais.",
              bullets: [
                "Granito para escadas internas e externas",
                "Durabilidade, resistência e acabamento refinado",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar escada em granito",
            },
            "lavabo-onix-sao-paulo": {
              title: "Lavabo em Ônix em São Paulo",
              intro:
                "Desenvolvemos lavabos em ônix em São Paulo com cubas, bancadas e painéis de alto impacto visual, translucidez e acabamento premium para projetos sofisticados.",
              bullets: [
                "Ônix para lavabos exclusivos e de alto padrão",
                "Backlight, painéis e cubas sob medida",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar lavabo em ônix",
            },
            "painel-quartzito-sao-paulo": {
              title: "Painel em Quartzito em São Paulo",
              intro:
                "Executamos painéis em quartzito em São Paulo para salas, halls, lareiras e ambientes sofisticados com paginação do veio e acabamento premium sob medida.",
              bullets: [
                "Painéis em quartzito para ambientes de destaque",
                "Paginação e recortes com visual de alto padrão",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar painel em quartzito",
            },
            "pia-cozinha-granito-sao-paulo": {
              title: "Pia de Cozinha em Granito em São Paulo",
              intro:
                "Produzimos pias e bancadas de cozinha em granito em São Paulo para projetos que pedem resistência, baixa manutenção e acabamento premium no dia a dia.",
              bullets: [
                "Granitos para cozinhas e pias sob medida",
                "Alta resistência para rotina intensa e uso real",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar pia em granito",
            },
            "bancada-quartzo-branco-sao-paulo": {
              title: "Bancada de Quartzo Branco em São Paulo",
              intro:
                "Produzimos bancadas de quartzo branco em São Paulo para cozinhas, ilhas, banheiros e lavabos com visual uniforme, baixa porosidade e acabamento premium sob medida.",
              bullets: [
                "Quartzo branco para cozinhas e banheiros contemporâneos",
                "Baixa porosidade e estética uniforme de alto padrão",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada de quartzo branco",
            },
            "bancada-preto-sao-gabriel-sao-paulo": {
              title: "Bancada em Preto São Gabriel em São Paulo",
              intro:
                "Executamos bancadas em Preto São Gabriel em São Paulo para cozinhas, áreas gourmet, banheiros e lavabos com alta resistência, baixa manutenção e acabamento premium.",
              bullets: [
                "Granito Preto São Gabriel para cozinhas e áreas gourmet",
                "Alta resistência, praticidade e visual contemporâneo",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada em Preto São Gabriel",
            },
            "cuba-esculpida-marmore-sao-paulo": {
              title: "Cuba Esculpida em Mármore em São Paulo",
              intro:
                "Criamos cubas esculpidas em mármore em São Paulo para lavabos e banheiros com acabamento sob medida, desenho autoral e integração elegante com a bancada.",
              bullets: [
                "Cubas esculpidas em mármore para lavabos e banheiros",
                "Projeto sob medida com acabamento premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar cuba esculpida em mármore",
            },
            "lavatorio-quartzito-sao-paulo": {
              title: "Lavatório em Quartzito em São Paulo",
              intro:
                "Produzimos lavatórios em quartzito em São Paulo para lavabos e banheiros com veios naturais, resistência superior e acabamento premium sob medida.",
              bullets: [
                "Quartzito para lavatórios elegantes e duráveis",
                "Veios naturais e acabamento premium para banheiros",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar lavatório em quartzito",
            },
            "ilha-dekton-sao-paulo": {
              title: "Ilha em Dekton em São Paulo",
              intro:
                "Executamos ilhas em Dekton em São Paulo para cozinhas contemporâneas com superfície sinterizada de alta performance, baixa porosidade e acabamento premium.",
              bullets: [
                "Dekton para ilhas de cozinha e bancadas contemporâneas",
                "Superfície sinterizada com alta performance no dia a dia",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar ilha em Dekton",
            },
            "churrasqueira-quartzito-sao-paulo": {
              title: "Churrasqueira em Quartzito em São Paulo",
              intro:
                "Desenvolvemos churrasqueiras em quartzito em São Paulo para áreas gourmet com beleza natural, resistência e acabamento premium sob medida.",
              bullets: [
                "Quartzito para churrasqueiras e áreas gourmet sofisticadas",
                "Visual premium com resistência para uso real",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar churrasqueira em quartzito",
            },
            "revestimento-lareira-marmore-sao-paulo": {
              title: "Revestimento de Lareira em Mármore em São Paulo",
              intro:
                "Executamos revestimentos de lareira em mármore em São Paulo com paginação premium, cortes limpos e acabamento sofisticado para ambientes de alto padrão.",
              bullets: [
                "Painéis e revestimentos em mármore para lareiras",
                "Paginação do veio e acabamento de alto padrão",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar revestimento de lareira em mármore",
            },
            "escada-quartzito-sao-paulo": {
              title: "Escada em Quartzito em São Paulo",
              intro:
                "Produzimos escadas em quartzito em São Paulo com veios naturais, alta resistência e instalação sob medida para projetos residenciais e comerciais.",
              bullets: [
                "Quartzito para escadas internas e externas sofisticadas",
                "Alta resistência, acabamento premium e visual natural",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar escada em quartzito",
            },
            "marmoraria-socorro": {
              title: "Marmoraria no Socorro",
              intro:
                "Atendemos quem busca marmoraria no Socorro para bancadas, cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas sob medida para cozinha, banheiro e área gourmet",
                "Atendimento com medição, produção e instalação técnica",
                "Atuação no Socorro, Zona Sul e Grande São Paulo",
              ],
              cta: "Solicitar orçamento no Socorro",
            },
            "marmoraria-alto-da-boa-vista": {
              title: "Marmoraria no Alto da Boa Vista",
              intro:
                "Atendemos clientes que procuram marmoraria no Alto da Boa Vista para bancadas, escadas, lavatórios, painéis e projetos premium em pedra natural e superfícies industrializadas.",
              bullets: [
                "Projetos residenciais e comerciais de alto padrão",
                "Granito, mármore, quartzo, quartzito e Dekton",
                "Atendimento com acabamento premium e instalação cuidadosa",
              ],
              cta: "Solicitar orçamento no Alto da Boa Vista",
            },
            "marmoraria-vila-suzana": {
              title: "Marmoraria na Vila Suzana",
              intro:
                "Para quem busca marmoraria na Vila Suzana, atendemos cozinhas, banheiros, lavabos, áreas gourmet e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas, lavatórios, escadas e painéis premium",
                "Orientação técnica para material, acabamento e uso",
                "Atendimento na Vila Suzana, Morumbi e Panamby",
              ],
              cta: "Solicitar orçamento na Vila Suzana",
            },
            "marmoraria-vila-santa-catarina": {
              title: "Marmoraria na Vila Santa Catarina",
              intro:
                "Atendemos quem procura marmoraria na Vila Santa Catarina para bancadas, nichos, lavatórios, cozinhas e áreas gourmet em pedra natural e superfícies premium sob medida.",
              bullets: [
                "Projetos sob medida para ambientes residenciais e comerciais",
                "Granito, mármore, quartzo e quartzito com acabamento premium",
                "Atendimento em toda a Zona Sul de São Paulo",
              ],
              cta: "Solicitar orçamento na Vila Santa Catarina",
            },
            "marmoraria-jardim-marajoara": {
              title: "Marmoraria no Jardim Marajoara",
              intro:
                "Atendemos clientes que buscam marmoraria no Jardim Marajoara para cozinhas, banheiros, lavabos, escadas, áreas gourmet e projetos especiais em pedra natural e superfícies premium.",
              bullets: [
                "Projetos para apartamentos, casas e áreas de lazer",
                "Bancadas, lavatórios, escadas e painéis sob medida",
                "Atendimento no Jardim Marajoara e bairros vizinhos",
              ],
              cta: "Solicitar orçamento no Jardim Marajoara",
            },
            "marmoraria-chacara-flora": {
              title: "Marmoraria na Chácara Flora",
              intro:
                "A Douro Mármores atende a Chácara Flora com projetos de alto padrão em bancadas, lavatórios, escadas, lareiras, painéis e áreas gourmet em pedras naturais e superfícies premium.",
              bullets: [
                "Projetos sofisticados para residências de alto padrão",
                "Paginação, acabamento premium e instalação técnica",
                "Atendimento na Chácara Flora, Alto da Boa Vista e entorno",
              ],
              cta: "Solicitar orçamento na Chácara Flora",
            },
            "marmoraria-jurubatuba": {
              title: "Marmoraria em Jurubatuba",
              intro:
                "Atendemos quem procura marmoraria em Jurubatuba para cozinhas, bancadas, áreas gourmet, banheiros e projetos residenciais ou comerciais em mármore, granito, quartzo e quartzito.",
              bullets: [
                "Projetos sob medida para uso residencial e corporativo",
                "Acabamento premium e orientação técnica",
                "Atuação em Jurubatuba e Zona Sul de São Paulo",
              ],
              cta: "Solicitar orçamento em Jurubatuba",
            },
            "marmoraria-campo-grande": {
              title: "Marmoraria no Campo Grande",
              intro:
                "Atendemos quem busca marmoraria no Campo Grande para bancadas, lavatórios, escadas, painéis e projetos sob medida em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Bancadas de cozinha, lavabo, banheiro e área gourmet",
                "Projetos com medição, produção e instalação sob medida",
                "Atendimento no Campo Grande e Zona Sul",
              ],
              cta: "Solicitar orçamento no Campo Grande",
            },
            "marmoraria-mirandopolis": {
              title: "Marmoraria em Mirandópolis",
              intro:
                "Atendemos clientes que procuram marmoraria em Mirandópolis para cozinhas, banheiros, lavabos, escadas e áreas gourmet com acabamento premium e produção sob medida.",
              bullets: [
                "Projetos residenciais e comerciais em pedra natural e superfícies premium",
                "Bancadas, lavatórios, nichos e painéis sob medida",
                "Atendimento em Mirandópolis, Saúde e Vila Mariana",
              ],
              cta: "Solicitar orçamento em Mirandópolis",
            },
            "marmoraria-veleiros": {
              title: "Marmoraria em Veleiros",
              intro:
                "Atendemos Veleiros com soluções em bancadas, escadas, lavatórios, nichos, painéis e áreas gourmet em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos sob medida para casas e apartamentos",
                "Acabamento premium e instalação cuidadosa",
                "Atendimento em Veleiros, Socorro e Interlagos",
              ],
              cta: "Solicitar orçamento em Veleiros",
            },
            "marmoraria-vila-cordeiro": {
              title: "Marmoraria na Vila Cordeiro",
              intro:
                "Atendemos a Vila Cordeiro com bancadas, lavatórios, áreas gourmet, painéis e projetos sob medida em pedras naturais e superfícies premium para ambientes residenciais e corporativos.",
              bullets: [
                "Projetos para cozinhas, lavabos, banheiros e espaços gourmet",
                "Granito, quartzo, quartzito, mármore e Dekton",
                "Atendimento na Vila Cordeiro, Brooklin e Chácara Santo Antônio",
              ],
              cta: "Solicitar orçamento na Vila Cordeiro",
            },
            "marmoraria-vila-cruzeiro": {
              title: "Marmoraria na Vila Cruzeiro",
              intro:
                "Para quem busca marmoraria na Vila Cruzeiro, atendemos bancadas, lavatórios, painéis, cozinhas, banheiros e áreas gourmet com produção sob medida e acabamento premium.",
              bullets: [
                "Projetos residenciais sob medida em pedra natural e superfícies premium",
                "Medição, corte, acabamento e instalação técnica",
                "Atendimento na Vila Cruzeiro e Zona Sul de São Paulo",
              ],
              cta: "Solicitar orçamento na Vila Cruzeiro",
            },
            "marmoraria-jardim-guedala": {
              title: "Marmoraria no Jardim Guedala",
              intro:
                "Atendemos o Jardim Guedala com projetos de alto padrão em bancadas, escadas, lavatórios, áreas gourmet, lareiras e painéis em mármore, granito, quartzo, quartzito e superfícies premium.",
              bullets: [
                "Projetos premium para residências sofisticadas",
                "Paginação, meia-esquadria e acabamento de alto padrão",
                "Atendimento no Jardim Guedala, Morumbi e Vila Sônia",
              ],
              cta: "Solicitar orçamento no Jardim Guedala",
            },
            "marmoraria-vila-gumercindo": {
              title: "Marmoraria na Vila Gumercindo",
              intro:
                "Atendemos a Vila Gumercindo com bancadas, cozinhas, banheiros, lavabos, escadas e projetos especiais em pedra natural e superfícies premium sob medida.",
              bullets: [
                "Bancadas e lavatórios sob medida",
                "Projetos em granito, mármore, quartzo e quartzito",
                "Atendimento na Vila Gumercindo, Mirandópolis e Saúde",
              ],
              cta: "Solicitar orçamento na Vila Gumercindo",
            },
            "bancada-porcelanato-sao-paulo": {
              title: "Bancada em Porcelanato em São Paulo",
              intro:
                "Executamos bancadas em porcelanato em São Paulo para cozinhas, banheiros e áreas gourmet com grandes formatos, acabamento contemporâneo e produção sob medida.",
              bullets: [
                "Bancadas em porcelanato para cozinha, banheiro e lavabo",
                "Grandes formatos com acabamento limpo e atual",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada em porcelanato",
            },
            "bancada-area-gourmet-sao-paulo": {
              title: "Bancada para Área Gourmet em São Paulo",
              intro:
                "Produzimos bancadas para área gourmet em São Paulo em granito, quartzito, quartzo e superfícies sinterizadas para projetos sofisticados e resistentes ao uso intenso.",
              bullets: [
                "Granito, quartzito, quartzo e Dekton para área gourmet",
                "Bancadas sob medida para churrasqueiras e espaços externos",
                "Acabamento premium e instalação técnica",
              ],
              cta: "Solicitar bancada para área gourmet",
            },
            "lavatorio-marmore-sao-paulo": {
              title: "Lavatório em Mármore em São Paulo",
              intro:
                "Criamos lavatórios em mármore em São Paulo para lavabos e banheiros sob medida com desenho elegante, acabamento premium e integração perfeita com o ambiente.",
              bullets: [
                "Lavatórios em mármore para lavabos e banheiros",
                "Projetos sob medida com cuba esculpida ou tampo personalizado",
                "Atendimento em São Paulo e Grande São Paulo",
              ],
              cta: "Solicitar lavatório em mármore",
            },
            "bancada-lavabo-sao-paulo": {
              title: "Bancada para Lavabo em São Paulo",
              intro:
                "Desenvolvemos bancadas para lavabo em São Paulo em mármore, ônix, quartzo, quartzito e granito para projetos sofisticados com acabamento sob medida.",
              bullets: [
                "Bancadas de lavabo em pedra natural e superfícies premium",
                "Cuba esculpida, nichos e composição para ambientes elegantes",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar bancada para lavabo",
            },
            "soleira-peitoril-sao-paulo": {
              title: "Soleiras e Peitoris em São Paulo",
              intro:
                "Executamos soleiras e peitoris em São Paulo em granito, mármore e outras pedras naturais com corte sob medida, acabamento premium e instalação precisa.",
              bullets: [
                "Soleiras e peitoris em granito e mármore",
                "Acabamentos para portas, janelas e transições de piso",
                "Atendimento residencial e comercial em São Paulo",
              ],
              cta: "Solicitar soleiras e peitoris",
            },
            "mesa-pedra-sao-paulo": {
              title: "Mesa em Pedra em São Paulo",
              intro:
                "Produzimos mesas em pedra em São Paulo com tampos sob medida em mármore, granito, quartzito e superfícies premium para ambientes residenciais e corporativos.",
              bullets: [
                "Tampos em pedra sob medida para mesas de jantar, centro e apoio",
                "Mármore, granito, quartzito e outras superfícies premium",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar mesa em pedra",
            },
            "nicho-marmore-sao-paulo": {
              title: "Nicho em Mármore em São Paulo",
              intro:
                "Criamos nichos em mármore em São Paulo para banheiros, lavabos e ambientes sofisticados com acabamento limpo, paginação e produção sob medida.",
              bullets: [
                "Nichos em mármore para banheiros e lavabos",
                "Projeto sob medida com acabamento premium",
                "Atendimento em São Paulo e Grande São Paulo",
              ],
              cta: "Solicitar nicho em mármore",
            },
            "pia-esculpida-sao-paulo": {
              title: "Pia Esculpida em São Paulo",
              intro:
                "Executamos pias esculpidas em São Paulo para lavabos e banheiros com escoamento correto, desenho sob medida e acabamento premium em mármore, quartzito e outras superfícies.",
              bullets: [
                "Pias esculpidas para lavabos e banheiros sob medida",
                "Design personalizado com foco em funcionalidade e estética",
                "Atendimento em São Paulo, Grande São Paulo e região",
              ],
              cta: "Solicitar pia esculpida",
            },
            "bancada-ilha-cozinha-sao-paulo": {
              title: "Bancada para Ilha de Cozinha em São Paulo",
              intro:
                "Produzimos bancadas para ilha de cozinha em São Paulo em quartzito, granito, quartzo, Dekton e outras superfícies premium para projetos contemporâneos e sofisticados.",
              bullets: [
                "Ilhas de cozinha sob medida com acabamento premium",
                "Quartzo, quartzito, granito, mármore e superfícies sinterizadas",
                "Atendimento em São Paulo e Grande São Paulo",
              ],
              cta: "Solicitar bancada para ilha de cozinha",
            },
            "pedra-para-cozinha-sao-paulo": {
              title: "Pedra para Cozinha em São Paulo",
              intro:
                "Ajudamos você a escolher a melhor pedra para cozinha em São Paulo entre granito, quartzito, quartzo, mármore e superfícies sinterizadas conforme uso, rotina e estética desejada.",
              bullets: [
                "Orientação técnica para escolher a pedra ideal",
                "Comparação entre granito, quartzo, quartzito, mármore e Dekton",
                "Atendimento com produção e instalação sob medida",
              ],
              cta: "Quero ajuda para escolher a pedra da cozinha",
            },
            "marmoraria-perto-de-mim-sao-paulo": {
              title: "Marmoraria Perto de Mim em São Paulo",
              intro:
                "Se você procura marmoraria perto de mim em São Paulo, a Douro Mármores atende a Zona Sul, bairros nobres e a Grande São Paulo com projetos sob medida em pedra natural e superfícies premium.",
              bullets: [
                "Atendimento próximo em bairros estratégicos da capital",
                "Bancadas, lavatórios, escadas, painéis e áreas gourmet",
                "Medição, produção e instalação com acabamento premium",
              ],
              cta: "Solicitar orçamento agora",
            },
          };

          const seoLanding = seoLandingMap[page];
          if (!seoLanding) return null;

          const relatedSeoLinks: Array<{ p: PageKey; label: string }> =
            page === "marmoraria-sao-paulo" || page === "marmoraria-zona-sul-sao-paulo"
              ? [
                  { p: "projetos", label: "Ver projetos realizados" },
                  { p: "granitos", label: "Conhecer granitos" },
                  { p: "quartzitos", label: "Conhecer quartzitos" },
                  { p: "quartzo", label: "Conhecer quartzo" },
                ]
              : page === "bancadas-granito-sao-paulo" || page === "granito-churrasqueira-sao-paulo" || page === "area-gourmet-granito-sao-paulo"
                ? [
                    { p: "granitos", label: "Ver catálogo de granitos" },
                    { p: "projetos-churrasqueiras", label: "Projetos de churrasqueiras" },
                    { p: "projetos-bancadas", label: "Projetos de bancadas" },
                    { p: "contato", label: "Solicitar orçamento" },
                  ]
                : page === "quartzo-cozinha-sao-paulo" || page === "banheiro-quartzo-sao-paulo"
                  ? [
                      { p: "quartzo", label: "Ver marcas de quartzo" },
                      { p: "silestone", label: "Ver Silestone" },
                      { p: "quartzo-stone", label: "Ver Quartzo Stone" },
                      { p: "contato", label: "Solicitar orçamento" },
                    ]
                  : page === "escadas-marmore-sao-paulo" || page === "lareira-marmore-sao-paulo" || page === "painel-marmore-sao-paulo"
                    ? [
                        { p: "marmores", label: "Ver catálogo de mármores" },
                        { p: "projetos-escadas", label: "Projetos de escadas" },
                        { p: "projetos-lareiras", label: "Projetos de lareiras" },
                        { p: "contato", label: "Solicitar orçamento" },
                      ]
                    : page === "quartzito-ilha-sao-paulo" || page === "mesa-quartzito-sao-paulo" || page === "bancada-quartzito-sao-paulo" || page === "ilha-cozinha-quartzito-sao-paulo" || page === "painel-quartzito-sao-paulo" || page === "lavatorio-quartzito-sao-paulo" || page === "churrasqueira-quartzito-sao-paulo" || page === "escada-quartzito-sao-paulo"
                      ? [
                          { p: "quartzitos", label: "Ver catálogo de quartzitos" },
                          { p: "projetos-cozinhas", label: "Projetos de cozinhas" },
                          { p: "projetos-mesas", label: "Projetos de mesas" },
                          { p: "contato", label: "Solicitar orçamento" },
                        ]
                      : page === "bancada-quartzo-branco-sao-paulo"
                        ? [
                            { p: "quartzo", label: "Ver marcas de quartzo" },
                            { p: "silestone", label: "Ver Silestone" },
                            { p: "quartzo-stone", label: "Ver Quartzo Stone" },
                            { p: "contato", label: "Solicitar orçamento" },
                          ]
                      : page === "bancada-dekton-sao-paulo" || page === "ilha-dekton-sao-paulo"
                        ? [
                            { p: "dekton", label: "Ver catálogo de Dekton" },
                            { p: "laminas", label: "Ver lâminas e sinterizados" },
                            { p: "projetos-bancadas", label: "Projetos de bancadas" },
                            { p: "contato", label: "Solicitar orçamento" },
                          ]
                        : page === "bancada-silestone-sao-paulo"
                          ? [
                              { p: "silestone", label: "Ver catálogo de Silestone" },
                              { p: "quartzo", label: "Ver marcas de quartzo" },
                              { p: "projetos-bancadas", label: "Projetos de bancadas" },
                              { p: "contato", label: "Solicitar orçamento" },
                            ]
                            : page === "lavabo-onix-sao-paulo"
                              ? [
                                  { p: "onix", label: "Ver catálogo de ônix" },
                                  { p: "projetos-lavabos", label: "Projetos de lavabos" },
                                  { p: "projetos-banheiros", label: "Projetos de banheiros" },
                                  { p: "contato", label: "Solicitar orçamento" },
                                ]
                              : page === "cuba-esculpida-marmore-sao-paulo" || page === "revestimento-lareira-marmore-sao-paulo"
                                ? [
                                    { p: "marmores", label: "Ver catálogo de mármores" },
                                    { p: "projetos-lavabos", label: "Projetos de lavabos" },
                                    { p: "projetos-lareiras", label: "Projetos de lareiras" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : page === "escada-granito-sao-paulo" || page === "pia-cozinha-granito-sao-paulo" || page === "bancada-preto-sao-gabriel-sao-paulo"
                                ? [
                                    { p: "granitos", label: "Ver catálogo de granitos" },
                                    { p: "projetos-escadas", label: "Projetos de escadas" },
                                    { p: "projetos-cozinhas", label: "Projetos de cozinhas" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : page === "bancada-porcelanato-sao-paulo" || page === "bancada-area-gourmet-sao-paulo" || page === "bancada-ilha-cozinha-sao-paulo" || page === "pedra-para-cozinha-sao-paulo"
                                ? [
                                    { p: "produtos", label: "Ver materiais" },
                                    { p: "granitos", label: "Ver granitos" },
                                    { p: "quartzitos", label: "Ver quartzitos" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : page === "lavatorio-marmore-sao-paulo" || page === "bancada-lavabo-sao-paulo" || page === "nicho-marmore-sao-paulo" || page === "pia-esculpida-sao-paulo"
                                ? [
                                    { p: "marmores", label: "Ver mármores" },
                                    { p: "projetos-lavabos", label: "Projetos de lavabos" },
                                    { p: "projetos-banheiros", label: "Projetos de banheiros" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : page === "soleira-peitoril-sao-paulo" || page === "mesa-pedra-sao-paulo"
                                ? [
                                    { p: "projetos-mesas", label: "Projetos de mesas" },
                                    { p: "projetos-ambientes", label: "Projetos de ambientes" },
                                    { p: "produtos", label: "Ver materiais" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : page === "marmoraria-perto-de-mim-sao-paulo"
                                ? [
                                    { p: "regioes-servicos", label: "Ver regiões atendidas" },
                                    { p: "marmoraria-zona-sul-sao-paulo", label: "Marmoraria na Zona Sul" },
                                    { p: "projetos", label: "Ver projetos" },
                                    { p: "contato", label: "Solicitar orçamento" },
                                  ]
                              : [
                                  { p: "projetos", label: "Ver projetos" },
                                  { p: "produtos", label: "Ver materiais" },
                                  { p: "contato", label: "Solicitar orçamento" },
                                ];

          return (
            <section id="seo-local" className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-[1380px] mx-auto">
                  <div className="grid xl:grid-cols-[minmax(0,1.08fr)_360px] gap-10 xl:gap-12 items-start">
                    <div>
                      <span className="text-gold font-semibold uppercase tracking-widest text-sm">Atendimento local</span>
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">{seoLanding.title}</h1>
                      <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">{seoLanding.intro}</p>

                      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {seoLanding.bullets.map((bullet) => (
                          <div key={bullet} className="rounded-2xl bg-gray-50 border border-gray-100 p-5 h-full">
                            <div className="text-xs uppercase tracking-widest text-gray-500">Destaque</div>
                            <div className="mt-2 font-semibold text-gray-900 leading-snug">{bullet}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <a
                          href="?p=contato"
                          onClick={(e) => {
                            e.preventDefault();
                            onNav("contato");
                          }}
                          className="inline-flex items-center justify-center bg-gray-900 text-white px-7 py-4 rounded-full font-semibold hover:bg-black transition btn-glow"
                        >
                          <i className="fas fa-calendar-check mr-2 text-gold" />
                          {seoLanding.cta}
                        </a>
                        <a
                          href="https://wa.me/5511923210038?text=Olá! Quero orientação e orçamento para meu projeto de marmoraria em São Paulo."
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 px-7 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition"
                        >
                          <i className="fab fa-whatsapp mr-2" />
                          Falar no WhatsApp
                        </a>
                      </div>
                    </div>

                    <aside className="xl:sticky xl:top-[calc(var(--douro-header-offset,0px)+20px)]">
                      <div className="rounded-3xl bg-gray-50 border border-gray-100 p-6">
                        <div className="text-xs uppercase tracking-widest text-gray-500">Serviços relacionados</div>
                        <div className="mt-4 flex flex-wrap xl:flex-col gap-3">
                          {relatedSeoLinks.map((l) => (
                            <a
                              key={l.p}
                              href={`?p=${l.p}`}
                              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition xl:w-full xl:justify-between"
                              onClick={(e) => {
                                e.preventDefault();
                                onNav(l.p);
                              }}
                            >
                              {l.label}
                              <i className="fas fa-arrow-right text-gold xl:ml-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}
      </main>

      {page !== "blog" ? (
        <footer className="bg-black text-white pt-20 pb-8 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_1fr] gap-12 mb-16">
              <div className="min-w-0">
                <a href="?p=home" className="flex items-center gap-2 sm:gap-3 group min-w-0 max-w-full" onClick={(e) => { e.preventDefault(); onNav("home"); }} aria-label="Douro Mármores - Página inicial">
                  <LogoMark mode="footer" />
                  <span className="flex-1 min-w-0 max-w-[62vw] sm:max-w-none overflow-hidden whitespace-nowrap uppercase tracking-wide sm:tracking-wider font-bold text-xl sm:text-3xl leading-none"><span className="text-white">DOURO</span><span className="text-gold">MÁRMORES</span></span>
                </a>
                <p className="text-gray-400 mt-4 mb-4 max-w-md">Transformando espaços em obras-primas. Cada projeto é uma história — e cada detalhe precisa emocionar.</p>
                <div className="text-sm text-gray-300 mb-6"><div className="inline-flex items-start gap-2"><i className="fas fa-location-dot text-gold mt-[2px]" /><span><span className="font-semibold text-white">Fábrica:</span> Rua Paulo Guilguer Reimberg, 3311 — São Paulo - SP</span></div></div>
                <div className="flex gap-4 flex-wrap">
                  <a href="https://www.instagram.com/douromarmores/" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openExternal("https://www.instagram.com/douromarmores/"); }}><i className="fab fa-instagram" /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition" aria-label="Pinterest"><i className="fab fa-pinterest-p" /></a>
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="text-lg font-bold mb-6 text-gold">Links Úteis</h4>
                <ul className="space-y-3">
                  {footerLinks.map((l) => (
                    <li key={l.p} className="min-w-0">
                      <a href={l.hash ? l.hash : `?p=${l.p}`} className="text-gray-400 hover:text-white transition break-words" onClick={(e) => { e.preventDefault(); if (l.hash) scrollOrRouteToHash(l.hash); else onNav(l.p); }}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li className="min-w-0">
                    <a href="?p=blog" className="text-gray-400 hover:text-white transition break-words" onClick={(e) => { e.preventDefault(); onNav("blog"); }}>
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div className="min-w-0">
                <h5 className="text-sm font-bold text-gold mb-3 uppercase tracking-widest">Páginas úteis</h5>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-gray-400 leading-relaxed">Reunimos em uma página única as regiões atendidas e serviços estratégicos da Douro Mármores em São Paulo.</p>
                  <a href="?p=regioes-servicos" className="mt-4 inline-flex items-center text-white font-semibold hover:text-gold transition" onClick={(e) => { e.preventDefault(); onNav("regioes-servicos"); }}>
                    Ver regiões e serviços
                    <i className="fas fa-arrow-right ml-2 text-gold" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-gray-400 text-sm">© 2026 Douro Mármores. Todos os direitos reservados.<span className="text-gray-500"> • </span><span className="text-gray-500">Desenvolvido por </span><span className="text-gold">@pedespaixao</span></p>
            </div>
          </div>
        </footer>
      ) : null}

      {page !== "blog" && showScrollTop ? (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed left-6 bottom-6 z-[1000] w-14 h-14 rounded-full bg-gold text-white shadow-2xl hover:bg-yellow-600 transition btn-glow" aria-label="Voltar ao topo" title="Voltar ao topo">
          <i className="fas fa-chevron-up text-xl" />
        </button>
      ) : null}

      {page !== "blog" ? (
        <a href="https://wa.me/5511923210038" target="_blank" rel="noreferrer" className="whatsapp-float bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition" aria-label="WhatsApp">
          <i className="fab fa-whatsapp text-3xl" />
        </a>
      ) : null}

      {lightbox ? (
        <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-label="Visualização de mídia">
          <button className="absolute inset-0 bg-black/80" aria-label="Fechar" onClick={() => setLightbox(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button ref={lightboxCloseBtnRef} className="absolute -top-12 right-0 text-white/90 hover:text-white text-3xl" aria-label="Fechar" onClick={() => setLightbox(null)} type="button">×</button>
              <div className="relative">
                {lightbox.src.toLowerCase().endsWith(".mp4") ? (
                  <video className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-black" controls playsInline preload="metadata">
                    {(() => {
                      const src = lightbox.src;
                      const candidates: string[] = [];
                      const add = (u: string) => {
                        if (!u) return;
                        if (!candidates.includes(u)) candidates.push(u);
                      };
                      add(src);
                      if (src.startsWith("/media/")) {
                        const bases = (ASSETS as any).mediaExtraBases as string[] | undefined;
                        if (Array.isArray(bases)) {
                          for (const base of bases) add(`${base}${src}`);
                        }
                        add(src.replace("/media/", "/files/public_html/media/"));
                        add(src.replace("/media/", "/api/preview/big/public_html/media/"));
                        add(src.replace("/media/", "/api/preview/medium/public_html/media/"));
                        add(src.replace("/media/", "/api/preview/small/public_html/media/"));
                      }
                      return candidates.map((u) => <source key={u} src={u} type="video/mp4" />);
                    })()}
                  </video>
                ) : (
                  <SmartImg src={lightbox.src} alt={lightbox.alt || "Imagem"} className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-black" loading="eager" />
                )}

                <div className="wm-overlay wm-strong" aria-hidden="true" style={{ backgroundImage: `url('${watermarkUrl}')` }} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <HashLinkInterceptor onHash={scrollOrRouteToHash} />
    </div>
  );
}
