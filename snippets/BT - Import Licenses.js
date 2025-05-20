// Edition Licenses
edition = localStorage.getItem(LICENSE_TYPE.EDITION);
console.log(JSON.parse(edition));

new LicenseManager(LICENSE_TYPE.EDITION)
      .setLicensesByStatus(edition);

// Addon Licenses
addon = localStorage.getItem(LICENSE_TYPE.ADDON);
console.log(JSON.parse(addon));

new LicenseManager(LICENSE_TYPE.ADDON)
      .setLicensesByStatus(addon);

// Platform Licenses
platform = localStorage.getItem(LICENSE_TYPE.PLATFORM);
console.log(JSON.parse(platform));

new LicenseManager(LICENSE_TYPE.PLATFORM)
      .setLicensesByStatus(platform);

// User Licenses
user = localStorage.getItem(LICENSE_TYPE.USER);
console.log(JSON.parse(user));

new LicenseManager(LICENSE_TYPE.USER)
      .setLicensesByStatus(user);




// chrome.storage.local.set({ key: value }).then(() => {
//   console.log("Value is set");
// });


// //console.table([[1,2], [3,4]]);
    
// //tr.dataRow:has(td > input[title='EinsteinGPTCopilotPlatform'])