import config from './config.js';
import { updateUI } from './ui.js';

// focus on a d3 selection, transition over duration ms
function focus(selection, duration = 0) {
    const svgBounds = d3.select('.root').node().getBoundingClientRect();

    const [[x0, y0], [x1, y1]] = config.path.bounds(selection.datum());

    // target scale = scale dividend / selection's largest % of viewport
    const scale = config.scaleDividend / Math.max((x1 - x0) / svgBounds.width, (y1 - y0) / svgBounds.height);

    d3.select('.root').transition().duration(duration).call(
        config.zoom.transform,
        d3.zoomIdentity
            .translate(svgBounds.width / 2, svgBounds.height / 2)
            .scale(Math.min(Math.max(scale, config.zoomLimit.min), config.zoomLimit.max))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    );
}

function reset() {
    window.app.selected.state = null;
    window.app.selected.cd = null;
    hideCds();
    focus(d3.select('.nation'), 750);
    config.widgets.status.text('');
    
    updateUI();
}

// hide all districts
function hideCds() {
    d3.selectAll('.cd').classed('selected visible', false);
    d3.select('.states').raise();
}

// show cds within the specified state
function showCds(usps) {
    d3.selectAll('.cd')
        .filter(d => d.properties.name.substring(0, 2) === usps)
        .classed('visible', true);
    d3.select('.cds').raise();
}

function selectState(state) {
    const d = state.datum();

    // if this is a new state being selected, reset first
    if (window.app.selected.state && d.properties.usps !== window.app.selected.state.usps) reset();

    window.app.selected.state = d.properties;
    showCds(window.app.selected.state.usps);
    focus(state, 750);

    updateUI();
}

function selectCd(cd) {
    const d = cd.datum();
    
    if (window.app.selected.cd && d.properties.name === window.app.selected.cd.name) {
        // if this cd is already selected, deselect
        cd.classed('selected', false);
        window.app.selected.cd = null;
    } else {
        // otherwise select the new one
        d3.selectAll('.cd').classed('selected', false);
        cd.classed('selected', true);
        window.app.selected.cd = d.properties;
    }

    updateUI();
}

export { focus, reset, selectState, selectCd };