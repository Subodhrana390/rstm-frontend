export type User = {
  _id: string;
  email: string;
  name: string;
  imageUrl: string;
};

export type Project = {
  _id: string;
  title: string;
  desc: string;
  shortdesc: string;
  eventDate: string;
  year: number;
  venue: string;
  slug: string;
  startingTime: string;
  endingTime: string;
  coverPageUrl: string;
};
