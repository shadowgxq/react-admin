import { localStoreageKey } from "@/consts";

export const isFalsy = (value: any) => (value === 0 ? false : !!value);

export const clearObject = (object: any) => {
    const temp = { ...object }
    Object.keys(temp).forEach(key => {
        const value = temp[key]
        if (isFalsy(value)) {
            delete temp[key]
        }
    })
    return temp
}

export const getToken = () => {
    return localStorage.getItem(localStoreageKey);
}
export const clearToken = () => {
    return localStorage.removeItem(localStoreageKey);
}

//clear undefined data in object
export const deleteParmas = (data) => {
    let result = {};
    for (let i in data) {
      if (data[i] != null && data[i] !== "") {
        result[i] = data[i];
      }
    }
    return result;
  };