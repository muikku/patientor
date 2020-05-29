import React from 'react';
import { Entry } from '../types';

const ShowEntry = (entry: Entry) => {
  const { date, description, diagnosisCodes } = entry;
  return (
    <div>
      <div>{date} {description}</div>
      <ul>
        {diagnosisCodes && diagnosisCodes.map( c => (<li key={c}>{c}</li>))}
      </ul>          
    </div>
  );
};

export default ShowEntry;