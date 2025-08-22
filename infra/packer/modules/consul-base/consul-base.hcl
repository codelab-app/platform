# Minimal Consul base configuration
# This configuration is shared by ALL nodes (servers and clients)

datacenter = "sgp1"
data_dir = "/opt/consul"
log_level = "INFO"

# Use hostname as node name
node_name = "{{ env \"HOSTNAME\" }}"

# Encryption key for gossip protocol
encrypt = "{{ file \"/etc/consul.d/encrypt.key\" }}"

# Bind to all interfaces - Consul will figure out the best advertise address
bind_addr = "0.0.0.0"

# Enable service mesh
connect {
  enabled = true
}

# Performance tuning
performance {
  raft_multiplier = 1
}