import type { IAtomModel } from '@codelab/frontend/abstract/core'
import { SelectAtom } from '@codelab/frontend/application/atom'
import { SelectComponent } from '@codelab/frontend/application/type'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  error,
  onChange,
  parentAtom,
}: GuaranteedProps<Partial<IElementDTO['renderType']>> & {
  parentAtom?: IAtomModel
}) => {
  return (
    <section>
      <SelectField
        name="__typename"
        onChange={(value) => {
          console.log(value)

          // when the type changes, the selected atom or component has to be
          // removed since they share the same field name `renderType.id`
          if (value) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            onChange({ __typename: value })
          }
        }}
        options={[
          {
            label: 'Atom',
            value: IElementRenderTypeKind.Atom,
          },
          {
            label: 'Component',
            value: IElementRenderTypeKind.Component,
          },
        ]}
        required={false}
      />
      <DisplayIfField<IElementDTO>
        condition={(context) =>
          context.model.renderType?.__typename === IElementRenderTypeKind.Atom
        }
      >
        {/**
         * AutoField renders sub-component frequently, so SelectField of SelectAtom component flicks
         * No need AutoField here
         */}
        <SelectAtom error={error} label="Atom" name="id" parent={parentAtom} />
      </DisplayIfField>
      <DisplayIfField<IElementDTO>
        condition={(context) =>
          context.model.renderType?.__typename ===
          IElementRenderTypeKind.Component
        }
      >
        <SelectComponent error={error} label="Component" name="id" />
      </DisplayIfField>
    </section>
  )
}

export const RenderTypeCompositeField = connectField(RenderTypeFields)
