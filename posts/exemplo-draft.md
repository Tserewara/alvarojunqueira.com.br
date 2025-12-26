---
title: 'Explorando TypeScript Avançado'
date: '2025-12-26'
status: 'draft'
draftStartDate: '2025-12-26'
lastUpdated: '2025-12-26'
---

## Introdução

Este é um exemplo de post draft. Estou explorando recursos avançados de TypeScript enquanto documento minha jornada.

### Tipos Condicionais

Ainda estudando como funcionam os conditional types...

```typescript
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false
```

### Próximos passos

- [ ] Entender mapped types
- [ ] Praticar utility types
- [ ] Estudar template literal types

> Este artigo está em construção. Vou atualizando conforme aprendo mais!
