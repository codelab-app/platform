#!/bin/bash

# Neo4j subscriptions in @neo4j/graphql@6 requires an enterprise image with CDC enabled
# https://neo4j.com/docs/cdc/current/get-started/self-managed/#_modify_a_databases_cdc_mode
cypher-shell -a localhost:7687 -u neo4j -p password 'ALTER DATABASE neo4j SET OPTION txLogEnrichment "DIFF"'

cypher-shell -a localhost:7687 -u neo4j -p password 'SHOW DATABASES YIELD name, options'
