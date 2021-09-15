import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// eslint-disable-next-line import/no-webpack-loader-syntax
import GraphQLWorker from 'worker-loader!./graphql.worker'
// eslint-disable-next-line import/no-webpack-loader-syntax
import EditorWorker from 'worker-loader!monaco-editor/esm/vs/editor/editor.worker'
// eslint-disable-next-line import/no-webpack-loader-syntax
import CssWorker from 'worker-loader!monaco-editor/esm/vs/language/css/css.worker'
// eslint-disable-next-line import/no-webpack-loader-syntax
import JSONWorker from 'worker-loader!monaco-editor/esm/vs/language/json/json.worker'
// eslint-disable-next-line import/no-webpack-loader-syntax
import TsWorker from 'worker-loader!monaco-editor/esm/vs/language/typescript/ts.worker'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.monaco = monaco
// eslint-disable-next-line import/first
import { api as GraphqlApi } from 'monaco-graphql/esm/monaco.contribution'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === 'graphqlDev') {
      return new GraphQLWorker()
    }

    if (label === 'json') {
      return new JSONWorker()
    }

    if (label === 'css') {
      return new CssWorker()
    }

    if (label === 'javascript' || label === 'typescript') {
      return new TsWorker()
    }

    return new EditorWorker()
  },
}

export { GraphqlApi, monaco }
