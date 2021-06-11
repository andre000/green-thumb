export default (fn) => {
  const cache = {};
  return async function memoized(arg) {
    const key = Object.values(arg).join("-");
    if (cache[key]) return cache[key];

    const response = await fn(arg);
    if (response) cache[key] = response;

    return response;
  };
};
