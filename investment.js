const fs = require('fs');
const { exec } = require("child_process");

function downloadAndParse() {
  console.log('downloading transaction-database.json from github');
  exec('curl -OL https://raw.githubusercontent.com/mostafa-K-raihan/investement-tracker/main/transaction-database.json', (err, stdout, stderr) => {
    if (err) {
      console.log('ERROR!', err);
    }

    if (stderr) {
      console.error(stderr);
    }

    console.log('-----------------');
    parse();
  });

}


function parse() {
  console.log('parsing from transaction-database.json');
  const a = JSON.parse(fs.readFileSync('transaction-database.json', 'utf-8')).data

  const stats = a.reduce((acc, next) => {
   
    const entity = next.to || next.from;

    const profitAmount = next.type === 'INVESTMENT' ? 0 : parseInt(next.amount);
    const investedAmount = next.type === 'PROFIT RETURN' ? 0 : parseInt(next.amount);

    if (!acc.details) {
      acc.details = {};
    }


    acc.details[entity] = {
      profit: (acc.details[entity]?.profit || 0) + profitAmount,
      investment: (acc.details[entity]?.investment || 0) + investedAmount,
    }

    const diff = Math.abs((acc.details[entity]?.profit || 0) - (acc.details[entity]?.investment || 0));
    acc.details[entity].status =  (acc.details[entity]?.profit >= acc.details[entity]?.investment) ? `✅ ${diff}` : `❌ ${diff}`

    acc.total = {
      profit: (acc?.total?.profit || 0) + profitAmount,
      investment: (acc?.total?.investment || 0) + investedAmount,
    }

    const totalDiff = Math.abs((acc.total?.investment || 0) - (acc.total?.profit || 0));
    
    acc.total.status =  (acc.total?.profit >= acc.total?.investment) ? `✅ ${diff}` : `❌ ${totalDiff}`
    
    return acc;

  }, {});

  console.log(stats);
}

const argMap = {};
for (let i=2; i<process.argv.length; i++) {
  argMap[process.argv[i]] = true;
}

if (argMap['-d']) {
  downloadAndParse();
} else {
  parse();
}
console.log({ argMap });
