# Consul client-specific configuration
# This file is used on all non-server nodes (api, web, landing, sites, neo4j)
#
# IMPORTANT: This file must NOT be present on the consul-server node
# If both this file and consul-server.hcl exist, Consul merges them causing
# the localhost restriction to override the server's public API access

server = false

# Security: Client nodes only need local API access
# They communicate with Consul server via gossip protocol on different ports
# This prevents external access to potentially sensitive configuration data
client_addr = "127.0.0.1"

# Retry joining the Consul server
# This can be overridden at runtime with proper service discovery
retry_join = ["consul-server"]