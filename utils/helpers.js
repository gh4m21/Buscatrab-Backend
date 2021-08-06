exports.isExpiryToken = (tokenExpiry) => {
  if (tokenExpiry * 1000 < Date.now()) {
    return false;
  }

  return true;
};
