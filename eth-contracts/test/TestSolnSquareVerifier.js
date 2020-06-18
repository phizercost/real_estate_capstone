var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var proof = require("./proof");

contract("TestSolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe("solution square verifier - testing", function () {
    beforeEach(async function () {
      this.verifier = await Verifier.new({ from: account_one });
      this.contract = await SolnSquareVerifier.new(this.verifier.address,'COST','CST',{ from: account_one });
      let proofElements = proof.proof;
      let proofInputs = proof.inputs;
      let tokenId = 100;
      await this.contract.mintNewNFT(
        account_two,
        tokenId,
        proofElements.a,
        proofElements.b,
        proofElements.c,
        proofInputs
      );
    });
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("tests if a new solution can be added for contract - SolnSquareVerifier", async function () {
      let result;
      try {
        result = await this.contract.getNumberOfSolutions();
      } catch (error) {
        console.log(error);
      }
      assert.equal(1, result, "it does not add a new solution");
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
  });
});
