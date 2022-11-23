import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const data = req.query;
  //   console.log(`${data.radio} : ${data.what}`);

  let search = JSON.parse(`{"${data.radio}":"${data.what}"}`);
  let replace = JSON.parse(`{"${data.radio}":"${data.to}"}`);

  const response = await db.collection("Squirrel_Sightings").update(search, { $set: replace });

  console.log(response);

  res.json(response);
};
