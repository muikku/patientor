import React, { useState } from 'react';
import { Grid, Button, Form as SUForm } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { Entry } from '../types';
import { useStateValue } from '../state';
import { isDate, isEntryType } from '../utils/utils';

export type BaseEntryFormValues = Omit<Entry, 'id' | 'type'>;
export interface HospitalFormValues extends BaseEntryFormValues {
  type: 'Hospital';
  dischargeCriteria: string;
  dischargeDate: string;
}

export interface OccupationalFormValues extends BaseEntryFormValues {
  type: 'OccupationalHealthcare';
  employerName: string;
  startDate?: string;
  endDate?: string;
}

export interface HealthCheckFormValues extends BaseEntryFormValues {
  type: 'HealthCheck';
  healthCheckRating: number;
}

export interface InitialValues extends BaseEntryFormValues {
  type: string;
}

export type EntryFormValues = OccupationalFormValues | HealthCheckFormValues | HospitalFormValues | InitialValues;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const options = [
  { value: 'Hospital', label: 'Hospital entry' },
  { value: 'OccupationalHealthcare', label: 'Occupational healthcare entry' },
  { value: 'HealthCheck', label: 'Health check entry' }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const [formType, setFormType] = useState('Hospital');

  const handleClick = (event: { target: { value: React.SetStateAction<string> } }) => {
    setFormType(event.target.value);
  };
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: '',
        employerName: '',
        startDate: '',
        endDate: '',
        dischargeCriteria: '',
        dischargeDate: ''
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const formatError = (format: string) => `Value in wrong format. Correct format: ${format}`;
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if(!isEntryType(values.type)){
          errors.type = formatError('Hospital or OccupationalHealthcare or HealthCheck');
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!isDate(values.date)){
          errors.date = formatError('YYYY-MM-DD');
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type === 'Hospital'){
          if(!values.dischargeCriteria){
            errors.dischargeCriteria = requiredError;
          }
          if(!values.dischargeDate){
            errors.dischargeDate = requiredError;
          }
          if(!isDate(values.dischargeDate)){
            errors.dischargeDate = formatError('YYYY-MM-DD');
          }
        }
        if(values.type === 'OccupationalHealthcare'){
          if(!values.employerName){
            errors.employerName = requiredError;
          }
          if(!values.startDate && values.endDate){
            errors.startDate = 'Start date required.';
          }
          if(values.startDate && !values.endDate){
            errors.endDate = 'End date required.';
          }
          if(values.startDate && !isDate(values.startDate)){
            errors.startDate = formatError('YYYY-MM-DD');
          }
          if(values.endDate && !isDate(values.endDate)){
            errors.endDate = formatError('YYYY-MM-DD');
          }
        }
        if(values.type === 'HealthCheck'){
          if(!values.healthCheckRating){
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SUForm.Field>
              <label>Entry type</label>
              <Field as="select" name='type' className="ui dropdown" onClick={handleClick} >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label || option.value}
                  </option>
                ))}
              </Field>
            </SUForm.Field>
            {
              formType === 'Hospital' &&
              <div>
                <Field
                  label="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  diagnoses={Object.values(diagnoses)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
              </div>
            }
            {
              formType === 'OccupationalHealthcare' &&
              <div>
                <Field
                  label="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  diagnoses={Object.values(diagnoses)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
                <Field
                  label="Employer Name"
                  placeholder="first name second name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="endDate"
                  component={TextField}
                />
              </div>
            }
            {
              formType === 'HealthCheck' &&
              <div>
                <Field
                  label="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  diagnoses={Object.values(diagnoses)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                />
                <Field
                  label="Health check rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </div>
            }

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
