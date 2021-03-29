import { AppContext } from '@codelab/frontend/shared'
import { Button, List, PageHeader } from 'antd'
import React, { useContext } from 'react'
import CreateStyleButton from '../createStyle/CreateStyleButton'
import { useStylesPane } from '../useStylesPane'

export const PaneMainStyle = () => {
  const { styles } = useContext(AppContext)
  const { openUpdateStyle } = useStylesPane()

  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title="Styles"
        extra={[<CreateStyleButton key={1} />]}
      >
        <List
          dataSource={styles}
          renderItem={(i) => (
            <List.Item>
              <Button
                type="link"
                onClick={() => {
                  openUpdateStyle(i.id)
                }}
              >
                {i.name || 'Nameless style'}
              </Button>
            </List.Item>
          )}
        />
      </PageHeader>
    </div>
  )
}
