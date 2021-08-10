import { UseCaseType } from './useCaseType'

export interface UiUseCaseGeneratorSchema {
  name: string
  // useCase: string
  model: string
  overwrite?: boolean
  // tags?: string
  directory?: string
  useCaseTypes: Array<UseCaseType>
}

export interface UseCaseInfo {
  // use case
  useCasePC: string
  useCaseCC: string
  useCaseTC: string

  // use case type
  useCaseTypeCC: string
  useCaseTypePC: string

  // CreateAppInput, UpdateAppData etc.
  // update uses a different name
  inputType: string
  useCaseErrorMessage: string
}

/**
 * CC - camelCase
 * PC - PascalCase
 * TC - Title Case
 * KB - kebab-case
 */
export interface NormalizedSchema extends UiUseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  // parsedTags: Array<string>

  useCaseConfigs: Array<UseCaseInfo>
  modelCC: string
  modelPC: string
}
