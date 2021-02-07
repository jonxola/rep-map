import config from './modules/config.js';
import { congress } from './modules/congress.js';
import { draw } from './modules/draw.js';
import { focus, reset, selectState, selectCd } from './modules/map.js';
import { search } from './modules/search.js';

window.app = {
    congress: null,
    selected: { // holds the topojson properties of the selected feature
        state: null,
        cd: null
    }
};

fetch('https://theunitedstates.io/congress-legislators/legislators-current.json')
    .then(res => res.json())
    .then(legislators => {
        // organize congress
        window.app.congress = congress(legislators);
        return d3.json('us.json');
    })
    .then(us => {
        // draw svg
        draw(us);

        // set zoom behavior
        config.zoom
            .scaleExtent([config.zoomLimit.min, config.zoomLimit.max])
            .on('zoom', event => {
                d3.select('.map').attr('transform', event.transform);
                d3.select('.map').style('stroke-width', 1 / event.transform.k);
            });

        // add zoom & reset listeners
        d3.select('.root').call(config.zoom).on('click', reset);

        // focus on full map
        focus(d3.select('.nation'));

        // reset on resize
        window.onresize = reset;

        // state & cd event listeners
        d3.selectAll('.state').on('click', function(event) {
            event.stopPropagation();
            selectState(d3.select(this));
        })
        .on('mouseenter', function(event, d) {
            config.widgets.status.text(d.properties.usps.toUpperCase());
        });

        d3.selectAll('.cd').on('click', function(event) {
            event.stopPropagation();
            selectCd(d3.select(this));
        })
        .on('mouseenter', function(event, d) {
            const { name } = d.properties;
            config.widgets.status.text(name.substring(0, 2).toUpperCase() + name.substring(2));
        });

        // search bar
        config.widgets.search.on('submit', search);
        
        // reset button
        config.widgets.reset.on('click', reset);
    })
    .catch(error => {
        alert(`Something went wrong :(\n${error}`);
    });