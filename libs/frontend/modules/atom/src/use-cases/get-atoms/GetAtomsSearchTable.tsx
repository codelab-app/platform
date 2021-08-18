import Search from 'antd/lib/input/Search'
import debounce from 'lodash/debounce'
import { ChangeEventHandler, useState } from 'react'

export const GetAtomsSearchTable = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  return (
    <Search
      // loading={loading}
      placeholder="Search"
      onSearch={(v) => setSearchValue(v)}
      onChange={debounce<ChangeEventHandler>(
        (event) => setSearchValue((event.target as any).value),
        500,
      )}
    />
  )
}
