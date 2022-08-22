const FetchSignIn = async (handleFetch, inputValue) => {
  const path = `/UsersApi/GetUsers/${inputValue.name}`
  return await handleFetch(path, 'GET')
}

export default FetchSignIn
