# Setting up dnsmasq for Wildcard DNS (Optional)

If you need to test many preview URLs without manually adding each subdomain to `/etc/hosts`, you can use dnsmasq.

## Installation

```bash
brew install dnsmasq
```

## Configuration

1. Create config file:
```bash
echo "address=/.codelab.test/127.0.0.1" > /opt/homebrew/etc/dnsmasq.conf
echo "address=/.codelab.dev/127.0.0.1" >> /opt/homebrew/etc/dnsmasq.conf
```

2. Start dnsmasq:
```bash
sudo brew services start dnsmasq
```

3. Add dnsmasq as DNS resolver:
```bash
sudo mkdir -p /etc/resolver
echo "nameserver 127.0.0.1" | sudo tee /etc/resolver/test
echo "nameserver 127.0.0.1" | sudo tee /etc/resolver/dev
```

## Testing

After setup, any subdomain will resolve:
- `demo.codelab.test`
- `abc123.codelab.test`
- `anything.codelab.test`

## Manual Alternative

If you don't want to use dnsmasq, just add specific subdomains to `/etc/hosts`:
```
127.0.0.1    demo.codelab.test
127.0.0.1    app1.codelab.test
127.0.0.1    app2.codelab.test
```