// Copyright (c) 2018, Revaluesoft S.A.E and contributors
// For license information, please see license.txt

frappe.ui.form.on('Cashier Closing', {

	in_save: function(frm){
		var me = this;

		frm.doc.net_amount = flt(frm.doc.in_save) - flt(frm.doc.custody)
	}
});
