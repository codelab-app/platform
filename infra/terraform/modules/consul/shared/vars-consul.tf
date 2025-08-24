/**
 * Shared Consul variables for all service modules
 */

variable "consul_server_ip" {
  type        = string
  description = "Private IP of the Consul server"
}

variable "consul_datacenter" {
  type        = string
  description = "Consul datacenter name"
  default     = "dc1"
}