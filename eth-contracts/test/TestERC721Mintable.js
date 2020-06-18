var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const tokenName = 'COST';
    const tokenSymbol = 'CST';
    const URI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(tokenName, tokenSymbol,{from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1);
            await this.contract.mint(account_one, 2);
            await this.contract.mint(account_one, 3);
            await this.contract.mint(account_one, 4);
            await this.contract.mint(account_one, 5);
            await this.contract.mint(account_one, 6);
            await this.contract.mint(account_one, 7);
            await this.contract.mint(account_one, 8);
            await this.contract.mint(account_one, 9);
            await this.contract.mint(account_one, 10);
            await this.contract.mint(account_two, 11);
            
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply();
            assert.equal(11, result, "it does not return the total supply.");
        })

        it('should get token balance', async function () { 
            let result1 = await this.contract.balanceOf(account_one);
            let result2 = await this.contract.balanceOf(account_two);
            assert.equal(10, result1, "it does not return the token balance");
            assert.equal(1, result2, "it does not return the token balance");
            
        })

        // // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result = await this.contract.tokenURI(5);
            assert.equal(URI + 5, result, "it does not return the token uri");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            let tokenOwner = await this.contract.ownerOf(1);
            assert.equal(account_two,tokenOwner, "it does not transfer token from one owner to another");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(tokenName, tokenSymbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let result = false;

            try {
                result = await this.contract.mint(account_three, 1, {from:account_three});
            } catch (error) {
                
            }
            assert.equal(false, result, "it does not fail when minting when address is not contract owner");
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner();
            assert.equal(account_one, result, "it does not return contract owner");
        })

    });
})