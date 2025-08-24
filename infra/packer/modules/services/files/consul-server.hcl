# Consul server-specific configuration
# This file overrides client settings for the consul-server node

server = true
bootstrap_expect = 1

# Enable UI on server
ui_config {
  enabled = true
}

# Listen on all interfaces for UI and API access
client_addr = "0.0.0.0"

# Use private IP for inter-node communication
# Consul will auto-detect the private IP to advertise
# advertise_addr will default to the first private IP found