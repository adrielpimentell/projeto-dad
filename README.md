# Painel Tipado

Painel da turma com duas telas — **Chamada** (presença) e **Entregas** — sobre um mesmo estado `Aluno[]`, tipado a fundo. Projeto da Semana 07 de DAD (React + TypeScript).

## Rodar

    npm install     # instala as dependências (usa o package-lock.json — versões travadas)
    Copy-Item .env.example .env   # a URL dos dados (VITE_API_URL / VITE_RESUMO_URL)
    npm run dev     # sobe o servidor de desenvolvimento (Vite)

Abra a URL que o Vite mostrar (ex.: http://localhost:5173).

## Scripts

- `npm run dev` — servidor de desenvolvimento com HMR.
- `npm run build` — checa os tipos (`tsc -b`) e gera o `dist/`. **É o portão de tipo.**
- `npm run lint` — roda o oxlint (a regra `no-explicit-any` está ligada: `any` é proibido).
- `npm run preview` — serve o `dist/` já compilado.

## Convenções

- Domínio (os tipos do projeto) em `src/types/`.
- Um componente por pasta em `src/components/<Nome>/index.tsx`.
- Node: use a versão de `.nvmrc` (`nvm use`).
