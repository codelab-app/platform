import 'react-quill/dist/quill.snow.css'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IPropData,
} from '@codelab/shared/abstract/core'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import QuillNoSSRWrapper from './QuillNoSSRWrapper'

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
    const [value, setValue] = useState(element.props?.values?.['customText'])

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

    return element.atom?.current.allowCustomTextInjection ? (
      <Row align="middle">
        <Col span={24}>
          <p style={{ color: inEditMode() ? '#000000' : '#D1D1D1' }}>
            Custom Text
          </p>
        </Col>
        <Col span={24}>
          <QuillNoSSRWrapper
            onChange={(newCustomText) => {
              setValue(newCustomText)
              onSubmit({
                ...element.props?.values,
                customText: newCustomText,
              })
            }}
            theme="snow"
            value={value}
          />
        </Col>
      </Row>
    ) : null
  },
)
