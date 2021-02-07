import config from './config.js';

function draw(us) {
    // groups
    const svg = d3.select('body').append('svg')
        .attr('viewbox', `0 0 ${config.width} ${config.height}`)
        .attr('class', 'root');
    const map = svg.append('g').attr('class', 'map');

    // nation
    map.selectAll('.nation')
        .data(topojson.feature(us, us.objects.nation).features)
        .enter().append('path')
        .attr('d', config.path)
        .attr('class', 'nation');

    const cds = map.append('g').attr('class', 'cds');
    const states = map.append('g').attr('class', 'states');

    // congressional districts
    cds.selectAll('.cd')
        .data(topojson.feature(us, us.objects.cds).features)
        .enter().append('path')
        .attr('d', config.path)
        .attr('class', 'cd')
        .append('title').text(d => d.properties.name.substring(0, 2).toUpperCase() + d.properties.name.substring(2));

    // states
    states.selectAll('.state')
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append('path')
        .attr('d', config.path)
        .attr('class', 'state')
        .append('title').text(d => d.properties.name.substring(0, 1).toUpperCase() + d.properties.name.substring(1));
}

export { draw };