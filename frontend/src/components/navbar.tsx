import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Стили для компонента
import { INavbarMenuItem } from '../utils/interfaces';


export const NavbarMenuArary = (props: {items: Array<INavbarMenuItem>}) => {
  const {items} = props;
  return <ul className='navbar-menu-item-container'>
    {items.map((subitem) => <NavbarMenuItem item={subitem}/>)}
  </ul>;
}

export const NavbarMenuItem = (props: {item: INavbarMenuItem}) => {
  const {item} = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const onItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (item.subitems !== null && item.subitems?.length)
      setIsDropdownOpen(!isDropdownOpen); 
    if (item?.route)
      navigate(item.route);
  }
  return <li className='navbar-menu-item' onClick={onItemClick}>
    {item.text}
    {
      item.subitems !== null && item.subitems?.length && isDropdownOpen ? <NavbarMenuArary items={item.subitems}/>
      : null
    }
  </li>;
}


export const Navbar = (props: {menuItems: Array<INavbarMenuItem>, userStr: string}) => {
  const { menuItems, userStr } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);


  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-dropdown">
        <button 
          className="navbar-dropdown-toggle"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"/>
          </svg>
        </button>
        <div className="navbar-user">
          <span className="navbar-user-name">{userStr}</span>
        </div>
      </div>
      {isDropdownOpen ? <NavbarMenuArary items={menuItems} /> : null}
    </nav>
  );
};

export default Navbar;