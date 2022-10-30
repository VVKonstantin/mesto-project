export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._profileTitleName = document.querySelector(userNameSelector);
    this._profileSubtitle = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const profileData = {
       name: this._profileTitleName.textContent,
       about: this._profileSubtitle.textContent
    }
    return profileData
  }

  setUserInfo(profileData) {
    this._profileTitleName.textContent = profileData.name;
    this._profileSubtitle.textContent = profileData.about;
  }
}
