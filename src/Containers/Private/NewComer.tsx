import { Field, Form, FormikProps, withFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { FileUpload } from '../../Helpers/Cloudinary';
import { useDispatch } from 'react-redux';
import { actionAddUserAsyn } from '../../Redux/Actions/ActionsUser';
import { useNavigate } from 'react-router-dom';

const NewComer = () => {
  const dispatch:any = useDispatch()
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const validationSchema = Yup.object().shape({
    cellPhone: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    edad: Yup.number().required('Required').positive().integer(),
    //url_photo: Yup.string().required('Required'),
    user_name: Yup.string().required('Required'),
  });

  interface FormValues {
    cellPhone: string,
    description: string,
    edad: number,
    url_photo: string,
    user_name: string
  }

  interface OtherProps {
    message: string;
  }

  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        try {
          const resp = await FileUpload(file)
          props.setFieldValue('url_photo', resp) // update Formik form's values
          setImageUrl(resp)
        } catch (err) {
          console.warn(err)
        }
      } else {
        props.setFieldValue('url_photo', null) // set url_photo to null when the file input field is cleared
        setImageUrl(null)
      }
    }

    return (
      <Form>
        <h3>{message}</h3>

        <p>Ingresa tu foto de perfil</p>
        <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
        {imageUrl && (
          <img src={imageUrl} alt="preview" style={{ width: '100px', height: '100px' }} />
        )}
        {touched.url_photo &&
          errors.url_photo && (
            <div>
              {errors.url_photo as string}
            </div>
          )}

        <p>Ingresa tu nombre de usuario</p>
        <Field type="text" name="user_name" placeholder="Kofidelay" />
        {touched.user_name && errors.user_name && <div>{errors.user_name}</div>}

        <p>Descripcion de tu perfil</p>
        <Field type="text" name="description" />
        {touched.description && errors.description && <div>{errors.description}</div>}

        <p>Numero de telefono</p>
        <Field type="text" name="cellPhone" />
        {touched.cellPhone && errors.cellPhone && <div>{errors.cellPhone}</div>}

        <p>Ingresa tu edad</p>
        <Field type="number" name="edad" />
        {touched.edad && errors.edad && <div>{errors.edad}</div>}

        <hr></hr>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button type="button">
          Cancelar
        </button>
      </Form>
    );
  };

  interface MyFormProps {
    initialCellPhone?: string;
    initialDescription?: string;
    initialEdad?: number;
    initialUrlPhoto?: any;
    initialUserName?: string;
    message: string;
  }

  const navigate = useNavigate()
  const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
      cellPhone: props.initialCellPhone || '',
      description: props.initialDescription || '',
      edad: props.initialEdad || 0,
      url_photo: props.initialUrlPhoto || '',
      user_name: props.initialUserName || '',
    }),
    validationSchema: validationSchema,
    handleSubmit: values => {
      dispatch(actionAddUserAsyn(values));
      navigate('/')
    },
  })(InnerForm);



  return (
    <div>
      <h1>Crea tu perfil</h1>
      <MyForm message="Ingresa los siguentes datos" />
    </div>
  )
}

export default NewComer