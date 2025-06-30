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
import { useEffect, useMemo, useState } from 'react'

const { Search } = Input
const CACHE_KEY = 'github_issues_cache'
const LAST_REPO_KEY = 'github_last_repo'
const CACHE_DURATION = 5 * 60 * 1000

interface GitHubIssue {
  createdAt: string
  htmlUrl: string
  id: number | string
  nodeType: 'discussion' | 'issue'
  number: number
  owner?: string
  repo?: string
  state: string
  synced: boolean
  title: string
}

interface FetchIssuesFormValues {
  owner: string
  repo: string
}

interface CachedData {
  issues: Array<GitHubIssue>
  owner: string
  repo: string
  timestamp: number
}

export const GitHubIssuesTable = () => {
  const [issues, setIssues] = useState<Array<GitHubIssue>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [syncingIssues, setSyncingIssues] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
  const [isBulkSyncing, setIsBulkSyncing] = useState(false)

  const [currentRepo, setCurrentRepo] = useState<{
    owner: string
    repo: string
  } | null>(null)

  const [form] = Form.useForm<FetchIssuesFormValues>()

  // Load cached data on mount
  useEffect(() => {
    // Try to load cached data
    const cachedData = getCachedData()

    if (cachedData) {
      // Ensure cached issues have owner, repo, and nodeType fields
      const issuesWithRepo = cachedData.issues.map((issue) => ({
        ...issue,
        nodeType: issue.nodeType,
        owner: issue.owner || cachedData.owner,
        repo: issue.repo || cachedData.repo,
      }))

      setIssues(issuesWithRepo)
      setCurrentRepo({ owner: cachedData.owner, repo: cachedData.repo })
      form.setFieldsValue({ owner: cachedData.owner, repo: cachedData.repo })
    } else {
      // No cached data, try to load last used repo
      const lastRepo = getLastRepo()

      if (lastRepo) {
        form.setFieldsValue(lastRepo)
      }
    }
  }, [form])

  // Cache helper functions
  const getCachedData = (): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)

      if (!cached) {
        return null
      }

      const data: CachedData = JSON.parse(cached)
      const now = Date.now()

      // Check if cache is still valid
      if (now - data.timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY)

        return null
      }

      return data
    } catch (error) {
      console.error('Error reading cache:', error)

      return null
    }
  }

  const setCachedData = (
    owner: string,
    repo: string,
    issuesData: Array<GitHubIssue>,
  ) => {
    try {
      const cacheData: CachedData = {
        issues: issuesData,
        owner,
        repo,
        timestamp: Date.now(),
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error setting cache:', error)
    }
  }

  const getLastRepo = (): { owner: string; repo: string } | null => {
    try {
      const lastRepo = localStorage.getItem(LAST_REPO_KEY)

      return lastRepo ? JSON.parse(lastRepo) : null
    } catch (error) {
      console.error('Error reading last repo:', error)

      return null
    }
  }

  const setLastRepo = (owner: string, repo: string) => {
    try {
      localStorage.setItem(LAST_REPO_KEY, JSON.stringify({ owner, repo }))
    } catch (error) {
      console.error('Error saving last repo:', error)
    }
  }

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
      dataIndex: 'nodeType',
      key: 'nodeType',
      render: (type: string) => (
        <Tag color={type === 'issue' ? 'blue' : 'purple'}>
          {(type || 'issue').toUpperCase()}
        </Tag>
      ),
      title: 'Type',
      width: 100,
    },
    {
      dataIndex: 'number',
      key: 'number',
      render: (number: number, record: GitHubIssue) => (
        <a href={record.htmlUrl} rel="noopener noreferrer" target="_blank">
          #{number}
        </a>
      ),
      sorter: (a, b) => a.number - b.number,
      title: '#',
      width: 80,
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
          loading={syncingIssues.has(
            typeof record.id === 'string' ? parseInt(record.id, 10) : record.id,
          )}
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
      // Fetch both issues and discussions in parallel
      const [issuesResponse, discussionsResponse] = await Promise.all([
        fetch('/api/github/issues', {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }),
        fetch('/api/github/discussions', {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }),
      ])

      const [issuesData, discussionsData] = await Promise.all([
        issuesResponse.json(),
        discussionsResponse.json(),
      ])

      if (!issuesResponse.ok) {
        throw new Error(issuesData.error || 'Failed to fetch issues')
      }

      if (!discussionsResponse.ok) {
        throw new Error(discussionsData.error || 'Failed to fetch discussions')
      }

      // Combine issues and discussions, adding owner and repo to each
      const allItems = [
        ...issuesData.issues.map((issue: GitHubIssue) => ({
          ...issue,
          owner: values.owner,
          repo: values.repo,
        })),
        ...discussionsData.discussions.map((discussion: GitHubIssue) => ({
          ...discussion,
          owner: values.owner,
          repo: values.repo,
        })),
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      setIssues(allItems)
      setCurrentRepo({ owner: values.owner, repo: values.repo })

      // Cache the data
      setCachedData(values.owner, values.repo, allItems)
      setLastRepo(values.owner, values.repo)

      setIsModalOpen(false)
      form.resetFields()
      setSelectedRowKeys([])
      void message.success(
        `Fetched ${issuesData.issues.length} issues and ${discussionsData.discussions.length} discussions`,
      )
    } catch (error) {
      void message.error(
        error instanceof Error ? error.message : 'Failed to fetch GitHub data',
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
    // Use issue's owner/repo if available, otherwise fall back to currentRepo
    const owner = issue.owner || currentRepo?.owner
    const repo = issue.repo || currentRepo?.repo

    if (!owner || !repo) {
      void message.error(
        'Repository information not available. Please reload the issues.',
      )

      return
    }

    setSyncingIssues((prev) => new Set(prev).add(Number(issue.id)))

    try {
      const response = await fetch('/api/openmemory/sync', {
        body: JSON.stringify({
          issueId: issue.id,
          issueNumber: issue.number,
          nodeType: issue.nodeType,
          owner,
          repo,
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
      setIssues((prevIssues) => {
        const updatedIssues = prevIssues.map((i) =>
          i.id === issue.id ? { ...i, synced: true } : i,
        )

        // Update cache with synced status
        if (currentRepo) {
          setCachedData(currentRepo.owner, currentRepo.repo, updatedIssues)
        }

        return updatedIssues
      })

      void message.success(`Issue #${issue.number} synced successfully`)
    } catch (error) {
      void message.error(
        error instanceof Error ? error.message : 'Failed to sync issue',
      )
    } finally {
      setSyncingIssues((prev) => {
        const newSet = new Set(prev)

        newSet.delete(Number(issue.id))

        return newSet
      })
    }
  }

  const syncSelectedIssues = async () => {
    if (selectedRowKeys.length === 0) {
      void message.warning('Please select issues to sync')

      return
    }

    setIsBulkSyncing(true)

    try {
      const selectedIssues = issues.filter((issue) =>
        selectedRowKeys.includes(String(issue.id)),
      )

      const unsyncedIssues = selectedIssues.filter((issue) => !issue.synced)

      if (unsyncedIssues.length === 0) {
        void message.info('All selected issues are already synced')

        return
      }

      let successCount = 0
      let errorCount = 0
      // Sync issues in parallel with a limit
      const batchSize = 5

      for (let i = 0; i < unsyncedIssues.length; i += batchSize) {
        const batch = unsyncedIssues.slice(i, i + batchSize)

        const promises = batch.map(async (issue) => {
          try {
            await syncIssueToMem0(issue)
            successCount++
          } catch (error) {
            errorCount++
            console.error(`Failed to sync issue #${issue.number}:`, error)
          }
        })

        await Promise.all(promises)
      }

      if (successCount > 0) {
        void message.success(
          `Successfully synced ${successCount} issue${
            successCount > 1 ? 's' : ''
          }`,
        )
      }

      if (errorCount > 0) {
        void message.error(
          `Failed to sync ${errorCount} issue${errorCount > 1 ? 's' : ''}`,
        )
      }

      // Clear selection after sync
      setSelectedRowKeys([])
    } catch (error) {
      void message.error('Failed to sync selected issues')
      console.error('Bulk sync error:', error)
    } finally {
      setIsBulkSyncing(false)
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
            Load GitHub Data
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
              {selectedRowKeys.length > 0 && (
                <Button
                  loading={isBulkSyncing}
                  onClick={syncSelectedIssues}
                  type="primary"
                >
                  Sync {selectedRowKeys.length} Selected Issue
                  {selectedRowKeys.length > 1 ? 's' : ''}
                </Button>
              )}
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
        rowKey={(record) => String(record.id)}
        rowSelection={{
          getCheckboxProps: (record) => ({
            disabled: record.synced,
          }),
          onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys as Array<string>)
          },
          selectedRowKeys,
        }}
        scroll={{ x: 'max-content' }}
        title={renderTableTitle}
      />

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title="Load GitHub Issues & Discussions"
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
