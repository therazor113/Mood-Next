import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NameField = ({ classes, inputValue, handleChange, valid }) => {
  return (
    <div style={{ width: '100%' }}>
      <FontAwesomeIcon
        icon={faUser}
        className={classes.leftInputIcon}
      />
      <span className={classes.inputCursor} />
      <input
        autoFocus
        type='text'
        name='name'
        aria-label='Name'
        placeholder='Name'
        value={inputValue.name}
        onChange={handleChange}
        style={!valid.name ? { border: '2px solid red' } : {}}
      />
  </div>
  )
}

export default NameField
