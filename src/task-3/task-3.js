// make correct numeration of filtered table
function makeNumeration(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].firstElementChild.innerHTML = i + 1;
        array[i].classList.remove("d-none");

        if (array[i].firstElementChild.innerHTML % 2 === 0) {
            array[i].classList.add("table-row-even");
        } else {
            array[i].classList.remove("table-row-even");
        }
    }
}

export default function filterTable(tbody, filters) {
    // make table great again :)
    makeNumeration(tbody.getElementsByTagName("tr"));

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const filterTd = tbody.querySelectorAll(`td[data-field-name=${filter}]`);
            // run through filteredTd and if td not contain filter value and not contain d-none add d-none class
            for (let j = 0; j < filterTd.length; j++) {
                if (filterTd[j].innerHTML.indexOf(filters[filter]) === -1) {
                    filterTd[j].parentElement.classList.add("d-none");
                }
            }
        }
    }
    // make correct numeration of filtered table
    makeNumeration(tbody.querySelectorAll("tr:not(.d-none)"));
}
