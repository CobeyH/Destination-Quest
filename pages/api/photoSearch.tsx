import { createApi } from "unsplash-js";

// on your node server
const serverApi = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

export default async function photoSearch(query: string) {
  let response = await serverApi.search.getPhotos({
    query,
    page: 1,
    perPage: 1,
  });
  return response;
}
