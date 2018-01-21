# Copyright (c) 2015, Revaluesoft S.A.E
# License: GNU General Public License v3. See license.txt

import frappe

def execute():
	frappe.reload_doc("manufacturing", "doctype", "bom")
	company = frappe.db.get_value("Global Defaults", None, "default_company")
	frappe.db.sql("""update  `tabBOM` set company = %s""",company)
