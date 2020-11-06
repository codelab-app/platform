import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel } from '@storybook/components'
import React from 'react'
import ReactJson from 'react-json-view'

const Content = ({ api }) => {
  const data = useParameter('data', null)
  const currentStory = api.getCurrentStoryData()

  return (
    <>
      {data && currentStory ? (
        <ReactJson
          src={data[currentStory.story.replace(/ /g, '')]}
          name="data"
          displayDataTypes={false}
          displayObjectSize={false}
        />
      ) : (
        'No data'
      )}
    </>
  )
}

addons.register('my/design-addon', (api) => {
  addons.add('design-addon/panel', {
    title: 'Data',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content api={api} />
      </AddonPanel>
    ),
  })
})
