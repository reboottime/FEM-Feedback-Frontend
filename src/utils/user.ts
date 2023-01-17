export const isAdminUser = (user: TUser | null) => {
  if (user) {
    return user.role === 'admin';
  }

  return false;
};
