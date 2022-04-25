import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { IMonacoType } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

const languageMap: { [key in MonacoLanguage]?: string } = {
  graphqlDev: 'graphql',
}

export const monacoTypeUiProperties: UiPropertiesFn<IMonacoType> = (type) => {
  return {
    uniforms: {
      component: monacoFieldFactory({
        editorOptions: {
          language: languageMap[type.language] || type.language,
          lineNumbers: 'off',
        },
        containerProps: { style: { height: '15rem' } },
      }),
    },
  }
}
