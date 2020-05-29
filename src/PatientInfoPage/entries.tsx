import React from 'react';
import { Entry, Diagnosis } from '../types';
import { Segment, Header, Icon, Rating } from 'semantic-ui-react';
import { useStateValue } from '../state';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosis = (code: string): Diagnosis | null => {
    const keys = Object.keys(diagnoses);
    if(keys.includes(code)){
      return diagnoses[code];
    }
    return null;
  };

  const diagnoseList = (entry: Entry) => {
    return (
      <ul>
        {entry.diagnosisCodes
       && entry.diagnosisCodes
         .map(c => getDiagnosis(c))
         .map(c => c ?
           (<li key={c.code}>{c.code} {c.name}</li>) :
           null)}
      </ul>
    );
  };

  const EntryTypeIcon = (type: string) => {
    switch (type) {
    case 'Hospital':
      return <Icon name='hospital symbol'/>;
    case 'HealthCheck':
      return <Icon name='doctor'/>;
    case 'OccupationalHealthcare':
      return <Icon name='clipboard'/>;
    default:
      throw new Error('Incorret type');
    }
  };

  const BaseEntryInfo: React.FC<{ entry: Entry }> = ({ entry, children }) => {
    const { description, type, date, specialist } = entry;
    return (
      <Segment>
        <Header as="h5">{date} {EntryTypeIcon(type)}</Header>
        <div>{description}</div>
        <div>{specialist}</div>
        {children}
        {diagnoseList(entry)}
      </Segment>
    );
  };

  switch (entry.type) {
  case 'Hospital':
    const { discharge } = entry;
    const { criteria } = discharge;
    return (
      <BaseEntryInfo entry={entry}>
        <div>
          <div>Criteria: {criteria} ({discharge.date})</div>
        </div>
      </BaseEntryInfo>
    );
  case 'OccupationalHealthcare':
    const { employerName, sickLeave } = entry;
    return (
      <BaseEntryInfo entry={entry}>
        <div>
          <div>Employer name: {employerName}</div>
          {sickLeave ? <div>Sick leave: {sickLeave.startDate} - {sickLeave.endDate}</div> : null}
        </div>
      </BaseEntryInfo>
    );
  case 'HealthCheck':
    const { healthCheckRating } = entry;
    return (

      <BaseEntryInfo entry={entry}>
        <Rating icon='heart' defaultRating={3-healthCheckRating} maxRating={3} disabled />
      </BaseEntryInfo>
    );

  default:
    throw new Error('this is bad.');
  }
};

export default EntryDetails;
