import { IInterfaceType, IPropData } from '@codelab/frontend/abstract/core'
import { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import {
  handleFormSubmit,
  SetIsLoading,
} from '@codelab/frontend/view/components'
import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { DeepPartial } from 'utility-types'
import { InterfaceForm, UiPropertiesContext } from '../interface-form'

export interface PropsFormProps
  extends SubmitRef,
    Pick<
      FormProps<IPropData>,
      'submitField' | 'onSubmitError' | 'onSubmitSuccess'
    > {
  interfaceType?: IInterfaceType
  model?: IPropData
  onSubmit: (values: IPropData) => Promise<IPropData | void>
  autosave?: boolean
  context?: UiPropertiesContext
  setIsLoading?: SetIsLoading
  cssString?: CSSInterpolation
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const PropsForm = observer<PropsFormProps>(
  ({
    interfaceType,
    model,
    onSubmit,
    autosave,
    context,
    setIsLoading,
    submitRef,
    onSubmitError,
    cssString,
    onSubmitSuccess,
    submitField,
  }) => {
    if (!interfaceType) {
      return null
    }

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <InterfaceForm
          autosave={autosave}
          context={context}
          interfaceType={interfaceType}
          model={model || {}}
          onSubmit={handleFormSubmit<DeepPartial<IPropData>, IPropData>(
            onSubmit,
            setIsLoading,
            onSubmitSuccess,
            onSubmitError,
          )}
          onSubmitSuccess={onSubmitSuccess}
          submitField={submitField}
          submitRef={submitRef}
        />
      </div>
    )
  },
)
