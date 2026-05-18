const XLSX = require('xlsx');

const data = [
  { "Student Name": "Aryan Mehta", "Email Address": "aryan.m2025@school.com", "Account Password": "Secure#Password1", "Parent Name": "Vikram Mehta" },
  { "Student Name": "Neha Gupta", "Email Address": "neha.g2025@school.com", "Account Password": "", "Parent Name": "Rakesh Gupta" },
  { "Student Name": "Kabir Das", "Email Address": "kabir.d2025@school.com", "Account Password": "DemoUser123", "Parent Name": "" },
  { "Student Name": "Pooja Singh", "Email Address": "pooja.s2025@school.com", "Account Password": "", "Parent Name": "Amit Singh" },
  { "Student Name": "Rohan Joshi", "Email Address": "rohan.j2025@school.com", "Account Password": "HelloSchool99", "Parent Name": "Priya Joshi" }
];

// Define styles or column widths to make it a "good" file
const worksheet = XLSX.utils.json_to_sheet(data);

// Adjust column widths for better readability
worksheet['!cols'] = [
  { wch: 20 }, // Student Name
  { wch: 30 }, // Email Address
  { wch: 20 }, // Account Password
  { wch: 20 }  // Parent Name
];

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

XLSX.writeFile(workbook, "Bulk_Student_Import_Template.xlsx");
console.log("Excel file created successfully!");
