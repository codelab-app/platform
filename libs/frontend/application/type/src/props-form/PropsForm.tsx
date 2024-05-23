import type { IRuntimeContext } from '@codelab/frontend/abstract/application'
import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import type { SetIsLoading } from '@codelab/frontend-presentation-view/components'
import { handleFormSubmit } from '@codelab/frontend-presentation-view/components'
import type { IPropData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { DeepPartial } from 'utility-types'
import { InterfaceForm } from '../interface-form'

export interface PropsFormProps
  extends SubmitRef,
    Pick<
      FormProps<IPropData>,
      'onSubmitError' | 'onSubmitSuccess' | 'submitField'
    > {
  autocomplete?: IRuntimeContext
  autosave?: boolean
  cssString?: string
  initialSchema?: object
  interfaceType?: IInterfaceTypeModel
  model?: IPropData
  setIsLoading?: SetIsLoading
  onSubmit(values: IPropData): Promise<IPropData | void>
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const PropsForm = observer<PropsFormProps>(
  ({
    autocomplete,
    autosave,
    cssString,
    initialSchema,
    interfaceType,
    model,
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    setIsLoading,
    submitField,
    submitRef,
  }) => {
    if (!interfaceType) {
      return null
    }

    return (
      <div css={cssString}>
        <InterfaceForm
          autosave={autosave}
          context={{ autocomplete }}
          initialSchema={initialSchema}
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
