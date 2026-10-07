USE autocare_db;

CREATE TABLE IF NOT EXISTS customers (
 customer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(120) UNIQUE,
 phone VARCHAR(20),
 address VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS vehicles (
 vehicle_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 customer_id BIGINT NOT NULL,
 registration_number VARCHAR(30) UNIQUE NOT NULL,
 brand VARCHAR(60) NOT NULL,
 model VARCHAR(60) NOT NULL,
 manufacture_year INT,
 mileage INT DEFAULT 0,
 FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS mechanics (
 mechanic_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 specialization VARCHAR(100),
 phone VARCHAR(20),
 experience_years INT DEFAULT 0,
 status VARCHAR(20) DEFAULT 'AVAILABLE'
);

CREATE TABLE IF NOT EXISTS service_types (
 service_type_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 service_name VARCHAR(100) NOT NULL,
 description VARCHAR(255),
 base_cost DECIMAL(10,2) NOT NULL,
 estimated_hours DECIMAL(5,2)
);

CREATE TABLE IF NOT EXISTS parts (
 part_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 part_name VARCHAR(120) NOT NULL,
 part_number VARCHAR(50) UNIQUE,
 unit_price DECIMAL(10,2) NOT NULL,
 stock_quantity INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS service_jobs (
 job_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 vehicle_id BIGINT NOT NULL,
 mechanic_id BIGINT NOT NULL,
 service_type_id BIGINT NOT NULL,
 job_description VARCHAR(500),
 start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
 completion_date DATETIME NULL,
 status VARCHAR(30) DEFAULT 'PENDING',
 labor_cost DECIMAL(10,2) DEFAULT 0,
 parts_cost DECIMAL(10,2) DEFAULT 0,
 total_cost DECIMAL(10,2) DEFAULT 0,
 priority VARCHAR(20) DEFAULT 'NORMAL',
 FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
 FOREIGN KEY (mechanic_id) REFERENCES mechanics(mechanic_id),
 FOREIGN KEY (service_type_id) REFERENCES service_types(service_type_id)
);

CREATE TABLE IF NOT EXISTS service_parts (
 service_part_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 job_id BIGINT NOT NULL,
 part_id BIGINT NOT NULL,
 quantity INT NOT NULL,
 unit_price DECIMAL(10,2) NOT NULL,
 subtotal DECIMAL(10,2) NOT NULL,
 FOREIGN KEY (job_id) REFERENCES service_jobs(job_id),
 FOREIGN KEY (part_id) REFERENCES parts(part_id)
);

CREATE TABLE IF NOT EXISTS payments (
 payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 job_id BIGINT NOT NULL,
 amount DECIMAL(10,2) NOT NULL,
 payment_method VARCHAR(30),
 payment_status VARCHAR(30) DEFAULT 'PENDING',
 payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (job_id) REFERENCES service_jobs(job_id)
);

CREATE TABLE IF NOT EXISTS users (
 user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 username VARCHAR(80) UNIQUE NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 role VARCHAR(30) NOT NULL DEFAULT 'CUSTOMER'
);

CREATE TABLE IF NOT EXISTS audit_logs (
 audit_id BIGINT PRIMARY KEY AUTO_INCREMENT,
 job_id BIGINT NOT NULL,
 action VARCHAR(50) NOT NULL,
 old_status VARCHAR(30),
 new_status VARCHAR(30),
 changed_by VARCHAR(100),
 changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (job_id) REFERENCES service_jobs(job_id)
);
