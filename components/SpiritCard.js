import React from "react";

const SpiritCard = ({ spirit }) => (
  <div className=" w-60 lg:w-72 xl:w-80 h-52 lg:h-56 xl:h-64 shadow-xl dark:bg-slate-700 border-2 border-purple-500  rounded-xl">
    <div className="bg-gray-200 dark:bg-slate-600 h-44  xl:h-52 flex justify-center pt-2 pb-1 rounded-xl shadow-md">
      <p className=" bg-slate-300 dark:bg-slate-500 text-center items-center font-bold text-purple-500 dark:text-gray-200  font-serif flex text-clip rounded-lg shadow-lg w-52 lg:w-64 xl:w-72 h-40 xl:h-[188px] xl:text-lg ">
        {spirit[0]}
      </p>
    </div>

    <div className="flex justify-between m-1 pb-2">
      <div className="font-semibold text-purple-500">
        S.B:{" "}
        {`${spirit[1].slice(0, 4)}...${spirit[1].slice(
          // eslint-disable-next-line comma-dangle
          spirit[1].length - 3
        )}`}
      </div>
      <div className="font-semibold text-purple-500">
        {spirit ? spirit[2].toString() : ""} Pts
      </div>
    </div>
  </div>
);

export default SpiritCard;
