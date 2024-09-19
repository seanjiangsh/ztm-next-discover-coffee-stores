import { AirtableRecordType, CoffeeStoreType } from "@/types";
import Airtable, { Records } from "airtable";

const { AIRTABLE_ACCESS_TOKEN } = process.env;

if (!AIRTABLE_ACCESS_TOKEN) {
  throw new Error("Missing environment variable: AIRTABLE_ACCESS_TOKEN");
}
const baseId = "appSVZCnqcZV6tneE";
const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(baseId);
const table = base<CoffeeStoreType>("coffee-stores");

const getMinifiedRecords = (records: Records<CoffeeStoreType>) =>
  records.map(({ id, fields }) => ({ recordId: id, ...fields }));

// find record
const findRecordById = async (id: string) => {
  const filter = { filterByFormula: `id="${id}"` };
  const findRecords = await table.select(filter).firstPage();
  // console.log({ findRecords });
  return getMinifiedRecords(findRecords);
};

// create record if not found
export const createCoffeeStore = async (coffeeStore: CoffeeStoreType) => {
  const { id, name, address, imgUrl, voting = 0 } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordById(id);
      if (records.length === 0) {
        const fields = { id, name, address, voting, imgUrl };
        const createRecords = await table.create([{ fields }]);
        if (createRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log("Coffee store exists");
        return records;
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error creating or finding a store", error);
  }
};
