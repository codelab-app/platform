import * as monaco from 'monaco-editor'
import {
  LanguageServiceDefaults,
  ModeConfiguration,
  Options,
} from 'monaco-editor/esm/vs/language/css/monaco.contribution'
import * as cssInJsLang from './cssInJsLang'
import type * as mode from './cssInJsMode'

class LanguageServiceDefaultsImpl implements LanguageServiceDefaults {
  private _onDidChange = new monaco.Emitter<LanguageServiceDefaults>()

  private _options!: Options

  private _modeConfiguration!: ModeConfiguration

  private _languageId: string

  constructor(
    languageId: string,
    options: Options,
    modeConfiguration: ModeConfiguration,
  ) {
    this._languageId = languageId
    this.setOptions(options)
    this.setModeConfiguration(modeConfiguration)
  }

  get onDidChange(): monaco.IEvent<LanguageServiceDefaults> {
    return this._onDidChange.event
  }

  get languageId(): string {
    return this._languageId
  }

  get modeConfiguration(): ModeConfiguration {
    return this._modeConfiguration
  }

  get diagnosticsOptions(): Options {
    return this.options
  }

  get options(): Options {
    return this._options
  }

  setOptions(options: Options): void {
    this._options = options || Object.create(null)
    this._onDidChange.fire(this)
  }

  setDiagnosticsOptions(options: Options): void {
    this.setOptions(options)
  }

  setModeConfiguration(modeConfiguration: ModeConfiguration): void {
    this._modeConfiguration = modeConfiguration || Object.create(null)
    this._onDidChange.fire(this)
  }
}

const optionsDefault: Required<Options> = {
  validate: true,
  lint: {
    compatibleVendorPrefixes: 'ignore',
    vendorPrefix: 'warning',
    duplicateProperties: 'warning',
    emptyRules: 'warning',
    importStatement: 'ignore',
    boxModel: 'ignore',
    universalSelector: 'ignore',
    zeroUnits: 'ignore',
    fontFaceProperties: 'warning',
    hexColorLength: 'error',
    argumentsInColorFunction: 'error',
    unknownProperties: 'warning',
    ieHack: 'ignore',
    unknownVendorSpecificProperties: 'ignore',
    propertyIgnoredDueToDisplay: 'warning',
    important: 'ignore',
    float: 'ignore',
    idSelector: 'ignore',
  },
  data: { useDefaultDataProvider: true },
}

const modeConfigurationDefault: Required<ModeConfiguration> = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true,
}

export const cssInJsDefaults: LanguageServiceDefaults =
  new LanguageServiceDefaultsImpl(
    'cssInJs',
    optionsDefault,
    modeConfigurationDefault,
  )

const getMode = (): Promise<typeof mode> => {
  return import('./cssInJsMode')
}

monaco.languages.register({
  id: 'cssInJs',
})

monaco.languages.setMonarchTokensProvider(
  'cssInJs',
  cssInJsLang.language as any,
)
monaco.languages.setLanguageConfiguration(
  'cssInJs',
  cssInJsLang.cssInJsLang as any,
)

monaco.languages.onLanguage('cssInJs', () => {
  getMode().then((_mode) => _mode.setupMode(cssInJsDefaults))
})
