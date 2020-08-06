export class UserInfo {

  setUserInfo(name, job, avatar, id) {
    this.name = name;
    this.job = job;
    this.avatar = avatar;
    this.id = id;
  }

  updateUserInfo(name, job, avatar) {
    name.textContent = this.name;
    job.textContent = this.job;
    avatar.style.backgroundImage = `url(${this.avatar})`;
  }

  getUserInfo() {
    return {
      name: this.name,
      job: this.job,
      avatar: this.avatar
    }
  }
}
