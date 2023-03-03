# Codelab.app

Checkout [Codelab.app Wiki](https://wiki.codelab.app) to get started!

CRUD terms

## Actions

### Create

This takes in DTO data and create a model

~~### Add~~

This adds the model to mobx cache

`Currently no distinction needs to be made for create and add, since can't think of a scenario where we would need to create a model and not save to cache`

### Save

This takes the model and persists it to the database

### Submit

This takes form data, does some mapping, then call Create and Save

### Load

Takes external GraphQL data and hydrate the models

## Data

### Data

This is the form data, not enough for hydration. We need mappers and save default values added to become a DTO

Data + Mapper = DTO

### DTO

This is the complete data enough for hydrate into a model


## Services & Models

`writeCache` exist on each model to update existing cache

`add` exists on services to write data to cache
