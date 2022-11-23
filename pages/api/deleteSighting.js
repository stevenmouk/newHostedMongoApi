import { ObjectId } from "bson";
import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let data = req.query;
  console.log(data);
  const response = await db.collection("Squirrel_Sightings").deleteOne({ _id: ObjectId(data._id) });

  res.json(response);
};
