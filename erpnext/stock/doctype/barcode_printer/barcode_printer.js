// Copyright (c) 2018, Revaluesoft S.A.E and contributors
// For license information, please see license.txt

frappe.ui.form.on('Barcode Printer', {
	purchase_invoice: function(frm) {
        frm.doc.purchase_receipt = ""
        frm.doc.receipt_supplier_id = ""
        frm.doc.barcode_printer_items = null
		frappe.model.with_doc("Purchase Invoice", frm.doc.purchase_invoice, function() {
            var tabletransfer= frappe.model.get_doc("Purchase Invoice", frm.doc.purchase_invoice)
            $.each(tabletransfer.items, function(index, row){
                d = frm.add_child("barcode_printer_items");
                d.item_code = row.item_code;
				d.item_barcode = row.barcode;
				d.item_batch = row.batch_no;
				d.printer_barcode = row.barcode+"-"+row.batch_no+"-"+frm.doc.invoice_supplier_id;
                frm.refresh_field("barcode_printer_items");
            });
        });
		
    },
	purchase_receipt: function(frm) {
        frm.doc.purchase_invoice = ""
        frm.doc.invoice_supplier_id = ""
        frm.doc.barcode_printer_items = null
		frappe.model.with_doc("Purchase Receipt", frm.doc.purchase_receipt, function() {
            var tabletransfer= frappe.model.get_doc("Purchase Receipt", frm.doc.purchase_receipt)
            $.each(tabletransfer.items, function(index, row){
                d = frm.add_child("barcode_printer_items");
                d.item_code = row.item_code;
				d.item_barcode = row.barcode;
				d.item_batch = row.batch_no;
				d.printer_barcode = row.barcode+"-"+row.batch_no+"-"+frm.doc.receipt_supplier_id;
                frm.refresh_field("barcode_printer_items");
            });
        });
		
	}    
});
