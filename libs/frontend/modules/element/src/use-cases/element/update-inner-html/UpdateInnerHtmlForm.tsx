import {
  CodeMirrorInput,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IPropData,
} from '@codelab/shared/abstract/core'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

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
    const initialPropsRef = useRef(element?.props?.values ?? {})

    const onSubmit = (data: IPropData) => {
      console.log(data)

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
          <p style={{ color: '#000000' }}>InnerHtml</p>
        </Col>
        <Col span={20}>
          <CodeMirrorInput
            onChange={(newInnerHTML) => {
              onSubmit({
                ...initialPropsRef.current,
                dangerouslySetInnerHTML: {
                  __html: newInnerHTML,
                },
              })
            }}
            title="InnerHtml"
            value={initialPropsRef.current['dangerouslySetInnerHTML'].__html}
          />
        </Col>
      </Row>
    )
  },
)
