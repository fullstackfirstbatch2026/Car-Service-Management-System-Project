USE autocare_db;
DROP TRIGGER IF EXISTS service_status_audit;
DELIMITER //
CREATE TRIGGER service_status_audit AFTER UPDATE ON service_jobs
FOR EACH ROW
BEGIN
 IF OLD.status<>NEW.status THEN
   INSERT INTO audit_logs(job_id,action,old_status,new_status,changed_by)
   VALUES(NEW.job_id,'STATUS_CHANGE',OLD.status,NEW.status,'SYSTEM');
 END IF;
END //
DELIMITER ;
