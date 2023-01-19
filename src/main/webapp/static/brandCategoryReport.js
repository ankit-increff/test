function getBrandUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/reports/brand-category";
}

function filterReport() {
	var $form = $("#brand-form");
	var json = toJson($form);
	var url = getBrandUrl();

	console.log(json);

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
		'Content-Type': 'application/json'
	   },
	   success: function(response) {
		   console.log(response);
			displayBrandList(response);
	   },
	   error: handleAjaxError
	});
}

//UI DISPLAY METHODS

function displayBrandList(data){
	let index=1;
	var $tbody = $('#brand-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		var row = '<tr>'
		+ '<td>' + index++ + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td>' + e.category + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
}

//INITIALIZATION CODE
function init(){
$('#filter-report').click(filterReport);
filterReport();
}
 
 $(document).ready(init);

