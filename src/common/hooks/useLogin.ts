import { useFormik } from 'formik'
import { useAppDispatch } from './selectors'
import { LoginParams, ResponseFollow } from 'common/types'
import { authThunks } from 'BLL/reducers/authSlice'

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
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true)
      dispatch(authThunks.loginTC(values))
        .unwrap()
        .catch((e: ResponseFollow) => {
          if (e.fieldsErrors) {
            const { fieldsErrors } = e
            fieldsErrors.forEach((el) => {
              setFieldError(el.field, el.error)
            })
          }
          if (e.messages) {
            setFieldError('email', e.messages[0])
            setFieldError('password', e.messages[0])
          }
        })

      setSubmitting(false)
    },
  })

  const disabled = formik.isSubmitting || !(formik.dirty && formik.isValid)

  return {
    formik,
    disabled,
  }
}
