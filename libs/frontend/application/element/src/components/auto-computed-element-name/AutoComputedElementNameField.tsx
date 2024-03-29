import { useStore } from '@codelab/frontend/application/shared/store'
import { makeAutoIncrementedName } from '@codelab/frontend/domain/element'
import type { IElementRenderTypeDto } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { InputProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import type { FieldProps } from 'uniforms'
import { connectField, useField } from 'uniforms'
import { TextField } from 'uniforms-antd'

type AutoComputedElementNameProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>
> & {
  onChange(value: string): void
}

/**
 * This component helps providing a computed name for an element
 * based on the renderType selected and the user input
 */
const AutoComputedElementName = observer<AutoComputedElementNameProps>(
  (props) => {
    const { atomService, componentService, rendererService } = useStore()
    const { name, onChange, value } = props

    const [renderTypeField] = useField<{
      value?: Partial<IElementRenderTypeDto>
    }>('renderType', {})

    // Used to check if the previous selected atom/component name
    // is different from the current value to determine if the user
    // altered the auto-generated name
    const currentRenderTypeName = useRef<string>()

    const changedRenderTypeHandler = async (
      renderType?: Partial<IElementRenderTypeDto>,
    ) => {
      let renderTypeName: Maybe<string>

      if (!renderType || !renderType.id) {
        return
      }

      if (renderType.__typename === IElementRenderTypeKind.Atom) {
        renderTypeName = (await atomService.getOne(renderType.id))?.name
      }

      if (renderType.__typename === IElementRenderTypeKind.Component) {
        renderTypeName = (await componentService.getOne(renderType.id))?.name
      }

      renderTypeName = renderTypeName
        ? makeAutoIncrementedName(
            rendererService.activeElementTree?.elements.map(
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
