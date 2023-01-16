package com.increff.employee.service;

import com.increff.employee.dao.DailySalesDao;
import com.increff.employee.dao.EmployeeDao;
import com.increff.employee.pojo.DailySalesPojo;
import com.increff.employee.pojo.EmployeePojo;
import com.increff.employee.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class DailySalesService {

	@Autowired
	private DailySalesDao dao;

	@Transactional
	public List<DailySalesPojo> getAll() {
		return dao.selectAll();
	}

	@Transactional
	public void add(DailySalesPojo p) {
		dao.insert(p);
	}


}
