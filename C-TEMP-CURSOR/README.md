# Playwright — CMA TROM TRADING-BRASIL

Projeto Playwright padrão para testar o login em:

https://ctdevwebfrontend.cma.com.br/CMA/TROM/TRADING-BRASIL

No Windows, copie esta pasta para `C:\TEMP\CURSOR`.

## Estrutura

```
C-TEMP-CURSOR/
  playwright.config.ts
  package.json
  tsconfig.json
  .env.example
  run-login.bat
  run-codegen.bat
  tests/
    example.spec.ts
    login.spec.ts
```

## Setup no Windows (`C:\TEMP\CURSOR`)

```bat
mkdir C:\TEMP\CURSOR
xcopy /E /I . C:\TEMP\CURSOR
cd C:\TEMP\CURSOR
copy .env.example .env
npm install
npx playwright install chromium
```

Edite `.env` com usuário e senha. Não commite o arquivo `.env`.

## Rodar o teste de login

```bat
cd C:\TEMP\CURSOR
run-login.bat
```

Ou:

```bat
npm test
npm run test:headed
npm run test:ui
```

## Codegen (gravar seletores reais)

```bat
run-codegen.bat
```

Use o codegen se o login usar labels ou campos diferentes dos previstos em `tests/login.spec.ts`.
