---
path: '/design-patterns'
title: 'Design Patterns'
---

Design Patterns are often overlooked in software engineering, but they are crucial for abstracting the architecture of a software system.

The "Abstract Factory" pattern will be the foundation of our system. With each component type (_Form_, _Table_) as instantiable from the factory.

This suits are needs because we'll have a separate variation of the component based on the data type, whether it's Prisma/GraphQL models, or our own Content data abstraction layer.

Keep in mind the data from our Content module is built via graph traversal of the D3 graph. Our business logic enables structured data retrieval from an otherwise normal D3 graph.
