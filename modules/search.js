import { selectState, selectCd } from './map.js';

function search(event) {
    event.preventDefault();
    const query = event.target.elements.query.value.toLowerCase();

    // district name test (e.g. NY-12)
    const cdTest = /^[a-z]{2}-[0-9]{1,2}$/i;
    // usps code test (e.g. TX)
    const uspsTest = /^[a-z]{2}$/i;
    // state name test (e.g. Minnesota)
    const stateTest = /^[a-z ]+$/i;

    if (query.match(cdTest)) searchCd(query);
    else if (query.match(uspsTest)) searchUsps(query);
    else if (query.match(stateTest)) searchState(query.trim());

    event.target.elements.query.value = "";
}

// handle a query like "NY-12"
function searchCd(query) {
    const state = d3.selectAll('.state')
        .filter(d => d.properties.usps === query.substring(0, 2));
    const cd = d3.selectAll('.cd')
        .filter(d => d.properties.name === query);

    if (!state.empty()) selectState(state);
    if (!cd.empty()) selectCd(cd);
}

// handle a query like "TX"
function searchUsps(query) {
    const state = d3.selectAll('.state')
        .filter(d => d.properties.usps === query);

    if (!state.empty()) selectState(state);
}

// handle a query like "Minnesota" or "New Mexico"
function searchState(query) {
    const state = d3.selectAll('.state')
        .filter(d => d.properties.name === query);

    if (!state.empty()) selectState(state);
}

export { search };