import { useEffect, useState } from "react";
import "./App.css";
import DatabaseFeatures from "./pages/DatabaseFeatures";
const API = "http://localhost:8080/api";

/* =========================================================
   EMPTY FORMS
========================================================= */

const emptyCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const emptyVehicle = {
  customerId: "",
  registrationNumber: "",
  brand: "",
  model: "",
  manufactureYear: "",
  mileage: "",
};

const emptyMechanic = {
  name: "",
  phone: "",
  specialization: "",
  experienceYears: "",
  status: "AVAILABLE",
};

const emptyServiceJob = {
  vehicleId: "",
  mechanicId: "",
  serviceTypeId: "",
  startDate: "",
  completionDate: "",
  description: "",
  priority: "MEDIUM",
  status: "PENDING",
  laborCost: "",
  partsCost: "",
  totalCost: "",
};

/* =========================================================
   CUSTOMERS PAGE
========================================================= */

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyCustomer);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/customers`);

      if (!response.ok) {
        throw new Error("Failed to load customers");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load customers. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCustomer });
    setShowForm(true);
  };

  const openEdit = (customer) => {
    setEditingId(customer.customerId);

    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });

    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `${API}/customers/${editingId}`
        : `${API}/customers`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Save failed");
      }

      alert(editingId ? "Customer updated!" : "Customer added!");

      setShowForm(false);
      setEditingId(null);
      setForm({ ...emptyCustomer });

      await loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Unable to save customer.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      const response = await fetch(`${API}/customers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Delete failed");
      }

      alert("Customer deleted!");
      await loadCustomers();
    } catch (error) {
      console.error(error);
      alert(
        "Unable to delete customer. Make sure this customer has no linked vehicles."
      );
    }
  };

  const filtered = customers.filter((customer) => {
    const text = search.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(text) ||
      customer.email?.toLowerCase().includes(text) ||
      customer.phone?.toLowerCase().includes(text) ||
      customer.address?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage AutoCarePro customers</p>
        </div>

        <button className="primary-btn" onClick={openAdd}>
          + Add Customer
        </button>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={loadCustomers}>Refresh</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6">No customers found.</td>
              </tr>
            ) : (
              filtered.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>

                  <td>
                    <button onClick={() => openEdit(customer)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => remove(customer.customerId)}
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {editingId ? "Edit Customer" : "Add Customer"}
            </h2>

            <form onSubmit={save}>
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
              />

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   VEHICLES PAGE
========================================================= */

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState(emptyVehicle);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadVehicles = async () => {
    try {
      const response = await fetch(`${API}/vehicles`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      setVehicles(await response.json());
    } catch (error) {
      console.error(error);
      alert("Unable to load vehicles.");
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await fetch(`${API}/customers`);

      if (response.ok) {
        setCustomers(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadVehicles();
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyVehicle });
    setShowForm(true);
  };

  const openEdit = (vehicle) => {
    setEditingId(vehicle.vehicleId);

    setForm({
      customerId: vehicle.customerId || "",
      registrationNumber: vehicle.registrationNumber || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      manufactureYear: vehicle.manufactureYear || "",
      mileage: vehicle.mileage || "",
    });

    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      const data = {
        customerId: Number(form.customerId),
        registrationNumber: form.registrationNumber,
        brand: form.brand,
        model: form.model,
        manufactureYear: Number(form.manufactureYear),
        mileage: Number(form.mileage),
      };

      const url = editingId
        ? `${API}/vehicles/${editingId}`
        : `${API}/vehicles`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Vehicle save failed");
      }

      alert(editingId ? "Vehicle updated!" : "Vehicle added!");

      setShowForm(false);
      setEditingId(null);

      await loadVehicles();
    } catch (error) {
      console.error(error);
      alert("Unable to save vehicle.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      const response = await fetch(`${API}/vehicles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Delete failed");
      }

      alert("Vehicle deleted!");

      await loadVehicles();
    } catch (error) {
      console.error(error);
      alert(
        "Unable to delete vehicle. It may have service jobs linked to it."
      );
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Vehicles</h1>
          <p>Manage customer vehicles</p>
        </div>

        <button className="primary-btn" onClick={openAdd}>
          + Add Vehicle
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registration</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Mileage</th>
              <th>Customer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="8">No vehicles found.</td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td>{vehicle.vehicleId}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.manufactureYear}</td>
                  <td>{vehicle.mileage}</td>
                  <td>{vehicle.customerId}</td>

                  <td>
                    <button onClick={() => openEdit(vehicle)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => remove(vehicle.vehicleId)}
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {editingId ? "Edit Vehicle" : "Add Vehicle"}
            </h2>

            <form onSubmit={save}>
              <label>Customer</label>

              <select
                name="customerId"
                value={form.customerId}
                onChange={handleChange}
                required
              >
                <option value="">Select Customer</option>

                {customers.map((customer) => (
                  <option
                    key={customer.customerId}
                    value={customer.customerId}
                  >
                    {customer.customerId} - {customer.name}
                  </option>
                ))}
              </select>

              <label>Registration Number</label>

              <input
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                required
              />

              <label>Brand</label>

              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
              />

              <label>Model</label>

              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                required
              />

              <label>Manufacture Year</label>

              <input
                type="number"
                name="manufactureYear"
                value={form.manufactureYear}
                onChange={handleChange}
                required
              />

              <label>Mileage</label>

              <input
                type="number"
                name="mileage"
                value={form.mileage}
                onChange={handleChange}
                required
              />

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MECHANICS PAGE
========================================================= */

function MechanicsPage() {
  const [mechanics, setMechanics] = useState([]);
  const [form, setForm] = useState(emptyMechanic);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const response = await fetch(`${API}/mechanics`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      setMechanics(await response.json());
    } catch (error) {
      console.error(error);
      alert("Unable to load mechanics.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyMechanic });
    setShowForm(true);
  };

  const openEdit = (mechanic) => {
    setEditingId(mechanic.mechanicId);

    setForm({
      name: mechanic.name || "",
      phone: mechanic.phone || "",
      specialization: mechanic.specialization || "",
      experienceYears: mechanic.experienceYears || "",
      status: mechanic.status || "AVAILABLE",
    });

    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: form.name,
        phone: form.phone,
        specialization: form.specialization,
        experienceYears: Number(form.experienceYears),
        status: form.status,
      };

      const url = editingId
        ? `${API}/mechanics/${editingId}`
        : `${API}/mechanics`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Mechanic save failed");
      }

      alert(editingId ? "Mechanic updated!" : "Mechanic added!");

      setShowForm(false);
      setEditingId(null);

      await load();
    } catch (error) {
      console.error(error);
      alert("Unable to save mechanic.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this mechanic?")) return;

    try {
      const response = await fetch(`${API}/mechanics/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Delete failed");
      }

      alert("Mechanic deleted!");

      await load();
    } catch (error) {
      console.error(error);
      alert(
        "Unable to delete mechanic. Check whether service jobs are linked."
      );
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Mechanics</h1>
          <p>Manage AutoCarePro mechanics</p>
        </div>

        <button className="primary-btn" onClick={openAdd}>
          + Add Mechanic
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mechanics.map((mechanic) => (
              <tr key={mechanic.mechanicId}>
                <td>{mechanic.mechanicId}</td>
                <td>{mechanic.name}</td>
                <td>{mechanic.phone}</td>
                <td>{mechanic.specialization}</td>
                <td>{mechanic.experienceYears}</td>
                <td>{mechanic.status}</td>

                <td>
                  <button onClick={() => openEdit(mechanic)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => remove(mechanic.mechanicId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {editingId ? "Edit Mechanic" : "Add Mechanic"}
            </h2>

            <form onSubmit={save}>
              <label>Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <label>Specialization</label>

              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
              />

              <label>Experience Years</label>

              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
              />

              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="BUSY">BUSY</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SERVICE JOBS PAGE
========================================================= */

function ServiceJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const [form, setForm] = useState(emptyServiceJob);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadJobs = async () => {
    try {
      const response = await fetch(`${API}/service-jobs`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      setJobs(await response.json());
    } catch (error) {
      console.error(error);
      alert("Unable to load service jobs.");
    }
  };

  const loadDropdownData = async () => {
    try {
      const [vehicleResponse, mechanicResponse, typeResponse] =
        await Promise.all([
          fetch(`${API}/vehicles`),
          fetch(`${API}/mechanics`),
          fetch(`${API}/service-types`),
        ]);

      if (vehicleResponse.ok) {
        setVehicles(await vehicleResponse.json());
      }

      if (mechanicResponse.ok) {
        setMechanics(await mechanicResponse.json());
      }

      if (typeResponse.ok) {
        setServiceTypes(await typeResponse.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadJobs();
    loadDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyServiceJob });
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditingId(job.jobId);

    setForm({
      vehicleId: job.vehicle?.vehicleId || "",
      mechanicId: job.mechanic?.mechanicId || "",
      serviceTypeId: job.serviceType?.serviceTypeId || "",
      startDate: job.startDate
        ? job.startDate.substring(0, 16)
        : "",
      completionDate: job.completionDate
        ? job.completionDate.substring(0, 16)
        : "",
      description: job.description || "",
      priority: job.priority || "MEDIUM",
      status: job.status || "PENDING",
      laborCost: job.laborCost ?? "",
      partsCost: job.partsCost ?? "",
      totalCost: job.totalCost ?? "",
    });

    setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();

    if (!form.vehicleId || !form.mechanicId || !form.serviceTypeId) {
      alert("Please select Vehicle, Mechanic and Service Type.");
      return;
    }

    try {
      /*
       IMPORTANT:
       ServiceJob.java uses @ManyToOne.
       Therefore the backend needs nested objects.
      */

      const data = {
        vehicle: {
          vehicleId: Number(form.vehicleId),
        },

        mechanic: {
          mechanicId: Number(form.mechanicId),
        },

        serviceType: {
          serviceTypeId: Number(form.serviceTypeId),
        },

        startDate: form.startDate
          ? form.startDate + ":00"
          : null,

        completionDate: form.completionDate
          ? form.completionDate + ":00"
          : null,

        description: form.description,

        priority: form.priority,

        status: form.status,

        laborCost:
          form.laborCost === ""
            ? null
            : Number(form.laborCost),

        partsCost:
          form.partsCost === ""
            ? null
            : Number(form.partsCost),

        totalCost:
          form.totalCost === ""
            ? null
            : Number(form.totalCost),
      };

      console.log("SERVICE JOB REQUEST:", data);

      const url = editingId
        ? `${API}/service-jobs/${editingId}`
        : `${API}/service-jobs`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("BACKEND ERROR:", text);

        alert(
          "Unable to save service job.\n\nCheck the browser Console for the backend error."
        );

        return;
      }

      alert(
        editingId
          ? "Service job updated successfully!"
          : "Service job added successfully!"
      );

      setShowForm(false);
      setEditingId(null);
      setForm({ ...emptyServiceJob });

      await loadJobs();
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this service job?")) return;

    try {
      const response = await fetch(`${API}/service-jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        throw new Error("Delete failed");
      }

      alert("Service job deleted!");

      await loadJobs();
    } catch (error) {
      console.error(error);
      alert("Unable to delete service job.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Service Jobs</h1>
          <p>Manage vehicle service jobs</p>
        </div>

        <button className="primary-btn" onClick={openAdd}>
          + Add Service Job
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Mechanic</th>
              <th>Service Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="8">
                  No service jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.jobId}>
                  <td>{job.jobId}</td>

                  <td>
                    {job.vehicle?.vehicleId}
                  </td>

                  <td>
                    {job.mechanic?.mechanicId}
                  </td>

                  <td>
                    {job.serviceType?.serviceTypeId}
                  </td>

                  <td>{job.priority}</td>

                  <td>{job.status}</td>

                  <td>{job.totalCost}</td>

                  <td>
                    <button onClick={() => openEdit(job)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => remove(job.jobId)}
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <h2>
              {editingId
                ? "Edit Service Job"
                : "Add Service Job"}
            </h2>

            <form onSubmit={save}>
              <label>Vehicle</label>

              <select
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Vehicle
                </option>

                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.vehicleId}
                    value={vehicle.vehicleId}
                  >
                    {vehicle.vehicleId} -{" "}
                    {vehicle.registrationNumber} -{" "}
                    {vehicle.brand}{" "}
                    {vehicle.model}
                  </option>
                ))}
              </select>

              <label>Mechanic</label>

              <select
                name="mechanicId"
                value={form.mechanicId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Mechanic
                </option>

                {mechanics.map((mechanic) => (
                  <option
                    key={mechanic.mechanicId}
                    value={mechanic.mechanicId}
                  >
                    {mechanic.mechanicId} -{" "}
                    {mechanic.name}
                  </option>
                ))}
              </select>

              <label>Service Type</label>

              <select
                name="serviceTypeId"
                value={form.serviceTypeId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Service Type
                </option>

                {serviceTypes.map((type) => (
                  <option
                    key={type.serviceTypeId}
                    value={type.serviceTypeId}
                  >
                    {type.serviceTypeId} -{" "}
                    {type.serviceName}
                  </option>
                ))}
              </select>

              <label>Start Date</label>

              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />

              <label>Completion Date</label>

              <input
                type="datetime-local"
                name="completionDate"
                value={form.completionDate}
                onChange={handleChange}
              />

              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />

              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>
                <option value="COMPLETED">
                  COMPLETED
                </option>
                <option value="CANCELLED">
                  CANCELLED
                </option>
              </select>

              <label>Labor Cost</label>

              <input
                type="number"
                step="0.01"
                name="laborCost"
                value={form.laborCost}
                onChange={handleChange}
              />

              <label>Parts Cost</label>

              <input
                type="number"
                step="0.01"
                name="partsCost"
                value={form.partsCost}
                onChange={handleChange}
              />

              <label>Total Cost</label>

              <input
                type="number"
                step="0.01"
                name="totalCost"
                value={form.totalCost}
                onChange={handleChange}
              />

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingId ? "Update Job" : "Add Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
/* =========================================================
   PAYMENTS PAGE
========================================================= */

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPayments = async () => {
    try {
      setLoading(true);

      // Use the payment endpoint that we already know works
      const response = await fetch(`${API}/payments/job/7`);

      if (!response.ok) {
        throw new Error("Failed to load payments");
      }

      const data = await response.json();

      // Backend returns an array
      setPayments(Array.isArray(data) ? data : [data]);

    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Unable to load payments. Check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Payments</h1>
          <p>View AutoCarePro payment records</p>
        </div>

        <button
          className="primary-btn"
          onClick={loadPayments}
        >
          Refresh
        </button>
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Job ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="6">
                  Loading payments...
                </td>
              </tr>

            ) : payments.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No payments found.
                </td>
              </tr>

            ) : (

              payments.map((payment) => (
                <tr key={payment.paymentId}>

                  <td>
                    {payment.paymentId}
                  </td>

                  <td>
                    {payment.serviceJob?.jobId || "-"}
                  </td>

                  <td>
                    ₹{payment.amount}
                  </td>

                  <td>
                    {payment.paymentDate}
                  </td>

                  <td>
                    {payment.paymentMethod}
                  </td>

                  <td>
                    {payment.paymentStatus}
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */
function Dashboard({ setPage }) {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    setDashboardLoading(true);

    Promise.all([
      fetch(`${API}/customers`).then((r) => r.json()),
      fetch(`${API}/vehicles`).then((r) => r.json()),
      fetch(`${API}/mechanics`).then((r) => r.json()),
      fetch(`${API}/service-jobs`).then((r) => r.json()),
    ])
      .then(([c, v, m, j]) => {
        setCustomers(Array.isArray(c) ? c : []);
        setVehicles(Array.isArray(v) ? v : []);
        setMechanics(Array.isArray(m) ? m : []);
        setJobs(Array.isArray(j) ? j : []);
      })
      .catch((error) => {
        console.error("Dashboard loading error:", error);
      })
      .finally(() => setDashboardLoading(false));
  }, []);

  const pendingJobs = jobs.filter((job) => job.status === "PENDING").length;
  const activeJobs = jobs.filter((job) => job.status === "IN_PROGRESS").length;
  const completedJobs = jobs.filter((job) => job.status === "COMPLETED").length;
  const highPriorityJobs = jobs.filter((job) => job.priority === "HIGH").length;

  const totalRevenue = jobs.reduce(
    (sum, job) => sum + Number(job.totalCost || 0),
    0
  );

  const recentJobs = [...jobs]
    .sort((a, b) => Number(b.jobId || 0) - Number(a.jobId || 0))
    .slice(0, 5);

  const statusClass = (status) => {
    if (status === "COMPLETED") return "status-success";
    if (status === "IN_PROGRESS") return "status-info";
    if (status === "CANCELLED") return "status-danger";
    return "status-warning";
  };

  return (
    <div className="page dashboard-page pro-dashboard">
      <section className="pro-dashboard-hero">
        <div className="pro-hero-content">
          <span className="pro-eyebrow">AUTOMOTIVE SERVICE MANAGEMENT</span>
          <h1>Workshop command center</h1>
          <p>
            Monitor customers, vehicles, mechanics and service operations
            from one professional workspace.
          </p>

          <div className="pro-hero-actions">
            <button
              className="pro-btn pro-btn-primary"
              onClick={() => setPage("service-jobs")}
            >
              + Create Service Job
            </button>
            <button
              className="pro-btn pro-btn-secondary"
              onClick={() => setPage("database-features")}
            >
              View Reports
            </button>
          </div>
        </div>

        <div className="pro-system-status">
          <span className="pro-status-dot"></span>
          <div>
            <strong>All systems operational</strong>
            <small>Spring Boot API · MySQL · React</small>
          </div>
        </div>
      </section>

      <section className="pro-stat-grid">
        <div className="pro-stat-card">
          <div className="pro-stat-icon customers-icon">👥</div>
          <div>
            <span>Total Customers</span>
            <strong>{dashboardLoading ? "—" : customers.length}</strong>
            <small>Registered customers</small>
          </div>
        </div>

        <div className="pro-stat-card">
          <div className="pro-stat-icon vehicles-icon">🚗</div>
          <div>
            <span>Vehicles</span>
            <strong>{dashboardLoading ? "—" : vehicles.length}</strong>
            <small>Vehicles in system</small>
          </div>
        </div>

        <div className="pro-stat-card">
          <div className="pro-stat-icon mechanics-icon">🔧</div>
          <div>
            <span>Mechanics</span>
            <strong>{dashboardLoading ? "—" : mechanics.length}</strong>
            <small>Workshop technicians</small>
          </div>
        </div>

        <div className="pro-stat-card">
          <div className="pro-stat-icon jobs-icon">🛠️</div>
          <div>
            <span>Service Jobs</span>
            <strong>{dashboardLoading ? "—" : jobs.length}</strong>
            <small>{activeJobs} currently active</small>
          </div>
        </div>
      </section>

      <section className="pro-metric-strip">
        <div>
          <span>Pending Jobs</span>
          <strong>{dashboardLoading ? "—" : pendingJobs}</strong>
        </div>
        <div>
          <span>In Progress</span>
          <strong>{dashboardLoading ? "—" : activeJobs}</strong>
        </div>
        <div>
          <span>Completed</span>
          <strong>{dashboardLoading ? "—" : completedJobs}</strong>
        </div>
        <div>
          <span>High Priority</span>
          <strong>{dashboardLoading ? "—" : highPriorityJobs}</strong>
        </div>
        <div>
          <span>Service Value</span>
          <strong>
            {dashboardLoading
              ? "—"
              : `₹${totalRevenue.toLocaleString("en-IN")}`}
          </strong>
        </div>
      </section>

      <section className="pro-dashboard-grid">
        <div className="pro-panel">
          <div className="pro-panel-header">
            <div>
              <span className="pro-panel-kicker">LIVE OPERATIONS</span>
              <h2>Service workload</h2>
              <p>Current status of workshop service jobs.</p>
            </div>
            <button
              className="pro-link-btn"
              onClick={() => setPage("service-jobs")}
            >
              Open jobs →
            </button>
          </div>

          <div className="pro-workload">
            <div className="pro-workload-item">
              <div className="pro-workload-top">
                <span>Pending</span>
                <strong>{pendingJobs}</strong>
              </div>
              <div className="pro-progress-track">
                <div
                  className="pro-progress warning"
                  style={{ width: `${jobs.length ? Math.min((pendingJobs / jobs.length) * 100, 100) : 0}%` }}
                ></div>
              </div>
              <small>Waiting for service</small>
            </div>

            <div className="pro-workload-item">
              <div className="pro-workload-top">
                <span>In Progress</span>
                <strong>{activeJobs}</strong>
              </div>
              <div className="pro-progress-track">
                <div
                  className="pro-progress info"
                  style={{ width: `${jobs.length ? Math.min((activeJobs / jobs.length) * 100, 100) : 0}%` }}
                ></div>
              </div>
              <small>Currently being serviced</small>
            </div>

            <div className="pro-workload-item">
              <div className="pro-workload-top">
                <span>Completed</span>
                <strong>{completedJobs}</strong>
              </div>
              <div className="pro-progress-track">
                <div
                  className="pro-progress success"
                  style={{ width: `${jobs.length ? Math.min((completedJobs / jobs.length) * 100, 100) : 0}%` }}
                ></div>
              </div>
              <small>Successfully finished</small>
            </div>
          </div>
        </div>

        <div className="pro-panel">
          <div className="pro-panel-header">
            <div>
              <span className="pro-panel-kicker">QUICK ACTIONS</span>
              <h2>Workspace shortcuts</h2>
              <p>Jump directly to common operations.</p>
            </div>
          </div>

          <div className="pro-quick-actions">
            <button onClick={() => setPage("customers")}>
              <span>👥</span>
              <div>
                <strong>Customers</strong>
                <small>Manage customer records</small>
              </div>
              <b>→</b>
            </button>

            <button onClick={() => setPage("vehicles")}>
              <span>🚗</span>
              <div>
                <strong>Vehicles</strong>
                <small>Manage registered vehicles</small>
              </div>
              <b>→</b>
            </button>

            <button onClick={() => setPage("service-jobs")}>
              <span>🛠️</span>
              <div>
                <strong>Service Jobs</strong>
                <small>Create or update jobs</small>
              </div>
              <b>→</b>
            </button>

            <button onClick={() => setPage("database-features")}>
              <span>📊</span>
              <div>
                <strong>Reports & Insights</strong>
                <small>Database-driven analytics</small>
              </div>
              <b>→</b>
            </button>
          </div>
        </div>
      </section>

      <section className="pro-dashboard-grid lower-grid">
        <div className="pro-panel">
          <div className="pro-panel-header">
            <div>
              <span className="pro-panel-kicker">RECENT ACTIVITY</span>
              <h2>Latest service jobs</h2>
              <p>Most recently created service records.</p>
            </div>
          </div>

          {recentJobs.length === 0 ? (
            <div className="pro-empty-state">
              <span>🛠️</span>
              <strong>No service jobs yet</strong>
              <small>Create your first service job to see it here.</small>
            </div>
          ) : (
            <div className="pro-recent-list">
              {recentJobs.map((job) => (
                <div className="pro-recent-row" key={job.jobId}>
                  <div className="pro-job-avatar">#{job.jobId}</div>
                  <div className="pro-job-info">
                    <strong>
                      {job.vehicle?.registrationNumber ||
                        `Vehicle ${job.vehicle?.vehicleId || "-"}`}
                    </strong>
                    <small>
                      {job.serviceType?.serviceName || "Service job"} · Mechanic {job.mechanic?.mechanicId || "-"}
                    </small>
                  </div>
                  <span className={`pro-status-pill ${statusClass(job.status)}`}>
                    {job.status || "PENDING"}
                  </span>
                  <strong className="pro-job-cost">
                    ₹{Number(job.totalCost || 0).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pro-panel pro-tech-panel">
          <div className="pro-panel-header">
            <div>
              <span className="pro-panel-kicker">PLATFORM</span>
              <h2>System health</h2>
              <p>Technology stack used by AutoCarePro.</p>
            </div>
          </div>

          <div className="pro-health-list">
            <div><span>Frontend</span><strong>React</strong><em>Ready</em></div>
            <div><span>Backend</span><strong>Spring Boot</strong><em>Ready</em></div>
            <div><span>API</span><strong>REST</strong><em>Connected</em></div>
            <div><span>Database</span><strong>MySQL</strong><em>Connected</em></div>
            <div><span>Deployment</span><strong>Docker</strong><em>Ready</em></div>
          </div>
        </div>
      </section>

      <section className="pro-database-banner">
        <div>
          <span className="pro-panel-kicker">DATABASE INTELLIGENCE</span>
          <h2>Advanced SQL operations are integrated into the application</h2>
          <p>
            Explore service reports, cost calculations, vehicle history and
            performance analytics through REST APIs.
          </p>
        </div>
        <button
          className="pro-btn pro-btn-light"
          onClick={() => setPage("database-features")}
        >
          Explore Reports →
        </button>
      </section>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🚘</div>

          <div>
            <h2>AutoCarePro</h2>
            <span>Service Management</span>
          </div>
        </div>

        <nav>
          <button
            className={
              page === "dashboard" ? "active" : ""
            }
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className={
              page === "customers" ? "active" : ""
            }
            onClick={() => setPage("customers")}
          >
            👥 Customers
          </button>

          <button
            className={
              page === "vehicles" ? "active" : ""
            }
            onClick={() => setPage("vehicles")}
          >
            🚗 Vehicles
          </button>

          <button
            className={
              page === "mechanics" ? "active" : ""
            }
            onClick={() => setPage("mechanics")}
          >
            🔧 Mechanics
          </button>

          <button
            className={
              page === "service-jobs" ? "active" : ""
            }
            onClick={() => setPage("service-jobs")}
          >
            🛠️ Service Jobs
          </button>
		  <button
		    className={
		      page === "payments" ? "active" : ""
		    }
		    onClick={() => setPage("payments")}
		  >
		    💳 Payments
		  </button>
		  <button
		    className={
		      page === "database-features" ? "active" : ""
		    }
		    onClick={() => setPage("database-features")}
		  >
		    📊 Reports & Insights
		  </button>
        </nav>
      </aside>

	  <main className="content">
	    {page === "dashboard" && <Dashboard setPage={setPage} />}
	    {page === "customers" && <CustomersPage />}
	    {page === "vehicles" && <VehiclesPage />}
	    {page === "mechanics" && <MechanicsPage />}
	    {page === "service-jobs" && <ServiceJobsPage />}
	    {page === "payments" && <PaymentsPage />}
	    {page === "database-features" && <DatabaseFeatures />}
	  </main>
    </div>
  );
}

export default App;