import type {
  IAtomModel,
  ICreateElementData,
} from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/domain/type'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

const RenderTypeFields = ({
  error,
  onChange,
  parentAtom,
}: GuaranteedProps<Partial<ICreateElementData['renderType']>> & {
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
      <DisplayIfField<ICreateElementData>
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
      <DisplayIfField<ICreateElementData>
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
