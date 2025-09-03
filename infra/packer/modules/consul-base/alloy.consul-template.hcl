template {
  source = "/etc/consul-template/alloy-config.ctmpl"
  destination = "/etc/alloy/config.alloy"
  perms = 0644
  exec {
    command = ["systemctl", "reload-or-restart", "alloy"]
    timeout = "30s"
  }
}