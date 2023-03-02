import type { RenderType } from '@codelab/frontend/abstract/core'
import { IRenderTypeModel } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { InputProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import type { FieldProps } from 'uniforms'
import { connectField, useField } from 'uniforms'
import { TextField } from 'uniforms-antd'
import { makeAutoIncrementedName } from '../../utils'

type AutoComputedElementNameProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>
> & {
  onChange: (value: string) => void
}

/**
 * This component helps providing a computed name for an element
 * based on the renderType selected and the user input
 */
const AutoComputedElementName = observer<AutoComputedElementNameProps>(
  (props) => {
    const { name, onChange, value } = props

    const [renderTypeField] = useField<{ value?: Partial<RenderType> }>(
      'renderType',
      {},
    )

    const { atomService, componentService, builderService } = useStore()
    // Used to check if the previous selected atom/component name
    // is different from the current value to determine if the user
    // altered the auto-generated name
    const currentRenderTypeName = useRef<string>()

    const changedRenderTypeHandler = async (
      renderType?: Partial<RenderType>,
    ) => {
      let renderTypeName: Maybe<string>

      if (!renderType || !renderType.id) {
        return
      }

      if (renderType.model === IRenderTypeModel.Atom) {
        renderTypeName = (await atomService.getOne(renderType.id))?.name
      }

      if (renderType.model === IRenderTypeModel.Component) {
        renderTypeName = (await componentService.getOne(renderType.id))?.name
      }

      renderTypeName = renderTypeName
        ? makeAutoIncrementedName(
            builderService.activeElementTree?.elements.map(
              (element) => element.name,
            ) || [],
            compoundCaseToTitleCase(renderTypeName),
          )
        : undefined

      if (!value || value === currentRenderTypeName.current) {
        onChange(renderTypeName ?? '')
      }

      currentRenderTypeName.current = renderTypeName
    }

    useEffect(() => {
      // When renderType changes, we need to programmatically
      // change the name field based on the selected renderTypeName
      // but only if user did not changed the name
      void changedRenderTypeHandler(renderTypeField.value)
    }, [renderTypeField.value])

    return <TextField name={name} />
  },
)

export const AutoComputedElementNameField = connectField(
  AutoComputedElementName,
  {
    kind: 'leaf',
  },
)
