'use strict';
const postData = async (url, data) => {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return await response.json();
};

const getResourse = async (url) => {
  const response =  await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return await response.json();
};

export {postData, getResourse};
