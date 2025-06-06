const InputSize = ({ label, valueSize, axis, max, handleConfigLogoChange }) => {
  let textLabel
  
  if(valueSize["width"] === "auto")
    textLabel = "Tamanho máximo"
  else if(valueSize["height"] === "auto")
    textLabel = "Altura automática"
  else
    textLabel = `${valueSize[axis]}px`
  
  return (
    <div>
      <h3>{label}: {textLabel === "Altura automática" && axis === "width" ? `${valueSize[axis]}px` : textLabel }</h3>
      <input
        type="range"
        min={0}
        max={max}
        value={valueSize[axis]}
        onChange={(e) => handleConfigLogoChange(e, axis)}
        className="w-full"
      />
    </div>
  )
}

export default InputSize