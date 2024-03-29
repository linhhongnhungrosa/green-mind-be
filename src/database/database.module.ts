import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Admin } from 'src/modules/admin/entity/admin.entity';
import { Customer } from 'src/modules/customer/entity/customer.entity';
import { Product } from 'src/modules/product/entity/product.entity';
import { Category } from 'src/modules/category/entity/category.entity';
import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import { CartProduct } from 'src/modules/cart/entity/cartProduct.entity';
import { OrderProduct } from 'src/modules/order/entity/orderProduct.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQLHOST'),
        port: parseInt(configService.get<string>('MYSQLPORT')),
        username: configService.get<string>('MYSQLUSER'),
        password: configService.get<string>('MYSQLPASSWORD'),
        database: configService.get<string>('MYSQLDATABASE'),
        entities: [
          User,
          Admin,
          Customer,
          Product,
          Category,
          Cart,
          CartProduct,
          Order,
          OrderProduct
        ],
        synchronize: true,
        name: 'default',
      })
    }),
  ],
})
export class DatabaseModule {}