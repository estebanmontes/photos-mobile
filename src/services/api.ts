import { addQueryParams } from "../utils";
const API_URL = "https://api.unsplash.com/";

export const searchImages = async (
  query: string,
  page: number,
  color: string,
  orientation: string
) => {
  const url = addQueryParams(`${API_URL}/search/photos`, {
    page,
    color,
    orientation,
    query,
    client_id: process.env.EXPO_PUBLIC_SPLASH_CLIENT_ID,
  });
  const response = fetch(url);
  return (await response).json();
};
