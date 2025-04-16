import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { ITagDto } from '@codelab/shared-abstract-core'
import type { Maybe, Nullish } from '@codelab/shared-abstract-types'
import type { LabeledValue } from 'antd/lib/select'
import type { ObjectMap, Ref } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { ITagModel } from './tag.model.interface'

export interface ITagDomainService extends IHydrateable<ITagDto, ITagModel> {
  expandedNodes: Array<string>
  selectedOption: LabeledValue | null
  tags: ObjectMap<ITagModel>
  tagsList: Array<ITagModel>
  tagsSelectOptions: Array<SelectOption>

  setExpandedNodes(nodes: Array<string>): void
  setSelectedTag(tag: Nullish<Ref<ITagModel>>): void
  tag(id: string): Maybe<ITagModel>
}
