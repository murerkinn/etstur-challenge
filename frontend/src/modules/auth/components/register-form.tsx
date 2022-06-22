import { Field, Form, Formik } from 'formik'

import FormButton from '@/components/form-button'
import Input from '@/components/input'

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Form className="form">
        <div className="form-group">
          <div className="form-row ">
            <Field
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              as={Input}
            />
            <Field
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              as={Input}
            />
          </div>
        </div>

        <div className="form-group">
          <Field
            id="email"
            name="email"
            type="email"
            label="Email"
            as={Input}
          />
        </div>

        <div className="form-group">
          <Field
            id="password"
            name="password"
            type="password"
            label="Password"
            as={Input}
          />
        </div>

        <div className="form-group">
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            as={Input}
          />
        </div>

        <div className="form-group">
          <FormButton className="btn-block" variant="primary">
            Register
          </FormButton>
        </div>
      </Form>
    </Formik>
  )
}

export default RegisterForm
