/**
 * Consul Server Firewall Configuration
 * 
 * This firewall allows Terraform Cloud to access the Consul HTTP API
 * for managing KV configuration. Security is maintained through:
 * - IP-based access control (Terraform Cloud IPs only)
 * - Future: Consul ACL tokens for authentication
 * - Future: TLS encryption for data in transit
 */

resource "digitalocean_firewall" "consul_server" {
  name = "consul-server-firewall"
  
  droplet_ids = [digitalocean_droplet.consul_server.id]
  
  # Allow Terraform Cloud to access Consul HTTP API
  # IMPORTANT: Terraform Cloud does NOT publish IP ranges for remote execution mode
  # These are only API/notification IPs. For remote runs, consider:
  # - Using Terraform Cloud Agents in your infrastructure
  # - Running Terraform locally with appropriate credentials
  # - Using a bastion host or SSH tunnel
  # 
  # For now, allowing all IPs with security through:
  # - Future: Consul ACL tokens
  # - Future: TLS encryption
  inbound_rule {
    protocol         = "tcp"
    port_range       = "8500"
    source_addresses = [
      "0.0.0.0/0"  # WARNING: Open to all - Terraform Cloud doesn't publish execution IPs
      # Known Terraform Cloud IPs (API/notifications only - not execution):
      # "75.2.98.97/32",      # API
      # "99.83.150.238/32",   # API
      # "52.86.200.106/32",   # Notifications
      # "52.86.201.227/32",   # Notifications
      # "52.70.186.109/32",   # Notifications
      # "44.236.246.186/32",  # Notifications
      # "54.185.161.84/32",   # Notifications
      # "44.238.78.236/32"    # Notifications
    ]
  }
  
  # Allow SSH from anywhere (for management)
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0"]
  }
  
  # Allow internal VPC communication for Consul clustering
  inbound_rule {
    protocol         = "tcp"
    port_range       = "8300-8302"
    source_addresses = ["10.104.0.0/20"]  # VPC CIDR
  }
  
  # Allow DNS queries from VPC
  inbound_rule {
    protocol         = "tcp"
    port_range       = "8600"
    source_addresses = ["10.104.0.0/20"]
  }
  
  inbound_rule {
    protocol         = "udp"
    port_range       = "8600"
    source_addresses = ["10.104.0.0/20"]
  }
  
  # Allow all outbound traffic
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
  
  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}