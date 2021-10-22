import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    const { user_id } = request;

    try {
      const service = new CreateMessageService();
      const result = await service.execute(message, user_id);

      return response.json(result);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}

export { CreateMessageController };
