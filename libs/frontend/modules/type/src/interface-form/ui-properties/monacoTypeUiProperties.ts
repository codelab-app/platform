import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { IMonacoType, languageMap } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const monacoTypeUiProperties: UiPropertiesFn<IMonacoType> = (type) => {
  return {
    uniforms: {
      component: monacoFieldFactory({
        editorOptions: {
          language: languageMap(type.language),
          lineNumbers: 'off',
        },
        containerProps: { style: { height: '15rem' } },
      }),
    },
  }
}
