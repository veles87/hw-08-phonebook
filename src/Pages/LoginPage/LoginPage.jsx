//components
import { FormItems } from 'Components/FormItems/FormItems';
import { SubmitButton } from 'Components/SubmitButton/SubmitButton';
//stules
import css from './LoginPage.module.css';
//fetch servises
import { useLoginMutation } from 'redux/authServise';
//redux
import { useDispatch } from 'react-redux';
import { isLogin, setToken } from 'redux/actions';
//utils
import { toast } from 'react-hot-toast';
import { loginSchema } from 'utils/validtionSchema';
import { loginFormOptions } from 'utils/formikOptions';

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  function postLogin({ data }) {
    dispatch(setToken(data.token));
    dispatch(isLogin(true));
  }

  function loginHandler(event) {
    loginUser({ ...event })
      .then(postLogin)
      .catch(e => toast.error('Неверный логин или пароль'));
  }

  return (
    <div className={css.container}>
      <FormItems
        schema={loginSchema}
        onSubmit={loginHandler}
        initValues={{ email: '', password: '' }}
        inputTags={loginFormOptions}
      >
        <SubmitButton isLoading={isLoading} label={'Login'} />
      </FormItems>
    </div>
  );
};

export default LoginPage;
