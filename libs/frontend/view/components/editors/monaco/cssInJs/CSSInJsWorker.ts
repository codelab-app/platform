import { Nullable } from '@codelab/shared/abstract/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as worker from 'monaco-editor/esm/vs/editor/editor.worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CSSWorker } from 'monaco-editor/esm/vs/language/css/cssWorker'
import * as cssService from 'vscode-css-languageservice'

export class CSSInJsWorker extends CSSWorker {
  // --- model sync -----------------------

  protected _ctx: worker.IWorkerContext

  // private _languageService: cssService.LanguageService

  // private _languageSettings: cssService.LanguageSettings

  protected _languageId: string

  constructor(ctx: worker.IWorkerContext, createData: ICreateData) {
    super(ctx, { ...createData, languageId: 'scss' }) // This loads the correct _languageService
    this._ctx = ctx
    this._languageId = createData.languageId
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected override _getTextDocument(
    uri: string,
  ): Nullable<cssService.TextDocument> {
    const models = this._ctx.getMirrorModels()

    for (const model of models) {
      if (model.uri.toString() === uri) {
        const value = `.this {
${model.getValue()}
}`

        return cssService.TextDocument.create(
          uri,
          this._languageId,
          model.version,
          value,
        )
      }
    }

    return null
  }
}

export interface ICreateData {
  languageId: string
  options: any // Options Don't know where to import this from
}

export const create = (
  ctx: worker.IWorkerContext,
  createData: ICreateData,
): CSSInJsWorker => new CSSInJsWorker(ctx, createData)
