import { isEmpty } from 'lodash';
import api from '../api';

const TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';
const Wallet = 'wallet';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearWallet(wallet = Wallet) {
    return auth.clear(wallet);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getWallet(wallet = Wallet) {
    return auth.get(wallet);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setWallet(value = '', isLocalStorage = false, wallet = Wallet) {
    return auth.set(value, wallet, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },
};

export const loginUrl = `${api.baseUrl}/auth/local`;
export const registerUrl = `${api.baseUrl}/auth/local/register`;
export const authorCreatorUrl = `${api.baseUrl}/authors`;
export const authorUrl = (authorId) => `${api.baseUrl}/authors/${authorId}`;
export const authorWalletUrl = (wallet) => `${api.baseUrl}/authors/?wallet=${wallet}`;

export default auth;