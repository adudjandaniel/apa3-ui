data "google_compute_network" "default" {
  name = "default"
}

provider "google"{
  version = "3.5.0"
  credentials = file(var.credentials_file)
  project = var.project
  region = var.region
  zone = var.zone
}

resource "google_compute_firewall" "http-80" {
  name    = "http-80"
  network = data.google_compute_network.default.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = [var.port_number]
  }
}

resource "google_compute_instance" "apa3-ui-vm" {
  name = "apa3-ui-vm"
  machine_type = var.machine_types[var.environment]
  tags =[
      "web","apa3-ui"
  ]

  provisioner "local-exec" {
    command = "echo ${google_compute_instance.apa3-ui-vm.name}: ${google_compute_instance.apa3-ui-vm.network_interface[0].access_config[0].nat_ip} >> ip_address.txt"
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
      nat_ip = google_compute_address.apa3_ui_vm_static_ip.address
    }
  }
}

resource "google_compute_address" "apa3_ui_vm_static_ip" {
    name = "apa3-ui-static-ip"
}
