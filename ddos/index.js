const https = require("http");

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = https.request("http://172.17.123.248:30001", res => {
      res.once("data", datas => {
        const data = JSON.parse(datas);
        resolve(data[1].ip);
      });
    });

    req.once("error", error => {
      reject(error);
    });

    req.end();
  });
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time || 3000);
  });
}

const MAX_REQUEST = 30;
const DELAY = 500;

async function normal() {
  while(1) {
    await delay(DELAY);
    const ip = await makeRequest();
    console.log(ip);
  }
}

async function ddos() {
  const reqs = [];
  for (let i = 0; i < MAX_REQUEST; i++) {
    reqs.push(i);
  }
  while(1) {
    await delay(DELAY);
    const ips = await Promise.all(reqs.map(() => makeRequest()));
    for (let ip in ips) {
      console.log(ips[ip]);
    }
  }
}

ddos();
