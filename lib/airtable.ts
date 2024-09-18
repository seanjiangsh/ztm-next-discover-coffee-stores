import { CoffeeStoreType } from "@/types";
import Airtable from "airtable";

const { AIRTABLE_ACCESS_TOKEN } = process.env;

if (!AIRTABLE_ACCESS_TOKEN) {
  throw new Error("Missing environment variable: AIRTABLE_ACCESS_TOKEN");
}
const baseId = "appSVZCnqcZV6tneE";
const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(baseId);
const table = base<CoffeeStoreType>("coffee-stores");

// find record
export const findRecordById = async (id: string) => {
  const filter = { filterByFormula: `id="${id}"` };
  const findRecords = await table.select(filter).firstPage();

  return findRecords.map(({ id, fields }) => ({ recordId: id, ...fields }));
};
