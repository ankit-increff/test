package com.increff.employee.dto;

import com.increff.employee.model.*;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.pojo.InventoryPojo;
import com.increff.employee.pojo.OrderItemPojo;
import com.increff.employee.pojo.OrderPojo;
import com.increff.employee.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.*;

@Component
public class ReportDto {

    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private BrandService brandService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemService orderItemService;


    @Transactional(rollbackOn = ApiException.class)
    public List<InventoryReportData> getAllInventories() throws ApiException {
        List<BrandPojo> allBrands = brandService.getAll();
        Map<Integer, Integer> map = new HashMap<>();

        for(BrandPojo p : allBrands) {
            map.put(p.getId(), 0);
        }

        List<InventoryPojo> allInventory = inventoryService.getAll();
        for(InventoryPojo p : allInventory) {
            int quantity = p.getQuantity();
            int brandId = productService.get(p.getId()).getBrandId();
            int curr = map.get(brandId);
            map.put(brandId, curr+quantity);
        }

        List<InventoryReportData> report = new ArrayList<>();
        for(BrandPojo p : allBrands) {
            InventoryReportData data = new InventoryReportData();
            data.setBrand(p.getName());
            data.setCategory(p.getCategory());
            data.setQuantity(map.get(p.getId()));

            report.add(data);
        }

        return report;
    }

    @Transactional(rollbackOn = ApiException.class)
    public List<BrandForm> getAllBrands() throws ApiException {
        List<BrandForm> report = new ArrayList<>();

        List<BrandPojo> allBrands = brandService.getAll();
        for(BrandPojo p : allBrands) {
            BrandForm form = new BrandForm();
            form.setCategory(p.getCategory());
            form.setName(p.getName());
            report.add(form);
        }
        return report;
    }


    @Transactional(rollbackOn = ApiException.class)
    public List<SalesReportData> getSales(SalesReportForm form) throws ApiException {
        List<SalesReportData> report = new ArrayList<>();

        if(form.getStartDate() == null) {
            Date begin = new Date();
            begin.setTime(1000);
            form.setStartDate(begin);
        }
        if(form.getEndDate() == null) {
            Calendar c1 = Calendar.getInstance();
            c1.set(Calendar.MONTH, 12);
            c1.set(Calendar.DATE, 31);
            c1.set(Calendar.YEAR, 2199);
            Date end = c1.getTime();
            form.setEndDate(end);
        }

        form.setStartDate(getStartOfDay(form.getStartDate(),Calendar.getInstance()));
        form.setEndDate(getEndOfDay(form.getEndDate(),Calendar.getInstance()));
        System.out.println(form.getStartDate());
        System.out.println(form.getEndDate());

        String brand = form.getBrand();
        String category = form.getCategory();

        List<SalesReportUtil> allItems = new ArrayList<>();

        List<OrderPojo> orders = orderService.getAllInTimeDuration(form.getStartDate(), form.getEndDate());
        for(OrderPojo p : orders) {
            int id = p.getId();
            List<OrderItemPojo> items = orderItemService.getAllByOrderId(id);
            for(OrderItemPojo item : items) {
                int productId = item.getProductId();
                int quantity = item.getQuantity();
                double price = item.getSellingPrice();
                int brandId = productService.get(productId).getBrandId();


                SalesReportUtil curr = new SalesReportUtil();
                curr.setBrandId(brandId);
                curr.setQuantity(quantity);
                curr.setRevenue(quantity*price);

                allItems.add(curr);
            }
        }

        List<BrandPojo> allBrands = brandService.getByNameCategory(brand, category);

        Map<Integer, Integer> brandIdToQuantity = new HashMap<>();
        Map<Integer, Double> brandIdToRevenue = new HashMap<>();

        for(BrandPojo p : allBrands) {
            brandIdToQuantity.put(p.getId(), 0);
            brandIdToRevenue.put(p.getId(), Double.valueOf("0"));
        }

        for(SalesReportUtil item : allItems) {
            int brandId = item.getBrandId();
            int quantity = item.getQuantity();
            Double revenue = item.getRevenue();

            if(brandIdToQuantity.containsKey(brandId)) {
                int prevQuantity = brandIdToQuantity.get(brandId);
                double prevRevenue = brandIdToRevenue.get(brandId);

                brandIdToQuantity.put(brandId,prevQuantity+quantity);
                brandIdToRevenue.put(brandId,prevRevenue+revenue);
            }
        }

        for(BrandPojo p : allBrands) {
            SalesReportData data = new SalesReportData();
            data.setBrand(p.getName());
            data.setCategory(p.getCategory());
            int quantity = brandIdToQuantity.get(p.getId());
            double revenue = brandIdToRevenue.get(p.getId());
            data.setQuantity(quantity);
            data.setRevenue(revenue);

            report.add(data);
        }

        return report;

    }

    public static Date getStartOfDay(Date day,Calendar cal) {
        if (day == null) day = new Date();
        cal.setTime(day);
        cal.set(Calendar.HOUR_OF_DAY, cal.getMinimum(Calendar.HOUR_OF_DAY));
        cal.set(Calendar.MINUTE,      cal.getMinimum(Calendar.MINUTE));
        cal.set(Calendar.SECOND,      cal.getMinimum(Calendar.SECOND));
        cal.set(Calendar.MILLISECOND, cal.getMinimum(Calendar.MILLISECOND));
        return cal.getTime();
    }

    public static Date getEndOfDay(Date day,Calendar cal) {
        if (day == null) day = new Date();
        cal.setTime(day);
        cal.set(Calendar.HOUR_OF_DAY, cal.getMaximum(Calendar.HOUR_OF_DAY));
        cal.set(Calendar.MINUTE,      cal.getMaximum(Calendar.MINUTE));
        cal.set(Calendar.SECOND,      cal.getMaximum(Calendar.SECOND));
        cal.set(Calendar.MILLISECOND, cal.getMaximum(Calendar.MILLISECOND));
        return cal.getTime();
    }


}
