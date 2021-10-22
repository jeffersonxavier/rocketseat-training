import axios from 'axios';
import { sign } from 'jsonwebtoken';
import prismaClient from '../prisma';
import 'dotenv/config';

interface IAccessTokenResponse {
  access_token: string,
}

interface IUserResponse {
  id: number,
  avatar_url: string,
  login: string,
  name: string,
}

class AuthenticationUserService {

  async execute(code: string) {
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
        'https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        'Accept': 'application/json',
      }
    });

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    });

    const { id: github_id, login, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id,
          avatar_url,
          login,
          name,
        }
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return { token, user };
  }
}

export { AuthenticationUserService };
