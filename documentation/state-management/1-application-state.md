# Application State

## Types of state

There are 2 types of data:

1. Persistent
  - Stored in database, MySQL, MongoDB, Postgres etc.
2. Local
  - React local state
  - XState

And 3 categories of state

1. Component (Persistent)
  - JSON data to configure our components
2. UI (Local)
  - Sidebar, modal toggle state etc.
  - Transitions, animations
3. Data (Persistent)
  - Business specific application data

## Component

As shown in our [Demo](../getting-started/8-demo.md), the JSON data representing our components will be persisted to the database.

## UI

UI state is complex in that there are many states a state machine can be in. We use XState to manage all our local states.

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/xstate/xstate-node-component.png">

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/xstate/xstate-node-sequence.png">

We start with a ListMachine, think of this as a container for our ItemMachine. We then bind actions to ListMachine by extending it.

As we initialize the ListMachineWithActions inside our List.tsx component, we spawn a action promise to fetch our data.

Then loop through the data & map each result to spawn a ItemMachine, which is assigned to a ref.

At this point, the ListMachine context has access to the ItemMachine via state.

When we map the List.tsx component to Item.tsx, we can pass the ref down via props. The Item.tsx can then use a hook to access the machine.

Whenever the Item.tsx receives UI events, we can use `sendParent` back to the parent machine, which has all the actions for use.

## Data

