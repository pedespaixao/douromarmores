import React, { useEffect, useMemo, useRef, useState } from "react";
import { ASSETS } from "@/data/assets";
import { FAQ_DATA, type FaqCategory } from "@/data/faq";

export function FaqSection({
  show,
  variant = "home",
  onNav,
  onHash,
}: {
  show: boolean;
  variant?: "home" | "page";
  onNav?: (page: string) => void;
  onHash?: (hash: string) => void;
}) {
  // Performance: se não está visível, não montamos o FAQ nem fazemos filtros.
  if (!show) return null;

  const isPage = variant === "page";
  const faqAnswerId = (id: number) => `faq-answer-${id}`;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"todas" | FaqCategory>("todas");
  const [openId, setOpenId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const base: Record<"todas" | FaqCategory, number> = {
      todas: 0,
      materiais: 0,
      engenharia: 0,
      orcamento: 0,
      prazo: 0,
      manutencao: 0,
      garantia: 0,
      pagamento: 0,
    };
    for (const item of FAQ_DATA) base[item.category] += 1;
    base.todas = FAQ_DATA.length;
    return base;
  }, []);

  const filterButtons: Array<{ key: "todas" | FaqCategory; label: string }> = [
    { key: "todas", label: "Todas" },
    { key: "materiais", label: "Materiais" },
    { key: "engenharia", label: "Engenharia & Instalação" },
    { key: "orcamento", label: "Preço & Obra" },
    { key: "prazo", label: "Prazos" },
    { key: "manutencao", label: "Uso & Manutenção" },
    { key: "garantia", label: "Garantia & Confiança" },
    { key: "pagamento", label: "Pagamento" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchFilter = activeFilter === "todas" || item.category === activeFilter;
      if (!matchFilter) return false;
      if (!q) return true;
      const hay = `${item.keys} ${item.question} ${item.answerHtml}`.toLowerCase();
      return hay.includes(q);
    });
  }, [activeFilter, query]);

  useEffect(() => {
    if (openId == null) return;
    if (!filtered.some((f) => f.id === openId)) setOpenId(null);
  }, [filtered, openId]);

  const categoryLabel: Record<FaqCategory, string> = {
    materiais: "Materiais",
    engenharia: "Engenharia",
    orcamento: "Preço & Obra",
    prazo: "Prazos",
    manutencao: "Uso & Manutenção",
    garantia: "Garantia",
    pagamento: "Pagamento",
  };

  const quickTerms = [
    { q: "mármore cozinha", label: "Mármore na cozinha" },
    { q: "meia-esquadria", label: "Meia-esquadria 45º" },
    { q: "mancha", label: "Mancha" },
    { q: "choque térmico", label: "Panela quente" },
    { q: "prazo", label: "Prazo" },
    { q: "orçamento", label: "Orçamento" },
    { q: "dekton", label: "Dekton" },
  ] as const;

  const onQuickSearch = (term: string) => {
    setActiveFilter("todas");
    setQuery(term);
    setOpenId(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const resetFilters = () => {
    setQuery("");
    setActiveFilter("todas");
    setOpenId(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const waNumber = ASSETS.waNumber || "5511999999999";
  const waGuidanceUrl = useMemo(() => {
    const msg = "Olá! Quero orientação técnica para escolher a melhor pedra (uso + estética + faixa de investimento).";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  }, [waNumber]);

  const waSendPlanUrl = useMemo(() => {
    const msg = "Olá! Quero enviar fotos/medidas (ou planta) e receber um orçamento técnico detalhado.";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  }, [waNumber]);

  const goToContato = (e: React.MouseEvent) => {
    if (!onNav) return;
    e.preventDefault();
    onNav("contato");
  };

  const goToContatoOrScroll = (e: React.MouseEvent) => {
    if (isPage) return goToContato(e);
    if (!onHash) return;
    e.preventDefault();
    onHash("#contato");
  };

  if (isPage) {
    return (
      <section id="faq" className="bg-gray-50">
        <div className="container mx-auto px-4 pt-10 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 text-white border border-white/10 shadow-2xl">
            <div className="absolute inset-0 gradient-gold-radial opacity-30" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/70" aria-hidden="true" />
            <div className="relative p-7 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[11px] tracking-widest uppercase">
                      <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                      Dúvidas • Autoridade • Decisão segura
                    </span>
                    <span className="inline-flex items-center rounded-full bg-black/40 border border-white/10 px-4 py-2 text-[11px] tracking-widest uppercase text-white/80">
                      Guia completo: {counts.todas} respostas
                    </span>
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    O DOSSIÊ DA PEDRA:
                    <span className="text-gold"> 100 Respostas de Ouro</span>
                  </h1>

                  <p className="mt-4 text-white/80 text-lg leading-relaxed">
                    Se você está escolhendo pedra para cozinha, banheiro, área gourmet ou fachada, aqui está o que te protege de arrependimento: <strong>material certo</strong>, <strong>engenharia certa</strong> e <strong>orçamento sem surpresa</strong>.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href={waGuidanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-green-500 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-green-600 transition"
                    >
                      <i className="fab fa-whatsapp mr-2 text-xl" />
                      Tirar dúvida com especialista
                    </a>
                    <a
                      href="?p=contato"
                      onClick={goToContato}
                      className="inline-flex items-center justify-center bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                      Receber orçamento técnico
                      <i className="fas fa-arrow-right ml-2 text-gold" />
                    </a>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/75">
                    <span className="inline-flex items-center gap-2">
                      <i className="fas fa-circle-check text-gold" />
                      Respostas diretas (sem enrolação)
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <i className="fas fa-circle-check text-gold" />
                      Do material ao pós‑obra
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <i className="fas fa-circle-check text-gold" />
                      Pra você comparar preço x valor
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:min-w-[260px]">
                  <div className="rounded-2xl bg-white/8 border border-white/12 p-4">
                    <div className="text-[11px] tracking-widest uppercase text-white/60">Tema mais buscado</div>
                    <div className="mt-2 font-semibold">Mancha • Calor • Meia‑esquadria</div>
                    <div className="mt-1 text-sm text-white/70">Use os atalhos abaixo e ache em segundos.</div>
                  </div>
                  <div className="rounded-2xl bg-white/8 border border-white/12 p-4">
                    <div className="text-[11px] tracking-widest uppercase text-white/60">Atalho pro orçamento</div>
                    <a
                      href={waSendPlanUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center justify-center w-full bg-gray-900/60 hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl font-semibold transition"
                    >
                      <i className="fab fa-whatsapp mr-2 text-green-400" />
                      Enviar planta/fotos
                    </a>
                    <div className="mt-2 text-xs text-white/65">Você recebe orientação + faixa de investimento.</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {quickTerms.map((t) => (
                  <button
                    key={t.q}
                    type="button"
                    onClick={() => onQuickSearch(t.q)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-sm font-semibold hover:bg-white/15 transition"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-[340px_1fr] gap-6 items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-900">Filtrar por tema</div>
                    <div className="text-sm text-gray-600">Escolha o assunto e vá direto ao ponto.</div>
                  </div>
                  {query || activeFilter !== "todas" ? (
                    <button type="button" className="text-sm font-semibold text-gray-900 hover:text-black" onClick={resetFilters}>
                      Limpar
                    </button>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {filterButtons.map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      className={[
                        "faq-filter-btn px-4 py-2 rounded-full text-sm font-semibold",
                        activeFilter === b.key ? "active" : "",
                      ].join(" ")}
                      onClick={() => setActiveFilter(b.key)}
                      aria-pressed={activeFilter === b.key ? "true" : "false"}
                    >
                      {b.label}
                      <span className="ml-2 text-[11px] opacity-70">{counts[b.key]}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-5">
                  <div className="font-bold text-gray-900">Se a dúvida é “qual pedra eu compro”</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Me mande <strong>fotos</strong> + <strong>medidas aproximadas</strong> + onde vai usar. Eu te devolvo 2–3 opções com prós/contras e uma faixa de investimento.
                  </p>
                  <a
                    href={waGuidanceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center w-full bg-gray-900 text-white px-5 py-3 rounded-full font-semibold hover:bg-black transition btn-glow"
                  >
                    <i className="fab fa-whatsapp mr-2 text-green-400" />
                    Falar agora
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-gray-900 text-white rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-shield text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Decisão sem arrependimento</div>
                    <p className="text-white/80 mt-2 text-sm leading-relaxed">
                      Este guia existe pra você não cair em três armadilhas: <strong>material errado</strong>, <strong>instalação fraca</strong> e <strong>orçamento que explode</strong>.
                    </p>
                    <a
                      href="?p=contato"
                      onClick={goToContato}
                      className="mt-4 inline-flex items-center justify-center w-full bg-white text-gray-900 px-5 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                      Quero orçamento técnico
                      <i className="fas fa-arrow-right ml-2 text-gold" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Encontre sua resposta em segundos</div>
                    <div className="text-sm text-gray-600">
                      Digite o que você está com medo de acontecer: <strong>mancha</strong>, <strong>trinca</strong>, <strong>cola</strong>, <strong>prazo</strong>, <strong>garantia</strong>.
                    </div>
                  </div>
                  <div className="relative flex-1 md:max-w-md">
                    <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition"
                      placeholder="Ex.: meia-esquadria, mármore na cozinha, carrara, choque térmico"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-sm text-gray-600">
                    Mostrando <strong className="text-gray-900">{filtered.length}</strong> de <strong className="text-gray-900">{FAQ_DATA.length}</strong>
                  </div>
                  {query || activeFilter !== "todas" ? (
                    <button type="button" className="text-sm font-semibold text-gray-900 hover:text-black" onClick={resetFilters}>
                      Limpar busca/filtro
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4" aria-live="polite">
                {filtered.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={[
                        "faq-item bg-white rounded-2xl p-6 cursor-pointer shadow-sm hover:shadow-md transition",
                        isOpen ? "active" : "",
                      ].join(" ")}
                      onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      aria-controls={faqAnswerId(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenId((v) => (v === item.id ? null : item.id));
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(201,169,97,0.12)] text-gray-900 text-[11px] font-semibold tracking-widest uppercase">
                              {categoryLabel[item.category]}
                            </span>
                            <span className="text-[12px] text-gray-500">#{item.id}</span>
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 leading-snug">{item.question}</h3>
                        </div>

                        <i className="fas fa-chevron-down text-gold faq-icon transition-transform duration-300 mt-1" />
                      </div>

                      <div
                        id={faqAnswerId(item.id)}
                        className="faq-answer text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                      />
                    </div>
                  );
                })}

                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 text-gray-600">Não encontrei nada com essa busca/filtro.</div>
                ) : null}
              </div>

              <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-bold text-gray-900">Chegou ao fim do dossiê?</div>
                  <div className="text-sm text-gray-600">Use os atalhos para voltar sem esforço.</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:bg-gray-50 transition"
                    onClick={() => {
                      const el = document.getElementById("faq");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      else window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <i className="fas fa-arrow-up mr-2 text-gold" />
                    Voltar ao topo
                  </button>

                  <a
                    href="?p=home"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition btn-glow"
                    onClick={(e) => {
                      e.preventDefault();
                      onNav?.("home");
                    }}
                  >
                    <i className="fas fa-house mr-2 text-gold" />
                    Voltar para Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-gold font-semibold uppercase tracking-widest text-sm">Dúvidas • Autoridade • Decisão segura</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
              O DOSSIÊ DA PEDRA: <span className="text-gold">100 Respostas de Ouro</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A maioria dos problemas em bancada não vem da pedra — vem da <strong>escolha errada</strong> para o seu uso e de instalação sem engenharia.
            </p>

            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(201,169,97,0.15)] flex items-center justify-center text-gold">
                  <i className="fas fa-award text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Como usar este guia</h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex gap-3">
                      <i className="fas fa-check text-gold mt-1" />
                      <span>
                        Use a <strong>busca</strong>.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <i className="fas fa-check text-gold mt-1" />
                      <span>
                        Filtre por <strong>tema</strong>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={waGuidanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center bg-green-500 text-white px-7 py-4 rounded-full font-semibold hover:bg-green-600 transition"
                >
                  <i className="fab fa-whatsapp mr-2 text-xl" />
                  Enviar minha dúvida agora
                </a>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 px-7 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition"
                  onClick={goToContatoOrScroll}
                >
                  Solicitar orçamento técnico
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-gray-900">Encontre sua resposta em 10 segundos</div>
                  <div className="text-sm text-gray-600">Pesquise por tema ou use os filtros.</div>
                </div>
                <div className="relative flex-1 md:max-w-md">
                  <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition"
                    placeholder="Ex.: carrara, quartzito, meia‑esquadria, mancha"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {filterButtons.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    className={[
                      "faq-filter-btn px-4 py-2 rounded-full text-sm font-semibold",
                      activeFilter === b.key ? "active" : "",
                    ].join(" ")}
                    onClick={() => setActiveFilter(b.key)}
                    aria-pressed={activeFilter === b.key ? "true" : "false"}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4" aria-live="polite">
              {filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={[
                      "faq-item bg-white rounded-2xl p-6 cursor-pointer shadow-sm hover:shadow-md transition",
                      isOpen ? "active" : "",
                    ].join(" ")}
                    onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    aria-controls={faqAnswerId(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenId((v) => (v === item.id ? null : item.id));
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg text-gray-900 pr-4">
                        {item.id}. {item.question}
                      </h3>
                      <i className="fas fa-chevron-down text-gold faq-icon transition-transform duration-300" />
                    </div>
                    <div
                      id={faqAnswerId(item.id)}
                      className="faq-answer text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  </div>
                );
              })}
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-gray-600">Não encontrei nada com essa busca/filtro. Tente outro termo.</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
