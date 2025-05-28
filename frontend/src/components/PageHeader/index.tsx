import { Link } from 'react-router-dom';
import './style.scss';

interface IProps {
  title: string;
  buttonText?: string;
  buttonTo?: string;
  backTo?: string;
}

export default function PageHeader({
  title,
  buttonText,
  buttonTo,
  backTo,
}: IProps) {
  return (
    <div className='list-page-header-container'>
      <div className="title-container">
        {
          backTo && (
            <Link to={backTo}>
              Voltar
            </Link>
          )
        }

        <h1>{title}</h1>
      </div>

      {
        buttonText && buttonTo && (
          <Link to={buttonTo}>
            {buttonText}
          </Link>
        )
      }
    </div>
  )
}
