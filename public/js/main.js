window.onload = function() {
  cartodb.createVis('map', 'https://efuquen.cartodb.com/api/v2/viz/dd5312ae-d222-11e5-999d-0e787de82d45/viz.json');
}
$(function(){

	$("[data-tab='overview'] a").click(function (e) {
	  e.preventDefault()
	  $("div#overview").tab('show');
	  $("div#precinct").tab('hide');
	  $("div#overview").tab('hide');
	})

	$("[data-tab='precinct'] a").click(function (e){
		e.preventDefault()
		$("div#overview").tab('hide');
	  $("div#precinct").tab('show');
	  $("div#overview").tab('hide');
	});

	$("[data-tab='rep'] a").click(function (e){
		e.preventDefault()
		$("div#overview").tab('hide');
	  $("div#precinct").tab('hide');
	  $("div#overview").tab('show');
	});
});
