#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const { demandOption } = require("yargs");
const nomics_API_interface = require("./nomics_API_interface");

yargs.command({
    command: "check",
    describe: "check the stats of crypto currencies",
    builder: {
        price: {
            describe: "checks the price of cryptocurrency and rankes them based on their current market cab",
            demandOption: true,
            type: "string",
        }
    },
    handler(){
        nomics_API_interface.checkPrice();
        
    }
});

yargs.command({
    command: "get",
    describe: "Get details and information for a specific cryptocurrency",
    builder: {
        id: {
            describe: "give the id of the cryptocurrency",
            demandOption: true,
            type: "string"
        },
        interval: {
            describe: "get the inverval time of changes to the cryptocurrency can be 1h, 1d, 7d, 30d, 365d",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        nomics_API_interface.GetCryptoCurrency(argv.id, argv.interval);
    }
})

yargs.parse();

