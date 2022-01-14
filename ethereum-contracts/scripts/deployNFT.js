import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({ token: 'API_TOKEN' })

async function main() {
  const metadata = await client.store({
    name: 'Logo',
    description: 'Logo to Super Fractionalizer!',
    image: new File(
      [
        /* data */
      ],
      '../../client/public/logo512.jpg',
      { type: 'image/png' }
    ),
  })
  console.log(metadata.url)
  // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
}

main()
