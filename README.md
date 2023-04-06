# Hardhat Basics Project

## Useage
### Deploy
```shell
yarn hardhat run scripts/deploy.ts --network sepolia
```
### Testing
#### Specific test based on a text snip of the name of a test
```shell
yarn hardhat test --grep store
```

#### Coverage
```shell
yarn hardhat coverage
```

#### Gas Report
```shell
yarn hardhat test
```