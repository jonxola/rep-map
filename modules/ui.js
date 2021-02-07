import config from './config.js';

function updateUI() {
    const { congress, selected } = window.app;

    if (selected.state) {
        const senators = congress.senate[selected.state.usps.toUpperCase()];
        updateCard(config.widgets.senA, senators[0]);
        updateCard(config.widgets.senB, senators[1]);
    } else {
        clearCard(config.widgets.senA);
        clearCard(config.widgets.senB);
    }

    if (selected.cd) {
        const rep = congress.house[selected.state.usps.toUpperCase()][selected.cd.number];
        updateCard(config.widgets.rep, rep);
    } else {
        clearCard(config.widgets.rep);
    }
}

function updateCard(card, member) {
    const currentTerm = member.terms[member.terms.length - 1];

    card.select('.party-marker').classed('democrat republican independent', false);
    card.select('.party-marker').classed(currentTerm.party.toLowerCase(), true);

    card.select('.name').text(member.name.official_full);

    const serves = currentTerm.type === 'rep' ? `${currentTerm.state}-${currentTerm.district}` : currentTerm.state;
    card.select('.serves').text(serves);

    card.select('.term').text(`${currentTerm.start.substring(0, 4)}-${currentTerm.end.substring(0, 4)}`);

    card.classed('hidden', false);
}

function clearCard(card) {
    card.classed('hidden', true);
}

export { updateUI };