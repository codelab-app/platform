import { Typebox } from '@codelab/shared/abstract/typebox'
import { getEnv } from '@codelab/shared/config'
import client from '@mailchimp/mailchimp_marketing'
import { Type } from '@sinclair/typebox'
import type { NextApiRequest, NextApiResponse } from 'next'

const Email = Type.Object({
  email: Type.String().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { apiKey, listId, serverPrefix } = getEnv().mailchimp

  console.log(req.body)

  try {
    const { email } = Typebox.ValidateAndClean(Email, req.body)

    client.setConfig({
      apiKey,
      server: serverPrefix,
    })

    const response = await client.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    res.status(200).json(response)

    return
  } catch (error) {
    res.status(500).json({ error: 'invalid or already added email' })

    return
  }
}

export default handler
