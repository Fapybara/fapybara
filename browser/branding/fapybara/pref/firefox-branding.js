/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// This file contains branding-specific prefs.

pref("startup.homepage_override_url", "");
pref("startup.homepage_welcome_url", "");
pref("startup.homepage_welcome_url.additional", "");
// The time interval between checks for a new version (in seconds)
pref("app.update.interval", 7200); // 2 hours
// Give the user x seconds to react before showing the big UI. default=12 hours
pref("app.update.promptWaitTime", 43200);
// URL user can browse to manually if for some reason all update installation
// attempts fail.
pref("app.update.url.manual", "");
// A default value for the "More information about this update" link
// supplied in the "An update is available" page of the update wizard.
pref("app.update.url.details", "");

pref("app.releaseNotesURL", "");
pref("app.releaseNotesURL.aboutDialog", "");
pref("app.releaseNotesURL.prompt", "");

// The number of days a binary is permitted to be old
// without checking for an update.  This assumes that
// app.update.checkInstallTime is true.
pref("app.update.checkInstallTime.days", 2);

// Give the user x seconds to reboot before showing a badge on the hamburger
// button. default=immediately
pref("app.update.badgeWaitTime", 0);

// Number of usages of the web console.
// If this is less than 5, then pasting code into the web console is disabled
pref("devtools.selfxss.count", 5);

// Desabilita a política global de envio de dados à Mozilla
pref("datareporting.policy.dataSubmissionEnabled", false);

// Desabilita o envio de relatórios de saúde do navegador (Firefox Health Report)
pref("datareporting.healthreport.uploadEnabled", false);

// Desabilita o envio do relatório de uso do navegador
pref("datareporting.usage.uploadEnabled", false);

// Desativa a telemetria estendida do Toolkit
pref("toolkit.telemetry.enabled", false);

// Desativa o comportamento unificado de telemetria
pref("toolkit.telemetry.unified", false);

// Impede que o Firefox guarde arquivos de telemetria arquivados localmente no disco
pref("toolkit.telemetry.archive.enabled", false);

// Desativa o envio de ping de encerramento rápido (shutdown ping)
pref("toolkit.telemetry.shutdownPingSender.enabled", false);
pref("toolkit.telemetry.firstShutdownPing.enabled", false);

// Desativa o ping enviado quando um novo perfil é criado
pref("toolkit.telemetry.newProfilePing.enabled", false);

// Desativa o ping de atualização de versão do navegador
pref("toolkit.telemetry.updatePing.enabled", false);

// Desativa o ping de travamento do navegador (Background Hang Reporter - BHR)
pref("toolkit.telemetry.bhrPing.enabled", false);

// Desativa o ping de características do usuário (user characteristics)
pref("toolkit.telemetry.user_characteristics_ping.opt-out", true);

// Desativa toda a telemetria do Activity Stream (Nova Aba)
pref("browser.newtabpage.activity-stream.telemetry", false);

// Desativa o envio de pings privados e rastreios de interesse na nova aba
pref("browser.newtabpage.activity-stream.telemetry.privatePing.enabled", false);
pref("browser.newtabpage.activity-stream.telemetry.privatePing.inferredInterests.enabled", false);

// Desativa estudos Shield e experimentos de preferências em execução
pref("app.shield.optoutstudies.enabled", false);

// Desativa o Normandy (serviço usado para aplicar receitas e experimentos remotamente)
pref("app.normandy.enabled", false);
pref("app.normandy.api_url", "");

// Opt-out dos testes de cobertura de código
pref("toolkit.coverage.enabled", false);
pref("toolkit.coverage.opt-out", true);
pref("toolkit.coverage.endpoint.blank", true);

// Blinda a URL principal de envio de telemetria
pref("toolkit.telemetry.server", "");
pref("toolkit.telemetry.server_owner", "");

// Blinda o endpoint de telemetria do Ping Centre
pref("browser.ping-centre.production.endpoint", "");
pref("browser.ping-centre.staging.endpoint", "");
