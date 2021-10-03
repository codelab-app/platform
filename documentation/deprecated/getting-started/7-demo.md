# Demo

[Back](../../README.md)

## Steps

1. Run `nx storybook ui-antd` and visit the URL.
2. Select `Button` on the left sidebar in Storybook
3. Check out the source code at `libs/ui/antd/src/components/button/Button.stories.tsx`
4. You'll see that we simply pass our Renderer a JSON data to create the component

As you explore all the Stories, you'll see that all of the component data have been extracted out using a common data structure.

This enables us an abstraction layer to design a UI builder layer for users to construct components
