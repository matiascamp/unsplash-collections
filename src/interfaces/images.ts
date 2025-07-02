export type UnsplashImage = {
  id: string;
  slug: string;
  alt_description: string;
  description: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      small: string;
    };
    first_name: string;
    last_name: string;
  };
  links: {
    html: string;
    self: string;
    download:string;
  };
  created_at: string;
};


export type ImageUrls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export type ImageProps = {
  imageId: string;
  urls: ImageUrls;
}

export type CollectionsProps = {
  _id: string;
  collectionName: string;
  collectionUrls: ImageProps[];
  createdAt?: Date;
  updatedAt?: Date;
}

