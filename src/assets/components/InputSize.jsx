const InputSize = ({ label, valueSize, axis, max, handleConfigLogoChange }) => {
  return (
    <div>
      <h3>{label}: {valueSize[axis]}px</h3>
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