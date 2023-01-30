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
}) => {
  console.log('RenderTypeFields error', error)

  return (
    <section>
      <SelectField
        name="model"
        onChange={(value) => {
          // when the type changes, the selected atom or component will be removed
          onChange({ model: value })
        }}
        options={[
          {
            label: 'Atom',
            value: RenderTypeEnum.atom,
          },
          {
            label: 'Component',
            value: RenderTypeEnum.component,
          },
        ]}
      />
      <DisplayIfField<ICreateElementDTO>
        condition={(context) =>
          context.model.renderType?.model === RenderTypeEnum.atom
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
          context.model.renderType?.model === RenderTypeEnum.component
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
}

const RenderTypeCompositeField = connectField(RenderTypeFields)

export default RenderTypeCompositeField
