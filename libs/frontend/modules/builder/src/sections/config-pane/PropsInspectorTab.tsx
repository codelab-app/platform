import {
  IElement,
  IElementService,
  IRenderer,
} from '@codelab/shared/abstract/core'
import Button from 'antd/lib/button'
import TextArea from 'antd/lib/input/TextArea'
import { observer } from 'mobx-react-lite'
import React, { ChangeEvent } from 'react'
import tw from 'twin.macro'
import { usePropsInspector } from '../../hooks'

export type ElementPropsSectionProps = {
  element: IElement
  renderer: IRenderer
  elementService: IElementService
}

const PropsInspectorTab = observer(
  ({ element, renderer, elementService }: ElementPropsSectionProps) => {
    const {
      save,
      lastRenderedPropsString,
      persistedProps,
      setPersistedProps,
      isLoading,
      setExtraPropsForElement,
    } = usePropsInspector(element, renderer, elementService)

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const props = event.target.value
      setPersistedProps(props)

      try {
        setExtraPropsForElement(JSON.parse(props))
      } catch (error) {
        //
        console.log(error)
      }
    }

    return (
      <div>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <TextArea readOnly rows={10} value={lastRenderedPropsString} />
        <h3 css={tw`text-gray-700`}>Element props</h3>
        <TextArea onChange={onChange} rows={10} value={persistedProps} />
        <Button loading={isLoading} onClick={() => save()}>
          Save
        </Button>
      </div>
    )
  },
)

export { PropsInspectorTab }
