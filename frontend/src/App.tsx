import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { Router } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
