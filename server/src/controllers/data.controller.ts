import { Request, Response } from "express";

export const fetchProfile = async (req: Request, res: Response) => {
  const accessToken = req.user?.accessToken;
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
