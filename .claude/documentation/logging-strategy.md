# Logging Strategy

## Overview

Two orthogonal controls for logging:
1. **Namespace Filter** - Which components can log (binary on/off)
2. **Level Threshold** - Minimum severity to log (hierarchical)

Both conditions must be met for a log to appear.

## Environment Variables

```bash
# Namespace filtering (comma-separated, wildcards, exclusions with -)
API_LOG_NAMESPACES=graphql:*,neo4j:*,service:*,-neo4j:deprecation

# Level threshold
API_LOG_LEVEL=info                    # Global level threshold

# Output format
LOG_FORMAT=json                       # json|pretty|compact
```

## How It Works

```bash
# Configuration
API_LOG_NAMESPACES=graphql:*,neo4j:query
API_LOG_LEVEL=info

# Results:
✅ graphql:resolver [INFO]  → Shown (namespace ✓, info >= info)
✅ neo4j:query [WARN]      → Shown (namespace ✓, warn >= info)
❌ neo4j:query [DEBUG]     → Hidden (namespace ✓, debug < info)
❌ api:handler [ERROR]     → Hidden (namespace ✗)
```

## Level Hierarchy & Data Inclusion

Levels: `verbose < debug < info < warn < error < fatal`

**Data field inclusion rule:**
- `verbose`, `debug` → Include data field
- `info`, `warn` → Exclude data field  
- `error`, `fatal` → Always include data field

```javascript
// Example
logger.debug('Query executed', { 
  context: 'neo4j:query',
  data: { query: '...', params: {...} }  // Included at debug level
})
```

## Common Patterns

```bash
# Development - see everything
API_LOG_NAMESPACES=*
API_LOG_LEVEL=debug

# Production - errors only
API_LOG_NAMESPACES=*
API_LOG_LEVEL=error

# Debug specific component with data
API_LOG_NAMESPACES=neo4j:*
API_LOG_LEVEL=debug  # debug = includes data fields

# Multiple components
API_LOG_NAMESPACES=graphql:*,neo4j:*,service:auth:*,-neo4j:deprecation
API_LOG_LEVEL=info
```

## Implementation Files

- **GraphQL**: `libs/backend/infra/adapter/graphql/src/graphql-tracking.service.ts`
- **Neo4j**: `libs/backend/infra/adapter/neo4j-driver/src/services/cypher-tracking.interceptor.ts`
- **Logger**: `libs/backend/infra/adapter/logger/src/pino/pino.logger.service.ts`