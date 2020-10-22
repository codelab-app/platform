---
order: 6
path: '/root-children'
level: 0
key: 'root-children'
title: 'Root Children'
---

Sometimes we want to manually pass a JSX expression as the children of a Component. Useful for composition of different components, & allows us to keep the data object separate.

```javascript
const Modal = Tree.render(modalData)
const Content = Tree.render(contentData)

const modalWithContent = (
  <Modal>
    <Content />
  </Modal>
)
```

This uses the concept of root children, tests can be found at `Props-rootChildren.spec.tsx`.

# Root children

```javascript
const data = {
  children: [
    {
      type: 'Button',
      children: [
        {
          type: 'Text',
          props: {
            value: 'Toggle Modal',
          },
          // children: [] (A)
        },
      ],
    },
    {
      type: 'Modal',
      props: {
        title: 'Basic Modal',
      },
      // children: [] (B)
    },
  ],
}
const Component = Tree.render(data)

const render = (
  <Component>
    <h1>Root Children</h1>
  </Component>
)
```

The `<h1>Root Children</h1>` React node will be added to the innermost children for all branches of children. It won't be added to (A) because the `Text` component doesn't contain a children. The `Modal` component does so the JSX will only be displayed there.
