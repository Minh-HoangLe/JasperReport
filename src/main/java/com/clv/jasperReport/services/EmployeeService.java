package com.clv.jasperReport.services;

import java.util.List;

import com.clv.jasperReport.mappers.EmployeeMapper;
import com.clv.jasperReport.models.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeMapper mapper;

    public List<Employee> getAllEmployees() {
        return mapper.selectAllEmployees();
    }
}
