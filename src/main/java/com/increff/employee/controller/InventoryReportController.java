package com.increff.employee.controller;

import com.increff.employee.dto.InventoryDto;
import com.increff.employee.dto.InventoryReportDto;
import com.increff.employee.model.InventoryData;
import com.increff.employee.model.InventoryForm;
import com.increff.employee.model.InventoryReportData;
import com.increff.employee.service.ApiException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@RestController
public class InventoryReportController {

	@Autowired
	private InventoryReportDto dto;


	@ApiOperation(value = "Gets list of all inventories")
	@RequestMapping(path = "/api/reports/inventory", method = RequestMethod.GET)
	public List<InventoryReportData> getAll() throws ApiException {
		return dto.getAll();
	}


}
