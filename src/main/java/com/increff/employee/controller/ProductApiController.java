package com.increff.employee.controller;

import com.increff.employee.model.BrandData;
import com.increff.employee.model.BrandForm;
import com.increff.employee.model.ProductData;
import com.increff.employee.model.ProductForm;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.pojo.ProductPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.BrandService;
import com.increff.employee.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Api
@RestController
public class ProductApiController {

	@Autowired
	private ProductService service;
	@Autowired
	private BrandService brandService;

	@ApiOperation(value = "Adds a product")
	@RequestMapping(path = "/api/product", method = RequestMethod.POST)
	public void add(@RequestBody ProductForm form) throws ApiException {
		ProductPojo p = convert(form);
		service.add(p);
	}


	@ApiOperation(value = "Gets a product by ID")
	@RequestMapping(path = "/api/product/{id}", method = RequestMethod.GET)
	public ProductData get(@PathVariable int id) throws ApiException {
		ProductPojo p = service.get(id);
		return convert(p);
	}



	@ApiOperation(value = "Gets a product by barcode")
	@RequestMapping(path = "/api/product", params = "barcode", method = RequestMethod.GET)
	public ProductData getByBarcode(@RequestParam("barcode") String barcode) throws ApiException {
		ProductPojo p = service.get(barcode);
		return convert(p);
	}

	@ApiOperation(value = "Gets list of all products")
	@RequestMapping(path = "/api/product", method = RequestMethod.GET)
	public List<ProductData> getAll() throws ApiException {
		List<ProductPojo> list = service.getAll();
		List<ProductData> list2 = new ArrayList<ProductData>();
		for (ProductPojo p : list) {
			list2.add(convert(p));
		}
		return list2;
	}

	@ApiOperation(value = "Updates a product")
	@RequestMapping(path = "/api/product/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody ProductForm f) throws ApiException {
		ProductPojo p = convert(f);
		service.update(id, p);
	}
	

	private ProductData convert(ProductPojo p) throws ApiException {
		ProductData d = new ProductData();
		d.setName(p.getName());
		d.setId(p.getId());
		d.setBarcode(p.getBarcode());
		d.setMrp(Double.toString(p.getMrp()));

		BrandPojo brand = brandService.get(p.getBrandId());
		d.setBrand(brand.getName());
		d.setCategory(brand.getCategory());
//		System.out.println(d.getMrp());

		return d;
	}

//	@Transactional(rollbackOn = ApiException.class)
	private ProductPojo convert(ProductForm f) throws ApiException {
		ProductPojo p = new ProductPojo();
		p.setName(f.getName());
		p.setBarcode(f.getBarcode());
		p.setMrp(Double.parseDouble(f.getMrp()));
		BrandPojo bp = brandService.get(f.getBrand(), f.getCategory());

		p.setBrandId(bp.getId());
		return p;
	}

}
