# Time Híbrido

App pessoal de treino. Objetivo **emagrecimento**: musculação 4x por semana + 60 min de
cardio em cinco dias, em intensidade leve a moderada.

**App:** https://leonardobarroz251-svg.github.io/treino-hibrido/

## A semana

| Dia | Treino |
|---|---|
| Segunda | A · Peito e tríceps + cardio |
| Terça | B · Costas e bíceps + cardio |
| Quarta | Cardio 60 min |
| Quinta | C · Pernas e abdômen + cardio |
| Sexta | D · Ombros e complementar + cardio |
| Sábado | Cardio 60 min |
| Domingo | Descanso |

Equipamento: estação de polia/crossover, halteres, banco regulável, Smith e peso do corpo.

## O que faz

- **Semana** — o treino de hoje, progresso da semana e sequência de semanas treinadas.
- **Musculação (A / B / C / D)** — cada exercício mostra grupo muscular, séries e
  repetições, descanso, vídeo e uma dica de execução. Registro de carga e repetições por
  série, timer de descanso automático e memória da última carga de cada exercício. Cada
  dia fecha com o bloco de cardio.
- **Cardio** — player de 60 min contínuos (5 min de aquecimento em Z1, 50 min em Z2 e
  5 min de desaquecimento) com apito, vibração e a zona-alvo em bpm.
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

O objeto `PLANO`, no topo do `<script>` em `index.html`, é a fonte da verdade. Cada
bloco tem um `tipo` — o grupo muscular, que aparece acima do nome do exercício — e cada
exercício tem `reps`, `descanso`, `video` (id do YouTube) e `dica`.

Trocar o `id` de um exercício zera a memória de carga dele, porque `cargas` e o gráfico
de evolução são indexados por esse id. O histórico já gravado não se perde: cada série
guarda também o nome do exercício.

Ao mudar a estrutura dos treinos, suba `PLANO_V` — isso devolve a agenda ao padrão e
descarta um treino em andamento, cujas marcas são por posição de bloco. E suba o
`VERSAO` em `sw.js` para invalidar o cache antigo.

---

Conteúdo baseado em planilha de treino com acompanhamento profissional (CREF-SC 025279).
Uso pessoal e informativo — não substitui acompanhamento presencial.
