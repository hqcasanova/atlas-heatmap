const React = require( `react`);
const PropTypes = require(`../PropTypes.js`);
const Button = require(`react-bootstrap/lib/Button`);
const DownloadProfilesButton = require(`./download-profiles-button/main.jsx`);
const HeatmapCanvas = require(`./HeatmapCanvas.jsx`);
const OrderingsDropdown = require(`./OrderingsDropdown.jsx`);
const SettingsModal = require(`./settings/SettingsModal.jsx`);
const TooltipStateManager = require(`../util/TooltipStateManager.jsx`);
const CoexpressionOption = require(`./CoexpressionOption.jsx`);

require('./SeriesLegend.less');

const HeatmapLegendBox = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        colour: React.PropTypes.string.isRequired,
        on: React.PropTypes.bool.isRequired
    },

    render() {
        return (
            <div className={`legend-item${this.props.on ? `` : ` legend-item-off`}`}>
                <div style={{background: this.props.colour}} className="legend-rectangle"></div>
                <span style={{verticalAlign: `middle`}}>{this.props.name}</span>
            </div>
        );
    }
});

const HeatmapOptions = React.createClass({
    propTypes: {
        marginRight: React.PropTypes.number.isRequired,
        downloadOptions: React.PropTypes.object.isRequired,
        googleAnalyticsCallback: React.PropTypes.func.isRequired,
        showUsageMessage: React.PropTypes.bool.isRequired,
        orderings: React.PropTypes.shape(PropTypes.Orderings),
        filters: React.PropTypes.arrayOf(PropTypes.Filter).isRequired,
        filtersSelect: React.PropTypes.func.isRequired,
        disableSettings: React.PropTypes.bool.isRequired
    },

    render() {
        return (
            <div className="gxaHeatmapCountAndLegend" style={{paddingBottom: `15px`, position: `sticky`, zIndex: `1`}}>
                <div style={{display: `inline-block`, verticalAlign: `top`}}>
                    {this.props.introductoryMessage}
                </div>

                <div style={{display: `inline-block`, verticalAlign: `top`, float: `right`, marginRight: this.props.marginRight}}>
                    <div style={{display: `inline-block`}}>
                        <OrderingsDropdown
                            orderings={this.props.orderings}
                            disabled={this.props.disableSettings}
                        />
                    </div>

                    <div style={{display: `inline-block`, paddingLeft: `10px`}}>
                        <SettingsModal
                            filters={this.props.filters}
                            orderings={this.props.orderings}
                            propagateChosenFilterSelection={this.props.filtersSelect}
                            disabled={this.props.disableSettings}
                        />
                    </div>

                    <div style={{display: `inline-block`, paddingLeft: `10px`}}>
                        <DownloadProfilesButton
                            {...this.props.downloadOptions}
                            onDownloadCallbackForAnalytics={() => {
                                this.props.googleAnalyticsCallback(`send`, `event`, `HeatmapHighcharts`, `downloadData`)
                            }}
                        />
                    </div>

                </div>

                {this.props.showUsageMessage ?
                    <div style={{fontSize: `small`, color: `grey`}}>
                        Select a section of the heatmap to zoom in
                    </div> :
                    null}
            </div>
        );
    }
});

const HeatmapCanvasWithTooltips = React.createClass({
    render() {
        return (
            <TooltipStateManager
                managedComponent={HeatmapCanvas}
                managedComponentProps={this.props.heatmapProps}
                tooltips={this.props.tooltips}
                onUserSelectsColumn={this.props.anatomogramCallbacks.onUserSelectsColumn}
                onUserSelectsRow={this.props.anatomogramCallbacks.onUserSelectsRow}
                onUserSelectsPoint={this.props.anatomogramCallbacks.onUserSelectsPoint}
                enableFreeze={this.props.enableFreeze}
            />
        )
    }
});

const __heatmapCanvas = (tooltips, anatomogramCallbacks, heatmapProps, interactiveColumnTooltips) =>
    !tooltips ?
        <HeatmapCanvas {...heatmapProps} {...anatomogramCallbacks}/> :
        <HeatmapCanvasWithTooltips
            heatmapProps={heatmapProps}
            tooltips={tooltips}
            anatomogramCallbacks={anatomogramCallbacks}
            enableFreeze={interactiveColumnTooltips}
        />;

const heatmapCanvas = (heatmapConfig, tooltips, anatomogramCallbacks, heatmapProps) =>
    __heatmapCanvas(
        heatmapConfig.isExperimentPage && tooltips, anatomogramCallbacks, heatmapProps,
        heatmapConfig.isExperimentPage && heatmapConfig.isDifferential
    );

const anatomogramCallbacks = (heatmapDataToPresent, highlightOntologyIds) =>
    ({
        onUserSelectsRow(rowLabel) {
            const y =
                heatmapDataToPresent
                    .yAxisCategories
                    .findIndex(e => e.label === rowLabel);

            highlightOntologyIds(
                [].concat.apply([],
                    [].concat.apply([],
                        heatmapDataToPresent
                            .dataSeries
                            .map(series => series.data)
                    )
                    .filter(point => point.y === y)
                    .map(point => point.info.xId || heatmapDataToPresent.xAxisCategories[point.x].id)
                    .map(e => Array.isArray(e) ? e : [e])
                )
                .filter((e,ix,self) => self.indexOf(e) === ix)
            )
        },
        onUserSelectsColumn(columnLabel) {
            highlightOntologyIds(
                heatmapDataToPresent
                    .xAxisCategories
                    .filter(e => e.label === columnLabel)
                    .map(e => e.id)
                    .concat([``])
                    [0]
            )
        },
        onUserSelectsPoint(columnId) {
            //Column ids are, in fact, factorValueOntologyTermId's
            highlightOntologyIds(columnId || ``);
        }
    });

const show = (heatmapDataToPresent, orderings, filters, filtersSelect, zoom, zoomCallback, colorAxis, formatters, tooltips, legend, coexpressions, properties) => {
    const marginRight = 60;
    const heatmapConfig = properties.loadResult.heatmapConfig;
    return (
        <div>
            <HeatmapOptions marginRight={marginRight}
                            introductoryMessage={heatmapConfig.introductoryMessage}
                            downloadOptions={{
                              download: {
                                name: heatmapConfig.shortDescription || "download",
                                descriptionLines: [].concat.apply([],
                                  [
                                    heatmapConfig.description,
                                    orderings.selected != "Default"
                                      ? ["Ordering: "+ orderings.selected]
                                      : [],
                                    filters.filter((_filter) => (
                                      _filter.selected.length < _filter.values.length
                                    ))
                                    .map((_filter) => (
                                      "Filter By " +_filter.name+
                                        ": "+ (
                                          _filter.selected.length < 5
                                          ? _filter.selected.join(", ")
                                          : _filter.selected.length
                                        ) + " selected out of " + (
                                          _filter.values.length < 5
                                          ? _filter.values.join(", ")
                                          : _filter.values.length + " filter values"
                                        )
                                    )),
                                    coexpressions
                                      ? "Including " + coexpressions.numCoexpressionsVisible
                                        + " genes with similar expression pattern"
                                      : []
                                  ]
                                ),
                                heatmapData: heatmapDataToPresent
                              },
                              disclaimer: heatmapConfig.disclaimer
                            }}
                            orderings={orderings}
                            filters={filters}
                            filtersSelect={filtersSelect}
                            disableSettings={zoom}
                            googleAnalyticsCallback={properties.googleAnalyticsCallback}
                            showUsageMessage={heatmapDataToPresent.xAxisCategories.length > 100}
            />

            <div>
                {heatmapDataToPresent.dataSeries
                    .map(e => e.data)
                    .reduce((l,r) => l.concat(r), [])
                    .length ?
                    heatmapCanvas(
                        heatmapConfig,
                        tooltips,
                        anatomogramCallbacks(heatmapDataToPresent, properties.onOntologyIdIsUnderFocus),
                        {
                            marginRight: marginRight,
                            ontologyIdsToHighlight: properties.ontologyIdsToHighlight,
                            heatmapData: heatmapDataToPresent,
                            colorAxis: colorAxis,
                            onHeatmapRedrawn: properties.onHeatmapRedrawn,
                            formatters: formatters,
                            genomeBrowserTemplate: heatmapConfig.genomeBrowserTemplate,
                            onZoom: zoomCallback
                        }
                    ) :
                    <p> No data in the series currently selected. </p>
                }
            </div>

            {legend
              ? <div className ="gxaHeatmapLegend">
                  {legend.map(legendItemProps => <HeatmapLegendBox {...legendItemProps} />)}

                  <div className="legend-item">
                      <span className="icon icon-generic" data-icon="i" data-toggle="tooltip" data-placement="bottom"
                            title="Baseline expression levels in RNA-seq experiments are in FPKM or TPM. Low: 0-10, Medium: 11-1000,  High: >1000. Proteomics expression levels are mapped to low, medium, high on per experiment basis.">
                      </span>
                  </div>
                  <HeatmapLegendBox key={`No data available`}
                                    name={`No data available`}
                                    colour={`white`}
                                    on={true}
                  />
              </div>
              : null
            }

            {coexpressions ? <CoexpressionOption {...coexpressions}/> : null }
        </div>
    );
};

module.exports = show;
