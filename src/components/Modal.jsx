import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        className='fixed inset-0 bg-gray-800 opacity-80'
        onClick={onClose}
      ></div>
      <div className='fixed inset-80 p-10 bg-white'>
        <div className='flex flex-col justify-between h-full'>
          {children}
          <div className='flex justify-center'>{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
