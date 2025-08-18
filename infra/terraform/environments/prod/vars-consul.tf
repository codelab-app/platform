variable "CONSUL_ENCRYPT_KEY" {
  type        = string
  description = "Consul gossip encryption key - generate with: consul keygen"
  sensitive   = true
}