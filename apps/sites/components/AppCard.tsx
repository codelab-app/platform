'use client'

import EyeOutlined from '@ant-design/icons/lib/icons/EyeOutlined'
import { Button, Card, List, Space, Typography } from 'antd'

const { Paragraph, Text, Title } = Typography

interface Page {
  id: string
  name: string
  urlPattern: string
}

interface App {
  id: string
  name: string
  pages: Array<Page>
}

interface AppCardProps {
  app: App
}

export const AppCard = ({ app }: AppCardProps) => {
  return (
    <Card
      extra={<Text type="secondary">App ID: {app.id}</Text>}
      title={
        <Title className="m-0" level={3}>
          {app.name}
        </Title>
      }
    >
      {app.pages.length === 0 ? (
        <Paragraph type="secondary">No pages in this app.</Paragraph>
      ) : (
        <>
          <Title className="mb-4" level={5}>
            Pages ({app.pages.length}):
          </Title>
          <List
            dataSource={app.pages}
            renderItem={(page) => {
              const previewUrl = `http://${app.id}.codelab.test:3080${page.urlPattern}`

              return (
                <List.Item
                  actions={[
                    <Button
                      href={previewUrl}
                      icon={<EyeOutlined />}
                      key="preview"
                      rel="noopener noreferrer"
                      target="_blank"
                      type="primary"
                    >
                      Preview
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    description={
                      <Text className="text-xs" type="secondary">
                        {previewUrl}
                      </Text>
                    }
                    title={
                      <Space>
                        <Text strong>{page.name}</Text>
                        <Text type="secondary">({page.urlPattern})</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )
            }}
          />
        </>
      )}
    </Card>
  )
}
