package com.clv.jasperReport.services;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

@Service
public class JasperReportCompile {

    public enum ExportType {
        PDF,
        EXCEL
    }

    private static final String REPORT_FOLDER = "src/main/resources/reports/";

    @Autowired
    private DataSource dataSource;

    // public byte[] exportToPDF(String fileName, Map<String, Object> parameters)
    // throws FileNotFoundException, JRException, SQLException {

    // JasperReport compileReport = JasperCompileManager
    // .compileReport(new FileInputStream(REPORT_FOLDER + fileName + ".jrxml"));
    // JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport,
    // parameters, dataSource.getConnection());
    // return JasperExportManager.exportReportToPdf(jasperPrint);
    // }

    public void exportToExcel(HttpServletResponse response, String fileName, Map<String, Object> parameters)
            throws JRException, IOException, SQLException {
        JasperReport compileReport = JasperCompileManager
                .compileReport(new FileInputStream(REPORT_FOLDER + fileName + ".jrxml"));
        JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, parameters, dataSource.getConnection());

        ServletOutputStream streamDeSaida = response.getOutputStream();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachments; filename=\"employeeReport.xlsx\"");

        JRXlsxExporter exporter = new JRXlsxExporter();
        SimpleXlsxReportConfiguration reportConfigXLS = new SimpleXlsxReportConfiguration();
        reportConfigXLS.setSheetNames(new String[] { "Employee Data" });
        exporter.setConfiguration(reportConfigXLS);
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(streamDeSaida));
        exporter.exportReport();
    }

    public void exportToPDF(HttpServletResponse response, String fileName, Map<String, Object> parameters)
            throws JRException, SQLException, IOException {
                JasperReport compileReport = JasperCompileManager
                .compileReport(new FileInputStream(REPORT_FOLDER + fileName + ".jrxml"));
        JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, parameters, dataSource.getConnection());

        ServletOutputStream streamDeSaida = response.getOutputStream();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachments; filename=\"employeeReport.pdf\"");

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(streamDeSaida));

        SimplePdfReportConfiguration reportConfig = new SimplePdfReportConfiguration();
        reportConfig.setSizePageToContent(true);
        reportConfig.setForceLineBreakPolicy(false);

        SimplePdfExporterConfiguration exportConfig = new SimplePdfExporterConfiguration();
        exportConfig.setMetadataAuthor("CLV");
        exportConfig.setEncrypted(true);
        exportConfig.setAllowedPermissionsHint("PRINTING");

        exporter.setConfiguration(reportConfig);
        exporter.setConfiguration(exportConfig);
     
        exporter.exportReport();
    }
}
