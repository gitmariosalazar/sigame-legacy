class InventoryModel {
  inventoryId: number;
  companyCode: string;
  accountCode: string;
  itemCode: string;
  itemName: string;
  itemStatus: string;
  minStock: number;
  currentStock: number;
  itemLevel: number;
  avgCostValue: number;
  itemType: string;
  unitOfMeasure: string;
  vatApplicable: string;
  previousCode: string;
}

export { InventoryModel };
