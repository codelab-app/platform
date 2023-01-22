import type {
  IActionService,
  IFieldService,
  IResourceService,
  IStore,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import type { UseResizable } from '@codelab/frontend/view/components'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface EditorPaneBuilderProps {
  resizable: UseResizable
  actionService: IActionService
  fieldService: IFieldService
  typeService: ITypeService
  resourceService: IResourceService
  appStore?: IStore
}

const Container = styled.div`
  height: 100%;

  .ant-tabs,
  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`

export const EditorPaneBuilder = observer(
  ({
    resizable,
    actionService,
    appStore,
    fieldService,
    typeService,
    resourceService,
  }: EditorPaneBuilderProps) => {
    return <Container></Container>
  },
)
