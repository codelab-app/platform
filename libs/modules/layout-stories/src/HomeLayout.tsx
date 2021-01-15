import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

const { Header, Footer, Sider, Content } = Layout

type HomeLayoutProps = {}

export const HomeLayout = (props: PropsWithChildren<HomeLayoutProps>) => {
  const router = useRouter()

  return null
  // <AppLayout sidebar={sidebar} header={header} footer={footer}>
  //   {children}
  // </AppLayout>
}
