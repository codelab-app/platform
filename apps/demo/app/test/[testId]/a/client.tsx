'use client'

import { logTimestampMs } from '@codelab/shared-infra-logger'
import Link from 'next/link'

interface ClientComponentProps {
  searchParams: Record<string, string>
  testId: string
}

export const ClientComponent = ({
  searchParams,
  testId,
}: ClientComponentProps) => {
  const source = searchParams.source || 'direct'

  const handleClick = () => {
    logTimestampMs(
      `Navigating from Page A to B with testId: ${testId}, referred from: ${source}`,
    )
  }

  return (
    <div>
      <h1>Page A</h1>
      <p>Test ID: {testId}</p>
      {source !== 'direct' && <p>You came from: {source}</p>}
      <div>
        <Link href={`/test/${testId}/b?source=pageA`} onClick={handleClick}>
          Go to B
        </Link>
      </div>
    </div>
  )
}
