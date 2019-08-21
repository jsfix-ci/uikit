// @flow

import * as yup from 'yup';
import { firstName, lastName, email, role } from 'global/utils/form/validations';

export type RoleKey = 'ADMIN' | 'COLLABORATOR' | 'SUBMITTER';

export const RoleDisplayName: { [key: RoleKey]: string } = {
  ADMIN: 'Administrator',
  COLLABORATOR: 'Collaborator',
  SUBMITTER: 'Data Submitter',
};

export const UserModel = {
  firstName: '',
  lastName: '',
  email: '',
  role: ('COLLABORATOR': RoleKey),
};

export const userSchema = yup.object().shape({
  firstName,
  lastName,
  email,
  role,
});
