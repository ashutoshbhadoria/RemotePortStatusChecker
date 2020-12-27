const fs = require('fs');
const isReachable = require('is-reachable');
const chalk = require('chalk');
const packageJson = require('./package.json');

const hostsInformation = JSON.parse(fs.readFileSync('./hostsInformation.json'));
const hosts = hostsInformation.hosts;

console.log(chalk.white.bgGreen.bold(`Remote Port Checker v${packageJson.version}\n`));

const getHostReachability = (hostname, port) => {
  result = isReachable(`${hostname}:${port}`);
  result.then(reachable => {
    console.log(`${hostname}:${port} is ${reachable ? chalk.green('reachable') : chalk.red('NOT reachable')}`);
  });
};

hosts.forEach(host => {
  host.ports.forEach(port => {
    getHostReachability(host.hostname, port);
  });
});