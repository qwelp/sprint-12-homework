// eslint-disable-next-line import/prefer-default-export
export class UserInfo {
  setUserInfo(name, job, avatar, id) {
    this.name = name;
    this.job = job;
    this.avatar = avatar;
    this.id = id;
  }

  updateUserInfo(name, job, avatar) {
    // eslint-disable-next-line no-param-reassign
    name.textContent = this.name;
    // eslint-disable-next-line no-param-reassign
    job.textContent = this.job;
    // eslint-disable-next-line no-param-reassign
    avatar.style.backgroundImage = `url(${this.avatar})`;
  }

  getUserInfo() {
    return {
      name: this.name,
      job: this.job,
      avatar: this.avatar,
    };
  }
}
