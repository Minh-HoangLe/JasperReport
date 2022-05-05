package com.clv.jasperReport.mappers;

import java.util.List;

import com.clv.jasperReport.models.Employee;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeMapper {
    List<Employee> selectAllEmployees();
}
