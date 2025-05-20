class License {
    
  constructor(selected, name, quantity) {
    this.selected = selected;
    this.name = name;
    this.quantity = quantity;
  }
}

const LICENSE_TYPE = {
    EDITION: "Edition Licenses",
    ADDON: "Addon Licenses",
    PLATFORM: "Platform Licenses",
    USER: "User Licenses"
};

// let licenses = [{
//     selected: true,
//     name: 'AccountingSubledgerAddOn',
//     quantity: 69
// },{
//     selected: true,
//     name: 'AccountInspection',
//     quantity: 690
// }]
    
class LicenseManager {
    #type;
    #section;
    #licenses = [];
    
    constructor(type) {
        if (!type || typeof type !== "string") {
            throw new Error("Type is required");
        }
        
        this.#type = type;
      }
    
     getLicenseSection() {
        let label;

        [...document.querySelectorAll('div.apexp div.pbSubheader')].some( (s) => {
            label = s.textContent ? s.textContent.trim() : null;
            
            if (label === this.#type) {
                return this.#section = s;
            }
        })
        
        return (this.#section != null) ? this.#section.parentNode.querySelector('div.pbSubsection') : null;
    }
    
    getLicenses() {
        this.#section = this.getLicenseSection();

        if (this.#section) {
            
            // check for nodelist else return empty?
            return [...this.#section.querySelectorAll('table.list.container tbody tr')];
        }
    }

    getLicensesByStatus(isActive, match) {
        let name;
        let quantity;
        let quantityCell;
        let selected;

        isActive = (typeof isActive === "boolean") ? isActive : undefined;
        match = (typeof match === "string") ? match : null;

        this.getLicenses().forEach( (row) => {

            name = row.textContent ? row.textContent.trim().replace('0\n\n', '') : null;
            quantityCell = row.cells[1].querySelector("input[type='text']");
            quantity = quantityCell ? quantityCell.value : 0;
            selected = row.cells[0].querySelector("input[type='checkbox']").checked;

            if ((match && name.includes(match)) || !match) {
                if (isActive === undefined) {
                    this.#licenses.push(new License(selected, name, quantity));
                }
                else if (isActive && selected) {
                    this.#licenses.push(new License(selected, name, quantity));
                }
                else if (!isActive && !selected) {
                    this.#licenses.push(new License(selected, name, quantity));
                }
            }
        })
    
        return this.#licenses;
    }

    getLicensesByName(match) {
        let name;
        let quantity;
        let selected;

        match = (typeof match === "string") ? match : null;
        this.getLicenses().forEach( (row) => {

            name = row.textContent ? row.textContent.trim() : null;
            quantity = row.cells[1].querySelector("input[type='text']").value;
            selected = row.cells[0].querySelector("input[type='checkbox']").checked;

            if ((match && name.includes(match)) || !match) {
                this.#licenses.push(new License(selected, name, quantity));
            }
            else if (!match) {
                this.#licenses.push(new License(selected, name, quantity));
            }
        })
    
        return this.#licenses;
    }

    setLicenses(licenses) {
        let name;
        
        this.getLicenses().forEach( (row) => {
            name = row.textContent ? row.textContent.trim() : null;

            licenses.some( (license) => {
                if (name === license.name) {
                    row.cells[0].querySelector("input[type='checkbox']").checked = license.selected;
                    row.cells[1].querySelector("input[type='text']").value = license.quantity;
                }  
            })
        })
    }
}
