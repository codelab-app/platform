The Tree class is responsible for constructing a Tree structure composed of Nodes from data, or InputNodes.

The `makeTree` strategy uses data that mimicks the structure of the tree, with InputNodes nested with the children property.

'makeGraph' follows the same strategy, but produces a Graph instead.

In other situations, we may have a flat array of data, which would require a different instantiation method. We would build each node according to the `children` or `parent` property.

Note that in the flat array scenario, children would be an array of ID's, as opposed to the array of NodeInput which is found in `makeTree`.
