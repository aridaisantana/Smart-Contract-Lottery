import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const dispatch = useNotification();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  const updateUI = async () => {
    const entranceFeeFromContract = (await getEntranceFee()).toString();
    setEntranceFee(entranceFeeFromContract);
    const numberOfPlayers = (await getNumberOfPlayers()).toString();
    setNumberOfPlayers(numberOfPlayers);
    const recentWinner = (await getRecentWinner()).toString();
    setRecentWinner(recentWinner);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Tx Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      <div className="flex">
        <div className="m-auto">
          <h1 className="mt-5 font-bold lg:text-4xl md:text-3xl sm:text-2xl text-lg">
            Welcome to the Decentralized Lottery!
          </h1>
          <p className="text-center font-extralight mt-3">
            100% fair for everyone thanks to Smart Contracts 😎
          </p>
        </div>
      </div>
      <div className="items-center justify-center m-auto py-5">
        {raffleAddress ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () =>
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              <div>Enter Raffle</div>
            )}
          </button>
        ) : (
          <div>No Raffle Address Detected</div>
        )}
        <p>
          Lottery Entrance Fee:
          {ethers.utils.formatUnits(entranceFee, "ether")} ETH
        </p>
        <p> Number of Players: {numberOfPlayers}</p>
        <p>Recent Winner: {recentWinner}</p>
      </div>
    </div>
  );
};

export default LotteryEntrance;
