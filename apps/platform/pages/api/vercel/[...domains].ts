import type { NextApiHandler } from 'next'
import url, { URL } from 'url'
import { z } from 'zod'
import { baseHeaders } from './config'

export const vercelDomainProxy: NextApiHandler = async (req, res) => {
  if (!req.url) {
    return res.status(400).send('Missing url')
  }

  const urlSchema = z.string().url()
  const reqUrl = url.parse(req.url).href.replace('/api/vercel/', '')
  const maybeVercelUrl = urlSchema.safeParse(reqUrl)

  if (!maybeVercelUrl.success) {
    return res.status(400).send(maybeVercelUrl.error.message)
  }

  try {
    const vercelUrl = new URL(maybeVercelUrl.data)

    const vercelRes = await fetch(vercelUrl, {
      headers: baseHeaders,
      method: req.method,
      ...(req.body && { body: req.body }),
    })

    console.log(vercelRes)
    console.log({ baseHeaders, body: req.body, method: req.method, vercelUrl })

    return res.status(vercelRes.status).send(vercelRes.body)
  } catch (error) {
    console.log(error)

    return res.status(500).send(false)
  }
}

export default vercelDomainProxy
