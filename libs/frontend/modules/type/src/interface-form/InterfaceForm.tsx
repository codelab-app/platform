import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import {
  IJsonSchemaOptions,
  ITypeTree,
  TypeKind,
} from '@codelab/shared/abstract/core'
import React from 'react'
import { SelectComponent } from './fields/SelectComponent'
import { getSelectElementComponent } from './fields/SelectElement'
import { SelectLambda } from './fields/SelectLambda'

export interface InterfaceFormProps<TData>
  extends Omit<FormUniformsProps<TData>, 'schema'> {
  interfaceTree: ITypeTree
}

const uniformsFactory: IJsonSchemaOptions['jsonPropertiesMapper'] = (type) => {
  console.log(type)

  switch (type.typeKind) {
    case TypeKind.LambdaType:
      return {
        uniforms: {
          component: SelectLambda,
        },
      }

    case TypeKind.ElementType:
      return {
        uniforms: {
          component: getSelectElementComponent(type.kind),
        },
      }
    case TypeKind.ComponentType:
      return {
        type: 'string',
        uniforms: {
          component: SelectComponent,
        },
      }
  }

  return {}
}

/**
 * Uniforms form generated by an Interface
 */
export const InterfaceForm = <TData extends any>({
  interfaceTree,
  children,
  model,
  onSubmit,
  ...props
}: React.PropsWithChildren<InterfaceFormProps<TData>>) => {
  return (
    <FormUniforms
      schema={
        interfaceTree.toJsonSchema({
          jsonPropertiesMapper: uniformsFactory,
        }) as any
      }
      model={model}
      onSubmit={onSubmit}
    >
      {children}
    </FormUniforms>
  )
}

InterfaceForm.displayName = 'InterfaceForm'
InterfaceForm.whyDidYouRender = true
