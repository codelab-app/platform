import { PlusOutlined } from '@ant-design/icons'
import Icon, {
  CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon'
import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button, Dropdown, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ReactComponent as GraphQlSvg } from '../../icons/graphql.svg'
import { ReactComponent as MongoDBSvg } from '../../icons/mongodb.svg'
import { ReactComponent as MySqlSvg } from '../../icons/mysql.svg'
import { ReactComponent as OracleSvg } from '../../icons/oracle.svg'
import { ReactComponent as PostgreSqlSvg } from '../../icons/postgresql.svg'
import { ReactComponent as RestSvg } from '../../icons/rest.svg'
import { ReactComponent as SqlServerSvg } from '../../icons/sql-server.svg'

const RestIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={RestSvg} {...props} />
)

const GraphQlIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon
    component={GraphQlSvg}
    style={{ color: 'rgb(225, 0, 152)' }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

const SqlServerIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={SqlServerSvg} {...props} />
)

const PostgreSqlIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={PostgreSqlSvg} {...props} />
)

const OracleIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={OracleSvg} {...props} />
)

const MySqlIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={MySqlSvg} {...props} />
)

const MongoDBIcon = (props: Partial<CustomIconComponentProps>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={MongoDBSvg} {...props} />
)

export const CreateResourceButton = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const menuItems: Array<ItemType> = [
      {
        key: 'databases',
        type: 'group',
        label: 'Databases',
        children: [
          { key: 'mysql', label: 'MySQL', icon: <MySqlIcon /> },
          { key: 'postgresql', label: 'PostgreSQL', icon: <PostgreSqlIcon /> },
          { key: 'sql-server', label: 'SQL Server', icon: <SqlServerIcon /> },
          { key: 'mongodb', label: 'MongoDB', icon: <MongoDBIcon /> },
          { key: 'oracle', label: 'Oracle', icon: <OracleIcon /> },
        ],
      },
      {
        key: 'apis',
        type: 'group',
        label: 'APIs',
        children: [
          {
            label: 'GraphQL API',
            key: 'graphql',
            onClick: () => undefined,
            icon: <GraphQlIcon />,
          },
          {
            label: 'Rest API',
            icon: <RestIcon />,
            key: 'rest',
            onClick: () => undefined,
          },
        ],
      },
    ]

    return (
      <Dropdown overlay={<Menu items={menuItems} />}>
        <Button
          css={tw`flex justify-center items-center`}
          icon={<PlusOutlined />}
          size="small"
          type="primary"
        />
      </Dropdown>
    )
  },
)
