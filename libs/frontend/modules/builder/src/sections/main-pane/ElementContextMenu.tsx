import { IElement } from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { EntityLike, Maybe, Nullish } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Menu } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export interface ElementContextMenuProps {
  element: Element
  elementService: ElementService
  onClick?: () => any
  onBlur?: () => any
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = ({
  element,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  // const [convertToComponent] = useConvertElementsToComponentsMutation()
  // const [createElement] = useDuplicateElementMutation()
  // const { push } = useRouter()
  // const { elementTree } = useElementGraphContext()
  // const { user } = useUserState()
  // const { openCreateModal, openDeleteModal } = useElementDispatch()
  const isComponentInstance = !!element.instanceOfComponent
  // const hideForRoot = elementTree?.getRootVertex()?.id === element.id

  const onAddChild = () => {
    // openCreateModal({ parentElementId: element.id })
  }

  const onDelete = () => {
    // openDeleteModal({
    //   deleteIds: [element.id],
    //   entity: element,
    // })
  }

  const onDuplicate = () => {
    // createElement({
    //   variables: { input: { elementId: element.id } },
    // })
  }

    const onDuplicate = () => {
      if (!user?.sub) {
        return
      }

    // const instanceOfComponent: ElementCreateInput['instanceOfComponent'] = {
    //   create: {
    //     node: {
    //       owner: { connect: { where: { node: { auth0Id: user.auth0Id } } } },
    //       name: element.name || element.atom?.name || element.id,
    //       rootElement: getElementCreationInput(element, elementTree),
    //     },
    //   },
    // }
    //
    // return convertToComponent({
    //   variables: {
    //     where: { id: element.id },
    //     update: {
    //       instanceOfComponent,
    //       children: [{ disconnect: [{ where: {} }] }],
    //       hooks: [{ disconnect: [{ where: {} }] }],
    //       propMapBindings: [{ disconnect: [{ where: {} }] }],
    //       atom: { disconnect: { where: {} } },
    //       props: { disconnect: { where: {} } },
    //     },
    //   },
    // })
  }

  const onEditComponent = () => {
    // push({
    //   pathname: PageType.ComponentDetail,
    //   query: { componentId: element.instanceOfComponent?.id },
    // })
  }

      return elementService.convertElementToComponent(element, user.sub)
    }

      {/* <Menu.Item hidden={hideForRoot} key="duplicate" onClick={onDuplicate}>*/}
      {/*  Duplicate*/}
      {/* </Menu.Item>*/}

      {isComponentInstance ? (
        <Menu.Item
          // hidden={hideForRoot}
          key="edit-component"
          onClick={onEditComponent}
        >
          Edit Component
        </Menu.Item>
      ) : (
        <Menu.Item
          // hidden={hideForRoot}
          key="convert-component"
          onClick={onConvert}
        >
          Convert To Component
        </Menu.Item>
      )}

      {/* <Menu.Item danger hidden={hideForRoot} key="delete" onClick={onDelete}>*/}
      {/*  <span>Delete `{element.name}` </span>{' '}*/}
      {/*  <span>*/}
      {/*    <Key>del</Key> <Key>{'\u232B'}</Key>*/}
      {/*  </span>*/}
      {/* </Menu.Item>*/}
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
