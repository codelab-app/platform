## Enforce entity invariance at the DTO level vs. field level.

In the DDD forum clean architecture example (https://github.com/stemmlerjs/ddd-forum), we have the concept of composing an entity with its collection of fields. Each field is instantiated through a static helper method to ensure invariance.

We have a similar concept in (https://github.com/pvarentsov/typescript-clean-architecture), except the invariance is acted on the DTO level.

The DDD forum approach seems too verbose, pre-optimizing for different subset combinations of the entity's fields. Where in real life, not many variants of DTO's are used, we can just easily create a new use case DTO using class-validator.

## Ports & Adapters

Naming things with `Port` & `Adapter` is quite nice, as it lets us know that a complementary part exists.

CQRS works nicely with an Event Sourcing DDD-driven approach. Each command contains the event, which is complemented with a domain rich model that can hydrate our models.

## Where do DTO's belong

DTO isn't part of the domain core, but part of the application. It crosses boundary to the external.

## Use Case

Define the actions your actors can take

## Request vs Domain Validation

## Domain vs Application services

Domain services hold business logic, whereas application services call those logic

Application services are interactors & orchestrate calls to domain services

## EBI

Entity-Boundary-Interactor has the concept of actors that perform use cases via a boundary object. Interactors are the boundary object that orchestrate the interaction of use cases similar to application services.

## Use Case vs Application Service

An application service implements a use case. A use case has a port input & a DTO output.

The DTO's are based on use cases.

## Use Case Port/Adapter & controllers

A Use Case wraps around a port, controllers depend on the port interface. The controller is an adapter in that it fulfills the requirements of the port with input data.

## Package by Component

3 components

- Presentation
- Core
- Infrastructure
