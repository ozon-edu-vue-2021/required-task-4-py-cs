export const debounce = (func, delay) => {
  let timer = null;
  return function (...args) {
    return new Promise((res) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => res(func(...args)), delay);
    });
  };
};
