# Changelog

Todos os cambios notáveis deste projeto serão documentados neste arquivo.

## [152.0.6] - 2026-07-16
### Segurança
- Sincronização crítica com o upstream do Firefox 152.0.6.
- Implementada proteção contra carregamento de URIs `javascript:` entre processos (Bug 2043820).
- Correção de vulnerabilidade em dependência externa (`quick-xml`) via auditoria de cargo (Bug 2052161).
- Proteção de segurança contra *dereferencing* no `BackgroundFlushCallback` (Bug 2051274).

---

## [Como usar este Changelog]
- **Versões**: Sempre inicie com a versão upstream seguida da sua data.
- **Categorias**: Use `### Segurança`, `### Melhorias` ou `### Correções` para separar o que foi feito.