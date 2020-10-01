import Prismic from "prismic-javascript";

export const apiEndpoint = process.env.ENDPOINT_API_PRISMIC;

export const client = (req = null) => {
  const options = req ? { req } : null;

  return Prismic.client(apiEndpoint, options);
};
