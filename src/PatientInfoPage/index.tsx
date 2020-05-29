import React, { useState,  } from "react";
import axios from "axios";
import { Icon, Header } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, extendPatient } from "../state";
import { useParams } from "react-router-dom";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [fetcing, setFetching] = useState(false);

  const containsSSN = (obj: Patient) => 'ssn' in obj;

  React.useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const { data: PatientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
       dispatch(extendPatient(PatientData));
      } catch (e) {
        console.error(e);
      }
    };

    if(!Object.keys(patients).includes(id) && !fetcing){
      setFetching(true);
      fetchPatientsData();
    } else if (Object.keys(patients).includes(id)){
      const patientDataInStore = patients[id];
      if(containsSSN(patientDataInStore)){
        setPatient(patientDataInStore);
      } else if(!containsSSN(patientDataInStore) && !fetcing){
        setFetching(true);
        fetchPatientsData();
      }
    }
  }, [dispatch, id, patients, fetcing]);

  if(!patient || !diagnoses){
    return null;
  }

  const iconName = (patient: Patient) =>  {
    switch (patient.gender) {
      case "male":
        return (<Icon name='mars'/>);
      case "female":
        return <Icon name='venus'/>;
      default:
        return <Icon name='user secret'/>;
    }
  };

  const getDiagnosis = (code: string): Diagnosis | null => {
    const keys = Object.keys(diagnoses);
    if(keys.includes(code)){
      return diagnoses[code];
    }
    return null;
  };

  return (
    <div className="PatientInfoPage">
        <Header as="h2">{patient.name} {iconName(patient)}</Header>
        <div>date of birth: {patient.dateOfBirth}</div>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <Header as="h4">Entries</Header>
          <div>
          {
            patient.entries && 
            patient.entries.length >= 1 && 
            patient.entries?.map((entry: Entry) => (
              <div key={entry.id}>
              <div>{entry.date} {entry.description}</div>
              <ul>
                {entry.diagnosisCodes
                 && entry.diagnosisCodes
                 .map(c => getDiagnosis(c))
                 .map(c => c 
                  ?
                  (<li key={c.code}>{c.code} {c.name}</li>) 
                  :
                   null
                   )
                }
              </ul>          
            </div>
              )
            )
          }
        </div>
    </div>
  );
};


export default PatientInfoPage;
