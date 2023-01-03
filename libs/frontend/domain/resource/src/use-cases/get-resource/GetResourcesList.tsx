import type { IResourceService } from '@codelab/frontend/abstract/core'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { threeGridCol } from '@codelab/frontend/view/style'
import { supabase } from '@codelab/shared/adapter/supabase'
import { Col, Empty, Row, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
import { CreateResourceButton } from '../create-resource'
import type { IDemoResource } from './GetDemoResourceItem'
import { GetDemoResourcesItem } from './GetDemoResourceItem'
import { GetResourcesItem } from './GetResourceItem'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  margin: 'auto',
  width: '150px',
  textAlign: 'center',
}

export const GetResourcesList = observer<{ resourceService: IResourceService }>(
  ({ resourceService }) => {
    const { loading } = useAsync(() => resourceService.getAll(), [])

    const { loading: loadingDemoResources } = useAsync(
      () => fetchResources(),
      [],
    )

    const [demoResources, setDemoResources] = useState<Array<IDemoResource>>([])

    const fetchResources = async () => {
      try {
        const { data, error } = await supabase.from('resource').select('*')

        if (error) {
          throw error
        }

        setDemoResources(data)
      } catch (error) {
        console.log(error)
      }
    }

    const resourceList = resourceService.resourceList

    return (
      <Spinner isLoading={loading || loadingDemoResources}>
        <div
          css={tw`pb-4 mb-4 border-solid border-0 border-b-2 border-b-gray-200`}
        >
          <Typography.Title
            level={4}
            style={{
              marginTop: '1rem',
            }}
          >
            Example Resource
          </Typography.Title>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {demoResources.map((resource: IDemoResource) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Col key={resource.id} {...threeGridCol}>
                <GetDemoResourcesItem resource={resource} />
              </Col>
            ))}
          </Row>
        </div>
        <DisplayIf condition={!resourceList.length}>
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
