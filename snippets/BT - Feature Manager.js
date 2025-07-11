const FEATURE_TYPE = {
    HISTORY: "History",
    LICENSE: "License",
    PERMISSION: "Permission",
    PREFERENCE: "Preference",
    VALUE: "Value"
};

const FEATURE_ACTION = {
    LICENSE: "License",
    PERMISSION: "Permission",
    PREFERENCE: "Preference",
    VALUE: "Value"
};

const FEATURE_ACTION_PATTERN = {
    LICENSE: "/.* from [0-9]+ to [0-9]+/",
    PERMISSION: "/^Changed .* from (off|on) to (off|on)\.$/",
    PREFERENCE: "xx",
    VALUE: "xxx"
};

class Feature {
    
    constructor(date, user, action, section, blacktab_tracking_id) {
        this.date = date;
        this.user = user.trim();
        this.action = action;
        this.section = section.trim();
        this.blacktab_tracking_id = blacktab_tracking_id.trim();
    }
}

class FeatureManager {
    #type;
    #filename;
    #featureSection;
    #featureRows = [];
    #features = [];
    
    static FEATURE_MODE = {
            ALL: "all",
            ON: "on",
            OFF: "off"
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
    
    // get featureRows() {
    //     if (this.featureSection) {

    //         if (this.#featureRows.size() == 0) {
    //             this.#featureRows = [...this.featureSection.querySelectorAll('table.list.container tbody tr')];
    //         }
                
    //         // check for nodelist else return empty?
    //         return this.#featureRows;
    //     }
    // }

    get features() {
        return this.#features;
    }

    set features(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        
        this.#features.push(...value);
    }
    
    get history() {
        const historyList = document.querySelector('div.listRelatedObject.sysAdminBlock table.list tbody');
        
        if (historyList) {
            if (this.#featureRows.length == 0) {
                this.#featureRows = [...historyList.querySelectorAll('tr.dataRow')];
            }
        }

        return this.#featureRows;
    }
    
    export() {
        const TEXT_JSON = 'text/json';
        
        let blob;
        let anchor;
        let data = this.#features;
        
        if (!data) {
            console.error(`No feature data for ${this.type}`);
            return;
        }

        // if (typeof data === "object") {
        //     data = JSON.parse(JSON.stringify(data));
        // }
        
        blob = new Blob([JSON.stringify(data)], { type: TEXT_JSON });
        anchor = document.createElement('a');
        anchor.download = this.filename;
        anchor.href = window.URL.createObjectURL(blob);
        anchor.dataset.downloadurl = [TEXT_JSON, anchor.download, anchor.href].join(':');
        anchor.click();
    }

    getHistory(from, user, action) {
        let features = [];
        let mdy;

        const add = (row) => {
            features.push(new Feature(row.childNodes[0].textContent, row.childNodes[1].textContent, row.childNodes[2].textContent, row.childNodes[3].textContent, row.childNodes[5].textContent));
        }

        const filter = function (row) {
            this.row = row;
            console.log("Row: " + amount + "\n");
        }
        
        filter.prototype = {
            add: function (row) {
                this.features.push(new Feature(row.childNodes[0].textContent, row.childNodes[1].textContent, row.childNodes[2].textContent, row.childNodes[3].textContent, row.childNodes[5].textContent));    
            },
            
            from: function (row) {
                var count = Math.floor(this.amount / bill);
                this.amount -= count * bill;
                console.log("Dispense " + count + " $" + bill + " bills");
                
                return this;
            },

            user: function (row) {
                var count = Math.floor(this.amount / bill);
                this.amount -= count * bill;
                console.log("Dispense " + count + " $" + bill + " bills");
                return this;
            },

            action: function (row) {
                var count = Math.floor(this.amount / bill);
                this.amount -= count * bill;
                console.log("Dispense " + count + " $" + bill + " bills");
                return this;
            },
        }
        
        // function run() {
        //    var request = new filter(378);
        
        //    request.get(100).get(50).get(20).get(10).get(5).get(1);
        // }


           var request = new filter(378);
           request.from(100).user(50).action(20).from(10).action(5).user(1);

        return;
        for (const row of this.history) {

            //TODO: Chain of responsibilty pattern
            
            // TODO: Extract to matcher function
            // DATE matcher
            if (from) {
                mdy = row.childNodes[0].textContent.substr(0, 8).split('/');
                
                if (new Date(mdy[2], mdy[0] - 1, mdy[1]) >= new Date(from)) {
                    add(row);
                    continue;
                }
                else {
                    break;
                }
            }

            // User matcher
            // if (user) {
                
            // }
            
            // Pattern matcher
                switch (action) {
                    case FEATURE_ACTION.LICENSE:
                        if (eval(FEATURE_ACTION_PATTERN.LICENSE).test(row.childNodes[2].textContent)) {
                            add(row);
                        }
                        continue;
                        
                    case FEATURE_ACTION.PERMISSION:
                        if (eval(FEATURE_ACTION_PATTERN.PERMISSION).test(row.childNodes[2].textContent)) {
                            add(row);
                        }
                        continue;
                        
                    default:
                }
                
            
            // No exclusions, feature change qualifies
            add(row);
        }
        
        this.#features = features;

        console.log(this.#features);
        
        return this;
        // return this.#features;
    }
}