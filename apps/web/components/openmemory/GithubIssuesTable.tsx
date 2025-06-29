'use client'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

import SearchOutlined from '@ant-design/icons/lib/icons/SearchOutlined'
import SyncOutlined from '@ant-design/icons/lib/icons/SyncOutlined'
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Table,
  Tag,
} from 'antd'
import { useMemo, useState } from 'react'

const { Search } = Input

interface GitHubIssue {
  createdAt: string
  htmlUrl: string
  id: number
  number: number
  state: string
  synced: boolean
  title: string
}

interface FetchIssuesFormValues {
  owner: string
  repo: string
}

export const GitHubIssuesTable = () => {
  const [issues, setIssues] = useState<Array<GitHubIssue>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [syncingIssues, setSyncingIssues] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const [currentRepo, setCurrentRepo] = useState<{
    owner: string
    repo: string
  } | null>(null)

  const [form] = Form.useForm<FetchIssuesFormValues>()

  const filteredIssues = useMemo(() => {
    if (!searchTerm) {
      return issues
    }

    return issues.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [issues, searchTerm])

  const highlightText = (text: string) => {
    if (!searchTerm) {
      return text
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          style={{ backgroundColor: '#ffd666', fontWeight: 'bold' }}
        >
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const columns: ColumnsType<GitHubIssue> = [
    {
      dataIndex: 'number',
      key: 'number',
      render: (number: number, record: GitHubIssue) => (
        <a href={record.htmlUrl} rel="noopener noreferrer" target="_blank">
          #{number}
        </a>
      ),
      sorter: (a, b) => a.number - b.number,
      title: 'Issue #',
      width: 100,
    },
    {
      dataIndex: 'title',
      ellipsis: true,
      key: 'title',
      render: (title: string) => highlightText(title),
      title: 'Title',
    },
    {
      dataIndex: 'state',
      key: 'state',
      render: (state: string) => (
        <Tag color={state === 'open' ? 'green' : 'red'}>
          {state.toUpperCase()}
        </Tag>
      ),
      title: 'State',
      width: 100,
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      title: 'Created',
      width: 120,
    },
    {
      align: 'center',
      dataIndex: 'synced',
      key: 'synced',
      render: (synced: boolean) => (
        <Tag color={synced ? 'success' : 'default'}>
          {synced ? 'Yes' : 'No'}
        </Tag>
      ),
      title: 'Synced',
      width: 100,
    },
    {
      align: 'center',
      key: 'action',
      render: (_, record: GitHubIssue) => (
        <Button
          disabled={record.synced}
          loading={syncingIssues.has(record.id)}
          onClick={() => syncIssueToMem0(record)}
          size="small"
          type="primary"
        >
          {record.synced ? 'Synced' : 'Sync'}
        </Button>
      ),
      title: 'Action',
      width: 100,
    },
  ]

  const fetchIssues = async (values: FetchIssuesFormValues) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/github/openmemory-sync/issues', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch issues')
      }

      setIssues(data.issues)
      setCurrentRepo({ owner: values.owner, repo: values.repo })
      setIsModalOpen(false)
      form.resetFields()
      void message.success(`Fetched ${data.issues.length} issues`)
    } catch (error) {
      void message.error(
        error instanceof Error
          ? error.message
          : 'Failed to fetch GitHub issues',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSyncStatus = async () => {
    if (!currentRepo) {
      return
    }

    setIsLoading(true)

    try {
      const values = form.getFieldsValue()

      await fetchIssues({
        ...values,
        owner: currentRepo.owner,
        repo: currentRepo.repo,
      })
    } catch (error) {
      void message.error('Failed to refresh sync status')
    } finally {
      setIsLoading(false)
    }
  }

  const syncIssueToMem0 = async (issue: GitHubIssue) => {
    if (!currentRepo) {
      void message.error('Repository information not available')

      return
    }

    setSyncingIssues((prev) => new Set(prev).add(issue.id))

    try {
      const response = await fetch('/api/github/openmemory-sync', {
        body: JSON.stringify({
          issueId: issue.id,
          issueNumber: issue.number,
          owner: currentRepo.owner,
          repo: currentRepo.repo,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync issue')
      }

      // Update the issue's synced status in the local state
      setIssues((prevIssues) =>
        prevIssues.map((i) => (i.id === issue.id ? { ...i, synced: true } : i)),
      )

      void message.success(`Issue #${issue.number} synced successfully`)
    } catch (error) {
      void message.error(
        error instanceof Error ? error.message : 'Failed to sync issue',
      )
    } finally {
      setSyncingIssues((prev) => {
        const newSet = new Set(prev)

        newSet.delete(issue.id)

        return newSet
      })
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1)
    setPageSize(pagination.pageSize || 20)
  }

  const renderTableTitle = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Load GitHub Issues
          </Button>
          {currentRepo && (
            <>
              <Button
                icon={<SyncOutlined />}
                loading={isLoading}
                onClick={refreshSyncStatus}
              >
                Refresh Status
              </Button>
              <span style={{ marginLeft: 8 }}>
                Repository: {currentRepo.owner}/{currentRepo.repo}
              </span>
            </>
          )}
        </div>
        {issues.length > 0 && (
          <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
            <Search
              allowClear
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by title..."
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={searchTerm}
            />
            <Pagination
              current={currentPage}
              onChange={(page, size) => {
                setCurrentPage(page)
                setPageSize(size)
              }}
              pageSize={pageSize}
              showSizeChanger
              showTotal={(total) => `Total ${total} issues`}
              total={filteredIssues.length}
            />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredIssues}
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          hideOnSinglePage: true,
          pageSize: pageSize,
          position: ['none'],
        }}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        title={renderTableTitle}
      />

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title="Load GitHub Issues"
        width={500}
      >
        <Form
          form={form}
          initialValues={
            currentRepo || {
              owner: 'codelab-app',
              repo: 'platform',
            }
          }
          layout="vertical"
          onFinish={fetchIssues}
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

          <Form.Item>
            <Button block htmlType="submit" loading={isLoading} type="primary">
              {isLoading ? 'Loading...' : 'Load Issues'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
