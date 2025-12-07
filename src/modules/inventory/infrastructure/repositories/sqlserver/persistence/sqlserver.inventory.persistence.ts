import { Injectable } from '@nestjs/common';
import { InterfaceInventoryRepository } from '../../../../domain/contracts/inveentory.interface.repository';
import { InventoryResponse } from '../../../../domain/schemas/dto/response/inventory.response';
import { InventorySqlResponse } from '../../../interfaces/sql/inventory.sql.response';
import { InventoryAdapter } from '../adapters/inventory.adapter';
import { DatabaseServiceSQLServer2022 } from '../../../../../../shared/connections/database/postgresql/sqlserver.service';

/*
CREATE TABLE inv_inventario ( inv_identificador INT NOT NULL, cta_co_codigo VARCHAR(70), inv_codigo VARCHAR(20), inv_nombre VARCHAR(100), inv_estado CHAR(1), inv_stock_min NUMERIC(15,2), inv_existencia NUMERIC(15,2), inv_nivel SMALLINT, inv_valor_pp NUMERIC(15,6), inv_tipo CHAR(1), inv_unid_medida VARCHAR(50), inv_iva CHAR(1), inv_cod_anterior VARCHAR(50) );
*/

@Injectable()
export class SqlServerInventoryPersistence implements InterfaceInventoryRepository {
  // Implementation of PostgreSQL persistence logic for inventory
  constructor(
    private readonly sqlServerService: DatabaseServiceSQLServer2022,
  ) {}

  async getInventories(
    limit: number,
    offset: number,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      ORDER BY i.inv_identificador
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY;
    `;
      const params: any[] = [
        { name: 'limit', value: limit },
        { name: 'offset', value: offset },
      ];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesBelowMinStock(): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_existencia < i.inv_stock_min;
    `;
      const result =
        await this.sqlServerService.query<InventorySqlResponse>(query);
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByAccountCode(
    accountCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.cta_co_codigo = @accountCode;
    `;
      const params: any[] = [{ name: 'accountCode', value: accountCode }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByCompanyCode(
    companyCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.cta_co_codigo = @companyCode;
    `;
      const params: any[] = [{ name: 'companyCode', value: companyCode }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByItemType(
    itemType: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_tipo = @itemType;
    `;
      const params: any[] = [{ name: 'itemType', value: itemType }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByStatus(status: string): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_estado = @status;
    `;
      const params: any[] = [{ name: 'status', value: status }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesByUnitOfMeasure(
    unitOfMeasure: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_unid_medida = @unitOfMeasure;
    `;
      const params: any[] = [{ name: 'unitOfMeasure', value: unitOfMeasure }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesLikeItemCode(
    itemCode: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_codigo LIKE '%' + @itemCode + '%' COLLATE Latin1_General_CI_AI;
    `;
      const params: any[] = [{ name: 'itemCode', value: itemCode }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoriesLikeItemName(
    itemName: string,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_nombre LIKE '%' + @itemName + '%' COLLATE Latin1_General_CI_AI;
    `;
      const params: any[] = [{ name: 'itemName', value: itemName }];
      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map(
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async getInventoryById(
    inventoryId: number,
  ): Promise<InventoryResponse | null> {
    try {
      const query = `
      SELECT
          i.inv_identificador AS inventory_id,
          i.cta_co_codigo AS company_code,
          i.cta_co_codigo AS account_code,
          i.inv_codigo AS item_code,
          i.inv_nombre AS item_name,
          i.inv_estado AS item_status,
          i.inv_stock_min AS min_stock,
          i.inv_existencia AS current_stock,
          i.inv_nivel AS item_level,
          i.inv_valor_pp AS avg_cost_value,
          i.inv_tipo AS item_type,
          i.inv_unid_medida AS unit_of_measure,
          i.inv_iva AS vat_applicable,
          i.inv_cod_anterior AS previous_code
      FROM inv_inventario i
      WHERE i.inv_identificador = @inventoryId;
    `;

      const params: any[] = [{ name: 'inventoryId', value: inventoryId }];

      const result = await this.sqlServerService.query<InventorySqlResponse>(
        query,
        params,
      );
      if (result.length === 0) {
        return null;
      }
      return InventoryAdapter.fromInventorySqlResponseToInventoryResponse(
        result[0],
      );
    } catch (error) {
      throw error;
    }
  }
}
