import React, { useState,  } from 'react';
import axios from 'axios';
import { Icon, Header } from 'semantic-ui-react';

import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, extendPatient } from '../state';
import { useParams } from 'react-router-dom';
import EntryDetails from './entries';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
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

  if(!patient){
    return null;
  }

  const iconName = (patient: Patient) =>  {
    switch (patient.gender) {
    case 'male':
      return (<Icon name='mars'/>);
    case 'female':
      return <Icon name='venus'/>;
    default:
      return <Icon name='user secret'/>;
    }
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
              <EntryDetails key={entry.id} entry={entry}/>
            )
            )
        }
      </div>
    </div>
  );
};


export default PatientInfoPage;
