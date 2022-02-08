import express from 'express'
import { config, createApiProxyMiddlewareHandler } from '../graphql'

const app = express()

app.use('*', createApiProxyMiddlewareHandler('prod'))

export { config }

export default app
