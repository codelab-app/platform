# Consul client-specific configuration
# This file is used on all non-server nodes

server = false

# Only listen on localhost for security
client_addr = "127.0.0.1"

# Retry joining the Consul server
# This can be overridden at runtime with proper service discovery
retry_join = ["consul-server"]