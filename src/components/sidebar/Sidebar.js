import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav } from 'reactstrap';
import {
  routeToLabel,
  BASE_URL,
  DASHBOARD,
  PRODUCTS,
  ORDERS,
  USERS,
  REPORTS,
  INTEGRATIONS,
  ACCOUNT,
  BANK_ACCOUNTS,
  TRANSACTIONS,
} from '../../common/constants/RouteConstants';
import logo from '../../assets/logo.png';

export default function Sidebar(props) {
  const { toggleSidenav, sidenavOpen } = props;

  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show');
    }
  };

  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show');
      document.body.classList.add('g-sidenav-hidden');
    }
  };

  // On mobile the sidebar will autoclose when a user navigates
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      toggleSidenav();
    }
  };

  const scrollBarInner = (
    <div className='scrollbar-inner'>
      <div className='sidenav-header d-flex align-items-center'>
        <NavbarBrand to={`${BASE_URL}/${DASHBOARD}`} tag={Link}>
          <img alt={'Home'} className='navbar-brand-img' src={logo} />
        </NavbarBrand>

        <div className='ml-auto'>
          <div className={`sidenav-toggler d-none d-xl-block ${sidenavOpen ? 'active' : ''}`} onClick={toggleSidenav}>
            <div className='sidenav-toggler-inner'>
              <i className='sidenav-toggler-line' />
              <i className='sidenav-toggler-line' />
              <i className='sidenav-toggler-line' />
            </div>
          </div>
        </div>
      </div>

      <div className='navbar-inner'>
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <NavItem>
              <NavLink to={`${BASE_URL}/${DASHBOARD}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-tachometer-alt text-primary'} />
                <span className='nav-link-text'>{routeToLabel(DASHBOARD)}</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to={`${BASE_URL}/${PRODUCTS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-ring text-primary'} />
                <span className='nav-link-text'>{routeToLabel(PRODUCTS)}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${BASE_URL}/${ORDERS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-parachute-box text-primary'} />
                <span className='nav-link-text'>{routeToLabel(ORDERS)}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${BASE_URL}/${USERS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-users text-primary'} />
                <span className='nav-link-text'>{routeToLabel(USERS)}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${BASE_URL}/${REPORTS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-file-invoice text-primary'} />
                <span className='nav-link-text'>{routeToLabel(REPORTS)}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={`${BASE_URL}/${INTEGRATIONS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                <i className={'fas fa-network-wired text-primary'} />
                <span className='nav-link-text'>{routeToLabel(INTEGRATIONS)}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-toggle='collapse' aria-expanded={true} className={'active'} onClick={closeSidenav}>
                <i className={'fas fa-cog text-primary'} />
                <span className='nav-link-text'>Accounts</span>
              </NavLink>
              <Collapse isOpen={true}>
                <Nav className={'nav-sm flex-column'}>
                  <NavItem>
                    <NavLink to={`${BASE_URL}/${ACCOUNT}/${BANK_ACCOUNTS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                      <i className={'fas fa-money-check-alt text-primary'} />
                      <span className='nav-link-text'>{routeToLabel(BANK_ACCOUNTS)}</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={`${BASE_URL}/${ACCOUNT}/${TRANSACTIONS}`} tag={NavLinkRRD} onClick={closeSidenav}>
                      <i className={'fas fa-file-invoice text-primary'} />
                      <span className='nav-link-text'>{routeToLabel(TRANSACTIONS)}</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </div>
  );

  return (
    <Navbar
      className='sidenav navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white'
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      {navigator.platform.indexOf('Win') > -1 ? <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar> : scrollBarInner}
    </Navbar>
  );
}
