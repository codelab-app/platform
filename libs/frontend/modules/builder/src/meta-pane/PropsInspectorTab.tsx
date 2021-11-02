import {
  refetchGetElementQuery,
  useGetElementQuery,
  useUpdateElementPropsMutation,
} from '@codelab/frontend/modules/element'
import { notify } from '@codelab/frontend/shared/utils'
import { MonacoEditor } from '@codelab/frontend/view/components'
import { propSafeStringify } from '@codelab/shared/utils'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useBuilder } from '../containers/builderState'

export interface ElementPropsSectionProps {
  elementId: string
}

const PropsInspectorTab = ({ elementId }: ElementPropsSectionProps) => {
  const [persistedPropsValue, setPersistedPropsValue] = useState<
    string | undefined
  >()

  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { where: { id: elementId } } },
  })

  const {
    state: { currentElementProps },
    setExtraPropsForElement,
  } = useBuilder()

  const [mutate, { loading }] = useUpdateElementPropsMutation({
    refetchQueries: [
      refetchGetElementQuery({ input: { where: { id: elementId } } }),
    ],
  })

  const element = data?.getElement

  useEffect(() => {
    if (element?.props) {
      try {
        setPersistedPropsValue(
          JSON.stringify(JSON.parse(element.props), null, 4),
        )
      } catch (e) {
        console.warn("Couldn't parse element props", element?.props)
      }
    }
  }, [element?.props])

  useEffect(() => {
    return () => {
      setExtraPropsForElement(elementId, {})
    }
  }, [elementId, setExtraPropsForElement])

  if (!element) {
    return null
  }

  const save = async () => {
    if (!persistedPropsValue) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      await mutate({
        variables: {
          input: {
            elementId,
            props: JSON.stringify(JSON.parse(persistedPropsValue)),
          },
        },
      })
    } catch (e) {
      notify({ title: 'Invalid json', type: 'warning' })
    }
  }

  const currentPropsValue = propSafeStringify(
    currentElementProps[elementId] ?? {},
  )

  return (
    <div css={tw`grid grid-cols-2 gap-x-8 h-full`}>
      <div>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <MonacoEditor
          containerProps={{ style: { height: '100%' } }}
          editorOptions={{ language: 'json', readOnly: true }}
          value={currentPropsValue}
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
          value={persistedPropsValue}
          onChange={(v) => {
            setPersistedPropsValue(v)

            try {
              setExtraPropsForElement(elementId, JSON.parse(v))
            } catch (e) {
              //
            }
          }}
        />
      </div>
    </div>
  )
}

export { PropsInspectorTab }
