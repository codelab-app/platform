import globby from 'globby'

export const documentFiles = () =>
  globby.sync('**/*.graphql', { gitignore: true })
