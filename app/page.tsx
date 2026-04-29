"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
      "As sociedades como diferimento de tributação do rendimento.",
      "Alvos: Futebolistas, Artistas e Profissionais Liberais.",
      "A utilização de estruturas societárias para converter rendimentos que seriam tributados em IRS (esfera individual) para o regime mais favorável do IRC (esfera coletiva) [cite: 1, p. 38].",
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
      "Desconsideração da estrutura societária.",
      "Consequência: Tributação direta na esfera do IRS.",
      "O tribunal considerou que os serviços eram prestados pessoalmente, faltando substância económica à estrutura utilizada para justificar a tributação em sede de IRC [cite: 1, p. 35, 38].",
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
      "Prestação de serviços: Pessoal vs. Formal.",
      "O conflito de esferas: A dificuldade de dissociar a atividade da figura pública da atividade da sociedade controlada pela própria [cite: 1, p. 39-40].",
    ],
    footer: sharedFooter,
  },
  {
    id: "choque-financeiro",
    kind: "content",
    kicker: "Impacto",
    heading: "O Choque Financeiro",
    bullets: [
      "Liquidações Corretivas e Juros.",
      "Desconsideração de algumas deduções de custos.",
      "Risco de litigância de má-fé.",
    ],
    footer: sharedFooter,
  },
  {
    id: "autonomia-privada",
    kind: "content",
    kicker: "Princípios",
    heading: "Autonomia Privada",
    bullets: [
      "Liberdade de iniciativa e gestão empresarial.",
      "Base: Artigos 61.o e 80.o da Constituição da República Portuguesa (CRP) [cite: 1, p. 9].",
    ],
    footer: sharedFooter,
  },
  {
    id: "homo-economicus",
    kind: "content",
    kicker: "Princípios",
    heading: 'O "Homo Economicus"',
    bullets: [
      "A procura legítima pela via menos onerosa.",
      `Citação: "O contribuinte agindo como um 'homo economicus' que procura maximizar os seus proveitos vai estar permanentemente atento às consequências fiscais e económicas dos seus negócios" [cite: 1, p. 9].`,
    ],
    footer: sharedFooter,
  },
  {
    id: "dever-fundamental",
    kind: "content",
    kicker: "Princípios",
    heading: "O Dever Fundamental",
    bullets: [
      "O pagamento de impostos como dever social e de cidadania [cite: 1, p. 10].",
      "Capacidade Contributiva: Artigos 103.o e 104.o da CRP [cite: 1, p. 10].",
    ],
    footer: sharedFooter,
  },
  {
    id: "valvula-seguranca",
    kind: "content",
    kicker: "Princípios",
    heading: 'A "Válvula de Segurança"',
    bullets: [
      "Será necessária uma Cláusula Geral?",
      "Problema: Os mecanismos de elisão fiscal são de desenvolvimento mais rápido que o processo legislativo que os visa combater.",
      "Combater a elisão onde a lei específica falha: A CGAA permite ao Estado reagir a montagens artificiais que frustram o espírito da lei, mesmo que respeitem formalmente a sua letra",
    ],
    footer: sharedFooter,
  },
  {
    id: "receita-vs-competitividade",
    kind: "content",
    kicker: "Conflitos",
    heading: "Receita vs. Competitividade",
    bullets: [
      "O Estado é um competidor no mercado global.",
      '"Não há nada abaixo do zero": A renúncia à tributação como estratégia de retenção de capital.',
      
    ],
    footer: sharedFooter,
  },
  {
    id: "mecanismos-invisiveis",
    kind: "content",
    kicker: "Conflitos",
    heading: "Mecanismos Invisíveis",
    bullets: [
      "Países exportadores e a renúncia à tributação.",
      "O Abuso de Direito pode ser previsivel, calculável e, por vezes, vantajoso.",
      "O Objetivo dos grandes exportadores poderá ser: Evitar que as empresas procurem outros países com regimes fiscais mais favoráveis. Garantindo que as suas empresas não pagam imposto no estrangeiro, garantem que não mudam a sua estrutura para outros países.",
    ],
    footer: sharedFooter,
  },
  {
    id: "autonomia-protecao-erario",
    kind: "content",
    kicker: "Conflitos",
    heading: "Autonomia vs. Proteção do Erário",
    bullets: [
      "Derrogação da autonomia para proteger o Estado.",
      "O conflito é entre a liberdade que deve ser conferida ao contribuinte e a necessidade de precaver situações em que a atuação do contribuinte coloca em risco os interesses do Estado",
    ],
    footer: sharedFooter,
  },
  {
    id: "preco-justica",
    kind: "content",
    kicker: "Conflitos",
    heading: "O Preço da Justiça",
    bullets: [
      "A CGAA é forçosamente uma fonte de insegurança jurídica, especialmente face ao uso constante de conceitos indeterminados.",
      "Será a insegurança jurídica uma condição necessária?",
      "Justiça material (tributar de acordo com a realidade) vs. Previsibilidade (certeza do direito)",
      "Que valor pesa mais na balança?",
    ],
    footer: sharedFooter,
  },
  {
    id: "estatisticas-caad",
    kind: "content",
    kicker: "A Realidade nos Tribunais",
    heading: "Estatísticas CAAD (2013-2023)",
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
      "Verificaram-se nos casos de aplicação da CGAA que os tribunais foram rígidos na verificação de requisitos cumulativos.",
      "A AT perde a maioria dos processos arbitrais devido a falhas na fundamentação ou prova dos elementos do abuso.",
    ],
    footer: sharedFooter,
  },
  {
    id: "evolucao-cgaa",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "Evolução da CGAA",
    bullets: [
      "Janeiro de 1999 Versão originária da CGAA 2019, na altura no artigo 32º-A do CPPT.",
      "A CGAA na sua versão de janeiro de 1999 nunca foi utilizada, tendo sido rápidamente substituída em julho de 1999, passando a configurar no artigo 38º/2 LGT.",
      " Só com a introdução da lei nº 30-G/2000, de 29 de dezembro, que a CGAA veio assumir contornos de eficácia no sistema fiscal português.",
      "Em 2012 o G20 defendem a necessidade de prevensão do BEPS. A posterior Ação 6 do projeto BEPS da OCDE recomenda a implementação de cláusulas gerais anti-abuso. (Principal Pourpose Test - PPT).",
      "Entre 2013 e 2015 houve um aumento de casos de CGAA em Portugal, face ao problema da transformação de sociedades por quotas em sociedades anónimas para beneficiar de regime fiscal mais favorável na transmissão.",
      "A Convenção modelo da OCDE absorveu este critério.",
      "Em 2016 a ATAD estabelece um nível minimo de proteção contra a elisão fiscal. Na ATAD surge a CGAA inspirada na OCDE, com o objetivo de ser aplicada em todos os EM.",
      "O TJUE desempenhou um papel essencial na construção da atual CGAA europeia.",
      "2019 - Transposição da ATAD 1 faz surgir a alteração da CGAA portuguesa.  ",
    ],
    footer: sharedFooter,
  },
  {
    id: "garantias-contribuinte",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "Garantias do Contribuinte",
    bullets: [
      "A utilização da Cláusula Geral Anti-Abuso por parte da AT carece de ser cumprido o Procedimento Próprio previsto no Art. 63.o do CPPT, que protege o contribuinte contra atos arbitrários e injustificados.",
      "O contribuinte tem o Direito de audição prévia e a possibilidade de obter informações vinculativas que afastam a aplicação da cláusula",
    ],
    footer: sharedFooter,
  },
  {
    id: "onus-prova",
    kind: "content",
    kicker: "Requisitos e Procedimento",
    heading: "O Ónus da Prova",
    bullets: [
      "O ónus da prova cabe inteiramente à Autoridade Tributária, significa que deve ser por esta feita a demonstração dos pressupostos.",
      "É proibida a utilização de suposições ou presunções: A fundamentação deve ser clara, específica e circunstanciada, o que se pode verificar pela profundidade das inspeções tributárias levadas a cabo nos casos decididos contra o contribuinte.",
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-meio",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 1: Meio",
    bullets: [
      "O Elemento Meio é a forma utilizada pelo constribuinte.",
      "São as Construções ou séries de construções realizadas com abuso das formas jurídicas ou que não sejam consideradas genuinas",
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
      "Artigo 38º/3 b) LGT - Análise de várias etapas coordenadas temporalmente.",
      "Uma construção pode ser constituída por mais do que uma etapa ou parte",
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
      "Ausência de razões económicas válidas.",
      "Critério: A estrutura deve refletir a substância económica e comercial real, não sendo puramente artificial.",
      'Será artificial se for uma construção "não genuína".',
      "Na versão anterior tinha de ser Fraudulenta ou Artificiosa",
      "Acordão do TJUE - Foggia ajuda-nos a compreender que “razões económicas válidas” correspondem a construções que vão para lá da simples tentativa de obter uma vantagem fiscal. Esta doutrina do acórdão foggia, no entanto, já está desatualizada na medida em que se exige hoje apenas que uma das finalidades principais seja a de obter uma vantagem fiscal, como veremos quanto ao elemento Intelectual.  ",

    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-resultado",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 2: Resultado",
    bullets: [
      "O Elemento Resultado é a vantagem fiscal obtida.",
      "Tem de ser uma vantagem fiscal indevida (redução, eliminação ou diferimento) que frustre o objeto ou a finalidade do direito fiscal aplicável.",
      "A elisão fiscal decorre imediatamente disto, na medida em que consiste na prática de comportamentos não desejados pelo legislador no espírito das suas normas.",
      "Com a transposição da ATAD, o Elemento Resultado, já não encontra tantas limitações como antes."
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-intelectual",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 3: Intelectual (PPT)",
    bullets: [
      'Lei após ATAD: "Uma das finalidades principais" de obter vantagem fiscal. Adota o PPT desenvolvido pela OCDE',
      "Mudança para um cariz mais abrangente em relação à versão anterior, onde a vantagem tinha de ser o objetivo principal",
      "Esta nova formulação está muito orientada por uma preocupação global de combater a elisão fiscal e pelo reconhecimento de que não estender o âmbito de aplicação da CGAA poderia levar a uma aplicação muito mitigada deste instituto",
      "No entanto, é um dado lógico e adquirido por qualquer país que entre duas opções igualmente custosas para o SP ele escolherá aquela que tenha uma vantagem fiscal, sendo até essa mesma a intenção do legislador muitas vezes. Por esse motivo todos estes elementos têm de ser considerados em conjunto",
    ],
    footer: sharedFooter,
  },
  {
    id: "prova-diabolica",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: 'A "Prova Diabólica"',
    bullets: [
      "O Elemento Intelectual é a intenção do contribuinte.",
      "É muito difícil de provar a intenção subjetiva do contribuinte.",
      "Há o risco de a norma abranger decisões lícitas de gestão tomadas com eficiência fiscal em mente.",
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-normativo",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 4: Normativo",
    bullets: [
      "O Elemento Normativo não está expresso na lei.",
      "É a reprovação pelo espírito da norma da vantagem obtida, ainda que formal e expressamente a lei não a reprove.",
      "A conduta, embora lícita formalmente, é orientada para um ganho abusivo contrário ao sistema jurídico-tributário global",
      "Tem de ser “clara e inequívoca a intenção do legislador de tributar” as operações postas em prática pelo contribuinte. Só assim se poderá censurar o contribuinte.",
    ],
    footer: sharedFooter,
  },
  {
    id: "elemento-sancionatorio",
    kind: "content",
    kicker: "Os 5 Elementos",
    heading: "Elemento 5: Sancionatório",
    bullets: [
      "A ATAD dá liberdade aos EM para definirem um elemento sancionatório.",
      "O Elemento Sancionatório está estabelecido na estatuição da norma e apenas se verificará se os elementos anteriores estiverem todos preenchidos",
      "O Efeito normal é a ineficácia tributária dos atos e negócios. Ou seja, a desconsideração da construção, consequente ineficácia da mesma",
      'A isto segue-se a Reconstrução: Tributação de acordo com os negócios ou atos ("construção") que correspondam à substância económica real.',
    ],
    footer: sharedFooter,
  },
  {
    id: "casos-estudo",
    kind: "module",
    kicker: "Private Clients",
    heading: "Casos atuais",
    subheading: "",
    footer: sharedFooter,
  },
  {
    id: "fernando-santos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Fernando Santos",
    bullets: [
      "TEMA: [CGAA] Sociedade sem substância económica.",
      "Gastos não relacionados com a atividade prosseguida e atividade insuficiente para justificar a opção pela sociedade.",
      "A liberdade na prestação de serviços era limitada pelos contratos assinados com a Seleção.",
      "Sociedade como um mero veículo de contratação",
    ],
    footer: sharedFooter,
  },
  {
    id: "manuel-luis-goucha",
    kind: "content",
    kicker: "Private Clients",
    heading: "Manuel Luís Goucha",
    bullets: [
      "TEMA: [CGAA] Cariz pessoal das prestações sem justificação para a opção pela sociedade.",
      "Configuração como rendimentos pessoais (Categoria B) em vez de rendimentos empresariais (IRC).",
    ],
    footer: sharedFooter,
  },
  {
    id: "cristina-ferreira",
    kind: "content",
    kicker: "Private Clients",
    heading: "Cristina Ferreira",
    bullets: [
      "TEMA: Desconsideração de gastos como fiscalmente relevantes em sede de IRC.",
      "Tributação em IRS como rendimentos de capitais (Categoria E) devido à confusão de esferas pessoal e empresarial.",
    ],
    footer: sharedFooter,
  },
  {
    id: "joana-vasconcelos",
    kind: "content",
    kicker: "Private Clients",
    heading: "Joana Vasconcelos",
    bullets: [
      "TEMA: Consideração da sociedade como transparente.",
      "Consequência: Imputação direta dos lucros aos sócios e tributação em sede de IRS.",
    ],
    footer: sharedFooter,
  },

  {
    id: "dilema-gestor",
    kind: "content",
    kicker: "Por Resolver",
    heading: "O Dilema do Gestor",
    bullets: [
      "Pergunta: Pode um gestor diligente ignorar o impacto fiscal das suas decisões?",
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
      "Pergunta: Estão certas atividades (como artistas e desportistas) mais propensas a ser alvo da CGAA?",
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
      'Pergunta: É o "mar de incerteza" evitável num sistema fiscal globalizado?',
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        setActiveSlide((current) =>
          Math.min(current + 1, presentationSlides.length - 1),
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveSlide((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    ? "Consequ\u00eancia: Tributa\u00e7\u00e3o direta na esfera do IRS."
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
    slide.kind === "content" && slide.kicker === "Módulo 6 | Os 5 Elementos"
      ? getModule6ActiveElement(slide.heading)
      : null;
  const module6TargetIndexes = module6ElementSlideTargets.map((targetId) =>
    presentationSlides.findIndex((item) => item.id === targetId),
  );
  const privateClientCardImage =
    slide.kind === "content" ? privateClientCardImages[slide.id] : undefined;
  const formattedAmount =
    slide.kind === "content" && slide.highlightAmount
      ? `${new Intl.NumberFormat("pt-PT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(animatedAmount)}\u20ac`
      : null;

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
                      onClick={() => setActiveSlide(module6TargetIndexes[index])}
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
                      {slide.bullets ? (
                        <ul className="content-slide-list">
                          {slide.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
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
                    <h2>
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
                          aria-label="Comparação entre atividade pessoal e estrutura societária"
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
                          A procura legitima pela via menos onerosa
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
                          que procura maximizar os seus proveitos vai estar
                          permanentemente atento às consequências fiscais e
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
                    {slide.bullets &&
                    slide.id !== "fenomeno" &&
                    !isAutonomiaPrivadaSlide &&
                    !isDeverFundamentalSlide &&
                    !isHomoEconomicusSlide &&
                    slide.id !== "choque-financeiro" &&
                    !isImpactCaseSlide ? (
                      <ul className="content-slide-list">
                        {slide.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
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
            onClick={() => setActiveSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
          />
        ))}
      </nav>
    </main>
  );
}









