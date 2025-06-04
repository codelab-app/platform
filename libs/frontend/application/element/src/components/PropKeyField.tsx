import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { AutoCompleteProps } from 'antd/lib'

import {
  CodeMirrorEditor,
  createAutoCompleteOptions,
} from '@codelab/frontend-presentation-components-codemirror'
import { ToggleExpressionFieldV2 } from '@codelab/frontend-presentation-components-form'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { AutoComplete } from 'antd/lib'
import { isString } from 'remeda'
import { connectField, filterDOMProps } from 'uniforms'

interface PropKeyFieldProps extends AutoCompleteProps<string>, ObjectLike {
  runtimeElement: IRuntimeElementModel
}

export const PropKeyField = connectField<PropKeyFieldProps>(
  ({ runtimeElement, ...props }) => {
    const Field = (
      <AutoComplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...filterDOMProps(props)}
        allowClear={true}
        disabled={props.disabled}
        onChange={(value) => props.onChange?.(value)}
        options={createAutoCompleteOptions(
          runtimeElement.runtimeProps.runtimeContext,
        )
          .map(({ label }) => ({ label, value: label }))
          .sort()}
        placeholder={props.placeholder ?? ''}
        ref={props.inputRef}
        showAction={['focus', 'click']}
        value={props.value ?? ''}
      />
    )

    const ExpressionField = (
      <CodeMirrorEditor
        customOptions={props.autocomplete || []}
        language={ICodeMirrorLanguage.Javascript}
        onChange={(value) => props.onChange?.(value)}
        placeholder={isString(props.placeholder) ? props.placeholder : ''}
        title={props.label}
        value={props.value || ''}
      />
    )

    return (
      <ToggleExpressionFieldV2<string>
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ExpressionField={ExpressionField}
        StaticField={Field}
        fromExpression={(value) => ''}
        toExpression={(value) => `{{'${value}'}}`}
        value={props.value ?? ''}
      />
    )
  },
  { kind: 'leaf' },
)
