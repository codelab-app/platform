import type {
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import type { ICreateApiActionData } from '@codelab/shared/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField } from 'uniforms-antd'

export const ResourceFetchConfig = observer(() => {
  const { resourceService } = useStore()

  return (
    <>
      {/** GraphQL Config Form */}
      <DisplayIfField<IResourceModel>
        condition={(context) => context.model.type === IResourceType.GraphQl}
      >
        <AutoField
          getUrl={(context: Context<IResourceModel>) => {
            const url = (context.model.config as IPropModel).get('url')

            return url
          }}
          name="config.data.query"
        />
        <AutoField name="config.data.variables" />
        <AutoField name="config.data.headers" />
      </DisplayIfField>

      {/** Rest Config Form */}
      <DisplayIfField<IResourceModel>
        condition={(context) => context.model.type === IResourceType.Rest}
      >
        <AutoField name="config.data.urlSegment" />
        <AutoField name="config.data.method" />
        <AutoField name="config.data.body" />
        <AutoField name="config.data.queryParams" />
        <AutoField name="config.data.headers" />
        <AutoField name="config.data.responseType" />
      </DisplayIfField>
    </>
  )
})
