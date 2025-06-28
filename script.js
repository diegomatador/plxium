import { contractAddress1, contractAddress2, contractABI1, contractABI2 } from './contracts.js';

import { EthereumClient, w3mConnectors, w3mProvider, WagmiCore, WagmiCoreChains } from "https://unpkg.com/@web3modal/ethereum@2.7.1";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
const { base } = WagmiCoreChains;
const { watchAccount, waitForTransaction, writeContract, configureChains, createConfig, getAccount, readContract, fetchBalance }  = WagmiCore;
import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
} from "https://esm.sh/viem@2.28.3";

const projectId = "4b8953ae3a579f498e15afac1101b481";

const chainid = 8453
const chainIdHex = "0x2105";
let isFarcaster = false;
let webSocketPublicClient;
let publicClient;
let ethereumClient;
let ethProviderr;
let userAccount;
let web3Modal;
let walletClient;


async function switchToBase() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    console.log("Switch to Base");
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: chainIdHex,
            chainName: "Base Mainnet",
            rpcUrls: ["https://mainnet.base.org"],
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://basescan.org"],
          }],
        });
        console.log("Base added");
      } catch (addError) {
        console.error("Error in Base added", addError);
      }
    } else {
      console.error("Error to switch Base:", switchError);
    }
  }
}

let chains = [base];

async function getPlatform() {
  try {
    const isMiniApp = await sdk.isInMiniApp()
    if (isMiniApp) {
      await sdk.actions.ready({ disableNativeGestures: true });
      isFarcaster = true;
      
      const ethProvider = sdk.wallet.ethProvider;
      ethProviderr = ethProvider;

      publicClient = createPublicClient({
        transport: http("https://base.drpc.org"),
        chain: base,
      });

      const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: [],
        publicClient: publicClient,
      });

      ethereumClient = new EthereumClient(wagmiConfig, chains);
      
      console.log("Mini App");

      walletClient = createWalletClient({
        chain: base,
        transport: custom(ethProviderr),
        account: userAccount,
      });
    } else {
      const { publicClient: browserPublicClient, webSocketPublicClient } = configureChains(
        chains,
        [w3mProvider({ projectId })]
      );

      publicClient = browserPublicClient;
      ethProviderr = null;

      const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ chains, projectId }),
        publicClient: publicClient,
        webSocketPublicClient,
      });

      ethereumClient = new EthereumClient(wagmiConfig, chains);
      web3Modal = new Web3Modal({ projectId, theme: 'dark' }, ethereumClient);
      console.log("🌐");
    }
  } catch (error) {
    console.error("Error in Getplatform:", error);
  }
}

// ===== DOMContentLoaded =========
document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  try {
    await getPlatform();
    await checkWalletConnection();
    setupSectionButtons();
  } catch (err) {
    console.error("Error load site:", err);
  } finally {
    loader.style.display = "none";
  }
});

// ===== Wallet Connection ==========
async function checkWalletConnection() {
  try {
    const w3mCore = document.getElementById("w3mСore");

    if (isFarcaster) {
      const accounts = await ethProviderr.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      console.log(userAccount);
      loader.style.display = "none";
      if (w3mCore) w3mCore.style.display = "none";
      checkPriorityName();
      const context = await sdk.context;
      if (!context.client.added){
        await sdk.actions.addFrame()
      }
    } else {

      const account = getAccount();

      if (account.isConnected) {
        loader.style.display = "none";
        if (w3mCore) w3mCore.style.display = "none";
        userAccount = account.address;
        checkPriorityName();
        switchToBase();
      } else {
        const unwatch = watchAccount((updatedAccount) => {
          if (updatedAccount.isConnected) {
            unwatch();
            loader.style.display = "none";
            if (w3mCore) w3mCore.style.display = "none";
            userAccount = updatedAccount.address;
            checkPriorityName();
            switchToBase();
          }
        });
      }
    }

  } catch (err) {
    console.error("Error wallet connection:", err);
    loader.style.display = "none";
  }
}

function getRefCode() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  return refCode;
}

// ===== Sections =========
const sections = {
  mining: document.getElementById("mining"),
  profile: document.getElementById("profile"),
  tasks: document.getElementById("tasks"),
  invite: document.getElementById("invite"),
  about: document.getElementById("about"),
};

const buttonsm = {
  miningbtn: "mining",
  profilebtn: "profile",
  tasksbtn: "tasks",
  invitebtn: "invite",
  aboutbtn: "about",
};

const loadedSections = {
  mining: false,
  profile: false,
  invite: false,
  tasks: false,
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
        tasks: TasksInfo,
        invite: Inviteinfo,
      };

      if (loadFunctions[section]) {
        await loadFunctions[section]();
        loadedSections[section] = true;
      }
    }
  } catch (err) {
    console.error(`Error loading Sections "${section}":`, err);
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

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}


const profileImg = document.getElementById("profileImg");

profileImg.addEventListener("click", () => {
  if (isFarcaster){ return }
  else { web3Modal.openModal(); }
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
      args: [userAccount],
      publicClient: publicClient,
    });

    const checkStarted = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'checkAndStart',
      args: [userAccount],
      publicClient: publicClient,
    });

    const refInput = document.getElementById("refcodeInput");

    if (!hasNFT) {
      document.getElementById("mintSection").style.display = "flex";
      if (checkStarted) {
        refInput.style.display = "none";
      } else {
        const refCode = getRefCode();
        if (refCode) {
          refInput.value = refCode;
        }
      }
      return;
    }

    document.body.classList.add('site-active');
    document.getElementById("site").style.display = "flex";
    await getPriorityName();
    await loadSectionWithLoader("mining");
  } catch (err) {
    console.error("Error getting priority name:", err);
  }
}

const withdrawBtnpr = document.getElementById("withdraw");

async function profileInfo() {
  const nameProfile = document.getElementById('username');
  const Profilelogo = document.getElementById('profilelogo');
  const adrs = document.getElementById('useraddress');

  const shortadrs = shortenAddress(userAccount);
  adrs.textContent = shortadrs;

    document.getElementById("copyAddr").addEventListener("click", () => {
      const addr = userAccount;
      navigator.clipboard.writeText(addr).then(() => {
        const icon = document.getElementById("copyAddr");
        icon.className = "fas fa-check";
        setTimeout(() => {
          icon.className = "fas fa-copy";
        }, 500);
      }).catch(err => {
        console.error("Copy failed:", err);
      });
    });
  try {
    const hasUserRewards = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'hasUserRewards',
      args: [userAccount],
      publicClient: publicClient,
    });
    if (!hasUserRewards) {
      withdrawBtnpr.disabled = true;
    }
  } catch (err) {
    console.error("Error getting hasUserReward", err);
  }
  try {
    const name = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getPriorityName',
      args: [userAccount],
      publicClient: publicClient,
    });

    const names = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getAllNames',
      args: [userAccount],
      publicClient: publicClient,
    });

    nameProfile.textContent = name;
    const namesContainer = document.getElementById('namesContainer');
    namesContainer.innerHTML = '';

    const profilelogo = document.getElementById('profilelogo');
    if (borderColor) {
        profilelogo.style.border = `5px solid ${borderColor}`;
    }

    const nameLength = name.length;
    const imageFile = imageMap[nameLength] || "6.webp";
    Profilelogo.src = `images/${imageFile}`;

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

     let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "setPriorityName",
        args: [name],
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
          address: contractAddress1,
          abi: contractABI1,
          functionName: 'setPriorityName',
          args: [name],
        });
      txHash = tx.hash;
    }


    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
          setActiveBtn.textContent = 'Success!';
          await getPriorityName();
          await profileInfo();
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
const imageMap = {
    3: "3.webp",
    4: "4.webp",
    5: "5.webp"
};

let borderColor;

async function getPriorityName() {
  const profileImg = document.getElementById("profileImg");
  const nameProfile = document.getElementById('name');
  const profileBorder = document.getElementById('profileBorder');

  try {
    const name = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getPriorityName',
      args: [userAccount],
      publicClient: publicClient,
    });
    if (name && nameProfile) {
      nameProfile.textContent = name;
      const nameLength = name.length;

    if (nameLength === 3) {
        borderColor = '#009ff9';
    } else if (nameLength === 4) {
        borderColor = '#ffd700';
    } else if (nameLength === 5) {
        borderColor = '#c0c0c0';
    } else if (nameLength > 5) {
        borderColor = '#cd7f32';
    }

      profileBorder.querySelector('img').style.border = `2px solid ${borderColor}`;
      const imageFile = imageMap[nameLength] || "6.webp";
      profileImg.src = `images/${imageFile}`;
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
mintBtnEl.disabled = false;

let debounceTimeout;

nameInputEl.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(checkName, 500);
});

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type;
}

let priceMint;

async function checkName() {
  const name = nameInputEl.value.trim();

  statusEl.textContent = "";
  statusEl.className = "info";
  mintBtnEl.disabled = true;
  mintBtnEl.textContent = "Mint";

  if (!name) return;
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setStatus("Name must contain only eng letters and numbers.", "error");
      return;
    }

  if (name.length < 3) {
    setStatus("Name must be at least 3 characters long.", "error");
    return;
  }

  if (/\s/.test(name)) {
      setStatus("Name must be one continuous word", "error");
      return;
    }

  if (name.length > 32) {
      setStatus("Name must be no more than 32 characters long.", "error");
      return;
    }

  try {
    const available = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'isNameAvailable',
      args: [name],
      publicClient: publicClient,
    });
    if (!available) {
      setStatus("Name is already taken.", "error");
      return;
    }
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name],
      publicClient: publicClient,
    });
    priceMint = price[0];

    const priceInEth = formatUnits(price[0], 18);
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
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);

    if (balance < BigInt(priceMint)) {
      setStatus("Not enough balance for mint!");
      return;
    }

    mintBtnEl.textContent = `Waiting for confirmation...`;
    mintBtnEl.disabled = true;

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "mint",
        args: [name, refcode],
        value: BigInt(priceMint),
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "mint",
        args: [name, refcode],
        value: priceMint.toString(),
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
        mintBtnEl.textContent = `Mint successful!`;
        setTimeout(() => {location.reload();}, 500);
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

    if (nextLevelCost > balance) {
      const originalText = powerup.textContent;
      powerup.textContent = "Not enough balance for upgrade!";
      powerup.disabled = true;
      setTimeout(() => {
        powerup.textContent = originalText;
        powerup.disabled = false;
      }, 1000);
      return;
    }

    powerup.disabled = true;
    powerup.textContent = "Waiting for confirmation...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "upgradeLevel",
        args: [],
        value: BigInt(nextLevelCost),
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
          address: contractAddress1,
          abi: contractABI1,
          functionName: 'upgradeLevel',
          args: [],
          value: nextLevelCost.toString(),
        });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      powerup.textContent = "Upgraded!";
      powerup.disabled = false;
      await miningfunctions();
      loadedSections.tasks = false;
    } else {
      powerup.textContent = "Try Again";
      powerup.disabled = false;
    }
  } catch (err) {
    console.error("Transaction failed:", err);
    powerup.textContent = "Try Again";
    powerup.disabled = false;
  }
}

async function dailyStrike() {
  const collectr = document.getElementById('collectr');
  try {

    collectr.disabled = true;
    collectr.textContent = "Waiting for confirmation...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "dailyStrike",
        args: [],
        account: userAccount,

      });
    } else {
      await switchToBase();
      const tx = await writeContract({
          address: contractAddress1,
          abi: contractABI1,
          functionName: 'dailyStrike',
          args: [],
        });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      collectr.textContent = "Collected!";
      await miningfunctions();
      loadedSections.tasks = false;
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
  const powerup = document.getElementById('powerup');
  const levels = document.getElementById('level');
  const balances = document.getElementById('balance');
  const rewarddailys = document.getElementById('rewarddaily');

  try {
    const striked = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getDailyStrikeInfo',
      args: [userAccount],
      publicClient: publicClient,
    });
    const result1 = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getNextLevelInfo',
      args: [userAccount],
      publicClient: publicClient,
    });

    const result = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getLevelProgress',
      args: [userAccount],
      publicClient: publicClient,
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

    const collectr = document.getElementById('collectr');
    if (striked) {
        document.getElementById('neon').classList.add('disabled');
        document.getElementById('cc').classList.add('disabled');
        document.getElementById('fan').classList.add('disabled');
        document.getElementById('case').classList.add('disabled');
        collectr.style.display = "flex";
    } else {
      document.getElementById('neon').classList.remove('disabled');
        document.getElementById('cc').classList.remove('disabled');
        document.getElementById('fan').classList.remove('disabled');
        document.getElementById('case').classList.remove('disabled');
      document.getElementById('fan').classList.add('active');
      collectr.style.display = "none";
    }
  } catch (err) {
    console.error("Error miningfunctions", err);
  }
}

async function Inviteinfo() {

    const refInfo = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getReferralsInfo',
      args: [userAccount],
      publicClient: publicClient,
    });

    const refCount = document.getElementById("refcount");
    const refEarned = document.getElementById("refEarned");
    const refEarnedEth = document.getElementById("refEarnedEth");

    if (refInfo && refInfo.length > 0) {

      const referrals = Number(refInfo[1]);
      const refEarnedNumber = referrals * 50;
      const earnedEth = Number(refInfo[2]) / 10**18;

      refCount.textContent = `${referrals}`;
      refEarned.textContent = `${refEarnedNumber}`;
      refEarnedEth.textContent = `${earnedEth}`;
    }

    const fullRefLink = `https://plxium.xyz/?ref=${refInfo[0]}`;
    const refLink = document.getElementById("refLink");
    refLink.textContent = `${fullRefLink}`;
    const FarcasterRefLink = `https://farcaster.xyz/miniapps/RScuXQVeCnAe/plxium/?ref=${refInfo[0]}`
    document.getElementById("copyRefBtn").onclick = () => {
      navigator.clipboard.writeText(fullRefLink);
      document.getElementById("copyRefBtn").innerText = "Copied!";
      setTimeout(() => {
        document.getElementById("copyRefBtn").innerText = "Copy";
      }, 1000);
    };

    const shareRefBtn = document.getElementById("shareRefBtn");
    const shareOptions = document.getElementById("shareOptions");
    let outsideClickListenerAdded = false;

    shareRefBtn.onclick = () => {
      if (isFarcaster) {
        const isHidden = shareOptions.style.display === "none" || !shareOptions.style.display;
        shareOptions.style.display = isHidden ? "block" : "none";

        if (isHidden && !outsideClickListenerAdded) {
          setTimeout(() => {
            document.addEventListener("click", outsideClickListener);
            outsideClickListenerAdded = true; }, 0);
        }

        document.getElementById("twitterShareBtn").onclick = () => {
          const tweetText = encodeURIComponent("Join me in PLXium and receiving rewards");
          const tweetUrl = encodeURIComponent(FarcasterRefLink);
          const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
          window.open(twitterShareUrl, "_blank");
          hideShareOptions();
        };

        document.getElementById("warpcastShareBtn").onclick = async () => {
          try {
            await window.warpcast.share({
              text: "Join me in PLXium and receiving rewards",
              url: FarcasterRefLink,
            });
            hideShareOptions();
          } catch (error) {
            console.error("Warpcast share failed:", error);}
        };
        } else {
        const tweetText = encodeURIComponent("Join me in PLXium and start mining 🚀");
        const tweetUrl = encodeURIComponent(fullRefLink);
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
        window.open(twitterShareUrl, "_blank");
      }
    };

    function hideShareOptions() {
      shareOptions.style.display = "none";
      document.removeEventListener("click", outsideClickListener);
      outsideClickListenerAdded = false;
    }

    function outsideClickListener(event) {
      if (!shareOptions.contains(event.target) && !shareRefBtn.contains(event.target)) {
        hideShareOptions();}
    }
}


function formatNumberShort(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

async function TasksInfo() {

  const RewardsInfo = await readContract({
    address: contractAddress1,
    abi: contractABI1,
    functionName: 'getRewardsInfo',
    args: [userAccount],
    publicClient: publicClient,
  });

  const AvailableRewards = await readContract({
    address: contractAddress2,
    abi: contractABI2,
    functionName: 'getAvailableRewards',
    args: [userAccount],
    publicClient: publicClient,
  });

  const rewardMilestones = {
    referral: [3, 5, 10],
    level: [3, 5, 10, 20, 30],
    balance: [3000, 7000, 10000, 20000, 30000],
    strike: [3, 10, 30, 50],
    upgrade: [1, 3, 5, 10],
  };

  const taskTitles = {
    referral: 'Invite Friends',
    level: 'Reach Level',
    balance: 'Reach Balance',
    strike: 'Collect Daily Tokens',
    upgrade: 'Upgrade Power',
  };

  const taskData = {
    level: { value: Number(RewardsInfo[0]), available: AvailableRewards[1] },
    referral: { value: Number(RewardsInfo[2]), available: AvailableRewards[0] },
    balance: { value: Number(RewardsInfo[1]), available: AvailableRewards[2] },
    strike: { value: Number(RewardsInfo[3]), available: AvailableRewards[3] },
    upgrade: { value: Number(RewardsInfo[4]), available: AvailableRewards[4] },
  };

  const taskList = document.getElementById('taskss');
  taskList.style.display = 'block';
  taskList.innerHTML = '';

  for (let key of ['referral', 'level', 'balance', 'strike', 'upgrade']) {
    const { value, available } = taskData[key];
    const milestones = rewardMilestones[key];
    const title = taskTitles[key];

    const maxValue = milestones[milestones.length - 1];
    const progressPercent = Math.min(Math.round((value / maxValue) * 100), 100);

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const milestoneSpans = milestones.map((m) => {
      const left = (m / maxValue) * 100;
      return `<span class="milestone" style="left:${left}%">${formatNumberShort(m)}</span>`;
    }).join('');

    taskDiv.innerHTML = `
        <h3>${title}</h3>
        <div class="progress-wrapper">
          <div class="progress-container">
            <div class="milestone-labels">${milestoneSpans}</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
          <button class="mint-btn" ${available ? '' : 'disabled'}>Mint</button>
        </div>
      `;

    const mintButton = taskDiv.querySelector('.mint-btn');
    mintButton.addEventListener('click', async () => {
      if (!available) return;
      switch (key) {
        case 'referral':
          await mintReferralRewards(mintButton);
          break;
        case 'level':
          await mintLevelRewards(mintButton);
          break;
        case 'balance':
          await mintBalanceRewards(mintButton);
          break;
        case 'strike':
          await mintStrikeRewards(mintButton);
          break;
        case 'upgrade':
          await mintUpgradeRewards(mintButton);
          break;
      }
    });

    taskList.appendChild(taskDiv);
  }
}

async function mintReferralRewards(mintButton) {
  try {
    mintButton.disabled = true;
    mintButton.textContent = "Minting...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: "mintReferralRewards",
        account: userAccount,
      });
    } else {
        await switchToBase();
      const tx = await writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: 'mintReferralRewards',
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      mintButton.textContent = `Minted`;
      await TasksInfo();
    } else {
      mintButton.textContent = `Try again`;
      mintButton.disabled = false;
    }
  } catch (err) {
    console.error(err);
    mintButton.textContent = `Try again`;
    mintButton.disabled = false;
  }
}

async function mintLevelRewards(mintButton) {
  try {
    mintButton.disabled = true;
    mintButton.textContent = "Minting...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: "mintLevelRewards",
        account: userAccount,
      });
    } else {
        await switchToBase();
      const tx = await writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: 'mintLevelRewards',
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      mintButton.textContent = `Minted`;
      await TasksInfo();
    } else {
      mintButton.textContent = `Try again`;
      mintButton.disabled = false;
    }
  } catch (err) {
    console.error(err);
    mintButton.textContent = `Try again`;
    mintButton.disabled = false;
  }
}

async function mintBalanceRewards(mintButton) {
  try {
    mintButton.disabled = true;
    mintButton.textContent = "Minting...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: "mintBalanceRewards",
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: 'mintBalanceRewards',
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      mintButton.textContent = `Minted`;
      await TasksInfo();
    } else {
      mintButton.textContent = `Try again`;
      mintButton.disabled = false;
    }
  } catch (err) {
    console.error(err);
    mintButton.textContent = `Try again`;
    mintButton.disabled = false;
  }
}

async function mintStrikeRewards(mintButton) {
  try {
    mintButton.disabled = true;
    mintButton.textContent = "Minting...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: "mintStrikeRewards",
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: 'mintStrikeRewards',
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      mintButton.textContent = `Minted`;
      await TasksInfo();
    } else {
      mintButton.textContent = `Try again`;
      mintButton.disabled = false;
    }
  } catch (err) {
    console.error(err);
    mintButton.textContent = `Try again`;
    mintButton.disabled = false;
  }
}

async function mintUpgradeRewards(mintButton) {
  try {
    mintButton.disabled = true;
    mintButton.textContent = "Minting...";

    let txHash;

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: "mintUpgradeRewards",
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
        address: contractAddress2,
        abi: contractABI2,
        functionName: 'mintUpgradeRewards',
      });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
      mintButton.textContent = `Minted`;
      await TasksInfo();
    } else {
      mintButton.textContent = `Try again`;
      mintButton.disabled = false;
    }
  } catch (err) {
    console.error(err);
    mintButton.textContent = `Try again`;
    mintButton.disabled = false;
  }
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

let priceProfile;

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

  if (/\s/.test(name)) {
      setStatuss("Name must be one continuous word", "error");
      return;
    }

  if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setStatuss("Name must contain only eng letters and numbers.", "error");
      return;
    }

  if (name.length > 32) {
      setStatuss("Name must be no more than 32 characters long.", "error");
      return;
    }
  try {
    const available = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'isNameAvailable',
      args: [name],
      publicClient: publicClient,
    });

    if (!available) {
      setStatuss("Name is already taken.", "error");
      return;
    }
    const price = await readContract({
      address: contractAddress1,
      abi: contractABI1,
      functionName: 'getMintPrice',
      args: [name],
      publicClient: publicClient,
    });

    const priceInEth = formatUnits(price[0], 18);
    const power = price[1];
    priceProfile = price[0];

    mintBtnpr.textContent = `Mint for ${priceInEth} ETH`;
    mintBtnpr.disabled = false;
    setStatuss(`Name is available! +${power} Power`, "success");

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
    const balanceData = await fetchBalance({ address: userAccount });
    const balance = BigInt(balanceData.value);

    if (balance < BigInt(priceProfile)) {
      mintBtnpr.textContent = `Not enough balance for mint.`;
      return;
    }
    mintBtnpr.textContent = `Waiting for confirmation...`;
    mintBtnpr.disabled = true;

    let txHash

    if (isFarcaster) {
      txHash = await walletClient.writeContract({
        address: contractAddress1,
        abi: contractABI1,
        functionName: "mint",
        args: [name, refcode],
        value: BigInt(priceProfile),
        account: userAccount,
      });
    } else {
      await switchToBase();
      const tx = await writeContract({
          address: contractAddress1,
          abi: contractABI1,
          functionName: 'mint',
          args: [name, refcode],
          value: priceProfile.toString(),
        });
      txHash = tx.hash;
    }

    const receipt = await waitForTransaction({
      chainId: chainid,
      hash: txHash,
      confirmations: 1,
      timeout: 30000,
    });

    if (receipt.status === 'success') {
        mintBtnpr.textContent = `Minted`;
        document.getElementById("mintOverlay").style.display = "none";
        await getPriorityName();
        await profileInfo();
        }
        else {
        mintBtnpr.textContent = `Try again`;
        mintBtnpr.disabled = false;
        }
  } catch (err) {
    mintBtnpr.textContent = `Try again`;
    mintBtnpr.disabled = false;
  }
});

withdrawBtnpr.addEventListener("click", async () => {
    const hasUserRewards = await readContract({
          address: contractAddress1,
          abi: contractABI1,
          functionName: 'hasUserRewards',
          args: [userAccount],
          publicClient: publicClient,
        });

    if (hasUserRewards) {
      withdrawBtnpr.textContent = `Waiting...`;
      withdrawBtnpr.disabled = true;
      try {
        let txHash

        if (isFarcaster) {
          txHash = await walletClient.writeContract({
            address: contractAddress1,
            abi: contractABI1,
            functionName: "withdrawUser",
            account: userAccount,

          });
        } else {
          await switchToBase();
          const tx = await writeContract({
              address: contractAddress1,
              abi: contractABI1,
              functionName: 'withdrawUser',
            });
          txHash = tx.hash;
        }

        const receipt = await waitForTransaction({
          chainId: chainid,
          hash: txHash,
          confirmations: 1,
          timeout: 30000,
        });

        if (receipt.status === 'success') {
            withdrawBtnpr.textContent = `Success`;
            await profileInfo();
            loadedSections.invite = false;
            }
            else {
            withdrawBtnpr.textContent = `Try again`;
            withdrawBtnpr.disabled = false;
            }
      } catch (err) {
        withdrawBtnpr.textContent = `Try again`;
        withdrawBtnpr.disabled = false;
      }
        } else {
          withdrawBtnpr.disabled = true;
        }
});

function setStatuss(text, type) {
  statuspr.textContent = text;
  statuspr.className = type;
}
