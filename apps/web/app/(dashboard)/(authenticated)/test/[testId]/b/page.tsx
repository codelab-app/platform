import { ClientComponent } from './client'

export interface PageProps {
  params: Promise<{
    testId: string
  }>
  searchParams: Promise<Record<string, string>>
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { testId } = await params

  const parsedSearchParams = Object.fromEntries(
    Object.entries(await searchParams),
  )

  return <ClientComponent searchParams={parsedSearchParams} testId={testId} />
}

export default Page
