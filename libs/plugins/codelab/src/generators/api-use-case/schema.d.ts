import { UseCaseType } from './useCaseType'

export interface ApiUseCaseGeneratorSchema {
  name: string
  useCaseName: string
  modelName: string
  tags?: string
  directory?: string
  useCaseType?: UseCaseType
}

export interface NormalizedSchema extends ApiUseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
  useCaseBaseClass: string
  useCaseNamePascalCase: string
  modelNamePascalCase: string
  useCaseKebabCase: string
}
