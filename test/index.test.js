const network = require("../index");

test('Network Data Test', () => {
    return network.displayNetworkInfo().then(data => {
    
      let networkType = data.network_type
      let ipVersion = data.ip_version
      let macAddress = data.mac_address_v6
      let subnetMask = data.subnet_mask

      expect(networkType).toBeTruthy();
      expect(ipVersion).toBeTruthy();
      expect(subnetMask).toBeTruthy();
      expect(macAddress).toBeTruthy();

    });
  });

