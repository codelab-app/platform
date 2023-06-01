import { getEnv } from '@codelab/shared/config'
import client from '@mailchimp/mailchimp_marketing'
import type { NextApiRequest, NextApiResponse } from 'next'
import z from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { apiKey, listId, serverPrefix } = getEnv().mailchimp

  try {
    const { email } = schema.parse(req.body)
    client.setConfig({
      apiKey,
      server: serverPrefix,
    })

    const response = await client.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error: 'invalid or already added email' })
  }
}

export default handler
