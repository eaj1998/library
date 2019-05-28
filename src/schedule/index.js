const CronJob = require('cron').CronJob;
var emprestimo = require('./emprestimo');

const job = new CronJob('*/5 * * * * ', ()=> {
    console.log('job');    
}, null, true,'America/Sao_Paulo');
//job.start();

module.exports = job;