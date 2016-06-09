/**
 * @module Excel/SheetFormatPr
 *
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.sheetformatproperties
 *
 */
"use strict";
var _ = require('lodash');
var util = require('./util');

var SheetFormatPr = function (config) {
    config = config || {};

    _.merge(this, config);
    _.defaults(this, {
        baseColWidth: null,
        customHeight: null,
        defaultColWidth: null,
        defaultRowHeight: null,
        outlineLevelCol: null,
        outlineLevelRow: null,
        thickBottom: null,
        thickTop: null,
        zeroHeight: null
    });
};

_.extend(SheetFormatPr.prototype, {
    exportXML: function (doc) {
        var sheetFormatPr = doc.createElement('sheetFormatPr');

        util.setAttributesOnDoc(sheetFormatPr, {
            baseColWidth: this.baseColWidth,
            customHeight: {v: this.customHeight, type: Boolean},
            defaultColWidth: this.defaultColWidth,
            defaultRowHeight: this.defaultRowHeight,
            outlineLevelCol: this.outlineLevelCol,
            outlineLevelRow: this.showGridLines,
            thickBottom: {v: this.thickBottom, type: Boolean},
            thickTop: {v: this.thickTop, type: Boolean},
            zeroHeight: {v: this.showRuler, type: Boolean}
        });
        
        return sheetFormatPr;
    }
});

module.exports = SheetFormatPr;