export interface InventorySqlResponse {
  inventory_id: number;
  company_code: string | null;
  account_code: string | null;
  item_code: string | null;
  item_name: string | null;
  item_status: string | null;
  min_stock: number | null;
  current_stock: number | null;
  item_level: number | null;
  avg_cost_value: number | null;
  item_type: string | null;
  unit_of_measure: string | null;
  vat_applicable: string | null;
  previous_code: string | null;
}
