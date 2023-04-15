import { useNavigate } from 'react-router-dom';
import css from './ButtonBack.module.css';
const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <button className={css.button} onClick={() => navigate(-1)}>
      ← Go back
    </button>
  );
};

export default ButtonBack;
