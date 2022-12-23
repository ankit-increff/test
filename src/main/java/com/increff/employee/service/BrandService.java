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
		normalize(p);
		alreadyExistingCheck(p);
		if(StringUtil.isEmpty(p.getName())) {
			throw new ApiException("name cannot be empty");
		}
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
		return getCheck(id);
	}

	//GETTING A BRAND BY NAME AND CATEGORY
	@Transactional(rollbackOn = ApiException.class)
	public BrandPojo get(String name, String category) throws ApiException {
		return getCheck(name, category);

	}

	//GET ALL BRANDS
	@Transactional
	public List<BrandPojo> getAll() {
		return dao.selectAll();
	}

	//UPDATE A BRAND
	@Transactional(rollbackOn  = ApiException.class)
	public void update(int id, BrandPojo p) throws ApiException {
		normalize(p);
		BrandPojo ex = getCheck(id);
		alreadyExistingCheck(p);
		ex.setCategory(p.getCategory());
		ex.setName(p.getName());
		dao.update(ex);
	}

	//CHECKS:------------------
	@Transactional
	public BrandPojo getCheck(int id) throws ApiException {
		BrandPojo p = dao.select(id);
		if (p == null) {
			throw new ApiException("Brand with given ID does not exit, id: " + id);
		}
		return p;
	}

	@Transactional
	public BrandPojo getCheck(String name, String category) throws ApiException {
		BrandPojo p = dao.select(name, category);
		if (p == null) {
			throw new ApiException("Brand with given name and category does not exists");
		}
		return p;
	}

	@Transactional
	public void alreadyExistingCheck(BrandPojo newPojo) throws ApiException {

		List<BrandPojo> arr = dao.selectAll();
		for(BrandPojo p: arr)
		{
			if(p.getName().equals(newPojo.getName()) && p.getCategory().equals(newPojo.getCategory()) ) {
				throw new ApiException("Brand with given name and category already exists");
			}
		}
		return;
	}

	protected static void normalize(BrandPojo p) {
		p.setName(StringUtil.toLowerCase(p.getName()));
	}
}
