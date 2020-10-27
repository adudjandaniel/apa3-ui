data "google_compute_network" "default" {
  name = "default"
}

provider "google" {
  version = "3.5.0"
  credentials = file(var.credentials_file)
  project = var.project
  region = var.region
  zone = var.zone
}

provider "google-beta" {
  credentials = file(var.credentials_file)
  project = var.project
  region = var.region
  zone = var.zone
}

resource "google_compute_network" "apa3_test_vpc" {
  name = "apa3-test-vpc"
}

resource "google_compute_firewall" "test-http-80" {
  name    = "test-http-80"
  network = google_compute_network.apa3_test_vpc.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = var.port_number
  }
}

resource "google_compute_firewall" "apa3-test-vpc-allow-ssh" {
  name    = "apa3-test-vpc-allow-ssh"
  network = google_compute_network.apa3_test_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
}

resource "google_compute_instance" "apa3-ui-vm-test" {
  name = "apa3-ui-vm-test"
  allow_stopping_for_update = true
  machine_type = var.machine_types[var.environment]
  tags =[
      "web","apa3-ui-test"
  ]

  provisioner "local-exec" {
    command = "echo ${google_compute_instance.apa3-ui-vm-test.name}: ${google_compute_instance.apa3-ui-vm-test.network_interface[0].access_config[0].nat_ip} > ip_address.txt"
  }

  boot_disk {
    auto_delete = true
    initialize_params {
      image = var.boot_image_name
      type = "pd-standard"
    }
  }

  metadata = {
    gce-container-declaration = var.docker_declaration
  }

  labels = {
    container-vm = "cos-stable-69-10895-62-0"
  }

  network_interface {
    network = google_compute_network.apa3_test_vpc.name
    access_config {      
    }
  }
}

resource "google_dns_record_set" "apa3-test" {
  name         = "${var.domain}."
  managed_zone = "luzcode"
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_address.apa3_ui_test_lb_static_ip.address]
}

resource "google_compute_instance_group" "apa3-test-instances" {
  name        = "apa3-ui-test-instances"
  description = "APA UI instance groups"

  instances = [
    google_compute_instance.apa3-ui-vm-test.self_link
  ]

  named_port {
    name = "http"
    port = "80"
  }

  named_port {
    name = "https"
    port = "443"
  }

  zone = var.zone
}

resource "google_compute_health_check" "apa3-ui-test-http-health-check" {
  name = "apa3-ui-test-http-health-check"

  timeout_sec        = 5
  check_interval_sec = 10

  http_health_check {
    port = 80
  }
}

resource "google_compute_address" "apa3_ui_test_lb_static_ip" {
  name = "apa3-ui-test-lb-static-ip"
  network_tier = "STANDARD"
}

resource "google_compute_backend_service" "apa3_ui_test_backend_service" {
  name          = "apa3-ui-test-backend-service"
  health_checks = [google_compute_health_check.apa3-ui-test-http-health-check.id]
  load_balancing_scheme = "EXTERNAL"
  protocol = "HTTP"
  port_name = "http"
  
  backend {
    group = google_compute_instance_group.apa3-test-instances.self_link
  }
}

resource "google_compute_forwarding_rule" "apa3_ui_test_lb_frontend" {
  name = "apa3-ui-test-lb-frontend"
  region = var.region
  ip_address = google_compute_address.apa3_ui_test_lb_static_ip.address
  ip_protocol = "TCP"
  load_balancing_scheme = "EXTERNAL"
  network_tier = "STANDARD"
  port_range = "80"
  target = google_compute_target_http_proxy.apa3_ui_test_lb_proxy.id
}

resource "google_compute_forwarding_rule" "apa3_ui_test_lb_frontend-ssl" {
  name = "apa3-ui-test-lb-frontend-ssl"
  region = var.region
  ip_address = google_compute_address.apa3_ui_test_lb_static_ip.address
  ip_protocol = "TCP"
  load_balancing_scheme = "EXTERNAL"
  network_tier = "STANDARD"
  port_range = "443"
  target = google_compute_target_https_proxy.apa3_ui_test_lb_proxy_ssl.id
}

resource "google_compute_target_http_proxy" "apa3_ui_test_lb_proxy" {
  provider = google-beta

  name    = "apa3-ui-test-lb-target-proxy"
  url_map = google_compute_url_map.apa3_ui_test_url_map.id
}

resource "google_compute_target_https_proxy" "apa3_ui_test_lb_proxy_ssl" {
  provider = google-beta

  name    = "apa3-ui-test-lb-target-proxy-ssl"
  url_map = google_compute_url_map.apa3_ui_test_url_map_ssl.id
  ssl_certificates = [google_compute_managed_ssl_certificate.apa3_ui_test_lb_proxy_ssl_cert.id]
}

resource "google_compute_managed_ssl_certificate" "apa3_ui_test_lb_proxy_ssl_cert" {
  provider = google-beta

  name = "apa3-ui-test-lb-target-proxy-ssl-cert"

  managed {
    domains = [var.domain]
  }
}

resource "google_compute_url_map" "apa3_ui_test_url_map" {
  provider = google-beta

  name            = "apa3-ui-test-url-map"
  default_url_redirect {
    https_redirect = true
    strip_query = false
  }
}

resource "google_compute_url_map" "apa3_ui_test_url_map_ssl" {
  provider = google-beta

  name            = "apa3-ui-test-url-map-ssl"
  default_service = google_compute_backend_service.apa3_ui_test_backend_service.id
}