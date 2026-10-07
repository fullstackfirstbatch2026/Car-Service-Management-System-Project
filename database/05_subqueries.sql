USE autocare_db;
SELECT m.mechanic_id,m.name,COUNT(sj.job_id) total_jobs
FROM mechanics m JOIN service_jobs sj ON m.mechanic_id=sj.mechanic_id
GROUP BY m.mechanic_id,m.name
HAVING COUNT(sj.job_id) > (
  SELECT AVG(job_count) FROM (
    SELECT COUNT(*) job_count FROM service_jobs GROUP BY mechanic_id
  ) mechanic_jobs
)
ORDER BY total_jobs DESC;
