const Span = ({ 
  color = "#000000", 
  size, 
  label = '', 
  weight, 
  number = '', 
  backgroundColor = '', 
  marginBottom, 
  additionalStyle='' 
}) => {

  const styles = {
    color: color,
    backgroundColor: backgroundColor,
    fontSize: `${size}px`,
    transform: 'scaleY(1.1) scaleX(1.01)',
    display: 'inline-block',
  }

  return (
    <span className={`leading-[1.2] ${weight} ${additionalStyle} `} style={styles}>
      {number === ''  ? label : number}
    </span>
  )
}

export default Span