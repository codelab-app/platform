import { IElement } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useConvertElementsToComponentsMutation,
  useDuplicateElementMutation,
  useElementDispatch,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { Key } from '@codelab/frontend/view/components'
import { ElementCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
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
export const defaultElementName = (element: IElement) => {
  if (element.name) {
    return element.name
  }

  if (element.atom?.name) {
    return element.atom.name
  }

  if (element.atom?.type) {
    return pascalCaseToWords(element.atom.type)
  }

  return undefined
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = ({
  element,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  const [convertToComponent] = useConvertElementsToComponentsMutation()
  const { elementTree } = useElementGraphContext()
  const [createElement] = useDuplicateElementMutation()
  const { openCreateModal, openDeleteModal } = useElementDispatch()
  const onAddChild = () => openCreateModal({ parentElementId: element.id })
  const { push } = useRouter()

  const onDelete = () =>
    openDeleteModal({
      deleteIds: [element.id],
      entity: element,
    })

  const onDuplicate = () =>
    createElement({
      variables: { input: { elementId: element.id } },
    })

  const onConvert = () => {
    if (element.instanceOfComponent) {
      throw new Error(
        `Element with id ${element.id} is a component instance, can't turn it into a component`,
      )
    }

    const componentTag: ElementCreateInput['componentTag'] = {
      // TODO: complete tag properties
      create: {
        node: {
          name: defaultElementName(element) || 'My Component',
          isRoot: true,
        },
      },
    }

    const instanceOfComponent: ElementCreateInput['instanceOfComponent'] = {
      // TODO: complete tag properties
      create: {
        node: {
          name: element.name,
          parentElement: undefined,
          children: {
            connect: elementTree.getChildren(element.id).map((x: IElement) => ({
              where: { node: { id: x.id } },
              edge: { order: x.parentElement?.order || 1 },
            })),
          },
          componentTag,
        },
      },
    }

    return convertToComponent({
      variables: {
        where: { id: element.id },
        update: {
          instanceOfComponent,
          children: [{ disconnect: [{ where: {} }] }],
        },
      },
    })
  }

  return (
    <Menu
      css={tw`border border-gray-200 shadow-xl`}
      onBlur={onBlur}
      onClick={() => onClick?.()}
    >
      <Menu.Item key="addchild" onClick={() => onAddChild()}>
        Add child
      </Menu.Item>
      <Menu.Item key="duplicate" onClick={() => onDuplicate()}>
        Duplicate
      </Menu.Item>
      {element.instanceOfComponent ? (
        <Menu.Item
          key="1"
          onClick={() =>
            push({
              pathname: PageType.ComponentDetail,
              query: { componentId: element.instanceOfComponent?.id },
            })
          }
        >
          Edit component
        </Menu.Item>
      ) : (
        <Menu.Item key="convert" onClick={() => onConvert()}>
          Convert to component
        </Menu.Item>
      )}
      <Menu.Item danger key="delete" onClick={() => onDelete()}>
        <span>Delete `{element.name}` </span>{' '}
        <span>
          <Key>del</Key> <Key>{'\u232B'}</Key>
        </span>
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
