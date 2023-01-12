console.log("Inventory running");


function getInventoryUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/reports/inventory";
}

function getInventoryList(){
	var url = getInventoryUrl();
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		console.log("succesfully fetched list");
	   		displayInventoryList(data);
	   },
	   error: handleAjaxError
	});
}

//UI DISPLAY METHODS

function displayInventoryList(data){
	var $tbody = $('#inventory-table').find('tbody');
	$tbody.empty();
	let index = 1;
	for(var i in data){
		var e = data[i];
		console.log(e);
		var row = '<tr>'
		+ '<td>' + index++ + '</td>'
		+ '<td>' + e.brand + '</td>'
		+ '<td>' + e.category + '</td>'
		+ '<td>'  + e.quantity + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
}

$(document).ready(getInventoryList);

