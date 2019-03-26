'use strict';

var os = require('os');
var geoip  = require('geoip-lite')
var networkInterfaces = os.networkInterfaces();

exports.displayNetworkInfo = function () {

    Object.keys(networkInterfaces).forEach(function (ifname) {
        var alias = 0;

        networkInterfaces[ifname].forEach(function (iface) {
            console.log(iface)
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }

            if (alias >= 1) {

                //many hosts
                console.log('Network information...');
                console.log();
                console.log('Network type:' + ifname);
                console.log('Local IP:' + iface.address);
                console.log('IP Location:' + location);
                console.log('IP Version: ' + iface.family);
                console.log('Mac address v6:' + os.networkInterfaces()[ifname][0].address);
                console.log('Subnet Mask:' + os.networkInterfaces()[ifname][1].netmask);
            } else {

                //one host
                console.log('Network information...');
                console.log();
                console.log('Network type: ' + ifname);
                console.log('Local IP: ' + iface.address);
                console.log('IP Location:' + location);

                console.log('IP Version: ' + iface.family);
                console.log('Mac address v6: ' + os.networkInterfaces()[ifname][0].address);
                console.log('Subnet Mask: ' + os.networkInterfaces()[ifname][1].netmask);
            }
            ++alias;
        });
    });
}

