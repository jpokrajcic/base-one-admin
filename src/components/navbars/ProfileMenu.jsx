import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from 'reactstrap';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import history from '../../common/history';
import { AUTH, AUTH_LOGIN, BASE_URL, ACCOUNT, USERS, EDIT_USER } from '../../common/constants/RouteConstants';
import logo from '../../assets/logo.png';

function ProfileMenu(props) {
  const { Store } = props;

  const userProfile = Store.userProfile;

  function logout(e) {
    e.preventDefault();
    Store.logout();
    history.push(`${BASE_URL}/${AUTH}/${AUTH_LOGIN}`);
  }

  function editUserProfile() {
    if (userProfile) history.push(`${BASE_URL}/${ACCOUNT}/${USERS}/${userProfile.id}/${EDIT_USER}`);
  }

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className='nav-link pr-0' color='' tag='a'>
        <Media className='align-items-center'>
          <span className='avatar avatar-sm rounded-circle'>
            <img alt='...' src={logo} />
          </span>
          <Media className='ml-2 d-none d-lg-block'>
            <span className='mb-0 text-sm font-weight-bold'>{userProfile.name}</span>
          </Media>
        </Media>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem className='noti-title' header tag='div'>
          <h6 className='text-overflow m-0'>Welcome!</h6>
        </DropdownItem>
        <DropdownItem href='#pablo' onClick={editUserProfile}>
          <i className='fas fa-user'></i>
          <span>Edit profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem href='' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i>
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

ProfileMenu.propTypes = {
  Store: PropTypes.object.isRequired,
};

export default inject((root) => ({ Store: root.RootStore.authStore }))(observer(ProfileMenu));
