# Yes, if you don't use a Virtual Private Cloud (VPC), your DigitalOcean App Platform app and your Droplet would communicate over the public internet. This means that the traffic between your app and the Droplet is routed outside the private, isolated network provided by a VPC.

resource "digitalocean_vpc" "platform_vpc" {
  name   = "platform-vpc"
  region = "sfo2" # Match this with your application's region
  # ip_range = "10.10.10.0/24"  # Choose an IP range that fits your needs
}
