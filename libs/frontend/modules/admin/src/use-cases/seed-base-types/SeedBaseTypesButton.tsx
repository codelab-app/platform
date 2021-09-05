import { Button } from 'antd'
import { useSeedBaseTypesMutation } from './SeedBaseTypes.api.graphql.gen'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()

  return <Button onClick={() => seedBaseTypes()}>Seed Base Types</Button>
}
