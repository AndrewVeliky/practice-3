// make correct numeration of filtered table
function makeNumeration(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            array[i].firstElementChild.innerHTML = i + 1;
        }

        if ((i - 1) % 2 === 0 && array[i] !== undefined) {
            array[i].classList.add("table-row-even");
        } else {
            array[i].classList.remove("table-row-even");
        }
        
    }
}

export default function filterTable(tbody, filters) {
    const tr = tbody.getElementsByTagName("tr");
    
    // if filter is empty make original table
    if (Object.keys(filters).length === 0) {
        makeNumeration(tr);
    }

    // Map like key:first-td, values: other-tds
    const trMap = new Map();
    for (let i = 0; i < tr.length; i++) {
        if (tr[i].classList.contains("d-none")) {
            tr[i].classList.toggle("d-none");
        }

        trMap.set(i + 1, tr[i].querySelectorAll("td[data-field-name]"));
    }

    // 1.running throught filter obj and step by step filtering
    // 2.running throught trMap keys
    // 3.running throught all tds of all Map items
    // 4.compare td.dataset with key of filter obj
    // 5.if td.innerHTML has filter`s obj value, move on
    // 6.if not add to td`s parent (tr) class d-none
    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            for (const key of trMap.keys()) {
                for (const td of trMap.get(key)) {
                    if (td.dataset.fieldName === filter) {
                        if (td.innerHTML.indexOf(filters[filter]) !== -1) {
                            continue;
                        } else {
                            td.parentElement.classList.add("d-none");
                        }
                    }
                }
            }
        }
    }
    // make correct numeration of filtered table
    makeNumeration(tbody.querySelectorAll("tr:not(.d-none)"));
}
