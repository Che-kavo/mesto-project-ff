export function openModal(modal) {
  modal.style.visibility = 'visible'; 
  requestAnimationFrame(() => {
    modal.classList.add('popup_is-opened');
  });
 
  document.addEventListener('keydown', closePopupOnEsc);
}
 
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  setTimeout(() => {
    if (!modal.classList.contains('popup_is-opened')) {
      modal.style.visibility = 'hidden'; 
    }
  }, 300); 
  document.removeEventListener('keydown', closePopupOnEsc);
}
 

export function closePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}
 
export function setupPopupListeners(popup) {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
} 

