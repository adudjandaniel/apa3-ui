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

resource "google_compute_firewall" "test-http-80" {
  name    = "test-http-80"
  network = data.google_compute_network.default.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = [var.port_number]
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
  name         = "apa3.test.msu.luzcode.com."
  managed_zone = "luzcode"
  type         = "A"
  ttl          = 300

  rrdatas = [google_compute_instance.apa3-ui-vm-test.network_interface[0].access_config[0].nat_ip]
}

resource "google_compute_address" "apa3_ui_vm_test_static_ip" {
    name = "apa3-ui-test-static-ip"
}
