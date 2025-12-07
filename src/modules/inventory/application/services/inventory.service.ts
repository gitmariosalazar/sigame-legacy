import { Inject, Injectable } from '@nestjs/common';
import { InterfaceInventoryUseCase } from '../usecases/inventory.use-case.interface';
import { InterfaceInventoryRepository } from '../../domain/contracts/inveentory.interface.repository';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from '../../../../settings/environments/status-code';
import { InventoryResponse } from '../../domain/schemas/dto/response/inventory.response';

@Injectable()
export class InventoryService implements InterfaceInventoryUseCase {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InterfaceInventoryRepository,
  ) {}

  async getInventoryById(
    inventoryId: number,
  ): Promise<InventoryResponse | null> {
    try {
      if (!inventoryId || inventoryId <= 0 || isNaN(inventoryId)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid inventoryId parameter',
        });
      }
      const inventory =
        await this.inventoryRepository.getInventoryById(inventoryId);
      if (inventory) {
        return inventory;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Inventory with ID ${inventoryId} not found`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventories(
    limit: number,
    offset: number,
  ): Promise<InventoryResponse[]> {
    try {
      const inventories = await this.inventoryRepository.getInventories(
        limit,
        offset,
      );
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No inventories found',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesBelowMinStock(): Promise<InventoryResponse[]> {
    try {
      const inventories =
        await this.inventoryRepository.getInventoriesBelowMinStock();
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No inventories found below minimum stock',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByAccountCode(
    accountCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!accountCode || accountCode.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid accountCode parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesByAccountCode(accountCode);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found for account code ${accountCode}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByCompanyCode(
    companyCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!companyCode || companyCode.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid companyCode parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesByCompanyCode(companyCode);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found for company code ${companyCode}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByItemType(
    itemType: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!itemType || itemType.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid itemType parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesByItemType(itemType);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found for item type ${itemType}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByStatus(status: string): Promise<InventoryResponse[]> {
    try {
      if (!status || status.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid status parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesByStatus(status);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found with status ${status}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByUnitOfMeasure(
    unitOfMeasure: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!unitOfMeasure || unitOfMeasure.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid unitOfMeasure parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesByUnitOfMeasure(
          unitOfMeasure,
        );
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found for unit of measure ${unitOfMeasure}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesLikeItemCode(
    itemCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!itemCode || itemCode.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid itemCode parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesLikeItemCode(itemCode);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found matching item code ${itemCode}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesLikeItemName(
    itemName: string,
  ): Promise<InventoryResponse[]> {
    try {
      if (!itemName || itemName.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid itemName parameter',
        });
      }
      const inventories =
        await this.inventoryRepository.getInventoriesLikeItemName(itemName);
      if (inventories && inventories.length > 0) {
        return inventories;
      } else {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No inventories found matching item name ${itemName}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
