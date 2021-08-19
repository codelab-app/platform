import { padding } from '@codelab/frontend/style'
import { PropsWithChildren } from 'react'

// export const StyledSection = styled.section(() => [tw`mt-4`])

export const ContentSection = ({ children }: PropsWithChildren<any>) => {
  return <section style={{ marginTop: padding.sm }}>{children}</section>
}
