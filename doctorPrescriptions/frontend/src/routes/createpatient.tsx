import { createFileRoute } from "@tanstack/react-router";
import RegisterPatientPage from "../pages/forms/patientCreate"



export const Route = createFileRoute("/createpatient")({
  component: RegisterPatientPage,
});