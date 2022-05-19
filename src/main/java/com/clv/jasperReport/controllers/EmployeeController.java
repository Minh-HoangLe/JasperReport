package com.clv.jasperReport.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.clv.jasperReport.exception.EmployeeNotFoundException;
import com.clv.jasperReport.models.Employee;
import com.clv.jasperReport.services.EmployeeService;
import com.clv.jasperReport.services.JasperReportCompile;
import com.clv.jasperReport.services.JasperReportCompile.ExportType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/employee/")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @Autowired
    private JasperReportCompile compile;

    @GetMapping("getAll")
    public ResponseEntity<List<Employee>> searchAllEmployee() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    // @GetMapping("/pdf")
    // public ResponseEntity<byte[]> exportToPDF() throws FileNotFoundException,
    // JRException {
    // JRBeanCollectionDataSource dataSource = new
    // JRBeanCollectionDataSource(service.getAllEmployees(), false);
    // Map<String, Object> parameters = new HashMap<>();
    // parameters.put("title", "Test Title");
    // JasperReport compileReport = JasperCompileManager
    // .compileReport(new
    // FileInputStream("src/main/resources/reports/employeeReport.jrxml"));
    // JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport,
    // parameters, dataSource);
    // byte[] data = JasperExportManager.exportReportToPdf(jasperPrint);

    // return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(data);

    // }

    @GetMapping("/export")
    public void exportToXLS(HttpServletResponse response, @RequestParam String fileName, @RequestParam ExportType type)
            throws JRException, IOException, SQLException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", "Test Title");
        switch (type) {
            case EXCEL:
                compile.exportToExcel(response, fileName, parameters);
                break;
            case PDF:
                compile.exportToPDF(response, fileName, parameters);
                break;

            default:
                break;
        }

    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFoundException() {
        return ResponseEntity.ok("Employee Not Found");
    }

}
