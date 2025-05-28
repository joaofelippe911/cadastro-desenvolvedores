import './style.scss';

import logoImg from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

const SIDEBAR_ITEMS = [
  {
    title: "Desenvolvedores",
    link: "/",
  },
  {
    title: "Níveis",
    link: "/niveis",
  }
]

export function Sidebar() {
  return (
    <div className="sidebar">
      <div
        className='logo-container'
      >
        <img
        className='logo-img'
        src={logoImg}
        />
      </div>

      <div className='sidebar-list'>
      {
        SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
          >
            {item.title}
          </NavLink>
        ))
      }
      </div>
    </div>
  )
}
