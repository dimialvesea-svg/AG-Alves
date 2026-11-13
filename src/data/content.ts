export interface ProblemItem {
  number: string;
  title: string;
  description: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const NAV_LINKS = [
  { label: 'Desafios', href: '#desafios' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Dúvidas', href: '#duvidas' },
] as const;

export const PROBLEMS: ProblemItem[] = [
  {
    number: '01',
    title: 'Sua empresa precisa conquistar novos clientes.',
    description:
      'Sem um canal previsível de aquisição, o crescimento comercial fica limitado e dependente de esforços pontuais.',
  },
  {
    number: '02',
    title: 'Você investe em anúncios, mas não sabe se eles estão trazendo resultados.',
    description:
      'Impulsionar publicações ou rodar campanhas sem rastreamento claro impede saber o que realmente gera contatos.',
  },
  {
    number: '03',
    title: 'Seu negócio ainda tem pouca visibilidade na internet.',
    description:
      'Quando potenciais clientes pesquisam pelo que você oferece, encontram seus concorrentes antes da sua empresa.',
  },
  {
    number: '04',
    title: 'Você depende muito de indicações para conseguir novos clientes.',
    description:
      'Indicações são valiosas, mas não oferecem controle sobre o volume ou a constância das oportunidades comerciais.',
  },
  {
    number: '05',
    title: 'Suas campanhas não possuem acompanhamento adequado.',
    description:
      'Anúncios sem análise periódica de métricas e ajustes contínuos acabam desperdiçando orçamento.',
  },
  {
    number: '06',
    title: 'Você deseja crescer, mas não sabe qual estratégia digital utilizar.',
    description:
      'Com tantas plataformas e formatos disponíveis, fica difícil decidir onde concentrar tempo e investimento.',
  },
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'google-ads',
    title: 'Google Ads',
    category: 'Demanda ativa',
    description:
      'Campanhas de pesquisa para alcançar pessoas que já procuram pelos produtos ou serviços oferecidos pela sua empresa.',
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads',
    category: 'Alcance e interesse',
    description:
      'Estratégias de anúncios no Facebook e Instagram para ampliar a visibilidade, despertar interesse e gerar oportunidades comerciais.',
  },
  {
    id: 'geracao-leads',
    title: 'Geração de Leads',
    category: 'Captação comercial',
    description:
      'Estruturação de campanhas e estratégias para atrair potenciais clientes e estimular contatos comerciais.',
  },
  {
    id: 'marketing-estrategico',
    title: 'Marketing Estratégico',
    category: 'Direcionamento',
    description:
      'Planejamento de ações digitais alinhadas aos objetivos e à realidade da empresa.',
  },
  {
    id: 'presenca-digital',
    title: 'Presença Digital',
    category: 'Posicionamento',
    description:
      'Fortalecimento da presença da empresa nos canais digitais, incluindo Perfil da Empresa no Google.',
  },
  {
    id: 'mensuracao-otimizacao',
    title: 'Mensuração e Otimização',
    category: 'Inteligência de dados',
    description:
      'Acompanhamento de indicadores, análise de conversões e melhoria contínua das campanhas.',
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01',
    title: 'DIAGNÓSTICO',
    description: 'Conhecemos a empresa, seus produtos, serviços, público e desafios comerciais.',
  },
  {
    number: '02',
    title: 'PLANEJAMENTO',
    description: 'Definimos objetivos, público-alvo, canais e estratégias de divulgação.',
  },
  {
    number: '03',
    title: 'EXECUÇÃO',
    description: 'Estruturamos campanhas e ações de marketing digital.',
  },
  {
    number: '04',
    title: 'MENSURAÇÃO',
    description: 'Acompanhamos indicadores, contatos, conversões e desempenho.',
  },
  {
    number: '05',
    title: 'OTIMIZAÇÃO',
    description: 'Analisamos os dados e identificamos oportunidades de melhoria.',
  },
];

export const CHALLENGE_OPTIONS = [
  'Preciso conquistar novos clientes.',
  'Quero aumentar minhas vendas.',
  'Preciso melhorar minha presença digital.',
  'Já anuncio, mas quero melhorar os resultados.',
  'Quero começar a investir em marketing digital.',
  'Preciso de orientação estratégica.',
] as const;

export const AD_STATUS_OPTIONS = [
  'Sim, Google Ads.',
  'Sim, Facebook e Instagram.',
  'Sim, em ambas as plataformas.',
  'Não, ainda não anuncio.',
] as const;

export const FAQS: FaqItem[] = [
  {
    question: 'A AG Alves atende empresas de outros estados?',
    answer: 'Sim. O atendimento pode ser realizado online para empresas de todo o Brasil.',
  },
  {
    question: 'Preciso já anunciar no Google ou Instagram?',
    answer:
      'Não. Podemos avaliar a situação da sua empresa e identificar os canais mais adequados para iniciar.',
  },
  {
    question: 'O diagnóstico é gratuito?',
    answer:
      'Sim. O primeiro diagnóstico estratégico é uma oportunidade para conhecer a empresa, compreender seus desafios e identificar possibilidades de atuação.',
  },
  {
    question: 'Qual é o valor para contratar os serviços?',
    answer:
      'O investimento depende dos objetivos, das necessidades e do escopo de trabalho. Após o diagnóstico, podemos apresentar uma proposta comercial adequada.',
  },
  {
    question: 'A AG Alves garante aumento nas vendas?',
    answer:
      'Não trabalhamos com promessas de resultados garantidos. Desenvolvemos estratégias, acompanhamos indicadores e buscamos melhorar continuamente o desempenho das ações de marketing.',
  },
];
