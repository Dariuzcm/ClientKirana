const csv = require('csvtojson');

export async function getJsonCSV(file:any){
  const json = await csv.fromString(file);
  console.log(json)
  return json;
}