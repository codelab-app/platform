# Minimal Consul base configuration
# This configuration is shared by ALL nodes (servers and clients)

# datacenter defaults to "dc1" - no need to specify for single DC setup
data_dir = "/opt/consul"
log_level = "INFO"

# Encryption key for gossip protocol
# This should be provided via environment variable or file at runtime
# encrypt = "YOUR_ENCRYPTION_KEY_HERE"

# Bind to VPC network for inter-node communication
# DigitalOcean droplets have two private networks:
# - eth0: DigitalOcean legacy private network (10.15.x.x, 10.10.x.x, etc.)
# - eth1: VPC network (any RFC1918 range) - We use this for Consul cluster
#
# Using eth1 directly is the pragmatic choice for DigitalOcean:
# ✅ Simple and clear - anyone can understand it
# ✅ DO has used eth0=legacy, eth1=VPC consistently for years
# ✅ Works regardless of VPC CIDR range (no hardcoded ranges)
# ✅ DO's own documentation references eth1 for VPC
# If DO ever changes this, we'll have bigger problems to solve anyway
bind_addr = "{{ GetInterfaceIP \"eth1\" }}"

# Enable service mesh
connect {
  enabled = true
}

# Performance tuning
performance {
  raft_multiplier = 1
}