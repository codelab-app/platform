export enum MonacoLanguage {
  TypeScript = 'typescript',
  JavaScript = 'javascript',
  CSS = 'css',
  JSON = 'json',
  Graphql = 'graphqlDev',
}

export const languageMap = (language: string): MonacoLanguage =>
  MonacoLanguage[language as keyof typeof MonacoLanguage]
