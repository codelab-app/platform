import {
  InterfaceForm,
  InterfaceType,
  WithTypeService,
} from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { PropsData } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useCurrentResource } from '../../../hooks'
import { WithResourceService } from '../../../store'

export const UpdateResourceData = observer<
  WithTypeService & WithResourceService
>(({ typeService, resourceService }) => {
  const { resource } = useCurrentResource(resourceService)

  const [getInterfaceType, { data, isLoading }] = useLoadingState(
    (id: string) => typeService.getInterfaceAndDescendants({ id }),
  )

  useEffect(() => {
    if (resource?.api?.id) {
      getInterfaceType(resource.api?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (input: PropsData) => {
    if (!resource) {
      throw new Error('Updated resource is not set')
    }

    return resourceService.update(resource, {
      data: JSON.stringify(input),
      apiId: resource.api.current.id,
      name: resource.name,
    })
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating resource',
  })

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ConditionalView condition={Boolean(data)}>
        <Card>
          <InterfaceForm
            autosave
            interfaceType={data as InterfaceType}
            key={resource?.id}
            model={resource?.data || {}}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            submitRef={undefined}
          />
        </Card>
      </ConditionalView>
    </SpinnerWrapper>
  )
})
