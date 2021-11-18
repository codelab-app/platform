import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetLambdasForSelectQuery } from '../../../store/typeEndpoints'

export type SelectLambdaProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectLambda = ({ name }: SelectLambdaProps) => {
  const { data: lambdas, isLoading } = useGetLambdasForSelectQuery()

  const lambdaOptions =
    lambdas?.getLambdas.map((lambda) => ({
      label: lambda.name,
      value: lambda.id,
    })) ?? []

  return (
    <SelectField
      options={lambdaOptions}
      name={name}
      loading={isLoading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}
