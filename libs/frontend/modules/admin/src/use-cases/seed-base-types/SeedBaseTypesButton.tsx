import { useSeedBaseTypesMutation } from '@codelab/shared/codegen/graphql'
import { Button } from 'antd'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()

  return <Button onClick={() => seedBaseTypes()}>Seed Base Types</Button>
}
