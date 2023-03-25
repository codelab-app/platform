import { useStore } from '@codelab/frontend/presenter/container'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { threeGridCol } from '@codelab/frontend/view/style'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateResourceButton } from '../create-resource'
import { ResourcesItem } from './ResourceItem'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  margin: 'auto',
  textAlign: 'center',
  width: '150px',
}

export const ResourcesList = observer(() => {
  const { resourceService } = useStore()
  const [{ status }, getResources] = useAsync(() => resourceService.getAll())
  const resourceList = resourceService.resourceList

  useMountEffect(getResources.execute)

  return (
    <Spinner isLoading={status === 'loading'}>
      <DisplayIf condition={!resourceList.length}>
        <Empty description="No resources found" imageStyle={{ height: 60 }}>
          <div style={buttonContainerStyle}>
            <CreateResourceButton />
          </div>
        </Empty>
      </DisplayIf>

      <Row gutter={[16, { lg: 32, md: 24, sm: 16, xs: 8 }]}>
        {resourceList.map((resource) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={resource.id} {...threeGridCol}>
            <ResourcesItem resource={resource} />
          </Col>
        ))}
      </Row>
    </Spinner>
  )
})
