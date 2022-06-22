import { Field, Form, Formik } from 'formik'

import { useAppDispatch, useAppSelector } from '@/app/store'
import FormButton from '@/components/form-button'
import Input from '@/components/input'

import { login } from '../store/actions'

const LoginForm = () => {
  const { loading } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => {
        dispatch(login(values))
      }}
    >
      <Form className="form">
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
          <FormButton className="btn-block" variant="primary" loading={loading}>
            Login
          </FormButton>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
