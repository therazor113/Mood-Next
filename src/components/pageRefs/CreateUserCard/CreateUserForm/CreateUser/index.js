const CreateUser = async (handleFetch, inputValue) => {
  const path = '/UsersApi/CreateUser'
  const body = { name: inputValue.name }
  return await handleFetch(path, 'POST', body)
}

export default CreateUser
