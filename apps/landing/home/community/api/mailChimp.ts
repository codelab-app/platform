import jsonp from 'jsonp'
import toQueryString from 'to-querystring'

const getAjaxUrl = (url: string) => url.replace('/post?', '/post-json?')
const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL

interface DataResponse {
  result?: string
  msg?: string
}

const joinCommunity = async ({ email }: { email: string }) =>
  new Promise<DataResponse>((resolve, reject) => {
    const data = {
      EMAIL: email,
    }

    const params = toQueryString(data)
    const urlFirst = MAILCHIMP_URL || ''
    const url = getAjaxUrl(urlFirst) + '&' + params

    try {
      jsonp(url, { param: 'c' }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    } catch (error: unknown) {
      reject(error)
    }
  })

export default joinCommunity
