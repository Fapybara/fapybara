<p align="center">
  <img src="browser/branding/fapybara/content/about-logo.png" alt="Fapybara Logo" width="140" height="140">
</p>

<h1 align="center">Fapybara Browser 🦦</h1>

<p align="center">
  <strong>Um navegador moderno, minimalista e focado em privacidade, construído sobre a plataforma Firefox.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Windows-blue?style=flat-square" alt="Platform Windows">
  <img src="https://img.shields.io/badge/Engine-Gecko%20%2F%20Firefox-orange?style=flat-square" alt="Engine Firefox">
  <img src="https://img.shields.io/badge/Telemetry-Disabled-red?style=flat-square" alt="Telemetry Disabled">
  <img src="https://img.shields.io/badge/License-MPL%202.0-brightgreen?style=flat-square" alt="License MPL 2.0">
</p>

---

**Fapybara** é um fork personalizado e independente do Firefox, projetado para oferecer uma experiência visual fluida e uma interface "Zen" minimalista. Ele combina conceitos modernos de design de interfaces (como abas verticais e bordas flutuantes inspiradas no Opera One e Arc) com uma política rigorosa de privacidade de dados, eliminando completamente a telemetria nativa da Mozilla.

---

## 🌟 Principais Recursos

* **Estilo Zen e Translúcido**: O cabeçalho e a barra lateral utilizam fundos translúcidos com efeito de desfoque (`backdrop-filter: blur(24px)`), criando uma integração suave com o papel de parede do sistema.
* **Viewport Flutuante**: A área de exibição das páginas web flutua como um cartão arredondado com sombreamento suave, gerando uma sensação moderna de profundidade tridimensional no espaço de trabalho.
* **Theme Mixer Integrado**: Uma barra lateral interativa e exclusiva que permite personalizar em tempo real o ângulo do degradê, as cores da barra lateral e o raio de curvatura das bordas do navegador.
* **Abas Verticais Nativas**: Otimizado para telas modernas widescreen, organizando suas abas verticalmente por padrão para liberar espaço vertical.
* **Privacidade Absoluta**: Compilado em um canal de atualização independente (`fapybara`) para desativar de forma permanente as coletas de dados e travas de telemetria da Mozilla que costumam ficar ativas em builds normais de desenvolvimento.
* **Nova Aba Ultra Limpa**: A página de nova aba foi simplificada para `about:blank`, mantendo a tela vazia, limpa e com o foco do teclado 100% nativo na barra de endereços.

---

## 🚀 Como Compilar e Executar

A compilação do Fapybara utiliza a infraestrutura de build oficial da Mozilla (`mach`). Certifique-se de executar os comandos dentro do console do **MozillaBuild** (Windows) ou terminal configurado (Linux/macOS).

### 1. Configuração Inicial (`mozconfig`)
Garanta que seu arquivo `mozconfig` contenha as opções corretas, incluindo a ativação de otimizações e o canal de build personalizado para blindagem contra telemetria:

```ini
ac_add_options --enable-optimize
ac_add_options --enable-update-channel=fapybara
ac_add_options --disable-updater
ac_add_options --disable-maintenance-service
```

### 2. Sincronizar o Backend
Execute o comando abaixo sempre que alterar a estrutura de arquivos do projeto ou arquivos de empacotamento (`jar.mn`):
```bash
./mach build-backend
```

### 3. Compilar o Navegador
Para compilações completas (após alterações em C++ ou Rust):
```bash
./mach build
```

Para compilações **incrementais rápidas** (se você alterou apenas arquivos de interface como JS, CSS, XHTML ou HTML):
```bash
./mach build faster
```

### 4. Executar localmente
Abra a sua versão compilada do Fapybara para testes:
```bash
./mach run
```

---

## 📦 Geração de Pacotes e Instalador (.exe)

O Fapybara está configurado para gerar pacotes multilíngues e criar o instalador executável nativo do Windows (`setup.exe`) automaticamente durante o processo de empacotamento.

Para gerar o instalador do Windows com suporte a múltiplos idiomas, execute o comando:
```bash
./mach package-multi-locale --locales en-US pt-BR pt-PT es-ES fr de it ru zh-CN
```
* **Instalador Final**: O arquivo executável auto-instalável gerado pelo NSIS estará disponível na pasta de distribuição (`obj-x86_64-pc-windows-msvc/dist/install/sea/`).
* **Pacote Compactado**: Um arquivo `.zip` com o binário portátil também será criado na mesma pasta de distribuição.

---

## 🛡️ Telemetria e Segurança de Dados

Para garantir que nenhuma métrica de uso seja enviada para os servidores da Mozilla, o Fapybara possui modificações estruturais e preferências travadas de fábrica:

* **Canal de Build Independente**: Ao utilizar o canal `fapybara`, o navegador ignora as travas internas do Firefox que forçam o envio de dados em versões de teste/desenvolvimento.
* **Neutralização de Servidores**: Todas as requisições destinadas ao *Ping Centre* e servidores de recebimento da Mozilla foram neutralizadas ou apontadas para endpoints nulos no arquivo global de preferências.

---

## 🦦 Licença e Contribuição

Fapybara é um projeto de código aberto distribuído sob a licença **Mozilla Public License 2.0 (MPL 2.0)**. Sinta-se livre para abrir issues, propor melhorias no design ou enviar pull requests!
