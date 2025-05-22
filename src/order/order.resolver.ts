import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Orders } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { Users } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Resolver(() => Orders)
@UseGuards(GqlAuthGuard, RolesGuard)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Orders)
  createOrder(
    @CurrentUser() user: Users,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.create(user.id, createOrderInput);
  }

  @Roles('admin')
  @Query(() => [Orders], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Roles('admin')
  @Query(() => Orders, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => String)
  async deleteOrder(
    @Args('orderId') orderId: string,
    @CurrentUser() user: Users,
  ) {
    const result = await this.orderService.remove(orderId, user);
    return result.message;
  }
}
