# Static Consul configuration - no runtime variables
# Service type determined by hostname

datacenter = "sgp1"
data_dir = "/opt/consul"
log_level = "INFO"
node_name = "{{ env "HOSTNAME" }}"

# Static encryption key for the cluster
# In production, this would be in a separate secured file
encrypt = "{{ file "/etc/consul.d/encrypt.key" }}"

# Determine if this is a server based on hostname
{{ if eq (env "HOSTNAME") "consul-server" }}
server = true
bootstrap_expect = 1
ui_config {
  enabled = true
}
client_addr = "0.0.0.0"
{{ else }}
server = false
client_addr = "127.0.0.1"

# Auto-join the consul server by hostname
retry_join = ["consul-server"]

# Register service based on hostname
services {
  name = "{{ env "HOSTNAME" }}"
  port = {{ if eq (env "HOSTNAME") "neo4j" }}7687{{ else if or (eq (env "HOSTNAME") "landing") (eq (env "HOSTNAME") "sites") }}80{{ else }}3000{{ end }}
  tags = ["{{ env "HOSTNAME" }}", "primary"]
  
  check {
    {{ if eq (env "HOSTNAME") "neo4j" }}
    tcp = "localhost:7687"
    {{ else }}
    http = "http://localhost:{{ if or (eq (env "HOSTNAME") "landing") (eq (env "HOSTNAME") "sites") }}80{{ else }}3000{{ end }}/health"
    {{ end }}
    interval = "10s"
    timeout = "5s"
  }
}
{{ end }}

# Bind to private network interface
bind_addr = "{{ GetPrivateInterfaces | include "network" "10.0.0.0/8" | attr "address" }}"

connect {
  enabled = true
}

performance {
  raft_multiplier = 1
}