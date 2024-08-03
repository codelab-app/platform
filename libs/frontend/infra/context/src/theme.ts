import type { ConfigProviderProps } from 'antd'

export const theme: ConfigProviderProps['theme'] = {
  components: {
    Layout: { headerBg: '#ffffff' },
  },
  token: {
    // fontFamily: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    // 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    // 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  },
}
