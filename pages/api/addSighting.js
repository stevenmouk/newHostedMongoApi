import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = req.query;
  const response = await db.collection("Squirrel_Sightings").insertOne(data);

  res.json(response);
};
