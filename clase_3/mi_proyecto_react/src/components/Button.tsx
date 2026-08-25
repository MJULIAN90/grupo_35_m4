import "../App.css";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isOdd: boolean;
}

const Button = ({ onPress, title, isOdd }: ButtonProps) => {
  return (
    <button
      className="counter"
      style={{
        backgroundColor: `${isOdd ? "lightblue" : "yellow"}`,
        margin: 20,
        padding: 20,
      }}
      onClick={onPress}
    >
      {title}

      {/* 
        props drilling
            <OtroComponente 
                onPress={onPress}
                title= {title}
            /> 
      */}
    </button>
  );
};

export default Button;
