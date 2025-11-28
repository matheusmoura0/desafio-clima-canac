# 🌾 Canac Clima - Monitoramento para Produtores de Cana

Aplicação Fullstack desenvolvida como parte do desafio técnico para a vaga de Engenheiro de Software. O objetivo é fornecer dados climáticos precisos e contextualizados para auxiliar produtores de cana-de-açúcar na tomada de decisão.

## 📋 Sobre o Projeto

A solução conecta o produtor rural a dados meteorológicos críticos em tempo real. Diferente de uma previsão do tempo comum, a interface e os dados foram pensados para o contexto agrícola:
- **Precipitação:** Fundamental para o planejamento de irrigação.
- **Temperatura:** Monitoramento de estresse térmico ou risco de geada.
- **Umidade e Vento:** Dados essenciais para a aplicação segura de defensivos agrícolas.

## 🛠 Tech Stack

### Backend
- **Python 3.11 + FastAPI:** Escolhido pela alta performance (async) e geração automática de documentação.
- **HTTPX:** Para requisições assíncronas não bloqueantes à API externa.
- **Pydantic:** Para validação rigorosa de dados.

### Frontend
- **Next.js 14 (App Router):** Framework React moderno para renderização eficiente.
- **TypeScript:** Garante segurança de tipos e reduz bugs em produção.
- **Tailwind CSS:** Para estilização rápida, responsiva e limpa.

### Infraestrutura
- **Docker & Docker Compose:** Containerização completa da aplicação, garantindo que o ambiente de desenvolvimento seja replicável em qualquer máquina com um único comando.

## 🚀 Como Rodar o Projeto

A aplicação foi desenhada para ser agnóstica ao sistema operacional (Windows, Mac, Linux).

### Pré-requisitos
- Docker e Docker Compose instalados.
- Git instalado.

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone git@github.com:matheusmoura0/desafio-clima-canac.git
   cd desafio-clima-canac
