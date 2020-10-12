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

resource "google_compute_network" "apa3_vpc" {
  name = "apa3-vpc-network"
}

resource "google_compute_firewall" "test-http-80" {
  name    = "test-http-80"
  network = google_compute_network.apa3_vpc.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = var.port_number
  }
}

resource "google_compute_instance" "apa3-ui-vm-test" {
  name = "apa3-ui-vm-test"
  machine_type = var.machine_types[var.environment]
  tags =[
      "web","apa3-ui-test"
  ]

  provisioner "local-exec" {
    command = "echo ${google_compute_instance.apa3-ui-vm-test.name}: ${google_compute_instance.apa3-ui-vm-test.network_interface[0].access_config[0].nat_ip} >> ip_address.txt"
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
    network = "default"
    access_config {
      nat_ip = google_compute_address.apa3_ui_vm_test_static_ip.address
    }
  }
}

resource "google_dns_record_set" "apa3-test" {
  name         = var.domain_name
  managed_zone = "luzcode"
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_instance.apa3-ui-vm-test.network_interface[0].access_config[0].nat_ip]
}

resource "google_compute_address" "apa3_ui_vm_test_static_ip" {
  name = "apa3-ui-test-static-ip"
}


resource "google_compute_instance_group" "apa3-instance-group" {
  name        = "apa3-ui-instances"
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

resource "google_compute_health_check" "http-health-check" {
  name = "http-health-check"

  timeout_sec        = 5
  check_interval_sec = 10

  http_health_check {
    port = 80
  }
}

resource "google_compute_backend_service" "default" {
  name          = "backend-service-apa3"
  health_checks = [google_compute_health_check.http-health-check.id]
  load_balancing_scheme = "EXTERNAL"
  protocol = "HTTP"
  port_name = "http"
  
  backend {
    group = google_compute_instance_group.apa3-instance-group.self_link
  }
}

resource "google_compute_address" "apa3_ui_lb_static_ip" {
  name = "apa3-ui-lb-static-ip"
  network_tier = "STANDARD"
}

resource "google_compute_forwarding_rule" "apa3_ui_lb_frontend" {
  name = "apa3-ui-lb-frontend"
  region = var.region
  ip_address = google_compute_address.apa3_ui_lb_static_ip.address
  ip_protocol = "TCP"
  load_balancing_scheme = "EXTERNAL"
  network_tier = "STANDARD"
  port_range = "80"
  target = google_compute_target_http_proxy.apa3_ui_lb_proxy.id
}

resource "google_compute_target_http_proxy" "apa3_ui_lb_proxy" {
  provider = google-beta

  name    = "apa3-ui-lb-target-proxy"
  url_map = google_compute_url_map.apa3_ui_url_map.id
}

resource "google_compute_url_map" "apa3_ui_url_map" {
  provider = google-beta

  name            = "apa3-ui-url-map"
  default_service = google_compute_backend_service.default.id
}