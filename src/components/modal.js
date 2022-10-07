function handleClosePopup(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
    closePopup(evt.currentTarget);
  }
}

function handleClosePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}


//function to open defined popup
export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupEsc);
  popupName.addEventListener('mousedown', handleClosePopup);
}

//function to close the closest parent popup
export function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupEsc);
  popupName.removeEventListener('mousedown', handleClosePopup);
}
