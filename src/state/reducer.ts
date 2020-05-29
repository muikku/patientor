import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'EXTEND_PATIENT';
      payload: Patient;
    }
    | {
      type: 'SET_DIAGNOSE_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'SET_PATIENT_LIST':
    return {
      ...state,
      patients: {
        ...action.payload.reduce(
          (memo, patient) => ({ ...memo, [patient.id]: patient }),
          {}
        ),
        ...state.patients
      }
    };
  case 'SET_DIAGNOSE_LIST':
    return {
      ...state,
      diagnoses: {
        ...action.payload.reduce(
          (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
          {}
        ),
        ...state.diagnoses
      }
    };
  case 'ADD_PATIENT':
    return {
      ...state,
      patients: {
        ...state.patients,
        [action.payload.id]: action.payload
      }
    };
  case 'EXTEND_PATIENT':
    const alteredPatients = { ...state.patients };
    alteredPatients[action.payload.id] = action.payload;
    return {
      ...state,
      patients: alteredPatients
    };
  default:
    return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patients
});

export const setDiagnoseList = (diagnoses: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSE_LIST',
  payload: diagnoses
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient
});

export const extendPatient = (patient: Patient): Action => ({
  type: 'EXTEND_PATIENT',
  payload: patient
});