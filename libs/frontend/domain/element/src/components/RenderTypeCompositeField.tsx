import type { IAtom, ICreateElementData } from '@codelab/frontend/abstract/core'
import { IRenderTypeKind } from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/domain/type'
import { DisplayIfField } from '@codelab/frontend/view/components'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  error,
  onChange,
  parentAtom,
}: GuaranteedProps<Partial<ICreateElementData['renderType']>> & {
  parentAtom?: IAtom
}) => (
  <section>
    <SelectField
      name="kind"
      onChange={(value) => {
        // when the type changes, the selected atom or component has to be
        // removed since they share the same field name `renderType.id`
        onChange(value ? { kind: value } : null)
      }}
      options={[
        {
          label: 'Atom',
          value: IRenderTypeKind.Atom,
        },
        {
          label: 'Component',
          value: IRenderTypeKind.Component,
        },
      ]}
      required={false}
    />
    <DisplayIfField<ICreateElementData>
      condition={(context) =>
        context.model.renderType?.kind === IRenderTypeKind.Atom
      }
    >
      {/**
       * AutoField renders sub-component frequently, so SelectField of SelectAtom component flicks
       * No need AutoField here
       */}
      <SelectAtom error={error} label="Atom" name="id" parent={parentAtom} />
    </DisplayIfField>
    <DisplayIfField<ICreateElementData>
      condition={(context) =>
        context.model.renderType?.kind === IRenderTypeKind.Component
      }
    >
      <SelectComponent error={error} label="Component" name="id" />
    </DisplayIfField>
  </section>
)

const RenderTypeCompositeField = connectField(RenderTypeFields)

export default RenderTypeCompositeField
