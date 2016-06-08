/**
 * @module Excel/SheetView
 *
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.sheetview%28v=office.14%29.aspx
 *
 */
"use strict";
var _ = require('lodash');
var Pane = require('./Pane');
var util = require('./util')

var SheetView = function (config) {
    config = config || {};

    _.assign(this, config);
    _.defaults(this, {
        pane: new Pane(),
        showZeros: null,
        defaultGridColor: null,
        colorId: null,
        rightToLeft: null,
        showFormulas: null,
        showGridLines: null,
        showOutlineSymbols: null,
        showRowColHeaders: null,
        showRuler: null,
        showWhiteSpace: null,
        tabSelected: null,
        topLeftCell: null,
        viewType: null, //http://www.datypic.com/sc/ooxml/t-ssml_ST_SheetViewType.html
        windowProtection: null,
        zoomScale: null,
        zoomScaleNormal: null,
        zoomScalePageLayoutView: null,
        zoomScaleSheetLayoutView: null
    });
};

_.extend(SheetView.prototype, {

    /**
     * Added froze pane
     * @param column - column number: 0, 1, 2 ...
     * @param row - row number: 0, 1, 2 ...
     * @param cell - 'A1'
     * @deprecated
     */
    freezePane: function(column, row, cell) {
        this.pane.state = 'frozen';
        this.pane.xSplit = column;
        this.pane.ySplit = row;
        this.pane.topLeftCell = cell;
    },

    exportXML: function (doc) {
        var sheetViews = doc.createElement('sheetViews'),
            sheetView = doc.createElement('sheetView');

        util.setAttributesOnDoc(sheetView, {
            //TODO apparent you can add 'book views'.. investigate what these are
            workbookViewId: 0,
            showZeros: {v: this.showZeros, type: Boolean},
            defaultGridColor:  {v: this.defaultGridColor, type: Boolean},
            //TODO: I have no idea what this even is :\
            colorId: this.colorId,
            rightToLeft:  {v: this.rightToLeft, type: Boolean},
            showFormulas:  {v: this.showFormulas, type: Boolean},
            showGridLines:  {v: this.showGridLines, type: Boolean},
            showOutlineSymbols:  {v: this.showOutlineSymbols, type: Boolean},
            showRowColHeaders:  {v: this.showRowColHeaders, type: Boolean},
            showRuler:  {v: this.showRuler, type: Boolean},
            showWhiteSpace:  {v: this.showWhiteSpace, type: Boolean},
            tabSelected:  {v: this.tabSelected, type: Boolean},
            viewType: this.viewType,
            windowProtection:  {v: this.windowProtection, type: Boolean},
            zoomScale:  this.zoomScale,
            zoomScaleNormal: this.zoomScaleNormal,
            zoomScalePageLayoutView: this.zoomScalePageLayoutView,
            zoomScaleSheetLayoutView: this.zoomScaleSheetLayoutView
        });

        sheetView.appendChild(this.pane.exportXML(doc));

        sheetViews.appendChild(sheetView);
        return sheetViews;
    }
});

module.exports = SheetView;