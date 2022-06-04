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
  const [isTxLoading, setIsTxLoading] = useState(false);
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
    if (isWeb3Enabled && chainId in contractAddresses) {
      updateUI();
    } else if (isWeb3Enabled && !(chainId in contractAddresses)) {
      const supportedChains = Object.keys(contractAddresses).toString();
      dispatch({
        type: "error",
        message: "Please connect to a supported chain: " + supportedChains,
        title: "Wrong chain",
        position: "topR",
        icon: "exclamation",
      });
    }
  }, [isWeb3Enabled, chainId]);

  const handleSuccess = async (tx) => {
    setIsTxLoading(true);
    await tx.wait(1);
    setIsTxLoading(false);
    handleNewNotification();
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
    <div className="container mx-auto p-2">
      <div className="flex border-b-2 w-100">
        <div className="m-auto">
          <h1 className="mt-15 md:mt-20 text-center font-bold lg:text-4xl md:text-3xl sm:text-2xl text-lg">
            Welcome to the Decentralized Lottery!
          </h1>
          <p className="text-center text-sm md:text-xl font-bold  m-3">
            100% fair for everyone thanks to Smart Contracts 😎
          </p>
        </div>
      </div>
      <div className="pt-8 font-mono flex">
        <div className="m-auto ">
          <p className="sm:text-base md:text-lg">
            {" "}
            Number of Players: {numberOfPlayers}
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            Recent Winner: {recentWinner}
          </p>
          <div className="mt-5 text-sm md:text-md flex-col">
            {raffleAddress ? (
              <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-green-400 hover:to-blue-500 font-bold py-2 px-4 rounded ml-auto"
                onClick={async () =>
                  await enterRaffle({
                    onSuccess: handleSuccess,
                    onError: (error) => console.log(error),
                  })
                }
                disabled={isLoading || isFetching || isTxLoading}
              >
                {isLoading || isFetching || isTxLoading ? (
                  <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                ) : (
                  <div>Enter Raffle</div>
                )}
              </button>
            ) : (
              <p>You need a connected account for playing!</p>
            )}
            <p>
              Lottery Entrance Fee:{" "}
              {ethers.utils.formatUnits(entranceFee, "ether")} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryEntrance;
