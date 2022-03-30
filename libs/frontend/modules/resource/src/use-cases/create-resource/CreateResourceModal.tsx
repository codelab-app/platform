import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { createNotificationHandler, useLoadingState } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { Resource } from '../../store/resource.model'
import {
  CreateResourceInput,
  initialResourceSchema,
} from '../../schema/initialResourceSchema'
import { ResourceService, WithResourceService } from '../..'
import { AtomService } from '@codelab/frontend/modules/atom'
import { AtomType } from '@codelab/shared/abstract/codegen-v2'
import { InterfaceForm, interfaceFormApi, SelectAtom, SelectResourceAtom, TypeService } from '@codelab/frontend/modules/type'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { ResourceModalInterfaceForm } from '../../components/ResourceModalInterfaceForm'
import { createResourceSchema } from './createResourceSchema'


export const CreateResourceModal = observer(
  ({ resourceService, typeService }: WithResourceService<{ typeService: TypeService }>) => {
    const closeModal = () => resourceService.createModal.close()

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating resource',
    })

    const onSubmit = (input: CreateResourceInput) => {
      return resourceService.add(input)
    }

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        visible={resourceService.createModal.isOpen}
      >

        <ResourceModalInterfaceForm
          typeService={typeService}
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          initialSchema={createResourceSchema}
        />


      </ModalForm.Modal>
    )
  },
)
