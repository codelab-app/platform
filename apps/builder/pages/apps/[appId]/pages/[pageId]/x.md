RootEleemnt
RGL
children
Element
Element Drag handler

render ->
boundary
boundary

rgl
render
div

insert component to the list

props -> hooks
context - props
props -> compo
data = getRGLPRops(compo.id)
<Comp {..data}>

- spec

  - comp

  rootElement
  children

  tweak rootElements

make sure out component are dragglable (POC)
create layout for comp
assign key
assign props

set elemnt when render has key = id

get key = id
elements.map(
e => i

)

handle

- x: 0, y: 0
  set: x,0

- initial
  should have default grid
- render
  change existing grid structure

- comp
  props
  inside the grid should be receive and operate

- persist
- change

x
y

width
height

react
comp1
comp2
comp4

conditions

- resize
- drop

cases to handle

to resize a horizental, it'll push the b (next to a) down
if resize b veritical, it'll push the a (bellow a) down

size engine

- block
- affect position engine

- has styles
  - 200px
  - it can't be dragged unless remove styles
- has no styles - use existing size engine - Layout
  Layout
  width
  height
  position engine

drag

- have a grid to place component
- ## integration when dragging 2 components

wrap rgl outside
persist x,y,width,height

POC: integrate ignore style

create rgl
top most rgl
each top most comp will have a key

branch

/node_modules/react-grid-layout/css/styles.css
/node_modules/react-resizable/css/styles.css
react-grid-layout
@types/react-grid-layout

render example inside the builer
