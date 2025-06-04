const TextContainer = ({ children, additionalStyle='' }) => {
  return (
    <div 
      className={`flex flex-col items-center text-center w-[795px] ${additionalStyle}`}
    >
      {children}
    </div>
  )
}

export default TextContainer