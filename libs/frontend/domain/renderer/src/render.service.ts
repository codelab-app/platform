import type {
  ExternalComponent,
  IRenderer,
  IRenderService,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RenderService')
export class RenderService
  extends Model({
    externalComponents: prop(() => objectMap<ExternalComponent>()),
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IRenderService
{
  onAttachedToRootStore() {
    // Should get the app's custom atoms with the external react packages from the database
    this.externalComponents.set('GoogleMapReact', {
      isLoaded: false,
      name: 'GoogleMapReact',
      src: 'https://cdn.jsdelivr.net/npm/google-map-react@2.2.1/+esm',
    })
    this.externalComponents.set('ReactCalendar', {
      isLoaded: false,
      name: 'ReactCalendar',
      src: 'https://cdn.jsdelivr.net/npm/react-calendar@4.2.1/+esm',
    })
  }

  loadExternalComponents = () => {
    const components = [...this.externalComponents.values()].filter(
      ({ isLoaded }) => !isLoaded,
    )

    components.forEach(({ name, src }) => {
      const script = document.createElement('script')
      script.type = 'module'
      script.innerText = `
        import ${name} from '${src}';
        if (!window.externalComponents) {
          window.externalComponents = {};
        }
        window.externalComponents.${name} = ${name};
      `
      document.getElementsByTagName('head')[0]?.appendChild(script)

      console.log(`Loaded external component "${name}"`)
      this.externalComponents.set(name, { isLoaded: true, name, src })
    })
  }

  @modelAction
  addRenderer = (props: RendererProps) => {
    let renderer = this.renderers.get(props.id)

    if (!renderer) {
      renderer = Renderer.create(props)

      this.renderers.set(props.id, renderer)
    }

    return renderer
  }
}
