from django.contrib.admin import AdminSite

class WestendAdminSite(AdminSite):
    site_header = "Westend Corporation Admin"
    site_title = "Westend Admin"
    index_title = "Dashboard"

# Create custom admin instance
westend_admin_site = WestendAdminSite(name='westend_admin')
