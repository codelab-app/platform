import { WebClient } from '@slack/web-api'
import { get } from 'env-var'
import { NextApiHandler } from 'next'

const SLACK_SIGNIN_SECRET = get('SLACK_TOKEN').required().asString()
const TEAM_ID = 'T0J3YAY3E'
// const SLACK_DEVELOPMENT_CHANNEL = 'C01TALGNKMZ'
// const SLACK_TEST_CHANNEL = 'C01UFCHM4KZ'
const SLACK_CHANNEL = get('SLACK_CHANNEL').required().asString()
const web = new WebClient(SLACK_SIGNIN_SECRET, { teamId: TEAM_ID })

const handler: NextApiHandler = async ({ body }, res) => {
  const {
    action,
    discussion: {
      user: { login: discussion_user },
      title: discussion_title,
      category: { name: category_name },
      body: discussion_body,
    },
  } = body

  // `deleted`
  if (action !== 'created') {
    return res.json({})
  }

  const comment_user = body?.comment?.user?.login
  const comment_body = body?.comment?.body
  const webhook_user = comment_user ?? discussion_user
  const webhook_body = comment_body ?? discussion_body

  const webhook_event = comment_user
    ? 'New Comment Added'
    : 'New Discussion Created'

  const result = await web.chat.postMessage({
    text: discussion_title,
    blocks: [
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${webhook_event}*\n*Author*: ${webhook_user}\n*Title*: ${discussion_title}\n*Category*: ${category_name}\n\n${webhook_body}`,
        },
      },
    ],
    channel: SLACK_CHANNEL,
  })

  return res.json({})
}

export default handler
