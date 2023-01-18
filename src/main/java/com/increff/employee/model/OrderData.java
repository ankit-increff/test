package com.increff.employee.model;

import java.util.Date;

public class OrderData {

	private int id;
	private Date date;
	private double amount;
	private boolean isInvoiceGenerated;

	public boolean isInvoiceGenerated() {
		return isInvoiceGenerated;
	}

	public void setInvoiceGenerated(boolean invoiceGenerated) {
		isInvoiceGenerated = invoiceGenerated;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
}
