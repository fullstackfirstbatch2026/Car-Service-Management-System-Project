USE autocare_db;
DROP FUNCTION IF EXISTS calculate_service_cost;
DELIMITER //
CREATE FUNCTION calculate_service_cost(p_job_id BIGINT)
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
 DECLARE v_labor DECIMAL(10,2); DECLARE v_parts DECIMAL(10,2);
 SELECT labor_cost,parts_cost INTO v_labor,v_parts FROM service_jobs WHERE job_id=p_job_id;
 RETURN COALESCE(v_labor,0)+COALESCE(v_parts,0);
END //
DELIMITER ;
