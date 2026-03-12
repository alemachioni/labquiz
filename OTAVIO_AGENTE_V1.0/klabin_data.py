# klabin_data.py
# Dataset ficticio da Klabin para fins de teste (periodo: Jan/2025 - Dez/2025)

KLABIN_DATA = {

    # -------------------------------------------------------------------------
    # TOPICO 1: Faturamento por Cliente
    # -------------------------------------------------------------------------
    "faturamento_por_cliente": {
        "descricao": "Faturamento mensal em reais por cliente ao longo de 2025",
        "unidade": "R$ (milhoes)",
        "periodo": "Janeiro 2025 a Dezembro 2025",
        "dados": [
            {
                "cliente": "Tetra Pak",
                "segmento": "Embalagens Alimenticias",
                "faturamento_mensal": {
                    "Janeiro":   12.4,
                    "Fevereiro": 11.8,
                    "Marco":     13.5,
                    "Abril":     14.2,
                    "Maio":      13.9,
                    "Junho":     15.1,
                    "Julho":     14.7,
                    "Agosto":    16.3,
                    "Setembro":  15.8,
                    "Outubro":   17.2,
                    "Novembro":  18.5,
                    "Dezembro":  20.1
                }
            },
            {
                "cliente": "Ambev",
                "segmento": "Bebidas",
                "faturamento_mensal": {
                    "Janeiro":   8.2,
                    "Fevereiro": 7.9,
                    "Marco":     9.1,
                    "Abril":     10.4,
                    "Maio":      11.2,
                    "Junho":     13.5,
                    "Julho":     14.1,
                    "Agosto":    13.8,
                    "Setembro":  12.6,
                    "Outubro":   11.9,
                    "Novembro":  10.7,
                    "Dezembro":  9.3
                }
            },
            {
                "cliente": "Magazine Luiza",
                "segmento": "Varejo / E-commerce",
                "faturamento_mensal": {
                    "Janeiro":   5.1,
                    "Fevereiro": 4.8,
                    "Marco":     5.5,
                    "Abril":     5.9,
                    "Maio":      6.2,
                    "Junho":     6.8,
                    "Julho":     7.1,
                    "Agosto":    7.5,
                    "Setembro":  8.0,
                    "Outubro":   9.3,
                    "Novembro":  12.4,
                    "Dezembro":  14.7
                }
            },
            {
                "cliente": "Unilever",
                "segmento": "Bens de Consumo",
                "faturamento_mensal": {
                    "Janeiro":   9.7,
                    "Fevereiro": 9.2,
                    "Marco":     10.1,
                    "Abril":     10.5,
                    "Maio":      10.8,
                    "Junho":     11.2,
                    "Julho":     11.5,
                    "Agosto":    11.9,
                    "Setembro":  12.1,
                    "Outubro":   12.4,
                    "Novembro":  13.0,
                    "Dezembro":  13.8
                }
            },
            {
                "cliente": "Natura",
                "segmento": "Cosmeticos",
                "faturamento_mensal": {
                    "Janeiro":   3.5,
                    "Fevereiro": 4.1,
                    "Marco":     3.8,
                    "Abril":     4.3,
                    "Maio":      4.7,
                    "Junho":     5.0,
                    "Julho":     5.2,
                    "Agosto":    5.5,
                    "Setembro":  5.8,
                    "Outubro":   6.1,
                    "Novembro":  7.4,
                    "Dezembro":  8.2
                }
            }
        ]
    },

    # -------------------------------------------------------------------------
    # TOPICO 2: Volume de Producao por Unidade
    # -------------------------------------------------------------------------
    "volume_producao_por_unidade": {
        "descricao": "Volume de producao mensal por unidade fabril em toneladas",
        "unidade": "Toneladas (mil)",
        "periodo": "Janeiro 2025 a Dezembro 2025",
        "dados": [
            {
                "unidade": "Unidade Correia Pinto - SC",
                "tipo_produto": "Papel Kraftliner",
                "producao_mensal": {
                    "Janeiro":   85.2,
                    "Fevereiro": 82.7,
                    "Marco":     88.4,
                    "Abril":     87.1,
                    "Maio":      90.3,
                    "Junho":     89.5,
                    "Julho":     91.2,
                    "Agosto":    93.4,
                    "Setembro":  92.8,
                    "Outubro":   94.1,
                    "Novembro":  93.7,
                    "Dezembro":  88.9
                }
            },
            {
                "unidade": "Unidade Otacilio Costa - SC",
                "tipo_produto": "Papel para Embalagem",
                "producao_mensal": {
                    "Janeiro":   62.1,
                    "Fevereiro": 60.5,
                    "Marco":     64.3,
                    "Abril":     63.8,
                    "Maio":      66.2,
                    "Junho":     65.9,
                    "Julho":     68.4,
                    "Agosto":    69.1,
                    "Setembro":  67.8,
                    "Outubro":   70.2,
                    "Novembro":  69.5,
                    "Dezembro":  65.3
                }
            },
            {
                "unidade": "Unidade Monte Alegre - PR",
                "tipo_produto": "Celulose e Tissue",
                "producao_mensal": {
                    "Janeiro":   110.4,
                    "Fevereiro": 108.9,
                    "Marco":     112.7,
                    "Abril":     111.3,
                    "Maio":      115.6,
                    "Junho":     114.2,
                    "Julho":     116.8,
                    "Agosto":    118.5,
                    "Setembro":  117.9,
                    "Outubro":   120.3,
                    "Novembro":  119.7,
                    "Dezembro":  113.4
                }
            }
        ]
    },

    # -------------------------------------------------------------------------
    # TOPICO 3: Indicadores Financeiros
    # -------------------------------------------------------------------------
    "indicadores_financeiros": {
        "descricao": "Indicadores financeiros consolidados da Klabin em 2025",
        "unidade": "R$ (milhoes)",
        "periodo": "Janeiro 2025 a Dezembro 2025",
        "dados": [
            {
                "indicador": "Receita Liquida",
                "valores_mensais": {
                    "Janeiro":   1240.5,
                    "Fevereiro": 1198.3,
                    "Marco":     1312.7,
                    "Abril":     1289.4,
                    "Maio":      1354.8,
                    "Junho":     1401.2,
                    "Julho":     1389.6,
                    "Agosto":    1445.3,
                    "Setembro":  1423.8,
                    "Outubro":   1478.9,
                    "Novembro":  1512.4,
                    "Dezembro":  1589.7
                }
            },
            {
                "indicador": "EBITDA",
                "valores_mensais": {
                    "Janeiro":   412.3,
                    "Fevereiro": 398.7,
                    "Marco":     435.6,
                    "Abril":     428.9,
                    "Maio":      451.2,
                    "Junho":     467.8,
                    "Julho":     462.4,
                    "Agosto":    481.5,
                    "Setembro":  475.3,
                    "Outubro":   493.7,
                    "Novembro":  508.9,
                    "Dezembro":  531.4
                }
            },
            {
                "indicador": "Lucro Liquido",
                "valores_mensais": {
                    "Janeiro":   187.4,
                    "Fevereiro": 175.2,
                    "Marco":     201.3,
                    "Abril":     196.8,
                    "Maio":      213.5,
                    "Junho":     224.7,
                    "Julho":     219.6,
                    "Agosto":    231.4,
                    "Setembro":  228.9,
                    "Outubro":   241.2,
                    "Novembro":  258.7,
                    "Dezembro":  274.3
                }
            },
            {
                "indicador": "Margem EBITDA (%)",
                "valores_mensais": {
                    "Janeiro":   33.2,
                    "Fevereiro": 33.3,
                    "Marco":     33.2,
                    "Abril":     33.3,
                    "Maio":      33.3,
                    "Junho":     33.4,
                    "Julho":     33.3,
                    "Agosto":    33.3,
                    "Setembro":  33.4,
                    "Outubro":   33.4,
                    "Novembro":  33.6,
                    "Dezembro":  33.4
                }
            }
        ]
    },

    # -------------------------------------------------------------------------
    # TOPICO 4: Estoque de Insumos
    # -------------------------------------------------------------------------
    "estoque_insumos": {
        "descricao": "Nivel de estoque mensal dos principais insumos produtivos",
        "unidade": "Toneladas",
        "periodo": "Janeiro 2025 a Dezembro 2025",
        "dados": [
            {
                "insumo": "Madeira de Eucalipto",
                "fornecedor_principal": "Fazendas Proprias Klabin",
                "estoque_mensal": {
                    "Janeiro":   48500,
                    "Fevereiro": 45200,
                    "Marco":     52100,
                    "Abril":     50800,
                    "Maio":      55300,
                    "Junho":     53700,
                    "Julho":     57200,
                    "Agosto":    58900,
                    "Setembro":  56400,
                    "Outubro":   60100,
                    "Novembro":  59300,
                    "Dezembro":  54800
                }
            },
            {
                "insumo": "Madeira de Pinus",
                "fornecedor_principal": "Fazendas Proprias Klabin",
                "estoque_mensal": {
                    "Janeiro":   31200,
                    "Fevereiro": 29800,
                    "Marco":     33500,
                    "Abril":     32700,
                    "Maio":      35100,
                    "Junho":     34200,
                    "Julho":     36800,
                    "Agosto":    37500,
                    "Setembro":  36100,
                    "Outubro":   38700,
                    "Novembro":  37900,
                    "Dezembro":  35200
                }
            },
            {
                "insumo": "Carbonato de Calcio",
                "fornecedor_principal": "Omya Brasil",
                "estoque_mensal": {
                    "Janeiro":   2800,
                    "Fevereiro": 2650,
                    "Marco":     3100,
                    "Abril":     2950,
                    "Maio":      3300,
                    "Junho":     3150,
                    "Julho":     3450,
                    "Agosto":    3600,
                    "Setembro":  3400,
                    "Outubro":   3750,
                    "Novembro":  3650,
                    "Dezembro":  3200
                }
            },
            {
                "insumo": "Caulim",
                "fornecedor_principal": "IMERYS Brasil",
                "estoque_mensal": {
                    "Janeiro":   1950,
                    "Fevereiro": 1820,
                    "Marco":     2100,
                    "Abril":     2010,
                    "Maio":      2250,
                    "Junho":     2150,
                    "Julho":     2380,
                    "Agosto":    2490,
                    "Setembro":  2340,
                    "Outubro":   2570,
                    "Novembro":  2480,
                    "Dezembro":  2210
                }
            },
            {
                "insumo": "Amido de Milho",
                "fornecedor_principal": "Cargill Brasil",
                "estoque_mensal": {
                    "Janeiro":   890,
                    "Fevereiro": 840,
                    "Marco":     950,
                    "Abril":     920,
                    "Maio":      1010,
                    "Junho":     980,
                    "Julho":     1050,
                    "Agosto":    1090,
                    "Setembro":  1040,
                    "Outubro":   1120,
                    "Novembro":  1080,
                    "Dezembro":  970
                }
            }
        ]
    },

    # -------------------------------------------------------------------------
    # TOPICO 5: Desempenho Logistico
    # -------------------------------------------------------------------------
    "desempenho_logistico": {
        "descricao": "Indicadores de desempenho logistico por modal de transporte",
        "unidade": "Variado (ver cada indicador)",
        "periodo": "Janeiro 2025 a Dezembro 2025",
        "dados": [
            {
                "modal": "Rodoviario",
                "indicadores": {
                    "entregas_no_prazo_pct": {
                        "Janeiro": 94.2, "Fevereiro": 93.8, "Marco": 95.1,
                        "Abril": 94.7, "Maio": 95.8, "Junho": 96.2,
                        "Julho": 95.9, "Agosto": 96.5, "Setembro": 96.1,
                        "Outubro": 97.0, "Novembro": 96.8, "Dezembro": 95.3
                    },
                    "volume_transportado_ton": {
                        "Janeiro": 45200, "Fevereiro": 43100, "Marco": 47800,
                        "Abril": 46500, "Maio": 49300, "Junho": 51200,
                        "Julho": 50800, "Agosto": 53100, "Setembro": 52400,
                        "Outubro": 54700, "Novembro": 55300, "Dezembro": 51900
                    },
                    "custo_por_tonelada_R$": {
                        "Janeiro": 87.5, "Fevereiro": 88.2, "Marco": 86.9,
                        "Abril": 87.8, "Maio": 86.4, "Junho": 85.9,
                        "Julho": 86.1, "Agosto": 85.5, "Setembro": 85.8,
                        "Outubro": 85.2, "Novembro": 85.0, "Dezembro": 86.3
                    }
                }
            },
            {
                "modal": "Ferroviario",
                "indicadores": {
                    "entregas_no_prazo_pct": {
                        "Janeiro": 91.5, "Fevereiro": 90.8, "Marco": 92.3,
                        "Abril": 91.9, "Maio": 93.1, "Junho": 93.7,
                        "Julho": 93.4, "Agosto": 94.2, "Setembro": 93.8,
                        "Outubro": 94.8, "Novembro": 94.5, "Dezembro": 92.9
                    },
                    "volume_transportado_ton": {
                        "Janeiro": 28700, "Fevereiro": 27200, "Marco": 30500,
                        "Abril": 29800, "Maio": 31900, "Junho": 33200,
                        "Julho": 32800, "Agosto": 34500, "Setembro": 33900,
                        "Outubro": 35800, "Novembro": 36200, "Dezembro": 33700
                    },
                    "custo_por_tonelada_R$": {
                        "Janeiro": 54.2, "Fevereiro": 54.8, "Marco": 53.9,
                        "Abril": 54.5, "Maio": 53.4, "Junho": 53.1,
                        "Julho": 53.3, "Agosto": 52.8, "Setembro": 53.0,
                        "Outubro": 52.5, "Novembro": 52.3, "Dezembro": 53.6
                    }
                }
            },
            {
                "modal": "Maritimo (Exportacao)",
                "indicadores": {
                    "entregas_no_prazo_pct": {
                        "Janeiro": 88.4, "Fevereiro": 87.9, "Marco": 89.7,
                        "Abril": 89.2, "Maio": 90.5, "Junho": 91.3,
                        "Julho": 90.9, "Agosto": 92.1, "Setembro": 91.6,
                        "Outubro": 93.0, "Novembro": 92.7, "Dezembro": 90.2
                    },
                    "volume_transportado_ton": {
                        "Janeiro": 18500, "Fevereiro": 17200, "Marco": 20100,
                        "Abril": 19400, "Maio": 21300, "Junho": 22800,
                        "Julho": 22100, "Agosto": 24500, "Setembro": 23700,
                        "Outubro": 25900, "Novembro": 26400, "Dezembro": 23100
                    },
                    "custo_por_tonelada_R$": {
                        "Janeiro": 142.5, "Fevereiro": 143.8, "Marco": 141.2,
                        "Abril": 142.9, "Maio": 140.7, "Junho": 139.8,
                        "Julho": 140.2, "Agosto": 139.1, "Setembro": 139.5,
                        "Outubro": 138.4, "Novembro": 138.1, "Dezembro": 140.6
                    }
                }
            }
        ]
    }
}
