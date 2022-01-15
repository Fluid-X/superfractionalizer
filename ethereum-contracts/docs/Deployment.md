# Deployment

TODO: Automate the hell out of this.

## Steps (Nice-To-Haves)

Deploy SuperFractionalizer with js script

```
yarn deploy:SuperFractionalizer --network n
```

Verify SuperFractionalizer with js script

```bash
yarn verify:SuperFractionalizer --network n

# OR
# SuperFractionalizer.json needs top level CHAIN_ID.address
npx truffle run verify SuperFractionalizer --network n --debug
```

To verify, you need the source code generated with truffle-plugin-verify


