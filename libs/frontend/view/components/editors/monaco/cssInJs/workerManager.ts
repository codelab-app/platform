import { Uri } from 'monaco-editor'
import {
  editor,
  IDisposable,
} from 'monaco-editor/esm/vs/language/css/fillers/monaco-editor-core'
import { LanguageServiceDefaults } from 'monaco-editor/esm/vs/language/css/monaco.contribution'
import { CSSInJsWorker } from './CSSInJsWorker'

const STOP_WHEN_IDLE_FOR = 2 * 60 * 1000 // 2min

export class WorkerManager {
  private _defaults: LanguageServiceDefaults

  private _idleCheckInterval: number

  private _lastUsedTime: number

  private _configChangeListener: IDisposable

  private _worker: editor.MonacoWebWorker<CSSInJsWorker> | null

  private _client: Promise<CSSInJsWorker> | null

  constructor(defaults: LanguageServiceDefaults) {
    this._defaults = defaults
    this._worker = null
    this._client = null
    this._idleCheckInterval = window.setInterval(
      () => this._checkIfIdle(),
      30 * 1000,
    )
    this._lastUsedTime = 0
    this._configChangeListener = this._defaults.onDidChange(() =>
      this._stopWorker(),
    )
  }

  private _stopWorker(): void {
    if (this._worker) {
      this._worker.dispose()
      this._worker = null
    }

    this._client = null
  }

  dispose(): void {
    clearInterval(this._idleCheckInterval)
    this._configChangeListener.dispose()
    this._stopWorker()
  }

  private _checkIfIdle(): void {
    if (!this._worker) {
      return
    }

    const timePassedSinceLastUsed = Date.now() - this._lastUsedTime

    if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
      this._stopWorker()
    }
  }

  private _getClient(): Promise<CSSInJsWorker> {
    this._lastUsedTime = Date.now()

    if (!this._client) {
      this._worker = editor.createWebWorker<CSSInJsWorker>({
        moduleId: 'codelab/editor/cssInJs', // This doesn't matter, because we don't use AMD
        label: this._defaults.languageId,
        // passed in to the create() method
        createData: {
          options: this._defaults.options,
          languageId: this._defaults.languageId,
        },
      })

      this._client = this._worker.getProxy() as any as Promise<CSSInJsWorker>
    }

    return this._client
  }

  getLanguageServiceWorker(...resources: Array<Uri>): Promise<CSSInJsWorker> {
    let _client: CSSInJsWorker

    return this._getClient()
      .then((client) => {
        _client = client
      })
      .then((_) => {
        if (this._worker) {
          return this._worker.withSyncedResources(resources)
        }

        return undefined
      })
      .then((_) => _client)
  }
}
