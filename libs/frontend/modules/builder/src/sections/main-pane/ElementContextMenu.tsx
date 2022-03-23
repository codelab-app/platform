import { IElement } from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { EntityLike, Maybe, Nullish } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Menu } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export interface ElementContextMenuProps {
  element: IElement
  onClick?: () => any
  onBlur?: () => any
}

/**
 * Generates a default element name based on the element's name or atom
 */
export const defaultElementName = (element: IElement) =>
  element.name ||
  element.atom?.name ||
  (element.atom?.type ? pascalCaseToWords(element?.atom?.type) : undefined)

const connect = (id: Maybe<string>) =>
  id ? { connect: { where: { node: { id } } } } : undefined

const connectArray = (items: Nullish<Array<EntityLike>>) => ({
  connect: items?.map((x) => ({ where: { node: { id: x.id } } })),
})

const getElementCreationInput = (
  element: IElement,
  tree: ElementTree,
): ComponentCreateInput['rootElement'] => ({
  create: {
    node: {
      css: element.css,
      propTransformationJs: element.propTransformationJs,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
      component: undefined,
      instanceOfComponent: undefined,
      parentElement: undefined,
      name: element.name || element.atom?.name || element.id,
      atom: connect(element.atom?.id),
      props: connect(element.props?.id),
      hooks: connectArray(element.hooks),
      children: connectArray(tree.getChildren(element.id)),
      propMapBindings: connectArray(element?.propMapBindings),
    },
  },
})

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

  const onConvert = () => {
    onClick?.()

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

  return (
    <Menu
      css={tw`border border-gray-200 shadow-xl`}
      onBlur={onBlur}
      onClick={() => onClick?.()}
    >
      <Menu.Item key="add-child" onClick={onAddChild}>
        Add child
      </Menu.Item>

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
