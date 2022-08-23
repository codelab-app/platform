import { componentUsecaseTagName } from '@codelab/shared/data'
import { antUseCaseTags } from '../commands/import/import-seed-data/add-antd-use-case-tags'

export const builderComponentUsecaseTag = {
  name: componentUsecaseTagName,
  children: antUseCaseTags.map((tag) => ({ name: tag })),
  parent: undefined,
}
