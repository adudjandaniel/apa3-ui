output "Public_IP_Address" {
  value = google_compute_address.apa3_ui_lb_static_ip.address
}