"use client";

import { FC, useContext, useMemo, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Modal from "react-responsive-modal";
import { CloseIcon } from "@/components/SvgIcons";
import { NFTDataContext } from "@/contexts/NFTDataContext";
import { ModalContext } from "@/contexts/ModalContext";
import { errorAlert, successAlert } from "../ToastGroup";
import { OwnNFTDataType, RedeemModalProps } from "@/types/types";
import { CiWarning } from "react-icons/ci";
import { LoadingContext } from "@/contexts/LoadingContext";
import { createCreateAuctionPnftTx } from "@/utils/libs/scripts";
import { createAuctionPNft } from "@/utils/contractScript";
import { createAuctionNftApi } from "@/utils/api";
import { CollectionContext } from "@/contexts/CollectionContext";

const AuctionModal = (props: { nftItem: OwnNFTDataType | undefined }) => {
  const wallet = useAnchorWallet();
  const { connected, publicKey } = useWallet();
  const { auctionModalShow, closeAuctionModal } = useContext(ModalContext);
  const { getAllListedNFTs, getOwnNFTs, getAllListedNFTsBySeller } =
    useContext(NFTDataContext);
  const { getAllCollectionData } = useContext(CollectionContext);

  const { openFunctionLoading, closeFunctionLoading } =
    useContext(LoadingContext);
  const [startPrice, setStartPrice] = useState(0);
  const [minIncreaseAmount, setMinIncreaseAmount] = useState(0);
  const [auctionDuration, setAuctionDuration] = useState(0);

  const handleDateChange = (e: any) => {
    const dateValue = e.target.value;
    setAuctionDuration(dateValue);

    // Create a new Date object
    const dateObject = new Date(dateValue);

    // Get the timestamp
    const timestamp = dateObject.getTime();

    setAuctionDuration(timestamp);
  };

  const handleCreateAuction = async () => {
    const dateObject = new Date();
    const timestamp = dateObject.getTime();
    const canAuctionState =
      startPrice !== 0 &&
      minIncreaseAmount !== 0 &&
      timestamp < auctionDuration;

    if (!canAuctionState || !wallet) {
      errorAlert("Input the value correctly.");
    } else {
      openFunctionLoading();

      try {
        const tx = await createAuctionPNft(
          wallet,
          props.nftItem!,
          startPrice,
          minIncreaseAmount,
          auctionDuration,
          true
        );

        const result = await createAuctionNftApi(tx.transaction, tx.auction);
        if (tx) {
          if (result.type === "success") {
            // Refresh data after successful listing
            await Promise.all([
              getOwnNFTs(),
              getAllListedNFTsBySeller(),
              getAllListedNFTs(),
              getAllCollectionData(),
            ]);
            closeAuctionModal();
            successAlert("Success");
          } else {
            errorAlert("Something went wrong.");
          }
        } else {
          errorAlert("Something went wrong.");
        }
      } catch (e) {
        console.error("Error:", e);
        errorAlert("Something went wrong.");
      } finally {
        closeFunctionLoading();
      }
      console.log("start auction");
    }
  };

  return (
    <Modal open={auctionModalShow} onClose={closeAuctionModal} center>
      <div className="rounded-lg flex items-start gap-3 justify-start relative flex-col md:p-5 pr-2 sm:pr-0">
        <div
          className="absolute top-0 right-2 cursor-pointer z-20"
          onClick={closeAuctionModal}
        >
          <CloseIcon />
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-white uppercase text-3xl font-bold mt-1 text-center">
            create auction
          </h1>
        </div>

        <div className="w-full">
          <span className="text-gray-300">Start Price:</span>
          <div className="bg-drakgreen border border-customborder rounded-md p-1 text-white w-full sm:w-[350px] text-center flex items-center justify-start gap-2">
            <input
              className="outline-none bg-transparent text-white py-1 w-full px-1 text-sm"
              placeholder="0"
              type="number"
              onChange={(e) => setStartPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="w-full">
          <span className="text-gray-300">Min Increase Amount:</span>
          <div className="bg-drakgreen border border-customborder rounded-md p-1 text-white w-full sm:w-[350px] text-center flex items-center justify-start gap-2">
            <input
              className="outline-none bg-transparent text-white py-1 w-full px-1 text-sm"
              placeholder="0"
              type="number"
              onChange={(e) => setMinIncreaseAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="w-full">
          <span className="text-gray-300">Auction End Time:</span>
          <div className="bg-drakgreen border border-customborder rounded-md p-1 text-white w-full sm:w-[350px] text-center flex items-center justify-start gap-2">
            <input
              className="outline-none bg-transparent text-white py-1 w-full px-1 text-sm"
              type="datetime-local"
              onChange={(e) => handleDateChange(e)}
            />
          </div>
        </div>
        <div
          className={`w-full rounded-md py-[6px] text-center bg-green-600 duration-200 hover:bg-green-700 text-white cursor-pointer`}
          onClick={handleCreateAuction}
        >
          Create Auction
        </div>
        <div className="text-center w-full flex items-center justify-center">
          <span className="text-gray-300 text-[13px] flex gap-1">
            <CiWarning color="white" size={20} className="-mt-[2px]" />
            Auction end time must be bigger than the current time.{" "}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default AuctionModal;
function closeFunctionLoading() {
  throw new Error("Function not implemented.");
}
