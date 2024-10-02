'use client'

import type { ObjectLike } from '@codelab/shared/abstract/types'

import { propSafeStringify } from '@codelab/frontend-domain-prop/utils'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import {
  ICodeMirrorLanguage,
  type IResourceFetchConfig,
} from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { isEmpty, prop } from 'remeda'
import { useForm } from 'uniforms'

import { useResourceService } from '../services'

interface ResourceTestRequestProps {
  fetchConfigDataFieldName: string
  resourceIdFieldName: string
}

export const ResourceTestRequest = observer<ResourceTestRequestProps>(
  ({ fetchConfigDataFieldName, resourceIdFieldName }) => {
    const resourceService = useResourceService()
    const { model } = useForm()

    const resourceId = prop(
      model as Record<string, string>,
      resourceIdFieldName,
    )

    const resource = resourceService.getOneFromCache({ id: resourceId })

    const config = prop(
      model as Record<string, IResourceFetchConfig>,
      fetchConfigDataFieldName,
    )

    const [response, setResponse] = useState<ObjectLike>({})

    return (
      <DisplayIf condition={!isEmpty(config)}>
        <h3 className="text-gray-700">Response</h3>
        <CodeMirrorEditor
          height="150px"
          language={ICodeMirrorLanguage.Json}
          onChange={() => undefined}
          readOnly
          title="Response"
          value={propSafeStringify(response)}
        />
        <Button
          onClick={async () => {
            setResponse(await resource.client.fetch(config))
          }}
        >
          Test
        </Button>
      </DisplayIf>
    )
  },
)
