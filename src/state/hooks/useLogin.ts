import { useFormik } from 'formik'
import { useAppDispatch } from './selectors'
import { loginTC } from '../reducers/authSlice/authSlice'
import { LoginParams } from 'api/authApi'
import { handleServerNetworkError } from 'utils/error-utils'

export function useLogin() {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    validate: (values) => {
      const errors: Partial<LoginParams> = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 4) {
        errors.password = 'Must be more 4 symbols'
      }

      return errors
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async (values, { setFieldValue, setSubmitting }) => {
      setSubmitting(true)
      try {
        await dispatch(loginTC(values))
        setFieldValue('password', '')
      } catch (err) {
        handleServerNetworkError(err as { message: string }, dispatch)
      }
      setSubmitting(false)
    },
  })

  const disabled = formik.isSubmitting || !(formik.dirty && formik.isValid)

  return {
    formik,
    disabled,
  }
}
