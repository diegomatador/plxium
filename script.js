let contractAddress1 = "0x5786CaA1e5693a337A355360B3d6b8e40943B6D1";
let contractABI1 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"owners","type":"address[]"}],"name":"getAddressesAndNames","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string[]","name":"names","type":"string[]"}],"internalType":"struct PLXiUMNFT.AddressNames[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getAllNames","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"getPriorityName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"hasAnyNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"isNameAvailable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"referralCode","type":"string"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gameContractAddress","type":"address"}],"name":"setGameContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"setPriorityName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"threeLetter","type":"uint256"},{"internalType":"uint256","name":"fourLetter","type":"uint256"},{"internalType":"uint256","name":"fiveLetter","type":"uint256"},{"internalType":"uint256","name":"moreThanFive","type":"uint256"},{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let contractAddress2 = "0x117AFD082f8ef7107e033c32BBD7E9e626a0755d";
let contractABI2 = [{"inputs":[{"internalType":"address","name":"_mintContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"checkAndStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dailyStrike","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"},{"internalType":"string","name":"referralCode","type":"string"}],"name":"enterGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getBalanceThresholdForLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"getDailyStrikeInfo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"}],"name":"getInfo","outputs":[{"components":[{"internalType":"address","name":"playerAddress","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"}],"internalType":"struct PLXiUM.PlayerBalanceInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"getLevelProgress","outputs":[{"internalType":"uint256","name":"level","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rewardPerHour","type":"uint256"},{"internalType":"uint256","name":"percentToNextLevel","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"getNextLevelInfo","outputs":[{"internalType":"uint256","name":"cost","type":"uint256"},{"internalType":"uint256","name":"hourlyReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"getPlayerPriorityName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"getPlayerRank","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"rank","type":"uint256"},{"internalType":"uint256","name":"playerBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"playerAddress","type":"address"}],"name":"getReferralCode","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"getReferralsInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"topN","type":"uint256"}],"name":"getTopNPlayers","outputs":[{"components":[{"internalType":"address","name":"playerAddress","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"internalType":"struct PLXiUM.PlayerInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mintContractAddress","type":"address"}],"name":"setMintContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeLevel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

import { EthereumClient, w3mConnectors, w3mProvider, WagmiCore, WagmiCoreChains } from "https://unpkg.com/@web3modal/ethereum@2.7.1";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

const { base } = WagmiCoreChains;
const { watchAccount, waitForTransaction, writeContract, configureChains, createConfig, getAccount, readContract, fetchBalance }  = WagmiCore;

const baseSepolia = {
        id: 84532,
        name: 'Base Sepolia',
        network: 'base-sepolia',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://sepolia.base.org'],
          },
          public: {
            http: ['https://sepolia.base.org'],
          },
        },
        blockExplorers: {
          default: {
            name: 'Basescan',
            url: 'https://base-sepolia.blockscout.com',
          },
        },
};

const projectId = "4b8953ae3a579f498e15afac1101b481";
const { chains, publicClient, webSocketPublicClient } = configureChains([baseSepolia], [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({ autoConnect: true, connectors: w3mConnectors({ chains, projectId }),
        publicClient, webSocketPublicClient });
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3Modal = new Web3Modal({ projectId, cacheProvider: true, theme: "dark" }, ethereumClient);

let userAccount;

// ===== DOMContentLoaded =========
document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  try {
    setupSectionButtons();
    await checkWalletConnection();
  } catch (err) {
    console.error("Error load site:", err);
  } finally {
    loader.style.display = "none";
  }
});

function getRefCode() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  return refCode;
}

// ===== Wallet Connection ==========
async function checkWalletConnection() {
  try {
    const w3mCore = document.getElementById("w3mСore");
    const account = getAccount();

    if (account.isConnected) {
      loader.style.display = "none";
      w3mCore.style.display = "none";
      userAccount = account.address;
      checkPriorityName();
    } else {
      const unwatch = watchAccount((updatedAccount) => {
        if (updatedAccount.isConnected) {
          unwatch();
          loader.style.display = "none";
          w3mCore.style.display = "none";
          userAccount = updatedAccount.address;
          checkPriorityName();
        }
      });
    }
  } catch (err) {
    console.error("Error wallet connection:", err);
    loader.style.display = "none";
  }
}

// ===== Sections =========
const sections = {
  mining: document.getElementById("mining"),
  profile: document.getElementById("profile"),
  leaderboard: document.getElementById("leaderboard"),
  invite: document.getElementById("invite"),
  about: document.getElementById("about"),
};

const buttonsm = {
  miningbtn: "mining",
  profilebtn: "profile",
  leaderboardbtn: "leaderboard",
  invitebtn: "invite",
  aboutbtn: "about",
};

const loadedSections = {
  mining: false,
  profile: false,
  invite: false,
  leaderboard: false,
  about: false,
};

function showSection(sectionToShow) {
  Object.entries(sections).forEach(([key, sec]) => {
    sec.style.display = key === sectionToShow ? "flex" : "none";
  });

  Object.entries(buttonsm).forEach(([btnId, secKey]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.classList.toggle("active", secKey === sectionToShow);
    }
  });
}

async function loadSectionWithLoader(section) {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  try {
    showSection(section);

    if (!loadedSections[section]) {
      const loadFunctions = {
        mining: miningfunctions,
        profile: profileInfo,
        invite: Inviteinfo,
        leaderboard: LeaderboardInfo,
      };

      if (loadFunctions[section]) {
        await loadFunctions[section]();
        loadedSections[section] = true;
      }
    }
  } catch (err) {
    console.error(`Ошибка загрузки секции "${section}":`, err);
  } finally {
    loader.style.display = "none";
  }
}

function setupSectionButtons() {
  Object.entries(buttonsm).forEach(([btnId, section]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => loadSectionWithLoader(section));
    }
  });
}


async function switchToBase() {
  try {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log('Текущая сеть:', currentChainId);

    const baseSepoliaChainIdHex = '0x14A74'; // 84532 в 16-ричной системе

    if (currentChainId !== baseSepoliaChainIdHex) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: baseSepoliaChainIdHex }]
        });
        console.log('Сеть успешно переключена на Base Sepolia!');
      } catch (switchError) {
        console.error('Ошибка переключения:', switchError);

        // Если ошибка что сеть не найдена
        if (switchError.code === 4902) {
          try {
            // Добавляем сеть
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: baseSepoliaChainIdHex,
                chainName: 'Base Sepolia',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://base-sepolia.blockscout.com']
              }]
            });
            console.log('Сеть Base Sepolia добавлена!');

            // После добавления пробуем снова переключиться
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: baseSepoliaChainIdHex }]
            });
            console.log('Сеть успешно переключена после добавления!');
          } catch (addError) {
            console.error('Ошибка при добавлении сети:', addError);
          }
        }
      }
    } else {
      console.log('Вы уже подключены к Base Sepolia.');
    }
  } catch (error) {
    console.error('Общая ошибка при работе с сетями:', error);
  }
}


function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}


const profileImg = document.getElementById("profileImg");

profileImg.addEventListener("click", () => {
  web3Modal.openModal();
});


function updateLevelProgress(progressPercent) {
    const progress = document.getElementById("progress-fill");
    if (progress) {
      progress.style.width = `${progressPercent}%`;
    }
  }

document.getElementById("mintMoreToggle").addEventListener("click", () => {
  document.getElementById("mintOverlay").style.display = "flex";
});

async function checkPriorityName() {

  try {
    const hasNFT = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'hasAnyNFT',
      args: [userAccount]
    });

    const checkStarted = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'checkAndStart',
      args: [userAccount]
    });
    const refInput = document.getElementById("refcodeInput");
    if (!hasNFT) {
      document.getElementById("mintSection").style.display = "flex";
      if (checkStarted) {
          refInput.style.display = "none";
        }
        else {
            const refCode = getRefCode();
            if (refCode) {
              refInput.value = refCode;
            }
        }
      return;
    }


    document.getElementById("site").style.display = "flex";
    await getPriorityName();

  } catch (err) {
    console.error("Error getting priority name:", err);
  }
}

async function profileInfo() {
  const nameProfile = document.getElementById('username');
  const adrs = document.getElementById('useraddress');
  const shortadrs = shortenAddress(userAccount);
  adrs.textContent = shortadrs;

  document.getElementById("copyAddr").addEventListener("click", () => {
    const addr = userAccount;
    navigator.clipboard.writeText(addr).then(() => {
      const icon = document.getElementById("copyAddr");
      icon.innerHTML = "✅";
      setTimeout(() => {
        icon.innerHTML = "&#xf0c5;";
      }, 500);
    }).catch(err => {
      console.error("Copy failed:", err);
    });
  });

  try {
    const name = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getPriorityName',
      args: [userAccount]
    });

    const names = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getAllNames',
      args: [userAccount]
    });

    nameProfile.textContent = name;
    const namesContainer = document.getElementById('namesContainer');
    namesContainer.innerHTML = '';

    names.forEach(playerName => {
      if (playerName === name) {
        return;
      }

      const nameItem = document.createElement('div');
      nameItem.classList.add('name-item');

      const nameText = document.createElement('span');
      nameText.textContent = playerName;
      nameItem.appendChild(nameText);

      const setActiveBtn = document.createElement('button');
      setActiveBtn.textContent = 'Set Active';
      setActiveBtn.classList.add('set-active-btn');
      setActiveBtn.addEventListener('click', () => {
        setPriorityName(playerName, setActiveBtn);
      });

      nameItem.appendChild(setActiveBtn);
      namesContainer.appendChild(nameItem);
    });
  } catch (err) {
    console.error("Error getting ProfileInfo", err);
  }
}

async function setPriorityName(name, setActiveBtn) {
  try {
    setActiveBtn.textContent = 'Waiting...';
    setActiveBtn.disabled = true;

    const txHash = await writeContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'setPriorityName',
      args: [name],
    });

    const receipt = await waitForTransaction({
      chainId: 84532,
      hash: txHash.toString(),
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 1) {
      setActiveBtn.textContent = 'Success!';
      setTimeout(() => location.reload(), 500);
    } else {

      setActiveBtn.textContent = 'Failed. Try again.';
      setActiveBtn.disabled = false;
      console.log("Transaction failed", "error");
    }
  } catch (err) {

    setActiveBtn.textContent = 'Error. Try again.';
    console.error("Transaction error:", err);
  } finally {
    setActiveBtn.disabled = false;
  }
}

async function getPriorityName() {
    await miningfunctions();
    await loadSectionWithLoader("mining");
  const nameProfile = document.getElementById('name');
  try {
    const name = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getPriorityName',
      args: [userAccount]
    });
    if (name && nameProfile) {
      nameProfile.textContent = name;
    }
    else {
      nameProfile.textContent = "Unnamed";
    }
  } catch (err) {
    console.error("Error getting priority name:", err);
  }
}

const nameInputEl = document.getElementById("nameInput");
const statusEl = document.getElementById("mintStatus");
const mintBtnEl = document.getElementById("mintBtn");

let debounceTimeout;

nameInputEl.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(checkName, 500);
});

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type;
}

async function checkName() {
  const name = nameInputEl.value.trim();

  statusEl.textContent = "";
  statusEl.className = "info";
  mintBtnEl.disabled = true;
  mintBtnEl.textContent = "Mint";

  if (!name) return;
  if (name.length < 3) {
    setStatus("Name must be at least 3 characters long.", "error");
    return;
  }

  try {
    const available = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'isNameAvailable',
      args: [name]
    });
    if (!available) {
      setStatus("Name is already taken.", "error");
      return;
    }
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name]
    });
    const priceInEth = formatUnits(price, 18);
    mintBtnEl.textContent = `Mint for ${priceInEth} ETH`;
    mintBtnEl.disabled = false;
    setStatus("Name is available!", "success");

  } catch (err) {
    console.error("Error during name check:", err);
    setStatus("Error checking name availability.", "error");
  }
}

mintBtnEl.addEventListener("click", async () => {
  const name = nameInputEl.value.trim();
  const refcode = document.getElementById("refcodeInput")?.value.trim() || "default";

  if (!name) {
    setStatus("Name is required.", "error");
    return;
  }

  try {
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name]
    });
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);
    if (balance < BigInt(price)) {
      setStatus("Not enough balance for mint!");
      return;
    }
    mintBtnEl.textContent = `Waiting for confirmation...`;
    mintBtnEl.disabled = true;
    const txHash = await writeContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'mint',
      args: [name, refcode],
      value: price.toString(),
    });

    const receipt = await waitForTransaction({
      chainId: 84532,
      hash: txHash.toString(),
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
        mintBtnEl.textContent = `Mint successful!`;
        mintBtnEl.disabled = true;
        setTimeout(() => location.reload(), 500);
        }
  } catch (err) {
    console.error("Transaction failed:", err);
  }
});

let nextLevelCost = "0";

async function upgradeLevel() {
  const powerup = document.getElementById('powerup');
  try {
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);
    if (nextLevelCost < BigInt(price)) {
      powerup.textContent = "Not enough balance for upgrade!";
      return;
    }
    powerup.disabled = true;
    powerup.textContent = "Waiting for confirmation...";
    const txHash = await writeContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'upgradeLevel',
      args: [],
      value: nextLevelCost.toString(),
    });

    const receipt = await waitForTransaction({
      chainId: 84532,
      hash: txHash.toString(),
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      powerup.textContent = "Level Upgraded!";
      setStatus("Level upgraded! Reloading...", "success");
      await miningfunctions();

    } else {
      powerup.textContent = "Try Again";
      powerup.disabled = false;
      setStatus("Transaction failed: " + err.message, "error");
    }
  } catch (err) {
    console.error("Transaction failed:", err);
    powerup.textContent = "Try Again";
    powerup.disabled = false;
    setStatus("Transaction failed: " + err.message, "error");
  }
}

async function dailyStrike() {
  const collectr = document.getElementById('collectr');
  try {
    const valueInWei = BigInt("100000000000000");
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);
    if (balance < valueInWei) {
      collectr.textContent = "Not enough balance for collect rewards!";
      return;
    }

    collectr.disabled = true;
    collectr.textContent = "Waiting for confirmation...";
    const txHash = await writeContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'dailyStrike',
      args: [],
      value: valueInWei.toString(),
    });

    const receipt = await waitForTransaction({
      chainId: 84532,
      hash: txHash.toString(),
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      collectr.textContent = "Collected!";
      await miningfunctions();
      }
      else{
        collectr.textContent = "Try Again";
        collectr.disabled = false;
      }


  } catch (err) {
    console.error("Transaction failed:", err);
    collectr.textContent = "Try Again";
    collectr.disabled = false;
  }
}

document.getElementById("powerup").addEventListener("click", upgradeLevel);
document.getElementById("collectr").addEventListener("click", dailyStrike);

async function miningfunctions() {
    const collectr = document.getElementById('collectr');
  const powerup = document.getElementById('powerup');
  const levels = document.getElementById('level');
  const balances = document.getElementById('balance');
  const rewarddailys = document.getElementById('rewarddaily');

  try {
    const striked = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getDailyStrikeInfo',
      args: [userAccount]
    });
    const result1 = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getNextLevelInfo',
      args: [userAccount]
    });

    const result = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getLevelProgress',
      args: [userAccount]
    });

      const level = result[0];
      const balance = result[1];
      const rewarddaily = result[2];
      const percentToNextLevel = result[3];

    if (result && levels) {
      nextLevelCost = result1[0];
      const costEth = formatUnits(nextLevelCost, 18);
      powerup.textContent = `Power Up for ${parseFloat(costEth).toFixed(4)} ETH`;

      levels.textContent = level;
      balances.textContent = `${balance} PLX`;
      rewarddailys.textContent = `${rewarddaily}`;
      updateLevelProgress(percentToNextLevel);
    }
    if (striked) {
      collectr.style.display = "flex";
      document.getElementById('miningImg').classList.add('disabled');
    } else {
      collectr.style.display = "none";
      document.getElementById('miningImg').classList.remove('disabled');
    }
  } catch (err) {
    console.error("Error miningfunctions", err);
  }
}

async function Inviteinfo() {
    const refCode = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getReferralCode',
      args: [userAccount]
    });
  const fullRefLink = `https://plxium.xyz/?ref=${refCode}`;
  document.getElementById("refLink").innerText = fullRefLink;

  document.getElementById("copyRefBtn").onclick = () => {
    navigator.clipboard.writeText(fullRefLink);
    document.getElementById("copyRefBtn").innerText = "Copied!";
    setTimeout(() => {
      document.getElementById("copyRefBtn").innerText = "Copy";
    }, 1000);
  };
    const result = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getReferralsInfo',
      args: [userAccount]
    });
    const count = parseInt(result[0]);
    const addresses = result[1];
    const balances = result[2];
    const names = result[3];

    const list = document.getElementById("referralsList");
    list.innerHTML = "";

    const countBlock = document.createElement("div");
    countBlock.className = "referral-count";
    countBlock.innerHTML = `<p>You have <span class="count-number">${count}</span> referral${count !== 1 ? "s" : ""}</p>`;
    list.appendChild(countBlock);

    addresses.forEach((address, index) => {
      const item = document.createElement("div");
      item.className = "referral-item";
      item.innerHTML = `
        <span class="referral-name">${names[index] || "Unnamed"}</span>
        <span class="referral-balance">${balances[index]}</span>
      `;
      list.appendChild(item);
    });
}

async function LeaderboardInfo() {
  const rank = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getPlayerRank',
      args: [userAccount]
    });
  const topPlayers = await readContract({
      address: contractAddress2,
      abi: contractABI2,
      functionName: 'getTopNPlayers',
      args: [50]
    });

  document.getElementById("player-rank").innerText = `${rank[1]}`;
  document.getElementById("player-name").innerText = `${rank[0] || 'Unnamed'}`;
  document.getElementById("player-balance").innerText = `${rank[2]}`;

  const list = document.getElementById("topPlayersList");
  list.innerHTML = "";

  topPlayers.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player-item";
    div.innerHTML = `
      <span class="player-rank-number">${index + 1}</span>
      <span class="player-name">${player.name || 'Unnamed'}</span>
      <span class="player-balance">${player.balance}</span>
    `;
    list.appendChild(div);
  });
}

const nameInputpr = document.getElementById("namein");
const statuspr = document.getElementById("mintSs");
const mintBtnpr = document.getElementById("mintmoreBtn");
const mintOverlaypr = document.getElementById("mintOverlay");
const mintModalpr = document.getElementById("mintmore");

let debounceTimeoutPr;

mintOverlaypr.addEventListener("click", (e) => {
  if (!mintModalpr.contains(e.target)) {
    mintOverlaypr.style.display = "none";
  }
});

nameInputpr.addEventListener("input", () => {
  clearTimeout(debounceTimeoutPr);
  debounceTimeoutPr = setTimeout(checkNamePr, 500);
});

function formatUnits(value, decimals = 18) {
  value = BigInt(value).toString().padStart(decimals + 1, '0');
  const intPart = value.slice(0, -decimals);
  const fracPart = value.slice(-decimals).replace(/0+$/, '');
  return fracPart ? `${intPart}.${fracPart}` : intPart;
}

async function checkNamePr() {
  const name = nameInputpr.value.trim();

  statuspr.textContent = "";
  statuspr.className = "info";
  mintBtnpr.disabled = true;
  mintBtnpr.textContent = "Mint";

  if (!name) return;
  if (name.length < 3) {
    setStatuss("Name must be at least 3 characters long.", "error");
    return;
  }

  try {
    const available = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'isNameAvailable',
      args: [name]
    });

    if (!available) {
      setStatuss("Name is already taken.", "error");
      return;
    }
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name]
    });
    const priceInEth = formatUnits(price, 18);
    mintBtnpr.textContent = `Mint for ${priceInEth} ETH`;
    mintBtnpr.disabled = false;
    setStatuss("Name is available!", "success");

  } catch (err) {
    console.error("Error during name check:", err);
    setStatuss("Error checking name availability.", "error");
  }
}

mintBtnpr.addEventListener("click", async () => {
  const name = nameInputpr.value.trim();
  const refcode = "default";

  if (!name) {
    setStatuss("Name is required.", "error");
    return;
  }

  try {
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name]
    });
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);
    if (balance < BigInt(price)) {
      mintBtnpr.textContent = `Not enough balance for mint.`;
      return;
    }
    mintBtnpr.textContent = `Waiting for confirmation...`;
    mintBtnpr.disabled = false;
    const txHash = await writeContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'mint',
      args: [name, refcode],
      value: price.toString(),
    });

    const receipt = await waitForTransaction({
      chainId: 84532,
      hash: txHash.toString(),
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
        mintBtnpr.textContent = `Minted`;
        mintBtnpr.disabled = false;
        setTimeout(() => location.reload(), 1000);
        }
        else {
        mintBtnpr.textContent = `Try again`;
        mintBtnpr.disabled = false;
        }
  } catch (err) {
    setStatuss("Transaction failed: " + err.message, "error");
    mintBtnpr.textContent = `Try again`;
    mintBtnpr.disabled = false;
  }
});

function setStatuss(text, type) {
  statuspr.textContent = text;
  statuspr.className = type;
}
