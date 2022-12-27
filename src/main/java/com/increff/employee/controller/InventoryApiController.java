package com.increff.employee.controller;

import com.increff.employee.model.InventoryData;
import com.increff.employee.model.InventoryForm;
import com.increff.employee.model.ProductData;
import com.increff.employee.model.ProductForm;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.pojo.InventoryPojo;
import com.increff.employee.pojo.ProductPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.BrandService;
import com.increff.employee.service.InventoryService;
import com.increff.employee.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api
@RestController
public class InventoryApiController {

	@Autowired
	private InventoryService service;
	@Autowired
	private ProductService productService;

	@ApiOperation(value = "Adds an inventory")
	@RequestMapping(path = "/api/inventory", method = RequestMethod.POST)
	public void add(@RequestBody InventoryForm form) throws ApiException {
		InventoryPojo p = convert(form);
		service.add(p);
	}

	@ApiOperation(value = "Gets an inventory by ID")
	@RequestMapping(path = "/api/inventory/{barcode}", method = RequestMethod.GET)
	public InventoryData get(@PathVariable String barcode) throws ApiException {
		ProductPojo productPojo = productService.get(barcode);
		InventoryPojo p = service.get(productPojo.getId());
		return convert(p);
	}

	@ApiOperation(value = "Gets list of all inventories")
	@RequestMapping(path = "/api/inventory", method = RequestMethod.GET)
	public List<InventoryData> getAll() throws ApiException {
		List<InventoryPojo> list = service.getAll();
		List<InventoryData> list2 = new ArrayList<InventoryData>();
		for (InventoryPojo p : list) {
			list2.add(convert(p));
		}
		return list2;
	}

	@ApiOperation(value = "Updates an inventory")
	@RequestMapping(path = "/api/inventory/{barcode}", method = RequestMethod.PUT)
	public void update(@PathVariable String barcode, @RequestBody InventoryForm f) throws ApiException {
		InventoryPojo p = convert(f);
		service.update(p.getId(), p);
	}
	

	private InventoryData convert(InventoryPojo p) throws ApiException {
		InventoryData d = new InventoryData();
		d.setQuantity(Integer.toString(p.getQuantity()));
		ProductPojo productPojo = productService.get(p.getId());
		d.setBarcode(productPojo.getBarcode());
		d.setName(productPojo.getName());

		return d;
	}

//	@Transactional(rollbackOn = ApiException.class)
	private InventoryPojo convert(InventoryForm f) throws ApiException {
		InventoryPojo p = new InventoryPojo();
		p.setQuantity(Integer.parseInt(f.getQuantity()));

		ProductPojo productPojo = productService.get(f.getBarcode());
		if(productPojo==null) {
			throw new ApiException("Entered barcode doesn't exists!");
		}
		p.setId(productPojo.getId());

		return p;
	}

}
