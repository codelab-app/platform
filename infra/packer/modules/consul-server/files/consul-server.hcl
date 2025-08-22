# Consul server-specific configuration
# This file is only used on the Consul server node

server = true
bootstrap_expect = 1

# Enable UI on server
ui_config {
  enabled = true
}

# Listen on all interfaces for UI and API access
client_addr = "0.0.0.0"