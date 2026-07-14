<p align="center">
  <img src="Extras/T02.png" alt="Fapybara Banner" width="800">
</p>

<h1 align="center">Fapybara Browser 🦦</h1>

<p align="center">
  <strong>A modern, minimalist, and privacy-focused web browser built on top of the Firefox platform.</strong><br>
  <em>Um navegador moderno, minimalista e focado em privacidade, construído sobre a plataforma Firefox.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Windows-blue?style=flat-square" alt="Platform Windows">
  <img src="https://img.shields.io/badge/Engine-Gecko%20%2F%20Firefox-orange?style=flat-square" alt="Engine Firefox">
  <img src="https://img.shields.io/badge/Telemetry-Disabled-red?style=flat-square" alt="Telemetry Disabled">
  <img src="https://img.shields.io/badge/License-MPL%202.0-brightgreen?style=flat-square" alt="License MPL 2.0">
</p>

<p align="center">
  <a href="#english">English</a> • 
  <a href="#português">Português</a>
</p>

---

<span id="english"></span>
## English Version

**Fapybara** is a custom, independent fork of Firefox designed for visual elegance and a clean "Zen" workspace. It blends modern user interface paradigms—such as native vertical tabs and a floating viewport inspired by Opera One and Arc—with a strict data privacy policy that completely strips away Mozilla's native telemetry.

### 🌟 Key Features

* **Zen & Translucent Styling**: The header and sidebar feature a translucent design with a backdrop blur (`backdrop-filter: blur(24px)`), integrating seamlessly with the desktop wallpaper.
* **Floating Viewport**: The main web content area floats as a rounded card with a soft drop shadow, creating a modern depth-of-field effect.
* **Theme Mixer**: A custom, interactive sidebar that lets you customize the gradient angle, theme colors, and browser window border-radius in real time.
* **Native Vertical Tabs**: Tailored for widescreen displays, organizing your tabs vertically to reclaim vertical screen estate.
* **Hardened Privacy**: Built under an independent update channel (`fapybara`) to permanently unlock and disable Mozilla's data collection and telemetry settings.
* **Ultra-Clean New Tab**: The new tab page has been simplified to `about:blank`, leaving the workspace clean and giving 100% native keyboard focus to the address bar.

### 🚀 How to Build & Run

Building Fapybara requires the official Mozilla Build infrastructure (`mach`). Ensure you run these commands within the **MozillaBuild** terminal (Windows) or your configured shell (Linux/macOS).

#### 1. Configuration (`mozconfig`)
Ensure your `mozconfig` includes optimization flags and the custom update channel:
```ini
ac_add_options --enable-optimize
ac_add_options --enable-update-channel=fapybara
ac_add_options --disable-updater
ac_add_options --disable-maintenance-service
```

#### 2. Regenerate Build Backend
Run this command when changing file structures or package manifests (`jar.mn`):
```bash
./mach build-backend
```

#### 3. Compile the Browser
For a full compilation (after core C++/Rust modifications):
```bash
./mach build
```
For **fast incremental builds** (if you only modified front-end files like JS, CSS, or XHTML):
```bash
./mach build faster
```

#### 4. Run Locally
Launch Fapybara to test your build:
```bash
./mach run
```

### 📦 Packaging & Installer (.exe)

Fapybara is configured to generate multi-locale packages and a native Windows installer (`setup.exe`) out-of-the-box.

To package the browser with multi-locale support, run:
```bash
./mach package-multi-locale --locales en-US pt-BR pt-PT es-ES fr de it ru zh-CN
```
* **Self-Installer**: The NSIS-based self-installable executables will be available at `obj-x86_64-pc-windows-msvc/dist/install/sea/`.
* **Portable Archive**: A `.zip` archive containing the portable binaries will be generated in the same directory.

---

<span id="português"></span>
## Versão em Português

O **Fapybara** é um fork personalizado e independente do Firefox, projetado para oferecer uma experiência visual fluida e uma interface "Zen" minimalista. Ele combina conceitos modernos de design de interfaces (como abas verticais e bordas flutuantes inspiradas no Opera One e Arc) com uma política rigorosa de privacidade de dados, eliminando completamente a telemetria nativa da Mozilla.

### 🌟 Principais Recursos

* **Estilo Zen e Translúcido**: O cabeçalho e a barra lateral utilizam fundos translúcidos com efeito de desfoque (`backdrop-filter: blur(24px)`), criando uma integração suave com o papel de parede do sistema.
* **Viewport Flutuante**: A área de exibição das páginas web flutua como um cartão arredondado com sombreamento suave, gerando uma sensação moderna de profundidade tridimensional no espaço de trabalho.
* **Theme Mixer Integrado**: Uma barra lateral interativa e exclusiva que permite personalizar em tempo real o ângulo do degradê, as cores da barra lateral e o raio de curvatura das bordas do navegador.
* **Abas Verticais Nativas**: Otimizado para telas modernas widescreen, organizando suas abas verticalmente por padrão para liberar espaço vertical.
* **Privacidade Absoluta**: Compilado em um canal de atualização independente (`fapybara`) para desativar de forma permanente as coletas de dados e travas de telemetria da Mozilla que costumam ficar ativas em builds normais de desenvolvimento.
* **Nova Aba Ultra Limpa**: A página de nova aba foi simplificada para `about:blank`, mantendo a tela vazia, limpa e com o foco do teclado 100% nativo na barra de endereços.

### 🚀 Como Compilar e Executar

A compilação do Fapybara utiliza a infraestrutura de build oficial da Mozilla (`mach`). Certifique-se de executar os comandos dentro do console do **MozillaBuild** (Windows) ou terminal configurado (Linux/macOS).

#### 1. Configuração Inicial (`mozconfig`)
Garanta que seu arquivo `mozconfig` contenha as opções corretas, incluindo a ativação de otimizações e o canal de build personalizado para blindagem contra telemetria:
```ini
ac_add_options --enable-optimize
ac_add_options --enable-update-channel=fapybara
ac_add_options --disable-updater
ac_add_options --disable-maintenance-service
```

#### 2. Sincronizar o Backend
Execute o comando abaixo sempre que alterar a estrutura de arquivos do projeto ou arquivos de empacotamento (`jar.mn`):
```bash
./mach build-backend
```

#### 3. Compilar o Navegador
Para compilações completas (após alterações em C++ ou Rust):
```bash
./mach build
```
Para compilações **incrementais rápidas** (se você alterou apenas arquivos de interface como JS, CSS, XHTML ou HTML):
```bash
./mach build faster
```

#### 4. Executar localmente
Abra a sua versão compilada do Fapybara para testes:
```bash
./mach run
```

### 📦 Geração de Pacotes e Instalador (.exe)

O Fapybara está configurado para gerar pacotes multilíngues e criar o instalador executável nativo do Windows (`setup.exe`) automaticamente durante o processo de empacotamento.

Para gerar o instalador do Windows com suporte a múltiplos idiomas, execute o comando:
```bash
./mach package-multi-locale --locales en-US pt-BR pt-PT es-ES fr de it ru zh-CN
```
* **Instalador Final**: O arquivo executável auto-instalável gerado pelo NSIS estará disponível na pasta de distribuição (`obj-x86_64-pc-windows-msvc/dist/install/sea/`).
* **Pacote Compactado**: Um arquivo `.zip` com o binário portátil também será criado na mesma pasta de distribuição.
