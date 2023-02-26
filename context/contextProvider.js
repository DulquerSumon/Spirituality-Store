import { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { abi, contractAddresses } from "../constants";

export const Web3Context = createContext();

const injected = new InjectedConnector();
export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const {
    active,
    activate,
    deactivate,
    account,
    library: provider,
  } = useWeb3React();

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) alert("Please install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts);
      activate(injected);
    } else {
      console.log("No accounts found");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const getContract = async (providerOrSigner) => {
    const contract = new ethers.Contract(
      contractAddresses[0],
      abi,
      // eslint-disable-next-line comma-dangle
      providerOrSigner
    );
    return contract;
  };
  const Contract = async () => {
    let contract;
    if (active) {
      const signer = await provider.getSigner();
      contract = getContract(signer);
      return contract;
    }
    const providers = new Web3Provider(window.ethereum);
    contract = getContract(providers);

    return contract;
  };

  const shareSpirit = async (words) => {
    if (active) {
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      try {
        await contract.shareSpirit(words);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please connect your wallet");
    }
  };
  const getSpirits = async () => {
    const providers = new Web3Provider(window.ethereum);
    const contract = await getContract(providers);
    try {
      const spirits = await contract.getSpirit();
      const items = await Promise.all(
        spirits.map(async ({ quotes, quoter, points }) => {
          const quote = quotes;
          const quot = quoter;
          const point = points;
          const s = [quote, quot, point];
          return s;
          // eslint-disable-next-line comma-dangle
        })
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const connect = async () => {
    if (!window.ethereum) alert("Please install MetaMask!");
    if (active) {
      deactivate();
      setCurrentAccount("");
    } else {
      await activate(injected);
      await checkIfWalletIsConnected().then(window.location.reload());
    }
  };

  return (
    <Web3Context.Provider
      value={{
        active,
        connect,
        account,
        Contract,
        getSpirits,
        shareSpirit,
        currentAccount,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
