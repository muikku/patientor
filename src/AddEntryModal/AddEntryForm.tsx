import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField } from '../AddPatientModal/FormField';
import { Entry } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const basefields = ['description', 'date', 'specialist', 'diagnosisCodes'];
  const healthCheckFields = [...basefields, 'healthCheckRating'];
  const hospitalFields = [...basefields, 'discharge'];
  const occupationalFields = [...basefields, 'employerName', 'sickLeave'];

  const [formType, setFormType] = useState('Hospital');
  const [diagnoses, setDiagnoses] = useState([]);
  const [fields, setFields] = useState(hospitalFields);


  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: diagnoses,

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
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Entry type"
              placeholder={formType}
              name="entrytype"
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
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
                <Button type="button" onClick={() => setFormType('HealthC')} color="red">
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
