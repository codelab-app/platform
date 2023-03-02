import type {
  IAtom,
  IComponent,
  ICreateElementData,
} from '@codelab/frontend/abstract/core'
import { IRenderTypeModel } from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/domain/type'
import { DisplayIfField } from '@codelab/frontend/view/components'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  parent,
  error,
  onChange,
}: GuaranteedProps<Partial<ICreateElementData['renderType']>> & {
  parent?: IAtom | IComponent
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
          value: IRenderTypeModel.Atom,
        },
        {
          label: 'Component',
          value: IRenderTypeModel.Component,
        },
      ]}
      required={false}
    />
    <DisplayIfField<ICreateElementData>
      condition={(context) =>
        context.model.renderType?.model === IRenderTypeModel.Atom
      }
    >
      {/**
       * AutoField renders sub-component frequently, so SelectField of SelectAtom component flicks
       * No need AutoField here
       */}
      <SelectAtom
        error={error}
        label="Atom"
        name="id"
        parent={parent as IAtom}
      />
    </DisplayIfField>
    <DisplayIfField<ICreateElementData>
      condition={(context) =>
        context.model.renderType?.model === IRenderTypeModel.Component
      }
    >
      <SelectComponent error={error} label="Component" name="id" />
    </DisplayIfField>
  </section>
)

const RenderTypeCompositeField = connectField(RenderTypeFields)

export default RenderTypeCompositeField
