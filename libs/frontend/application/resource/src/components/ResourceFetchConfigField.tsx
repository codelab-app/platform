import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { DisplayIfField } from '@codelab/frontend-presentation-view/components/form'
import type { IRef } from '@codelab/shared/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField } from 'uniforms-antd'

interface WithResourceRef {
  resource: IRef
}

export const ResourceFetchConfigField = observer(() => {
  const { resourceService } = useStore()

  const getResource = (context: Context<WithResourceRef>) =>
    context.model.resource?.id
      ? resourceService.resource(context.model.resource.id)
      : null

  const getResourceType = (context: Context<WithResourceRef>) =>
    getResource(context)?.type

  const getResourceUrl = (context: Context<WithResourceRef>) =>
    getResource(context)?.config.get('url')

  return (
    <>
      {/** GraphQL Config Form */}
      <DisplayIfField<WithResourceRef>
        condition={(context) =>
          getResourceType(context) === IResourceType.GraphQl
        }
      >
        <AutoField getUrl={getResourceUrl} name="config.data.query" />
        <AutoField name="config.data.variables" />
        <AutoField name="config.data.headers" />
      </DisplayIfField>

      {/** Rest Config Form */}
      <DisplayIfField<WithResourceRef>
        condition={(context) => getResourceType(context) === IResourceType.Rest}
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
