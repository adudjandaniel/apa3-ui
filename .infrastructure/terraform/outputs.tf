output "Public_IP_Address" {
  value = google_compute_address.apa3_ui_vm_static_ip.address
}