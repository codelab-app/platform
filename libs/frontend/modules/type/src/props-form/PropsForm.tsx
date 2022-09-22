import { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { SetIsLoading } from '@codelab/frontend/view/components'
import {
  IInterfaceType,
  IPropData,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InterfaceForm } from '../interface-form'

export interface PropsFormProps extends SubmitRef {
  interfaceType?: IInterfaceType
  model?: IPropData
  onSubmit: (values: IPropData) => Promise<IPropData | void>
  autosave?: boolean
  context?: IPropsFieldContext
  setIsLoading?: SetIsLoading
  cssString?: CSSInterpolation
  onSubmitError?: FormProps<IPropData, IPropData>['onSubmitError']
  onSubmitSuccess?: FormProps<IPropData, IPropData>['onSubmitSuccess']
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
  }) => {
    console.log({ model })

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
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
    )
  },
)
