export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupOnEsc);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.classList.remove("popup_is-animated");
  document.removeEventListener("keydown", closePopupOnEsc);
}

export function closePopupOnEsc(event) {
  if (event.key === "Escape") {
      const openPopup = document.querySelector(".popup_is-opened");
      if (openPopup) {
          closeModal(openPopup);
      }
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
      closeModal(event.currentTarget);
  }
}

export function setupPopupListeners(popup) {
  popup.addEventListener("mousedown", handleOverlayClick);
  
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(popup));
  }

  popup.classList.add("popup_is-animated"); 
}
