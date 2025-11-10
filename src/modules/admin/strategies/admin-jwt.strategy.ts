// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// export interface AdminJwtPayload {
//   sub: string;
//   email: string;
//   isAdmin: boolean;
//   iat?: number;
//   exp?: number;
// }

// @Injectable()
// export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>(
//         'ADMIN_JWT_SECRET',
//         'admin-secret-key',
//       ),
//     });
//   }

//   async validate(payload: AdminJwtPayload) {
//     return {
//       userId: payload.sub,
//       email: payload.email,
//       isAdmin: payload.isAdmin,
//     };
//   }
// }
