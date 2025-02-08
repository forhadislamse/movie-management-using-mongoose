export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovie = {
  title: string;
  description: string;
  // releaseDate: Date;
  releaseDate: string;
  genre: string;
  reviews: TReview[];
  viewCount: number;
  isDeleted?: boolean;
};
