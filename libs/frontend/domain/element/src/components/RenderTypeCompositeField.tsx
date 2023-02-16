import type { IAtom, ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/domain/type'
import { DisplayIfField } from '@codelab/frontend/view/components'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  parent,
  error,
  onChange,
}: GuaranteedProps<Partial<ICreateElementDTO['renderType']>> & {
  parent?: IAtom
}) => (
  <section>
    <SelectField
      name="model"
      onChange={(value) => {
        // when the type changes, the selected atom or component has to be
        // removed since they share the same field name `renderType.id`
        onChange(value ? { model: value } : null)
      }}
      options={[
        {
          label: 'Atom',
          value: RenderTypeEnum.Atom,
        },
        {
          label: 'Component',
          value: RenderTypeEnum.Component,
        },
      ]}
      required={false}
    />
    <DisplayIfField<ICreateElementDTO>
      condition={(context) =>
        context.model.renderType?.model === RenderTypeEnum.Atom
      }
    >
      {/**
       * AutoField renders subcomponent frequently, so SelectField of SelectAtom component flicks
       * No need AutoField here
       */}
      <SelectAtom error={error} label="Atom" name="id" parent={parent} />
    </DisplayIfField>
    <DisplayIfField<ICreateElementDTO>
      condition={(context) =>
        context.model.renderType?.model === RenderTypeEnum.Component
      }
    >
      <SelectComponent error={error} label="Component" name="id" />
    </DisplayIfField>
  </section>
)

const RenderTypeCompositeField = connectField(RenderTypeFields)

export default RenderTypeCompositeField
