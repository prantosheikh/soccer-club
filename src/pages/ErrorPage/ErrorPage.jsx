import { Link } from 'react-router-dom';
import img from '../../assets/ErrorPage/20602785_6325254.jpg';

const ErrorPage = () => {
    return (
      <div>
        <img src={img} alt="" />
        <div className='text-center'>
          <button className="btn btn-primary ">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </div>
    );
};

export default ErrorPage;