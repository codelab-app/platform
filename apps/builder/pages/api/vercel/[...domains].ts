import type { NextApiHandler } from 'next'
import url, { URL } from 'url'
import { z } from 'zod'
import { baseHeaders } from './config'

export const deleteDomain: NextApiHandler = async (req, res) => {
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
      body: JSON.stringify(req.body),
      headers: baseHeaders,
      method: req.method,
    })

    return res.status(vercelRes.status).send(vercelRes.body)
  } catch (error) {
    return res.status(500).send(false)
  }
}

export default deleteDomain
