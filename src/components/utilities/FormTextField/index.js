const FormTextField = ({ handleChange, inputEntry, textLength, classes, handleEnter }) => {
  return (
  <div className={classes.textAreaContainer}>
    <textarea
      name='message'
      aria-label='Journal'
      placeholder='Whats on your mind?'
      value={inputEntry}
      onChange={handleChange}
    />
    <p className={classes.textLength}>{textLength}</p>
  </div>
  )
}

export default FormTextField
