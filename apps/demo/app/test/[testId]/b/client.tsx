'use client'

import { logTimestampMs } from '@codelab/shared-infra-logging'
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
      `Navigating from Page B to A with testId: ${testId}, referred from: ${source}`,
    )
  }

  return (
    <div>
      <h1>Page B</h1>
      <p>Test ID: {testId}</p>
      {source !== 'direct' && <p>You came from: {source}</p>}
      <div>
        <Link href={`/test/${testId}/a?source=pageB`} onClick={handleClick}>
          Go to A
        </Link>
      </div>
    </div>
  )
}
