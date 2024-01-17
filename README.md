our early version but still able to check address balance

not support float number still need to upgrade.
But it is not recommended to use default 18 decimal places; consensus should be reached with the community to upgrade and support decimals, and it is recommended to use 8 decimal places.



have hard upgrade at block 4891670 to extend transfer function

If you plan to upgrade, please ensure that the upgrade takes place after a certain block and obtain community consensus.

make sure start block = 4710332 and delayBlock >= 6 

`
  npm install pm2 -g
`

`
  npm install
`

`init database and config.json`


pm2 start start.js --name "start" --no-autorestart

pm2 start process.js --name "process" --no-autorestart

