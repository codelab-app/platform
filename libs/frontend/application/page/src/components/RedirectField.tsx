import { SelectPage } from '@codelab/frontend/application/type'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import React from 'react'
import type { DeepPartial, GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectField, TextField } from 'uniforms-antd'

const RedirectFields = ({
  error,
  onChange,
  ...props
}: GuaranteedProps<DeepPartial<IPageDTO['authGuard']>>) => {
  return (
    <section>
      <SelectField
        name="redirect.__typename"
        onChange={(value) => {
          console.log(value)

          // when the type changes, the selected atom or component has to be
          // removed since they share the same field name `redirect.id`
          if (value) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            onChange({
              redirect: {
                __typename: value,
              },
            })
          }
        }}
        options={[
          {
            label: 'Page',
            value: IRedirectKind.Page,
          },
          {
            label: 'Url',
            value: IRedirectKind.Url,
          },
        ]}
        required={false}
      />
      <DisplayIfField<IPageDTO>
        condition={(context) =>
          context.model.authGuard?.redirect.__typename === IRedirectKind.Page
        }
      >
        <SelectPage error={error} name="redirect.page.id" />
      </DisplayIfField>
      <DisplayIfField<IPageDTO>
        condition={(context) =>
          context.model.authGuard?.redirect.__typename === IRedirectKind.Url
        }
      >
        <TextField error={error} label="Url" name="redirect.url" />
      </DisplayIfField>
    </section>
  )
}

export const RedirectCompositeField = connectField(RedirectFields)
