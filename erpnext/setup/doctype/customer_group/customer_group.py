# Copyright (c) 2015, Revaluesoft S.A.E
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import cstr


from frappe.utils.nestedset import NestedSet
class CustomerGroup(NestedSet):
	nsm_parent_field = 'parent_customer_group';

	def on_update(self):
		self.validate_name_with_customer()
		super(CustomerGroup, self).on_update()
		self.validate_one_root()

	def validate_name_with_customer(self):
		if frappe.db.exists("Customer", self.name):
			frappe.msgprint(_("A customer with the same name already exists"), raise_exception=1)

def get_parent_customer_groups(customer_group):
	lft, rgt = frappe.db.get_value("Customer Group", customer_group, ['lft', 'rgt'])

	return frappe.db.sql("""select name from `tabCustomer Group`
		where lft <= %s and rgt >= %s
		order by lft asc""", (lft, rgt), as_dict=True)
def check_preventive_list(parentgroup, items, acceptance):
        m = []
	previtem = frappe.db.sql("""select item_code from `tabPreventive Item List`
		    where customer_group = %s""", (parentgroup))
		
	for d in items:
    	    for i in previtem:
    				
    				if d == i[0]:
    						m.append(d)
     
        if not acceptance:
            frappe.throw(_("The Following Items {0} Is prevented For The Customer, Please Inset Item Acceptance Code").format(m))

