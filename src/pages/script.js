// common elements to handle
const buttonsClose = document.querySelectorAll('.popup__button-close');
const cardTemplate = document.querySelector('#card-template').content;
const elements = document.querySelector('.elements');

// elements to handle profile
const profileTitleName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__button-edit');

// elements to handle popup edit profile
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditElement = popupEditProfile.querySelector('.form');
const titleName = popupEditProfile.querySelector('.form__input_type_title-name');
const occupation = popupEditProfile.querySelector('.form__input_type_occupation');

const addCardButton = document.querySelector('.profile__button-add');

// elements to handle popup add card
const popupAddCard = document.querySelector('.popup_type_add');
const formAddCardElement = popupAddCard.querySelector('.form');
const titleCard = popupAddCard.querySelector('.form__input_type_title-card');
const linkCard = popupAddCard.querySelector('.form__input_type_link-card');

//elements to handle popup image
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__image-subtitle');

const popups = document.querySelectorAll('.popup');

function handleClosePopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close'))  {
    closePopup(evt.currentTarget);
  }
}

//function to open defined popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopup);
  popupName.addEventListener('mousedown', handleClosePopup);
}

//function to close the closest parent popup
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopup);
  popupName.removeEventListener('mousedown', handleClosePopup);
}

// function to create card with all necessary listeners
function createCard (item) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardElement.querySelector('.element__caption-text');
  const deleteButton = cardElement.querySelector('.element__button-delete');
  const likeButton = cardElement.querySelector('.element__button-like');

  elementImage.setAttribute('src', item.link);
  elementImage.setAttribute('alt', item.name);
  elementCaption.textContent = item.name;

  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });

  elementImage.addEventListener('click', () => {
    openPopup(popupImage);
    imageInPopup.src = elementImage.src;
    imageInPopup.alt = elementImage.alt;
    captionImage.textContent = elementCaption.textContent;
  });

  return cardElement;
}

function addCard (item, container) {
  const cardElement = createCard(item);

  container.prepend(cardElement);
}

// handler to submit edit profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = titleName.value;
  profileSubtitle.textContent = occupation.value;
  closePopup(popupEditProfile);
}

function createCardObject() {
  const card = {};
  card.name = titleCard.value || 'Default Picture';
  card.link = linkCard.value || 'images/example-img.jpg';
  return card;
}

// handler to submit add card
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(createCardObject(), elements);
  titleCard.value = '';
  linkCard.value = '';
  closePopup(popupAddCard);
}

function createInitialCardsBlock(cards) {
  cards.forEach((item) => {
    addCard(item, elements)});
}

// listeners for click events
profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  titleName.value = profileTitleName.textContent;
  occupation.value = profileSubtitle.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// listeners for submit events
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

createInitialCardsBlock(initialCards);

//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------

const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('form__button-submit_inactive');
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('form__button-submit_inactive');
  }
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
};

const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button-submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
