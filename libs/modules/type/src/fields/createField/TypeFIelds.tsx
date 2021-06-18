import { DisplayIfField } from '@codelab/frontend/shared'
import { PrimitiveType, Unit as UnitEnum } from '@codelab/graphql'
import React from 'react'
import { Context } from 'uniforms'
import { ListField, SelectField } from 'uniforms-antd'
import { SelectFieldProps } from 'uniforms-antd/es5/SelectField'
import { CreateFieldSchemaObject, TypeVariant } from './createFieldSchema'

export interface TypeFieldsProps {
  interfacesOptions: Array<{ label: string; value: string }>
  namePrefix?: string
  typeFieldProps?: Partial<SelectFieldProps>
  extractTypeFromContext: (
    context: Context<CreateFieldSchemaObject>,
  ) => TypeVariant | PrimitiveType
}

export const unitSelectOptions = Object.values(UnitEnum).map((u) => ({
  value: u,
  label: u,
}))

export const TypeFields = ({
  interfacesOptions,
  extractTypeFromContext,
  namePrefix,
  typeFieldProps,
}: TypeFieldsProps) => (
  <>
    <SelectField name={`${namePrefix || ''}type`} {...typeFieldProps} />

    <DisplayIfField<CreateFieldSchemaObject>
      condition={(context) =>
        extractTypeFromContext(context) === TypeVariant.Enum
      }
    >
      <ListField name={`${namePrefix || ''}allowedValues`} />
    </DisplayIfField>

    <DisplayIfField<CreateFieldSchemaObject>
      condition={(context) =>
        extractTypeFromContext(context) === TypeVariant.Interface
      }
    >
      <SelectField
        name={`${namePrefix || ''}interfaceId`}
        options={interfacesOptions}
      />
    </DisplayIfField>

    <DisplayIfField<CreateFieldSchemaObject>
      condition={(context) =>
        extractTypeFromContext(context) === TypeVariant.Unit
      }
    >
      <SelectField
        name={`${namePrefix || ''}allowedUnits`}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        multiple={true}
        options={unitSelectOptions}
      />
    </DisplayIfField>
  </>
)
