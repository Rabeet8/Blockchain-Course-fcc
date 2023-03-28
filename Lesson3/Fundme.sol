//Get, Withdraw fund from users and set a min funding value in usd

//SPDX-License-Identifier: MIT
// Reverting => Undo any action before and send remaining gas back
pragma solidity 0.8.0;
import "./PriceConvetor.sol";


error NotOwner();

contract FundMe{
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address [] public funders;
    mapping (address => uint256) public addressToAmountFunded;
    
    address public immutable i_owner;

    constructor (){
        i_owner =msg.sender;
    }
    //want to be able to set a minimum fund amount in USD
    // HOW TO SEND ETH TO THIS CONTRACT
    function fund() public payable {
    require (msg.value.getConversionRate()> MINIMUM_USD, "Value is less than 1 eth"); //1e18==1*10 ** 10**18 == 10000000000000wei
    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] += msg.value;
    }

    //Withdraw function
    function withdraw() public onlyowner {
        
        //starting index,ending index, step amount
        for(uint256 funderIndex=0; funderIndex < funders.lenght; funderIndex++){
            address funder = funders(funderIndex);
            addressToAmountFunded[funder] = 0;
        }
    //reset the array
    funders = new address[] (0);
    //three ways to  send funds

    // transfer
    // payable (msg.sender).transfer(address(this).balance);
     //send
    // bool sendSuccess = payable (msg.sender).send(address(this).balance);
    // require(sendSuccess, "send failed");
    //call
    (bool callSuccess )= payable(msg.sender).call{value: address(this).balance}("");
    require (callSuccess, "call failed");
    }
     
    modifier onlyowner (){
        // require (msg.sender == i_owner, "sender is not owner");
        _;// represents doing the rest of the things
        if(msg.sender !=i_owner){revert NotOwner();}

    }
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
        
    }
