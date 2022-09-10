import { FC } from "react";

interface ButtonProps {
    text: string
    callback: () => void
}

const Button: FC<ButtonProps> = ({ text, callback }) => {
    return (
        <button onClick={callback} className='btn'>
            {text}
        </button>
    );
};

export default Button;