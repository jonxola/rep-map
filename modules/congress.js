// organize a list of congress members
// access a senator: congress.senate[state usps][0 or 1]
// access a representative: congress.house[state usps][district number]
function congress(members) {
    const congress = { senate: {}, house: {} };

    for (const member of members) {
        const currentTerm = member.terms[member.terms.length - 1];

        if (currentTerm.type === "sen") {
            // add new states to the senate
            if (!congress.senate[currentTerm.state]) {
                congress.senate[currentTerm.state] = [];
            }
            // add new member
            congress.senate[currentTerm.state].push(member);
        } else if (currentTerm.type === "rep") {
            // add new states to the house
            if (!congress.house[currentTerm.state]) {
                congress.house[currentTerm.state] = {};
            }
            // add new member
            congress.house[currentTerm.state][currentTerm.district] = member;
        }
    }

    return congress;
}

export { congress };