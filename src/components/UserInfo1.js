export default class UserInfo {
    constructor ({name, info, avatar}) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent,
            avatar: this._avatar.src,
        }
    }

    setUserInfo(res) {
        this._name.textContent = res.name;
        this._info.textContent = res.about;
        this._avatar.src = res.avatar;
    }
}