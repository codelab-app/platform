variable "digitalocean_region" {
  type        = string
  description = "DigitalOcean region for Consul server"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID for the Consul server"
}

variable "ssh_keys" {
  type        = list(string)
  description = "SSH key fingerprints for droplet access"
  default     = ["31:0e:90:12:06:a2:9f:8b:07:0e:a8:49:cc:d8:1f:71"]
}

variable "datacenter" {
  type        = string
  description = "Consul datacenter name"
  default     = "codelab-dc1"
}

variable "consul_encryption_key" {
  type        = string
  description = "Consul gossip encryption key (generate with: consul keygen)"
  sensitive   = true
}

variable "digitalocean_access_token" {
  type        = string
  description = "DigitalOcean access token for backup operations"
  sensitive   = true
}