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

