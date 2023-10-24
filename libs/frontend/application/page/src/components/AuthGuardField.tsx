import { DisplayIfField } from '@codelab/frontend/presentation/view'
import type { IPageAuthGuardDTO, IPageDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { DeepPartial, GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'

const AuthGuardField = observer(
  ({
    error,
    name,
    onChange,
    value,
    ...props
  }: GuaranteedProps<DeepPartial<IPageAuthGuardDTO>>) => {
    return (
      <section>
        <AutoField name="authGuard" />
        <DisplayIfField<IPageDTO>
          condition={(context) =>
            Boolean(context.model.authGuard?.authGuard.id)
          }
        >
          <SelectField
            name="redirect.kind"
            onChange={(kind) => {
              if (value) {
                onChange(merge(value, { redirect: { kind } }))
              }
            }}
            options={[
              {
                label: 'PageRedirect',
                value: IRedirectKind.PageRedirect,
              },
              {
                label: 'UrlRedirect',
                value: IRedirectKind.UrlRedirect,
              },
            ]}
            required={true}
          />
          <DisplayIfField<IPageDTO>
            condition={(context) =>
              context.model.authGuard?.redirect.kind ===
              IRedirectKind.PageRedirect
            }
          >
            <AutoField name="redirect.page" />
          </DisplayIfField>
          <DisplayIfField<IPageDTO>
            condition={(context) =>
              context.model.authGuard?.redirect.kind ===
              IRedirectKind.UrlRedirect
            }
          >
            <AutoField name="redirect.url" />
          </DisplayIfField>
        </DisplayIfField>
      </section>
    )
  },
)

export const AuthGuardCompositeField = connectField(AuthGuardField)
