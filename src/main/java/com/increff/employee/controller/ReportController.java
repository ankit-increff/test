package com.increff.employee.controller;

import com.increff.employee.dto.ReportDto;
import com.increff.employee.model.*;
import com.increff.employee.service.ApiException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@RestController
public class ReportController {

	@Autowired
	private ReportDto dto;


	@ApiOperation(value = "Gets list of all inventories")
	@RequestMapping(path = "/api/reports/inventory", method = RequestMethod.GET)
	public List<InventoryReportData> getAllinventory() throws ApiException {
		return dto.getAllInventories();
	}

	@ApiOperation(value = "Gets list of all brand-categories")
	@RequestMapping(path = "/api/reports/brand-category", method = RequestMethod.GET)
	public List<BrandForm> getAllBrands() throws ApiException {
		return dto.getAllBrands();
	}

	@ApiOperation(value = "Gets list of all sales")
	@RequestMapping(path = "/api/reports/sales", method = RequestMethod.POST)
	public List<SalesReportData> getSales(@RequestBody SalesReportForm form) throws ApiException {
		return dto.getSales(form);
	}

}
