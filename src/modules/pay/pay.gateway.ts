import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { PayService } from './pay.service'
import { Req, UseGuards } from '@nestjs/common'
import { CheckTokenGuard } from 'guards'
import { CustomRequest } from 'custom'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@WebSocketGateway(Number(process.env.APP_SOCKET_PORT))
export class PayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(private readonly payService: PayService) {}

  afterInit() {
    // {server: Server} argument qilib beriladi kerak bo'lsa
    setTimeout(() => {
      console.log('Socket server initialized successfully.')
    })
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @SubscribeMessage('pay')
  async handlePayment(@MessageBody() data: any, @Req() request: CustomRequest): Promise<any> {
    this.payService.saveEveryCash({ amount: 10000 }, request?.user?.id)
  }
}
