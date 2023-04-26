import csv from 'csvtojson';

export async function getJsonCSV(file:any){
  const csvO = csv()
  const json = await csvO.fromString(file);
  const mapped = json.map(item => {
    return {
      name: item["Nombre"],
      email: item["Correo Electronico"],
      phone: item["Telefono"],
    }
  })
  return mapped;
}
