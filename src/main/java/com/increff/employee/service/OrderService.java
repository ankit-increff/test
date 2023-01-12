package com.increff.employee.service;

import com.increff.employee.dao.BrandDao;
import com.increff.employee.dao.OrderDao;
import com.increff.employee.dao.OrderItemDao;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.pojo.OrderItemPojo;
import com.increff.employee.pojo.OrderPojo;
import com.increff.employee.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

	@Autowired
	private OrderDao orderDao;

	//ADDING AN ORDER
	@Transactional(rollbackOn = ApiException.class)
	public int add(OrderPojo p) throws ApiException {
		return orderDao.insert(p);
	}

	//GET ALL ORDERS
	@Transactional
	public List<OrderPojo> getAll() {
		return orderDao.selectAll();
	}

	//GET AN ORDER BY ORDERID
	@Transactional
	public OrderPojo get(int orderId) {
		return orderDao.select(orderId);
	}

	@Transactional
	public List<OrderPojo> getAllInTimeDuration(Date start, Date end) {
		return orderDao.selectAllInTimeDuration(start, end);
	}

}
