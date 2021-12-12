import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import {
  CreateComponentService,
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
  ExportPageSchema,
  IExportApp,
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
    protected createComponentService: CreateComponentService,
    protected updatePageService: UpdatePageService,
  ) {
    super(dgraph)
  }

  private prasePayload(payload: string): IExportApp {
    return ExportAppSchema.parse(JSON.parse(payload))
  }

  private async createApp(
    payload: string,
    currentUser: IUser,
  ): Promise<{ appId: string; payload: string }> {
    const prasedPayload = this.prasePayload(payload)

    const { id: appId } = await this.createAppService.execute({
      currentUser,
      input: { name: prasedPayload.name },
    })

    return {
      appId,
      payload: payload.replace(new RegExp(prasedPayload.id, 'g'), appId),
    }
  }

  protected async createPages(
    payload: string,
    appId: string,
    currentUser: IUser,
  ): Promise<IExportApp> {
    const prasedPayload = this.prasePayload(payload)

    for (const payloadPage of prasedPayload.pages) {
      const input = {
        appId,
        name: payloadPage.name,
      }

      const { id } = await this.createPageService.execute({
        input,
        currentUser,
      })

      payload = payload.replace(new RegExp(payloadPage.id, 'g'), id)
    }

    return ExportAppSchema.parse(JSON.parse(payload))
  }

  protected async createComponents(
    currentUser: IUser,
    pagePayload: IExportPage,
  ): Promise<IExportPage> {
    let payloadStr = JSON.stringify(pagePayload)
    const elementTree = new ElementTree(pagePayload.elements)
    const components = elementTree.getAllVertices(ElementTree.isComponent)

    for (const component of components) {
      const componentChildInput = this.createElementInput(
        component.id,
        elementTree,
      )

      const { id } = await this.createComponentService.execute({
        currentUser,
        input: componentChildInput,
      })

      payloadStr = payloadStr.replace(new RegExp(component.id, 'g'), id)
    }

    return ExportPageSchema.parse(JSON.parse(payloadStr))
  }

  protected async createElements(
    currentUser: IUser,
    pagePayload: IExportPage,
    appId: string,
  ): Promise<void> {
    const elementTree = new ElementTree(pagePayload.elements)
    const treeRoot = elementTree.getRootVertex(ElementTree.isElement)

    if (!treeRoot) {
      throw new Error('No root element found')
    }

    const rootElement = this.createElementInput(treeRoot.id, elementTree)

    await this.updatePageService.execute({
      input: {
        pageId: pagePayload.id,
        updateData: {
          appId,
          name: pagePayload.name,
          rootElement,
        },
      },
      currentUser,
    })
  }

  protected createElementInput(
    elementId: string,
    tree: ElementTree,
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
      newElement: this.createElementInput(child.id, tree, iteration + 1),
    }))

    const hooks = element.hooks.map<HookRef>((x) => ({
      config: x.config.data,
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

  protected async executeTransaction({
    input,
    currentUser,
  }: ImportAppRequest): Promise<CreateResponse> {
    // payload with updated appId
    const { appId, payload: payloadWithApp } = await this.createApp(
      input.payload,
      currentUser,
    )

    // payload with updated pagesIds
    const payloadWithPages = await this.createPages(
      payloadWithApp,
      appId,
      currentUser,
    )

    for (const pagePayload of payloadWithPages.pages) {
      // update components references
      const pagePayloadWithComponents = await this.createComponents(
        currentUser,
        pagePayload,
      )

      await this.createElements(currentUser, pagePayloadWithComponents, appId)
    }

    return { id: appId }
  }
}
