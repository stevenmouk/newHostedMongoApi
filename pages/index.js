import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../lib/mongodb";
import { useRouter } from "next/router";
import { BsFillTrashFill } from "react-icons/bs";

export default function Home({ properties }) {
  const router = useRouter();
  const [radio, setRadio] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let location = e.target.childNodes[0].childNodes[1].childNodes[0].value;
    e.target.childNodes[0].childNodes[1].childNodes[0].value = "";

    let date = e.target.childNodes[1].childNodes[1].childNodes[0].value;
    e.target.childNodes[1].childNodes[1].childNodes[0].value = "";

    let time = e.target.childNodes[2].childNodes[1].childNodes[0].value;
    e.target.childNodes[2].childNodes[1].childNodes[0].value = "";

    let onGround = e.target.childNodes[3].childNodes[1].childNodes[0].value;
    e.target.childNodes[3].childNodes[1].childNodes[0].value = "";

    const data = await fetch(
      `http://localhost:3000/api/addSighting?location=${location}&Date=${date}&Time=${time}&OnGround=${onGround}`
    );

    console.log(await data.json());
    refreshData();
  }

  async function handleDelete(id) {
    console.log(id);
    const data = await fetch(`http://localhost:3000/api/deleteSighting?_id=${id}`);
    console.log(await data.json());
    refreshData();
  }

  async function handleUpdate(e) {
    let what = e.target.childNodes[1].childNodes[0].childNodes[1].value;
    e.target.childNodes[1].childNodes[0].childNodes[1].value = "";
    let to = e.target.childNodes[1].childNodes[0].childNodes[3].value;
    e.target.childNodes[1].childNodes[0].childNodes[3].value = "";
    e.preventDefault();

    const data = await fetch(
      `http://localhost:3000/api/updateSighting?radio=${radio}&what=${what}&to=${to}`
    );
    console.log(await data.json());
    refreshData();
  }
  async function handleChange(e) {
    console.log(e.target.value);
    setRadio(e.target.value);
  }

  return (
    <div id="container">
      <div id="background"></div>
      <div id="inner"></div>
      <div id="flex">
        <div id="segment">
          <h2>1</h2>
          <div id="text">create</div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Location
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="library"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Date
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="11/20/2022"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="9:00 AM"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  On Ground
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="True"
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add entry
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="segment" className="flex  overflow-y-scroll h-screen">
          <h2>2</h2>
          <button className="flex " id="text">
            Read
          </button>

          {properties?.map((entry) => {
            console.log(entry);
            return (
              <div className="flex flex-col mt-4 border-2 border-white rounded-lg h-fit p-3 w-full items-start justify-start ">
                <div className="flex flex-row justify-between w-full hover:cursor-pointer">
                  <div id="text">{entry.location}</div>
                  <BsFillTrashFill
                    className="text-[#fe50a7]"
                    onClick={() => handleDelete(entry._id)}
                  />
                </div>
                <div id="text">{entry.Date}</div>
                <div id="text">{entry.Time}</div>
                <div id="text">{entry.OnGround}</div>
              </div>
            );
          })}
        </div>
        <div id="segment">
          <h2>3</h2>
          <div id="text">Update</div>

          <form onSubmit={handleUpdate} className="w-full max-w-sm mt-8 flex flex-row ">
            <ul
              onChange={handleChange}
              className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-fit"
            >
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    value="location"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    id="text"
                    for="list-radio-license"
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    location
                  </label>
                </div>
              </li>
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-id"
                    type="radio"
                    value="Date"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    id="text"
                    for="list-radio-id"
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Date
                  </label>
                </div>
              </li>
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-millitary"
                    type="radio"
                    value="Time"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    id="text"
                    for="list-radio-millitary"
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Time
                  </label>
                </div>
              </li>
              <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-passport"
                    type="radio"
                    value="OnGround"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    id="text"
                    for="list-radio-passport"
                    className="py-3 ml-2 w-full text-sm  text-gray-900 dark:text-gray-300"
                  >
                    On Ground
                  </label>
                </div>
              </li>
            </ul>

            <div className="flex flex-col">
              <div className="md:flex  mb-6 flex flex-col items-center justify-start">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 text-3xl">
                  What
                </label>

                <input
                  className="bg-gray-200 w-[66%] appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="library"
                />

                <label className="block text-gray-500 font-bold md:text-right mb-1 mt-4 md:mb-0 text-3xl">
                  To
                </label>

                <input
                  className="bg-gray-200 w-[66%] appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-password"
                  type="text"
                  placeholder="pond"
                />
              </div>

              <div className="md:flex md:items-center ml-0">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("Squirrel_Sightings").find({}).toArray();
  const properties = JSON.parse(JSON.stringify(data));

  console.log(data);
  return {
    props: { properties: properties },
  };
}
