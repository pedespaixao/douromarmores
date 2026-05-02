export type FaqCategory =
  | "materiais"
  | "engenharia"
  | "orcamento"
  | "prazo"
  | "manutencao"
  | "garantia"
  | "pagamento";

export type FaqItem = {
  id: number;
  category: FaqCategory;
  keys: string;
  question: string;
  answerHtml: string;
};

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: "materiais",
    keys: "marmore mármore granito diferença rocha magmática metamórfica sedimentar calcário cálcio dureza mohs ácido limão vinagre cozinha",
    question: "Mármore e Granito são a mesma coisa?",
    answerHtml:
      "<p><strong>Não</strong> — e confundir isso pode custar caro.</p><p><strong>Granito</strong> é rocha <strong>magmática</strong> (lava resfriada), muito dura (<strong>6–7 Mohs</strong>) e resistente a químicos. É o ‘tanque de guerra’ para cozinhas.</p><p><strong>Mármore</strong> é rocha <strong>metamórfica/sedimentar</strong> com base de <strong>cálcio</strong>, mais macia (<strong>3–4 Mohs</strong>) e <strong>reage a ácidos</strong> (ex.: limão), podendo perder brilho (ficar fosca) e marcar.</p><p><strong>Resumo:</strong> Granito é para batalha; mármore é para luxo em áreas secas ou banheiros.</p>",
  },
  {
    id: 2,
    category: "materiais",
    keys: "pedra natural mais resistente bancada quartzito dureza mohs quartzo arenito recristalizado tectônica risca vidro aço",
    question: "Qual é a pedra natural mais resistente do mundo para bancadas?",
    answerHtml:
      "<p><strong>Quartzito.</strong> Ele costuma superar o granito em dureza e o mármore em beleza.</p><p>Geologicamente, é um <strong>arenito</strong> que recristalizou em <strong>quartzo</strong> quase puro sob pressão tectônica. Na prática, ele pode <strong>riscar vidro</strong> e até marcas metálicas (aço).</p><p>É a escolha definitiva para quem quer estética natural + durabilidade no longo prazo.</p>",
  },
  {
    id: 3,
    category: "materiais",
    keys: "quartzito sintético sintetico natural 100% extraído montanha chapa única sol chuva calor",
    question: "O Quartzito é \"sintético\"?",
    answerHtml:
      "<p><strong>Não.</strong> Quartzito é <strong>100% natural</strong>, extraído de jazidas (montanhas). Cada chapa é única.</p><p>Diferente de materiais com resina, ele tende a lidar muito bem com <strong>sol, chuva e calor</strong> sem sofrer as alterações típicas de polímeros.</p>",
  },
  {
    id: 4,
    category: "materiais",
    keys: "quartzo silestone technistone pedra de engenharia 93% 7% resina pigmento porosidade calor panela quente",
    question: "O que é Quartzo (Silestone, Technistone, etc.)?",
    answerHtml:
      "<p>É uma <strong>pedra de engenharia</strong> (industrializada): normalmente <strong>~93% quartzo natural moído</strong> + <strong>~7% resina e pigmentos</strong>.</p><p><strong>Vantagens:</strong> cor sólida (ex.: brancos ‘absolutos’) e porosidade muito baixa.</p><p><strong>Ponto de atenção:</strong> a <strong>resina</strong> não gosta de <strong>calor extremo</strong>. Panela muito quente pode marcar/queimar a superfície. Use sempre apoio térmico.</p>",
  },
  {
    id: 5,
    category: "materiais",
    keys: "mármore prime cozinha não recomendado pó de mármore resina amarela absorção mancha risca",
    question: "\"Me ofereceram Mármore Prime para a cozinha\". Devo aceitar?",
    answerHtml:
      "<p><strong>Não recomendamos.</strong> O chamado ‘Prime’ costuma ser uma massa econômica de <strong>pó de mármore</strong> com <strong>resina</strong> de baixa performance.</p><p>Problemas comuns: <strong>alta absorção</strong> (mancha até com água), <strong>risca com muita facilidade</strong> e pode <strong>amarelar</strong> com o tempo.</p><p>Em geral, faz sentido apenas em <strong>lavabos de baixo uso</strong>. Para cozinha, escolha granito, quartzito, quartzo de boa procedência ou sinterizados.</p>",
  },
  {
    id: 6,
    category: "materiais",
    keys: "carrara cozinha sonho pesadelo calcário poroso ácido limão vinagre tomate fosco mancha vinho quartzito quartzo efeito carrara",
    question: "Mármore Carrara na cozinha: sonho ou pesadelo?",
    answerHtml:
      "<p><strong>Sonho estético</strong> e, para a maioria das rotinas, <strong>pesadelo funcional</strong>.</p><p>O Carrara é calcário/metamórfico com porosidade relevante. Contato com <strong>ácidos</strong> (limão, vinagre, tomate) pode causar <strong>corrosão/ataque químico</strong> rápido (fica fosco). Pigmentos (ex.: vinho) podem manchar.</p><p>Se você não quer uma bancada ‘vivida’ e marcada, considere <strong>quartzo</strong> ou <strong>quartzito</strong> com visual semelhante ao Carrara.</p>",
  },
  {
    id: 7,
    category: "materiais",
    keys: "superfície sinterizada dekton neolith lâmina 25000 toneladas 1200 graus fogo risco química borda lasca cerâmica",
    question: "O que é Superfície Sinterizada (Dekton, Neolith, Lâmina)?",
    answerHtml:
      "<p>É uma superfície feita por <strong>sinterização</strong>: minerais são prensados em altíssima pressão (ex.: 25.000 toneladas) e ‘cozidos’ em alta temperatura (ex.: 1.200ºC).</p><p><strong>Pontos fortes:</strong> excelente resistência a <strong>calor</strong>, <strong>riscos</strong> e <strong>químicos</strong>.</p><p><strong>Ponto fraco:</strong> <strong>quinas/bordas</strong>. Pode <strong>lascar</strong> por impacto (como cerâmica). Exige boa engenharia de borda e cuidado no uso.</p>",
  },
  {
    id: 8,
    category: "materiais",
    keys: "nanoglass vidro cristalizado branco absoluto duro rígido trinca nivelamento laser instalação base",
    question: "O que é Nanoglass?",
    answerHtml:
      "<p>É um material de base vítrea (tipo <strong>vidro cristalizado</strong>) com visual de <strong>branco absoluto</strong> e alto brilho.</p><p>É duro, mas também <strong>muito rígido</strong>. Por isso, exige <strong>instalação perfeita</strong> e base extremamente bem nivelada: pequenas torções/tensões podem provocar <strong>trincas</strong>.</p><p>Visualmente é incrível — tecnicamente, exige mais.</p>",
  },
  {
    id: 9,
    category: "materiais",
    keys: "travertino bancada pia buracos vacúolos estucagem resina solta sujeira água constante",
    question: "Mármore Travertino serve para bancada de pia?",
    answerHtml:
      "<p>O Travertino possui <strong>vacúolos</strong> (furinhos naturais) que normalmente são preenchidos por <strong>resina</strong> (estucagem).</p><p>Em áreas com <strong>água constante</strong> (pia/uso intenso), essa estucagem pode se desgastar/soltar com o tempo e abrir microcavidades que acumulam sujeira.</p><p>Por isso, costuma funcionar melhor em <strong>pisos, paredes e lavabos</strong>, do que em bancadas de área molhada intensa.</p>",
  },
  {
    id: 10,
    category: "materiais",
    keys: "granito preto absoluto preto tingido fraude desbota solvente teste na frente",
    question: "Granito Preto Absoluto é realmente preto?",
    answerHtml:
      "<p>O material natural pode ter <strong>variações sutis</strong>.</p><p>O alerta importante é com o chamado <strong>‘preto tingido’</strong> (fraude): uma pedra mais clara/acinzentada é pintada e pode <strong>desbotar</strong> ou sair com solventes.</p><p>O ideal é trabalhar com procedência e teste simples quando necessário.</p>",
  },
  {
    id: 11,
    category: "materiais",
    keys: "granitos exóticos resistentes bonitos elite azul vermelho dourado densidade",
    question: "Granitos Exóticos são resistentes ou só bonitos?",
    answerHtml:
      "<p>Em muitos casos, são os dois: <strong>bonitos e muito resistentes</strong>.</p><p>Granitos exóticos costumam ter <strong>alta densidade</strong> e dureza, além de cores e movimentos únicos (azulados, dourados, avermelhados). É a união de <strong>arte</strong> e <strong>engenharia</strong>.</p>",
  },
  {
    id: 12,
    category: "materiais",
    keys: "pedra branca mancha mais que escura porosidade itaúnas siena impermeabilização",
    question: "Pedra branca mancha mais que a escura?",
    answerHtml:
      "<p><strong>Visualmente</strong>, sim: qualquer sujeira aparece mais.</p><p><strong>Quimicamente</strong>, algumas pedras claras naturais (ex.: certos granitos claros) podem ser mais <strong>porosas</strong> do que pedras escuras, absorvendo mais líquidos.</p><p>Por isso, pedras claras pedem <strong>impermeabilização profissional</strong> e cuidados de uso (limpeza rápida de líquidos pigmentados).</p>",
  },
  {
    id: 13,
    category: "materiais",
    keys: "mármore dolomítico dolomitico magnésio mais duro resistente ácido",
    question: "O que é \"Mármore Dolomítico\"?",
    answerHtml:
      "<p>É um mármore com presença de <strong>magnésio</strong> (dolomita) na composição — o que tende a deixá-lo <strong>mais duro</strong> do que mármores calcíticos comuns.</p><p>Ainda assim, ele pode reagir a <strong>ácidos</strong> e merece cuidados. É um bom <strong>meio-termo</strong> entre beleza e resistência.</p>",
  },
  {
    id: 14,
    category: "materiais",
    keys: "quartzito mole soft quartzite dolomítico risca fácil calcário misturado",
    question: "Existe Quartzito \"Mole\"?",
    answerHtml:
      "<p>Sim. Existem os chamados <strong>‘soft quartzites’</strong> (ou dolomíticos), que têm parte carbonática na composição.</p><p>São lindos, mas podem <strong>riscar</strong> ou marcar mais facilmente do que quartzitos ‘hard’ (mais ricos em quartzo).</p><p>O ideal é classificar cada material para você saber exatamente o que está levando para a sua rotina.</p>",
  },
  {
    id: 15,
    category: "materiais",
    keys: "porcelanato grande formato bancada porcelanateria casca oca lasca borda barro não conserta pedra maciça",
    question: "O que são os \"Grandes Formatos\" de Porcelanato (Porcelanateria) na bancada?",
    answerHtml:
      "<p>É o uso de porcelanatos/lâminas cerâmicas grandes tentando reproduzir o visual da pedra.</p><p>No showroom, pode ficar bonito. Na vida real, o ponto crítico é <strong>borda/quina</strong>: impactos podem <strong>lascar</strong> e revelar o miolo (corpo cerâmico), com reparo difícil de ficar invisível.</p><p>Pedra natural é <strong>maciça</strong>; pequenos lascados podem ser reparáveis com melhor resultado.</p>",
  },
  {
    id: 16,
    category: "materiais",
    keys: "madeira bancada pia estilo americano umidade brasil apodrece mofo bactéria cuba torneira",
    question: "Madeira na bancada da pia (Estilo Americano) funciona no Brasil?",
    answerHtml:
      "<p>Em geral, <strong>não recomendamos</strong> para a maioria dos projetos no Brasil por causa da <strong>umidade</strong> e contato constante com água.</p><p>Mesmo tratada, a madeira pode <strong>inchar</strong>, <strong>mofar</strong> e degradar ao redor de cuba e torneira — além de dificultar a higiene.</p><p>Pedra e superfícies adequadas são mais estáveis e higiênicas.</p>",
  },
  {
    id: 17,
    category: "materiais",
    keys: "pedra sabão pedra-sabão soapstone talco macia risca unha rústico térmica química resistente",
    question: "O que é \"Pedra Sabão\"? Serve para bancada?",
    answerHtml:
      "<p>É uma rocha muito macia (rica em <strong>talco</strong>), que pode <strong>riscar com facilidade</strong> (até com a unha).</p><p>Ela é ótima em resistência química e conforto térmico, mas o visual vai ficar ‘<strong>vivido</strong>’ rapidamente — cheio de marcas.</p><p>Funciona bem quando o objetivo é um estilo <strong>rústico</strong> e você aceita a patina do uso.</p>",
  },
  {
    id: 18,
    category: "materiais",
    keys: "acabamento leather acetinado escovado diamante textura couro sem brilho poros impermeabilização",
    question: "O que é o acabamento \"Leather\" ou \"Acetinado\"?",
    answerHtml:
      "<p>É um acabamento <strong>escovado</strong> (com abrasivos/diamante) que cria textura suave, tipo ‘couro’, com menos brilho espelhado.</p><p><strong>Vantagens:</strong> disfarça marcas de dedo e micro-riscos; visual sofisticado.</p><p><strong>Atenção:</strong> pode abrir poros superficiais, então costuma pedir <strong>impermeabilização</strong> ainda mais cuidadosa.</p>",
  },
  {
    id: 19,
    category: "materiais",
    keys: "acabamento flameado térmico fogo antiderrapante piscina área externa molhada",
    question: "O que é o acabamento \"Flameado\"?",
    answerHtml:
      "<p>É um tratamento <strong>térmico</strong> (fogo) que ‘estoura’ cristais da superfície e deixa a pedra <strong>rugosa</strong>.</p><p>Resultado: acabamento <strong>antiderrapante</strong>, muito usado em <strong>áreas externas</strong> e bordas de piscina.</p>",
  },
  {
    id: 20,
    category: "materiais",
    keys: "pedra escura esconde sujeira granito preto marrom verde migalhas pó óleo cozinha prática",
    question: "Pedra Escura esconde sujeira?",
    answerHtml:
      "<p>Sim — <strong>visualmente</strong> ela disfarça mais migalhas, pó e pequenas manchas de gordura.</p><p>Granitos pretos/marrons/verdes costumam ser a escolha prática para quem cozinha bastante e não quer a sensação de ‘limpar toda hora’.</p>",
  },

  {
    id: 21,
    category: "engenharia",
    keys: "meia esquadria 45 corte quarenta e cinco luxo saia colada quina monolítico assinatura alta marmoraria",
    question: "O que é a famosa \"Meia Esquadria\" (Corte 45º) e por que ela define o luxo?",
    answerHtml:
      "<p>A <strong>Meia Esquadria (45º)</strong> é a assinatura da alta marmoraria — e um dos detalhes que mais mudam a percepção de luxo.</p><ul><li><strong>Jeito barato:</strong> corta reto e <em>cola a saia</em> na frente. Fica uma <strong>linha de cola</strong> visível na quina, denunciando duas peças.</li><li><strong>Padrão Douro:</strong> cortamos bancada e saia em <strong>45º exatos</strong> com máquina de precisão. Ao unir, a quina vira <strong>a própria pedra</strong>: efeito <strong>monolítico</strong>, limpo e premium.</li></ul><p>Exige mais tempo e técnica — mas o resultado visual é incomparável.</p>",
  },
  {
    id: 22,
    category: "engenharia",
    keys: "emenda bancada grande chapa 3m paginação digital veio continuidade epóxi colorido polimento degrau massa plástica",
    question: "A Emenda vai aparecer em bancadas grandes?",
    answerHtml:
      "<p>Em bancadas maiores do que a chapa (normalmente ~3m), a emenda é <strong>obrigatória</strong>. A diferença está em como ela é planejada e executada.</p><ul><li><strong>Execução amadora:</strong> emenda em qualquer lugar, usa massa inadequada e deixa <strong>degrau</strong> que junta sujeira.</li><li><strong>Nossa técnica:</strong> fazemos <strong>paginação</strong> para continuidade do desenho, usamos <strong>adesivos epóxi/poliéster pigmentados</strong> na cor certa e finalizamos com <strong>polimento “zero degrau”</strong> (você passa a unha e não sente).</li></ul><p>A emenda existe, mas vira um detalhe discreto — não um defeito.</p>",
  },
  {
    id: 23,
    category: "engenharia",
    keys: "massa plástica cola epóxi poliéster estrutural amarela solta absorve água industria naval aeronáutica cuba saia",
    question: "Vocês usam \"Massa Plástica\" ou Cola Especial?",
    answerHtml:
      "<p><strong>Massa plástica</strong> (de lata) é solução de reparo rápido: pode <strong>absorver água</strong>, <strong>amarelar</strong> e perder desempenho com o tempo.</p><p>No nosso padrão, usamos <strong>adesivos estruturais</strong> (poliéster e/ou <strong>epóxi</strong>) — química de alta performance, semelhante ao que se usa em aplicações industriais exigentes.</p><p>Isso aumenta a segurança de saias, emendas e fixações (incluindo cuba) e reduz risco de descolamento por falha de cola.</p>",
  },
  {
    id: 24,
    category: "engenharia",
    keys: "reforço estrutural oculto cooktop cuba recorte viga invisível fibra vidro ferro epóxi quebra borda fina",
    question: "O que é \"Reforço Estrutural Oculto\"? (O segredo da durabilidade)",
    answerHtml:
      "<p>Ao recortar a pedra para <strong>cooktop</strong> ou <strong>cuba</strong>, sobram faixas finas e mais vulneráveis. Sem reforço, qualquer carga local pode gerar trinca/quebra.</p><p>Nossa prática é embutir <strong>barras</strong> (metal ou <strong>fibra de vidro</strong>) no verso da peça, coladas com <strong>epóxi</strong>, criando uma <strong>‘viga’ invisível</strong> que distribui esforços.</p><p>É um detalhe que quase não aparece, mas faz enorme diferença no longo prazo.</p>",
  },
  {
    id: 25,
    category: "engenharia",
    keys: "cuba esculpida cheiro mal escoamento inclinação queda laser fundo removível ralo limpeza limo",
    question: "Cuba Esculpida cheira mal?",
    answerHtml:
      "<p>Ela só dá mau cheiro quando é <strong>mal projetada</strong>.</p><p>O problema geralmente vem de fundo <strong>plano</strong> (água empoça, cria limo). A solução é projetar com <strong>inclinação</strong> (caída) para escoamento rápido.</p><p>No nosso padrão, desenhamos a cuba com queda correta e, quando o projeto pede, fazemos <strong>fundo removível</strong> para acesso total ao ralo e limpeza pesada.</p>",
  },
  {
    id: 26,
    category: "engenharia",
    keys: "rebaixo italiano cnc desbaste desnível área molhada sem moldura sem cola fácil limpar",
    question: "O que é o \"Rebaixo Italiano\"?",
    answerHtml:
      "<p>É um acabamento premium em que, em vez de colar uma moldura para conter água, a gente <strong>desbasta a própria pedra</strong> (geralmente com CNC), criando um <strong>rebaixo contínuo</strong>.</p><p>Resultado: menos colas, menos cantos vivos, mais facilidade de limpeza e um visual muito mais moderno.</p>",
  },
  {
    id: 27,
    category: "engenharia",
    keys: "furo torneira obra fábrica furadeira microfissura estoura aperto metal gabarito refrigerado água diâmetro polido",
    question: "Furos de torneira: Na obra ou na fábrica?",
    answerHtml:
      "<p><strong>Preferencialmente na fábrica.</strong> Furadeira manual na obra pode gerar <strong>microfissuras</strong> que aparecem depois (ou estouram quando o metal é apertado).</p><p>Na fábrica usamos equipamento com <strong>refrigeração a água</strong> e <strong>gabarito</strong> para garantir diâmetro correto e borda íntegra/polida.</p>",
  },
  {
    id: 28,
    category: "engenharia",
    keys: "cuba inox cai silicone peso 30kg travamento mecânico suporte grampo epóxi sanduíche segurança",
    question: "Instalação da Cuba de Inox: Por que elas caem?",
    answerHtml:
      "<p>Porque colar só com <strong>silicone</strong> é insuficiente. Uma cuba cheia pode passar de <strong>30kg</strong> e exige redundância de segurança.</p><p>No nosso padrão fazemos um ‘sanduíche’:</p><ul><li><strong>Colagem química</strong> (epóxi/adesivo adequado)</li><li><strong>Travamento mecânico</strong> (suportes/grampos por baixo)</li></ul><p>Assim, a cuba fica apoiada e travada de forma confiável.</p>",
  },
  {
    id: 29,
    category: "engenharia",
    keys: "pingadeira sulco parte de baixo borda água escorre armário mdf estufa apodrece proteção marcenaria",
    question: "O que é \"Pingadeira\"? (O detalhe que salva seu armário)",
    answerHtml:
      "<p>É um <strong>sulco</strong> na parte de baixo da borda frontal da bancada.</p><p>Quando a água escorre pela borda, ela encontra esse sulco e <strong>goteja</strong> no chão, em vez de voltar para o frontão/armário — protegendo marcenaria (especialmente MDF) de <strong>estufamento</strong> e deterioração.</p><p>É um cuidado invisível que protege seu investimento.</p>",
  },
  {
    id: 30,
    category: "engenharia",
    keys: "nivelamento laser nível bolha empoça água desnível 2mm ralo gravidade instalação",
    question: "Nivelamento a Laser vs. Nível de Bolha.",
    answerHtml:
      "<p>Água não perdoa. Um desnível pequeno (às vezes <strong>2mm</strong>) já faz a água <strong>empoçar</strong> e não ir ao ralo corretamente.</p><p>Por isso, em instalação usamos <strong>nível a laser/digital</strong> e conferência fina para garantir escoamento e alinhamento com marcenaria.</p>",
  },
  {
    id: 31,
    category: "engenharia",
    keys: "bookmatch veios simétricos chapas sequenciais abrir livro borboleta paginação corte planejamento",
    question: "O que é o efeito \"Bookmatch\"?",
    answerHtml:
      "<p><strong>Bookmatch</strong> é um efeito artístico de alto impacto: duas chapas sequenciais são abertas como um livro, formando veios <strong>espelhados</strong> e simétricos (efeito ‘asas de borboleta’).</p><p>Transforma parede/ilha em peça de galeria — e exige planejamento milimétrico de seleção, corte e paginação.</p>",
  },
  {
    id: 32,
    category: "engenharia",
    keys: "espessura pedra 2cm saia 4cm 6cm 10cm ilha gourmet estética bloco maciço peso armário",
    question: "Qual a espessura da pedra? (Saia de 2cm, 4cm ou 10cm?)",
    answerHtml:
      "<p>A chapa mais comum sai do bloco com <strong>~2cm</strong>. Com saia (especialmente em meia‑esquadria 45º), conseguimos <strong>simular espessuras maiores</strong> sem virar um bloco pesado demais.</p><ul><li><strong>4–6cm:</strong> padrão de luxo robusto.</li><li><strong>10cm+:</strong> visual imponente, ótimo para ilhas.</li></ul><p>Você ganha estética de bloco maciço, com engenharia e peso mais controlados.</p>",
  },
  {
    id: 33,
    category: "engenharia",
    keys: "instalação drywall possível reforço madeira metal mão francesa carga peso gesso parede cede",
    question: "Instalação em Drywall: É possível?",
    answerHtml:
      "<p>Sim, mas precisa de <strong>planejamento</strong>. O gesso não foi feito para segurar carga de pedra.</p><p>O correto é prever <strong>reforços internos</strong> (madeira/metal) nos pontos de fixação e dimensionar mãos‑francesas/estrutura conforme peso e vão. Sem isso, a parede pode ceder.</p>",
  },
  {
    id: 34,
    category: "engenharia",
    keys: "rodapé embutido sobreposto faceado reboco cortar pó moderno rápido execução",
    question: "Vocês fazem rodapé embutido ou sobreposto?",
    answerHtml:
      "<p>Fazemos os dois — a escolha depende do efeito estético e do estado da obra.</p><ul><li><strong>Embutido (faceado):</strong> fica rente à parede, visual mais limpo e não acumula pó em cima, mas exige recorte/correção do reboco.</li><li><strong>Sobreposto:</strong> colado sobre a parede, execução mais rápida.</li></ul><p>O importante é acabamento e alinhamento bem executados.</p>",
  },
  {
    id: 35,
    category: "engenharia",
    keys: "frontão alto frontispício revestir parede inteira entre pia armário superior pedra sem rejunte unidade visual alto padrão",
    question: "O que é Frontão Alto (Frontispício)?",
    answerHtml:
      "<p>É revestir a parede inteira entre bancada e armário superior com a <strong>mesma pedra</strong> da bancada.</p><p>Você elimina azulejo e rejunte, cria unidade visual e um resultado de alto padrão — além de facilitar limpeza.</p>",
  },
  {
    id: 36,
    category: "engenharia",
    keys: "nicho banheiro vaza infiltração caixa estanque fábrica epóxi impermeabilizado piscina dentro parede",
    question: "Nicho de Banheiro vaza?",
    answerHtml:
      "<p>Nichos prontos mal instalados podem dar infiltração nas emendas.</p><p>No nosso padrão, o nicho é montado como uma <strong>caixa estanque</strong>, com colagem em <strong>epóxi</strong> e impermeabilização adequada — funcionando como uma ‘piscina’ dentro da parede, feita para não vazar.</p>",
  },
  {
    id: 37,
    category: "engenharia",
    keys: "bancada flutuante segura sem armário estrutura metálica mão francesa chumbamento químico carga peso cálculo",
    question: "Bancada \"Flutuante\" (sem armário embaixo) é segura?",
    answerHtml:
      "<p>Sim — <strong>se for calculada e ancorada corretamente</strong>.</p><p>Usamos soluções como <strong>chumbamento químico</strong> e/ou <strong>estruturas metálicas ocultas</strong> (mão francesa industrial), dimensionadas para o peso da pedra + cargas de uso (pessoas apoiando, objetos, etc.).</p>",
  },
  {
    id: 38,
    category: "engenharia",
    keys: "soleira pedra valoriza piso transição elegante barreira água lavagem",
    question: "Soleiras de pedra valorizam o piso?",
    answerHtml:
      "<p>Sim. Elas criam uma transição elegante entre pisos diferentes e ajudam a resolver acabamento de encontro.</p><p>Além disso, podem funcionar como <strong>barreira</strong> para água em áreas onde há lavagem do piso.</p>",
  },
  {
    id: 39,
    category: "engenharia",
    keys: "guarnição borda contenção moldura colada cuba área molhada conter água rebaixo italiano clássico",
    question: "O que é \"Guarnição\" ou Borda de Contenção?",
    answerHtml:
      "<p>É uma <strong>moldura</strong> (borda) colada ao redor da cuba ou área molhada para <strong>conter água</strong>.</p><p>Embora o <strong>rebaixo italiano</strong> seja mais moderno e contínuo, a guarnição é uma solução clássica e eficiente quando bem executada.</p>",
  },
  {
    id: 40,
    category: "engenharia",
    keys: "mão de obra cara artesão acabamento corte 45 polimento emenda invisível máquina cara anos treino",
    question: "Por que a mão de obra é cara?",
    answerHtml:
      "<p>Porque acabamento premium não é ‘tempo’ — é <strong>especialização</strong> e <strong>precisão</strong>.</p><p>Um corte 45º perfeito, polimento bem fechado e emenda invisível exigem <strong>anos de treino</strong> e <strong>máquinas caras</strong>. Você não paga pelo minuto; paga pelos anos de técnica para fazer certo, com segurança e consistência.</p>",
  },

  {
    id: 41,
    category: "orcamento",
    keys: "orçamento barato metade do preço caro qualidade corte de custo lote c trinca mancha variação tom exportação 45 meia esquadria massa plástica epóxi impermeabilização",
    question: "\"O orçamento do vizinho deu metade do preço. Vocês estão caros?\"",
    answerHtml:
      "<p>Não existe milagre na indústria de pedras — existe <strong>corte de custos invisíveis</strong>. Se o preço é metade, normalmente alguma parte do pacote caiu muito de qualidade.</p><p>O orçamento ‘barato’ costuma esconder:</p><ol><li><strong>Pedra de lote inferior:</strong> chapas com trincas naturais, manchas ou variação de tom.</li><li><strong>Acabamento colado:</strong> sem meia‑esquadria 45º, com linhas de cola visíveis.</li><li><strong>Economia na química:</strong> massa plástica no lugar de adesivos estruturais (epóxi/poliéster).</li><li><strong>Sem impermeabilização:</strong> entrega crua, mancha na primeira semana.</li></ol><p>A decisão real é: economizar agora e arriscar reformar depois, ou pagar o justo por uma bancada definitiva.</p>",
  },
  {
    id: 42,
    category: "orcamento",
    keys: "preço calculado m2 metro linear orçamento técnico material chapa m² aproveitamento mão de obra complexidade recorte furo 45 bancada em l transparência",
    question: "Como é calculado o preço? M² ou Metro Linear?",
    answerHtml:
      "<p>O cálculo correto é uma soma de fatores:</p><ul><li><strong>Material:</strong> a chapa bruta é vendida por <strong>m²</strong> (aproveitamento do corte).</li><li><strong>Mão de obra:</strong> varia pela <strong>complexidade</strong>. Uma bancada reta é muito diferente de uma em ‘L’ com recortes, furos e acabamentos 45º.</li></ul><p>O ideal é orçamento transparente: você paga pelo material consumido e pela engenharia aplicada — sem taxas ocultas.</p>",
  },
  {
    id: 43,
    category: "orcamento",
    keys: "perda técnica quebra desperdício aproveitamento chapa 3x1,80 3,10 segunda chapa nestling otimização software corte",
    question: "O que é a \"Perda Técnica\" (Quebra) no orçamento?",
    answerHtml:
      "<p>Pense como um tecido para fazer um terno: sempre sobram recortes que não servem para outra peça. Com pedra é igual.</p><p>As chapas têm tamanho fixo (ex.: ~3,00 x 1,80m). Se o seu projeto exige uma medida que passa desse limite (ex.: 3,10m), pode ser necessário usar uma segunda chapa.</p><p>Para reduzir desperdício, usamos otimização de corte (nesting) para encaixar peças e aproveitar melhor a chapa, poupando material — e dinheiro.</p>",
  },
  {
    id: 44,
    category: "orcamento",
    keys: "investimento roi retorno imóvel valoriza mercado imobiliário quartzito taj mahal granito exótico patrimônio revenda",
    question: "Pedra Natural é um investimento financeiro (ROI)?",
    answerHtml:
      "<p>Em muitos imóveis, <strong>sim</strong>. Pedras nobres elevam o valor percebido do ambiente e influenciam a impressão de qualidade na venda/locação.</p><p>Quando um comprador vê uma ilha em quartzito premium ou um granito exótico, ele reconhece investimento. Já materiais frágeis/lasqueados depreciam.</p><p>É um ativo durável: estética + resistência + menor necessidade de refazer.</p>",
  },
  {
    id: 45,
    category: "orcamento",
    keys: "quando medir marmoraria erro fatal móveis instalados alvenaria pronta reboco tolerância zero não estica refabricação custo",
    question: "Quando devo chamar a marmoraria para medir? (O erro fatal)",
    answerHtml:
      "<p><strong>Regra de ouro:</strong> medir somente com <strong>móveis instalados</strong> ou alvenaria <strong>100% pronta</strong> (reboco final, paredes definidas).</p><p>A pedra tem <strong>tolerância zero</strong>: não estica, não ‘amassa’. Se a obra mudar 1cm depois da medição, a peça pode não encaixar e precisar ser refeita (custo e atraso).</p><p>Sem pressa nessa etapa: é a forma mais simples de evitar prejuízo.</p>",
  },
  {
    id: 46,
    category: "orcamento",
    keys: "pressa mudança semana que vem prazo cura cola 24h impermeabilizante secar polimento etapas 15 20 dias úteis",
    question: "\"Tenho pressa! Minha mudança é semana que vem.\"",
    answerHtml:
      "<p>Entendemos a urgência — mas <strong>a química não tem pressa</strong>.</p><p>Adesivos precisam de tempo de cura, impermeabilizantes precisam secar, e o polimento tem etapas. Pular fases para entregar ‘correndo’ é receita para descolamento, perda de brilho e retrabalho.</p><p>O prazo típico para uma entrega com qualidade costuma ficar na faixa de <strong>15 a 20 dias úteis</strong> (variando por projeto e material). A espera vale por uma peça feita para durar décadas.</p>",
  },
  {
    id: 47,
    category: "orcamento",
    keys: "sujeira instalação casa habitada corte no local pó aspirador industrial proteção piso indústria 95%",
    question: "A instalação faz muita sujeira na casa habitada?",
    answerHtml:
      "<p>Boa parte do trabalho pesado (corte e polimento grosso) deve acontecer na oficina/indústria.</p><p>No local, o ideal é fazer apenas ajustes finos e colagens, com <strong>proteção de piso</strong> e <strong>aspiração</strong>.</p><p>Vai existir algum pó residual (é obra), mas muito menor do que serrar pedra dentro de casa.</p>",
  },
  {
    id: 48,
    category: "orcamento",
    keys: "retirar bancada antiga remoção troca dano azulejo frontão armário retoque pedreiro pintura",
    question: "Vocês retiram a bancada antiga?",
    answerHtml:
      "<p>Podemos orçar a remoção, mas é importante alinhar expectativa: retirar pedra antiga frequentemente causa danos no entorno (azulejo acima, pintura, armário velho), porque tudo está colado e travado.</p><p>A remoção é feita com cuidado, porém pode exigir pequenos retoques de acabamento depois.</p>",
  },
  {
    id: 49,
    category: "orcamento",
    keys: "subir pedra apartamento elevador escada içamento guincho janela corte técnico emenda logística visita técnica",
    question: "Como a pedra sobe para o meu apartamento?",
    answerHtml:
      "<p>Se a peça não cabe no elevador ou a escada não permite a curva, há duas soluções comuns:</p><ol><li><strong>Içamento:</strong> guincho pela janela (custo extra e logística do condomínio).</li><li><strong>Corte técnico:</strong> dividir a peça em partes que caibam e executar emenda discreta no local.</li></ol><p>Isso deve ser analisado na visita técnica para evitar ‘surpresas’ na portaria.</p>",
  },
  {
    id: 50,
    category: "orcamento",
    keys: "hidráulica elétrica responsabilidade cuba fixação sifão torneira cooktop encanador eletricista limite trabalho",
    question: "Instalação Hidráulica e Elétrica: Onde termina nosso trabalho?",
    answerHtml:
      "<p>A marmoraria fixa a pedra e instala/fixa a cuba na pedra (conforme projeto). Já conexões de <strong>hidráulica</strong> (sifão/torneira) e <strong>elétrica/gás</strong> (cooktop) devem ser feitas por encanador/eletricista qualificados.</p><p>Isso protege você e o projeto: cada profissional responde pela sua área técnica.</p>",
  },
  {
    id: 51,
    category: "orcamento",
    keys: "segurança bancada cair chumbamento químico mão francesa reforçada corte alvenaria peso morto carga acidental",
    question: "Segurança: A bancada pode cair?",
    answerHtml:
      "<p>Uma bancada só ‘cai’ quando falta engenharia de fixação.</p><p>Com padrão correto (chumbamento químico, mãos‑francesas/estruturas dimensionadas e apoio adequado), a bancada trabalha com segurança para o peso próprio e cargas de uso.</p>",
  },
  {
    id: 52,
    category: "orcamento",
    keys: "visita técnica cobram primeira visita gratuita abatida medição final inclusa contrato",
    question: "Vocês cobram Visita Técnica?",
    answerHtml:
      "<p>Geralmente a primeira visita para entendimento e orçamento é gratuita ou abatida no fechamento.</p><p>A medição técnica final (precisa) costuma estar inclusa quando o contrato é fechado.</p>",
  },
  {
    id: 53,
    category: "orcamento",
    keys: "dólar afeta orçamento insumos disco diamante resina epóxi chapas importadas validade 10 15 dias",
    question: "O preço do dólar afeta meu orçamento?",
    answerHtml:
      "<p>Sim. Muitos insumos (discos de diamante, resinas, químicos) e alguns materiais nobres são cotados direta ou indiretamente em <strong>dólar</strong>.</p><p>Por isso, orçamentos têm <strong>validade</strong> (ex.: 10–15 dias). Fechar dentro do prazo ajuda a garantir condições antes de reajustes.</p>",
  },
  {
    id: 54,
    category: "orcamento",
    keys: "comprar pedra bruta pedreiro cortar risco estragar chapa máquina precisão polimento água química economia falsa",
    question: "Posso comprar a pedra bruta e mandar meu pedreiro cortar?",
    answerHtml:
      "<p>É um dos erros mais caros.</p><p>Pedreiro normalmente não tem máquinas de corte de precisão, polimento com refrigeração a água e domínio da química/colagem das pedras. O risco de estragar uma chapa cara para economizar pouca mão de obra é grande.</p><p>Pedra é como alfaiataria: material bom sem execução boa vira prejuízo.</p>",
  },
  {
    id: 55,
    category: "orcamento",
    keys: "nota fiscal termo garantia empresa legalizada reputação por fora sem nota compromisso documento",
    question: "Vocês emitem Nota Fiscal e Termo de Garantia?",
    answerHtml:
      "<p><strong>Sempre.</strong> Nota fiscal e termo de garantia dão segurança e rastreabilidade.</p><p>Quem trabalha ‘por fora’ dificilmente tem compromisso formal com o futuro da sua obra. Garantia boa é documento — não promessa.</p>",
  },
  {
    id: 56,
    category: "orcamento",
    keys: "desconto à vista vale a pena pagamento antecipado economia insumos",
    question: "Desconto à vista vale a pena?",
    answerHtml:
      "<p>Geralmente, sim. Pagamento à vista pode permitir desconto porque reduz custo financeiro e facilita compra de insumos.</p><p>É uma forma de economizar <strong>sem cortar qualidade</strong>.</p>",
  },
  {
    id: 57,
    category: "orcamento",
    keys: "custo de oportunidade reformar de novo mancha trinca fazer certo primeira vez 20% a mais economia",
    question: "O que é \"Custo de Oportunidade\" na marmoraria?",
    answerHtml:
      "<p>É o custo de ter que refazer depois: trocar a bancada porque manchou, descolou, lascou ou trincou.</p><p>Fazer certo na primeira vez, mesmo custando um pouco mais, costuma ser a maior economia no horizonte de anos.</p>",
  },
  {
    id: 58,
    category: "orcamento",
    keys: "atendem fora cidade raio atuação logística frete deslocamento casa campo praia",
    question: "Vocês atendem fora da cidade?",
    answerHtml:
      "<p>Sim, dependendo do raio de atuação e logística.</p><p>Quando há deslocamento, é cobrado frete/visita conforme distância e condições de acesso — sempre alinhado no orçamento para não haver surpresa.</p>",
  },
  {
    id: 59,
    category: "orcamento",
    keys: "parcelar cartão condições facilitadas investimento alto fluxo de caixa",
    question: "Posso parcelar?",
    answerHtml:
      "<p>Sim. Entendemos que pedra é um investimento alto e, em muitos casos, o parcelamento viabiliza o projeto sem apertar o fluxo de caixa da obra.</p><p>As condições (parcelas/juros) dependem do meio de pagamento.</p>",
  },
  {
    id: 60,
    category: "orcamento",
    keys: "arquiteto respeitam projeto dwg detalhamento parceria braço direito executar fidelidade risco técnico",
    question: "Tenho um arquiteto. Vocês respeitam o projeto dele?",
    answerHtml:
      "<p>Sim. A marmoraria deve ser o <strong>braço técnico</strong> do arquiteto: ler projeto, detalhamento, referências e executar com fidelidade.</p><p>Quando identificamos risco técnico (por exemplo, recortes frágeis, emendas mal posicionadas), o correto é <strong>alertar antes de cortar</strong> e propor solução — sempre em parceria.</p>",
  },

  {
    id: 61,
    category: "manutencao",
    keys: "manutenção pedra eterna impermeabilização hidrofugada hidrofugação reaplicar 1 ano 2 anos granito mármore quartzito quartzo resina",
    question: "A pedra precisa de manutenção? (A verdade sobre o \"Eterno\")",
    answerHtml:
      "<p>A pedra pode durar décadas, mas a <strong>proteção</strong> dela precisa de manutenção periódica.</p><ul><li><strong>Pedras naturais</strong> (granito, mármore, quartzito): possuem <strong>microporos</strong>. Mesmo impermeabilizadas, a proteção se desgasta com o tempo e com produtos de limpeza. Recomenda-se <strong>reaplicar impermeabilizante</strong> a cada <strong>1–2 anos</strong> para manter o efeito <strong>hidrofugante</strong> (repelência).</li><li><strong>Industrializados</strong> (quartzo): em geral não exigem impermeabilização, mas pedem cuidado com produtos que <strong>ataquem a resina</strong>.</li></ul>",
  },
  {
    id: 62,
    category: "manutencao",
    keys: "limpar pedra água detergente neutro produtos caros água sanitária cândida vinagre limão saponáceo solvente thinner brilho",
    question: "Pare de gastar com produtos caros: Como limpar corretamente?",
    answerHtml:
      "<p>O maior erro é achar que pedra precisa de química agressiva. Na rotina, o melhor é:</p><p><strong>Água + detergente neutro</strong> (amarelo/transparente) + pano macio.</p><p><strong>Evite</strong> no uso diário:</p><ul><li>Água sanitária/cândida (pode queimar/alterar brilho, especialmente em pedras escuras)</li><li>Vinagre/limão (ataque ácido em mármores e algumas rochas carbonáticas)</li><li>Saponáceos em pó (abrasivos, criam micro-riscos)</li><li>Solventes/thinner (podem atacar impermeabilização/resinas)</li></ul><p>O básico, feito com constância, mantém a pedra bonita por décadas.</p>",
  },
  {
    id: 63,
    category: "manutencao",
    keys: "risquei bancada conserto polimento restaurar brilho pedra natural porcelanato vidro lasca permanente",
    question: "Risquei minha bancada. Tem conserto ou perdi a pedra?",
    answerHtml:
      "<p>Depende do material — e aqui a pedra natural leva vantagem.</p><ul><li><strong>Pedra natural:</strong> na maioria dos casos, <strong>tem conserto</strong>. É possível repolir e restaurar brilho (inclusive removendo ataque ácido superficial em mármore) com ferramentas e abrasivos adequados.</li><li><strong>Porcelanato/cerâmica/vidro:</strong> riscos e lascas tendem a ser <strong>permanentes</strong>, porque o esmalte não se recompõe com polimento.</li></ul><p>Se você riscou, a melhor ação é avaliar a profundidade e chamar um profissional para recuperação.</p>",
  },
  {
    id: 64,
    category: "manutencao",
    keys: "pedra branca amarela natural ferro oxidação umidade quartzo resina uv lâmpada estabilidade cor",
    question: "Pedra Branca amarela com o tempo?",
    answerHtml:
      "<p>Depende se é natural ou industrializada e da qualidade do material.</p><ul><li><strong>Naturais:</strong> alguns mármores brancos podem conter <strong>ferro</strong>; com umidade ao longo de muitos anos, pode ocorrer leve <strong>oxidação</strong> (tom mais creme). É um envelhecimento natural.</li><li><strong>Quartzo (industrializado):</strong> em marcas de baixa qualidade, a <strong>resina</strong> pode amarelar com <strong>UV</strong> (sol e até iluminação). Materiais premium têm tecnologia de estabilidade de cor superior.</li></ul>",
  },
  {
    id: 65,
    category: "manutencao",
    keys: "higiênico preparar massa pizza pão direto na pedra bacteriostática madeira poros mofo plástico riscos",
    question: "É higiênico preparar massa (pizza/pão) direto na pedra?",
    answerHtml:
      "<p>Sim — desde que a superfície esteja <strong>polida</strong> e <strong>impermeabilizada</strong> corretamente, ela é altamente higiênica para preparo.</p><p>É, em geral, mais segura do que:</p><ul><li><strong>Madeira</strong> (poros orgânicos, umidade e mofo)</li><li><strong>Plástico</strong> (riscos que viram abrigo para resíduos)</li></ul><p>Limpeza simples com detergente neutro e pano macio mantém a bancada pronta para uso.</p>",
  },
  {
    id: 66,
    category: "manutencao",
    keys: "cuba descolar cair garantia epóxi travamento mecânico suporte silicone instalação",
    question: "O que fazer se a Cuba descolar (cair)?",
    answerHtml:
      "<p>Se a instalação foi feita por nós, o caminho é simples: <strong>entre em contato imediatamente</strong>.</p><p>Em instalações corretas, a cuba é fixada com redundância de segurança (travamento mecânico + colagem adequada). Cubas caem quando são instaladas apenas com silicone ou sem suporte.</p>",
  },
  {
    id: 67,
    category: "manutencao",
    keys: "subir na bancada trocar lâmpada peso pontual alavanca trinca perto da cuba chumbador escada",
    question: "Posso subir na bancada para trocar uma lâmpada?",
    answerHtml:
      "<p><strong>Não.</strong> Mesmo com instalação segura, o peso de uma pessoa em pé é uma carga <strong>pontual</strong> (concentrada) e cria alavanca nas áreas mais frágeis (perto de recortes de cuba/cooktop).</p><p>Isso pode provocar trinca na pedra ou sobrecarregar chumbadores/estrutura. Use uma <strong>escada</strong>.</p>",
  },
  {
    id: 68,
    category: "manutencao",
    keys: "desbotar sol área externa uv granito quartzito quartzo resina churrasqueira dekton sinterizado",
    question: "A pedra desbota com o Sol? (Área Externa)",
    answerHtml:
      "<p>Depende do material.</p><ul><li><strong>Naturais</strong> (granito/quartzito): tendem a ser estáveis em sol e chuva por muitos anos.</li><li><strong>Quartzo (industrializado):</strong> pode <strong>desbotar/amarelar</strong> ao sol por causa da resina (UV).</li><li><strong>Sinterizados</strong> (ex.: Dekton/Neolith): em geral têm excelente estabilidade e podem ser opção para externo conforme especificação do fabricante.</li></ul><p>Para áreas externas, evite quartzo comum e prefira natural bem escolhido ou sinterizados adequados.</p>",
  },
  {
    id: 69,
    category: "manutencao",
    keys: "esponja de aço bombril lado verde bucha abrasivo micro riscos fosco microfibra lado amarelo",
    question: "Posso usar esponja de aço (Bombril) ou o lado verde da bucha?",
    answerHtml:
      "<p><strong>Não recomendamos.</strong> A fibra verde e a esponja de aço são abrasivas: no curto prazo pode parecer ok, mas no uso repetido criam <strong>micro-riscos</strong> e deixam a pedra mais <strong>fosca</strong> com o tempo.</p><p>Use pano de <strong>microfibra</strong> ou o lado macio (amarelo) da esponja + detergente neutro.</p>",
  },
  {
    id: 70,
    category: "manutencao",
    keys: "choque térmico panela quente pedra fria estalo trinca expansão contração descanso de panela",
    question: "Choque Térmico: O assassino silencioso das pedras.",
    answerHtml:
      "<p>Choque térmico é quando você coloca uma panela muito quente numa superfície fria (ou o inverso), gerando <strong>expansão/contração rápida</strong>.</p><p>Isso pode trincar materiais rígidos, inclusive pedras e superfícies sinterizadas. O hábito que evita 99% do problema é simples:</p><p><strong>Use sempre um descanso de panela.</strong></p>",
  },
  {
    id: 71,
    category: "manutencao",
    keys: "gordura sai da pedra impermeabilizada mancha óleo poro crua cataplasma pasta removedora",
    question: "A gordura sai da pedra?",
    answerHtml:
      "<p>Se a pedra estiver <strong>impermeabilizada</strong>, a gordura fica mais na superfície e sai com detergente neutro.</p><p>Se a pedra estiver ‘crua’ (sem proteção), o óleo pode penetrar e formar mancha escura. Nesses casos, existem <strong>cataplasmas/pastas removedoras</strong> que ajudam a puxar o óleo para fora — mas a melhor estratégia é prevenir com impermeabilização e limpeza rápida.</p>",
  },
  {
    id: 72,
    category: "manutencao",
    keys: "silicone rejunte volta pia mofa fungicida cantos secos trocar silicone 2 3 anos",
    question: "O rejunte/silicone em volta da pia mofa?",
    answerHtml:
      "<p>Mesmo com silicone de qualidade (com fungicida), mofo pode aparecer se o local fica úmido o tempo todo e há restos orgânicos.</p><p><strong>Boas práticas:</strong></p><ul><li>Seque cantos após o uso</li><li>Evite acúmulo de resíduos</li><li>Planeje troca do silicone a cada <strong>2–3 anos</strong> (manutenção barata e eficiente)</li></ul>",
  },
  {
    id: 73,
    category: "manutencao",
    keys: "emenda acumula sujeira degrau junta seca polimento nivelado transição lisa",
    question: "As emendas acumulam sujeira?",
    answerHtml:
      "<p>Em instalações ruins, sim — principalmente quando há <strong>degrau</strong>.</p><p>Quando a emenda é bem feita (junta bem alinhada, colagem adequada e <strong>polimento nivelado</strong>), a transição fica lisa e não cria “canal” para sujeira. Passou o pano, limpou.</p>",
  },
  {
    id: 74,
    category: "manutencao",
    keys: "linha na pedra trinca veio natural fissura geológica teste unha travar liso calcificada",
    question: "Achei uma \"linha\" na minha pedra. É trinca ou veio natural?",
    answerHtml:
      "<p>Pedras naturais podem ter <strong>fissuras geológicas</strong> que são parte da rocha.</p><p><strong>Teste simples:</strong> passe a unha.</p><ul><li>Se a unha <strong>travar</strong>, pode ser trinca aberta (merece avaliação).</li><li>Se a unha passa <strong>liso</strong>, normalmente é veio/fissura mineralizada, sem abertura — não compromete a estrutura e é a ‘impressão digital’ da rocha.</li></ul>",
  },
  {
    id: 75,
    category: "manutencao",
    keys: "estucagem furinhos travertino exótico resina preenchimento beneficiamento polimento não é defeito",
    question: "O que é \"Estucagem\" e por que minha pedra tem isso?",
    answerHtml:
      "<p>Algumas pedras (como Travertino e certos exóticos) possuem <strong>poros/furinhos naturais</strong>.</p><p>A <strong>estucagem</strong> é o preenchimento desses pontos com resina específica, seguido de polimento, para deixar a superfície lisa e funcional.</p><p>Não é defeito — é <strong>beneficiamento</strong> normal do material.</p>",
  },
  {
    id: 76,
    category: "manutencao",
    keys: "polir em casa cera supermercado brilho falso oleoso escorregadio lixa diamante água repolir profissional",
    question: "Posso polir a pedra em casa com cera de supermercado?",
    answerHtml:
      "<p><strong>Não recomendamos.</strong> Ceras comuns dão brilho temporário e oleoso, podem deixar a superfície escorregadia e não substituem o polimento real.</p><p>O brilho verdadeiro da pedra vem do <strong>polimento mecânico</strong> com abrasivos de diamante e água. Se sua bancada perdeu brilho, o caminho correto é <strong>repolimento profissional</strong>.</p>",
  },
  {
    id: 77,
    category: "manutencao",
    keys: "lasquei borda panela reparo resina pó da pedra lixar polir invisível porcelanato troca",
    question: "Lasquei a borda da pedra batendo uma panela. E agora?",
    answerHtml:
      "<p>Calma: na maioria dos casos, <strong>tem reparo</strong>.</p><p>O conserto profissional costuma envolver:</p><ul><li>Preparar resina na cor certa (às vezes com pó da própria pedra)</li><li>Preencher o lascado</li><li>Lixar e polir para integrar o acabamento</li></ul><p>Muitas vezes, o reparo fica bem discreto. Em porcelanato/vidro, normalmente a solução é mais difícil (ou troca).</p>",
  },
  {
    id: 78,
    category: "manutencao",
    keys: "vinagre limão inimigos ácido acético cítrico mármore carbonato cálcio corrói granito quartzito",
    question: "O Vinagre e o Limão são inimigos?",
    answerHtml:
      "<p><strong>Para mármore e rochas carbonáticas, sim — são mortais.</strong></p><p>Ácidos (acético do vinagre e cítrico do limão) reagem com o <strong>carbonato de cálcio</strong> e podem causar ataque químico: a pedra fica fosca na hora.</p><p>Em granitos/quartzitos, o efeito costuma ser menor, mas o ideal é não abusar e sempre limpar rápido. Se você ama vinagre/limão na rotina e quer mármore, use <strong>bandejas/tábuas</strong> na área de preparo.</p>",
  },
  {
    id: 79,
    category: "manutencao",
    keys: "vida útil bancada granito 50 60 anos polimento legado durabilidade",
    question: "Qual a vida útil real de uma bancada de granito?",
    answerHtml:
      "<p>Frequentemente, <strong>mais do que a vida útil de muitos acabamentos da casa</strong>.</p><p>É comum ver granitos com <strong>50–60 anos</strong> que, após um polimento bem feito, voltam a ficar lindos.</p><p>Comparado a MDF, laminados e materiais que degradam rápido, a pedra é um investimento de longo prazo — praticamente um legado.</p>",
  },
  {
    id: 80,
    category: "manutencao",
    keys: "tomada na saia bancada nicho elétrica caixinha planejar antes medição",
    question: "Posso colocar tomadas na saia da bancada?",
    answerHtml:
      "<p>Sim — e pode ficar muito prático.</p><p>É possível prever recortes para caixinha elétrica na <strong>saia</strong> (frente) da pedra, evitando quebrar revestimento na parede e deixando tomada à mão.</p><p><strong>Importante:</strong> planeje isso <strong>antes da medição</strong>, com o eletricista, para posição e padrão de caixa/espelho ficarem corretos.</p>",
  },

  {
    id: 81,
    category: "materiais",
    keys: "medo mármore cozinha alternativa quartzito sinterizado dekton neolith estética paz espírito",
    question: "\"Tenho medo de mármore na cozinha.\" (O medo clássico)",
    answerHtml:
      "<p>Seu medo é <strong>justificado</strong>. Se você cozinha muito e é perfeccionista com manchas e brilho, o mármore pode virar estresse.</p><p><strong>A solução</strong> não é abrir mão da estética — é trocar o material mantendo o visual:</p><ul><li><strong>Quartzito</strong>: visual de mármore com desempenho muito superior (dureza e resistência).</li><li><strong>Sinterizado</strong> (ex.: Dekton/Neolith): alta resistência a calor, risco e química.</li></ul><p>Você fica com a beleza que quer e a paz de espírito que precisa.</p>",
  },
  {
    id: 82,
    category: "orcamento",
    keys: "concorrente mais barato comparar obra 2 anos meia esquadria 45 epóxi massa plástica longevidade",
    question: "\"Achei o concorrente mais barato.\" (O confronto final)",
    answerHtml:
      "<p>Preço sozinho não diz nada se o produto e o processo são diferentes.</p><p>Antes de decidir, faça 3 perguntas objetivas:</p><ol><li>Ele mostra <strong>obra de 2 anos atrás</strong> (emenda/cola/cuba)?</li><li>Ele faz <strong>meia‑esquadria 45º</strong> ou acabamento colado?</li><li>Ele usa <strong>epóxi/adesivo estrutural</strong> ou <strong>massa plástica</strong>?</li></ol><p>A diferença de preço costuma estar na <strong>engenharia invisível</strong> e na longevidade. Não compare preços de entregas diferentes como se fossem iguais.</p>",
  },
  {
    id: 83,
    category: "engenharia",
    keys: "pedreiro instala pedra risco garantia nivel laser cola epóxi emenda recorte",
    question: "\"Meu pedreiro disse que ele instala a pedra.\"",
    answerHtml:
      "<p>Pedreiro é essencial na obra — mas instalação e acabamento de rocha são uma especialidade diferente.</p><p>Sem nível a laser, química correta, ferramentas adequadas e técnica de emenda/acabamento, o risco é alto: <strong>perder a peça</strong> e ficar <strong>sem garantia</strong>.</p><p>Instalar pedra cara com mão de obra errada é como pedir para um mecânico fazer uma cirurgia: o prejuízo pode ser grande.</p>",
  },
  {
    id: 84,
    category: "materiais",
    keys: "porcelanato bancada moda quina lasca barro interno sem conserto pedra natural maciça reparável",
    question: "\"Prefiro Porcelanato na bancada.\" (A moda passageira)",
    answerHtml:
      "<p>Porcelanato pode ficar lindo na foto — mas na rotina o ponto fraco são as <strong>quinas</strong>: lascam e expõem o corpo interno, e o conserto raramente fica invisível.</p><p><strong>Pedra natural</strong> é maciça, nobre e geralmente <strong>reparável</strong> (polimento/reparo de lascas). Porcelanato é uma ‘casca’; a pedra é a essência.</p>",
  },
  {
    id: 85,
    category: "prazo",
    keys: "demora entregar ansiedade prazo 15 20 dias úteis processo cura cola impermeabilização polimento",
    question: "\"Demora muito para entregar.\" (A ansiedade)",
    answerHtml:
      "<p>A perfeição não é fast‑food.</p><p>Uma cozinha dura décadas. Esperar <strong>15–20 dias úteis</strong> (média, variando por projeto) para ter algo impecável é pequeno perto de conviver com defeitos todos os dias.</p><p>Pressa costuma gerar cola sem cura, polimento incompleto e retrabalho. Confiar no processo é ganhar tranquilidade no longo prazo.</p>",
  },
  {
    id: 86,
    category: "garantia",
    keys: "não gostar pedra quando chegar aprovar chapa pátio vídeo alta resolução veios surpresa",
    question: "\"E se eu não gostar da pedra quando chegar?\"",
    answerHtml:
      "<p>Para evitar surpresa, o correto é você <strong>aprovar a chapa real</strong> antes de cortar.</p><p>Isso pode ser feito no pátio/showroom ou por <strong>vídeo/fotos em alta resolução</strong>, mostrando veios e tonalidade. Assim, você escolhe a sua chapa — não um ‘catálogo genérico’.</p>",
  },
  {
    id: 87,
    category: "engenharia",
    keys: "sujeira instalação proteção piso aspirador industrial ajuste milimétrico colagem",
    question: "\"Faz sujeira na instalação?\"",
    answerHtml:
      "<p>Obra faz sujeira — quem promete zero poeira está vendendo ilusão.</p><p>O que muda é o <strong>controle</strong>: levar a pedra pronta, proteger o ambiente, usar aspiração e fazer apenas ajustes finos no local. O incômodo dura horas; o resultado dura décadas.</p>",
  },
  {
    id: 88,
    category: "garantia",
    keys: "garantia contratual defeito fabricação instalação descolamento vazamento empresa cnpj endereço",
    question: "\"Vocês dão Garantia?\"",
    answerHtml:
      "<p>Sim — <strong>garantia contratual</strong>.</p><p>Cobre defeitos de fabricação do material (quando aplicável) e falhas de instalação (ex.: descolamento, vazamentos em peças montadas, problemas de fixação), conforme termos do contrato.</p><p>Empresa estabelecida com CNPJ e endereço físico existe para responder no futuro.</p>",
  },
  {
    id: 89,
    category: "garantia",
    keys: "nota fiscal 100% segurança jurídica tributária empresa legalmente existe",
    question: "\"Vocês emitem Nota Fiscal?\"",
    answerHtml:
      "<p><strong>Sim, 100%.</strong></p><p>Nota fiscal é sua segurança jurídica e comprova origem/serviço. Trabalhar sem nota (‘por fora’) te deixa sem respaldo se der problema.</p>",
  },
  {
    id: 90,
    category: "garantia",
    keys: "confiar prova social portfólio google instagram visitar fábrica estrutura reputação",
    question: "Posso confiar em vocês? (A prova social)",
    answerHtml:
      "<p>Não confie só em promessa.</p><ul><li>Veja <strong>portfólio</strong> e obras entregues</li><li>Leia <strong>depoimentos</strong> (Google/Instagram)</li><li>Se possível, visite a estrutura/fábrica/showroom</li></ul><p>Transparência e consistência de entrega são a melhor prova.</p>",
  },
  {
    id: 91,
    category: "garantia",
    keys: "fornecedores jazidas importadoras lote a exportação chapa classificação segurança",
    question: "Quem são seus fornecedores?",
    answerHtml:
      "<p>Trabalhamos com jazidas e importadoras consolidadas, priorizando chapas classificadas como <strong>Exportação / Lote A</strong>.</p><p>Isso reduz risco de variação excessiva, trincas críticas e problemas de beneficiamento — aumentando previsibilidade e segurança para o seu projeto.</p>",
  },
  {
    id: 92,
    category: "engenharia",
    keys: "responsável técnico validação técnica balanço fachada grandes vãos segurança engenharia",
    question: "Vocês têm Responsável Técnico?",
    answerHtml:
      "<p>Sim. Projetos mais críticos (balanços, grandes vãos, fachadas, peças muito longas/pesadas) devem passar por <strong>validação técnica</strong> para garantir segurança estrutural.</p><p>A ideia é simples: nós vendemos <strong>engenharia</strong>, não sorte.</p>",
  },
  {
    id: 93,
    category: "engenharia",
    keys: "como é feito o corte serra ponte bridge saw precisão digital esquadro perfeito ondas corte manual",
    question: "Como é feito o corte? (Tecnologia)",
    answerHtml:
      "<p>O padrão de alta precisão usa <strong>serra ponte (bridge saw)</strong> e equipamentos com controle digital, com refrigeração adequada.</p><p>Isso garante corte no <strong>esquadro</strong>, sem ‘ondas’ de corte manual, melhorando encaixe em parede e marcenaria e reduzindo ajustes agressivos na obra.</p>",
  },
  {
    id: 94,
    category: "garantia",
    keys: "arte funerária política foco interiores arquitetura design",
    question: "Vocês fazem arte funerária?",
    answerHtml:
      "<p>Nosso foco é <strong>100% arquitetura de interiores e design</strong> (bancadas, lavatórios, painéis, escadas e revestimentos).</p><p>Isso garante que o time e o processo estejam voltados para <strong>acabamento fino</strong> e execução de alto padrão.</p>",
  },
  {
    id: 95,
    category: "garantia",
    keys: "reparos obras terceiros avaliar caso risco desmontagem quebra consertar instalação ruim",
    question: "Fazem reparos de obras de terceiros?",
    answerHtml:
      "<p>Avaliamos caso a caso.</p><p>Muitas vezes, consertar instalação ruim exige desmontagem com risco de quebra e pode custar mais do que refazer. Quando dá para recuperar com segurança (polimento, reparo de borda, pequenos ajustes), nós orientamos e orçamos.</p>",
  },
  {
    id: 96,
    category: "materiais",
    keys: "tendência design ano natural orgânico quartzitos veios marcantes fosco levigado leather pias esculpidas minimalistas",
    question: "Qual a tendência de design para este ano?",
    answerHtml:
      "<p>A tendência forte é a volta do <strong>natural</strong> e do <strong>orgânico</strong>:</p><ul><li>Quartzitos com veios marcantes</li><li>Acabamentos foscos (levigado/leather)</li><li>Pias esculpidas minimalistas</li></ul><p>O ‘branco liso’ dá espaço para rochas com personalidade e textura.</p>",
  },
  {
    id: 97,
    category: "garantia",
    keys: "atendem comercial residencial capacidade produtiva shopping prédio volume qualidade acabamento",
    question: "Vocês atendem Comercial ou só Residencial?",
    answerHtml:
      "<p>Atendemos <strong>ambos</strong>.</p><p>Conseguimos executar projetos residenciais e também demandas comerciais (volumes maiores), mantendo padrão de acabamento e controle de processo.</p>",
  },
  {
    id: 98,
    category: "prazo",
    keys: "obra atrasar pedra pronta armazenar pátio segurança não forçar entrega móveis prontos",
    question: "O que acontece se a minha obra atrasar e a pedra estiver pronta?",
    answerHtml:
      "<p>Sem problema. O correto é instalar somente quando a base (móveis/alvenaria) estiver pronta.</p><p>Quando necessário, armazenamos a pedra com segurança até a data certa. A instalação no momento correto evita retrabalho e risco de quebra.</p>",
  },
  {
    id: 99,
    category: "garantia",
    keys: "fotos reais sem filtro instagram processo chão de fábrica transparência",
    question: "Onde vejo fotos reais, sem filtro?",
    answerHtml:
      "<p>Acompanhe nosso Instagram para ver processo, chão de fábrica e obras reais.</p><p><strong>Sugestão:</strong> mantenha um destaque com ‘Obras’ e ‘Bastidores’ para transparência total.</p>",
  },
  {
    id: 100,
    category: "orcamento",
    keys: "vale a pena fechar agora reajuste dólar insumos congelar preço reservar chapa fila produção prioridade",
    question: "Vale a pena fechar o contrato agora?",
    answerHtml:
      "<p>Na maioria dos casos, <strong>sim</strong>.</p><p>Pedras nobres e insumos sofrem reajustes (muitas vezes influenciados pelo dólar). Fechar agora pode:</p><ul><li><strong>Congelar preço</strong> dentro da validade do orçamento</li><li><strong>Reservar</strong> a chapa que você aprovou</li><li>Garantir posição na <strong>fila de produção</strong></li></ul><p>Se você quer decisão segura, o próximo passo é simples: envie planta/fotos/medidas aproximadas e receba um orçamento técnico detalhado.</p>",
  },
];
