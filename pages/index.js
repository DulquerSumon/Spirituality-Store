import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { SpiritCard } from "../components";
import { Web3Context } from "../context/contextProvider";

const Home = () => {
  const [words, setWords] = useState("");
  const [spirits, setSpirits] = useState([]);

  const { getSpirits, shareSpirit } = useContext(Web3Context);
  useEffect(() => {
    getSpirits().then((spirit) => {
      try {
        setSpirits(spirit);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Spirituality Store</title>
        <meta name="description" content="WEB3 front end" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="pt-6 md:pt-8 flex justify-center items-center">
        <div className="flex flex-col justify-center sm:w-2/5 items-center ">
          <p className="font-bold pb-4 md:pb-2 lg:pb-4 lg:text-lg text-purple-400">
            Store Spirit & get Points
          </p>
          <textarea
            type="textarea"
            maxLength={164}
            placeholder="Enter Your Spirit Word within 164C"
            title="Store Spirit & get Points"
            className="border-2 w-96 sm:w-[440px] lg:w-[600px] xl:w-[800px] xl:h-40 lg:h-32 bg-transparent border-indigo-400 p-1 h-24 text-start rounded-md"
            value={words}
            onChange={({ target }) => setWords(target?.value)}
          />
          <button
            onClick={() => shareSpirit(words)}
            type="button"
            className="flex items-center justify-center w-40  pt-8"
          >
            <p className="bg-purple-400 hover:bg-purple-500 dark:bg-pink-600 dark:hover:bg-pink-700 p-1 dark:text-white xl:w-36 xl:text-xl xl:h-12 lg:p-2 mb-2 sm:mb-0 font-semibold rounded-lg">
              Store Spirit
            </p>
          </button>
        </div>
      </div>
      <div className="font-semibold ml-20 lg:p-4 lg:text-lg text-purple-400">
        Latest Spiritual Words:
      </div>
      <div className="flex justify-evenly  flex-row gap-10 flex-wrap w-screen pt-4 items-center">
        {spirits[0] === 0
          ? "No one shared their Spiritual Words!"
          : spirits.map((spirit) => (
              // eslint-disable-next-line react/jsx-indent
              <SpiritCard key={spirit[2]} spirit={spirit} />
              // eslint-disable-next-line indent
            ))}
      </div>
    </>
  );
};
export default Home;
