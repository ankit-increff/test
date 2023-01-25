package com.increff.employee.pojo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class OrderPojo {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private Date date;
    private boolean isInvoiceGenerated;

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

    public boolean isInvoiceGenerated() {
        return isInvoiceGenerated;
    }

    public void setInvoiceGenerated(boolean invoiceGenerated) {
        isInvoiceGenerated = invoiceGenerated;
    }
}
