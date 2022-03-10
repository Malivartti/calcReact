function Button(props) {
  const value = props.value;
  let colorClass = ['/', '*', '-', '+', '='].includes(value) ? 'App__btn_sign' : '';
  let widthButton = value === 'c' ? 'App__btn_c' : value === '0' ? 'App__btn_z' : '';

  return (
    <li className={widthButton}>
      <button 
        className={'btn-reset App__btn ' + colorClass} 
        onClick={() => props.handleClick(value)}>
        {value}
      </button>
    </li>
  )
}

export default Button;