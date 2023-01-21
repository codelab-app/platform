import type {
  IActionService,
  IBuilderService,
  IComponentService,
  ICreateElementDTO,
  IElementService,
  IElementTree,
  IRenderService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  AutofillElementName,
  SelectAction,
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type { Maybe } from '@codelab/shared/abstract/codegen'
import type {
  Nullable,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import tw from 'twin.macro'
import { AutoField, AutoFields, TextField } from 'uniforms-antd'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils/elementOptions'
import { createElementSchema } from './createElementSchema'

interface CreateElementModalProps {
  pageTree: IElementTree
  renderService: IRenderService
  actionService: IActionService
  builderService: IBuilderService
  elementService: IElementService
  userService: IUserService
  componentService: IComponentService
  storeId: string
}

export const CreateElementModal = observer<CreateElementModalProps>(
  ({
    elementService,
    builderService,
    userService,
    pageTree,
    renderService,
  }) => {
    const onSubmit = async (data: ICreateElementDTO) => {
      const { prevSiblingId } = data

      const element = await (prevSiblingId
        ? elementService.createElementAsNextSibling(data)
        : elementService.createElementAsFirstChild(data))

      // Build tree for page
      pageTree.addElements([element])

      // Get the component tree for the current element, so we can update the component tree
      const componentId = builderService.activeComponent?.id

      if (componentId) {
        const componentTree =
          renderService.renderers.get(componentId)?.pageTree?.current

        componentTree?.addElements([element])
      }

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement
    const [atomId, setAtomId] = useState<Maybe<string>>()
    const [compId, setCompId] = useState<Maybe<string>>()
    const [name, setName] = useState<Maybe<string>>()

    const [model, setModel] =
      useState<Nullable<Partial<ICreateElementDTO & { owner: string }>>>(null)

    useEffect(() => {
      if (parentElement) {
        setModel({
          parentElementId: parentElement.id,
          owner: userService.user?.auth0Id,
          // Needs to be null initially so that required sub-fields
          // are not validated when nothing is selected yet
          renderType: null,
        })
      }
    }, [parentElement, userService.user?.auth0Id])

    if (!parentElement || !model) {
      return null
    }

    const closeModal = () => elementService.createModal.close()

    const selectParentElementOptions =
      pageTree.elementsList.map(mapElementOption)

    const selectChildrenElementOptions =
      pageTree.elementsList.map(mapElementOption)

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        open={elementService.createModal.isOpen}
        title={<span css={tw`font-semibold`}>Create element</span>}
      >
        <ModalForm.Form<ICreateElementDTO>
          model={model}
          onChange={(k, v) => {
            if (k === 'atomId' && v !== atomId) {
              setAtomId(v)
            }

            if (k === 'renderComponentTypeId' && v !== compId) {
              setCompId(v)
            }
          }}
          onSubmit={(data) => {
            return onSubmit({
              ...data,
              name,
            })
          }}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createElementSchema}
        >
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <SelectAtom
                error={props.error}
                label={props.label}
                name={props.name}
                parent={parentElement.atom?.maybeCurrent}
              />
            )}
            name="atomId"
          />
          <AutoField component={SelectComponent} name="renderComponentTypeId" />
          <AutoFields
            omitFields={[
              'parentElementId',
              'customCss',
              'guiCss',
              'propsData',
              'prevSiblingId',
              'preRenderActionId',
              'postRenderActionId',
              'renderType',
              'name',
              'slug',
            ]}
          />
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <SelectAnyElement
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                allElementOptions={selectParentElementOptions}
              />
            )}
            name="parentElementId"
          />
          <SelectLinkElement
            allElementOptions={selectChildrenElementOptions}
            name="prevSiblingId"
          />
          <RenderTypeCompositeField
            name="renderType"
            parent={parentElement.atom?.maybeCurrent}
          />
          <AutoField component={SelectAction} name="preRenderActionId" />
          <AutoField component={SelectAction} name="postRenderActionId" />
          <Divider />
          <AutofillElementName
            atomId={atomId ?? undefined}
            componentId={compId ?? undefined}
            label="name"
            name="name"
            onChange={(value) => {
              setName(value)
            }}
          />
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <TextField
                error={props.error}
                label={props.label}
                name={props.name}
                value={slugify(name || '')}
              />
            )}
            name="slug"
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
