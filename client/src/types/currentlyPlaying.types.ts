export type CurrentlyPlaying = {
  name: string;
  external_urls: {
    spotify: string;
  };
  album: {
    artists: [
      {
        name: string;
        external_urls: {
          spotify: string;
        };
      }
    ];
    images: [
      {
        url: string;
      }
    ];
  };
};
