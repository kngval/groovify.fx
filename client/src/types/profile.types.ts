export type Profile = {
  display_name: string;
  images: [
    {
      url: string;
    },
    {
      url: string;
    }
  ];
  external_urls: {
    spotify: string;
  };
};
