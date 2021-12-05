import {
  CreateElementInput,
  ElementRef,
  HookRef,
} from '@codelab/frontend/abstract/codegen'
import { IElement, IHook } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'

const hookToHookInput = (hook: IHook): HookRef => {
  return {
    type: hook.type,
    config: hook.config.data,
  }
}

export const duplicateElementInput = (
  element: IElement,
  tree: ElementTree,
  isChild?: boolean,
): CreateElementInput => {
  const parent = tree.getParentOf(element.id)

  if (!parent) {
    throw new Error(`Parent of element ${element.name} not found`)
  }

  const order = tree.getOrderInParent(element.id)

  const childInput = {
    atom: element.atom ? { atomId: element.atom.id } : undefined,
    css: element.css,
    isComponent: !!element.componentTag,
    name: element.name,
    order: order,
    propTransformationJs: element.propTransformationJs,
    props: element.props.data,
    refId: element.id,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfPropKey: element.renderIfPropKey,
    hooks: element.hooks?.map(hookToHookInput),
    propMapBindings: element.propMapBindings?.map((pmb) => ({
      targetKey: pmb.targetKey,
      sourceKey: pmb.sourceKey,
      targetElementId: pmb.targetElementId, // Will get resolved using the refId we set above
    })),
    children: tree.getChildren(element.id).map<ElementRef>((child) => {
      if (ElementTree.isComponent(child)) {
        return { elementId: child.id }
      }

      return {
        newElement: duplicateElementInput(child, tree, true),
      }
    }),
  }

  if (isChild) {
    return childInput
  }

  return {
    parentElementId: isChild ? undefined : parent.id,
    ...childInput,
  }
}
