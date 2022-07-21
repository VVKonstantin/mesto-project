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
// elements to handle profile
const profileTitleName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__button-edit');

// elements to handle popup edit profile
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditElement = popupEditProfile.querySelector('.form');
const titleName = popupEditProfile.querySelector('.form__field_type_title-name');
const occupation = popupEditProfile.querySelector('.form__field_type_occupation');
const closeFormEditButton = popupEditProfile.querySelector('.popup__button-close');

const addCardButton = document.querySelector('.profile__button-add');

// elements to handle popup add card
const popupAddCard = document.querySelector('.popup_type_add');
const formAddCardElement = popupAddCard.querySelector('.form');
const titleCard = popupAddCard.querySelector('.form__field_type_title-card');
const linkCard = popupAddCard.querySelector('.form__field_type_link-card');
const closeFormAddButton = popupAddCard.querySelector('.popup__button-close');

//elements to handle popup image
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__image-subtitle');
const closeImageButton = popupImage.querySelector('.popup__button-close');

//function to open defined popup
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

//function to close the closest parent popup
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

// function to add card with all necessary listeners
function addCard (item) {

  const elements = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  const deleteButton = cardElement.querySelector('.element__button-delete');
  const likeButton = cardElement.querySelector('.element__button-like');
  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardElement.querySelector('.element__caption-text');

  cardElement.querySelector('.element__image').setAttribute('src', item.link);
  cardElement.querySelector('.element__image').setAttribute('alt', item.name);
  cardElement.querySelector('.element__caption-text').textContent = item.name;

  deleteButton.addEventListener('click', function(){
    deleteButton.closest('.element').remove();
  });

  likeButton.addEventListener('click', function(evt){
    evt.target.classList.toggle('element__button-like_active');
  });

  elementImage.addEventListener('click', function(){
    openPopup(popupImage);
    imageInPopup.src = elementImage.src;
    captionImage.textContent = elementCaption.textContent;
  });

  elements.prepend(cardElement);
}


// listener for edit profile button
profileEditButton.addEventListener('click', function(){
  openPopup(popupEditProfile);
  titleName.value = profileTitleName.textContent;
  occupation.value = profileSubtitle.textContent;
});

// listener for close edit profile form
closeFormEditButton.addEventListener('click', closePopup);

// handler for submit edit profile
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileTitleName.textContent = titleName.value;
  profileSubtitle.textContent = occupation.value;
  closePopup(evt);
}

// listener for submit edit profile
formEditElement.addEventListener('submit', formEditSubmitHandler);

// listener for add card button
addCardButton.addEventListener('click', function(){
  openPopup(popupAddCard);
});

// listener for close add card form
closeFormAddButton.addEventListener('click', closePopup);

function formAddSubmitHandler(evt) {
  evt.preventDefault();

  const card = {}; 
  card.name = titleCard.value || 'Default Picture';
  card.link = linkCard.value || 'images/example-img.jpg';

  addCard(card);
  titleCard.value = '';
  linkCard.value = '';
  closePopup(evt);
}

// listener for submit add card form
formAddCardElement.addEventListener('submit', formAddSubmitHandler);


closeImageButton.addEventListener('click', closePopup);

function initialCardsCreate(cards) {
  cards.forEach(addCard);
}

initialCardsCreate(initialCards);