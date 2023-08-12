export interface IImage {
  id: string;
  alt_description: string;
  color?: string;
  orientation?: string;
  urls: {
    regular: string;
  };
}
