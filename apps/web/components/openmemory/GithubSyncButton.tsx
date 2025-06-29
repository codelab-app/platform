'use client'

import { Button, Form, Input, message, Modal } from 'antd'
import { useState } from 'react'

interface SyncFormValues {
  limit?: number
  mem0ApiKey: string
  owner: string
  repo: string
}

export const GitHubSyncButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm<SyncFormValues>()

  const handleSync = async (values: SyncFormValues) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/github/openmemory-sync', {
        body: JSON.stringify({
          ...values,
          limit: values.limit || 100,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync')
      }

      void message.success(
        `Successfully synced ${data.result.synced} out of ${data.result.total} issues`,
      )

      if (data.result.errors.length > 0) {
        console.error('Sync errors:', data.result.errors)
        void message.warning(
          `Encountered ${data.result.errors.length} errors during sync. Check console for details.`,
        )
      }

      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      void message.error(
        error instanceof Error ? error.message : 'Failed to sync GitHub issues',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{ marginTop: '16px' }}
        type="primary"
      >
        Sync GitHub Issues to Memory
      </Button>

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title="Sync GitHub Issues to OpenMemory"
        width={600}
      >
        <Form
          form={form}
          initialValues={{
            limit: 100,
            owner: 'codelab-app',
            repo: 'platform',
          }}
          layout="vertical"
          onFinish={handleSync}
        >
          <Form.Item
            label="GitHub Owner/Organization"
            name="owner"
            rules={[
              { message: 'Please enter the repository owner', required: true },
            ]}
          >
            <Input placeholder="e.g., facebook" />
          </Form.Item>

          <Form.Item
            label="Repository Name"
            name="repo"
            rules={[
              { message: 'Please enter the repository name', required: true },
            ]}
          >
            <Input placeholder="e.g., react" />
          </Form.Item>

          <Form.Item
            help="Get from: https://mem0.ai dashboard"
            label="Mem0 API Key"
            name="mem0ApiKey"
            rules={[
              { message: 'Please enter your Mem0 API key', required: true },
            ]}
          >
            <Input.Password placeholder="mem0_..." />
          </Form.Item>

          <Form.Item
            help="Limit the number of issues to sync (default: 100)"
            label="Maximum Issues to Sync"
            name="limit"
          >
            <Input max={1000} min={1} type="number" />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" loading={isLoading} type="primary">
              {isLoading ? 'Syncing...' : 'Start Sync'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
