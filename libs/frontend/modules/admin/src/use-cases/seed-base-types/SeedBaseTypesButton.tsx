import { Button } from 'antd'
import { useSeedBaseTypesMutation } from '../admin.endpoints'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()

  return <Button onClick={() => seedBaseTypes()}>Seed Base Types</Button>
}
