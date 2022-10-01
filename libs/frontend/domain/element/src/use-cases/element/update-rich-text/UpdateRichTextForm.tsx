import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import ReactQuill from './ReactQuill'

export const CUSTOM_TEXT_PROP_KEY = 'customText'

export interface UpdateRichTextFormProps {
  elementService: IElementService
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link'],
    ['clean'],
  ],
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const UpdateRichTextForm = observer<UpdateRichTextFormProps>(
  ({ elementService, element, trackPromises }) => {
    const { trackPromise } = trackPromises ?? {}

    const [value, setValue] = useState(
      element.props?.values?.[CUSTOM_TEXT_PROP_KEY],
    )

    const inEditMode = useCallback(
      () => element.children.length === 0,
      [element.children.length],
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
          <ReactQuill
            modules={modules}
            onChange={(newCustomText) => {
              setValue(newCustomText)
              void onSubmit({
                ...element.props?.values,
                [CUSTOM_TEXT_PROP_KEY]: newCustomText,
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
