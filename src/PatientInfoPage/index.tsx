import React, { useState,  } from 'react';
import axios from 'axios';
import { Icon, Header, Button } from 'semantic-ui-react';
import { OccupationalFormValues, HospitalFormValues, HealthCheckFormValues } from '../AddEntryModal/AddEntryForm';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, extendPatient } from '../state';
import { useParams } from 'react-router-dom';
import EntryDetails from './entries';
import AddEntryModal from '../AddEntryModal';

const PatientInfoPage: React.FC = () => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [fetcing, setFetching] = useState(false);

  const submitNewEntry = async (values: OccupationalFormValues | HospitalFormValues | HealthCheckFormValues) => {
    try{
      const formEntryData = () => {
        switch (values.type) {
        case 'Hospital':
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : [],
            discharge:  {
              criteria: values.dischargeCriteria,
              date: values.dischargeDate
            }
          });
        case 'OccupationalHealthcare':
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : [],
            employerName:  values.employerName,
            sickLeave: values.startDate && values.endDate ? {
              startDate: values.startDate,
              endDate: values.endDate
            } : undefined
          });
        case 'HealthCheck':
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : [],
            healthCheckRating:  values.healthCheckRating
          });
        default:
          throw new Error('Form returned something extraordinary');
        }
      };
      const { data: Patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        formEntryData()
      );
      dispatch(extendPatient(Patient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};


export default PatientInfoPage;
