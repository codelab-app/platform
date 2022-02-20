import { UseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { UpdateElementData } from '@codelab/shared/abstract/codegen'
import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useUpdateElementsMutation } from '../../../store'
import { updateElementSchema } from './updateElementSchema'

export type UpdateElementFormInternalProps = Omit<
  UseCaseFormWithRef<UpdateElementData>,
  'onSubmit'
> & {
  tree: ElementTree
  element: IElement
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateElementFormInternal = ({
  element: elementProp,
  providePropCompletion,
  trackPromises,
}: React.PropsWithChildren<UpdateElementFormInternalProps>) => {
  const { current: element } = useRef(elementProp) // Cache the initial element value, because when it updates it will interfere with what the user is typing
  const { trackPromise } = trackPromises ?? {}

  const [propCompleteOptions, setPropCompleteOptions] = useState<
    Array<{ label: string; value: string }>
  >([])

  const [updateElement] = useUpdateElementsMutation()

  const onSubmit = ({
    atomId,
    renderForEachPropKey,
    renderIfPropKey,
    name,
    instanceOfComponentId,
    propTransformationJs,
  }: UpdateElementData) => {
    const atom = atomId
      ? { connect: { where: { node: { id: atomId } } } }
      : { disconnect: { where: {} } }

    const instanceOfComponent = instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : { disconnect: { where: {} } }

    const promise = updateElement({
      variables: {
        where: { id: element.id },
        update: {
          name,
          atom,
          propTransformationJs,
          renderForEachPropKey,
          instanceOfComponent,
          renderIfPropKey,
        },
      },
    })

    if (trackPromise) {
      trackPromise(promise)
    }

    return promise
  }

  const handlePropSearch = (value: string) => {
    if (providePropCompletion) {
      setPropCompleteOptions(
        providePropCompletion(value).map((option) => ({
          value: option,
          label: option,
        })),
      )
    }
  }

  return (
    <div>
      <Form<UpdateElementData>
        autosave
        key={element.id}
        model={{
          atomId: element.atom?.id,
          name: element.name,
          renderForEachPropKey: element.renderForEachPropKey,
          renderIfPropKey: element.renderIfPropKey,
          propTransformationJs: element.propTransformationJs,
          css: element.css,
        }}
        onSubmit={onSubmit}
        onSubmitError={[
          createNotificationHandler({
            title: 'Error while updating element',
          }),
        ]}
        schema={updateElementSchema}
        submitRef={undefined}
      >
        <AutoFields
          omitFields={[
            'atomId',
            'renderIfPropKey',
            'renderForEachPropKey',
            'propTransformationJs',
            'instanceOfComponentId',
            'css', // We edit it in the css tab
          ]}
        />
        <AutoField component={SelectComponent} name="instanceOfComponentId" />
        <AutoField component={SelectAtom} name="atomId" />
        <AutoCompleteField
          name="renderIfPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
        <AutoCompleteField
          name="renderForEachPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
      </Form>
    </div>
  )
}
