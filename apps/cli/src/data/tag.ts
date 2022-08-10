import { componentUsecaseTagName } from '@codelab/shared/data'
import { antUsecaseTags } from '../commands/import/import-seed-data/add-antd-usecase-tags'

export const builderComponentUsecaseTag = {
  name: componentUsecaseTagName,
  children: antUsecaseTags.map((tag) => ({ name: tag })),
  parent: undefined,
}
