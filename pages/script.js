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
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
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

buttonsClose.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'));
  });
});

// listeners for submit events
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

createInitialCardsBlock(initialCards);
