import './pages/index.css';

// eslint-disable-next-line import/extensions
import { Api } from './class/Api.js';
// eslint-disable-next-line import/extensions
import { FormValidator } from './class/FormValidator.js';
// eslint-disable-next-line import/extensions,import/named
import { Popup } from './class/Popup.js';
// eslint-disable-next-line import/extensions
import { UserInfo } from './class/UserInfo.js';
// eslint-disable-next-line import/extensions,import/named
import { Card } from './class/Card.js';
// eslint-disable-next-line import/extensions
import { CardList } from './class/CardList.js';

// eslint-disable-next-line func-names
(function () {
  // eslint-disable-next-line no-undef
  const placesList = document.querySelector('.places-list');

  const config = {
    headers: {
      authorization: '53d4c5ac-ee89-496c-a208-f65033f03eab',
      'Content-Type': 'application/json',
    },
  };

  // Шаблоны
  // eslint-disable-next-line no-undef
  const templateCart = document.querySelector('#popup-cart-template');

  // Popups
  // eslint-disable-next-line no-undef
  const popupAddCart = document.querySelector('#new-place');
  // eslint-disable-next-line no-undef
  const popupEditProfile = document.querySelector('#edit-profile');
  // eslint-disable-next-line no-undef
  const popupViewImage = document.querySelector('#view-img');
  // eslint-disable-next-line no-undef
  const popupAvatar = document.querySelector('#edit-avatar');

  // Inputs добавления карточки
  const nameAddCartInput = popupAddCart.querySelector('[name=nameNew]');
  const linkAddCartInput = popupAddCart.querySelector('[name=linkNew]');

  // Inputs профиля
  const nameInput = popupEditProfile.querySelector('[name=nameEdit]');
  const jobInput = popupEditProfile.querySelector('[name=jobEdit]');

  // Inputs avatar
  const avatarInput = popupAvatar.querySelector('[name=avatar]');

  // Данные профиля
  // eslint-disable-next-line no-undef
  const nameEditProfile = document.querySelector('.user-info__name');
  // eslint-disable-next-line no-undef
  const jobEditProfile = document.querySelector('.user-info__job');
  // eslint-disable-next-line no-undef
  const avatarEditProfile = document.querySelector('.user-info__photo');

  // Кнопки
  // eslint-disable-next-line no-undef
  const btnOpenPopupAddCart = document.querySelector('.user-info__button');
  // eslint-disable-next-line no-undef
  const btnOpenPopupEditProfile = document.querySelector('.user-info__edit');
  // eslint-disable-next-line no-undef
  const btnOpenPopupEditAvatar = document.querySelector('.user-info__photo');

  // Объявление классов
  const addPopup = new Popup(popupAddCart);
  const profilePopup = new Popup(popupEditProfile);
  const avatarPopup = new Popup(popupAvatar);
  const imagePopup = new Popup(popupViewImage);
  const userInfo = new UserInfo();

  // eslint-disable-next-line no-undef
  const apiUrl = NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11' : 'http://praktikum.tk/cohort11';

  const api = new Api(apiUrl, config);

  // Ошибки формы
  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка',
  };

  const formValidatorEditProfile = new FormValidator(popupEditProfile.querySelector('form'), errorMessages);
  // eslint-disable-next-line no-unused-vars
  const formValidatorEditAddCart = new FormValidator(popupAddCart.querySelector('form'), errorMessages);
  const formValidatorEditAvatar = new FormValidator(popupAvatar.querySelector('form'), errorMessages);

  function viewImage(link) {
    imagePopup.open();
    popupViewImage.querySelector('.popup__content-image').setAttribute('src', link);
  }

  function createCart(item) {
    return new Card(item, templateCart, viewImage, api, userInfo).create();
  }

  function hideError(form) {
    form.resetErrors();
  }

  const cartList = new CardList(placesList, [], createCart);
  cartList.render();

  api.getInitialUser().then((user) => {
    // eslint-disable-next-line no-underscore-dangle
    userInfo.setUserInfo(user.name, user.about, user.avatar, user._id);
    userInfo.updateUserInfo(nameEditProfile, jobEditProfile, avatarEditProfile);

    api.getInitialCards().then((items) => {
      // eslint-disable-next-line no-underscore-dangle
      items.filter((item) => item.owner._id === userInfo.id).forEach((item) => {
        cartList.addCard(item);
      });
      // eslint-disable-next-line no-console
    }).catch((err) => console.log('ERROR', err.message));
    // eslint-disable-next-line no-console
  }).catch((err) => console.log('ERROR', err.message));

  btnOpenPopupAddCart.addEventListener('click', () => addPopup.open());

  btnOpenPopupEditAvatar.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    avatarInput.value = getUserInfo.avatar;
    avatarPopup.open(hideError(formValidatorEditAvatar));
  });

  popupAddCart.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const submit = popupAddCart.querySelector('[type=submit]');
    submit.textContent = 'Загрузка...';

    const newCart = {
      name: nameAddCartInput.value,
      link: linkAddCartInput.value,
    };

    api.addCart(nameAddCartInput.value, linkAddCartInput.value).then((res) => {
      submit.textContent = 'Сохранить';
      popupAddCart.querySelector('form').reset();
      addPopup.close();

      // eslint-disable-next-line no-underscore-dangle
      cartList.addCard(newCart, res._id);
      // eslint-disable-next-line no-console
    }).catch((err) => console.log('ERROR', err.message));
  });

  btnOpenPopupEditProfile.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();

    profilePopup.open(hideError(formValidatorEditProfile));

    nameInput.value = getUserInfo.name;
    jobInput.value = getUserInfo.job;
  });

  popupAvatar.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const getUserInfo = userInfo.getUserInfo();

    const submit = popupAvatar.querySelector('[type=submit]');
    submit.textContent = 'Загрузка...';

    api.editAvatar(avatarInput.value)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        userInfo.setUserInfo(getUserInfo.name, getUserInfo.job, avatarInput.value);
        userInfo.updateUserInfo(nameEditProfile, jobEditProfile, avatarEditProfile);
        avatarPopup.close();
        submit.textContent = 'Сохранить';
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('ERROR', err.message));
  });

  popupEditProfile.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const getUserInfo = userInfo.getUserInfo();
    const submit = popupEditProfile.querySelector('[type=submit]');
    submit.textContent = 'Загрузка...';

    // eslint-disable-next-line no-unused-vars
    api.editUser(nameInput.value, jobInput.value).then((res) => {
      userInfo.setUserInfo(nameInput.value, jobInput.value, getUserInfo.avatar);
      userInfo.updateUserInfo(nameEditProfile, jobEditProfile, avatarEditProfile);

      formValidatorEditProfile.resetErrors();
      profilePopup.close();
      submit.textContent = 'Сохранить';
      // eslint-disable-next-line no-console
    }).catch((err) => console.log('ERROR', err.message));
  });
}());
