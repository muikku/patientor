import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const { data: PatientData } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log('got the data!', PatientData);
       /* dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });*/
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientsData();
  }, [dispatch]);

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
