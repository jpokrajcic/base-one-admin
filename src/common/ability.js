import { AbilityBuilder } from '@casl/ability';
import { Ability } from '@casl/ability';
import { MANAGE_USER_PERMISSIONS } from './constants/PermissionConstants';
export const VIEW = 'view';
export const CREATE = 'create';
export const EDIT = 'edit';
export const DELETE = 'delete';
export const ASSIGN = 'assign';

export const ADMIN_USER_ROLES = 'Admin User Roles';
export const NON_ADMIN_USER_ROLES = 'Non Admin User Roles';
export const USER = 'User';
export const USERS = 'Users';

export const superUser = {
  role: [
    {
      permissions: [MANAGE_USER_PERMISSIONS.CAN_CREATE_ADMIN_USERS, MANAGE_USER_PERMISSIONS.CAN_CREATE_NON_ADMIN_USERS],
    },
  ],
};

const ability = new Ability([]);

export function updateAbility(ability, user = superUser) {
  const { can, rules } = new AbilityBuilder();

  for (const permission of user.role.permissions) {
    switch (permission) {
      case MANAGE_USER_PERMISSIONS.CAN_CREATE_ADMIN_USERS:
        can(ASSIGN, ADMIN_USER_ROLES); // 'Super admin & Admin' select options on User edit screen
        can(VIEW, USERS); // 'Users' button in side menu
        can(CREATE, USER); // 'New user' button on Users screen
        can(EDIT, USER); // 'Edit' button or click on user's name on Users screen table
        can(DELETE, USER); // 'Delete' button on user form
        break;
      case MANAGE_USER_PERMISSIONS.CAN_CREATE_NON_ADMIN_USERS:
        can(ASSIGN, NON_ADMIN_USER_ROLES); // 'Account manager' select options on User edit screen
        can(VIEW, USERS); // 'Users' button in side menu
        can(CREATE, USER); // 'New user' button on Users screen
        can(EDIT, USER); // 'Edit' button or click on user's name on Users screen table
        can(DELETE, USER); // 'Delete' button on user form
        break;
      default:
        break;
    }
  }

  ability.update(rules);
}

export default ability;
