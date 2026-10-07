USE autocare_db;
SELECT sj.job_id,c.name customer_name,c.phone customer_phone,v.registration_number,v.brand,v.model,
m.name mechanic_name,m.specialization,st.service_name,sj.status,sj.priority,sj.total_cost
FROM service_jobs sj
JOIN vehicles v ON sj.vehicle_id=v.vehicle_id
JOIN customers c ON v.customer_id=c.customer_id
JOIN mechanics m ON sj.mechanic_id=m.mechanic_id
JOIN service_types st ON sj.service_type_id=st.service_type_id
ORDER BY sj.job_id;
