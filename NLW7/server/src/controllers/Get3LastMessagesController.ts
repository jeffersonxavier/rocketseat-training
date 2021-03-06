import { Request, Response } from 'express';
import { Get3LastMessagesService } from '../services/Get3LastMessagesService';

class Get3LastMessagesController {
  async handle(request: Request, response: Response) {
    try {
      const service = new Get3LastMessagesService();
      const result = await service.execute();

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

export { Get3LastMessagesController };
