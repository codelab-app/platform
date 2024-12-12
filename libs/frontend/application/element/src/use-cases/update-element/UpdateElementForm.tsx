'use client'

import type {
  IRuntimeElementModel,
  IRuntimeElementPropModel,
} from '@codelab/frontend/abstract/application'

import {
  isAtom,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectActionField,
  SelectActionsField,
} from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import {
  CodeMirrorField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { Collapse } from 'antd'
import { trace } from 'mobx'
import { observer } from 'mobx-react-lite'
import { isDeepEqual } from 'remeda'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCustomCompareMemo } from 'use-custom-compare'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import ChildMapperCompositeField from '../../components/ChildMapperCompositeField'
import { RenderTypeField } from '../../components/render-type-field'
import { useElementService } from '../../services'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  runtimeElement: IRuntimeElementModel
  runtimeElementProps: IRuntimeElementPropModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ runtimeElement, runtimeElementProps }) => {
    const elementService = useElementService()

    // const onSubmit = async (data: IUpdateElementData) => {
    //   return elementService.update(data)
    // }

    // const runtimeProps = runtimeElement.runtimeProps

    console.log('render', runtimeElementProps)

    return <div></div>
  },
)
