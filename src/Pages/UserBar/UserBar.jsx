//components
import { NavLink } from 'react-router-dom';
//stules
import css from './UserBar.module.css';
//fetch servises
import { useCurrentQuery, useLogoutMutation } from 'redux/authServise';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setToken, isLogin } from 'redux/actions';
//utils
import { toast } from 'react-hot-toast';
//selectors
import { isLoginUser } from 'redux/selectors';

export const UserBar = () => {
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const isLoggetIn = useSelector(isLoginUser);
  const { data } = useCurrentQuery();

  function postLogout() {
    dispatch(setToken(''));
    dispatch(isLogin(false));
  }

  function logoutHandler() {
    logoutUser()
      .then(postLogout)
      .catch(e => toast.error('что-то пошло не так'));
  }

  return (
    <>
      <div className={css.bar}>
        {!isLoggetIn && (
          <>
            <NavLink to="/signup" className={css.link}>
              Signup
            </NavLink>
            <NavLink to="/login" className={css.link}>
              Login
            </NavLink>
          </>
        )}
        <NavLink to="/" className={css.link}>
          Home
        </NavLink>
        {isLoggetIn && (
          <NavLink to="/contacts" className={css.link}>
            Contacts
          </NavLink>
        )}
        {isLoggetIn && (
          <>
            <p className={css.userName}>Hello, {data?.name}</p>
            <button
              type="button"
              onClick={logoutHandler}
              className={css.button}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};
