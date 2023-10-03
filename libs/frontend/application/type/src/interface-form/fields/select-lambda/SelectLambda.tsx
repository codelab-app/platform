import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'
// import { useGetLambdasForSelectQuery } from '../../../store/typeEndpoints'

export type SelectLambdaProps = UniformSelectFieldProps

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
      showSearch
    />
  )
}
