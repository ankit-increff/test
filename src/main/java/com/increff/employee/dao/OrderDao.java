package com.increff.employee.dao;

import com.increff.employee.pojo.OrderPojo;
import com.increff.employee.pojo.ProductPojo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class OrderDao extends AbstractDao {

	private static String select_all = "select p from OrderPojo p";
	private static String select_id = "select p from OrderPojo p where id=:id";

	@PersistenceContext
	private EntityManager em;

	@Transactional
	public int insert(OrderPojo p) {
//		System.out.println(p.getName()+p.getId());
		em.persist(p);
		return p.getId();
	}

	public List<OrderPojo> selectAll() {
		TypedQuery<OrderPojo> query = getQuery(select_all, OrderPojo.class);
		return query.getResultList();
	}

	public OrderPojo select(int id) {
		TypedQuery<OrderPojo> query = getQuery(select_id, OrderPojo.class);
		query.setParameter("id", id);
		return getSingle(query);
	}

	public void update(OrderPojo p) {
	}



}
