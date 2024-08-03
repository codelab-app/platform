import type { NextRequest, NextResponse } from 'next/server'

export const corsMiddleware = async (
  request: NextRequest,
  response: NextResponse,
) => {
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Headers', '*')
  response.headers.set('Access-Control-Allow-Methods', '*')

  return response
}
