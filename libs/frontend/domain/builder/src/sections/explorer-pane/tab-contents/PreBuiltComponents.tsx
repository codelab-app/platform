import { useStore } from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { useAsync } from '@react-hookz/web'
import { Card, Image, Space } from 'antd'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

export const PreBuiltComponents = observer(() => {
  const { atomService } = useStore()

  const [{ error, result = [], status }, getAtoms] = useAsync(() =>
    atomService.getOptions(),
  )

  useEffect(() => {
    void getAtoms.execute()
  }, [])

  return (
    <SkeletonWrapper isLoading={status === 'loading'}>
      {!isNil(error) ? error.message : null}
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        {result.map((atom) => (
          <Card hoverable title={atom.name}>
            {atom.icon ? (
              <Image
                alt={atom.name}
                preview={false}
                src={`/assets/atoms/antd/${atom.icon}.svg`}
                width="100%"
              />
            ) : (
              atom.icon ?? atom.name
            )}
          </Card>
        ))}
      </Space>
    </SkeletonWrapper>
  )
})
