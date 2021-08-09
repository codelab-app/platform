import { UseCaseType } from './useCaseType'

export interface UiUseCaseGeneratorSchema {
  name: string
  useCase: string
  model: string
  overwrite?: boolean
  tags?: string
  directory?: string
  useCaseType: UseCaseType
}

export interface NormalizedSchema extends UiUseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
  modelCamelCase: string
  modelPascalCase: string

  // use case
  useCasePascalCase: string
  useCaseCamelCase: string
  useCaseTitleCase: string

  // use case type
  useCaseType: string
}
