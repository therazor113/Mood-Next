const FetchSignIn = async (handleFetch, inputValue, keepToken) => {
  const path = '/UsersApi/SignInUser'
  return await handleFetch(
    path,
    'POST',
    { name: inputValue.name, password: inputValue.password, keepToken }
  )
}

export default FetchSignIn
