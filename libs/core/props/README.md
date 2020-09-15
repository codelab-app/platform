# Props

Props contain configurations & data for how we configure Components. Each Node can contain multiple props, & each prop can be considered as having a `PropType`.

```typescript
// prettier-ignore
type PropTypeLiteral =
  | 'Default'
  | 'Eval'
  | 'RenderProps'
  | 'LeafRenderProps'

type PropValue = {
  propType: PropTypeLiteral | Array<PropTypeLiteral>
  value: any
}

type Prop = {
  [key: string]: string | PropValue
}
```

## PropTypes

### Default

```typescript
const node = {
  type: 'React',
  type: 'Button',
  props: {
    size: {
      propType: 'Default',
      value: 'large',
    },
  },
}
```

or simplified to

```typescript
const node = {
  // ...
  props: {
    size: 'large',
  },
}
```

### Eval

We can also write JavaScript code which is then evaluated to a value.

```typescript
const node = {
  // ...
  props: {
    secondsInAnHour: {
      propType: 'Eval',
      value: 'return 60 * 60 * 1',
    },
  },
}
```

Or write a callback function

```typescript
const node = {
  // ...
  props: {
    onClick: {
      propType: 'Eval',
      value: 'return () => console.log("Clicked!")',
    },
  },
}
```

In fact our function contains a `ctx` variable that is passed as argument. This `ctx` contains libraries like `React` or `lodash`

```typescript
const node = {
  // ...
  props: {
    addItem: {
      propType: 'Eval',
      value: `
        const items = []
        return this.lodash.concat(items, 'Apple')
      `,
    },
  },
}
```

The `this` keyword contains all renderProps passed from the parent, so in the above example you may append to props instead

```typescript
const node = {
  // ...
  props: {
    addItem: {
      propType: 'Eval',
      value: `
        return this.lodash.concat(this.props.items, 'Apple')
      `,
    },
  },
}
```

### RenderProps

So how do we make `items` accessible from `this.props`? We can create what's called RenderProps in React. It is just a prop that is passed from the parent to the child.

`RenderProps` passes 1 level down, while `LeafRenderProps` passes all the way to the leaf nodes.

```typescript
const node = {
  // ...
  props: {
    items: {
      propType: 'RenderProps',
      value: ['Orange']
    },
  },
  children: [
    props: {
      addItem: {
        propType: 'Eval',
        value: `
          return this.lodash.concat(this.props.items, 'Apple')
        `,
      },
    },
  ]
}
```

We can also chain `propType` like so

```typescript
const node = {
  // ...
  props: {
    items: {
      propType: ['RenderProps', 'Eval'],
      value: `return []`,
    },
  },
  children: [
    // ...
  ],
}
```
