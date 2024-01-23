import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection, ConnectedSocket
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';

class Socket {
}

@WebSocketGateway({cors: {
  origin: "*"
  }})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server
  constructor(private readonly chatService: ChatService) {}


  handleConnection(@ConnectedSocket() client: Socket): void {
    console.log(`Client connected:`);
    // You can perform additional actions when a client connects
    // For example, you can send a welcome message to the connected client
    // client.emit('connection', 'Welcome to the chat!');
  }

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() message: string) {
    console.log(message)
    this.server.sockets.emit('receive_message', message);
  }


  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
