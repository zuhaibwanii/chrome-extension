import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import icon from "../assets/ai-icon.svg"

import { CountButton } from "~features/CountButton"
import { Modal } from "~features/Modal"
export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('focusout', handleFocusOut, true);
  }, [])




  const handleFocus = (event: FocusEvent) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains("msg-form__contenteditable")) {
      let img = document.createElement('img');
      img.id = 'ai-icon';
      img.style.position = "absolute";
      img.style.bottom = "10px";
      img.style.right = "58px";
      img.style.height = "30px";
      img.style.width = "30px";
      img.style.cursor = "pointer";
      img.src = icon
      img.alt = 'icon'
      img.onclick = handleShowModal
      targetElement.appendChild(img);
    }
  };

  const handleFocusOut = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("msg-form__contenteditable")) {
      const appendedComponent = document.querySelector('#ai-icon');
      if (appendedComponent) appendedComponent.parentNode?.removeChild(appendedComponent);

    }
  };

  const handleShowModal = () => {
    console.log('handleShowModal clicked!');
    setIsOpen(true)

  }

  return (
    <div className="z-50 flex fixed top-32 right-8">
      <CountButton />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default PlasmoOverlay
