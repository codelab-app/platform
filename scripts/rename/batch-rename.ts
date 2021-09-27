import glob from 'glob'
import fs from 'fs'

// Batch rename libs/frontend/**/*.api.graphql to libs/frontend/**/*.web.graphql
export const rename = () => {
  const source = glob.sync('libs/**/*fragment.graphql.graphql')

  source.forEach((oldPath) => {
    const newPath = oldPath.replace(
      '.fragment.graphql.graphql',
      '.fragment.graphql',
    )
    fs.renameSync(oldPath, newPath)
  })
}

export const remove = () => {
  const source = glob.sync('libs/frontend/**/*.fragment.web.graphql.gen.ts')

  source.forEach((oldPath) => {
    // const newPath = oldPath.replace('.web.graphql', '.api.graphql.gen.ts')
    fs.unlinkSync(oldPath)
  })
}

// rename()
remove()
