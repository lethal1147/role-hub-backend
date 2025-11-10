// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AdminGuard } from './guards/admin.guard';
// import { Admin } from './decorators/admin.decorator';
// import { responseHandler } from 'src/shared/handlers/response.handler';

// @Controller('admin')
// @UseGuards(AdminGuard)
// @Admin()
// export class AdminController {
//   @Get()
//   async getAdminDashboard() {
//     return responseHandler({
//       success: true,
//       statusCode: 200,
//       message: 'Admin dashboard',
//       data: {
//         message: 'Welcome to admin panel',
//       },
//     });
//   }
// }
