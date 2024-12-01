interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Spinner: React.FC<SpinnerProps> = ({ ...props }) => {
  return <span className="loading loading-spinner text-info loading-lg" {...props}></span>;
};

export default Spinner;
