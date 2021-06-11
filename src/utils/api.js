import memoize from "./memoize";

const send = async ({ sun, water, pets }) => {
  try {
    const response = await fetch(
      `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export default {
  send: memoize(send)
};
