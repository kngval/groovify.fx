import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
//REFRESH TOKEN CONTROLLERS
export const refreshAccessToken = async (req: Request, res: Response) => {
  console.log("ENTERING REFRESH TOKEN...");
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }).toString(),
    };

    const response = await axios(authOptions);

    if (response) {
      const { access_token, expires_in } = response.data;
      console.log("NEW BACKEND TOKENS : ", response.data);
      return res.status(200).json({ access_token, expires_in });
    }
  } catch (error: any) {
    console.error(
      "Token Refresh Error: ",
      error.response?.data || error.message
    );
    res.status(500).json({ error });
  }
};
