export const getListFromStorage = (key: string): any[] => {
  try {
    const str = localStorage.getItem(key);
    if (str) {
      const arr = JSON.parse(str);
      return arr;
    } else {
      return [];
    }
  } catch {
    localStorage.removeItem(key);
    return [];
  }
};
