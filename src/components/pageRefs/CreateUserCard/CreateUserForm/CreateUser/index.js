const CreateUser = async (handleFetch, inputValue, passHash) => {
  const path = '/UsersApi/CreateUser'
  const body = { name: inputValue.name, password: inputValue.password }
  return await handleFetch(path, 'POST', body)
}

export default CreateUser
