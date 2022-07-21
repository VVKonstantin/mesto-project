const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// common elements to handle
const buttonsClose = document.querySelectorAll('.popup__button-close');

// elements to handle profile
const profileTitleName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__button-edit');

// elements to handle popup edit profile
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditElement = popupEditProfile.querySelector('.form');
const titleName = popupEditProfile.querySelector('.form__field_type_title-name');
const occupation = popupEditProfile.querySelector('.form__field_type_occupation');

const addCardButton = document.querySelector('.profile__button-add');

// elements to handle popup add card
const popupAddCard = document.querySelector('.popup_type_add');
const formAddCardElement = popupAddCard.querySelector('.form');
const titleCard = popupAddCard.querySelector('.form__field_type_title-card');
const linkCard = popupAddCard.querySelector('.form__field_type_link-card');

//elements to handle popup image
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__image-subtitle');

//function to open defined popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

//function to close the closest parent popup
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

// function to create card with all necessary listeners
function createCard (item) {

  const cardTemplate = document.querySelector('#card-template').content;
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

function addCard (item) {
  const cardElement = createCard(item);
  const elements = document.querySelector('.elements');

  elements.prepend(cardElement);
}

// handler to submit edit profile
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleName.textContent = titleName.value;
  profileSubtitle.textContent = occupation.value;
  closePopup(evt);
}

function createCardObject() {
  const card = {}; 
  card.name = titleCard.value || 'Default Picture';
  card.link = linkCard.value || 'images/example-img.jpg';
  return card;
}

// handler to submit add card 
function formAddSubmitHandler(evt) {
  evt.preventDefault();

  addCard(createCardObject());
  titleCard.value = '';
  linkCard.value = '';
  closePopup(evt);
}

function initialCardsCreate(cards) {
  cards.forEach(addCard);
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

buttonsClose.forEach(btn => {
  btn.addEventListener('click', closePopup);
});

// listeners for submit events
formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddCardElement.addEventListener('submit', formAddSubmitHandler);
  
initialCardsCreate(initialCards);