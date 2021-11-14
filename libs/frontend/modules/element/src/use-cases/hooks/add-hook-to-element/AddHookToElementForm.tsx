import { SelectLambda, SelectPage } from '@codelab/frontend/modules/type'
import {
  DisplayIfField,
  FormUniforms,
  FormUniformsProps,
  graphqlEditorFieldFactory,
  monacoFieldFactory,
} from '@codelab/frontend/view/components'
import { HookType } from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoField, AutoFields, HiddenField } from 'uniforms-antd'
import {
  AddHookToElementSchema,
  addHookToElementSchema,
  QueryHookVariant,
} from './addHookToElementSchema'

export type AddHookToElementFormProps = Omit<
  FormUniformsProps<AddHookToElementSchema>,
  'schema'
> & { elementId: string }

export const DisplayIfType = ({
  type,
  children,
}: React.PropsWithChildren<{
  type: HookType
}>) => (
  <DisplayIfField<AddHookToElementSchema>
    condition={(c) => c.model.type === type}
  >
    {children}
  </DisplayIfField>
)

const QueryBodyField = monacoFieldFactory({
  editorOptions: { language: 'json', lineNumbers: 'off' },
  containerProps: { style: { height: '15rem' } },
})

const DefaultValueField = monacoFieldFactory({
  editorOptions: {
    language: 'json',
    lineNumbers: 'off',
    wordWrap: 'off',
    lineNumbersMinChars: 0,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    lineDecorationsWidth: 0,
    hideCursorInOverviewRuler: true,
    glyphMargin: false,
    folding: false,
    scrollBeyondLastColumn: 0,
    scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
    find: {
      addExtraSpaceOnTop: false,
      autoFindInSelection: 'never',
      seedSearchStringFromSelection: 'never',
    },
    minimap: { enabled: false },
  },
  containerProps: { style: { height: '1.5rem' } },
})

export const AddHookToElementForm = ({
  elementId,
  ...props
}: AddHookToElementFormProps) => {
  const router = useRouter()

  return (
    <FormUniforms<AddHookToElementSchema>
      schema={addHookToElementSchema}
      {...props}
    >
      {/* Base fields */}
      <AutoFields
        omitFields={[
          'queryHook',
          'queryPageHook',
          'queryPagesHook',
          'queryHookVariant',
          'graphqlQueryHook',
          'graphqlMutationHook',
          'recoilStateHook',
        ]}
      />

      {/* Graphql query fields */}
      <DisplayIfType type={HookType.QueryPages}>
        <HiddenField
          name="queryPagesHook.appId"
          value={String(router.query.appId)}
        />
      </DisplayIfType>

      <DisplayIfType type={HookType.QueryPage}>
        <AutoField name="queryPageHook.pageId" component={SelectPage} />
      </DisplayIfType>

      <DisplayIfType type={HookType.GraphqlQuery}>
        <div
          css={css`
            display: grid;
            grid-template-rows: auto 26rem auto;
          `}
        >
          <AutoFields fields={['graphqlQueryHook.graphqlUrl']} />

          <AutoField
            name={'graphqlQueryHook.graphqlBody'}
            component={graphqlEditorFieldFactory({
              schemaUrlFieldKey: 'graphqlQueryHook.graphqlUrl',
              editorOptions: { lineNumbers: 'off' },
            })}
          />
          <AutoFields fields={['graphqlQueryHook.dataKey']} />
        </div>
      </DisplayIfType>

      {/* Graphql mutation fields */}
      <DisplayIfType type={HookType.GraphqlMutation}>
        <div
          css={css`
            display: grid;
            grid-template-rows: auto 26rem auto;
          `}
        >
          <AutoFields fields={['graphqlMutationHook.graphqlUrl']} />

          <AutoField
            name={'graphqlMutationHook.graphqlBody'}
            component={graphqlEditorFieldFactory({
              schemaUrlFieldKey: 'graphqlMutationHook.graphqlUrl',
              editorOptions: { lineNumbers: 'off' },
            })}
          />
          <AutoFields fields={['graphqlMutationHook.dataKey']} />
        </div>
      </DisplayIfType>

      {/* Query fields */}
      <DisplayIfType type={HookType.Query}>
        <AutoFields fields={['queryHookVariant']} />

        <DisplayIfField<AddHookToElementSchema>
          condition={(c) =>
            c.model.queryHookVariant === QueryHookVariant.Config
          }
        >
          <AutoFields
            fields={['queryHook.queryKey', 'queryHook.url', 'queryHook.method']}
          />
          <QueryBodyField name={'queryHook.body'} />
        </DisplayIfField>

        <DisplayIfField<AddHookToElementSchema>
          condition={(c) =>
            c.model.queryHookVariant === QueryHookVariant.Lambda
          }
        >
          <AutoFields fields={['queryHook.queryKey']} />{' '}
          <AutoField name="queryHook.lambdaId" component={SelectLambda} />
        </DisplayIfField>
      </DisplayIfType>

      {/* Recoil state fields */}
      <DisplayIfType type={HookType.RecoilState}>
        <AutoFields
          fields={['recoilStateHook.stateKey', 'recoilStateHook.persisted']}
        />
        <DefaultValueField name="recoilStateHook.defaultValue" />
      </DisplayIfType>
    </FormUniforms>
  )
}
