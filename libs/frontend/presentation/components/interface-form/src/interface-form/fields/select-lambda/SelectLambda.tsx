'use client'


import { SelectField } from 'uniforms-antd'
// import { useGetLambdasForSelectQuery } from '../../../store/typeEndpoints'

export const SelectLambda = ({ name }: SelectFieldProps) => {
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
      showSearch
    />
  )
}
