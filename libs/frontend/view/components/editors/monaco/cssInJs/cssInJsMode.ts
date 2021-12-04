import { IDisposable, languages, Uri } from 'monaco-editor'
import type { LanguageServiceDefaults } from 'monaco-editor/esm/vs/language/css/monaco.contribution'
import type { CSSInJsWorker } from './CSSInJsWorker'
import * as languageFeatures from './languageFeatures'
import { WorkerManager } from './workerManager'

export const setupMode = (defaults: LanguageServiceDefaults): IDisposable => {
  const disposables: Array<IDisposable> = []
  const providers: Array<IDisposable> = []
  const client = new WorkerManager(defaults)
  disposables.push(client)

  const worker: any = (
    // : WorkerAccessor<CSSWorker>
    ...uris: Array<Uri>
  ): Promise<CSSInJsWorker> => {
    return client.getLanguageServiceWorker(...uris)
  }

  const registerProviders = (): void => {
    const { languageId, modeConfiguration } = defaults

    disposeAll(providers)

    if (modeConfiguration.completionItems) {
      providers.push(
        languages.registerCompletionItemProvider(
          languageId,
          new languageFeatures.CompletionAdapter(worker, ['/', '-', ':']),
        ),
      )
    }

    if (modeConfiguration.hovers) {
      providers.push(
        languages.registerHoverProvider(
          languageId,
          new languageFeatures.HoverAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.documentHighlights) {
      providers.push(
        languages.registerDocumentHighlightProvider(
          languageId,
          new languageFeatures.DocumentHighlightAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.definitions) {
      providers.push(
        languages.registerDefinitionProvider(
          languageId,
          new languageFeatures.DefinitionAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.references) {
      providers.push(
        languages.registerReferenceProvider(
          languageId,
          new languageFeatures.ReferenceAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.documentSymbols) {
      providers.push(
        languages.registerDocumentSymbolProvider(
          languageId,
          new languageFeatures.DocumentSymbolAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.rename) {
      providers.push(
        languages.registerRenameProvider(
          languageId,
          new languageFeatures.RenameAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.colors) {
      providers.push(
        languages.registerColorProvider(
          languageId,
          new languageFeatures.DocumentColorAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.foldingRanges) {
      providers.push(
        languages.registerFoldingRangeProvider(
          languageId,
          new languageFeatures.FoldingRangeAdapter(worker),
        ),
      )
    }

    if (modeConfiguration.diagnostics) {
      providers.push(
        new languageFeatures.DiagnosticsAdapter(
          languageId,
          worker,
          defaults.onDidChange,
        ),
      )
    }

    if (modeConfiguration.selectionRanges) {
      providers.push(
        languages.registerSelectionRangeProvider(
          languageId,
          new languageFeatures.SelectionRangeAdapter(worker),
        ),
      )
    }
  }

  registerProviders()

  disposables.push(asDisposable(providers))

  return asDisposable(disposables)
}

const asDisposable = (disposables: Array<IDisposable>): IDisposable => ({
  dispose: () => disposeAll(disposables),
})

const disposeAll = (disposables: Array<IDisposable>) => {
  while (disposables.length) {
    disposables.pop()!.dispose()
  }
}
