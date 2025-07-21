'use client'

import type { IRuntimeContext } from '@codelab/frontend-abstract-application'
import type { IInterfaceTypeModel } from '@codelab/frontend-abstract-domain'
import type { FormProps, SubmitRef } from '@codelab/frontend-abstract-types'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'

import {
  ExpressionAutoFields,
  type SetIsLoading,
} from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'

import { InterfaceForm } from '../interface-form'

export interface PropsFormProps
  extends Pick<
      FormProps<IPropData>,
      'modelTransform' | 'onSubmitError' | 'onSubmitSuccess' | 'submitField'
    >,
    SubmitRef {
  autocomplete?: IRuntimeContext
  autosave?: boolean
  cssString?: string
  initialSchema?: ObjectLike
  interfaceType?: IInterfaceTypeModel
  model?: IPropData
  setIsLoading?: SetIsLoading
  onSubmit(values: IPropData): Promise<IPropData>
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
    modelTransform,
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
          modelTransform={modelTransform}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          setIsLoading={setIsLoading}
          submitField={submitField}
          submitRef={submitRef}
        >
          <ExpressionAutoFields />
        </InterfaceForm>
      </div>
    )
  },
)
