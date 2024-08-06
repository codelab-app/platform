import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
