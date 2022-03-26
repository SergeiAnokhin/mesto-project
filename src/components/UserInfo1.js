export default class UserInfo {
    constructor (selectors) {
        this._nameSelector = document.querySelector(selectors.name),
        this._infoSelector = document.querySelector(selectors.info)
    }

    getUserInfo(api) {
       return api.getProfile()
    }

    setUserInfo(api) {
        
    }
}