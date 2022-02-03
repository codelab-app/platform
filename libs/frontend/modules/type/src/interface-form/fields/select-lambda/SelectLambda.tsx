import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
// import { useGetLambdasForSelectQuery } from '../../../store/typeEndpoints'

export type SelectLambdaProps = HTMLFieldProps<string, SelectFieldProps>

// TODO fix all SelectX components after implementing the appropriate module
export const SelectLambda = ({ name }: SelectLambdaProps) => {
  // const { data: lambdas, isLoading } = useGetLambdasForSelectQuery()
  //
  // const lambdaOptions =
  //   lambdas?.getLambdas.map((lambda) => ({
  //     label: lambda.name,
  //     value: lambda.id,
  //   })) ?? []

  return (
    <SelectField
      // loading={isLoading}
      name={name}
      optionFilterProp="label"
      // options={lambdaOptions}
      showSearch={true}
    />
  )
}
