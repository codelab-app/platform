import type { IAtom, ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/domain/type'
import { DisplayIfField } from '@codelab/frontend/view/components'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'

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
      <AutoField
        component={(props: UniformSelectFieldProps) => (
          <SelectAtom
            error={error ?? props.error}
            label={props.label}
            name={props.name}
            parent={parent}
          />
        )}
        label="Atom"
        name="id"
      />
    </DisplayIfField>
    <DisplayIfField<ICreateElementDTO>
      condition={(context) =>
        context.model.renderType?.model === RenderTypeEnum.Component
      }
    >
      <AutoField
        component={(props: UniformSelectFieldProps) => (
          <SelectComponent
            error={error ?? props.error}
            label={props.label}
            name={props.name}
          />
        )}
        label="Component"
        name="id"
      />
    </DisplayIfField>
  </section>
)

const RenderTypeCompositeField = connectField(RenderTypeFields)

export default RenderTypeCompositeField
