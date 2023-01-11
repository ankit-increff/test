package com.increff.employee.service;

import com.increff.employee.dao.BrandDao;
import com.increff.employee.pojo.BrandPojo;
import com.increff.employee.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BrandService {

	@Autowired
	private BrandDao dao;

	//ADDING A BRAND
	@Transactional(rollbackOn = ApiException.class)
	public void add(BrandPojo p) throws ApiException {
		dao.insert(p);
	}

	//DELETING A BRAND
	@Transactional
	public void delete(int id) {
		dao.delete(id);
	}

	//GETTING A BRAND
	@Transactional(rollbackOn = ApiException.class)
	public BrandPojo get(int id) throws ApiException {
		return dao.select(id);
	}

	//GETTING A BRAND BY NAME AND CATEGORY
	@Transactional(rollbackOn = ApiException.class)
	public BrandPojo get(String name, String category) throws ApiException {
		return dao.select(name, category);

	}

	//GET ALL BRANDS
	@Transactional
	public List<BrandPojo> getAll() {
		return dao.selectAll();
	}

}
