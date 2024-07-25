'use client'

import { useStore } from '@codelab/frontend/infra/mobx'
import { propSafeStringify } from '@codelab/frontend-domain-prop/utils'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useForm } from 'uniforms'

interface ResourceTestRequestProps {
  fetchConfigDataFieldName: string
  resourceIdFieldName: string
}

export const ResourceTestRequest = observer<ResourceTestRequestProps>(
  ({ fetchConfigDataFieldName, resourceIdFieldName }) => {
    const { resourceService } = useStore()
    const { model } = useForm()
    const resourceId = get(model, resourceIdFieldName)
    const resource = resourceId ? resourceService.resource(resourceId) : null
    const config = get(model, fetchConfigDataFieldName)
    const [response, setResponse] = useState<object>({})

    return (
      <DisplayIf condition={resource && config}>
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
            setResponse((await resource?.client.fetch(config)) || response)
          }}
        >
          Test
        </Button>
      </DisplayIf>
    )
  },
)
