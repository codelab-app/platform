import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import {
  CreateElementChildInput,
  CreateElementService,
  ElementRef,
  HookRef,
  NewPropMapBindingRef,
} from '@codelab/backend/modules/element'
import { CreatePageService } from '@codelab/backend/modules/page'
import { ExportAppSchema, IPropMapBinding } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { Injectable } from '@nestjs/common'
import { AppValidator } from '../../domain/app.validator'
import { CreateAppService } from '../create-app'
import { GetAppService } from '../get-app'
import { ImportAppRequest } from './import-app.request'

@Injectable()
export class ImportAppService extends DgraphUseCase<
  ImportAppRequest,
  CreateResponse
> {
  constructor(
    dgraph: DgraphRepository,
    protected appValidator: AppValidator,
    protected getAppService: GetAppService,
    protected createAppService: CreateAppService,
    protected createPageService: CreatePageService,
    protected createElementService: CreateElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction({
    input,
    currentUser,
  }: ImportAppRequest): Promise<CreateResponse> {
    const payload = ExportAppSchema.parse(JSON.parse(input.payload))

    const { id: appId } = await this.createAppService.execute({
      currentUser,
      input: {
        name: payload.name,
      },
    })

    // Keep a map of created component ids to payload component ids, in case there's duplicates
    const componentIdMap = new Map<string, string>()

    for (const payloadPage of payload.pages) {
      const elementTree = new ElementTree(payloadPage.elements)
      const rootElement = elementTree.getRootVertex(ElementTree.isElement)

      if (!rootElement) {
        throw new Error('No root element found')
      }

      const rootElementInput = this.createElementInput(
        rootElement.id,
        elementTree,
        componentIdMap,
      )

      await this.createPageService.execute({
        input: { appId, name: payloadPage.name, rootElement: rootElementInput },
        currentUser,
      })
    }

    return { id: appId }
  }

  protected createElementRef(
    elementId: string,
    tree: ElementTree,
    componentIdMap: Map<string, string>,
    iteration = 0,
  ): ElementRef {
    if (iteration > 100000) {
      throw new Error('Infinite loop detected')
    }

    if (componentIdMap.has(elementId)) {
      return {
        elementId: componentIdMap.get(elementId),
      }
    }

    return {
      newElement: this.createElementInput(
        elementId,
        tree,
        componentIdMap,
        iteration,
      ),
    }
  }

  protected createElementInput(
    elementId: string,
    tree: ElementTree,
    componentIdMap: Map<string, string>,
    iteration = 0,
  ): CreateElementChildInput {
    if (iteration > 100000) {
      throw new Error('Infinite loop detected')
    }

    const element = tree.getVertex(elementId)

    if (!element) {
      // Shouldn't happen
      throw new Error(
        `Invalid state, cant find element ${elementId} in the tree `,
      )
    }

    return {
      name: element.name ?? undefined,
      css: element.css ?? undefined,
      renderIfPropKey: element.renderIfPropKey ?? undefined,
      props: element.props.data,
      isComponent: !!element.componentTag,
      refId: elementId, // This allows us to keep the same propMapBinding references
      atom: element.atom ? { atomType: element.atom.type } : undefined,
      order: tree.getOrderInParent(elementId),
      renderForEachPropKey: element.renderForEachPropKey ?? undefined,
      propTransformationJs: element.propTransformationJs ?? undefined,
      hooks: element.hooks.map<HookRef>((x) => ({
        config: x.config.data,
        type: x.type,
      })),
      propMapBindings: element.propMapBindings?.map((pmb) =>
        this.propMapBindingInput(pmb),
      ),
      children: tree
        .getChildren(elementId)
        .map((child) =>
          this.createElementRef(child.id, tree, componentIdMap, iteration + 1),
        ),
    }
  }

  protected propMapBindingInput(pmb: IPropMapBinding): NewPropMapBindingRef {
    return {
      targetKey: pmb.targetKey,
      sourceKey: pmb.sourceKey,
      targetElementId: pmb.targetElementId ?? undefined,
    }
  }
}
