import type { IRef } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { Context } from 'uniforms'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { DisplayIfField } from '@codelab/frontend-presentation-components-form'
import { IResourceType } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoField } from 'uniforms-antd'

interface WithResourceRef extends ObjectLike {
  resource: IRef
}

export const ResourceFetchConfigField = observer(() => {
  const { resourceDomainService } = useDomainStore()

  const getResource = (context: Context<WithResourceRef>) => {
    const resourceId = context.model.resource.id

    return resourceId ? resourceDomainService.resources.get(resourceId) : null
  }

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
