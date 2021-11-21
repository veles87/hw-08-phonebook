//Components
import { NavLink } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
//styles
import css from './HomePage.module.css';
//selectors
import { isLoginUser } from 'redux/selectors';

const HomePage = () => {
  const isLogin = useSelector(isLoginUser);
  return (
    <div className={css.container}>
      <h1 className={css.header}>Книга контактов</h1>
      <NavLink to={isLogin ? '/contacts' : '/login'} className={css.link}>
        {isLogin ? 'перейти к контактам' : 'войти'}
      </NavLink>
    </div>
  );
};

export default HomePage;
