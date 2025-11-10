// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { ADMIN_KEY } from '../decorators/admin.decorator';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isAdmin = this.reflector.getAllAndOverride<boolean>(ADMIN_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!isAdmin) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new UnauthorizedException('Admin authentication required');
//     }

//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: this.configService.get<string>(
//           'ADMIN_JWT_SECRET',
//           'admin-secret-key',
//         ),
//       });

//       // Check if user has admin role
//       if (!payload.isAdmin) {
//         throw new UnauthorizedException('Admin privileges required');
//       }

//       // Attach user info to request
//       request.user = payload;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired admin token');
//     }

//     return true;
//   }

//   private extractTokenFromHeader(request: any): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
