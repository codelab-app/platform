import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField } from 'uniforms-antd'

interface ResourceFetchConfigProps<TData> {
  getResource(model: Context<TData>): Nullish<IResourceModel>
}

export const ResourceFetchConfig = <TData,>({
  getResource,
}: ResourceFetchConfigProps<TData>) => {
  const getType = (context: Context<TData>) => getResource(context)?.type

  const getUrl = (context: Context<TData>) =>
    getResource(context)?.config.get('url')

  return (
    <>
      {/** GraphQL Config Form */}
      <DisplayIfField<TData>
        condition={(context) => getType(context) === IResourceType.GraphQl}
      >
        <AutoField getUrl={getUrl} name="config.data.query" />
        <AutoField name="config.data.variables" />
        <AutoField name="config.data.headers" />
      </DisplayIfField>

      {/** Rest Config Form */}
      <DisplayIfField<TData>
        condition={(context) => getType(context) === IResourceType.Rest}
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
}
