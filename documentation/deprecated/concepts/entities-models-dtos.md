# Entities

https://stackoverflow.com/questions/39397147/difference-between-entity-and-dto

The most relevant interpretations of the term "Entity", in my opinion, are the following three:

1. In the context of enterprise java and jpa:

> "An object that represents persistent data maintained in a database."

2. In the context of "domain-driven-design" (by Eric Evans):

> "An object defined primarily by its identity, rather than its attributes."

3. In the context of "clean architecture" (by Robert C. Martin):

> "An object that encapsulates enterprise-wide critical business rules."

# Models

More business logic focused, entity is just an instance, where model can be thought of as the class

All operations go through Aggregated Root.
