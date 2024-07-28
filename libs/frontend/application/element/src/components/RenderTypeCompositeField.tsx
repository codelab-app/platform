import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { SelectComponent } from '@codelab/frontend/presentation/components/interface-form'
import { SelectAtom } from '@codelab/frontend-application-atom/use-cases/select-atom'
import { DisplayIfField } from '@codelab/frontend-presentation-components-form'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  error,
  onChange,
  parentAtom,
}: GuaranteedProps<Partial<IElementDto['renderType']>> & {
  parentAtom?: IAtomModel
}) => {
  return (
    <section>
      <SelectField
        name="__typename"
        onChange={(value) => {
          // when the type changes, the selected atom or component has to be
          // removed since they share the same field name `renderType.id`
          if (value) {
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
      <DisplayIfField<IElementDto>
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
      <DisplayIfField<IElementDto>
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
