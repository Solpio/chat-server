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
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {JwtStrategy} from "src/auth/jwt.strategy";


class Socket {
  handshake: {
    auth: {
      token: string
    }
  }
}

@WebSocketGateway({cors: {
  origin: "*"
  }})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server
  constructor(private readonly chatService: ChatService) {}


  handleConnection(@ConnectedSocket() client: Socket): void {
    // console.log(client);
    // const token = client.handshake.auth.token;
    // console.log(token)
    // const user = await this.jwtAuthGuard.validate({ token });
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
