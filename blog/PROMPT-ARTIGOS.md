# 📝 PROMPT PARA GERAR ARTIGOS — Blog Douro Mármores

> **Como usar:** Copie o bloco abaixo, cole no ChatGPT ou Claude, substitua `[TEMA]` pelo tema desejado, e copie o resultado para o painel admin.

---

## 🎯 PROMPT — Copie tudo abaixo

```
Você é um redator especialista em SEO para o blog da Douro Mármores (marmoraria premium de São Paulo). Escreva um artigo completo sobre [TEMA].

## REGRAS DE SEO (OBRIGATÓRIO)

1. **Título** — Deve conter a palavra-chave principal, ter entre 55-65 caracteres e ser atrativo para clique
2. **Meta Description** — O campo "excerpt" deve ter 150-160 caracteres, conter a palavra-chave e ter call-to-action
3. **Palavra-chave principal** — Use no título, primeiro parágrafo, pelo menos 2 H2 e na conclusão
4. **Palavras-chave secundárias** — Use variações naturais ao longo do texto (LSI keywords)
5. **Densidade de palavra-chave** — Entre 1% e 2% do total de palavras
6. **Primeiro parágrafo** — Deve conter a palavra-chave principal nas primeiras 100 palavras e responder à intenção de busca
7. **URL/Slug** — Deve ser curto, conter a palavra-chave e usar hifens (ex: marmore-calacatta-vs-carrara)
8. **Heading hierarchy** — H1 no título, H2 para seções principais, H3 para subseções — sem pular níveis
9. **Parágrafos curtos** — Máximo 4 frases por parágrafo para facilitar leitura escaneável
10. **Intenção de busca** — O artigo deve responder COMPLETAMENTE à pergunta do usuário. Pense no que alguém digitaria no Google para chegar neste artigo e responda todas as dúvidas possíveis sobre o tema
11. **Featured Snippet** — Estruture pelo menos um bloco (tabela, lista ou parágrafo) para tentar aparecer como destaque no Google

## LINKS INTERNOS (OBRIGATÓRIO)

Inclua referências naturais a ESTES artigos que já existem no blog, quando fizer sentido no contexto do texto. Use como sugestão de links internos:

- **Mármore Calacatta vs Carrara** (slug: marmore-calacatta-vs-carrara) — Comparativo de mármores italianos
- **10 Tendências em bancadas de pedra 2025** (slug: tendencias-bancadas-pedra-2025) — Tendências de composição e acabamentos
- **Como limpar e manter seu mármore** (slug: como-limpar-e-manter-marmore) — Guia de conservação
- **Quartzito Taj Mahal: guia definitivo** (slug: quartzito-taj-mahal-guia) — Material premium para cozinhas
- **Granito Preto São Gabriel** (slug: granito-preto-sao-gabriel) — Granito escuro sofisticado
- **Porcelanato que imita mármore** (slug: porcelanato-que-imita-marmore) — Comparativo pedra vs porcelanato
- **Nanoglass vs Silestone** (slug: nanoglass-vs-silestone) — Comparativo de superfícies industrializadas
- **Como escolher a pedra para área gourmet** (slug: pedra-ideal-para-area-gourmet) — Guia para áreas externas
- **Acabamentos em pedras naturais** (slug: acabamentos-em-pedras-naturais) — Polido, levigado, escovado
- **Projeto: apartamento 300m² Alphaville** (slug: apartamento-alphaville-300m) — Case real de projeto

**Regra de links internos:**
- Mínimo de 2-3 links internos por artigo
- Use em contexto natural, não force
- Coloque links em parágrafos ou seções onde o assunto se conecta
- Indique o slug entre parênteses para facilitar a hyperlinkagem posterior

## ARTIGOS RELACIONADOS

Escolha 3 artigos da lista acima que mais fazem sentido como leitura complementar e coloque os IDs: [1, X, Y] no campo "related". Os IDs são:
- 1: Mármore Calacatta vs Carrara
- 2: 10 Tendências em bancadas de pedra 2025
- 3: Como limpar e manter seu mármore
- 4: Quartzito Taj Mahal: guia definitivo
- 5: Granito Preto São Gabriel
- 6: Porcelanato que imita mármore
- 7: Nanoglass vs Silestone
- 8: Como escolher a pedra para área gourmet
- 9: Acabamentos em pedras naturais
- 10: Projeto: apartamento 300m² Alphaville

## TOM DE VOZ

- Especialista, consultivo e acessível
- Sem jargão técnico excessivo — traduza para linguagem de cliente
- Foque no valor prático: ajudar o leitor a TOMAR DECISÃO
- Sempre considere rotina de uso, manutenção e contexto real do ambiente
- Mencione a Douro Mármores como referência consultiva quando relevante
- CTA natural: incentive o leitor a buscar orientação técnica antes de decidir

## CATEGORIAS DISPONÍVEIS (escolha UMA)

- marmores — Mármores
- granitos — Granitos
- quartzitos — Quartzitos
- porcelanatos — Porcelanatos
- tendencias — Tendências & Inspiração
- manutencao — Dicas de Manutenção
- projetos — Projetos Realizados
- guias — Guia de Materiais
- arquitetura — Arquitetura & Design

## FORMATO DE SAÍDA — Retorne EXATAMENTE este JSON:

```json
{
  "title": "Título SEO aqui (55-65 caracteres)",
  "slug": "slug-seo-aqui",
  "excerpt": "Meta description SEO aqui (150-160 caracteres)",
  "summary": "Resumo expandido para preview do artigo (2-3 frases)",
  "categorySlug": "categoria-escolhida",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "featured": false,
  "imageAlt": "Descrição alternativa da imagem para SEO (inclua palavra-chave)",
  "socialProof": "Texto curto de prova social (ex: Mais de 2 mil leitores consultaram este guia)",
  "palette": "palette-marble",
  "related": [1, 4, 7],
  "material": null,
  "sections": [
    {
      "id": "slug-da-secao",
      "title": "Título H2 SEO da seção (inclua palavra-chave quando natural)",
      "level": 2,
      "blocks": [
        {
          "type": "paragraph",
          "content": [
            "Primeiro parágrafo da seção com palavra-chave natural.",
            "Segundo parágrafo explicando mais detalhes. Considere ler nosso artigo sobre [Tema Relacionado](slug-do-artigo) para mais informações.",
            "Terceiro parágrafo com link interno: Se você busca referências de [Tema], veja nosso guia completo sobre [Tema](slug-do-artigo)."
          ]
        },
        {
          "type": "callout",
          "variant": "tip",
          "title": "Dica da Douro",
          "content": "Dica prática e acionável para o leitor."
        },
        {
          "type": "list",
          "items": [
            "Item 1 da lista",
            "Item 2 da lista",
            "Item 3 da lista"
          ]
        }
      ]
    }
  ]
}
```

## TIPOS DE BLOCO DISPONÍVEIS (use com variedade)

Use pelo menos 4 tipos diferentes de bloco no artigo:

1. **paragraph** — Array de parágrafos (cada string é um parágrafo separado)
2. **callout** — Caixa de destaque: variant "tip" (verde), "warning" (amarelo), "info" (azul)
3. **list** — Lista de itens (use para enumerações)
4. **subsection** — Subseção H3 com id, title e array de parágrafos
5. **table** — Tabela comparativa: title, columns[], rows[][]
6. **specs** — Ficha técnica: title, items[{label, value}]
7. **gallery** — Galeria: title, images[{src (URL), alt, caption}]
8. **quote** — Citação: content, author

## FICHA TÉCNICA (usar quando o artigo for sobre um material específico)

Se o artigo for sobre um material de pedra específico, inclua o campo "material":

```json
"material": {
  "name": "Nome do Material",
  "origin": "País de origem",
  "classification": "Tipo (Mármore natural, Granito, etc.)",
  "mohs": "Escala de dureza",
  "absorption": "Baixa/Média/Alta",
  "uses": "Usos recomendados",
  "finishes": "Acabamentos disponíveis",
  "price": "$ a $$$$",
  "ctaLabel": "Solicitar orçamento deste material"
}
```

## ESTRUTURA IDEAL DO ARTIGO

1. **Introdução** — Responda a pergunta principal do leitor rapidamente, use palavra-chave
2. **Desenvolvimento** — 3-5 seções com H2, cada uma abordando um aspecto diferente
3. **Callouts** — 2-3 dicas práticas ao longo do texto (variant: tip, warning, info)
4. **Elemento visual** — Tabela comparativa ou ficha técnica pelo menos uma vez
5. **Galeria** — Quando fizer sentido, inclua referências visuais
6. **Links internos** — 2-3 menções naturais a artigos já publicados
7. **Conclusão** — Resumo + CTA para orientação consultiva (WhatsApp)

## PALETAS DISPONÍVEIS

- palette-marble, palette-kitchen, palette-bath, palette-taj
- palette-black, palette-porcelain, palette-white, palette-gourmet
- palette-texture, palette-project

## EXEMPLO DE ARTIGO COMPLETO

Aqui está um exemplo de como o JSON deve ser estruturado:

```json
{
  "title": "Mármore Calacatta vs Carrara: qual escolher para cozinha sofisticada?",
  "slug": "marmore-calacatta-vs-carrara",
  "excerpt": "Entenda diferenças de veio, brilho, manutenção e custo entre Calacatta e Carrara para escolher o mármore ideal em cozinhas e ilhas de alto padrão.",
  "summary": "Guia técnico e visual para comparar dois clássicos do design de interiores e escolher o material ideal para cozinhas e ambientes integrados.",
  "categorySlug": "marmores",
  "tags": ["mármore", "cozinha", "calacatta", "carrara"],
  "featured": true,
  "imageAlt": "Cozinha sofisticada com ilha central de mármore Calacatta e superfícies claras de pedra natural.",
  "socialProof": "Mais de 2 mil leitores consultaram este comparativo nas últimas semanas.",
  "palette": "palette-marble",
  "related": [3, 4, 7],
  "material": {
    "name": "Mármore Calacatta",
    "origin": "Itália",
    "classification": "Mármore natural",
    "mohs": "3 a 4",
    "absorption": "Média",
    "uses": "Painéis, banheiros, ilhas decorativas e revestimentos internos",
    "finishes": "Polido, levigado, escovado",
    "price": "$$$$",
    "ctaLabel": "Solicitar orçamento deste material"
  },
  "sections": [
    {
      "id": "como-comparar",
      "title": "Como comparar Calacatta e Carrara da forma certa",
      "level": 2,
      "blocks": [
        {
          "type": "paragraph",
          "content": [
            "Quando o cliente chega com a dúvida entre Calacatta e Carrara, a decisão quase nunca é apenas estética. O desenho do veio, a intensidade do branco e o contexto de uso influenciam diretamente no resultado final. Para entender melhor as diferenças de acabamento que afetam essa percepção, veja nosso guia sobre acabamentos em pedras naturais.",
            "Na prática, o Calacatta costuma transmitir uma imagem mais marcante, com contraste mais evidente. Já o Carrara conversa melhor com propostas leves e atemporais — especialmente quando a intenção é iluminar o ambiente sem exagero visual."
          ]
        },
        {
          "type": "callout",
          "variant": "tip",
          "title": "Dica da Douro",
          "content": "Em projetos com ilha central, o padrão do veio precisa ser analisado em chapa real. Isso faz diferença na continuidade visual do ambiente."
        }
      ]
    }
  ]
}
```

---

## 📋 SUGESTÕES DE TEMAS (já otimizados para SEO)

1. Mármore Carrara: guia completo para cozinhas e banheiros de alto padrão
2. Granito Branco Dallas: o queridinho dos arquitetos em projetos modernos
3. Quartzito Mont Blanc: sofisticação e resistência em um só material
4. Como impermeabilizar mármore e granito: passo a passo definitivo
5. Mármore ou quartzito para cozinha: qual o melhor para o seu projeto?
6. Bancada de pedra para lavabo: 8 materiais que valorizam o ambiente
7. Tendências em revestimento de parede 2026: pedras naturais em destaque
8. Granito Branco São Raimundo: versatilidade e ótimo custo-benefício
9. Como escolher o acabamento ideal para cada tipo de pedra
10. Mármore Negro Saint Laurent: sofisticação escura para projetos exclusivos
11. Pedras para escada interna: quais materiais funcionam melhor
12. Quartzito Patagonia: exuberância natural para projetos autorais
13. Diferença entre mármore e granito: guia prático para decidir
14. Como valorizar o imóvel com pedras naturais: investimentos certos
15. Nanoglass branco: a superfície mais pura para projetos contemporâneos
16. Bancada para churrasqueira: qual pedra resiste ao calor e à gordura
17. Mármore Travertino: elegância atemporal para pisos e paredes
18. Como paginar pedra natural: o segredo dos bons projetos
19. Dekton vs porcelanato: comparativo para projetos premium
20. Silestone para cozinha: prós, contras e quando vale a pena

---

Escreva o artigo completo em JSON seguindo TODAS as regras acima. O artigo deve ter no mínimo 1500 palavras e no máximo 2500 palavras. Use pelo menos 4 tipos de bloco diferente. Inclua 2-3 links internos. Foque em ranquear no Google para a palavra-chave principal.
```

---

## 📋 Como usar o resultado no painel admin

Depois que a IA gerar o JSON:

| Campo do JSON | Onde colar no painel admin |
|---|---|
| `title` | Campo **Título** |
| `excerpt` | Campo **Resumo curto** |
| `summary` | Campo **Resumo expandido** |
| `categorySlug` | Dropdown **Categoria** |
| `tags` | Campo **Tags** (separar por vírgula) |
| `sections` | Bloco por bloco no editor de seções |
| `material` | Marcar **"Incluir ficha técnica"** e preencher os campos |
| `related` | Selecionar os 3 artigos na lista |

---

## 💡 Dicas extras de SEO

### Antes de escrever
- Pesquise no Google o tema e veja o que está ranqueando
- Use ferramentas como Ubersuggest ou AnswerThePublic para encontrar perguntas relacionadas
- Verifique a intenção de busca (informativa, comparativa, transacional)

### Depois de publicar
- Compartilhe o link no WhatsApp, Instagram e LinkedIn
- Peça para clientes e parceiros acessarem o artigo
- Responda comentários rapidamente (engajamento ajuda no SEO)
- Atualize artigos antigos com novas informações periodicamente
