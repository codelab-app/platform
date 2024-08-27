import { isRuntimeElement } from '@codelab/frontend/abstract/application'
import { type IComponentModel } from '@codelab/frontend/abstract/domain'
import { CreateElementButton } from '@codelab/frontend-application-element/use-cases/create-element'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const BuilderTreeItemComponentTitle = observer<{
  component: IComponentModel
}>(({ component }) => {
  const { builderService } = useApplicationStore()
  const selectedNode = builderService.selectedNode?.current

  const element =
    selectedNode && isRuntimeElement(selectedNode)
      ? selectedNode.element.current
      : undefined

  return (
    <Row justify="space-between">
      <Col className="px-2">{component.name}</Col>
      <Col className="px-2">
        <CreateElementButton
          elementTree={component}
          key={0}
          selectedElementId={element?.id}
          type="text"
        />
      </Col>
    </Row>
  )
})
