import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { RolesModule } from './roles/roles.module';
import { PurchasesModule } from './purchases/purchases.module';
import { RatingsModule } from './ratings/ratings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule, CategoriesModule, BrandsModule, RolesModule, PurchasesModule, RatingsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
