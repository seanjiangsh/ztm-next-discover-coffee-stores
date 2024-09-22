import { CoffeeStoreType } from "@/types";
import Airtable, { Records } from "airtable";

const { AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID } = process.env;

if (!AIRTABLE_ACCESS_TOKEN)
  throw new Error("Missing environment variable: AIRTABLE_ACCESS_TOKEN");
if (!AIRTABLE_BASE_ID)
  throw new Error("Missing environment variable: AIRTABLE_BASE_ID");

const apiKey = AIRTABLE_ACCESS_TOKEN;
const base = new Airtable({ apiKey }).base(AIRTABLE_BASE_ID);
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
        const createdRecords = await table.create([{ fields }]);
        if (createdRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(createdRecords);
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

// update record for voting
export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const [record] = await findRecordById(id);
      if (record) {
        const { recordId } = record;
        const voting = record.voting + 1;
        const rowData = { id: recordId, fields: { voting } };
        const updatedRecords = await table.update([rowData]);
        if (updatedRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log("Coffee store does not exists");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error creating or finding a store", error);
  }
};
