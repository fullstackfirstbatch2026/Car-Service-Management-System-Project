USE autocare_db;
SELECT COUNT(*) customers FROM customers;
SELECT COUNT(*) vehicles FROM vehicles;
SELECT COUNT(*) mechanics FROM mechanics;
SELECT COUNT(*) service_types FROM service_types;
SELECT COUNT(*) parts FROM parts;
SELECT COUNT(*) service_jobs FROM service_jobs;

SELECT job_id,labor_cost,parts_cost,total_cost,calculate_service_cost(job_id) calculated_cost
FROM service_jobs;

-- Valid procedure test:
-- CALL create_service_job(11,7,3,'Engine vibration and performance check','HIGH');

-- Invalid procedure test (expected: Vehicle does not exist):
-- CALL create_service_job(999,7,3,'Test invalid vehicle','HIGH');

-- Trigger test:
-- UPDATE service_jobs SET status='IN_PROGRESS' WHERE job_id=1;
-- SELECT * FROM audit_logs ORDER BY audit_id DESC;
