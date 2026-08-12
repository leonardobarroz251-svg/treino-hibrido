# Time Híbrido

App pessoal de treino, feito a partir da planilha **Desafio Atleta Híbrido** — corrida 3x
e musculação 3x por semana.

**App:** https://leonardobarroz251-svg.github.io/treino-hibrido/

## O que faz

- **Semana** — o treino de hoje, progresso da semana e sequência de semanas treinadas.
- **Musculação (A / B / C)** — blocos e bi-sets, registro de carga e repetições por série,
  timer de descanso automático. Lembra a última carga de cada exercício.
- **Corrida** — player que conduz o intervalado (aquecimento, tiros, recuperação,
  desaquecimento) com apito, vibração e a zona-alvo em bpm.
- **Progresso** — histórico, mapa de constância e evolução de carga por exercício.

## Como funciona

Página única, sem dependências e sem servidor. Tudo roda no navegador e os dados ficam
no `localStorage` do próprio aparelho — nada é enviado para lugar nenhum. O backup é
manual, em **Ajustes → Exportar JSON**.

Como os dados são por navegador, celular e computador têm históricos separados.
Para juntar, exporte de um e importe no outro.

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | O app inteiro: estilos, dados do plano e lógica |
| `sw.js` | Service worker — faz o app abrir sem internet |
| `manifest.webmanifest` | Metadados de instalação (nome, ícone, tela cheia) |
| `icon-192.png`, `icon-512.png` | Ícone da tela inicial |

## Mexer no plano

O objeto `PLANO`, no topo do `<script>` em `index.html`, é a fonte da verdade: dias de
corrida, blocos de musculação, séries e repetições. Cada exercício tem os campos `video`
e `dica` — preencher `video` liga a demonstração na tela, sem precisar mexer na interface.

Ao publicar uma versão nova, suba o `VERSAO` em `sw.js` para invalidar o cache antigo.

---

Conteúdo baseado em planilha de treino com acompanhamento profissional (CREF-SC 025279).
Uso pessoal e informativo — não substitui acompanhamento presencial.
