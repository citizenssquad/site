
var precinctByRaceCtx = $("#precinct-by-race-chart").get(0).getContext("2d");
var precinctByRaceChart = null;
window.onload = function() {
	var visUrl = 'https://efuquen.cartodb.com/api/v2/viz/dd5312ae-d222-11e5-999d-0e787de82d45/viz.json';
  cartodb.createVis('map', visUrl).done(function(vis) {
		var layers = vis.getLayers();
		for (var i = 0; i < layers.length; i ++) {
			var layer = layers[i];
			if ('getSubLayer' in layer) {
				layer.getSubLayer(0).set({'interactivity': 'precinct, complaints, complaints_per_10000, white, black, hispanic, asian'});
			}
			layer.on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
        var activeDataTab = $('li.tab-pane.active').attr('data-tab');
        if(activeDataTab === 'rep') {
          legislatorLookUp(latlng[0], latlng[1]);
        }
				if(activeDataTab === 'precinct') {
          precinctLookUp(data);
        }
			});
		}
	});
}

function precinctLookUp(data) {
  $('#precinct .precinct-instruction').hide();
  $('#precinct .precinct-content').show();
  if ('precinct' in data) {
    $('#precinct .precinct-content h4 span').text(data.precinct);
    $('#precinct .precinct-content #complaints span').text(data.complaints);
    $('#precinct .precinct-content #complaints_per_10000 span').text(data.complaints_per_10000);

    if (precinctByRaceChart) {
      precinctByRaceChart.destroy();
      precinctByRaceChart = null;
      $('#precinct-by-race').hide();
    }
    if ('asian' in data) {
      $('#precinct-by-race').show();
      var chartData = [{
        value: data.white,
        label: 'White',
        color: '#FECC5C',
        fillColor: '#FECC5C',
      }, {
        value: data.asian,
        label: 'Asian',
        color: '#FD8D3C',
        fillColor: '#FD8D3C',
      }, {
        value: data.hispanic,
        label: 'Hispanic/Latino',
        color: '#F03B20',
        fillColor: '#F03B20',
      }, {
        value: data.black,
        label: 'Black/African American',
        color: '#BD0026',
        fillColor: '#BD0026',
      }];
      var chartOptions = {
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>;color: white\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
      };
      precinctByRaceChart = new Chart(precinctByRaceCtx).Doughnut(chartData, chartOptions);
      $("#precinct-by-race-legend").html(precinctByRaceChart.generateLegend());
    }

  }
}

$('#intro').hide();

$(function(){

	$('[data-tab="overview"] a').click(function (e) {
	  e.preventDefault();
		$(this).tab('show');
	  //$('div#overview').tab('show');
	  //$('div#precinct').tab('hide');
	  //$('div#overview').tab('hide');
	})

	$('[data-tab="precinct"] a').click(function (e){
		e.preventDefault();
		$(this).tab('show');
		/*$('div#overview').tab('hide');
	  $('div#precinct').tab('show');
	  $('div#overview').tab('hide');*/
	});

	$('[data-tab="rep"] a').click(function (e){
		e.preventDefault();
		$(this).tab('show');
		/*$('div#overview').tab('hide');
	  $('div#precinct').tab('hide');
	  $('div#overview').tab('show');*/
	});
});

function legislatorLookUp(lat,long) {
	var url = 'http://openstates.org/api/v1//legislators/geo/?lat=' + lat + '&long=' + long + '&apikey=0c92270f55bd46b78e61cceedb25b0ce';

	$('#instruction').hide();
	$('#intro').show();

	$.getJSON(url, function(data) {

		var nyLegislators = [];

		$('div#legislators').empty();
		$.each(data, function(index, rep) {
			$('div#legislators').append(
				'<div class="local-rep"> <h5>'+rep.full_name+'</h5>'+
				'<strong>Email</strong>: '+ rep.email +'<br />'+
				'<strong>Office</strong>: '+ rep.offices[0]['phone'] +'<br />'+
				'<strong>Fax</strong>: '+ rep.offices[0]['fax'] +'<br />'+
				'<strong>Address</strong>: '+ rep.offices[0]['address'] +'</p></div>'
				);
			
		});

	});
}



