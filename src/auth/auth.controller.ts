import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginResponse } from '@interfaces'
import { RefreshTokenDTO, LoginDtoRequest } from './dto'
import { CustomRequest } from 'custom'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Auth')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDtoRequest): Promise<LoginResponse> {
    return await this.service.login(body)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDTO, @Req() request: CustomRequest) {
    return await this.service.refreshToken(body.token, request.user.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({
    role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR, UserRoles.INCASATOR],
  })
  @Get('me')
  async getMe(@Req() request: CustomRequest) {
    return await this.service.getMe(request.user.id)
  }
}
