/* globals $ */

var UXLab = {};

$(function() {

	var pageviews = new Highcharts.Chart({
		chart: {
			renderTo: "pageviews",
			defaultSeriesType: "area"
		},
		plotOptions: {
	        series: {
		        color: "#1875d3",
		        //fillColor: "#268ccd",
		        fillOpacity: 0.1,
		        lineWidth: 4,
	            marker: {
	            	radius: 5,
	                lineWidth: 1,
	                lineColor: "#FFFFFF" // inherit from series
	            }
	        }
	    },
		series: [{
			name: "Pageviews",
			data: [55, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 96]
		}],
		yAxis: {
			title: {
				text: null
			},
			labels: {
				x: 15,
				y: 15,
				style: {
					color: "#999999",
					fontWeight: "bold",
					fontSize: "10px"
				}
			},
			gridLineColor: "#e7e7e7"
		},
		xAxis: {
			gridLineColor: "#e7e7e7",
			labels: {
				x: 15,
				y: -5,
				style: {
					color: "#268ccd",
					fontSize: "10px"
				}
			},
			categories: ["1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov"]
		},
		tooltip: {
			formatter: function() {
				return "Visits: " + this.y;
			},
			borderColor: "#333333"
		},
		credits: false,
		title: false,
		legend: false
	});

	var traffic = new Highcharts.Chart({
		chart: {
			renderTo: "traffic",
			defaultSeriesType: "pie"
		},
		plotOptions: {
			series: {
				showInLegend: true,
				dataLabels: false,
				lineWidth: 1
			}
		},
		series: [{
			name: "Pageviews",
			data: [{
				name: "Search Engines",
				color: "#268ccc",
				y: 4847
			},{
				name: "Referring Sites",
				color: "#e55900",
				y: 1590
			},{
				name: "Direct Traffic",
				color: "#60b400",
				y: 1546
			},{
				name: "Other",
				color: "#eff000",
				y: 3
			}]
		}],
		legend: {
			align: "right",
			verticalAlign: "middle",
			width: 200,
			layout: "vertical",
			borderWidth: 0
		},
		tooltip: {
			formatter: function() {
				console.log(this);
				return "<b>" + this.point.name + "</b><br/>"
				+ this.y + " (" + this.percentage.toFixed(2) + "%)";
			},
			borderColor: "#333333"
		},
		credits: false,
		title: false
	});
	
});