import { proxyMiddleware } from '@codelab/backend/infra/adapter/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  return proxyMiddleware(request, new NextResponse())
}

export const POST = async (request: NextRequest) => {
  return proxyMiddleware(request, new NextResponse())
}

export const maxDuration = 60
