import { FieldsTable, WithTypeService } from '@codelab/frontend/modules/type'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useCurrentStore } from '../../../hooks'
import { WithStoreService } from '../../../store'

export const GetStateTable = observer<WithStoreService & WithTypeService>(
  ({ storeService, typeService }) => {
    const { store } = useCurrentStore(storeService)
    const interfaceId = store?.stateId

    const [getType, { data: type, isLoading }] = useLoadingState(() =>
      typeService.getInterfaceAndDescendants({ id: interfaceId }),
    )

    useEffect(() => {
      getType()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      type && (
        <FieldsTable
          hideActions={true}
          interfaceType={type}
          isLoading={isLoading}
          typeService={typeService}
        />
      )
    )
  },
)
