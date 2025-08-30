# Architectural Decision: Consul Network Binding on DigitalOcean

## Context
DigitalOcean droplets with VPC enabled have multiple network interfaces:
- `eth0`: DigitalOcean's legacy private network (10.15.x.x, 10.10.x.x, etc.)
- `eth1`: VPC network (can be any RFC1918 range)

Consul needs to bind to the correct interface for cluster communication.

## Decision
We use **interface name binding** (`eth1`) instead of CIDR matching.

```hcl
bind_addr = "{{ GetInterfaceIP \"eth1\" }}"
advertise_addr = "{{ GetInterfaceIP \"eth1\" }}"
```

## Rationale

### Why not CIDR matching?
While CIDR matching (`{{ GetPrivateInterfaces | include "network" "10.104.0.0/20" | attr "address" }}`) is theoretically more portable:

1. **Hardcodes VPC range**: Requires updating if VPC CIDR changes
2. **Complex**: Harder to understand and debug
3. **Over-engineering**: Solves a problem we don't have on DigitalOcean

### Why eth1 is the right choice for DigitalOcean

1. **Simple and Clear**: Anyone can understand `eth1` = VPC network
2. **Consistently Reliable**: DO has used this convention for years
3. **CIDR-agnostic**: Works regardless of what VPC range you choose
4. **Well-documented**: DigitalOcean's own docs reference eth1 for VPC
5. **Pragmatic**: If DO changes this fundamental convention, we'll have many other things to update anyway

## Trade-offs

**Pros:**
- ✅ Dead simple configuration
- ✅ No CIDR knowledge needed
- ✅ Works with any VPC range
- ✅ Easier to debug
- ✅ Shorter, cleaner config files

**Cons:**
- ❌ Tied to DigitalOcean's interface naming
- ❌ Would break if DO changes interface names (unlikely)
- ❌ Not portable to other cloud providers (but we're DO-specific anyway)

## Alternatives Considered

1. **CIDR Matching**: More complex, requires hardcoding VPC range
2. **Interface Index**: Least reliable, can change on reboot
3. **Bind to all (0.0.0.0)**: Security risk, causes confusion with multiple IPs

## Decision Date
2025-08-24

## Status
Accepted and Implemented