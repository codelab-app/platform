# Minimal Consul base configuration
# This configuration is shared by ALL nodes (servers and clients)

datacenter = "sgp1"
data_dir = "/opt/consul"
log_level = "INFO"

# Encryption key for gossip protocol
# This should be provided via environment variable or file at runtime
# encrypt = "YOUR_ENCRYPTION_KEY_HERE"

# Bind to all interfaces
bind_addr = "0.0.0.0"

# Enable service mesh
connect {
  enabled = true
}

# Performance tuning
performance {
  raft_multiplier = 1
}