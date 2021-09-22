import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
/* eslint-disable import/no-webpack-loader-syntax, @typescript-eslint/ban-ts-comment */
import GraphQLWorker from 'worker-loader!./graphql.worker'
import EditorWorker from 'worker-loader!monaco-editor/esm/vs/editor/editor.worker'
import CssWorker from 'worker-loader!monaco-editor/esm/vs/language/css/css.worker'
import JSONWorker from 'worker-loader!monaco-editor/esm/vs/language/json/json.worker'
import TsWorker from 'worker-loader!monaco-editor/esm/vs/language/typescript/ts.worker'

// @ts-ignore
window.monaco = monaco
// eslint-disable-next-line import/first
import { api as GraphqlApi } from 'monaco-graphql/esm/monaco.contribution'

/**
 * Removed monaco-editor/react because it didn't work with GraphQL. Didn’t work with the css-in-js modification too, had to remove the workers from it.
 *
 * Added the actual monaco-editor package, and to make it work we need to serve workers through next.js. To do that, worker-loader bundles them with webpack.
 *
 * Monaco-editor/react loads core monaco-editor through script tags. Monaco-editor when imported directly can't work with SSR, so we wrap with dynamic() & include `ssr: false`.
 *
 * We need to provide custom worker instances for monaco-graphql (and the css-in-js modification needs one), so we can’t use monaco-editor-webpack-plugin
 *
 * Worker loaders are web worker loaders for webpack.
 */

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
