import { Modal, Skeleton, Space } from 'antd'

export const SkeletonModal = () => {
  return (
    <Modal
      okText="Submit"
      open={true}
      title={<Skeleton.Input active size="small" style={{ width: 150 }} />}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Skeleton.Input active block style={{ width: '100%' }} />
        <Skeleton.Input active block style={{ width: '100%' }} />
      </Space>
    </Modal>
  )
}
