import {
  CodeMirrorInput,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IPropData,
} from '@codelab/shared/abstract/core'
import { html, htmlCompletionSource } from '@codemirror/lang-html'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export type UpdateInnerHtmlFormProps = {
  elementService: IElementService
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const UpdateInnerHtmlForm = observer<UpdateInnerHtmlFormProps>(
  ({ elementService, element, trackPromises }) => {
    const { trackPromise } = trackPromises ?? {}

    const inEditMode = useCallback(
      () => element.children.size === 0,
      [element.children.size],
    )

    const onSubmit = (data: IPropData) => {
      const promise = elementService.patchElement(element, {
        props: {
          update: {
            node: {
              data: JSON.stringify(data),
            },
          },
        },
      })

      return trackPromise?.(promise) ?? promise
    }

    return (
      <Row align="middle">
        <Col span={4}>
          <p style={{ color: inEditMode() ? '#000000' : '#D1D1D1' }}>
            InnerHtml
          </p>
        </Col>
        <Col span={20}>
          <CodeMirrorInput
            defaultCompletionSource={htmlCompletionSource}
            editable={inEditMode()}
            extensions={[html()]}
            height="150px"
            onChange={(newInnerHTML) => {
              onSubmit({
                ...element.props?.values,
                dangerouslySetInnerHTML: {
                  __html: newInnerHTML,
                },
              })
            }}
            shouldDisableNewLines={false}
            title="InnerHtml"
            value={element.props?.values?.['dangerouslySetInnerHTML']?.__html}
          />
        </Col>
      </Row>
    )
  },
)
