import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavItem, NavLink, Nav, Container } from 'reactstrap';

import ActionsMenu from './ActionsMenu';
import ProfileMenu from './ProfileMenu';

function TopMainNavbar(props) {
  const { theme = 'dark', sidenavOpen = false, toggleSidenav = () => {} } = props;

  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add('g-navbar-search-showing');
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-showing');
      document.body.classList.add('g-navbar-search-show');
    }, 150);
    setTimeout(function () {
      document.body.classList.add('g-navbar-search-shown');
    }, 300);
  };

  return (
    <>
      <Navbar className='navbar-top navbar-expand border-bottom navbar-dark bg-primary'>
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className='align-items-center ml-md-auto' navbar>
              <NavItem className='d-xl-none'>
                <div
                  className={classnames(
                    'pr-3 sidenav-toggler',
                    { active: sidenavOpen },
                    { 'sidenav-toggler-dark': theme === 'dark' },
                  )}
                  onClick={toggleSidenav}
                >
                  <div className='sidenav-toggler-inner'>
                    <i className='sidenav-toggler-line' />
                    <i className='sidenav-toggler-line' />
                    <i className='sidenav-toggler-line' />
                  </div>
                </div>
              </NavItem>
              <NavItem className='d-sm-none'>
                <NavLink onClick={openSearch}>
                  <i className='ni ni-zoom-split-in' />
                </NavLink>
              </NavItem>
              {/* <NotificationsMenu />*/}
              <ActionsMenu />
            </Nav>
            <Nav className='align-items-center ml-auto ml-md-0' navbar>
              <ProfileMenu />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

TopMainNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
};

export default TopMainNavbar;
