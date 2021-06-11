import shell from 'shelljs'
import { NormalizedSchema } from '../generator'

export const updateDgraphSchema = (options: NormalizedSchema) => {
  const { dgraphPort } = options

  if (
    !shell.exec(
      `curl -X POST localhost:${dgraphPort}/admin/schema --data-binary '@dgraph/schema.generated.graphql'`,
    )
  ) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
}
