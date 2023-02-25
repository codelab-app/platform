import type {
  IPageService,
  IUpdatePageDTO,
} from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { showFieldOnDev } from '@codelab/frontend/shared/utils'
import { CodeMirrorField, Form } from '@codelab/frontend/view/components'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
} from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { schema } from './updatePageTabSchema'

export const UpdatePageTabForm = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const pageId = useCurrentPageId()
    const page = pageService.page(pageId)

    if (!page) {
      return null
    }

    const onSubmit = (input: IUpdatePageDTO) => pageService.update(input)
    const { kind } = page
    const omitFields = ['appId']

    if (kind === IPageKind.Regular) {
      omitFields.push('pageContainerElementId')
    }

    const model = {
      appId: page.app.id,
      name: page.name,
      getServerSideProps: page.getServerSideProps,
      pageContainerElementId: page.pageContainerElement?.id,
    }

    return (
      <Form
        autosave={true}
        model={model}
        onSubmit={onSubmit}
        schema={schema(kind)}
      >
        <AutoFields omitFields={omitFields} />
      </Form>
    )
  },
)
