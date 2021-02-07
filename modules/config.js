export default {
    width: 960,
    height: 600,
    path: d3.geoPath(),
    zoom: d3.zoom(),
    zoomLimit: { min: 1, max: 15 },
    scaleDividend: 0.875,
    widgets: {
        search: d3.select('.controls__search'),
        reset: d3.select('.controls__reset'),
        status: d3.select('.controls__status'),
        senA: d3.select('.congress__senA'),
        senB: d3.select('.congress__senB'),
        rep: d3.select('.congress__rep')
    }
};