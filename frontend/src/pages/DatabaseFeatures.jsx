import { useState } from "react";

const API = "http://localhost:8080/api";

function DatabaseFeatures() {
  const [jobId, setJobId] = useState("");
  const [serviceCost, setServiceCost] = useState(null);

  const [historyVehicleId, setHistoryVehicleId] = useState("");
  const [history, setHistory] = useState([]);

  const [jobReport, setJobReport] = useState([]);
  const [mechanicReport, setMechanicReport] = useState([]);

  const [loading, setLoading] = useState(false);

  // =====================================================
  // SERVICE COST CALCULATOR
  // MySQL Function REST API
  // =====================================================

  const calculateServiceCost = async () => {
    if (!jobId) {
      alert("Enter a Service Job ID.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/reports/service-cost/${jobId}`
      );

      if (!response.ok) {
        throw new Error("Failed to calculate service cost");
      }

      const data = await response.json();

      setServiceCost(data);
    } catch (error) {
      console.error(error);
      alert("Unable to calculate service cost.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VEHICLE SERVICE HISTORY
  // Stored Procedure REST API
  // =====================================================

  const loadServiceHistory = async () => {
    if (!historyVehicleId) {
      alert("Enter Vehicle ID.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/service-jobs/history/${historyVehicleId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load history");
      }

      const data = await response.json();

      setHistory(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load service history.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SERVICE JOB REPORT
  // JOIN REST API
  // =====================================================

  const loadJobReport = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/reports/service-jobs`
      );

      if (!response.ok) {
        throw new Error("Failed to load report");
      }

      const data = await response.json();

      setJobReport(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load service job report.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // MECHANIC PERFORMANCE
  // SUBQUERY REST API
  // =====================================================

  const loadMechanicReport = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/reports/mechanic-performance`
      );

      if (!response.ok) {
        throw new Error("Failed to load mechanic report");
      }

      const data = await response.json();

      setMechanicReport(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load mechanic performance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="database-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="database-header">
        <h1>AutoCarePro Reports & Analytics</h1>

        <p>
          Database-driven reports and service operations
        </p>
      </div>

      {/* =================================================
          SERVICE COST
      ================================================= */}

      <div className="feature-card">

        <div className="feature-title">
          <div>
            <h2>Service Cost Calculator</h2>

            <p>
              Calculate the total service cost for a service job.
            </p>
          </div>

          <span className="feature-badge">
            Cost Analysis
          </span>
        </div>

        <div className="feature-form">

          <input
            type="number"
            placeholder="Enter Service Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={calculateServiceCost}
          >
            Calculate Cost
          </button>

        </div>

        {serviceCost && (
          <div className="result-box">

            <h3>Service Cost Result</h3>

            <p>
              Service Job:
              <strong> #{serviceCost.jobId}</strong>
            </p>

            <p>
              Calculated Cost:
              <strong>
                ₹{serviceCost.calculatedServiceCost}
              </strong>
            </p>

          </div>
        )}

      </div>

      {/* =================================================
          VEHICLE SERVICE HISTORY
      ================================================= */}

      <div className="feature-card">

        <div className="feature-title">

          <div>
            <h2>Vehicle Service History</h2>

            <p>
              View the complete service history of a vehicle.
            </p>
          </div>

          <span className="feature-badge">
            Service History
          </span>

        </div>

        <div className="feature-form">

          <input
            type="number"
            placeholder="Enter Vehicle ID"
            value={historyVehicleId}
            onChange={(e) =>
              setHistoryVehicleId(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={loadServiceHistory}
          >
            View History
          </button>

        </div>

        {/* SERVICE HISTORY RESULT */}

        {history.length > 0 && (

          <div className="report-result">

            <div className="report-result-header">

              <h3>Vehicle Service History</h3>

              <button
                className="close-report-btn"
                onClick={() => setHistory([])}
              >
                ✕ Close
              </button>

            </div>

            <div className="report-table">

              <table>

                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Registration</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>

                  {history.map((row, index) => (

                    <tr key={index}>

                      <td>{row[0]}</td>

                      <td>{row[1]}</td>

                      <td>{row[2] || "-"}</td>

                      <td>{row[3]}</td>

                      <td>{row[4]}</td>

                      <td>{row[7]}</td>

                      <td>{row[8]}</td>

                      <td>₹{row[11]}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

      {/* =================================================
          SERVICE JOB REPORT
      ================================================= */}

      <div className="feature-card">

        <div className="feature-title">

          <div>

            <h2>Service Job Overview</h2>

            <p>
              View customer, vehicle, mechanic and service
              information together.
            </p>

          </div>

          <span className="feature-badge">
            Service Overview
          </span>

        </div>

        <button
          className="primary-btn"
          onClick={loadJobReport}
        >
          Load Service Report
        </button>

        {jobReport.length > 0 && (

          <div className="report-table">

            <table>

              <thead>

                <tr>
                  <th>Job</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Brand</th>
                  <th>Mechanic</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Total</th>
                </tr>

              </thead>

              <tbody>

                {jobReport.map((row, index) => (

                  <tr key={index}>

                    <td>{row[0]}</td>

                    <td>{row[1]}</td>

                    <td>{row[2]}</td>

                    <td>{row[3]}</td>

                    <td>{row[4]}</td>

                    <td>{row[6]}</td>

                    <td>{row[8]}</td>

                    <td>{row[9]}</td>

                    <td>{row[10]}</td>

                    <td>₹{row[11]}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          MECHANIC PERFORMANCE
      ================================================= */}

      <div className="feature-card">

        <div className="feature-title">

          <div>

            <h2>Mechanic Performance</h2>

            <p>
              Identify mechanics handling above-average
              numbers of service jobs.
            </p>

          </div>

          <span className="feature-badge">
            Performance
          </span>

        </div>

        <button
          className="primary-btn"
          onClick={loadMechanicReport}
        >
          Analyze Performance
        </button>

        {mechanicReport.length > 0 && (

          <div className="report-table">

            <table>

              <thead>

                <tr>
                  <th>Mechanic ID</th>
                  <th>Mechanic Name</th>
                  <th>Total Jobs</th>
                </tr>

              </thead>

              <tbody>

                {mechanicReport.map((row, index) => (

                  <tr key={index}>

                    <td>{row[0]}</td>

                    <td>{row[1]}</td>

                    <td>{row[2]}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="loading-message">
          Loading report...
        </div>
      )}

    </div>
  );
}

export default DatabaseFeatures;