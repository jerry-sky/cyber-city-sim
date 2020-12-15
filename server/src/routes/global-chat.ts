import { Err, Errors } from '../../../model/errors';
import { SendGlobalMessageRequest } from '../../../model/server-requests';
import { GlobalMessagesResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { ChatService } from '../services/chat.service';
import { DatabaseService } from '../services/database.service';

const Router = new RouterWrapper();

const Database = new DatabaseService();
const Chat = new ChatService(Database);

Router.post<SendGlobalMessageRequest, never, never>(
  '/',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    await Chat.SendGlobalMessage(request.session.user, request.body.message);

    response.status(204);
    next();
  }
);

Router.get<never, GlobalMessagesResponse, never>(
  '/',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    const messages = await Chat.GetGlobalChatMessages();

    response.json({ messages });
    next();
  }
);

export default Router;
