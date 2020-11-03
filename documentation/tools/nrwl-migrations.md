# NRWL Migrations

For local schematics, we'll have to manually add `migrations.json`, also need to update `package.json` to point to `migrations.json`. This has already been added

Then run `npx nx migrate --run-migrations=migrations.json` to migrate files

```json
{
  "version": "10.3.1",
  "description": "Upgrade Storybook config",
  "factory": "./src/migrations/update-10-3-1/update-10-3-1",
  "package": "@codelab/schematics",
  "name": "update-10.3.1"
}
```

We take this out after migration since our script will overwrite file each time. If you need to upgrade in future, manually copy this back & run.
