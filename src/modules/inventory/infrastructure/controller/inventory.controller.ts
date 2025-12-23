import { InventoryService } from '../../application/services/inventory.service';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  // Define controller methods here
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('get-inventory/:inventoryId')
  @MessagePattern('inventory.get-inventory-by-id')
  async getInventoryById(@Payload() inventoryId: number) {
    return this.inventoryService.getInventoryById(inventoryId);
  }

  @Get('get-all-inventories')
  @MessagePattern('inventory.get-all-inventories')
  async getAllInventories(
    @Payload() data: { limit?: number; offset?: number },
  ) {
    const limit = data?.limit ?? 100;
    const offset = data?.offset ?? 0;

    return await this.inventoryService.getInventories(limit, offset);
  }

  @Get('get-all-inventories')
  @MessagePattern('inventory.get-all-inventories')
  async getInventories(@Payload() data: { limit?: number; offset?: number }) {
    const limit = data?.limit ?? 100;
    const offset = data?.offset ?? 0;

    return await this.inventoryService.getInventories(limit, offset);
  }

  @Get('get-inventories-below-min-stock')
  @MessagePattern('inventory.get-inventories-below-min-stock')
  async getInventoriesBelowMinStock() {
    return this.inventoryService.getInventoriesBelowMinStock();
  }

  @Get('get-inventories-by-account-code/:accountCode')
  @MessagePattern('inventory.get-inventories-by-account-code')
  async getInventoriesByAccountCode(@Payload() accountCode: string) {
    return this.inventoryService.getInventoriesByAccountCode(accountCode);
  }

  @Get('get-inventories-by-company-code/:companyCode')
  @MessagePattern('inventory.get-inventories-by-company-code')
  async getInventoriesByCompanyCode(@Payload() companyCode: string) {
    return this.inventoryService.getInventoriesByCompanyCode(companyCode);
  }

  @Get('get-inventories-by-status/:status')
  @MessagePattern('inventory.get-inventories-by-status')
  async getInventoriesByStatus(@Payload() status: string) {
    return this.inventoryService.getInventoriesByStatus(status);
  }

  @Get('get-inventories-by-item-type/:itemType')
  @MessagePattern('inventory.get-inventories-by-item-type')
  async getInventoriesByItemType(@Payload() itemType: string) {
    return this.inventoryService.getInventoriesByItemType(itemType);
  }

  @Get('get-inventories-by-unit-of-measure/:unitOfMeasure')
  @MessagePattern('inventory.get-inventories-by-unit-of-measure')
  async getInventoriesByUnitOfMeasure(@Payload() unitOfMeasure: string) {
    return this.inventoryService.getInventoriesByUnitOfMeasure(unitOfMeasure);
  }

  @Get('get-inventories-like-item-name/:itemName')
  @MessagePattern('inventory.get-inventories-like-item-name')
  async getInventoriesLikeItemName(@Payload() itemName: string) {
    return this.inventoryService.getInventoriesLikeItemName(itemName);
  }

  @Get('get-inventories-like-item-code/:itemCode')
  @MessagePattern('inventory.get-inventories-like-item-code')
  async getInventoriesLikeItemCode(@Payload() itemCode: string) {
    return this.inventoryService.getInventoriesLikeItemCode(itemCode);
  }

  @Get('find-all-inventories-paginated')
  @MessagePattern('inventory.find-all-inventories-paginated')
  async findAllInventoriesPaginated(
    @Payload()
    params: {
      limit: number;
      offset: number;
      query?: string;
    },
  ) {
    return this.inventoryService.findAllInventoriesPaginated(params);
  }
}
