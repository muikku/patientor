import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientInfoPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

/*
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
*/
  return (
    <div className="PatientInfoPage">
      <Container textAlign="center">
        <h3>patient name, symbot</h3>
        <div>ssn: 2343423</div>
        <div>occupation: jobless</div>
      </Container>
    </div>
  );
};

export default PatientInfoPage;
