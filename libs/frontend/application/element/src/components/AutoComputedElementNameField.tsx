'use client'

import type { IElementRenderTypeDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { InputProps } from 'antd'
import type { FieldProps } from 'uniforms'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import { componentRepository } from '@codelab/frontend-domain-component/repositories'
import { makeAutoIncrementedName } from '@codelab/frontend-domain-element/use-cases/incremented-name'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { titleCase } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
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
    const { rendererService } = useApplicationStore()
    const atomService = useAtomService()
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
        renderTypeName = (
          await componentRepository.findOne({ id: renderType.id })
        )?.name
      }

      renderTypeName = renderTypeName
        ? makeAutoIncrementedName(
            rendererService.activeElementTree?.elements.map(
              (element) => element.name,
            ) || [],
            titleCase(renderTypeName),
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
