import {
  CancellationToken,
  editor,
  IDisposable,
  IEvent,
  IMarkdownString,
  IRange,
  languages,
  MarkerSeverity,
  Position,
  Range,
  Thenable,
  Uri,
} from 'monaco-editor'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as lsTypes from 'vscode-languageserver-types'

export interface WorkerAccessor<T> {
  (...more: Array<Uri>): Thenable<T>
}

// #region DiagnosticsAdapter

export interface ILanguageWorkerWithDiagnostics {
  doValidation(uri: string): Promise<Array<lsTypes.Diagnostic>>
}

export class DiagnosticsAdapter<T extends ILanguageWorkerWithDiagnostics> {
  protected readonly _disposables: Array<IDisposable> = []

  private readonly _listener: { [uri: string]: IDisposable } =
    Object.create(null)

  constructor(
    private readonly _languageId: string,
    protected readonly _worker: WorkerAccessor<T>,
    configChangeEvent: IEvent<any>,
  ) {
    const onModelAdd = (model: editor.IModel): void => {
      const modeId = model.getLanguageId()

      if (modeId !== this._languageId) {
        return
      }

      let handle: number
      this._listener[model.uri.toString()] = model.onDidChangeContent(() => {
        window.clearTimeout(handle)
        handle = window.setTimeout(
          () => this._doValidate(model.uri, modeId),
          500,
        )
      })

      this._doValidate(model.uri, modeId)
    }

    const onModelRemoved = (model: editor.IModel): void => {
      editor.setModelMarkers(model, this._languageId, [])

      const uriStr = model.uri.toString()
      const listener = this._listener[uriStr]

      if (listener) {
        listener.dispose()
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this._listener[uriStr]
      }
    }

    this._disposables.push(editor.onDidCreateModel(onModelAdd))
    this._disposables.push(editor.onWillDisposeModel(onModelRemoved))
    this._disposables.push(
      editor.onDidChangeModelLanguage((event) => {
        onModelRemoved(event.model)
        onModelAdd(event.model)
      }),
    )

    this._disposables.push(
      configChangeEvent((_) => {
        editor.getModels().forEach((model) => {
          if (model.getLanguageId() === this._languageId) {
            onModelRemoved(model)
            onModelAdd(model)
          }
        })
      }),
    )

    this._disposables.push({
      dispose: () => {
        editor.getModels().forEach(onModelRemoved)

        for (const key in this._listener) {
          this._listener[key].dispose()
        }
      },
    })

    editor.getModels().forEach(onModelAdd)
  }

  public dispose(): void {
    this._disposables.forEach((d) => d && d.dispose())
    this._disposables.length = 0
  }

  private _doValidate(resource: Uri, languageId: string): void {
    this._worker(resource)
      .then((worker) => {
        return worker.doValidation(resource.toString())
      })
      .then((diagnostics) => {
        const markers = diagnostics.map((d) => toDiagnostics(resource, d))
        const model = editor.getModel(resource)

        if (model && model.getLanguageId() === languageId) {
          editor.setModelMarkers(model, languageId, markers)
        }
      })
      .then(undefined, (err) => {
        console.error(err)
      })
  }
}

const toSeverity = (lsSeverity: number | undefined): MarkerSeverity => {
  switch (lsSeverity) {
    case lsTypes.DiagnosticSeverity.Error:
      return MarkerSeverity.Error
    case lsTypes.DiagnosticSeverity.Warning:
      return MarkerSeverity.Warning
    case lsTypes.DiagnosticSeverity.Information:
      return MarkerSeverity.Info
    case lsTypes.DiagnosticSeverity.Hint:
      return MarkerSeverity.Hint
    default:
      return MarkerSeverity.Info
  }
}

const toDiagnostics = (
  resource: Uri,
  diag: lsTypes.Diagnostic,
): editor.IMarkerData => {
  const code =
    typeof diag.code === 'number' ? String(diag.code) : <string>diag.code

  return {
    severity: toSeverity(diag.severity),
    startLineNumber: diag.range.start.line + 1,
    startColumn: diag.range.start.character + 1,
    endLineNumber: diag.range.end.line + 1,
    endColumn: diag.range.end.character + 1,
    message: diag.message,
    code: code,
    source: diag.source,
  }
}

// #endregion

// #region CompletionAdapter

export interface ILanguageWorkerWithCompletions {
  doComplete(
    uri: string,
    position: lsTypes.Position,
  ): Promise<lsTypes.CompletionList | null>
}

export class CompletionAdapter<T extends ILanguageWorkerWithCompletions>
  implements languages.CompletionItemProvider
{
  constructor(
    private readonly _worker: WorkerAccessor<T>,
    private readonly _triggerCharacters: Array<string>,
  ) {}

  public get triggerCharacters(): Array<string> {
    return this._triggerCharacters
  }

  provideCompletionItems(
    model: editor.IReadOnlyModel,
    position: Position,
    context: languages.CompletionContext,
    token: CancellationToken,
  ): PromiseLike<languages.CompletionList | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => {
        return worker.doComplete(
          resource.toString(),
          fromPosition(position) as any,
        )
      })
      .then((info) => {
        if (!info) {
          return
        }

        const wordInfo = model.getWordUntilPosition(position)

        const wordRange = new Range(
          position.lineNumber,
          wordInfo.startColumn,
          position.lineNumber,
          wordInfo.endColumn,
        )

        const items: Array<languages.CompletionItem> = info.items.map(
          (entry) => {
            const item: languages.CompletionItem = {
              label: entry.label,
              insertText: entry.insertText || entry.label,
              sortText: entry.sortText,
              filterText: entry.filterText,
              documentation: entry.documentation,
              detail: entry.detail,
              command: toCommand(entry.command),
              range: wordRange,
              kind: toCompletionItemKind(entry.kind),
            }

            if (entry.textEdit) {
              if (isInsertReplaceEdit(entry.textEdit)) {
                item.range = {
                  insert: toRange(entry.textEdit.insert),
                  replace: toRange(entry.textEdit.replace),
                }
              } else {
                item.range = toRange(entry.textEdit.range)
              }

              item.insertText = entry.textEdit.newText
            }

            if (entry.additionalTextEdits) {
              item.additionalTextEdits =
                entry.additionalTextEdits.map<languages.TextEdit>(toTextEdit)
            }

            if (entry.insertTextFormat === lsTypes.InsertTextFormat.Snippet) {
              item.insertTextRules =
                languages.CompletionItemInsertTextRule.InsertAsSnippet
            }

            return item
          },
        )

        return {
          isIncomplete: info.isIncomplete,
          suggestions: items,
        }
      })
  }
}

export const fromPosition = <T extends Position | undefined>(
  position: T,
): T extends undefined ? undefined : lsTypes.Position => {
  if (!position) {
    return void 0 as any
  }

  return {
    character: position.column - 1,
    line: position.lineNumber, // In the original this was -1, but  here we remove it because we add an extra line. endLineNumber too
  } as any
}

export const fromRange = (
  range: IRange | undefined,
): lsTypes.Range | undefined => {
  if (!range) {
    return void 0
  }

  return {
    start: {
      line: range.startLineNumber, // In the original this was -1, but  here we remove it because we add an extra line. endLineNumber too
      character: range.startColumn - 1,
    },
    end: { line: range.endLineNumber, character: range.endColumn - 1 },
  }
}

export const toRange = <TRange extends lsTypes.Range | undefined>(
  range: TRange,
): TRange extends undefined ? undefined : Range => {
  if (!range) {
    return void 0 as any
  }

  return new Range(
    range.start.line, // In the original this was +1, but here we remove it because we add an extra line
    range.start.character + 1,
    range.end.line, // In the original this was +1, but here we remove it because we add an extra line
    range.end.character + 1,
  ) as any
}

const isInsertReplaceEdit = (
  edit: lsTypes.TextEdit | lsTypes.InsertReplaceEdit,
): edit is lsTypes.InsertReplaceEdit =>
  typeof (<lsTypes.InsertReplaceEdit>edit).insert !== 'undefined' &&
  typeof (<lsTypes.InsertReplaceEdit>edit).replace !== 'undefined'

const toCompletionItemKind = (
  kind: number | undefined,
): languages.CompletionItemKind => {
  const mItemKind = languages.CompletionItemKind

  switch (kind) {
    case lsTypes.CompletionItemKind.Text:
      return mItemKind.Text
    case lsTypes.CompletionItemKind.Method:
      return mItemKind.Method
    case lsTypes.CompletionItemKind.Function:
      return mItemKind.Function
    case lsTypes.CompletionItemKind.Constructor:
      return mItemKind.Constructor
    case lsTypes.CompletionItemKind.Field:
      return mItemKind.Field
    case lsTypes.CompletionItemKind.Variable:
      return mItemKind.Variable
    case lsTypes.CompletionItemKind.Class:
      return mItemKind.Class
    case lsTypes.CompletionItemKind.Interface:
      return mItemKind.Interface
    case lsTypes.CompletionItemKind.Module:
      return mItemKind.Module
    case lsTypes.CompletionItemKind.Property:
      return mItemKind.Property
    case lsTypes.CompletionItemKind.Unit:
      return mItemKind.Unit
    case lsTypes.CompletionItemKind.Value:
      return mItemKind.Value
    case lsTypes.CompletionItemKind.Enum:
      return mItemKind.Enum
    case lsTypes.CompletionItemKind.Keyword:
      return mItemKind.Keyword
    case lsTypes.CompletionItemKind.Snippet:
      return mItemKind.Snippet
    case lsTypes.CompletionItemKind.Color:
      return mItemKind.Color
    case lsTypes.CompletionItemKind.File:
      return mItemKind.File
    case lsTypes.CompletionItemKind.Reference:
      return mItemKind.Reference
  }

  return mItemKind.Property
}

const fromCompletionItemKind = (
  kind: languages.CompletionItemKind,
): lsTypes.CompletionItemKind => {
  const mItemKind = languages.CompletionItemKind

  switch (kind) {
    case mItemKind.Text:
      return lsTypes.CompletionItemKind.Text
    case mItemKind.Method:
      return lsTypes.CompletionItemKind.Method
    case mItemKind.Function:
      return lsTypes.CompletionItemKind.Function
    case mItemKind.Constructor:
      return lsTypes.CompletionItemKind.Constructor
    case mItemKind.Field:
      return lsTypes.CompletionItemKind.Field
    case mItemKind.Variable:
      return lsTypes.CompletionItemKind.Variable
    case mItemKind.Class:
      return lsTypes.CompletionItemKind.Class
    case mItemKind.Interface:
      return lsTypes.CompletionItemKind.Interface
    case mItemKind.Module:
      return lsTypes.CompletionItemKind.Module
    case mItemKind.Property:
      return lsTypes.CompletionItemKind.Property
    case mItemKind.Unit:
      return lsTypes.CompletionItemKind.Unit
    case mItemKind.Value:
      return lsTypes.CompletionItemKind.Value
    case mItemKind.Enum:
      return lsTypes.CompletionItemKind.Enum
    case mItemKind.Keyword:
      return lsTypes.CompletionItemKind.Keyword
    case mItemKind.Snippet:
      return lsTypes.CompletionItemKind.Snippet
    case mItemKind.Color:
      return lsTypes.CompletionItemKind.Color
    case mItemKind.File:
      return lsTypes.CompletionItemKind.File
    case mItemKind.Reference:
      return lsTypes.CompletionItemKind.Reference
  }

  return lsTypes.CompletionItemKind.Property
}

export const toTextEdit = <T extends lsTypes.TextEdit | undefined>(
  textEdit: T,
): T extends undefined ? undefined : languages.TextEdit => {
  if (!textEdit) {
    return void 0 as any
  }

  return {
    range: toRange(textEdit.range),
    text: textEdit.newText,
  } as any
}

const toCommand = (
  c: lsTypes.Command | undefined,
): languages.Command | undefined =>
  c && c.command === 'editor.action.triggerSuggest'
    ? { id: c.command, title: c.title, arguments: c.arguments }
    : undefined

// #endregion

// #region HoverAdapter

export interface ILanguageWorkerWithHover {
  doHover(
    uri: string,
    position: lsTypes.Position,
  ): Promise<lsTypes.Hover | null>
}

export class HoverAdapter<T extends ILanguageWorkerWithHover>
  implements languages.HoverProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  provideHover(
    model: editor.IReadOnlyModel,
    position: Position,
    token: CancellationToken,
  ): Thenable<languages.Hover | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => {
        return worker.doHover(resource.toString(), fromPosition(position))
      })
      .then((info) => {
        if (!info) {
          return
        }

        return <languages.Hover>{
          range: toRange(info.range),
          contents: toMarkedStringArray(info.contents),
        }
      })
  }
}

const isMarkupContent = (thing: any): thing is lsTypes.MarkupContent =>
  thing &&
  typeof thing === 'object' &&
  typeof (<lsTypes.MarkupContent>thing).kind === 'string'

const toMarkdownString = (
  entry: lsTypes.MarkupContent | lsTypes.MarkedString,
): IMarkdownString => {
  if (typeof entry === 'string') {
    return {
      value: entry,
    }
  }

  if (isMarkupContent(entry)) {
    if (entry.kind === 'plaintext') {
      return {
        value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'),
      }
    }

    return {
      value: entry.value,
    }
  }

  return { value: '```' + entry.language + '\n' + entry.value + '\n```\n' }
}

const toMarkedStringArray = (
  contents:
    | lsTypes.MarkupContent
    | lsTypes.MarkedString
    | Array<lsTypes.MarkedString>,
): Array<IMarkdownString> | undefined => {
  if (!contents) {
    return void 0
  }

  if (Array.isArray(contents)) {
    return contents.map(toMarkdownString)
  }

  return [toMarkdownString(contents)]
}

// #endregion

// #region DocumentHighlightAdapter

export interface ILanguageWorkerWithDocumentHighlights {
  findDocumentHighlights(
    uri: string,
    position: lsTypes.Position,
  ): Promise<Array<lsTypes.DocumentHighlight>>
}

export class DocumentHighlightAdapter<
  T extends ILanguageWorkerWithDocumentHighlights,
> implements languages.DocumentHighlightProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  public provideDocumentHighlights(
    model: editor.IReadOnlyModel,
    position: Position,
    token: CancellationToken,
  ): Thenable<Array<languages.DocumentHighlight> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) =>
        worker.findDocumentHighlights(
          resource.toString(),
          fromPosition(position),
        ),
      )
      .then((entries) => {
        if (!entries) {
          return
        }

        return entries.map((entry) => {
          return <languages.DocumentHighlight>{
            range: toRange(entry.range),
            kind: toDocumentHighlightKind(entry.kind),
          }
        })
      })
  }
}

const toDocumentHighlightKind = (
  kind: lsTypes.DocumentHighlightKind | undefined,
): languages.DocumentHighlightKind => {
  switch (kind) {
    case lsTypes.DocumentHighlightKind.Read:
      return languages.DocumentHighlightKind.Read
    case lsTypes.DocumentHighlightKind.Write:
      return languages.DocumentHighlightKind.Write
    case lsTypes.DocumentHighlightKind.Text:
      return languages.DocumentHighlightKind.Text
  }

  return languages.DocumentHighlightKind.Text
}

// #endregion

// #region DefinitionAdapter

export interface ILanguageWorkerWithDefinitions {
  findDefinition(
    uri: string,
    position: lsTypes.Position,
  ): Promise<lsTypes.Location | null>
}

export class DefinitionAdapter<T extends ILanguageWorkerWithDefinitions>
  implements languages.DefinitionProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  public provideDefinition(
    model: editor.IReadOnlyModel,
    position: Position,
    token: CancellationToken,
  ): Thenable<languages.Definition | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => {
        return worker.findDefinition(
          resource.toString(),
          fromPosition(position),
        )
      })
      .then((definition) => {
        if (!definition) {
          return
        }

        return [toLocation(definition)]
      })
  }
}

const toLocation = (location: lsTypes.Location): languages.Location => ({
  uri: Uri.parse(location.uri),
  range: toRange(location.range),
})

// #endregion

// #region ReferenceAdapter

export interface ILanguageWorkerWithReferences {
  findReferences(
    uri: string,
    position: lsTypes.Position,
  ): Promise<Array<lsTypes.Location>>
}

export class ReferenceAdapter<T extends ILanguageWorkerWithReferences>
  implements languages.ReferenceProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  provideReferences(
    model: editor.IReadOnlyModel,
    position: Position,
    context: languages.ReferenceContext,
    token: CancellationToken,
  ): Thenable<Array<languages.Location> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => {
        return worker.findReferences(
          resource.toString(),
          fromPosition(position),
        )
      })
      .then((entries) => {
        if (!entries) {
          return
        }

        return entries.map(toLocation)
      })
  }
}

// #endregion

// #region RenameAdapter

export interface ILanguageWorkerWithRename {
  doRename(
    uri: string,
    position: lsTypes.Position,
    newName: string,
  ): Promise<lsTypes.WorkspaceEdit | null>
}

export class RenameAdapter<T extends ILanguageWorkerWithRename>
  implements languages.RenameProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  provideRenameEdits(
    model: editor.IReadOnlyModel,
    position: Position,
    newName: string,
    token: CancellationToken,
  ): Thenable<languages.WorkspaceEdit | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => {
        return worker.doRename(
          resource.toString(),
          fromPosition(position),
          newName,
        )
      })
      .then((edit) => {
        return toWorkspaceEdit(edit)
      })
  }
}

const toWorkspaceEdit = (
  edit: lsTypes.WorkspaceEdit | null,
): languages.WorkspaceEdit | undefined => {
  if (!edit || !edit.changes) {
    return void 0
  }

  const resourceEdits: Array<languages.WorkspaceTextEdit> = []

  for (const uri in edit.changes) {
    const _uri = Uri.parse(uri)

    for (const e of edit.changes[uri]) {
      resourceEdits.push({
        resource: _uri,
        edit: {
          range: toRange(e.range),
          text: e.newText,
        },
      })
    }
  }

  return {
    edits: resourceEdits,
  }
}

// #endregion

// #region DocumentSymbolAdapter

export interface ILanguageWorkerWithDocumentSymbols {
  findDocumentSymbols(uri: string): Promise<Array<lsTypes.SymbolInformation>>
}

export class DocumentSymbolAdapter<T extends ILanguageWorkerWithDocumentSymbols>
  implements languages.DocumentSymbolProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  public provideDocumentSymbols(
    model: editor.IReadOnlyModel,
    token: CancellationToken,
  ): Thenable<Array<languages.DocumentSymbol> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => worker.findDocumentSymbols(resource.toString()))
      .then((items) => {
        if (!items) {
          return
        }

        return items.map((item) => ({
          name: item.name,
          detail: '',
          containerName: item.containerName,
          kind: toSymbolKind(item.kind),
          range: toRange(item.location.range),
          selectionRange: toRange(item.location.range),
          tags: [],
        }))
      })
  }
}

const toSymbolKind = (kind: lsTypes.SymbolKind): languages.SymbolKind => {
  const mKind = languages.SymbolKind

  switch (kind) {
    case lsTypes.SymbolKind.File:
      return mKind.Array
    case lsTypes.SymbolKind.Module:
      return mKind.Module
    case lsTypes.SymbolKind.Namespace:
      return mKind.Namespace
    case lsTypes.SymbolKind.Package:
      return mKind.Package
    case lsTypes.SymbolKind.Class:
      return mKind.Class
    case lsTypes.SymbolKind.Method:
      return mKind.Method
    case lsTypes.SymbolKind.Property:
      return mKind.Property
    case lsTypes.SymbolKind.Field:
      return mKind.Field
    case lsTypes.SymbolKind.Constructor:
      return mKind.Constructor
    case lsTypes.SymbolKind.Enum:
      return mKind.Enum
    case lsTypes.SymbolKind.Interface:
      return mKind.Interface
    case lsTypes.SymbolKind.Function:
      return mKind.Function
    case lsTypes.SymbolKind.Variable:
      return mKind.Variable
    case lsTypes.SymbolKind.Constant:
      return mKind.Constant
    case lsTypes.SymbolKind.String:
      return mKind.String
    case lsTypes.SymbolKind.Number:
      return mKind.Number
    case lsTypes.SymbolKind.Boolean:
      return mKind.Boolean
    case lsTypes.SymbolKind.Array:
      return mKind.Array
  }

  return mKind.Function
}

// #endregion

// #region DocumentLinkAdapter

export interface ILanguageWorkerWithDocumentLinks {
  findDocumentLinks(uri: string): Promise<Array<lsTypes.DocumentLink>>
}

export class DocumentLinkAdapter<T extends ILanguageWorkerWithDocumentLinks>
  implements languages.LinkProvider
{
  constructor(private _worker: WorkerAccessor<T>) {}

  public provideLinks(
    model: editor.IReadOnlyModel,
    token: CancellationToken,
  ): Thenable<languages.ILinksList | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => worker.findDocumentLinks(resource.toString()))
      .then((items) => {
        if (!items) {
          return
        }

        return {
          links: items.map((item) => ({
            range: toRange(item.range),
            url: item.target,
          })),
        }
      })
  }
}

// #endregion

// #region DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider

export interface ILanguageWorkerWithFormat {
  format(
    uri: string,
    range: lsTypes.Range | null,
    options: lsTypes.FormattingOptions,
  ): Promise<Array<lsTypes.TextEdit>>
}

export class DocumentFormattingEditProvider<T extends ILanguageWorkerWithFormat>
  implements languages.DocumentFormattingEditProvider
{
  constructor(private _worker: WorkerAccessor<T>) {}

  public provideDocumentFormattingEdits(
    model: editor.IReadOnlyModel,
    options: languages.FormattingOptions,
    token: CancellationToken,
  ): Thenable<Array<languages.TextEdit> | undefined> {
    const resource = model.uri

    return this._worker(resource).then((worker) => {
      return worker
        .format(resource.toString(), null, fromFormattingOptions(options))
        .then((edits) => {
          if (!edits || edits.length === 0) {
            return
          }

          return edits.map<languages.TextEdit>(toTextEdit)
        })
    })
  }
}

export class DocumentRangeFormattingEditProvider<
  T extends ILanguageWorkerWithFormat,
> implements languages.DocumentRangeFormattingEditProvider
{
  constructor(private _worker: WorkerAccessor<T>) {}

  public provideDocumentRangeFormattingEdits(
    model: editor.IReadOnlyModel,
    range: Range,
    options: languages.FormattingOptions,
    token: CancellationToken,
  ): Thenable<Array<languages.TextEdit> | undefined> {
    const resource = model.uri

    return this._worker(resource).then((worker) => {
      return worker
        .format(
          resource.toString(),
          fromRange(range) ?? null,
          fromFormattingOptions(options),
        )
        .then((edits) => {
          if (!edits || edits.length === 0) {
            return
          }

          return edits.map<languages.TextEdit>(toTextEdit)
        })
    })
  }
}

const fromFormattingOptions = (
  options: languages.FormattingOptions,
): lsTypes.FormattingOptions => ({
  tabSize: options.tabSize,
  insertSpaces: options.insertSpaces,
})

// #endregion

// #region DocumentColorAdapter

export interface ILanguageWorkerWithDocumentColors {
  findDocumentColors(uri: string): Promise<Array<lsTypes.ColorInformation>>
  getColorPresentations(
    uri: string,
    color: lsTypes.Color,
    range: lsTypes.Range,
  ): Promise<Array<lsTypes.ColorPresentation>>
}

export class DocumentColorAdapter<T extends ILanguageWorkerWithDocumentColors>
  implements languages.DocumentColorProvider
{
  constructor(private readonly _worker: WorkerAccessor<T>) {}

  public provideDocumentColors(
    model: editor.IReadOnlyModel,
    token: CancellationToken,
  ): Thenable<Array<languages.IColorInformation> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => worker.findDocumentColors(resource.toString()))
      .then((infos) => {
        if (!infos) {
          return
        }

        return infos.map((item) => ({
          color: item.color,
          range: toRange(item.range),
        }))
      })
  }

  public provideColorPresentations(
    model: editor.IReadOnlyModel,
    info: languages.IColorInformation,
    token: CancellationToken,
  ): Thenable<Array<languages.IColorPresentation> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) =>
        worker.getColorPresentations(
          resource.toString(),
          info.color,
          fromRange(info.range) ?? {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 0 },
          },
        ),
      )
      .then((presentations) => {
        if (!presentations) {
          return
        }

        return presentations.map((presentation) => {
          const item: languages.IColorPresentation = {
            label: presentation.label,
          }

          if (presentation.textEdit) {
            item.textEdit = toTextEdit(presentation.textEdit)
          }

          if (presentation.additionalTextEdits) {
            item.additionalTextEdits =
              presentation.additionalTextEdits.map<languages.TextEdit>(
                toTextEdit,
              )
          }

          return item
        })
      })
  }
}

// #endregion

// #region FoldingRangeAdapter

export interface ILanguageWorkerWithFoldingRanges {
  getFoldingRanges(
    uri: string,
    context?: { rangeLimit?: number },
  ): Promise<Array<lsTypes.FoldingRange>>
}

export class FoldingRangeAdapter<T extends ILanguageWorkerWithFoldingRanges>
  implements languages.FoldingRangeProvider
{
  constructor(private _worker: WorkerAccessor<T>) {}

  public provideFoldingRanges(
    model: editor.IReadOnlyModel,
    context: languages.FoldingContext,
    token: CancellationToken,
  ): Thenable<Array<languages.FoldingRange> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) => worker.getFoldingRanges(resource.toString(), context))
      .then((ranges) => {
        if (!ranges) {
          return
        }

        return ranges.map((range) => {
          const result: languages.FoldingRange = {
            start: range.startLine + 1,
            end: range.endLine + 1,
          }

          if (typeof range.kind !== 'undefined') {
            result.kind = toFoldingRangeKind(
              <lsTypes.FoldingRangeKind>range.kind,
            )
          }

          return result
        })
      })
  }
}

const toFoldingRangeKind = (
  kind: lsTypes.FoldingRangeKind,
): languages.FoldingRangeKind | undefined => {
  switch (kind) {
    case lsTypes.FoldingRangeKind.Comment:
      return languages.FoldingRangeKind.Comment
    case lsTypes.FoldingRangeKind.Imports:
      return languages.FoldingRangeKind.Imports
    case lsTypes.FoldingRangeKind.Region:
      return languages.FoldingRangeKind.Region
  }

  return void 0
}

// #endregion

// #region SelectionRangeAdapter

export interface ILanguageWorkerWithSelectionRanges {
  getSelectionRanges(
    uri: string,
    positions: Array<lsTypes.Position>,
  ): Promise<Array<lsTypes.SelectionRange>>
}

export class SelectionRangeAdapter<T extends ILanguageWorkerWithSelectionRanges>
  implements languages.SelectionRangeProvider
{
  constructor(private _worker: WorkerAccessor<T>) {}

  public provideSelectionRanges(
    model: editor.IReadOnlyModel,
    positions: Array<Position>,
    token: CancellationToken,
  ): Thenable<Array<Array<languages.SelectionRange>> | undefined> {
    const resource = model.uri

    return this._worker(resource)
      .then((worker) =>
        worker.getSelectionRanges(
          resource.toString(),
          positions.map<lsTypes.Position>(fromPosition),
        ),
      )
      .then((selectionRanges) => {
        if (!selectionRanges) {
          return
        }

        return selectionRanges.map(
          (selectionRange: lsTypes.SelectionRange | undefined) => {
            const result: Array<languages.SelectionRange> = []

            while (selectionRange) {
              result.push({ range: toRange(selectionRange.range) })
              selectionRange = selectionRange.parent
            }

            return result
          },
        )
      })
  }
}

// #endregion
