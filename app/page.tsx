"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CoverSlide = {
  id: string;
  kind: "cover";
  kicker: string;
  footer: string;
  title: [string, string];
};

type ContentSlide = {
  id: string;
  kind: "content";
  kicker: string;
  footer: string;
  heading: string;
  bullets?: string[];
  paragraph?: string;
  amountLabel?: string;
  table?: Array<{ label: string; value: string }>;
  conclusion?: string;
  highlightAmount?: number;
};

type ModuleSlide = {
  id: string;
  kind: "module";
  kicker: string;
  footer: string;
  heading: string;
  subheading: string;
};

type Slide = CoverSlide | ContentSlide | ModuleSlide;

const sharedFooter = "Carla Castelo Trindade | 2026";
const showSlideNumbers = true;
const module6Elements = [
  "Meio",
  "Resultado",
  "Intelectual",
  "Normativo",
  "Sancionatório",
] as const;
const module6ElementSlideTargets = [
  "elemento-meio",
  "elemento-resultado",
  "elemento-intelectual",
  "elemento-normativo",
  "elemento-sancionatorio",
] as const;
const module6ElementSubtitles: Partial<Record<string, string>> = {
  "elemento-meio": "forma utilizada pelo contribuinte",
  "step-transaction": "Uma construção pode ser constituída por mais do que uma etapa ou parte",
  "teste-genuinidade": "É artificial se for uma construção \"Não Genuína\" => Ausência De Razões Económicas Válidas",
  "elemento-resultado": "Vantagem Fiscal Obtida",
  "elemento-intelectual": "A Intenção Do Contribuinte",
  "elemento-normativo": "A Contrariedade Ao Espírito Das Normas",
  "elemento-sancionatorio": "A ATAD Dá Liberdade Aos E.M. Para Definirem Um Elemento Sancionatório",
};
const privateElementsTabs = ["Meio", "Resultado", "Intelectual", "Normativo", "Sancionatório"] as const;
const privateElementQuestions: Record<(typeof privateElementsTabs)[number], string> = {
  Meio: "Foi usado um meio artificioso?",
  Resultado: "O resultado foi uma vantagem fiscal?",
  Intelectual: "Houve intenção de frustrar o direito?",
  Normativo: "É uma actividade censurada pelo ordenamento jurídico?",
  Sancionatório: "De que forma deve ser sancionado?",
};
const timelineMoments = [
  { year: "1999", text: "Versão Originária da CGAA\n\nA Cláusula Geral Anti-Abuso é introduzida em Portugal em janeiro de 1999, no artigo 32.º-A do CPPT. Esta versão nunca chegou a ser utilizada, tendo sido rapidamente substituída em julho de 1999\n\nFoi com esta atualização atualização que a CGAA passou a constar no artigo 38.º/2 LGT, ficando ali até aos dias de hoje" },
  { year: "2000", text: "Com a Lei n.º 30-G/2000, de 29 de dezembro, a CGAA passou a assumir contornos de eficácia no sistema fiscal português, tendo finalmente capacidade para ser utilizada" },
  { year: "2012", text: "Começa a discussão no G20 acerca da necessidade de prevenção do BEPS. Deste momento histórico surgem vários contributos: a Ação 6 do BEPS, que introduz uma Cláusula Geral Anti-Abuso ao nível da OCDE, e o desenvolvimento do Principal Purpose Test (PPT)\n\nA convenção modelo da OCDE acabou por absorver este critério" },
  { year: "2013-2015", text: "Entre os anos 2013 e 2015 houve um grande aumento de casos de CGAA em Portugal, face ao problema da transformação de sociedades por quotas em sociedades anónimas para beneficiar de regime mais favorável na transmissão" },
  { year: "2016", text: "Em 2016 a ATAD estabelece um nível mínimo de proteção contra a elisão fiscal. Na ATAD surge a CGAA inspirada nos trabalhos da OCDE, com o objectivo de ser aplicada em todos os Estados-Membros\n\nNeste momento o TJUE desempenhou um papel essencial na construção da atual CGAA Europeia" },
  { year: "2019", text: "A transposição da ATAD para a legislação portuguesa fez surgir alterações que resultaram numa abrangência maior da cláusula, com menos requisitos para preencher os vários elementos" },
];
const timelineYears = ["1999", "2000", "2012", "2013-2015", "2016", "2019"] as const;
const privateClientCardImages: Partial<Record<string, string>> = {
  "cristina-ferreira": "/Cristina_Ferreira_1080X1920.png",
  "joana-vasconcelos": "/Joana_Vasconcelos_1080x1920.png",
  "fernando-santos": "/FernandoSantos_1080x1920.png",
  "manuel-luis-goucha": "/Goucha_1080x1920.png",
};

const stateIncomeEvents = [
  { id: "imi", label: "A Maria pagou IMI", amount: 18 },
  { id: "irs", label: "O António pagou IRS", amount: 24 },
  { id: "irc", label: "A CCT, Lda pagou IRC", amount: 28 },
] as const;

const stateExpenseEvents = [
  { id: "hospital", label: "O António foi ao Hospital Público", amount: 16 },
  { id: "policia", label: "A Ana chamou a polícia", amount: 14 },
  {
    id: "bombeiros",
    label: "Os bombeiros salvaram a casa da Beatriz",
    amount: 22,
  },
] as const;

const slides: Slide[] = [
  {
    id: "cover",
    kind: "cover",
    kicker: "Direito Fiscal | Private Clients",
    title: ["Cláusula Geral", "Anti-Abuso"],
    footer: sharedFooter,
  },
  {
    id: "fenomeno",
    kind: "content",
    kicker: "O impacto da CGAA",
    heading: "O Fenómeno",
    bullets: [
      "As sociedades como diferimento de tributação do rendimento",
      "Alvos: Futebolistas, Artistas e Profissionais Liberais",
      "A utilização de estruturas societárias para converter rendimentos que seriam tributados em IRS (esfera individual) para o regime mais favorável do IRC (esfera coletiva) [cite: 1, p. 38]",
    ],
    footer: sharedFooter,
  },
  {
    id: "fernando-santos-caso",
    kind: "content",
    kicker: "Impacto",
    heading: "Caso Fernando Santos",
    highlightAmount: 4492494.2,
    bullets: [
      "Desconsideração da estrutura societária",
      "Consequência: Tributação directa na esfera do IRS",
      "O tribunal considerou que os serviços eram prestados pessoalmente, faltando substância económica à estrutura utilizada para justificar a tributação em sede de IRC [cite: 1, p. 35, 38]",
    ],
    footer: sharedFooter,
  },
  {
    id: "goucha-caso",
    kind: "content",
    kicker: "Impacto",
    heading: "Caso Manuel Luís Goucha",
    highlightAmount: 1171006.3,
    bullets: [
      "Prestação de serviços: Pessoal vs. Formal",
      "O conflito de esferas: A dificuldade de dissociar a actividade da figura pública da actividade da sociedade controlada pela própria [cite: 1, p. 39-40]",
    ],
    footer: sharedFooter,
  },
  {
    id: "autonomia-privada",
    kind: "content",
    kicker: "Princípios",
    heading: "Autonomia Privada",
    bullets: [
      "Liberdade de iniciativa e gestão empresarial",
      "Base: Artigos 61.o e 80.o da Constituição da República Portuguesa (CRP) [cite: 1, p. 9]",
    ],
    footer: sharedFooter,
  },
  {
    id: "autonomia-protecao-erario",
    kind: "content",
    kicker: "Conflitos",
    heading: "Autonomia vs.\nProteção do Erário",
    bullets: [
      "Derrogação da autonomia para proteger o Estado",
      "O conflito é entre a liberdade que deve ser conferida ao contribuinte e a necessidade de precaver situações em que a actuação do contribuinte coloca em risco os interesses do Estado",
    ],
    footer: sharedFooter,
  },
  {
    id: "preco-justica",
    kind: "content",
    kicker: "Conflitos",
    heading: "O Preço da Justiça",
    bullets: [
      'A CGAA é o expoente máximo do abandono da lei típica e rígida que caracterizava a legislação fiscal até aos anos 90. A mudança foi motivada por razões de Segurança Jurídica. Por outro lado, serão temas de segurança jurídica que se levantarão precisamente ao deslocar, sem mecanismos de estabilidade e critérios uniformizadores concretos, o conteúdo normativo do campo da criacção do Direito para o de aplicação do Direito',
      "Será a insegurança jurídica uma condição necessária? Ou uma jurisprudência uniformizada e robusta pode mitigar este problema?",
      "Justiça material vs. Previsibilidade",
    ],
    footer: sharedFooter,
  },
  {
    id: "homo-economicus",
    kind: "content",
    kicker: "Princípios",
    heading: 'O "Homo Economicus"',
    bullets: [
      "MAIS CUSTOS DE TRANSPORTE E MENOS IMPOSTO, OU MENOS CUSTOS DE TRANSPORTE E MAIS IMPOSTO. O QUE DEVE O HOMO ECONOMICUS ESCOLHER?",
      `Citação: "O contribuinte agindo como um 'homo economicus' que procura maximizar os seus proveitos vai estar permanentemente atento às consequências fiscais e económicas dos seus negócios" [cite: 1, p. 9]`,
    ],
    footer: sharedFooter,
  },
  {
    id: "contexto-europeu",
    kind: "content",
    kicker: "Princípios",
    heading: "O contexto Europeu",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "contexto-europeu-mapa",
    kind: "content",
    kicker: "Princípios",
    heading: "O contexto Europeu",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "valvula-seguranca",
    kind: "content",
    kicker: "Princípios",
    heading: 'A "Válvula de Segurança"',
    bullets: [
      "THERE IS NO WAY BACK",
    ],
    footer: sharedFooter,
  },
  {
    id: "evolucao-cgaa",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "Evolução da CGAA",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "alteracao-cgaa",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "Alteração da CGAA",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "elemento-meio",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 1: Meio",
    bullets: [
      "São construções ou séries de construções realizadas com abuso das formas jurídicas ou que não sejam consideradas genuinas",
      "A escolha de uma via anómala ou supérflua para alcançar o resultado económico",
      'Antes da transposição da ATAD exigia-se que fossem praticados "atos ou negócios jurídicos” em vez de “construção”, a redação atual é mais ampla e abrange qualquer tipo de comportamento por parte do contribuinte.',
    ],
    footer: sharedFooter,
  },
  {
    id: "step-transaction",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Step Transaction Doctrine",
    bullets: [
      "Artigo 38º/3 b) LGT - Análise de várias etapas coordenadas temporalmente",
      "Conexão de atos para obter uma vantagem que não seria alcançada numa transação única",
    ],
    footer: sharedFooter,
  },
  {
    id: "teste-genuinidade",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "O Teste da Genuinidade",
    bullets: [
      "Critério: A estrutura deve refletir a substância económica e comercial real, não sendo puramente artificial",
      "Na versão anterior à transposição da ATAD (pré 2019) tinha de ser Fraudulenta ou Artificiosa",
      "Acórdão do TJUE - Foggia (Processo C-126/10 - Novembro 2011) ajuda-nos a compreender que “razões económicas válidas” correspondem a construções que vão para lá da simples tentativa de obter uma vantagem fiscal. Esta doutrina do Acórdão Foggia, no entanto, não t na medida em que se exige hoje apenas que uma das finalidades principais seja a de obter uma vantagem fiscal, como veremos quanto ao elemento Intelectual.  ",

    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-resultado",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 2: Resultado",
    bullets: [
      "Tem de ser uma vantagem fiscal indevida (redução, eliminação ou diferimento) que frustre o objeto ou a finalidade do direito fiscal aplicável",
      "A elisão fiscal decorre imediatamente disto, na medida em que consiste na prática de comportamentos não desejados pelo legislador no espírito das suas normas",
      "Com a transposição da ATAD, o Elemento Resultado, já não encontra tantas limitações como antes"
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-intelectual",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 3: Intelectual (PPT)",
    bullets: [
      'Com a transposição da ATAD, adota-se o critério de PPT desenvolvido pela OCDE: Basta que "Uma das finalidades principais" seja obter a vantagem fiscal.',
      "É um critério mais abrangente em relação à versão anterior, onde a vantagem tinha de ser o objectivo ou finalidade principais",
      "Uma interpretação extensiva deste critério pode levar a uma aplicação discricionária da CGAA. Por esse motivo todos estes elementos devem ser considerados em conjunto",
    ],
    footer: sharedFooter,
  },
  {
    id: "prova-diabolica",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: 'A "Prova Diabólica"',
    bullets: [
      'Podemos estar perante uma "Prova Diabólica", pelo exercício de uma análise e juízo de probabilidade da vontade do contribuinte que, por vezes, se poderá configurar um exercício impossível',
      "Entendimento do STA (2022 - Processo C-126/10): Basta que a AT faça prova de que a operação realizada não tem um propósito racional à luz do ordenamento jurídico mobilizado (...), [que] o seu propósito se esgota no aforro fiscal a que conduz",
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-normativo",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 4: Normativo",
    bullets: [
      "O Elemento Normativo não está expresso na lei",
      "É a reprovação pelo espírito da norma da vantagem obtida, ainda que formal e expressamente a lei não a reprove",
      "A conduta, embora lícita formalmente, é orientada para um ganho abusivo contrário ao sistema jurídico-tributário global",
      "Tem de ser “clara e inequívoca a intenção do legislador de tributar” as operações postas em prática pelo contribuinte. Só assim se poderá censurar o contribuinte",
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-sancionatorio",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 5: Sancionatório",
    bullets: [
      "O Elemento Sancionatório está estabelecido na estatuição da norma e apenas se verificará se os elementos anteriores estiverem todos preenchidos",
      "O Efeito normal é a ineficácia tributária dos atos e negócios. Ou seja, a desconsideração da construção, consequente ineficácia da mesma",
      'A isto segue-se a Reconstrução: Tributação de acordo com os negócios ou atos ("construção") que correspondam à substância económica real.',
    ],
    footer: sharedFooter,
  },
  {
    id: "garantias-contribuinte",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "Garantias do Contribuinte",
    bullets: [
      "O contribuinte tem o Direito de audição prévia e a possibilidade de obter informações vinculativas que afastam a aplicação da cláusula",
      "É proibida a utilização de suposições ou presunções: A fundamentação deve ser clara, específica e circunstanciada, o que se pode verificar pela profundidade das inspeções tributárias levadas a cabo nos casos decididos contra o contribuinte",
    ],
    footer: sharedFooter,
  },
  {
    id: "casos-estudo",
    kind: "module",
    kicker: "Private Clients",
    heading: "Casos actuais",
    subheading: "",
    footer: sharedFooter,
  },
  {
    id: "fernando-santos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Fernando Santos",
    bullets: [
      "CGAA - Sociedade sem substância económica",
      "Gastos não relacionados com a actividade prosseguida e actividade insuficiente para justificar a opção pela sociedade",
      "A liberdade na prestação de serviços era limitada pelos contratos assinados com a Seleção",
      "Sociedade como um mero veículo de contratação",
    ],
    footer: sharedFooter,
  },
  {
    id: "fernando-santos-elementos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Fernando Santos",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "manuel-luis-goucha",
    kind: "content",
    kicker: "Private Clients",
    heading: "Manuel Luís Goucha",
    bullets: [
      "CGAA - Cariz pessoal das prestações sem justificação para a opção pela sociedade",
      "Configuração como rendimentos pessoais (Categoria B) em vez de rendimentos empresariais (IRC)",
    ],
    footer: sharedFooter,
  },
  {
    id: "manuel-luis-goucha-elementos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Manuel Luís Goucha",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "cristina-ferreira",
    kind: "content",
    kicker: "Private Clients",
    heading: "Cristina Ferreira",
    bullets: [
      "DESCONSIDERAÇÃO DE GASTOS",
      "Tributação em IRS como rendimentos de capitais (Categoria E) devido à confusão de esferas pessoal e empresarial",
    ],
    footer: sharedFooter,
  },
  {
    id: "cristina-ferreira-concretizacao",
    kind: "content",
    kicker: "Private Clients",
    heading: "Cristina Ferreira",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "joana-vasconcelos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Joana Vasconcelos",
    bullets: [
      "TRANSPARÊNCIA FISCAL",
      "Consequência: Imputação directa dos lucros aos sócios e tributação em sede de IRS",
    ],
    footer: sharedFooter,
  },
  {
    id: "joana-vasconcelos-concretizacao",
    kind: "content",
    kicker: "Private Clients",
    heading: "Joana Vasconcelos",
    bullets: [],
    footer: sharedFooter,
  },
  {
    id: "figuras-proximas",
    kind: "content",
    kicker: "Private Clients",
    heading: "A Transparência Fiscal",
    bullets: [],
    footer: sharedFooter,
  },

  {
    id: "estatisticas-caad",
    kind: "content",
    kicker: "A Realidade nos Tribunais",
    heading: "Estatísticas CAAD (2013-2023)",
    paragraph: "A amostra considerada corresponde a 91 casos analisados no CAAD",
    table: [
      { label: "Favorável ao Contribuinte", value: "61%" },
      { label: "Desfavorável ao Contribuinte", value: "23%" },
      { label: "Parcialmente Favorável", value: "16%" },
    ],
    conclusion:
      'Conclusão: A CGAA não é uma "arma automática" da AT, mas um instrumento que exige uma fundamentação robusta e uma análise detalhada dos casos concretos',
    footer: sharedFooter,
  },
  {
    id: "rigor-juizes",
    kind: "content",
    kicker: "A Realidade nos Tribunais",
    heading: "O Rigor dos Juízes",
    bullets: [
      "A AT perde a maioria dos processos arbitrais devido a falhas na fundamentação ou prova dos elementos do abuso",
    ],
    footer: sharedFooter,
  },
  {
    id: "dilema-gestor",
    kind: "content",
    kicker: "Por Resolver",
    heading: "O Dilema do Gestor",
    bullets: [
      "Pode um gestor diligente ignorar o impacto fiscal das suas decisões?",
      "Escolher a via fiscalmente mais barata é sempre um indício de abuso?",
    ],
    footer: sharedFooter,
  },
  {
    id: "perfis-expostos",
    kind: "content",
    kicker: "Por Resolver",
    heading: "Perfis Expostos",
    bullets: [
      "Estão certas actividades (como artistas e desportistas) mais propensas a ser alvo da CGAA?",
      "Onde termina o direito aos direitos de imagem e começam as razões comerciais legítimas?",
    ],
    footer: sharedFooter,
  },
  {
    id: "futuro-inseguranca",
    kind: "content",
    kicker: "Por Resolver",
    heading: "O Futuro da Insegurança",
    bullets: [
      'É o "mar de incerteza" evitável num sistema fiscal globalizado?',
      "Podemos garantir a justiça sem o uso de conceitos indeterminados e uma margem de discricionariedade para os tribunais?",
    ],
    footer: sharedFooter,
  },
];

const presentationSlides = (() => {
  const module7Order = [
    "casos-estudo",
    "cristina-ferreira",
    "joana-vasconcelos",
    "fernando-santos",
    "manuel-luis-goucha",
    "transparencia-fiscal",
  ];
  const module7OrderSet = new Set(module7Order);
  const slidesById = new Map(slides.map((slide) => [slide.id, slide]));
  const module7Start = slides.findIndex((slide) => slide.id === "casos-estudo");
  const module7End = slides.findIndex(
    (slide) => slide.id === "transparencia-fiscal",
  );

  if (module7Start === -1 || module7End === -1) {
    return slides;
  }

  const before = slides.slice(0, module7Start);
  const after = slides.slice(module7End + 1);
  const reorderedModule7 = module7Order
    .map((id) => slidesById.get(id))
    .filter((slide): slide is Slide => Boolean(slide));
  const untouchedModule7 = slides.slice(module7Start, module7End + 1).filter(
    (slide) => !module7OrderSet.has(slide.id),
  );

  return [...before, ...reorderedModule7, ...untouchedModule7, ...after];
})();

function getModule6ActiveElement(heading: string) {
  if (
    heading === "Elemento 1: Meio" ||
    heading === "Step Transaction Doctrine" ||
    heading === "O Teste da Genuinidade"
  ) {
    return 0;
  }

  if (heading === "Elemento 2: Resultado") {
    return 1;
  }

  if (
    heading === "Elemento 3: Intelectual (PPT)" ||
    heading === 'A "Prova Diabólica"'
  ) {
    return 2;
  }

  if (heading === "Elemento 4: Normativo") {
    return 3;
  }

  if (heading === "Elemento 5: Sancionatório") {
    return 4;
  }

  return null;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [stateLoopTick, setStateLoopTick] = useState(0);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [privateElementStep, setPrivateElementStep] = useState(0);
  const [meioPart, setMeioPart] = useState<0 | 1>(0);
  const [liberdadeLevel, setLiberdadeLevel] = useState(58);
  const [isDraggingLiberdade, setIsDraggingLiberdade] = useState(false);
  const liberdadeBarRef = useRef<HTMLDivElement | null>(null);
  const handleLiberdadeDrag = (clientY: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const relative = (rect.bottom - clientY) / rect.height;
    const level = Math.max(12, Math.min(88, Math.round(relative * 100)));
    setLiberdadeLevel(level);
  };

  useEffect(() => {
    if (!isDraggingLiberdade) return;
    const handleMove = (event: PointerEvent) => {
      if (!liberdadeBarRef.current) return;
      handleLiberdadeDrag(event.clientY, liberdadeBarRef.current);
    };
    const handleUp = () => setIsDraggingLiberdade(false);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDraggingLiberdade]);

  const goToSlide = (nextIndex: number) => {
    const target = presentationSlides[nextIndex];
    if (
      target?.id === "fernando-santos-elementos" ||
      target?.id === "manuel-luis-goucha-elementos"
    ) {
      setPrivateElementStep(0);
      setMeioPart(0);
    }
    setActiveSlide(nextIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        const isFernandoElements =
          slide.kind === "content" && slide.id === "fernando-santos-elementos";
        const isGouchaElements =
          slide.kind === "content" && slide.id === "manuel-luis-goucha-elementos";
        if (slide.kind === "content" && slide.id === "evolucao-cgaa" && timelineIndex < timelineMoments.length - 1) {
          setTimelineIndex((v) => v + 1);
          return;
        }
        if (isFernandoElements && (privateElementStep < privateElementsTabs.length - 1 || (privateElementStep === 0 && meioPart === 0))) {
          if (privateElementStep === 0 && meioPart === 0) {
            setMeioPart(1);
            return;
          }
          setPrivateElementStep((v) => v + 1);
          setMeioPart(0);
          return;
        }
        if (isGouchaElements && privateElementStep < privateElementsTabs.length - 1) {
          setPrivateElementStep((v) => v + 1);
          return;
        }
        goToSlide(Math.min(activeSlide + 1, presentationSlides.length - 1));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const isFernandoElements =
          slide.kind === "content" && slide.id === "fernando-santos-elementos";
        const isGouchaElements =
          slide.kind === "content" && slide.id === "manuel-luis-goucha-elementos";
        if (slide.kind === "content" && slide.id === "evolucao-cgaa" && timelineIndex > 0) {
          setTimelineIndex((v) => v - 1);
          return;
        }
        if (isFernandoElements && (privateElementStep > 0 || (privateElementStep === 0 && meioPart === 1))) {
          if (privateElementStep === 1) {
            setPrivateElementStep(0);
            setMeioPart(1);
            return;
          }
          if (privateElementStep === 0 && meioPart === 1) {
            setMeioPart(0);
            return;
          }
          setPrivateElementStep((v) => v - 1);
          return;
        }
        if (isGouchaElements && privateElementStep > 0) {
          setPrivateElementStep((v) => v - 1);
          return;
        }
        goToSlide(Math.max(activeSlide - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSlide, timelineIndex, privateElementStep, meioPart]);

  const slide = presentationSlides[activeSlide];
  const isImpactCaseSlide =
    slide.kind === "content" &&
    (slide.id === "fernando-santos-caso" || slide.id === "goucha-caso");
  const isImpactOverviewSlide =
    slide.kind === "content" && slide.id === "choque-financeiro";
  const isAutonomiaPrivadaSlide =
    slide.kind === "content" && slide.id === "autonomia-privada";
  const isDeverFundamentalSlide =
    slide.kind === "content" && slide.id === "dever-fundamental";
  const isPrinciplesSlide =
    slide.kind === "content" &&
    [
      "autonomia-privada",
      "homo-economicus",
      "dever-fundamental",
      "valvula-seguranca",
    ].includes(slide.id);
  const isConfrontosLeadSlide =
    slide.kind === "content" && slide.id === "receita-vs-competitividade";
  const isConfrontosSlide =
    slide.kind === "content" &&
    [
      "mecanismos-invisiveis",
      "autonomia-protecao-erario",
      "preco-justica",
    ].includes(slide.id);
  const isHomoEconomicusSlide =
    slide.kind === "content" && slide.id === "homo-economicus";
  const impactParagraph = isImpactCaseSlide
    ? "Consequ\u00eancia: Tributa\u00e7\u00e3o directa na esfera do IRS"
    : slide.kind === "content"
      ? slide.paragraph
      : undefined;
  const impactAmountLabel = isImpactCaseSlide
    ? "A aplica\u00e7\u00e3o da CGAA gerou uma liquida\u00e7\u00e3o de:"
    : slide.kind === "content"
      ? slide.amountLabel
      : undefined;
  const visibleIncomeEvents = isDeverFundamentalSlide
    ? stateIncomeEvents.slice(0, Math.min(stateLoopTick + 1, stateIncomeEvents.length))
    : [];
  const visibleExpenseEvents = isDeverFundamentalSlide
    ? stateExpenseEvents.slice(
        0,
        Math.max(0, Math.min(stateLoopTick - 1, stateExpenseEvents.length)),
      )
    : [];
  const stateFundsLevel = isDeverFundamentalSlide
    ? Math.max(
        16,
        Math.min(
          88,
          36 +
            visibleIncomeEvents.reduce((sum, event) => sum + event.amount, 0) -
            visibleExpenseEvents.reduce((sum, event) => sum + event.amount, 0),
        ),
      )
    : 0;
  const module6ActiveElement =
    slide.kind === "content" && slide.kicker === "Os 5 Elementos"
      ? getModule6ActiveElement(slide.heading)
      : null;
  const module6TargetIndexes = module6ElementSlideTargets.map((targetId) =>
    presentationSlides.findIndex((item) => item.id === targetId),
  );
  const privateClientCardImage =
    slide.kind === "content" ? privateClientCardImages[slide.id] : undefined;
  const isTimelineSlide = slide.kind === "content" && slide.id === "evolucao-cgaa";
  const isPrivateElementsSlide =
    slide.kind === "content" &&
    (slide.id === "fernando-santos-elementos" || slide.id === "manuel-luis-goucha-elementos");
  const isFinalQuestionsSlide =
    slide.kind === "content" &&
    ["dilema-gestor", "perfis-expostos", "futuro-inseguranca"].includes(slide.id);
  const isAutonomiaProtecaoSlide = slide.kind === "content" && slide.id === "autonomia-protecao-erario";
  const formattedAmount =
    slide.kind === "content" && slide.highlightAmount
      ? `${new Intl.NumberFormat("pt-PT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(animatedAmount)}\u20ac`
      : null;

  useEffect(() => {
    if (!isAutonomiaProtecaoSlide || isDraggingLiberdade) return;
    let dir = 1;
    const id = window.setInterval(() => {
      setLiberdadeLevel((v) => {
        const next = v + dir * 0.25;
        if (next >= 82) {
          dir = -1;
          return 82;
        }
        if (next <= 26) {
          dir = 1;
          return 26;
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(id);
  }, [isAutonomiaProtecaoSlide, isDraggingLiberdade]);

  useEffect(() => {
    if (slide.kind !== "content" || !slide.highlightAmount) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;
    const duration = 3200;
    const target = slide.highlightAmount;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedAmount(target * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [slide]);

  useEffect(() => {
    if (!isDeverFundamentalSlide) {
      return;
    }

    const steps = [0, 1, 2, 3, 4, 5];
    const timeouts = steps.map((step, index) =>
      window.setTimeout(() => {
        setStateLoopTick(step);
      }, index * 1150),
    );

    const intervalId = window.setInterval(() => {
      steps.forEach((step, index) => {
        window.setTimeout(() => {
          setStateLoopTick(step);
        }, index * 1150);
      });
    }, steps.length * 1150 + 1300);

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearInterval(intervalId);
    };
  }, [isDeverFundamentalSlide]);

  return (
    <main className="presentation-stage">
      <section
        className={`presentation-slide ${slide.kind === "cover" ? "presentation-slide-cover" : "presentation-slide-content"}`}
        aria-label={slide.kind === "cover" ? slide.title.join(" ") : slide.heading}
      >
        <div className="slide-grid" aria-hidden="true" />
        <div className="slide-vignette" aria-hidden="true" />

        {slide.kind === "cover" ? (
          <div className="cover-content">
            <p className="slide-top-kicker">
              {isImpactCaseSlide || isImpactOverviewSlide
                ? "Impacto"
                : isConfrontosLeadSlide
                  ? "Confrontos"
                : isConfrontosSlide
                  ? "Os confrontos"
                : isPrinciplesSlide
                  ? "Princípios"
                : isHomoEconomicusSlide
                  ? "Principios"
                  : slide.kicker}
            </p>
            <div className="cover-title-block">
              <h1>
                <span className="cover-title-line">{slide.title[0]}</span>
                <span className="cover-title-line">{slide.title[1]}</span>
              </h1>
            </div>
          </div>
        ) : (
          <>
            <p className="slide-top-kicker">{slide.kicker}</p>
            {module6ActiveElement !== null ? (
              <div className="module6-tabs-wrap">
                <div className="module6-tabs">
                  {module6Elements.map((element, index) => (
                    <button
                      key={element}
                      type="button"
                      className={`module6-tab ${
                        module6ActiveElement === index
                          ? "module6-tab-active"
                          : ""
                      }`}
                      onClick={() => goToSlide(module6TargetIndexes[index])}
                      aria-pressed={module6ActiveElement === index}
                    >
                      <span className="module6-tab-label">{element}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="content-slide-mark" aria-hidden="true">
              <span>C</span>
              <span>G</span>
              <span>A</span>
              <span>A</span>
            </div>
            <div className="content-slide content-slide-simple">
              <div
                className={`content-slide-layout ${
                  slide.kind === "module"
                    ? "content-slide-layout-module"
                    : "content-slide-layout-standard"
                } ${
                  slide.kind === "content" &&
                  module6ActiveElement === null &&
                  !privateClientCardImage
                    ? "content-slide-layout-spaced"
                    : ""
                } ${
                  privateClientCardImage
                    ? "content-slide-layout-private-client"
                    : ""
                } ${
                  slide.id === "contexto-europeu"
                    ? "content-slide-layout-context-tight"
                    : ""
                }`}
              >
                {slide.kind === "module" ? (
                  slide.id === "casos-estudo" ? (
                    <div className="module-slide-shell module-slide-shell-visual">
                      <h2>{slide.heading}</h2>
                      <div className="cases-visual">
                        <div className="cases-visual-image-wrap" aria-hidden="true">
                          <div className="cases-visual-label cases-visual-label-left">
                            correções sem CGAA
                          </div>
                          <div className="cases-visual-label cases-visual-label-right">
                            Correções pela CGAA
                          </div>
                          <Image
                            src="/Privados.png"
                            alt=""
                            width={1920}
                            height={1080}
                            className="cases-visual-image"
                            priority
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="module-slide-shell">
                      <h2>{slide.heading}</h2>
                      <p className="module-slide-subheading">{slide.subheading}</p>
                    </div>
                  )
                ) : privateClientCardImage ? (
                  <div className="private-client-card">
                    <div className="private-client-card-image-wrap" aria-hidden="true">
                      <Image
                        src={privateClientCardImage}
                        alt=""
                        width={1080}
                        height={1920}
                        className="private-client-card-image"
                        sizes="(max-width: 760px) 100vw, 46vw"
                      />
                    </div>
                    <div className="private-client-card-copy">
                      <h2>{slide.heading}</h2>
                      {slide.bullets?.[0] ? (
                        <p className="private-client-subtitle tema-line">
                          {slide.bullets[0]
                            .replace(/^TEMA:\s*/, "")
                            .split(" ")
                            .map((word, index) => (
                              <span key={`${word}-${index}`}>
                                {word === word.toUpperCase() && /[A-Z]/.test(word) ? (
                                  <strong className="caps-strong">{word}</strong>
                                ) : (
                                  word
                                )}{" "}
                              </span>
                            ))}
                        </p>
                      ) : null}
                      {slide.bullets && slide.bullets.length > 1 ? (
                        <div className="private-client-paragraphs">
                          {slide.bullets.slice(1).map((bullet) => (
                            <p key={bullet}>{bullet}</p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`content-slide-shell ${
                      slide.kind === "content"
                        ? "content-slide-shell-standard"
                        : ""
                    }`}
                  >
                    <h2 className={isAutonomiaProtecaoSlide ? "two-line-title" : ""}>
                      {isImpactOverviewSlide
                        ? "Pode impactar em..."
                        : isAutonomiaPrivadaSlide
                          ? "Autonomia Privada"
                        : isDeverFundamentalSlide
                          ? "O Dever Fundamental"
                        : isHomoEconomicusSlide
                          ? "Homo Economicus"
                          : slide.heading}
                    </h2>
                    {slide.id === "fenomeno" ? (
                      <div className="phenomenon-visual">
                        <p className="phenomenon-question">
                          Profissional Liberal ou Marca?
                        </p>
                        <div
                          className="phenomenon-split"
                          aria-label="Comparação entre actividade pessoal e estrutura societária"
                        >
                          <div className="phenomenon-card">
                            <div className="phenomenon-icon phenomenon-icon-person" aria-hidden="true">
                              <span className="phenomenon-person-head" />
                              <span className="phenomenon-person-body" />
                            </div>
                            <span className="phenomenon-label">Individual</span>
                          </div>
                          <div className="phenomenon-divider" aria-hidden="true" />
                          <div className="phenomenon-card">
                            <div className="phenomenon-icon phenomenon-icon-company" aria-hidden="true">
                              <span className="phenomenon-company-roof" />
                              <span className="phenomenon-company-body">
                                <span />
                                <span />
                                <span />
                                <span />
                              </span>
                            </div>
                            <span className="phenomenon-label">Sociedade</span>
                          </div>
                        </div>
                        <p className="phenomenon-implicated">
                          <span>Potenciais implicados:</span>
                          <br />
                          Profissionais Liberais, Artistas, Desportistas e
                          outros...
                        </p>
                        <p className="phenomenon-statement">
                          {slide.paragraph ?? slide.bullets?.[0]}
                        </p>
                      </div>
                    ) : null}
                    {isHomoEconomicusSlide ? (
                      <div className="homo-slide">
                        <p className="homo-slide-subtitle">
                          MAIS CUSTOS DE TRANSPORTE E MENOS IMPOSTO, OU MENOS CUSTOS DE TRANSPORTE E MAIS IMPOSTO. O QUE DEVE O HOMO ECONOMICUS ESCOLHER?
                        </p>
                        <div className="homo-slide-image-wrap">
                          <Image
                            src="/ImagemSlide7.png"
                            alt="Representação visual de escolhas económicas"
                            width={1400}
                            height={900}
                            className="homo-slide-image"
                            sizes="(max-width: 760px) 100vw, 72vw"
                          />
                        </div>
                        <p className="homo-slide-quote">
                          O contribuinte agindo como um &apos;homo economicus&apos;
                          deve estar permanentemente atento às consequências fiscais e
                          económicas dos seus negócios
                        </p>
                      </div>
                    ) : null}
                    {isAutonomiaPrivadaSlide ? (
                      <div className="principles-slide">
                        <div className="principles-highlight">
                          <p className="principles-label">Princípio</p>
                          <p className="principles-main">
                            Livre iniciativa e gestão empresarial
                          </p>
                        </div>
                        <div className="principles-base">
                          <p className="principles-label">Base constitucional</p>
                          <p className="principles-articles">Artigos 61.º e 81.º da CRP</p>
                        </div>
                      </div>
                    ) : null}
                    {isDeverFundamentalSlide ? (
                      <div className="state-duty-slide">
                        <p className="state-duty-subtitle">
                          Pagamento de impostos como dever social e de cidadania
                        </p>
                        <div className="state-duty-board">
                          <div className="state-duty-column">
                            <div className="state-stick-group" aria-hidden="true">
                              <span className="state-stickman" />
                              <span className="state-stickman" />
                              <span className="state-stickman" />
                            </div>
                            <div className="state-event-list">
                              {visibleIncomeEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className="state-event state-event-income"
                                >
                                  {event.label}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="state-vault-wrap">
                            <div className="state-vault">
                              <div
                                className="state-vault-fill"
                                style={{ height: `${stateFundsLevel}%` }}
                              />
                              <div className="state-vault-slot" aria-hidden="true" />
                              <div className="state-vault-label">Estado</div>
                            </div>
                          </div>

                          <div className="state-duty-column">
                            <div className="state-stick-group" aria-hidden="true">
                              <span className="state-stickman" />
                              <span className="state-stickman" />
                              <span className="state-stickman" />
                            </div>
                            <div className="state-event-list">
                              {visibleExpenseEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className="state-event state-event-expense"
                                >
                                  {event.label}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="state-duty-footer">
                          Cada um se circunscreve à sua capacidade contributiva
                        </p>
                      </div>
                    ) : null}
                    {slide.bullets && slide.id === "choque-financeiro" ? (
                      <div className="impact-cards" role="list">
                        {slide.bullets.map((bullet) => (
                          <article className="impact-card" key={bullet} role="listitem">
                            <p>{bullet}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}
                    {slide.id === "rigor-juizes" ? (
                      <div className="rigor-visual">
                        <p className="rigor-subtitle">
                          Os tribunais têm sido muito rígidos e exigentes quanto à aplicação da CGAA
                        </p>
                        <div className="rigor-doc-wrap" aria-hidden="true">
                          <div className="rigor-doc">
                            <p className="rigor-doc-head">Autoridade Tributária</p>
                            <p className="rigor-doc-title">Aplicação da CGAA</p>
                            <p className="rigor-doc-body">Proposta de correção tributária</p>
                          </div>
                          <div className="rigor-stop-mark">
                            <span className="rigor-stop-icon">🛑</span>
                            <span className="rigor-stop-text">TRAVADO PELO TRIBUNAL</span>
                          </div>
                        </div>
                        <p className="rigor-legend">
                          Dos 91 casos analisados
                        </p>
                        <div className="rigor-stats">
                          <article className="rigor-stat-card">
                            <strong>56</strong>
                            <span>negação da aplicação da CGAA</span>
                          </article>
                          <article className="rigor-stat-card">
                            <strong>21</strong>
                            <span>aplicação apenas parcial</span>
                          </article>
                          <article className="rigor-stat-card">
                            <strong>14</strong>
                            <span>decisão nos exatos termos da AT</span>
                          </article>
                        </div>
                      </div>
                    ) : null}
                    {slide.id === "valvula-seguranca" ? (
                      <div className="valvula-highlight">
                        <p className="valvula-subtitle">
                          THERE IS NO WAY BACK
                        </p>
                        <p className="valvula-alert">
                          O que é que significa uma harmonização da CGAA?
                        </p>
                        <div className="valvula-alert-points">
                          <p>→ Todos os EM têm de ter uma CGAA formal</p>
                          <p>→ Todos os EM têm de cumprir os requisitos mínimos estabelecidos na Diretiva</p>
                          <p>→ Todos os EM estão sujeitos a uma interpretação conforme ao Direito Europeu</p>
                        </div>
                        <p className="valvula-alert-note">
                          <strong>NOTA:</strong> Diferentes interpretações da cláusula por diferentes EM pode levar a discriminações. O papel do TJUE é determinante na fixação de sentido a dar à norma
                        </p>
                        <div className="valvula-cards" role="list">
                          {slide.bullets?.slice(1).map((bullet) => (
                            <article className="valvula-card" key={bullet} role="listitem">
                              <p>{bullet}</p>
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {slide.id === "garantias-contribuinte" ? (
                      <div className="garantias-highlight">
                        <p className="garantias-subtitle">
                          A AT tem o Ónus da Prova, e a sua argumentação tem de seguir o artigo 63º CPPT.
                        </p>
                        <div className="garantias-cards" role="list">
                          {slide.bullets?.map((bullet) => (
                            <article className="garantias-card" key={bullet} role="listitem">
                              <p>{bullet}</p>
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {slide.id === "contexto-europeu" ? (
                      <div className="contexto-europeu contexto-europeu-left-only contexto-europeu-tight">
                        <div className="contexto-europeu-left">
                          <p>
                            <strong>26/28 E.M.</strong>
                            <br />
                            já tinham cláusulas anti-abuso gerais ou específicas pré-ATAD
                          </p>
                          <p className="contexto-europeu-footnote">
                            No entanto, estas não eram suficientes para colmatar os problemas de planeamento fiscal abusivo, porque eram limitadas na sua aplicação subjetiva, porque só se aplicavam a determinados impostos, ou por não estarem harmonizadas
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {slide.id === "contexto-europeu-mapa" ? (
                      <div className="contexto-europeu">
                        <div className="contexto-europeu-right">
                          <p className="contexto-europeu-subtitle">Pré-ATAD</p>
                          <div className="venn-eu">
                            <div className="venn-circle venn-circle-a">
                              <p>CGAA não formais</p>
                              <span className="venn-flags">
                                <Image src="/denmark.png" alt="Dinamarca" width={22} height={22} />
                                <Image src="/netherlands.png" alt="Holanda" width={22} height={22} />
                                <Image src="/poland.png" alt="Polónia" width={22} height={22} />
                              </span>
                            </div>
                            <div className="venn-circle venn-circle-b">
                              <p>CGAA formais</p>
                              <span className="venn-flags">
                                <Image src="/france.png" alt="França" width={20} height={20} />
                                <Image src="/spain.png" alt="Espanha" width={20} height={20} />
                                <Image src="/romania.png" alt="Roménia" width={20} height={20} />
                                <Image src="/austria.png" alt="Áustria" width={20} height={20} />
                                <Image src="/portugal.png" alt="Portugal" width={20} height={20} />
                                <Image src="/belgium.png" alt="Bélgica" width={20} height={20} />
                                <Image src="/germany.png" alt="Alemanha" width={20} height={20} />
                                <Image src="/slovakia.png" alt="Eslováquia" width={20} height={20} />
                                <Image src="/finland.png" alt="Finlândia" width={20} height={20} />
                                <Image src="/italy.png" alt="Itália" width={20} height={20} />
                                <Image src="/sweden.png" alt="Suécia" width={20} height={20} />
                                <Image src="/ireland.png" alt="Irlanda" width={20} height={20} />
                                <Image src="/united-kingdom.png" alt="Reino Unido" width={20} height={20} />
                              </span>
                            </div>
                            <div className="venn-circle venn-circle-c">
                              <p>Princípios anti-abuso codificados</p>
                              <span className="venn-flags">
                                <Image src="/croatia.png" alt="Croácia" width={22} height={22} />
                                <Image src="/czech-republic.png" alt="Chéquia" width={22} height={22} />
                                <Image src="/hungary.png" alt="Hungria" width={22} height={22} />
                                <Image src="/slovenia.png" alt="Eslovénia" width={22} height={22} />
                              </span>
                            </div>
                          </div>
                          <p className="venn-note">Outros Países: casos com princípios não codificados</p>
                        </div>
                      </div>
                    ) : null}
                    {isFinalQuestionsSlide ? (
                      <div className="final-questions">
                        {slide.bullets?.map((bullet) => (
                          <article className="final-question-card" key={bullet}>
                            <p>{bullet}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}
                    {slide.bullets &&
                    slide.id !== "fenomeno" &&
                    slide.id !== "valvula-seguranca" &&
                    slide.id !== "garantias-contribuinte" &&
                    slide.id !== "contexto-europeu" &&
                    slide.id !== "contexto-europeu-mapa" &&
                    slide.id !== "rigor-juizes" &&
                    !isFinalQuestionsSlide &&
                    !isAutonomiaPrivadaSlide &&
                    !isDeverFundamentalSlide &&
                    !isHomoEconomicusSlide &&
                    slide.id !== "choque-financeiro" &&
                    !isImpactCaseSlide ? (
                      <>
                        {module6ElementSubtitles[slide.id] ? (
                          <p className="module6-element-subtitle-box">
                            {module6ElementSubtitles[slide.id]}
                          </p>
                        ) : null}
                        <ul className="content-slide-list">
                          {slide.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                        {slide.id === "elemento-intelectual" ? (
                          <article className="ppt-reflection-card">
                            <p>
                              Teria utilizado aquela estrutura se o regime fiscal fosse diferente? Uma alteração da lei fiscal no futuro alteraria a construção do contribuinte?
                            </p>
                          </article>
                        ) : null}
                      </>
                    ) : null}
                    {isAutonomiaProtecaoSlide ? (
                      <div className="correlation-board">
                        <div className="corr-col">
                          <p>liberdade</p>
                          <div className="corr-bar corr-bar-liberdade">
                            <div
                              ref={liberdadeBarRef}
                              className="corr-drag-surface"
                              onPointerDown={(e) => {
                                setIsDraggingLiberdade(true);
                                handleLiberdadeDrag(e.clientY, e.currentTarget);
                                e.preventDefault();
                              }}
                            />
                            <span style={{height:`${liberdadeLevel}%`}}/>
                            <i
                              className="corr-handle"
                              style={{ bottom: `calc(${liberdadeLevel}% - 11px)` }}
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="corr-col">
                          <p>Receita</p>
                          <div className="corr-bar corr-bar-seguranca"><span style={{height:`${100 - liberdadeLevel}%`}}/></div>
                        </div>
                      </div>
                    ) : null}
                    {slide.id === "cristina-ferreira-concretizacao" ? (
                      <div className="cristina-detail">
                        <div className="cristina-card">
                          <p>
                            Há duas questões discutidas no acórdão
                          </p>
                          <p>
                            1. Violação do art 23º CIRC, resultando na desconsideração como gastos das quantias utilizadas para realizações do foro pessoal
                          </p>
                          <p>
                            2. Aplicação do artigo 5º/2 alínea h) - presumir a distribuição desses rendimentos e fazer operar a tributação em sede de IRS
                          </p>
                        </div>
                        <p className="cristina-question">
                          Estariam preenchidos os elementos da CGAA?
                        </p>
                        <div className="cristina-grid">
                          <article className="cristina-point">
                            <h4>Elemento Meio (Certo)</h4>
                            <p>A utilização da sociedade para gastos pessoais é uma construção não genuína</p>
                          </article>
                          <article className="cristina-point">
                            <h4>Elemento Resultado (Certo)</h4>
                            <p>Há uma vantagem fiscal, a dedutibilidade dos gastos e não distribuição</p>
                          </article>
                          <article className="cristina-point">
                            <h4>Elemento Intelectual (Certo)</h4>
                            <p>Uma interpretação conforme a jurisprudência leva-nos a considerar que sim</p>
                          </article>
                          <article className="cristina-point">
                            <h4>Elemento Normativo (Certo)</h4>
                            <p>É um caso que a lei claramente reprova, especialmente por estar <strong>formalmente previsto</strong></p>
                          </article>
                        </div>
                        <p className="cristina-diff">
                          A diferença para uma aplicabilidade da CGAA é que neste caso foram violadas directamente normas fiscais
                        </p>
                      </div>
                    ) : null}
                    {slide.id === "joana-vasconcelos-concretizacao" ? (
                      <div className="cristina-detail">
                        <div className="joana-pill">
                          <p>
                            Discutiu-se se a artista estava sujeita ou não ao regime da transparência fiscal
                          </p>
                        </div>
                        <p className="cristina-card">
                          Artigo 6º/1 b) - Sociedades de Profissionais
                        </p>
                        <div className="joana-checklist">
                          <p>✅ 1 - Actividade prevista na lista</p>
                          <p>✅ 2 - + 75% dos rendimentos provém dessa actividade</p>
                          <p>✅ 3 - 2 Sócios (&lt;5 sócios)</p>
                          <p>✅ 4 - +75% detido pela Requerente</p>
                        </div>
                        <p className="cristina-diff">
                          Conclui-se estarem preenchidos os pressupostos de aplicação da transparência fiscal
                        </p>
                        <p className="joana-bottom-note">
                          No caso Manue Luís Goucha, verificam-se todos os pressupostos da Transparência excepto a inclusão da actividade na lista de actividades sujeitas a transparência fiscal. Pode a CGAA operar como uma extensora deste regime para casos de abuso?
                        </p>
                      </div>
                    ) : null}
                    {slide.id === "figuras-proximas" ? (
                      <div className="figuras-proximas">
                        <p className="figuras-proximas-highlight">
                          A CGAA como veículo para aplicar o regime da Transparência Fiscal
                        </p>
    
                        <article className="figuras-proximas-card">
                          <p>
                            Nos casos de Transparência Fiscal, tendo em conta que a razão de ser deste regime não é exclusivamente o combate à fraude ou elisão fiscal, nem sempre serão casos em que se preenche a CGAA
                          </p>
                          <p>
                            No entanto, a CGAA consegue ir mais além e tributar casos como o do Manuel Luís Goucha, em que parecem preenchidos todos os pressupostos da Transparência Fiscal, excepto o da actividade estar na lista de actividades previstas para este regime, ao que se soma, logicamente, um planeamento fiscal abusivo
                          </p>
                        </article>
                      </div>
                    ) : null}
                    {slide.id === "alteracao-cgaa" ? (
                      <div className="alteracao-cgaa">
                        <p className="alteracao-cgaa-subtitle">provocada pela transposição da ATAD</p>
                        <div className="alteracao-cgaa-grid">
                          <article className="alteracao-cgaa-card">
                            <h3>Pré-ATAD</h3>
                            <p>
                              2 - São ineficazes no âmbito tributário os <span className="alteracao-removed">actos ou negócios jurídicos essencial ou principalmente dirigidos</span>, por <span className="alteracao-removed">meios artificiosos ou fraudulentos e com abuso das formas jurídicas</span>, à redução, eliminação ou diferimento temporal de impostos que seriam devidos em resultado de factos, actos ou negócios jurídicos de idêntico fim económico, ou à obtenção de vantagens fiscais que não seriam alcançadas, total ou parcialmente, sem utilização desses meios, efectuando-se então a tributação de acordo com as normas aplicáveis na sua ausência e não se produzindo as vantagens fiscais referidas
                            </p>
                          </article>
                          <article className="alteracao-cgaa-card">
                            <h3>Pós-ATAD</h3>
                            <p>
                              2 - <span className="alteracao-added">As construções ou séries de construções</span> que, tendo sido realizadas com a finalidade principal ou <span className="alteracao-added">uma das finalidades principais</span> de obter uma vantagem fiscal que frustre o objeto ou a finalidade do direito fiscal aplicável, sejam realizadas com abuso das formas jurídicas <span className="alteracao-added">ou não sejam consideradas genuínas</span>, tendo em conta todos os factos e circunstâncias relevantes, são desconsideradas para efeitos tributários, efectuando-se a tributação de acordo com as normas aplicáveis aos negócios ou atos que correspondam à substância ou realidade económica e não se produzindo as vantagens fiscais pretendidas
                            </p>
                          </article>
                        </div>
                        <p className="alteracao-cgaa-footer-note">
                          Esta alteração estendeu o âmbito de aplicação da CGAA
                        </p>
                      </div>
                    ) : null}
                    {isTimelineSlide ? (
                      <>
                        <div className="timeline-shell">
                          <div className="timeline-head">
                            <button type="button" onClick={() => setTimelineIndex((v) => Math.max(0, v - 1))}>◀</button>
                            <p>{timelineMoments[timelineIndex].year}</p>
                            <button type="button" onClick={() => setTimelineIndex((v) => Math.min(timelineMoments.length - 1, v + 1))}>▶</button>
                          </div>
                          {timelineIndex === 0 ? (
                            <>
                              <p className="timeline-subtitle">Versão Originária da CGAA</p>
                              <p className="timeline-text">
                                {timelineMoments[timelineIndex].text.replace("Versão Originária da CGAA.\n\n", "")}
                              </p>
                            </>
                          ) : (
                            <p className="timeline-text">{timelineMoments[timelineIndex].text}</p>
                          )}
                          {timelineMoments[timelineIndex].year === "2013-2015" ? (
                            <div className="timeline-cards">
                              <div>Lda.</div>
                              <span>→</span>
                              <div>S.A.</div>
                            </div>
                          ) : null}
                        </div>
                        <div className="timeline-progress timeline-progress-fixed" aria-label="Linha temporal da evolução da CGAA">
                          <div className="timeline-progress-line" aria-hidden="true">
                            <span
                              className="timeline-progress-line-active"
                              style={{
                                width: `${(timelineIndex / (timelineYears.length - 1)) * 100}%`,
                              }}
                            />
                          </div>
                          {timelineYears.map((year, index) => (
                            <div
                              key={year}
                              className={`timeline-progress-item ${index <= timelineIndex ? "is-active" : ""}`}
                            >
                              <span className="timeline-progress-dot" />
                              <span className="timeline-progress-year">{year}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {slide.kind === "content" && slide.id === "preco-justica" ? (
                      <div className="justice-scale" aria-hidden="true">
                        <div className="justice-base" />
                        <div className="justice-pillar" />
                        <div className="justice-beam" />
                        <div className="justice-pan justice-pan-left">JUSTIÇA</div>
                        <div className="justice-pan justice-pan-right">SEGURANÇA JURÍDICA</div>
                      </div>
                    ) : null}
                    {isPrivateElementsSlide ? (
                      <div className="private-elements">
                        <div className="private-elements-tabs">
                          {privateElementsTabs.map((tab, idx) => (
                            <button
                              key={tab}
                              type="button"
                              className={idx === privateElementStep ? "active" : ""}
                              onClick={() => setPrivateElementStep(idx)}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <div className="private-elements-body">
                          <p className="private-elements-question">
                            {privateElementQuestions[privateElementsTabs[privateElementStep]]}
                          </p>
                          {slide.id === "fernando-santos-elementos" && privateElementStep === 0 ? (
                            <div className="private-elements-columns private-elements-single meio-full">
                              <div>
                                {meioPart === 0 ? (
                                  <>
                                <p>Argumento do Requerente: A Federação preferiu esta opção. O CAAD deu como não provado</p>
                                <p>A Federação definiu os treinadores no contrato com a sociedade</p>
                                <p>O contrato de direitos de imagem era intuitu personae e ligado ao selecionador Fernando Santos</p>
                                <p>A sociedade teve 4 funcionários em 2016 e 6 em 2017, maioritariamente relações familiares/pessoais</p>
                                <p>A sede era no domicílio familiar</p>
                                  </>
                                ) : (
                                  <>
                                <p>Não havia estrutura humana e material adequada; o know-how estava nas pessoas</p>
                                <p>O CAAD rejeita o argumento de facilidade de resolução contratual</p>
                                <p>Os subcontratos dependiam do contrato base com a Federação</p>
                                <p>Os serviços foram prestados individualmente por Fernando Santos, sem função real da sociedade</p>
                                <p><strong className="conclusao">Conclusão:</strong> A função tangível da sociedade foi imputar obrigações tributárias na sua esfera</p>
                                <p><strong className="nota">NOTA:</strong> Não está em causa a artificialidade global da sociedade, mas a utilização artificiosa neste contrato</p>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "fernando-santos-elementos" && privateElementStep === 1 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>
                                  Uma vantagem fiscal corresponde a uma qualquer situação pela qual, em virtude da prática de determinados actos, se obtém uma carga tributária mais favorável ao contribuinte do que aquela que resultaria da prática dos actos normais e de efeito económico equivalente, sujeitos a tributação.
                                </p>
                                <p>
                                  Conclui-se que a mesma prestação de serviços teria sido sujeita a uma carga tributária manifestamente mais elevada se o imposto, ao invés de ter sido apurado na esfera da Sociedade com base nas regras do IRC, tivesse sido determinado directa e pessoalmente na esfera jurídica do Requerente com base nas regras do IRS.
                                </p>
                                <p>
                                  Quanto ao ano de 2016, o imposto total em IRC (determinado com base na matéria colectável apurada para a categoria B) seria de € 861.243,19, quando a colecta de IRS seria de € 1.894.919,65, o que equivale a uma vantagem fiscal de € 1.033.676,46. Relativamente ao ano de 2017, a quantia equivalente por referência ao IRC seria de € 848.478,45, e por referência ao IRS seria de € 1.860.157,50, o que corresponde a uma vantagem fiscal de € 1.011.679,05.
                                </p>
                                <p>
                                  <strong className="conclusao">Conclusão:</strong> Tal como invocou a Requerida, através da intervenção da sociedade na prestação dos serviços à Federação, o Requerente obteve uma vantagem fiscal de € 2.045.355,51.
                                </p>
                                <p>
                                  <strong className='nota'>NOTA:</strong> O CAAD considera que o simples diferimento temporal de impostos é em si mesmo uma vantagem.
                                </p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "fernando-santos-elementos" && privateElementStep === 2 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>
                                  Acompanhando a redacção do artigo 38.º, n.º 2, da LGT, será necessário verificar se os actos ou negócios jurídicos praticados foram essencial ou principalmente dirigidos à redução, eliminação ou diferimento temporal de impostos (…) ou à obtenção de vantagens fiscais.
                                </p>
                                <p>
                                  Sendo de prova difícil, AT e Tribunal são obrigados a recorrer a elementos indiciários e presuntivos, num contexto de razoabilidade e normalidade, extraindo, com razoável segurança, a vontade do sujeito dos actos celebrados.
                                </p>
                                <p>
                                  O STA, em 2022, indica no Processo n.º 02507/15.6BEBRG que basta que a AT faça prova de que a operação realizada não tem um propósito racional à luz do ordenamento jurídico mobilizado; basta, no caso, provar que a operação não se enquadra nas razões que o direito societário apresenta (...) e que, por isso, o seu propósito se esgota no aforro fiscal a que conduz.
                                </p>
                                <p>
                                  <strong className="conclusao">Conclusão:</strong> Da concatenação dos elementos resultado e meio conclui-se, para lá de qualquer dúvida razoável, pela proeminência da motivação fiscal sobre outros aspectos substanciais (essenciais) que pudessem ter potenciado a interposição da Sociedade nos negócios jurídicos celebrados com a Federação.
                                </p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "fernando-santos-elementos" && privateElementStep === 3 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>
                                  Como nota o CAAD no processo n.º 131/2014-T, se se exigisse que estivesse expressamente prevista a censura na lei, a Cláusula Geral Anti-Abuso seria muito restringida.
                                </p>
                                <p>
                                  &quot;É forçoso concluir-se que o facto do requerente ter utilizado um meio desprovido de razões económico-empresariais válidas (...) com o objectivo proeminente de obter uma vantagem fiscal, implica que o comportamento em causa é anti-jurídico e merecedor de reprovação dogmática-sistemática.&quot;
                                </p>
                                <p>
                                  <strong className="conclusao">Conclusão:</strong> O elemento normativo também está verificado. Considerar que o espírito do direito não censura estes comportamentos seria validar o planeamento fiscal extra-legem.
                                </p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "fernando-santos-elementos" && privateElementStep === 4 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>
                                  Consiste na manutenção dos efeitos civis e na desconsideração, apenas no âmbito tributário, das vantagens fiscais que tiverem sido indevidamente obtidas pelos contribuintes.
                                </p>
                                <p>
                                  <strong className="conclusao">Conclusão:</strong> O Requerente vai ser tributado de acordo com as taxas e normas de IRS.
                                </p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "manuel-luis-goucha-elementos" && privateElementStep === 0 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>O Requerente alegou que a sociedade tem substância económica e que gera resultados económicos reais que não decorrem da pessoa do legislador</p>
                                <p>O CAAD concluiu que o que estava em causa não era a genuinidade da sociedade, mas antes a transferência para esta de direitos intuitu personae, como os direitos de imagem e voz do requerente</p>
                                <p>Todos os serviços serem sobre a pessoa física do Requerente e os rendimentos se circunscreverem à sua actividade individual parece, tal como mencionado no voto vencido, insuficiente para demonstrar o preenchimento do elemento meio</p>
                                <p>A linha traça-se no facto de o CAAD ter considerado a sociedade como &quot;oca&quot;, na medida em que não tinha uma estrutura material capaz da prestação de serviços. Todos os serviços necessários eram contratados a terceiros</p>
                                <p><strong className="conclusao">Conclusão:</strong> Se a sociedade não tem estrutura para realizar os serviços, então é desnecessária e o único motivo da sua existência é fiscal</p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "manuel-luis-goucha-elementos" && privateElementStep === 1 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>Se fosse tributado em IRS pagaria aproximadamente 48% de imposto. Em IRC foi pago aproximadamente 28%</p>
                                <p>Apesar de estes rendimentos voltarem a ser tributados aquando da distribuição aos sócios, o Tribunal considerou que, no caso em apreço, era provável um longo diferimento dessa distribuição, uma vez que a sociedade pretendia reinvestir o dinheiro na sua actividade &quot;genuína&quot;, agrícola/pecuária</p>
                                <p><strong className="conclusao">Conclusão:</strong> Não só o diferimento é visto como uma vantagem, como no caso em apreço se previa que os valores nunca viessem a ser distribuídos</p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "manuel-luis-goucha-elementos" && privateElementStep === 2 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>O Tribunal considerou que &quot;O Requerente sabe que a constituição da sociedade e o seu uso para faturar os rendimentos oriundos da sua actividade (que antes obtinha a título individual) aumentou significativamente o seu rendimento líquido, e que tal decorre do pagamento de menos impostos. Vantagem com que o Recorrente, no mínimo, se conformou.&quot;</p>
                                <p><strong className="conclusao">Conclusão:</strong> Está preenchido o Elemento Intelectual</p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "manuel-luis-goucha-elementos" && privateElementStep === 3 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>Foram elididas normas de IRS ao transferir as obrigações para o âmbito do IRC. O Direito reprova esta transmissão na medida em que estes rendimentos deviam ter sido tributados a título individual</p>
                              </div>
                            </div>
                          ) : null}
                          {slide.id === "manuel-luis-goucha-elementos" && privateElementStep === 4 ? (
                            <div className="private-elements-columns private-elements-single">
                              <div>
                                <p>Levantou-se a questão de não ter a AT deduzido os impostos já pagos em IRC do valor da liquidação adicional. O Tribunal referiu que a AT provavelmente teria de acertar os valores já pagos, mas que não era competência deste tribunal pronunciar-se quanto a essa questão</p>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {impactParagraph ? (
                      <p className="content-slide-body">{impactParagraph}</p>
                    ) : null}
                    {isImpactCaseSlide ? (
                      <div className="impact-caad-logo" aria-hidden="true">
                        <Image
                          src="/Caad_Logo.png"
                          alt=""
                          width={220}
                          height={78}
                          className="impact-caad-logo-image"
                        />
                      </div>
                    ) : null}
                    {impactAmountLabel ? (
                      <p className="content-slide-amount-label">
                        {impactAmountLabel}
                      </p>
                    ) : null}
                    {formattedAmount ? (
                      <p className="content-slide-amount">{formattedAmount}</p>
                    ) : null}
                    {slide.table ? (
                      <div className="content-slide-table">
                        <div className="content-slide-table-head">
                          <span>Sentido da Decisão</span>
                          <span>Percentagem</span>
                        </div>
                        {slide.table.map((row) => (
                          <div className="content-slide-table-row" key={row.label}>
                            <span>{row.label}</span>
                            <span>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {slide.conclusion ? (
                      <p className="content-slide-conclusion">{slide.conclusion}</p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="cover-footer">
          <span>{slide.footer}</span>
        </div>
        {showSlideNumbers ? (
          <div className="slide-number" aria-hidden="true">
            {String(activeSlide + 1).padStart(2, "0")}
          </div>
        ) : null}
      </section>

      <nav className="slide-dots slide-dots-global" aria-label="Navegação dos slides">
        {presentationSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`slide-dot ${activeSlide === index ? "slide-dot-active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
          />
        ))}
      </nav>
    </main>
  );
}


