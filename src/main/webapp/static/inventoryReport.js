function getInventoryUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/reports/inventory";
}

const getBrandUrl = (brand="", category="") => {
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/brand?brand="+brand+"&category="+category;
}

function filterReport() {
	var $form = $("#inventory-form");
	var json = toJson($form);
	var url = getInventoryUrl();

	console.log($form);

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
		'Content-Type': 'application/json'
	   },
	   success: function(response) {
		   console.log(response);
			displayInventoryList(response);
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
		+ '<td>'  + numberWithCommas(e.quantity) + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
	$('thead').show();
}

const fillOptions = () => {
	var url = getBrandUrl();

	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(response) {
		console.log(response);
			populateBrand(response);
			populateCategory(response);
	   },
	   error: handleAjaxError
	});
}

const populateBrand = data => {
	let $selectBrand = $("#inputBrand");

	let brands = new Set();
	for(var i in data){
		var e = data[i];
		brands.add(e.name);
	}

	for(brand of brands.values()) {
		var ele = '<option value="'+brand+'">' + brand + '</option>';
        $selectBrand.append(ele);
	}
}

const populateCategory = data => {
	let $selectCategory = $("#inputCategory");

	let categories = new Set();
	for(var i in data){
		var e = data[i];
		categories.add(e.category);
	}

	for(category of categories.values()) {
		var ele = '<option value="'+category+'">' + category + '</option>';
        $selectCategory.append(ele);
	}
}

 
 //INITIALIZATION CODE
 function init(){
    $('#filter-report').click(filterReport);
	$('thead').hide();
	// filterReport();
	fillOptions();
 }
 
 $(document).ready(init);

