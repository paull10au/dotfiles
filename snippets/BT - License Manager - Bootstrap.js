const HOST = 'http://localhost:8000/licenses/';

const LICENSE_TYPE = {
    EDITION: "Edition Licenses",
    ADDON: "Addon Licenses",
    PLATFORM: "Platform Licenses",
    USER: "User Licenses"
};

class License {
    
    constructor(selected, name, quantity) {
        this.selected = selected;
        this.name = name;
        this.quantity = quantity;
    }
}

class LicenseComparator extends License {
    
    constructor(name, file_selected, file_quantity, org_selected, org_quantity) {
        super(undefined, name, undefined);

        this.file_selected = file_selected;
        this.file_quantity = file_quantity;
        this.org_selected = org_selected;
        this.org_quantity = org_quantity;

        delete this.selected;
        delete this.quantity;
    }
}
    
class LicenseManager {
    #type;
    #filename;
    #licenseSection;
    #licenseRows = [];
    #licenses = [];
    
    static DELTA_MODE = {
            FILE: "file",
            ORG: "org"
        };
    
    static IMPORT_MODE = {
            AUGMENT_LEAVING_DIFF: "xxx",
            AUGMENT_REMOVING_DIFF: "xxx",
            ACCEPT_HIGHER_QUANTITY: "accept_higher",
            MIRROR: "mirror",
            OVERWRITE: "overwrite"
        };

    constructor(type) {
        if (!type || typeof type !== "string") {
            throw new Error("Type is required");
        }
        
        this.type = type;
        this.filename = type;
      }

    get filename() {
        return this.#filename;
    }

    set filename(value) {
        this.#filename = `${value.split('.')[0]}.json`;
    }

    get type() {
        return this.#type
    }

    set type(value) {
        this.#type = value;
    }
    
    get licenseSection() {
        let label;
        let subSection;

        if (this.#licenseSection) {
            return this.#licenseSection;    
        }
        else {
            [...document.querySelectorAll('div.apexp div.pbSubheader')].some( (s) => {
                label = s.textContent ? s.textContent.trim() : null;
                subSection = s;
                
                return label === this.type;
            })
    
            this.#licenseSection = (subSection) ? subSection.parentNode.querySelector('div.pbSubsection') : null;
        }
        
        return this.#licenseSection;
        
        // //return (subSection) ? subSection.parentNode.querySelector('div.pbSubsection') : null;
        // return (subSection) ? this.#licenseSection subSection.parentNode.querySelector('div.pbSubsection') : null;
        
        // return this.#licenseSection;
    }

    get licenseRows() {
        if (this.licenseSection) {

            if (this.#licenseRows.size() == 0) {
                this.#licenseRows = [...this.licenseSection.querySelectorAll('table.list.container tbody tr')];
            }
                
            // check for nodelist else return empty?
            return this.#licenseRows;
        }
    }

    get licenses() {
        return this.#licenses;
    }

    set licenses(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        
        this.#licenses.push(...value);
    }
    
    // set licenseSection() {
        
    // }
    
    //  #getLicenseSection() {
    //     let label;

    //     [...document.querySelectorAll('div.apexp div.pbSubheader')].some( (s) => {
    //         label = s.textContent ? s.textContent.trim() : null;
            
    //         if (label === this.type) {
    //             return this.#section = s;
    //         }
    //     })
        
    //     return (this.#section != null) ? this.#section.parentNode.querySelector('div.pbSubsection') : null;
    // }
    
    // #getLicenseRows() {
    //     // this.#section = this.#getLicenseSection();
    //     this.#section = this.#getLicenseSection();

    //     if (this.#section) {

    //         if (this.#licenseRows.size() == 0) {
    //             this.#licenseRows = [...this.#section.querySelectorAll('table.list.container tbody tr')];
    //         }
                
    //         // check for nodelist else return empty?
    //         return this.#licenseRows;
    //     }
    // }

    getLicensesByStatus(isSelected = true, licenseName = '', caseSensitive = true) {
        let self = this;
        
        const matchedRowsHandler = function (row) {
            let name = row.textContent ? row.textContent.trim().replace('0\n\n', '') : '';
            let quantityCell = row.cells[1].querySelector("input[type='text']");
            let quantity = quantityCell ? quantityCell.value : 0;
            let selected = row.cells[0].querySelector("input[type='checkbox']").checked;
            let searchMode = caseSensitive ? '' : 'i';
                
            // TODO: Review logic - always match and return true?
            // if (!licenseName || (licenseName && name.includes(licenseName))) {
            if (!licenseName || (licenseName && new RegExp(licenseName, searchMode).test(name))) {
                if (isSelected && selected ||
                   !isSelected && !selected) {
                    // self.#licenses.push(new License(selected, name, quantity));
                    self.licenses = new License(selected, name, quantity);
                }
            }
        }
        
        isSelected = (typeof isSelected === "boolean") ? isSelected : false;
        licenseName = (typeof licenseName === "string") ? licenseName : '';
        
        // this.#getLicenseRows().forEach( matchedRowsHandler );
        this.licenseRows.forEach( matchedRowsHandler );

        // this.getLicenseRows().forEach( (row) => {

        //     name = row.textContent ? row.textContent.trim().replace('0\n\n', '') : '';
        //     quantityCell = row.cells[1].querySelector("input[type='text']");
        //     quantity = quantityCell ? quantityCell.value : 0;
        //     selected = row.cells[0].querySelector("input[type='checkbox']").checked;

        //     // TODO: Review logic - always match and return true?
        //     if (!licenseName || (licenseName && name.includes(licenseName))) {
        //         if (isSelected && selected ||
        //            !isSelected && !selected) {
        //             this.#licenses.push(new License(selected, name, quantity));
        //         }
        //         // else if (isSelected && selected) {
        //         //     this.#licenses.push(new License(selected, name, quantity));
        //         // }
        //         // else if (!isSelected && !selected) {
        //         //     this.#licenses.push(new License(selected, name, quantity));
        //         // }
        //     }
        // })
    
        // return this.#licenses;
        
        return this;
    }

    // Deprecated, use getLicensesByStatus passing the licenseName parameter
    // getLicensesByName(licenseName) {
    //     let name;
    //     let quantity;
    //     let selected;

    //     licenseName = (typeof licenseName === "string") ? licenseName : null;
    //     this.getLicenseRows().forEach( (row) => {

    //         name = row.textContent ? row.textContent.trim() : null;
    //         quantity = row.cells[1].querySelector("input[type='text']").value;
    //         selected = row.cells[0].querySelector("input[type='checkbox']").checked;

    //         if ((licenseName && name.includes(licenseName)) || !licenseName) {
    //             this.#licenses.push(new License(selected, name, quantity));
    //         }
    //         // else if (!licenseName) {
    //         //     this.#licenses.push(new License(selected, name, quantity));
    //         // }
    //     })
    
    //     // return this.#licenses;
    //     return this;
    // }

    async #load(host) {
        let data = [];
        let response;
        let url = (host) ? host : `${HOST}/${this.type}.json`;
        
        // request.open('GET', 'https://cors-anywhere.herokuapp.com/https://github.com/sfdc-qbranch-emu/QBrix-5-GDO/blob/main/test.json');
        // request.open('GET', 'https://github.com/sfdc-qbranch-emu/QBrix-5-GDO/blob/main/test.json');
        // request.open('GET', 'https://d229ymq143gne.cloudfront.net/shared-demos/Edition+Licenses.json');

        try {
            response = await fetch('https://d1iogxpqpgyw1s.cloudfront.net/shared-orgs/cirrus360/Licenses/Edition+Licenses.json', {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-store'})

            if (!response.ok) {
                console.log(response)
                throw new Error(`Status: ${response.status}`)
            }
            
            data = response.json();
        }
        catch(e) {
            // console.error(`Error loading license file (${this.filename}): ${e}`);
            throw new Error(`Error loading license file (${this.filename}): ${e}`);
        }
        
        return data;
        
        // await fetch('https://d1iogxpqpgyw1s.cloudfront.net/shared-orgs/cirrus360/Licenses/Edition+Licenses.json', {
        //         method: 'GET',
        //         mode: 'cors',
        //         cache: 'no-store'})
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             console.error(`Error loading license file (${this.filename}): ${request.status} - ${request.statusText}`);
        //             throw new Error(`Error loading license file (${this.filename}): ${request.status} - ${request.statusText}`);
        //         }
        //     })
        //     .then(data => {
        //         return data;
        //     })
        //     .catch(error => {
        //         console.error(`Error loading license file (${this.filename}): ${request.status} - ${request.statusText}`);
        //         throw new Error(`Error loading license file (${this.filename}): ${request.status} - ${request.statusText}`);
        // });


            // return;
            // request.onload = function() {
            //     if (request.status >= 200 && request.status < 300) {
            //         data = request.response;
                    
            //         while (typeof data === "string") {
            //             data = JSON.parse(data);
            //         }
                    
            //         resolve(data);
            //     } else {
            //         reject(`Error: ${request.status} - ${request.statusText}`);
            //     }
            // };
            
            // request.onerror = function() {
            //    reject("Error retrieving ");
            // };
            
            // // request.open('GET', `${(host) ? host : HOST}/${this.type}.json`);
            // // request.open('GET', 'https://cors-anywhere.herokuapp.com/https://github.com/sfdc-qbranch-emu/QBrix-5-GDO/blob/main/test.json');
            // // request.open('GET', 'https://github.com/sfdc-qbranch-emu/QBrix-5-GDO/blob/main/test.json');
            // // request.open('GET', 'https://d229ymq143gne.cloudfront.net/shared-demos/Edition+Licenses.json');
            // request.open('GET', 'https://d1iogxpqpgyw1s.cloudfront.net/shared-orgs/cirrus360/Licenses/Edition+Licenses.json');
            
            // request.send();
        
    }
    
    export() {
        const TEXT_JSON = 'text/json';
        
        let blob;
        let anchor;
        let data = this.licenses;
        
        if (!data) {
            console.error(`No license data for ${this.type}`);
            return;
        }

        if (typeof data === "object") {
            data = JSON.parse(JSON.stringify(data));
        }
        
        blob = new Blob([data], { type: TEXT_JSON });
        anchor = document.createElement('a');
        anchor.download = this.filename;
        anchor.href = window.URL.createObjectURL(blob);
        anchor.dataset.downloadurl = [TEXT_JSON, anchor.download, anchor.href].join(':');
        anchor.click();
    }

    async delta(mode = LicenseManager.DELTA_MODE.ORG) {
        let self = this;
        let file = await this.#load();
        let org = this.licenseRows;
        
        const matchingFileLicenseHandler = function (row) {
            let hasMatched = false;
            let name;
            let license;
            let isEditable = (row.cells[1].querySelector("input[type='text']"));

            if (isEditable && row.cells[0].querySelector("input[type='checkbox']").checked) {
                name = row.textContent ? row.textContent.trim() : '';

                for (let i = file.length - 1; i >= 0; i--) {
                    license = file[i];
                    
                    if (name === license.name) {
                        // TODO: Marshall into a License object instance
                        if (license.selected &&
                            row.cells[1].querySelector("input[type='text']").value === license.quantity) {
                            file.splice(i, 1);
                            hasMatched = true;
                            break;
                        }
                        else {
                            // self.#licenses.push(new LicenseComparator(name, license.selected, license.quantity, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value));
                            self.licenses = new LicenseComparator(name, license.selected, license.quantity, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value);
                            file.splice(i, 1);
                            hasMatched = true;
                            break;
                        }
                    }

                    if (i === 0) {
                        // self.#licenses.push(new LicenseComparator(name, null, 0, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value));
                        self.licenses = new LicenseComparator(name, null, 0, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value);
                        hasMatched = true;
                        break;
                    }
                }

                // Add any rows that are not in the license file, after all licenses have been matched and removed...Exclude previously matched licenses
                if (!hasMatched) {
                    // self.#licenses.push(new LicenseComparator(name, null, 0, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value));
                    self.licenses = new LicenseComparator(name, null, 0, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value);
                }
            }    
        }
        
        const matchingOrgLicenseHandler = function (license) {
            let name;

            org.some( (row) => {

                let isEditable = (row.cells[1].querySelector("input[type='text']"));

                if (isEditable) {
                    name = row.textContent ? row.textContent.trim() : '';
                    
                    if (name === license.name) {
                        // TODO: Marshall into a License object instance
                        if (row.cells[0].querySelector("input[type='checkbox']").checked &&
                            row.cells[1].querySelector("input[type='text']").value === license.quantity) {
                            
                            return true;
                        }
                        else {
                            // self.#licenses.push(new LicenseComparator(name, license.selected, license.quantity, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value));
                            self.licenses = new LicenseComparator(name, license.selected, license.quantity, row.cells[0].querySelector("input[type='checkbox']").checked, row.cells[1].querySelector("input[type='text']").value);
                            
                            return true;
                        }
                    }
                }
            });
        }

        // if (mode === LicenseManager.DELTA_MODE.OVERWRITE) {
        //     org.forEach( licenseResetHandler )
        // }

        switch (mode) {
            case LicenseManager.DELTA_MODE.FILE:
                // self.setFilename(`${self.type} - File Differences`);
                self.filename = `${self.type} - File Differences`;
                file.forEach( matchingOrgLicenseHandler );
                break;
                
            case LicenseManager.DELTA_MODE.ORG:
                // self.setFilename(`${self.type} - Org Differences`);
                self.filename = `${self.type} - Org Differences`;
                org.forEach( matchingFileLicenseHandler );
                break;
                
            default:
        }
        
        return this;
    }
    
    async import(licenses = null, mode = LicenseManager.IMPORT_MODE.OVERWRITE) {
        let self = this;
        
        let file = (licenses) ? licenses : await this.#load();
        let org = this.licenseRows;

        const licenseResetHandler = function(row) {
            let isEditable = (row.cells[1].querySelector("input[type='text']"));

            if (isEditable) {
                row.cells[0].querySelector("input[type='checkbox']").checked = false;
                row.cells[1].querySelector("input[type='text']").value = 0;
            }
        }
        
        const matchedLicenseHandler = function (license) {
            let name;
            
            org.some( (row) => {
                name = row.textContent ? row.textContent.trim() : '';
                
                if (name === license.name) {
                    row.cells[0].querySelector("input[type='checkbox']").checked = license.selected;
                    row.cells[1].querySelector("input[type='text']").value = license.quantity;

                    return true;
                }
            });
        }

        
        if (mode === LicenseManager.IMPORT_MODE.MIRROR) {
            org.forEach( licenseResetHandler )
        }
        
        file.forEach( matchedLicenseHandler );
    }

    // backup
    // async setLicenses(licenses, mode = IMPORT_MODE.OVERWRITE) {
    //     let data = (licenses) ? licenses : await this.load();
    //     let name;
        
    //     this.getLicenseRows().forEach( (row) => {
    //         name = row.textContent ? row.textContent.trim() : null;
            
    //         data.some( (license) => {
    //             if (name === license.name) {
    //                 row.cells[0].querySelector("input[type='checkbox']").checked = license.selected;
    //                 row.cells[1].querySelector("input[type='text']").value = license.quantity;
    //             }  
    //         })
    //     })
    // }
    
}
