import { EnvLanding } from '@codelab/shared/env'
import client from '@mailchimp/mailchimp_marketing'
import { NextApiRequest, NextApiResponse } from 'next'
import z from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { list_id, api_key, server_prefix } = EnvLanding().mailchimp

  try {
    const { email } = schema.parse(req.body)
    client.setConfig({
      apiKey: api_key,
      server: server_prefix,
    })

    const response = await client.lists.addListMember(list_id, {
      email_address: email,
      status: 'subscribed',
    })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error: 'invalid or already added email' })
  }
}
