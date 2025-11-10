// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AdminController } from './admin.controller';
// import { AdminGuard } from './guards/admin.guard';
// import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('ADMIN_JWT_SECRET', 'admin-secret-key'),
//         signOptions: {
//           expiresIn: '24h',
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AdminController],
//   providers: [AdminGuard, AdminJwtStrategy],
// })
// export class AdminModule {}
