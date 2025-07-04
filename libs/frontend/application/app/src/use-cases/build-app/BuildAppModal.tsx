'use client'

import type { IAppModel } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useBuildApp } from './useBuildApp.hook'

export const BuildAppModal = observer<{ app: IAppModel }>(({ app }) => {
  const router = useRouter()
  const { regenerate } = useBuildApp()
  const onSubmit = () => regenerate(app)
  const closeModal = () => router.push(RoutePaths.App.list())

  return (
    <ModalForm.Modal
      okText="Build App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalBuild}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to build all pages for "{app.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
