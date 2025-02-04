# POC K6 - Teste de Performance 🚀

[![k6](https://img.shields.io/badge/k6-v0.45.0-blue)](https://k6.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> POC de teste de performance usando K6, focado em cenários de teste de carga e stress.

## Visão Geral 🎯

K6 é uma ferramenta de teste de carga open-source que permite testes de performance eficientes para equipes de engenharia. Esta POC demonstra padrões de implementação e execução de testes de performance usando k6.

## Pré-requisitos 📋

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [K6](https://k6.io/docs/getting-started/installation/)
- [Docker](https://www.docker.com/) (opcional)

## Início Rápido ⚡

```bash
# Instalação no macOS
brew install k6

# Instalação via Docker
docker pull grafana/k6
```

## Estrutura do Projeto 📁

```
├── tests/            # Suítes de teste
├── config/           # Arquivos de configuração
│   └── k6.config.js  # Configurações globais
├── scripts/
│   ├── load/        # Scripts de teste de carga
│   │   ├── endpoints.js
│   │   └── scenarios.js
│   ├── stress/      # Scripts de teste de stress
│   │   └── spike-test.js
│   └── utils/       # Funções auxiliares
│       └── helpers.js
├── data/            # Dados de teste
│   └── users.csv
├── results/         # Relatórios de teste
└── README.md
```

## Executando Testes 🚀

### Teste de Carga Básico

```bash
k6 run scripts/load/endpoints.js
```

### Teste com Variáveis de Ambiente

```bash
k6 run -e BASE_URL=https://api.dev.com scripts/load/endpoints.js
```

### Teste via Docker

```bash
docker run -i grafana/k6 run - <scripts/load/endpoints.js
```

## Configuração ⚙️

### Limites Padrão

```javascript
export const options = {
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};
```

### Perfis de Carga

```javascript
stages: [
  { duration: "1m", target: 100 }, // Aumento gradual
  { duration: "3m", target: 100 }, // Estabilização
  { duration: "1m", target: 0 }, // Redução gradual
];
```

## Relatórios 📊

Os resultados são exportados para:

- JSON: `results/metrics.json`
- HTML: `results/report.html`

## Contribuição 🤝

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFeature`)
3. Faça commit das alterações (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## Documentação 📘

- [Documentação Oficial K6](https://k6.io/docs/)
- [Guia de Métricas](https://k6.io/docs/using-k6/metrics/)
- [Exemplos de Scripts](https://k6.io/docs/examples/)
