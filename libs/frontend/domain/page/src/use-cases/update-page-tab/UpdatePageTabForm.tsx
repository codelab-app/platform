import type {
  IPageService,
  IUpdatePageDTO,
} from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { CodeMirrorField, Form } from '@codelab/frontend/view/components'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
} from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const UpdatePageTabForm = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const pageId = useCurrentPageId()
    const page = pageService.page(pageId)

    if (!page) {
      return null
    }

    const onSubmit = (input: IUpdatePageDTO) => pageService.update(page, input)
    const { isProvider } = page
    const omitFields = ['appId']

    if (!isProvider) {
      omitFields.push('pageContainerElementId')
    }

    // pageContainerElementId is not required in interface, but is required for _app page
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const schema: JSONSchemaType<IUpdatePageDTO> = {
      type: 'object',
      properties: {
        appId: { type: 'string' },
        name: { type: 'string', disabled: isProvider },
        slug: { type: 'string', disabled: isProvider },
        getServerSideProps: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Typescript,
            }),
          },
        },
        pageContainerElementId: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: getSelectElementComponent(ElementTypeKind.AllElements),
          },
        },
      },
      required: ['name', 'slug', 'pageContainerElementId'],
    } as const

    const model = {
      appId: page.app.id,
      name: page.name,
      slug: page.slug,
      getServerSideProps: page.getServerSideProps,
      pageContainerElementId: page.pageContainerElement?.id,
    }

    return (
      <Form autosave={true} model={model} onSubmit={onSubmit} schema={schema}>
        <AutoFields omitFields={omitFields} />
      </Form>
    )
  },
)
