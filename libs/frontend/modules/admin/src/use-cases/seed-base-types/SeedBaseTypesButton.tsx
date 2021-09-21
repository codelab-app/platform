import { Button } from 'antd'
import { useSeedBaseTypesMutation } from './SeedBaseTypes.web.graphql.gen'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()

  return <Button onClick={() => seedBaseTypes()}>Seed Base Types</Button>
}
