import { useGetLambdasQuery } from '@codelab/codegen/graphql'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectLambdaProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectLambda = ({ name }: SelectLambdaProps) => {
  const { data: lambdas, loading } = useGetLambdasQuery()

  const lambdaOptions =
    lambdas?.getLambdas.map((lambda) => ({
      label: lambda.name,
      value: lambda.id,
    })) ?? []

  return (
    <SelectField
      options={lambdaOptions}
      name={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loading={loading}
    />
  )
}
