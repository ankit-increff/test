function getSalesReportUrl(){
    var baseUrl = $("meta[name=baseUrl]").attr("content")
    return baseUrl + "/api/reports/sales";
 }

 const getBrandUrl = (brand="", category="") => {
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/brand?brand="+brand+"&category="+category;
}
 
 function filterSalesReport() {
     var $form = $("#sales-form");
     var json = toJson($form);
     var url = getSalesReportUrl();

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
             displaySalesReport(response);
        },
        error: handleAjaxError
     });
 }
 
 function displaySalesReport(data) {
     let index = 1;
     var $tbody = $('#sales-table').find('tbody');
     $tbody.empty();
     for(var i in data){
         var b = data[i];
         var row = '<tr>'
         + '<td>' + index++ +'</td>'
         + '<td>' + b.brand + '</td>'
         + '<td>' + b.category + '</td>'
         + '<td>' + b.quantity + '</td>'
         + '<td class="text-right">' + parseFloat(b.revenue ).toFixed(2)+ '</td>'
         + '</tr>';
         $tbody.append(row);
     }
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
    $('#filter-sales-report').click(filterSalesReport);
    filterSalesReport();
    fillOptions();
 }
 
 $(document).ready(init);