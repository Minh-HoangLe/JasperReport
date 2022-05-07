package com.clv.jasperReport.controllers;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.clv.jasperReport.exception.EmployeeNotFoundException;
import com.clv.jasperReport.models.Employee;
import com.clv.jasperReport.services.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;

@RestController
@RequestMapping("/employee/")
@Slf4j
public class EmployeeController {
    
    @Autowired
    private EmployeeService service;

    @GetMapping("getAll")
    public ResponseEntity<List<Employee>> searchAllEmployee() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportToPDF() throws FileNotFoundException, JRException {
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(service.getAllEmployees(),false);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title","Test Title");
        JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/reports/employeeReport.jrxml"));
        // JRSaver.saveObject(compileReport, "src/main/resources/reports/employeeReport.jasper");
        JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, parameters, dataSource);
        byte[] data = JasperExportManager.exportReportToPdf(jasperPrint);

		log.info("exportToPDF : {}",data);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=employeesReport.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);

    }

    // @GetMapping("/html")
    // public ResponseEntity<byte[]> exportToHTML() throws FileNotFoundException, JRException {
    //     JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(service.getAllEmployees(),false);
    //     Map<String, Object> parameters = new HashMap<>();
    //     parameters.put("title","Test Title");
    //     JasperReport compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/reports/employeeReport.jrxml"));
    //     // JRSaver.saveObject(compileReport, "src/main/resources/reports/employeeReport.jasper");
    //     JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, parameters, dataSource);
    //     byte[] data = JasperExportManager.exportReportToHtmlFile(jasperPrint,);

	// 	log.info("exportToPDF : {}",data);

	// 	HttpHeaders headers = new HttpHeaders();
	// 	headers.add("Content-Disposition", "inline; filename=employeesReport.pdf");

	// 	return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);

    // }

    @ExceptionHandler(EmployeeNotFoundException.class)
	public ResponseEntity<String> handleEmployeeNotFoundException() {
		return ResponseEntity.ok("Employee Not Found");
	}

}
