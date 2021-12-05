import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import {
  CreateElementChildInput,
  CreateElementService,
  HookRef,
  NewPropMapBindingRef,
} from '@codelab/backend/modules/element'
import {
  CreatePageService,
  UpdatePageService,
} from '@codelab/backend/modules/page'
import {
  ExportAppSchema,
  IExportPage,
  IPropMapBinding,
  IUser,
} from '@codelab/shared/abstract/core'
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
    protected updatePageService: UpdatePageService,
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

    const pageIdMap = await this.createEmptyPages(
      payload.pages,
      appId,
      currentUser,
    )

    for (const payloadPage of payload.pages) {
      const elementTree = new ElementTree(payloadPage.elements)
      const treeRoot = elementTree.getRootVertex(ElementTree.isElement)
      const newPageId = pageIdMap.get(payloadPage.id) ?? ''

      if (!treeRoot) {
        throw new Error('No root element found')
      }

      const rootElement = this.createElementInput(
        treeRoot.id,
        elementTree,
        payloadPage.id,
        newPageId,
        payload.id,
        appId,
      )

      await this.updatePageService.execute({
        input: {
          pageId: newPageId,
          updateData: {
            appId,
            name: payloadPage.name,
            rootElement,
          },
        },
        currentUser,
      })
    }

    return { id: appId }
  }

  protected async createEmptyPages(
    pagesPayload: Array<IExportPage>,
    appId: string,
    currentUser: IUser,
  ) {
    const pageIdMap = new Map<string, string>()

    for (const payloadPage of pagesPayload) {
      const input = { appId, name: payloadPage.name }

      const { id } = await this.createPageService.execute({
        input,
        currentUser,
      })

      pageIdMap.set(payloadPage.id, id)
    }

    return pageIdMap
  }

  protected createElementInput(
    elementId: string,
    tree: ElementTree,
    oldPageId: string,
    newPageId: string,
    oldAppId: string,
    newAppId: string,
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

    const children = tree.getChildren(elementId).map((child) => ({
      newElement: this.createElementInput(
        child.id,
        tree,
        oldPageId,
        newPageId,
        oldAppId,
        newAppId,
        iteration + 1,
      ),
    }))

    const hooks = element.hooks.map<HookRef>((x) => ({
      config: x.config.data
        .replace(oldPageId, newPageId)
        .replace(oldAppId, newAppId),
      type: x.type,
    }))

    const propMapBindings = element.propMapBindings?.map((pmb) =>
      this.propMapBindingInput(pmb),
    )

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
      hooks,
      propMapBindings,
      children,
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
