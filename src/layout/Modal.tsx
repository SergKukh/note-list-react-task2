import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

interface ModalProps extends PropsWithChildren {
    close: () => void
    width?: string
}

const Modal: FC<ModalProps> = ({ children, close, width }) => {
    const clickHandler = () => {
        close();
    }

    const childrenClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }

    return (
        <div className="modal" onClick={clickHandler}>
            <div
                onClick={childrenClickHandler}
                style={{ width: `${width ? width : ''}` }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;