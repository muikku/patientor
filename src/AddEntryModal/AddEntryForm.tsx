import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { Entry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const [formType, setFormType] = useState('Hospital');

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],

      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        /*
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }*/
        console.log(requiredError, values);
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
                  placeholder="mr moon"
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
                <Button type="button" onClick={() => setFormType('Hospital')} color="red">
                  Hospital
                </Button>
              </Grid.Column>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => setFormType('OccupationalHealthcare')} color="red">
                  Occupational healthcare
                </Button>
              </Grid.Column>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => setFormType('HealthCheck')} color="red">
                  Health check
                </Button>
              </Grid.Column>
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
