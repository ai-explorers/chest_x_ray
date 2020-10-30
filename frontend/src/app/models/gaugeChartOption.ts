/**
 * Interface definition for angular-gauge-chart options (https://github.com/recogizer/angular-gauge-chart)
 * 
 * @param hasNeedle determines whether to show the needle or not
 * @param outerNeedle determines whether to show the needle inside or outside the chart
 * @param needleColor colorizes needle with specified colors
 * @param needleStartValue determines where the needle starts at the beginning of the animation
 * @param needleUpdateSpeed determines the speed of needle update animation
 * @param arcColors colorizes gauge with specified color
 * @param arcDelimiters specifies delimiters of the gauge in ascending order
 * @param arcOverEffect determines if over effect on ars is enabled or not
 * @param arcLabels specifies labels to be placed at delimiters ends
 * @param arcLabelFontSize font size of labels at delimiters ends
 * @param arcPadding specifies padding between arcs (in pixels)
 * @param arcPaddingColor color of the padding between delimiters
 * @param rangeLabel depicts gauge ranges on both sides of the chart
 * @param rangeLabelFontSize font size of range labels on both sides of the chart
 * @param centralLabel depicts gauge inner label
 * @param labelsFont specifies font-family to be used for labels
 */
export interface GaugeChartOption {
    hasNeedle?: boolean,
    outerNeedle?: boolean,
    needleColor?: string,
    needleStartValue?: number
    needleUpdateSpeed?: number,
    arcColors?: Array<string>,
    arcDelimiters?: Array<number>,
    arcOverEffect?: boolean,
    arcLabels?: Array<string>,
    arcLabelFontSize?: number,
    arcPadding?: number,
    arcPaddingColor?: string,
    rangeLabel?: Array<string>,
    rangeLabelFontSize?: number,
    centralLabel?: string,
    labelsFont?: string,
}