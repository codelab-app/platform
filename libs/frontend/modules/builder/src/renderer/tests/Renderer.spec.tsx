import { ElementGraphTreeAdapter } from '@codelab/frontend/model/domain'
import { mount } from 'enzyme'
import preloadAll from 'jest-next-dynamic'
import { renderFactory } from '../renderFactory'
import { mapperPageElements } from './Mapper.data'

beforeAll(async () => {
  await preloadAll()
})

describe('Link', () => {
  it('should render correctly', () => {
    const tree = new ElementGraphTreeAdapter(mapperPageElements)

    const abc = renderFactory(tree.getRoot(), {
      renderFactory,
      tree,
    })

    console.log(abc)

    const bb = mount(abc)

    // expect(wrapper.find('div')).toBeDefined()

    // console.log(wrapper.debug())

    // const wrapper = mount(
    //   <div>
    //     <p>0</p>
    //   </div>,
    // )
    //
    // console.log(wrapper.debug())
    //
    // const wrapper2 = shallow(
    //   <div>
    //     <p>0</p>
    //   </div>,
    // )
    //
    // console.log(wrapper2.debug())

    // expect(wrapper.find('p').text()).toEqual('0')
  })
})
