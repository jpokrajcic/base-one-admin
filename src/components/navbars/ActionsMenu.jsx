import React, { useState } from 'react';
import { Col, DropdownMenu, DropdownToggle, Row, Dropdown } from 'reactstrap';
import history from '../../common/history';
import { BASE_URL, USERS, NEW_USER } from '../../common/constants/RouteConstants';

export default function ActionsMenu(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function navigationHandler(event, target) {
    if (target === NEW_USER) {
      history.push(`${BASE_URL}/${USERS}/${NEW_USER}`);
    }

    toggle();
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className='nav-link' color='' tag='a'>
        <i className='fas fa-ellipsis-v' />
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu-lg dropdown-menu-light' right>
        <Row className='shortcuts px-4'>
          <Col className='shortcut-item' onClick={(e) => navigationHandler(e, NEW_USER)} xs='6' tag='a'>
            <span className='shortcut-media avatar rounded-circle bg-green'>
              <i className='fas fa-building'></i>
            </span>
            <small>New user</small>
          </Col>
        </Row>
      </DropdownMenu>
    </Dropdown>
  );
}
