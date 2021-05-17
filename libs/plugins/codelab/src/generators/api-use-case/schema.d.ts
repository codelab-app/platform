export interface ApiUseCaseGeneratorSchema {
  name: string
  useCaseName: string
  modelName: string
  tags?: string
  directory?: string
}

export interface NormalizedSchema extends ApiUseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>

  useCaseNamePascalCase: string
  modelNamePascalCase: string
  useCaseKebabCase: string
}
