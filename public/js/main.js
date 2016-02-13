window.onload = function() {
	var visUrl = 'https://efuquen.cartodb.com/api/v2/viz/dd5312ae-d222-11e5-999d-0e787de82d45/viz.json';
  cartodb.createVis('map', visUrl).done(function(vis) {
		console.log(vis);
		var layers = vis.getLayers();
		console.log(layers);
		for (var i = 0; i < layers.length; i ++) {
			var layer = layers[i];
			//layer.set();
			//layer.set({'interactivity': 'precinct, complaints'});
			//var sublayer = layer.getSubLayer(0);
			if ('getSubLayer' in layer) {
				layer.getSubLayer(0).set({'interactivity': 'precinct, complaints'});
			}
			//console.log(layer);
			layer.on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
				if ('precinct' in data) {
					//$('#precinct').
				}
			});
		}
	});
}
$(function(){

	$('[data-tab="overview"] a').click(function (e) {
	  e.preventDefault()
	  $('div#overview').tab('show');
	  $('div#precinct').tab('hide');
	  $('div#overview').tab('hide');
	})

	$('[data-tab="precinct"] a').click(function (e){
		e.preventDefault()
		$('div#overview').tab('hide');
	  $('div#precinct').tab('show');
	  $('div#overview').tab('hide');
	});

	$('[data-tab="rep"] a').click(function (e){
		e.preventDefault()
		$('div#overview').tab('hide');
	  $('div#precinct').tab('hide');
	  $('div#overview').tab('show');
	});
});

function legislatorLookUp(lat,long) {
	var url = 'http://openstates.org/api/v1//legislators/geo/?lat=' + lat + '&long=' + long + '&apikey=0c92270f55bd46b78e61cceedb25b0ce';

	$.getJSON(url, function() {

		var nyLegislators = [];

		$.each(data, function() {
			$('div#legislators').empty();
			$.append(
				'<h5>'+data.full_name+'</h5>'+
				'<p class="email"><strong>Email</strong>: '+ data.email +'</p>'+
				'<p class="phone"><strong>Office</strong>: '+ data.offices[0]['phone'] +'</p>'+
				'<p class="phone"><strong>Fax</strong>: '+ data.offices[0]['fax'] +'</p>'+
				'<p class="address"><strong>Address</strong>: '+ data.offices[0]['address'] +'</p>'
				);
			
		});

	});

}



