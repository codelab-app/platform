# Web E2E Tests

## Running Tests

### Running specific tests

After starting the required services:
```bash
pnpm e2e:web
pnpm e2e:api
```

You can run specific tests using the `--grep` flag:
```bash
nx run web-e2e:e2e:test --grep=tags
```

This will run only tests matching the pattern "tags".