# srv-hono-template

GitHub Template — backend TypeScript + Hono.

Stack: **Hono 4 + @hono/node-server 2 + TypeScript 6 (strict) + Node 24 LTS**.

## Requisitos

- Node **24 LTS** (o CI e a imagem Docker usam `node:24`)

## Rodar localmente

```bash
npm install
npm run dev
# GET http://localhost:3000/health → {"status":"ok"}
```

A porta vem de `PORT` (default `3000`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | tsx watch |
| `npm run build` | `tsc` → `dist/` |
| `npm start` | roda o build |
| `npm run lint` | ESLint (flat config, type-checked) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run test:cov` | Vitest + coverage |

## Docker

```bash
docker build -t srv-hono-template .
docker run -p 3000:3000 srv-hono-template
```

A imagem roda como usuário não-root (`node`) e traz `HEALTHCHECK` apontando para
o mesmo `healthPath` declarado no `forge.yaml`.

## CI

Lint + typecheck + test + build em todo push/PR. Push na branch default também
constrói e publica a imagem no GHCR.

## Pool de teste e cgroup

`scripts/cpu-limit.mjs` lê o limite de CPU do cgroup (v2 `cpu.max`, v1
`cpu.cfs_quota_us`) e alimenta `maxWorkers`/`poolOptions.threads` do Vitest em
`vitest.config.mjs`. Dentro de um container, `os.cpus()` reporta as CPUs do
**host**: sem esse ajuste o Vitest sobe workers demais e o job morre com todos os
testes passando. Fora de container (macOS local) o helper cai para
`os.cpus().length`.
