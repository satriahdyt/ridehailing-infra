const http = require("http");
const { networkInterfaces } = require("os");

const server = http.createServer((req, res) => {
  const ifaces = networkInterfaces();
  const ips = [];
  for (let iface in ifaces) {
    const ifs = ifaces[iface];
    ifs.forEach(ip =>
      ips.push({
        ip: ip.address,
        cidr: ip.cidr,
        interface: iface
      })
    );
  }
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(ips));
  res.end();
});

server.listen(80);
