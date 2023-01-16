package com.increff.employee.pojo;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class DailySalesPojo {

    @Id
    private Date date;
    private int orders;
    private int items;
    private double revenue;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getOrders() {
        return orders;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }

    public int getItems() {
        return items;
    }

    public void setItems(int items) {
        this.items = items;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }
}
