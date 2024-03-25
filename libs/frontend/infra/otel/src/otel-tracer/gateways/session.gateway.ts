import { v4 } from 'uuid'

interface ISession {
  currencyCode: string
  userId: string
}

const sessionKey = 'session'

const defaultSession = {
  currencyCode: 'USD',
  userId: v4(),
}

const SessionGateway = () => ({
  getSession: (): ISession => {
    if (typeof window === 'undefined') {
      return defaultSession
    }

    const sessionString = localStorage.getItem(sessionKey)

    if (!sessionString) {
      localStorage.setItem(sessionKey, JSON.stringify(defaultSession))
    }

    return JSON.parse(
      sessionString || JSON.stringify(defaultSession),
    ) as ISession
  },
  setSessionValue<K extends keyof ISession>(key: K, value: ISession[K]) {
    const session = this.getSession()

    localStorage.setItem(
      sessionKey,
      JSON.stringify({ ...session, [key]: value }),
    )
  },
})

export default SessionGateway()
