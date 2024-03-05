import React, { useState } from 'react';
import insertIcon from "../../assets/insert-icon.svg";
import generateIcon from "../../assets/generate-icon.svg";
import regenerateIcon from "../../assets/regenerate-icon.svg";

interface Message {
  role: string;
  content: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultResponse =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

export const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [generated, setGenerated] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value.trim()) {
      setInputError("Prompt is required");
    } else {
      setInputError("");
    }
    setInputValue(value);
  };

  const handleGenerate = () => {
    if (generated) return;
    if (!inputValue.trim()) {
      setInputError("Prompt is required");
      return;
    } else {
      setInputError("");
      setChat((prev) => ([
        ...prev,
        { role: "user", content: inputValue },
        { role: "system", content: defaultResponse }
      ]));
      setGenerated(true);
      setInputValue("");
    }
  };

  const handleInsert = () => {
    let sendBtn = document.querySelector('.msg-form__send-button');
    sendBtn.removeAttribute("disabled");
    let messagePlaceholder = document.querySelector('.msg-form__placeholder');
    messagePlaceholder.classList.remove("msg-form__placeholder");
    const messageField = document.querySelector('.msg-form__contenteditable');
    messageField.innerHTML = `<p>${chat.at(-1).content}</p>`;
    setGenerated(false);
    setChat([]);
    setIsOpen(false);
  };

  const handleBackdropClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal backdrop */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleBackdropClick}></div>
          {/* Modal content */}
          <div className="w-450 bg-white p-8 rounded shadow-lg" style={{ zIndex: 1, width: 450 }}>
            {/* Modal header */}
            <div className="mb-4">
              {chat.map((item, index) => (
                <div className={`${item.role === "user" && "flex justify-end"}`} key={index}>
                  <div style={{ maxWidth: "70%" }} className={`text-gray-600 max-w-70 w-fit-content mb-4 ${item.role === "user" ? "bg-gray-300" : "bg-blue-200"} px-3 py-2 text-xl font-normal rounded-md`}>{item.content}</div>
                </div>
              ))}
            </div>
            {/* Input field */}
            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="h-35 text-sm w-full px-3 py-2 border rounded-md"
                style={{ height: 35, fontSize: 12, outline: inputError ? "2px solid #e50914" : "" }}
                placeholder="Your prompt"
              />
              {inputError ? <div style={{ color: "#e50914", fontSize: 9, fontWeight: 700, padding: '2.5px' }}>{inputError}</div> : null}
            </div>
            <div className="flex justify-end">
              {generated &&
                <button
                  className="text-xl mr-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 focus:outline-none flex items-center gap-2"
                  onClick={handleInsert}
                >
                  <img src={insertIcon} alt="Insert Icon" className="h-4" />
                  Insert
                </button>
              }
              <button
                className="text-xl px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center gap-2 "
                onClick={handleGenerate}
              >
                <img src={generated ? regenerateIcon : generateIcon} alt="Generate Icon" className="h-4" />
                {generated ? "Regenerate" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
