import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { threeGridCol } from '@codelab/frontend/view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { CreateResourceButton } from '../create-resource'
import { GetResourcesItem } from './GetResourceItem'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  margin: 'auto',
  width: '150px',
  textAlign: 'center',
}

export const GetResourcesList = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const [getResources, { isLoading }] = useStatefulExecutor(() =>
      resourceService.getAll(),
    )

    useEffect(() => {
      getResources()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resourceList = resourceService.resourceList

    return (
      <Spinner isLoading={isLoading}>
        <DisplayIf condition={!resourceList || !resourceList.length}>
          <Empty description="No resources found" imageStyle={{ height: 60 }}>
            <div style={buttonContainerStyle}>
              <CreateResourceButton resourceService={resourceService} />
            </div>
          </Empty>
        </DisplayIf>

        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          {resourceList.map((resource) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Col key={resource.id} {...threeGridCol}>
              <GetResourcesItem
                resource={resource}
                resourceService={resourceService}
              />
            </Col>
          ))}
        </Row>
      </Spinner>
    )
  },
)
