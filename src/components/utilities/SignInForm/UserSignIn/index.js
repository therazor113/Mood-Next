const UserSignIn = async (handleFetch, inputValue) => {
  const path = `/UsersApi/GetUsers/${inputValue}`
  return await handleFetch(path, 'GET')
}

export default UserSignIn
