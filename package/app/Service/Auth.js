import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAccount() {
  return await AsyncStorage.getItem('account');
}

async function setAccount(data) {
  return await AsyncStorage.setItem('account', JSON.stringify(data));
}


async function logout() {
  return await AsyncStorage.removeItem('account');
}


export default {
  logout,
  getAccount,
  setAccount
};