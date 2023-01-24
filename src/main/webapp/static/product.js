
function getProductUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/product";
}

//BUTTON ACTIONS
function addProduct(event){
	//Set the values to update
	var $form = $("#product-form");
	var json = toJson($form);
	var url = getProductUrl();

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },
	   success: function(response) {
			$('#add-product-modal').modal('toggle');
			$form[0].reset();
			handleAjaxSuccess("Product added successfully!!")
	   		getProductList();
	   },
	   error: handleAjaxError
	});

	return false;
}

function updateProduct(event){
	
	//Get the ID
	var id = $("#product-edit-form input[name=id]").val();
	var url = getProductUrl() + "/" + id;

	//Set the values to update
	var $form = $("#product-edit-form");
	var json = toJson($form);

	$.ajax({
	   url: url,
	   type: 'PUT',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
			handleAjaxSuccess("Product edited successfully!!")
	   		getProductList();
			$('#edit-product-modal').modal('toggle');
	   },
	   error: handleAjaxError
	});

	return false;
}


function getProductList(){
	var url = getProductUrl();
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayProductList(data);
	   },
	   error: handleAjaxError
	});
}

//function deleteProduct(id){
//	var url = getProductUrl() + "/" + id;
//
//	$.ajax({
//	   url: url,
//	   type: 'DELETE',
//	   success: function(data) {
//	   		getProductList();
//	   },
//	   error: handleAjaxError
//	});
//}

// FILE UPLOAD METHODS
var fileData = [];
var errorData = [];
var processCount = 0;


function processData(){
	var file = $('#productFile')[0].files[0];
	readFileData(file, readFileDataCallback);
}

function readFileDataCallback(results){
	fileData = results.data;
	uploadRows();
}

function uploadRows(){
	//Update progress
	updateUploadDialog();
	//If everything processed then return
	if(processCount==fileData.length){
		return;
	}
	
	//Process next row
	var row = fileData[processCount];
	processCount++;
	
	var json = JSON.stringify(row);
	var url = getProductUrl();

	//Make ajax call
	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
	   		uploadRows();  
	   },
	   error: function(response){
	   		row.error=response.responseText
	   		errorData.push(row);
	   		uploadRows();
	   }
	});

}

function downloadErrors(){
	writeFileData(errorData);
}

//UI DISPLAY METHODS

function displayProductList(data){
	var $tbody = $('#product-table').find('tbody');
	$tbody.empty();
	let index = 1;

	for(var i in data){
		var e = data[i];
//		console.log(e);
//		var buttonHtml = '<button onclick="deleteProduct(' + e.id + ')">delete</button>'
		var buttonHtml = ' <button title="Edit" class="btn" onclick="displayEditProduct(' + e.id + ')"><img src="'+getBaseUrl()+'/static/images/edit1.png" alt="Edit" /></button>'
		var row = '<tr>'
		+ '<td>' + index++ + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td>'  + e.barcode + '</td>'
		+ '<td>'  + e.brand + '</td>'
		+ '<td>'  + e.category + '</td>'
		+ '<td class="text-right">'  + numberWithCommas(parseFloat(e.mrp).toFixed(2)) + '</td>'
		+ '<td class="supervisor-only text-center">' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
	verifyRole();
}

function displayEditProduct(id){
	var url = getProductUrl() + "/" + id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayProduct(data);
	   },
	   error: handleAjaxError
	});	
}

function resetUploadDialog(){
	//Reset file name
	var $file = $('#productFile');
	$file.val('');
	$('#productFileName').html("Choose File");
	//Reset various counts
	processCount = 0;
	fileData = [];
	errorData = [];
	//Update counts	
	updateUploadDialog();
}

function updateUploadDialog(){
	$('#rowCount').html("" + fileData.length);
	$('#processCount').html("" + processCount);
	$('#errorCount').html("" + errorData.length);
}

function updateFileName(){
	var $file = $('#productFile');
	var fileName = $file.val();
	$('#productFileName').html(fileName);
}

function displayUploadData(){
 	resetUploadDialog(); 	
	$('#upload-product-modal').modal('toggle');
}

function displayProduct(data){
//console.log("data = ")
//    console.log(data);
	$("#product-edit-form input[name=name]").val(data.name);
	$("#product-edit-form input[name=barcode]").val(data.barcode);
	$("#product-edit-form input[name=id]").val(data.id);
	$("#product-edit-form input[name=brand]").val(data.brand);
	$("#product-edit-form input[name=category]").val(data.category);
	$("#product-edit-form input[name=mrp]").val(parseFloat(data.mrp).toFixed(2));
	$('#edit-product-modal').modal('toggle');
}


//INITIALIZATION CODE
function init(){
	$('#add-product-confirm').click(addProduct);
	$('#update-product').click(updateProduct);
	$('#refresh-data').click(getProductList);
	$('#upload-data').click(displayUploadData);
//	$('#process-data').click(processData);
//	$('#download-errors').click(downloadErrors);
//    $('#productFile').on('change', updateFileName)
	let element = document.querySelector("#product-link");
	element.classList.add("active");
}

$(document).ready(init);
$(document).ready(getProductList);

