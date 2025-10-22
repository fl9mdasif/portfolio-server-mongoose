
import config from '../config';
import { USER_ROLE } from '../modules/user/constant.user';
import { User } from '../modules/user/mode.user';

const superUser = {
  username: 'superAdmin',
  email: 'superAdmin@gmail.com',
  password: config.super_admin_pass,
  contactNumber: '01605855875',
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  //   isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
