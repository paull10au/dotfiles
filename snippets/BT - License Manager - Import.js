// Edition Licenses
new LicenseManager(LICENSE_TYPE.EDITION)
      .import(licenses = null, mode = LicenseManager.IMPORT_MODE.MIRROR);



// // Addon Licenses
// new LicenseManager(LICENSE_TYPE.ADDON)
//       .setLicenses();

// // Platform Licenses
// new LicenseManager(LICENSE_TYPE.PLATFORM)
//       .setLicenses();

// // User Licenses
// new LicenseManager(LICENSE_TYPE.USER)
//       .setLicenses();




// *** DEPRECATED ***

// Edition Licenses
// edition = localStorage.getItem(LICENSE_TYPE.EDITION);
// console.log(JSON.parse(edition));

// new LicenseManager(LICENSE_TYPE.EDITION)
//       .setLicenses(edition);

// // Addon Licenses
// addon = localStorage.getItem(LICENSE_TYPE.ADDON);
// console.log(JSON.parse(addon));

// new LicenseManager(LICENSE_TYPE.ADDON)
//       .setLicenses(addon);

// // Platform Licenses
// platform = localStorage.getItem(LICENSE_TYPE.PLATFORM);
// console.log(JSON.parse(platform));

// new LicenseManager(LICENSE_TYPE.PLATFORM)
//       .setLicenses(platform);

// // User Licenses
// user = localStorage.getItem(LICENSE_TYPE.USER);
// console.log(JSON.parse(user));

// new LicenseManager(LICENSE_TYPE.USER)
//       .setLicenses(user);




// chrome.storage.local.set({ key: value }).then(() => {
//   console.log("Value is set");
// });


// //console.table([[1,2], [3,4]]);
    
// //tr.dataRow:has(td > input[title='EinsteinGPTCopilotPlatform'])