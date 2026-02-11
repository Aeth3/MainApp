import { asyncStorageAdapter as storage } from "../../src/infra/storage/asyncStorageAdapter";

async function get(key, defaultValue = null) {
  try {
    let value = await storage.getItem(key);

    if (value !== null) {
      value = JSON.parse(value);
    }

    return value ?? defaultValue;
  } catch (error) {
    console.log("Could not read data: " + key, error);
    return defaultValue;
  }
}

async function set(key, value) {
  try {
    return await storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Could not save data: " + key, error);
  }
}

async function remove(key) {
  try {
    return await storage.removeItem(key);
  } catch (error) {
    console.log("Could not remove data: " + key, error);
  }
}

async function clear() {
  try {
    return await storage.clear();
  } catch (error) {
    console.log("Could not clear data", error);
  }
}

export default {
  get,
  set,
  clear,
  remove,
};
