import { Request, Response } from "express";
import { GenresState } from "../types/Genres";

//DATA CONTROLLERS

export const fetchProfile = async (req: Request, res: Response) => {
  const { accessToken } = req.query;

  console.log("ACCESS TOKEN IN REQ,USER PROFILE: ", accessToken);
  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }
  try {
    const response = await fetch("https://api.spotify.com/v1/me/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return data
      ? res.status(200).json({ data })
      : res.status(400).json({ error: "Error fetching user profile data" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const fetchCurrentlyPlaying = async (req: Request, res: Response) => {
  const { accessToken } = req.query;

  console.log("ACCESS TOKEN IN REQ,USER CURRENTLY PLAYING: ", accessToken);
  if (accessToken) {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data
        ? res.status(200).json({ data })
        : res
            .status(400)
            .json({ error: "Error fetching currently playing song" });
    } catch (error) {}
  } else {
    return res.status(400).json({ error: "No access token provided " });
  }
};

export const fetchTopTracks = async (req: Request, res: Response) => {
  const { limit, offset, time_range, accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({ error: "No access token provided" });
  }
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    return data
      ? res.status(200).json({ data })
      : res.status(400).json({ error: "Error fetching top tracks" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const fetchTopArists = async (req: Request, res: Response) => {
  const { time_range, offset, limit, accessToken } = req.query;
  // const accessToken = req.session.user?.accessToken;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data
      ? res.status(200).json({ data })
      : res.status(400).json({ error: "error fetching top artists" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const fetchTopGenres = async (req: Request, res: Response) => {
  const { time_range, limit, offset, accessToken } = req.query;
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    const topArtists = data.items;
    const genreCounts: {
      [key: string]: number;
    } = {};

    topArtists.forEach((artist: GenresState) => {
      artist.genres.forEach((genre: string) => {
        if (genreCounts[genre]) {
          genreCounts[genre]++;
        } else {
          genreCounts[genre] = 1;
        }
      });
    });
    // console.log("GENRE COUNTS",Object.entries(genreCounts).sort((a,b) => b[1] - a[1]))
    const sortedGenres = Object.entries(genreCounts).sort(
      (song, count) => count[1] - song[1]
    );

    return data
      ? res.status(200).json({ sortedGenres })
      : res.status(400).json({ error: "No data found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const fetchTopAlbums = async (req: Request, res: Response) => {
  const { accessToken, time_range, limit, offset } = req.query;
  if (!accessToken) {
    return res.status(400).json({ error: "No access token provided" });
  }
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    const topTracks = data.items;

    const albumCounts = new Map<
      string,
      {
        album: {
          name: string;
          id: string;
          images: { url: string }[];
          artists: { external_urls: { spotify: string }; name: string }[];
        };
        count: number;
      }
    >();

    topTracks.forEach(
      (track: {
        album: {
          name: string;
          id: string;
          images: { url: string }[];
          artists: { external_urls: { spotify: string }; name: string }[];
        };
      }) => {
        const album = track.album;
        if (albumCounts.has(album.id)) {
          albumCounts.get(album.id)!.count += 1;
        } else {
          albumCounts.set(album.id, { album: album, count: 1 });
        }
      }
    );

    const sortedAlbums = Array.from(albumCounts.values())
      .sort((a, b) => b.count - a.count)
      .map((item) => ({
        name: item.album.name,
        artist: item.album.artists.map((artist) => ({
          name: artist.name,
          link: artist.external_urls.spotify,
        })),
        images: item.album.images,
      }));

    return data
      ? res.status(200).json({ sortedAlbums })
      : res.status(400).json({ error: "No data found" });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching User's Top Albums" });
  }
};
