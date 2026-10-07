USE autocare_db;

INSERT INTO customers (name,email,phone,address) VALUES
('Arun Kumar','arun@gmail.com','9876543210','Chennai'),
('Priya Sharma','priya@gmail.com','9876543211','Tambaram'),
('Karthik Raj','karthik@gmail.com','9876543212','Velachery'),
('Divya S','divya@gmail.com','9876543213','Adyar'),
('Rahul Kumar','rahul@gmail.com','9876543214','Guindy'),
('Sneha R','sneha@gmail.com','9876543215','Porur'),
('Vijay Anand','vijay@gmail.com','9876543216','Avadi'),
('Meena Krishnan','meena@gmail.com','9876543217','Anna Nagar'),
('Suresh Babu','suresh@gmail.com','9876543218','T Nagar'),
('Anitha Devi','anitha@gmail.com','9876543219','Sholinganallur'),
('Ramesh P','ramesh@gmail.com','9876543220','OMR'),
('Nandhini K','nandhini@gmail.com','9876543221','Perungudi'),
('Gokul M','gokul@gmail.com','9876543222','Chromepet'),
('Lavanya V','lavanya@gmail.com','9876543223','Pallavaram'),
('Mohan Das','mohan@gmail.com','9876543224','Medavakkam');

INSERT INTO vehicles (customer_id,registration_number,brand,model,manufacture_year,mileage) VALUES
(1,'TN01AB1234','Toyota','Innova',2020,45000),(1,'TN01AB5678','Honda','City',2021,32000),
(2,'TN02CD1234','Hyundai','Creta',2022,28000),(2,'TN02CD5678','Maruti','Swift',2019,52000),
(3,'TN03EF1234','Tata','Nexon',2021,35000),(4,'TN04GH1234','Kia','Seltos',2022,24000),
(4,'TN04GH5678','Hyundai','i20',2020,41000),(5,'TN05IJ1234','Mahindra','XUV700',2023,18000),
(6,'TN06KL1234','Honda','Amaze',2019,60000),(7,'TN07MN1234','Ford','EcoSport',2018,72000),
(8,'TN08OP1234','Toyota','Fortuner',2021,38000),(8,'TN08OP5678','Maruti','Baleno',2022,26000),
(9,'TN09QR1234','Volkswagen','Polo',2019,55000),(10,'TN10ST1234','Renault','Kwid',2020,43000),
(11,'TN11UV1234','Skoda','Slavia',2023,15000),(12,'TN12WX1234','MG','Hector',2021,33000),
(13,'TN13YZ1234','Nissan','Magnite',2022,29000),(14,'TN14AA1234','Hyundai','Verna',2020,47000),
(15,'TN15BB1234','Tata','Harrier',2021,39000),(15,'TN15BB5678','Honda','City',2018,68000);

INSERT INTO mechanics (name,specialization,phone,experience_years,status) VALUES
('Ravi Kumar','Engine Specialist','9000000001',8,'AVAILABLE'),
('Sanjay Raj','Brake Specialist','9000000002',6,'BUSY'),
('Vignesh S','Electrical Systems','9000000003',5,'AVAILABLE'),
('Prakash M','AC Specialist','9000000004',7,'AVAILABLE'),
('Ajay Kumar','Transmission Specialist','9000000005',10,'BUSY'),
('Dinesh R','General Service','9000000006',4,'AVAILABLE'),
('Manoj K','Engine Specialist','9000000007',9,'AVAILABLE'),
('Sathish B','Wheel & Suspension','9000000008',6,'AVAILABLE');

INSERT INTO service_types (service_name,description,base_cost,estimated_hours) VALUES
('Oil Change','Engine oil and oil filter replacement',1500,1),
('Brake Service','Brake inspection and replacement',3500,2.5),
('Engine Repair','Engine diagnosis and repair',10000,6),
('AC Service','Air conditioning inspection and service',2500,2),
('Full Service','Complete vehicle inspection and maintenance',6000,4),
('Wheel Alignment','Wheel alignment and balancing',1200,1),
('Battery Service','Battery inspection and replacement',1800,1),
('Transmission Service','Transmission inspection and maintenance',8000,5);

INSERT INTO parts (part_name,part_number,unit_price,stock_quantity) VALUES
('Engine Oil 5W30','EO-001',2200,50),('Engine Oil 10W40','EO-002',1800,40),
('Oil Filter','OF-001',450,75),('Air Filter','AF-001',650,60),
('Cabin Filter','CF-001',550,45),('Brake Pad Front','BP-001',2800,30),
('Brake Pad Rear','BP-002',2400,25),('Brake Disc','BD-001',3500,20),
('Brake Fluid','BF-001',700,40),('Spark Plug','SP-001',500,100),
('Ignition Coil','IC-001',1800,35),('Battery 45Ah','BAT-001',5500,20),
('Battery 60Ah','BAT-002',7000,15),('AC Gas','AC-001',1800,30),
('AC Filter','AC-002',750,40),('AC Compressor','AC-003',15000,8),
('Clutch Plate','CL-001',6500,12),('Clutch Bearing','CL-002',1800,20),
('Clutch Cover','CL-003',4500,15),('Radiator Coolant','RC-001',900,50),
('Radiator Hose','RH-001',1200,25),('Suspension Bush','SB-001',850,40),
('Shock Absorber','SA-001',4200,18),('Tie Rod End','TR-001',1600,25),
('Wheel Bearing','WB-001',2200,20),('Wiper Blade','WB-002',600,50),
('Headlight Bulb','HL-001',450,60),('Tail Light','TL-001',1200,25),
('Drive Belt','DB-001',1400,30),('Timing Belt','TB-001',3200,15);

INSERT INTO service_jobs
(vehicle_id,mechanic_id,service_type_id,job_description,start_date,completion_date,status,labor_cost,parts_cost,total_cost,priority) VALUES
(1,1,3,'Engine overheating diagnosis','2026-09-01 09:00:00','2026-09-03 17:00:00','COMPLETED',5000,8500,13500,'HIGH'),
(2,2,2,'Front brake replacement','2026-09-02 10:00:00','2026-09-02 16:00:00','COMPLETED',2000,5600,7600,'NORMAL'),
(3,3,7,'Battery inspection and replacement','2026-09-03 09:30:00','2026-09-03 12:00:00','COMPLETED',1000,5500,6500,'NORMAL'),
(4,4,4,'AC cooling issue','2026-09-04 09:00:00','2026-09-05 15:00:00','COMPLETED',2500,2550,5050,'HIGH'),
(5,5,8,'Transmission noise diagnosis','2026-09-05 08:30:00','2026-09-08 17:00:00','COMPLETED',6000,8300,14300,'HIGH'),
(6,6,1,'Regular oil change','2026-09-06 10:00:00','2026-09-06 12:00:00','COMPLETED',800,2650,3450,'NORMAL'),
(7,7,3,'Engine performance issue','2026-09-07 09:00:00',NULL,'IN_PROGRESS',4000,5000,9000,'HIGH'),
(8,8,6,'Wheel alignment','2026-09-08 11:00:00','2026-09-08 13:00:00','COMPLETED',700,1200,1900,'NORMAL'),
(9,1,5,'Complete vehicle service','2026-09-09 09:00:00','2026-09-10 17:00:00','COMPLETED',3000,4000,7000,'NORMAL'),
(10,2,2,'Rear brake service','2026-09-10 10:00:00',NULL,'IN_PROGRESS',2000,4800,6800,'HIGH'),
(11,3,7,'Battery replacement','2026-09-11 09:00:00','2026-09-11 11:00:00','COMPLETED',800,7000,7800,'NORMAL'),
(12,4,4,'AC gas refill','2026-09-12 10:00:00','2026-09-12 13:00:00','COMPLETED',1000,1800,2800,'NORMAL'),
(13,5,8,'Transmission service','2026-09-13 08:00:00',NULL,'IN_PROGRESS',5000,8000,13000,'HIGH'),
(14,6,1,'Engine oil replacement','2026-09-14 09:00:00','2026-09-14 11:00:00','COMPLETED',700,2200,2900,'NORMAL'),
(15,7,3,'Engine inspection','2026-09-15 09:00:00',NULL,'PENDING',0,0,0,'HIGH'),
(16,8,6,'Suspension alignment','2026-09-16 10:00:00','2026-09-16 14:00:00','COMPLETED',900,2450,3350,'NORMAL'),
(17,1,5,'Full vehicle maintenance','2026-09-17 09:00:00','2026-09-18 17:00:00','COMPLETED',3500,5000,8500,'NORMAL'),
(18,2,2,'Brake pad replacement','2026-09-18 10:00:00','2026-09-19 15:00:00','COMPLETED',2200,5600,7800,'HIGH'),
(19,3,7,'Battery health check','2026-09-19 09:00:00',NULL,'IN_PROGRESS',700,5500,6200,'NORMAL'),
(20,4,4,'AC compressor diagnosis','2026-09-20 09:00:00',NULL,'IN_PROGRESS',2000,15000,17000,'HIGH'),
(1,5,8,'Clutch inspection','2026-09-21 08:30:00','2026-09-23 17:00:00','COMPLETED',4500,8300,12800,'HIGH'),
(2,6,1,'Routine oil service','2026-09-22 10:00:00','2026-09-22 12:00:00','COMPLETED',800,2650,3450,'NORMAL'),
(3,7,3,'Engine vibration issue','2026-09-23 09:00:00',NULL,'IN_PROGRESS',4000,7000,11000,'HIGH'),
(4,8,6,'Wheel balancing','2026-09-24 10:00:00','2026-09-24 12:00:00','COMPLETED',600,1600,2200,'NORMAL'),
(5,1,5,'Full service package','2026-09-25 09:00:00',NULL,'IN_PROGRESS',3000,4500,7500,'NORMAL'),
(6,2,2,'Brake inspection','2026-09-26 09:00:00',NULL,'PENDING',0,0,0,'NORMAL'),
(7,3,7,'Battery replacement','2026-09-27 10:00:00','2026-09-27 13:00:00','COMPLETED',800,7000,7800,'NORMAL'),
(8,4,4,'AC maintenance','2026-09-28 09:00:00',NULL,'PENDING',0,0,0,'NORMAL'),
(9,5,8,'Transmission inspection','2026-09-29 08:00:00',NULL,'PENDING',0,0,0,'HIGH'),
(10,6,1,'Oil change','2026-09-30 10:00:00',NULL,'PENDING',0,0,0,'NORMAL');
