pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    Verifier public verifier;
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address addr;
    }
    // TODO define an array of the above struct
    Solution[] solutions;
    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;
    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address addr);

    // TODO Create a function to add the solutions to the array and emit the event
    function _addSolution(
        uint256 index,
        address addr,
        bytes32 key
    ) internal {
        Solution memory solution = Solution({index: index, addr: addr});
        solutions.push(solution);
        uniqueSolutions[key] = solution;
        emit SolutionAdded(index, addr);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].index == 0, "This solution already exists");
        require(verifier.verifyTx(a, b, c, input), "The solution is not verified");
        _addSolution(tokenId, to, key);
        super.mint(to, tokenId);
    }
}
