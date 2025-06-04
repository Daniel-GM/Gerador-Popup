const Container = ({ children, additionalStyle='' }) => {
  return (
    <div className={`border-gray-700 border-2 rounded-lg shadow-sm mt-4 ${additionalStyle}`}>
      {children}
    </div>
  )
}

export default Container