package com.increff.employee.dto;

import com.increff.employee.model.InventoryData;
import com.increff.employee.model.InventoryForm;
import com.increff.employee.model.InventoryReportData;
import com.increff.employee.model.OrderForm;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.pojo.InventoryPojo;
import com.increff.employee.pojo.ProductPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.BrandService;
import com.increff.employee.service.InventoryService;
import com.increff.employee.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class InventoryReportDto {

    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private BrandService brandService;
    @Autowired
    private ProductService productService;


    @Transactional(rollbackOn = ApiException.class)
    public List<InventoryReportData> getAll() throws ApiException {
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


}
