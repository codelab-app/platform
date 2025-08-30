# Consul server-specific configuration
# This file is used ONLY on the consul-server node
#
# CRITICAL: This file must NOT coexist with consul-client.hcl
# Both files set client_addr, and if both exist, Consul merges them
# causing the restrictive client setting (localhost) to break external access

server = true
bootstrap_expect = 1

# Enable UI on server
ui_config {
  enabled = true
}

# Listen on all interfaces for UI and API access
# This is required for:
# - Terraform Cloud to connect and write configuration via consul provider
# - Browser access to Consul UI (port 8500)
# - External monitoring and administration tools
# - Other services in different networks to query Consul
#
# Security note: Firewall rules should restrict access to authorized sources
# rather than relying on Consul binding to localhost
client_addr = "0.0.0.0"

# Bind and advertise on VPC network (eth1) for cluster communication
# We explicitly set these to override any base configuration
# Using eth1 keeps it simple and DO-specific (see consul-base.hcl for rationale)
bind_addr = "{{ GetInterfaceIP \"eth1\" }}"
advertise_addr = "{{ GetInterfaceIP \"eth1\" }}"