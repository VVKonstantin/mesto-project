export class UserInfo {
  constructor( {userNameSelector, userAboutSelector, userAvatarSelector} ) {
    this._profileTitleName = document.querySelector(userNameSelector);
    this._profileSubtitle = document.querySelector(userAboutSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo(profileData) {
    this._profileTitleName.textContent = profileData.name;
    this._profileSubtitle.textContent = profileData.about;
    this._profileAvatar.src = profileData.avatar;
  }

  setUserInfo() {

  }
}
