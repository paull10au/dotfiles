// Edition Licenses
new LicenseManager(LICENSE_TYPE.EDITION)
      .getLicensesByStatus(isSelected=true, licenseName='', caseSensitive=false)
      // .getLicensesByStatus()
      // .licenses;
      .export();



// // Edition Licenses
// new LicenseManager(LICENSE_TYPE.EDITION)
//       .getLicensesByStatus(isSelected=true, licenseName='')
//       // .getLicensesByStatus()
//       .saveLicenses();

// // Addon Licenses
// new LicenseManager(LICENSE_TYPE.ADDON)
//       .getLicensesByStatus(isSelected=true, licenseName='')
//       .saveLicenses();

// // Platform Licenses
// new LicenseManager(LICENSE_TYPE.PLATFORM)
//       .getLicensesByStatus(isSelected=true, licenseName='')
//       .saveLicenses();

// // User Licenses
// new LicenseManager(LICENSE_TYPE.USER)
//       .getLicensesByStatus(isSelected=true, licenseName='')
//       .saveLicenses();




// *** DEPRECATED ***

// let edition;
// let addon;
// let platform;
// let user;

// localStorage.clear();

// edition = new LicenseManager(LICENSE_TYPE.EDITION)
//       .getLicensesByStatus(isActive=true, licenseName='')
//       .save();

// localStorage.setItem(LICENSE_TYPE.EDITION, JSON.stringify(edition));

// addon = new LicenseManager(LICENSE_TYPE.ADDON)
//       .getLicensesByStatus(isActive=true, licenseName='');

// localStorage.setItem(LICENSE_TYPE.ADDON, JSON.stringify(addon));

// platform = new LicenseManager(LICENSE_TYPE.PLATFORM)
//       .getLicensesByStatus(isActive=true, licenseName='');

// localStorage.setItem(LICENSE_TYPE.PLATFORM, JSON.stringify(platform));

// user = new LicenseManager(LICENSE_TYPE.USER)
//       .getLicensesByStatus(isActive=true, licenseName='');

// localStorage.setItem(LICENSE_TYPE.USER, JSON.stringify(user));



//console.table([[1,2], [3,4]]);
    
//tr.dataRow:has(td > input[title='EinsteinGPTCopilotPlatform'])