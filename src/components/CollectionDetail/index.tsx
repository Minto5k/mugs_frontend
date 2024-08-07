/* eslint-disable @next/next/no-img-element */

import { BsTwitterX } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

import { CollectionDetailProps } from "@/types/types";
import { PINATA_URL } from "@/config";
import Link from "next/link";

export default function CollectionDetail({
  collectionData,
}: CollectionDetailProps) {
  return (
    <div className="md:flex items-start justify-center md:justify-start gap-3 md:flex-row flex-col w-full md:w-auto px-2 hidden">
      <div className="flex items-center justify-start gap-5 w-full">
        <div
          className={`w-[75px] h-[75px] relative ${
            collectionData?.imgUrl === undefined && "hidden"
          }`}
        >
          <img
            src={PINATA_URL + collectionData?.imgUrl}
            alt="Avatar"
            className="rounded-full w-full h-full"
          />
        </div>
        <div
          className={`w-[75px] h-[75px] rounded-full animate-pulse bg-green-900 ${
            collectionData?.imgUrl !== undefined && "hidden"
          }`}
        />
        <div className="flex items-start justify-center flex-col">
          <span className="text-white text-2xl cursor-pointer duration-300 hover:text-gray-300">
            <Link href={"/"}>{collectionData?.collectionName}</Link>
          </span>
          <div className="flex items-center justify-start gap-4">
            <span
              className={`cursor-pointer hover:text-white text-gray-300 duration-300 ${
                collectionData?.discordLink === "" && "hidden"
              }`}
            >
              <a
                className={``}
                href={collectionData?.discordLink}
                target="_blank"
                rel="referrer"
              >
                <FaDiscord size={16} />
              </a>
            </span>
            <span
              className={`cursor-pointer hover:text-white text-gray-300 duration-300 ${
                collectionData?.twitterLink === "" && "hidden"
              }`}
            >
              <a
                href={collectionData?.twitterLink}
                target="_blank"
                rel="referrer"
              >
                <BsTwitterX size={14} />
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center md:justify-start justify-between md:gap-5 gap-4 md:ml-10 mt-3 w-full md:w-auto">
        <div className="flex items-start justify-center flex-col gap-2 w-[70px]">
          <p className="text-[12px] text-gray-200">Floor Price</p>
          <span className="text-white text-sm md:text-lg">
            {" "}
            {collectionData?.floorPrice} Sol
          </span>
        </div>
        <div className="flex items-start justify-center flex-col gap-2 w-[70px]">
          <p className="text-[12px] text-gray-200">Top Offer</p>
          <span className="text-white text-sm md:text-lg">
            {collectionData?.topOffer} Sol
          </span>
        </div>
        <div className="flex items-start justify-center flex-col gap-2 w-[70px]">
          <p className="text-[12px] text-gray-200">24h Vol</p>
          <span className="text-white text-sm md:text-lg">
            {(
              collectionData &&
              collectionData?.totalVolume / collectionData?.listed
            )?.toFixed(2)}
            %
          </span>
        </div>
        <div className="flex items-start justify-center flex-col gap-2 w-[70px]">
          <p className="text-[12px] text-gray-200">24h Sales</p>
          <span className="text-white text-sm md:text-lg">
            {collectionData?.sales}
          </span>
        </div>
        <div className="flex items-start justify-center flex-col gap-2 w-[70px]">
          <p className="text-[12px] text-gray-200">Owners</p>
          <span className="text-white text-sm md:text-lg">71</span>
        </div>
      </div>
    </div>
  );
}
