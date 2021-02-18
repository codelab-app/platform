import { ExportData, ImportDetails } from './utils'

export const generateImports = (
  importsDetails: Array<ImportDetails>,
): string => {
  return importsDetails
    .reduce((acc, curr) => {
      const existed = acc.find(
        (accDetails) => accDetails.source === curr.source,
      )

      if (existed) {
        existed.entities = [...new Set([...existed.entities, ...curr.entities])]

        return acc
      }

      return [...acc, { ...curr, entities: [...new Set([...curr.entities])] }]
    }, [] as Array<ImportDetails>)
    .map(
      (details) =>
        `import { ${details.entities.join(', ')} } from '${details.source}'`,
    )
    .join('\n')
}

export const generateStringFromExportData = ({
  content,
  imports = [],
  header = [],
}: ExportData) => {
  return `${header.join('\n')}\n${generateImports(imports)}\n\n${content.join(
    '\n\n',
  )}`
}
