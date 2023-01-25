package com.increff.employee.util;

import com.increff.employee.model.LoginForm;
import com.increff.employee.model.SignupForm;
import com.increff.employee.model.UserForm;
import com.increff.employee.pojo.UserPojo;

public class SignupUtil {

    public static UserPojo convert(SignupForm f, String role) {
        UserPojo p = new UserPojo();
        p.setEmail(f.getEmail());
        p.setRole(role);
        p.setPassword(f.getPassword());
        return p;
    }
}
