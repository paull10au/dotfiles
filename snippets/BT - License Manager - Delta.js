// Edition Licenses
new LicenseManager(LICENSE_TYPE.EDITION)
      .delta(mode = LicenseManager.DELTA_MODE.ORG)
      .then((result) => { result.export(); } );