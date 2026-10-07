import { useEffect, useState } from "react";
import API from "../services/api";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    registrationNumber: "",
    brand: "",
    model: "",
    manufactureYear: "",
    mileage: "",
  });

  // ===============================
  // GET ALL VEHICLES
  // ===============================
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/vehicles");

      setVehicles(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load vehicles. Check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ===============================
  // FORM INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ===============================
  // ADD / UPDATE VEHICLE
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vehicleData = {
        customerId: Number(formData.customerId),
        registrationNumber: formData.registrationNumber,
        brand: formData.brand,
        model: formData.model,
        manufactureYear: formData.manufactureYear
          ? Number(formData.manufactureYear)
          : null,
        mileage: formData.mileage
          ? Number(formData.mileage)
          : null,
      };

      if (editingId) {
        await API.put(`/vehicles/${editingId}`, vehicleData);
        alert("Vehicle updated successfully!");
      } else {
        await API.post("/vehicles", vehicleData);
        alert("Vehicle added successfully!");
      }

      resetForm();
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Failed to save vehicle.");
    }
  };

  // ===============================
  // EDIT
  // ===============================
  const handleEdit = (vehicle) => {
    setEditingId(vehicle.vehicleId);

    setFormData({
      customerId: vehicle.customerId ?? "",
      registrationNumber: vehicle.registrationNumber ?? "",
      brand: vehicle.brand ?? "",
      model: vehicle.model ?? "",
      manufactureYear: vehicle.manufactureYear ?? "",
      mileage: vehicle.mileage ?? "",
    });

    setShowForm(true);
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/vehicles/${id}`);

      alert("Vehicle deleted successfully!");

      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Failed to delete vehicle.");
    }
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setFormData({
      customerId: "",
      registrationNumber: "",
      brand: "",
      model: "",
      manufactureYear: "",
      mileage: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // ===============================
  // SEARCH
  // ===============================
  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText = search.toLowerCase();

    return (
      vehicle.registrationNumber?.toLowerCase().includes(searchText) ||
      vehicle.brand?.toLowerCase().includes(searchText) ||
      vehicle.model?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="vehicles-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Vehicles</h1>
          <p>Manage all customer vehicles</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Vehicle
        </button>
      </div>

      {/* SEARCH */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by registration, brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchVehicles}>
          🔄 Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="loading">
          Loading vehicles...
        </div>
      ) : (
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Registration</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Mileage</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredVehicles.length === 0 ? (

                <tr>
                  <td colSpan="8">
                    No vehicles found.
                  </td>
                </tr>

              ) : (

                filteredVehicles.map((vehicle) => (

                  <tr key={vehicle.vehicleId}>

                    <td>{vehicle.vehicleId}</td>

                    <td>{vehicle.customerId}</td>

                    <td>
                      <strong>
                        {vehicle.registrationNumber}
                      </strong>
                    </td>

                    <td>{vehicle.brand}</td>

                    <td>{vehicle.model}</td>

                    <td>
                      {vehicle.manufactureYear || "-"}
                    </td>

                    <td>
                      {vehicle.mileage
                        ? `${vehicle.mileage} km`
                        : "-"}
                    </td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(vehicle.vehicleId)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      )}

      {/* ADD / EDIT FORM */}
      {showForm && (

        <div className="modal-overlay">

          <div className="vehicle-modal">

            <div className="modal-header">

              <h2>
                {editingId
                  ? "Edit Vehicle"
                  : "Add Vehicle"}
              </h2>

              <button onClick={resetForm}>
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>
                Customer ID
              </label>

              <input
                type="number"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
              />

              <label>
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="TN01AB1234"
                required
              />

              <label>
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Toyota"
                required
              />

              <label>
                Model
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Innova"
                required
              />

              <label>
                Manufacture Year
              </label>

              <input
                type="number"
                name="manufactureYear"
                value={formData.manufactureYear}
                onChange={handleChange}
                placeholder="2024"
              />

              <label>
                Mileage
              </label>

              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="25000"
              />

              <div className="form-actions">

                <button
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit">
                  {editingId
                    ? "Update Vehicle"
                    : "Add Vehicle"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Vehicles;