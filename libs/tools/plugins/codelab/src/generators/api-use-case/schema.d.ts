import { UseCaseType } from './useCaseType'

export interface ApiUseCaseGeneratorSchema {
  model: string
  useCase: string
  // model: string
  // tags?: string
  // directory?: string
  // useCaseType?: UseCaseType
}

export interface NormalizedSchema extends ApiUseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  // useCaseBaseClass: string
  useCasePascalCase: string
  modelPascalCase: string
  useCaseKebabCase: string
}
