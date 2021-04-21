# Context Mapping

## Graph vs Tree

A Tree is a subset of a Graph, and we can represent a Tree using a graph-like representation or a tree-like representation.

In a tree-like data structure, we use `parent` & `children` to recursively build the relationships between the nodes. The data structure logically simulates that of a tree.

In a graph-like data structure, we declare `vertexes` & `edges` separately. The `edges` contain vertex id's for `src` & `dest`, which help link vertexes together.

## Domain Driven Design

In domain driven design, there is the idea of context mapping. When we have different representations in domains, we require translation between the 2 conceptual framework.

If we represent data using a tree in the database (Neo4j, Typeorm TreeEntity), we will require context mapping if our libraries require a graph representation.

## D3.js, Cytoscape.js

After some thought, we actually wouldn't use https://typeorm.io/#/tree-entities. Using TreeEntity would still create a tree-like data structure representation with parent/children (similar to Neo4j).

We actually want to represent data in a graph-like structure, which separates out into `vertexes` & `edges`. The `edges` hold the `source` & `target` then allow us to connect `vertexes` together to form a Graph.

Most graph libraries such as D3.js (https://github.com/d3/d3), and Cytoscape.js (https://github.com/cytoscape/cytoscape.js) both use the Graph representation.

https://github.com/d3/d3-force/tree/v2.1.1#links
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1c79245bb53715a4d24d53fd88d6f268cb14c0de/types/cytoscape/index.d.ts#L140-L153

## Adapter Pattern

To support multiple libraries, we can create our own Adapter which uses our own interfaces, then allow a unified API to call multiple external libraries.
