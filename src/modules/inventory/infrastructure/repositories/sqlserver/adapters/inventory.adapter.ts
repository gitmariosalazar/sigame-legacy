import { InventoryResponse } from '../../../../domain/schemas/dto/response/inventory.response';
import { InventorySqlResponse } from '../../../interfaces/sql/inventory.sql.response';

export class InventoryAdapter {
  static fromInventorySqlResponseToInventoryResponse(
    inventorySqlResponse: InventorySqlResponse,
  ): InventoryResponse {
    return {
      inventoryId: inventorySqlResponse.inventory_id,
      companyCode: inventorySqlResponse.company_code,
      accountCode: inventorySqlResponse.account_code,
      itemCode: inventorySqlResponse.item_code,
      itemName: inventorySqlResponse.item_name,
      itemStatus: inventorySqlResponse.item_status,
      minStock: inventorySqlResponse.min_stock,
      currentStock: inventorySqlResponse.current_stock,
      itemLevel: inventorySqlResponse.item_level,
      avgCostValue: inventorySqlResponse.avg_cost_value,
      itemType: inventorySqlResponse.item_type,
      unitOfMeasure: inventorySqlResponse.unit_of_measure,
      vatApplicable: inventorySqlResponse.vat_applicable,
      previousCode: inventorySqlResponse.previous_code,
    };
  }
}
