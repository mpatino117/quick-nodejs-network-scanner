'use strict';

var os = require('os');
var request = require("request")
var networkInterfaces = os.networkInterfaces();

exports.displayNetworkInfo = async function () {
  
    let res = {}

    Object.keys(networkInterfaces).forEach((ifname) => {

        var alias = 0;

        networkInterfaces[ifname].forEach( (iface) => {
            if ('IPv4' != iface.family || iface.internal !== false) {
                return;
            }

            if (alias >= 1) {
                res["network_type"] = ifname
                res["local_ip"] = iface.address
                res["ip_version"] = iface.family
                res["mac_address_vs"] = os.networkInterfaces()[ifname][0].address
                res["subnet_mask"] = os.networkInterfaces()[ifname][1].netmask
            } else {
                res["network_type"] = ifname
                res["local_ip"] = iface.address
                res["ip_version"] = iface.family
                res["mac_address_v6"] = os.networkInterfaces()[ifname][0].address
                res["subnet_mask"] = os.networkInterfaces()[ifname][1].netmask
            }
            ++alias;
        });
    });

    await initialize().then(response => {
        res["your_ip_address"] = response
    });

    return res
}


const initialize = async () => {
    var options = { url: 'https://ifconfig.me'}
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

