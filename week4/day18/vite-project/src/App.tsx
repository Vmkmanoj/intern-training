import { useState } from "react";

type Status = "Active" | "Inactive";

interface Employee {
  id: number;
  name: string;
  age: number;
  city: string;
  status: Status;
}

type EmployeeList = Employee[];

type AddEmployee = (employee: Employee) => void;

function App() {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: "",
    age: 0,
    city: "",
    status: "Active",
  });

  const [employees, setEmployees] = useState<EmployeeList>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]:
        name === "id" || name === "age"
          ? Number(value)
          : name === "status"
          ? (value as Status)
          : value,
    }));
  };

  const addEmployee: AddEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    addEmployee(employee);

    setEmployee({
      id: 0,
      name: "",
      age: 0,
      city: "",
      status: "Active",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="number"
          value={employee.id}
          onChange={handleChange}
          placeholder="ID"
        />

        <br />
        <br />

        <input
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <br />
        <br />

        <input
          name="age"
          type="number"
          value={employee.age}
          onChange={handleChange}
          placeholder="Age"
        />

        <br />
        <br />

        <input
          name="city"
          value={employee.city}
          onChange={handleChange}
          placeholder="City"
        />

        <br />
        <br />

        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br />
        <br />

        <button type="submit">Add Employee</button>
      </form>

      <hr />

      {employees.map((emp) => (
        <div key={emp.id}>
          <h3>{emp.name}</h3>
          <p>ID: {emp.id}</p>
          <p>Age: {emp.age}</p>
          <p>City: {emp.city}</p>
          <p>Status: {emp.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;