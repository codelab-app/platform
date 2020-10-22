# Core Concept

[Back](../README.md)

We conceptualize an application as a `Tree`, just as how the browser uses a Dom tree. If we can have a way of constructing the Tree, we can build the Dom tree.

## Tree Representations

There are 2 `Tree` data structures that we use. The first is thinking it like a tree, & the natural hierarchy is apparent in the data.

1. As a recursive collection of `Nodes`.

The second approach is to think about it like a `Graph`. A graph comprises of edges & vertices, where each vertex connects 2 edges.

2. As a collection of edges or vertices

#2 gives us a flat structure as there is no recursive nesting, so it is suitable for persistent storage. While #1 is a closer representation to the Dom tree, so we transform a `Graph` representation into a `Tree` representation before rendering onto the view.

### Graph Theory

A `Tree` is a specialized `Graph`, so we can use Graph Theory to help us conceptualize a Tree.

Tree `Traversal` is a common way to interact with a tree. You can configure the traversal order, and what transformations to apply to each node.