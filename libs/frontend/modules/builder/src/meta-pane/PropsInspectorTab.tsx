import {
  refetchGetElementQuery,
  useGetElementQuery,
  useUpdateElementPropsMutation,
} from '@codelab/frontend/modules/element'
import { notify } from '@codelab/frontend/shared/utils'
import { MonacoEditor } from '@codelab/frontend/view/components'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useBuilder } from '../containers/builderState'

export interface ElementPropsSectionProps {
  elementId: string
}

const propSafeStringify = (props: any) => {
  const obj: Record<string, any> = {}

  for (const k in props) {
    if (k.startsWith('_')) {
      continue
    }

    obj[k] = props[k]
  }

  const cache: Array<any> | null = []

  return JSON.stringify(
    obj,
    (k, v) => {
      if (k === 'children') {
        return
      }

      if (typeof v === 'object' && v !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(v)) {
          return
        }

        // Store value in our collection
        cache.push(v)
      }

      return v
    },
    4,
  )
}

const PropsInspectorTab = ({ elementId }: ElementPropsSectionProps) => {
  const [value, setValue] = useState<string | undefined>()

  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const {
    state: { currentElementProps },
  } = useBuilder()

  const [mutate, { loading }] = useUpdateElementPropsMutation({
    refetchQueries: [refetchGetElementQuery({ input: { elementId } })],
  })

  const element = data?.getElement

  useEffect(() => {
    const rightSideProps = JSON.parse(element?.props ?? '{}')
    const rightSidePropsContent = JSON.stringify(rightSideProps, null, 4)
    setValue(rightSidePropsContent)
  }, [element])

  if (!element) {
    return null
  }

  console.log(value)

  const save = () => {
    if (!value) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      mutate({
        variables: {
          input: { elementId, props: JSON.stringify(JSON.parse(value)) },
        },
      })
    } catch (e) {
      notify({ title: 'Invalid json', type: 'warning' })
    }
  }

  const content = propSafeStringify(currentElementProps[elementId] ?? {})

  return (
    <div css={tw`grid grid-cols-2 gap-x-8 h-full`}>
      <div>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <MonacoEditor
          containerProps={{ style: { height: '100%' } }}
          editorOptions={{ language: 'json', readOnly: true }}
          value={content}
        />
      </div>

      <div>
        <div css={tw`flex flex-row justify-between items-center px-8`}>
          <h3 css={tw`text-gray-700`}>Element props</h3>
          <Button onClick={() => save()} loading={loading}>
            Save
          </Button>
        </div>
        <MonacoEditor
          containerProps={{ style: { height: '100%' } }}
          editorOptions={{ language: 'json' }}
          value={value}
          onChange={(v) => {
            setValue(v)
          }}
        />
      </div>
    </div>
  )
}

export { PropsInspectorTab }
