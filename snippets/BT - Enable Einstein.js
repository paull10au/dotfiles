const startsWith = "EinsteinGPT";

licenses = Array.from(document.querySelectorAll(`tr.dataRow:has(td > input[title^='${startsWith}'])`)).forEach( (item) => {
    
    //item.checked = true;
    let section = item.closest("div.pbBody").querySelector("div.pbSubheader > label");
    let selected = item.querySelector("td input[type='checkbox']");
    let quantity = item.querySelector("td input[type='text']");

    if (section) {
        //console.log(section.innerHTML);

        console.log([section.innerHTML, selected.getAttribute("title"), selected.checked, quantity.value]);

        
    }
    
    //console.log(item.querySelector('td > input').checked);
    
});

//console.table([[1,2], [3,4]]);
    
//tr.dataRow:has(td > input[title='EinsteinGPTCopilotPlatform'])