**rep-map** is an interactive map dedicated to the U.S. Congress and built with [D3][1].

`shp/` contains congressional district (`cb_2019_us_cd116_5m`), state (`cb_2019_us_state_5m`), and national (`cb_2019_us_nation_5m`) boundary shapefiles from the [U.S. Census Bureau][2].

`fips.json` is a collection of state names, their USPS abbreviations, and their [FIPS codes][3].

`./topo` merges the shapefiles into a TopoJSON file, `us.json`, with the feature collections `nation`, `states`, and `cds`. Each `state` and `cd` is joined with useful properties from `fips.json`. The geometry comes pre-projected and fitted to a 960x600 box. The script relies on some great tools demonstrated in [Mike Bostock][4]'s [Command-Line Cartography][5].

Congressional info courtesy of the [@unitedstates][6] project.

[1]: https://github.com/d3/d3
[2]: https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html
[3]: https://www.census.gov/library/reference/code-lists/ansi.html#par_textimage_3
[4]: https://github.com/mbostock
[5]: https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c
[6]: https://theunitedstates.io/