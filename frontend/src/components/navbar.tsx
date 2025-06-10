import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Стили для компонента
import { INavbarMenuItem } from '../utils/interfaces';


export const NavbarMenuArary = (props: {openedItem: string | null, onItemClick?: (item: INavbarMenuItem)=>void, items: Array<INavbarMenuItem>}) => {
  const {onItemClick, items, openedItem} = props;
  return <ul className='navbar-menu-item-container'>
    {items.map((subitem) => <NavbarMenuItem openedItem={openedItem} key={subitem.text} onItemClick={onItemClick} item={subitem}/>)}
  </ul>;
}

export const NavbarMenuItem = (props: {openedItem: string | null, onItemClick?: (item: INavbarMenuItem)=>void, item: INavbarMenuItem}) => {
  const {openedItem, onItemClick: onMainItemClick, item} = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const onItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (item.subitems !== null && item.subitems?.length)
      setIsDropdownOpen(!isDropdownOpen);
      if (onMainItemClick){
        onMainItemClick(item);
      }
    if (item?.route){
      navigate(item.route);
    }
  }
  if (openedItem && openedItem.length && openedItem !== item.text)
    return <li className='navbar-menu-item' onClick={onItemClick}>
      {item.text}
    </li>
  return <li className='navbar-menu-item' onClick={onItemClick}>
    {item.text}
    {
      item.subitems !== null && item.subitems?.length && (isDropdownOpen || openedItem && openedItem === item.text) ? <NavbarMenuArary openedItem={openedItem} onItemClick={onMainItemClick} items={item.subitems}/>
      : null
    }
  </li>;
}


export const Navbar = (props: {openedPageTitle: string, menuItems: Array<INavbarMenuItem>, userStr: string}) => {
  const { openedPageTitle, menuItems, userStr } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [openedItem, setOpenedItem] = useState<string | null>(null);

  const onMainItemClick = (item: INavbarMenuItem) => {
    setOpenedItem(item.text);
  };
  // = useCallback(, []);

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
        <div className="navbar-page-title">{openedPageTitle}</div>
        <div className="navbar-user">
          <span className="navbar-user-name">{userStr}</span>
        </div>
      </div>
      {isDropdownOpen ? <NavbarMenuArary openedItem={openedItem} onItemClick={onMainItemClick} items={menuItems} /> : null}
    </nav>
  );
};

export default Navbar;