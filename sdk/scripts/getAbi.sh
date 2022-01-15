cd ../ethereum-contracts

YARN_EXISTS=$(which yarn)

if [ $YARN_EXISTS = "yarn not found" ]
then

    npm install

    npm run build

else
    yarn

    yarn build

fi

cd ../sdk

cp ../ethereum-contracts/build/contracts/SuperFractionalizer.json ./src/abi/SuperFractionalizer.json

cp ../ethereum-contracts/build/contracts/ERC721.json ./src/abi/ERC721.json

echo "Fetched ABI"
