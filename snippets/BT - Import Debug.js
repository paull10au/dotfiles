// Edition Licenses
edition = localStorage.getItem(LICENSE_TYPE.EDITION);
console.log(JSON.parse(edition));

// Addon Licenses
addon = localStorage.getItem(LICENSE_TYPE.ADDON);
console.log(JSON.parse(addon));

// Platform Licenses
platform = localStorage.getItem(LICENSE_TYPE.PLATFORM);
console.log(JSON.parse(platform));

// User Licenses
user = localStorage.getItem(LICENSE_TYPE.USER);
console.log(JSON.parse(user));