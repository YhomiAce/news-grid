interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="btn btn-active btn-neutral" {...props}>
      {children}
    </button>
  );
};

export default Button;
