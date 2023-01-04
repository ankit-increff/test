package com.increff.employee.controller;

import com.increff.employee.dto.OrderDto;
import com.increff.employee.model.*;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.service.ApiException;
import com.increff.employee.service.BrandService;
import com.increff.employee.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api
@RestController
public class OrderApiController {

	@Autowired
	private OrderDto dto;

	@ApiOperation(value = "Adds an order")
	@RequestMapping(path = "/api/order", method = RequestMethod.POST)
	public void add(@RequestBody List<OrderForm> forms) throws ApiException {
		dto.add(forms);
	}

	@ApiOperation(value = "Gets list of all orders")
	@RequestMapping(path = "/api/order", method = RequestMethod.GET)
	public List<OrderData> getAll() throws ApiException {
		return dto.getAll();
	}

	@ApiOperation(value = "Gets list of all items")
	@RequestMapping(path = "/api/order/{id}", method = RequestMethod.GET)
	public List<OrderItemData> getAllItems(@PathVariable int id) throws ApiException{
		return dto.getAllItems(id);
	}

	@ApiOperation(value = "Updates an order")
	@RequestMapping(path = "/api/order/{id}", method = RequestMethod.PUT)
	public void getAllItems(@PathVariable int id, @RequestBody List<OrderForm> forms) throws ApiException{
		dto.update(id, forms);
	}
}
