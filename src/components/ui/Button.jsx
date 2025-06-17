const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#3E74C7] hover:bg-[#3E74C7]/90 text-white font py-2 px-4 rounded-md transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;