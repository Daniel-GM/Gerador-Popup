const InputSize = ({ label, valueSize, axis, max, handleConfigLogoChange }) => {
  return (
    <>
      <h3>{label}</h3>
      <div className='flex gap-2 w-full'>
        <input
          type="range"
          min={0}
          max={max}
          value={valueSize[axis]}
          onChange={(e) => handleConfigLogoChange(e, axis)}
        />
        <h4>{valueSize[axis]}px</h4>
      </div>
    </>
  )
}

export default InputSize