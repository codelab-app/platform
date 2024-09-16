import { Skeleton } from './Skeleton'

export default {
  component: Skeleton,
  title: 'Atoms/Skeleton',
}

export const Default = {
  args: {},
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}
