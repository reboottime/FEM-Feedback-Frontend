export const isAdminUser = (user: Entities.TUser | null) => {
  if (user) {
    return user.role === 'admin';
  }

  return false;
};
