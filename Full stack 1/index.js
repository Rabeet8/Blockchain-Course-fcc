import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectbutton")
const FundButton = document.getElementById("fundbutton")
const BalanceButton = document.getElementById("balaceButton")
const WithdrawButton = document.getElementById("withdrawButton")



connectButton.onclick = connect;
FundButton.onclick = fund;
BalanceButton.onclick = getBalance;
WithdrawButton.onclick = withdraw;


console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}


async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.provider.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}

async function withdraw() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.provider.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}


async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}....`)
    if (typeof window.ethereum !== "undefined") {
        //1)Provider to interact with blockchain
        //2)Wallet 
        //3)Contract
        //4)ABI & ADDRESS


        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {

            const transactionResponse = await contract.fund(
                { value: ethers.utils.parseEther(ethAmount) })
            //listen for the tx to be mined
            // listen for an event 
            //wai for this tx to finish
            await listenForTransactionMine(transactionResponse, provider)
            console.log("done")
        } catch (error) {
            console.log(error)
        }
    }

}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)
    // return new Promise
    //create a listener for the blockchain
    return new Promise((resolve, reject) => {


        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transaction.confirmation} confirmation`)

        })
        resolve()
    })
}