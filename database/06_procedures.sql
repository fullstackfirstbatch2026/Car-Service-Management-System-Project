USE autocare_db;
DROP PROCEDURE IF EXISTS create_service_job;
DELIMITER //
CREATE PROCEDURE create_service_job(
 IN p_vehicle_id BIGINT, IN p_mechanic_id BIGINT, IN p_service_type_id BIGINT,
 IN p_description VARCHAR(500), IN p_priority VARCHAR(20))
BEGIN
 DECLARE vehicle_count INT; DECLARE mechanic_count INT; DECLARE service_count INT;
 SELECT COUNT(*) INTO vehicle_count FROM vehicles WHERE vehicle_id=p_vehicle_id;
 SELECT COUNT(*) INTO mechanic_count FROM mechanics WHERE mechanic_id=p_mechanic_id;
 SELECT COUNT(*) INTO service_count FROM service_types WHERE service_type_id=p_service_type_id;
 IF vehicle_count=0 THEN
   SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Vehicle does not exist';
 ELSEIF mechanic_count=0 THEN
   SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Mechanic does not exist';
 ELSEIF service_count=0 THEN
   SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Service type does not exist';
 ELSE
   INSERT INTO service_jobs(vehicle_id,mechanic_id,service_type_id,job_description,status,priority)
   VALUES(p_vehicle_id,p_mechanic_id,p_service_type_id,p_description,'PENDING',p_priority);
 END IF;
END //
DELIMITER ;
