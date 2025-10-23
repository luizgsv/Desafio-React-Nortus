// src/types/dashboard.ts

export type DashboardResponse = {
  /** KPIs em formato de série temporal (gráficos de linha/barra) */
  kpisTrend: {
    labels: string[];
    arpuTrend: KpiTrend;
    conversionTrend: KpiTrend;
    churnTrend: KpiTrend;
    retentionTrend: KpiTrend;
  };

  /** Resumo dos indicadores principais (cards de KPIs) */
  kpisResume: {
    arpu: KpiResume;
    conversion: KpiResume;
    retention: KpiResume;
    churn: KpiResume;
  };

  /** Segmentos de impacto (para gráfico de pizza/barras por tipo de seguro) */
  segments: SegmentImpact[];

  /** Clientes ativos e filtros para tabela e mapa */
  activeClients: {
    filters: {
      status: string[];
      secureType: string[];
      locations: string[];
    };
    data: ActiveClient[];
  };
};

/** Série de tendência para um KPI */
export type KpiTrend = {
  name: string;
  data: number[];
};

/** Resumo numérico e variação percentual */
export type KpiResume = {
  valor: number;
  variacao: number;
};

/** Segmento de impacto (ex: Automóvel, Residencial, etc.) */
export type SegmentImpact = {
  nome: string;
  valor: number;
};

/** Cliente ativo no dashboard */
export type ActiveClient = {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: string;
  renewalDate: string;
  location: string;
};
