import { Injectable } from '@nestjs/common';
import { InterfaceInventoryRepository } from '../../../../domain/contracts/inveentory.interface.repository';
import { InventoryResponse } from '../../../../domain/schemas/dto/response/inventory.response';
import { InventorySqlResponse } from '../../../interfaces/sql/inventory.sql.response';
import { InventoryAdapter } from '../adapters/inventory.adapter';
import { DatabaseAbstract } from '../../../../../../shared/connections/database/abstract/abstract.database';

@Injectable()
export class SqlServerInventoryPersistence implements InterfaceInventoryRepository {
  constructor(
    private readonly databaseService: DatabaseAbstract,
  ) {}

  async getInventories(
    limit: number,
    offset: number,
  ): Promise<InventoryResponse[]> {
    try {
      const query = `
        WITH InventoryPaged AS (
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
                i.inv_cod_anterior AS previous_code,
                ROW_NUMBER() OVER (ORDER BY i.inv_identificador) AS rn
            FROM inv_inventario i
        )
        SELECT
            inventory_id,
            company_code,
            account_code,
            item_code,
            item_name,
            item_status,
            min_stock,
            current_stock,
            item_level,
            avg_cost_value,
            item_type,
            unit_of_measure,
            vat_applicable,
            previous_code
        FROM InventoryPaged
        WHERE rn > ?
          AND rn <= (? + ?);
    `;
      const params = [offset, offset, limit];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
        await this.databaseService.query<InventorySqlResponse>(query);
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.cta_co_codigo = ?;
    `;
      const params = [accountCode];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.cta_co_codigo = ?;
    `;
      const params = [companyCode];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_tipo = ?;
    `;
      const params = [itemType];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_estado = ?;
    `;
      const params = [status];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_unid_medida = ?;
    `;
      const params = [unitOfMeasure];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_codigo LIKE '%' + ? + '%' COLLATE Latin1_General_CI_AI;
    `;
      const params = [itemCode];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_nombre LIKE '%' + ? + '%' COLLATE Latin1_General_CI_AI;
    `;
      const params = [itemName];
      const result = await this.databaseService.query<InventorySqlResponse>(
        query,
        params,
      );
      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
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
      WHERE i.inv_identificador = ?;
    `;

      const params = [inventoryId];

      const result = await this.databaseService.query<InventorySqlResponse>(
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

  async findAllInventoriesPaginated(params: {
    limit: number;
    offset: number;
    query?: string;
  }): Promise<InventoryResponse[]> {
    try {
      const { limit, offset, query: searchQuery } = params;

      let whereClause = '';
      const queryParams: any[] = [];

      if (searchQuery) {
        whereClause = `WHERE i.inv_nombre LIKE '%' + ? + '%' COLLATE Latin1_General_CI_AI OR i.inv_codigo LIKE '%' + ? + '%' COLLATE Latin1_General_CI_AI`;
        queryParams.push(searchQuery, searchQuery);
      }

      queryParams.push(offset, offset, limit);

      const sqlQuery = `
      WITH InventoryPaged AS (
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
              i.inv_cod_anterior AS previous_code,
              ROW_NUMBER() OVER (ORDER BY i.inv_identificador) AS rn
          FROM inv_inventario i
          ${whereClause}
      )
      SELECT
          inventory_id,
          company_code,
          account_code,
          item_code,
          item_name,
          item_status,
          min_stock,
          current_stock,
          item_level,
          avg_cost_value,
          item_type,
          unit_of_measure,
          vat_applicable,
          previous_code
      FROM InventoryPaged
      WHERE rn > ?
        AND rn <= (? + ?);
    `;

      const result = await this.databaseService.query<InventorySqlResponse>(
        sqlQuery,
        queryParams,
      );

      return result.map((item) =>
        InventoryAdapter.fromInventorySqlResponseToInventoryResponse(item),
      );
    } catch (error) {
      throw error;
    }
  }
}
