# Project Structure

## /libs/abstract/core

Module agnostic

- /libs/abstract/core/collections
- /libs/abstract/core/collections/models
- /libs/abstract/core/collections/entities
- /libs/abstract/core/collections/dtos

- /libs/abstract/core/ui/props
- /libs/abstract/core/ui/components

- /libs/abstract/core/repositories/mappers
- /libs/abstract/core/repositories/factories

- /libs/abstract/core/machines/actions
- /libs/abstract/core/machines/services

## /libs/core

> Core domain

Graph is a one-way aggregate

- /libs/core/graph
- /libs/core/graph/factory
- /libs/core/graph/mapper

- /libs/core/graph/vertex
- /libs/core/graph/vertex/factory
- /libs/core/graph/vertex/mapper

- /libs/core/graph/edge
- /libs/core/graph/edge/factory
- /libs/core/graph/edge/mapper

## /libs/generic

> Supporting subdomain

- /libs/generic/graph
- /libs/generic/graph/ui

- /libs/generic/cytoscape
- /libs/generic/cytoscape/factory
- /libs/generic/cytoscape/mapper

- /libs/generic/d3
- /libs/generic/d3/factory
- /libs/generic/d3/mapper

## /libs/packages

> Cohesive mechanisms, not part of domain

- /libs/packages/ui
