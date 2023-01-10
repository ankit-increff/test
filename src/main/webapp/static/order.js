console.log("Order running");

// let orderForm = document.querySelector("#order-form");
// let addItem = document.querySelector("#add-item");
// var index=2;

// addItem.addEventListener("click", (e) => {
//     let newItem = `<div class="form-group">
//                                       <div class="form-group">
//                                           <label for=${"inputBarcode-"+index} class="col-sm-2 col-form-label">Barcode</label>
//                                           <div class="col-sm-10">
//                                               <input type="text" class="form-control input-barcode" name="barcode" id=${"inputBarcode-"+index}
//                                                      placeholder="enter barcode">
//                                           </div>
//                                       </div>
//                                       <div class="form-group">
//                                           <label for=${"inputQuantity-"+index} class="col-sm-2 col-form-label">Quantity</label>
//                                           <div class="col-sm-10">
//                                               <input type="number" class="form-control input-quantity" name="quantity" id=${"inputQuantity-"+index}
//                                                      placeholder="enter quantity">
//                                           </div>
//                                       </div>
// 									  <div class="form-group">
//                                           <label for=${"inputPrice-"+index} class="col-sm-2 col-form-label">Price</label>
//                                           <div class="col-sm-10">
//                                               <input type="number" class="form-control input-price" name="sellingPrice" id=${"inputprice-"+index}
//                                                      placeholder="enter price">
//                                           </div>
//                                       </div>
//                                       <button type="button" class="btn btn-warning remove-item" id=${"removeItem-"+index}> - </button>
//                                   </div>`;

//     let orderForm = document.querySelector("#order-form");
//     console.log(orderForm.lastElementChild)
//     orderForm.lastElementChild.insertAdjacentHTML("afterend",newItem);
//     index++;

//     //removing parameter
//     let removeItem=document.getElementsByClassName("remove-item");
//     console.log(removeItem);
//     for(elem of removeItem){
//         elem.addEventListener("click", (e)=>{
//             e.target.parentElement.remove();
//         })
//     }
// })


let globalOrderId = 1;



function getOrderUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/order";
}

//BUTTON ACTIONS
function addOrder(event){
	//Set the values to update
	var $rawForm = $("#order-form");	

	var json = convertJson($rawForm);
	var url = getOrderUrl();
	console.log(json);

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
			$('#add-order-modal').modal('toggle');
			$rawForm[0].reset();
	   		getOrderList();  
	   },
	   error: handleAjaxError
	});
//	location.reload();

	return false;
}

// function orderDetails(event){

//     console.log("update running...");
// 	$('#order-items-modal').modal('toggle');
// 	//Get the ID
// 	var id = $("#brand-edit-form input[name=id]").val();
// 	var url = getBrandUrl() + "/" + id;


// 	//Set the values to update
// 	var $form = $("#brand-edit-form");
// 	var json = toJson($form);

// 	$.ajax({
// 	   url: url,
// 	   type: 'PUT',
// 	   data: json,
// 	   headers: {
//        	'Content-Type': 'application/json'
//        },
// 	   success: function(response) {
// 	   		getBrandList();
// 	   },
// 	   error: handleAjaxError
// 	});

// 	return false;
// }


function getOrderList(){
	var url = getOrderUrl();
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayOrderList(data);  
	   },
	   error: handleAjaxError
	});
}

//HELPER FUNCTIONS
function convertJson($form){
    var serialized = $form.serializeArray();
    console.log("look ",serialized);
    var s = '';
	var arr = [];
    
    for(let i=0;i<serialized.length;i+=3){
		let data = {};
        data[serialized[i]['name']] = serialized[i]['value'];
		data[serialized[s+1]['name']] = serialized[i+1]['value'];
		data[serialized[s+2]['name']] = serialized[i+2]['value'];
		arr.push(data);
    }
    var json = JSON.stringify(arr);
    return json;
}

//UI DISPLAY METHODS

function displayOrderList(data){
	var $tbody = $('#order-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];

		var newDate = new Date(e.date);
		var buttonHtml = '<button class="btn btn-outline-info" onclick="displayOrderDetails(' + e.id + ')">Details</button>'
		buttonHtml += ' <button class="btn btn-outline-warning" onclick="displayEditOrder(' + e.id + ')">Edit</button>'
		var row = '<tr>'
		+ '<td>' + e.id + '</td>'
		+ '<td>' + newDate.toString() + '</td>'
		+ '<td>'  + e.amount + '</td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
}

//_____________________________________________EDIT BUTTON FUNCTIONALITY____________________________________

function displayEditOrder(id){
	var url = getOrderUrl() + "/" + id;
	globalOrderId = id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		editOrderForm(data);
	   },
	   error: handleAjaxError
	});
}

function editOrderForm(data) {
	var $orderId = document.querySelector("#order-id-edit")
	$orderId.innerText = ` (Id: ${data[0].orderId})`;
	var $tbody = $('#order-edit-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		var buttonHtml = '<button class="btn btn-outline-danger" onclick=removeFromModal(event)>Delete</button>'
		var row = '<tr class="update-row">'
		+ '<td class="update-barcode">' + e.barcode + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td><input type="number" class="form-control w-50 update-quantity" value="'  + e.quantity + '"></td>'
		+ '<td><input type="number" class="form-control w-50 update-price" value="'  + e.sellingPrice + '"></td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}	
	$('#order-edit-modal').modal('toggle');
}

//_____________________________________________MODIFY EDIT TABLE____________________________________
function addInEditTable() {
	let barcode = document.querySelector(".edit-barcode");
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	var productUrl = baseUrl + "/api/product"

	var url = productUrl + "?barcode=" + barcode.value;
	console.log(url);
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
			console.log(data);
	   		displayInEditTable(data);
	   },
	   error: handleAjaxError
	});
}

function displayInEditTable(e) {
	let quantity = document.querySelector(".edit-quantity");
	let price = document.querySelector(".edit-price");
	let barcode = document.querySelector(".edit-barcode");
	
	var $tbody = $('#order-edit-table').find('tbody');
		var buttonHtml = '<button class="btn btn-outline-danger" onclick=removeFromModal(event)>Delete</button>'
		var row = '<tr class="update-row">'
		+ '<td class="update-barcode">' + e.barcode + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td><input type="number" class="form-control w-50 update-quantity" value="'  + quantity.value + '"></td>'
		+ '<td><input type="number" class="form-control w-50 update-price" value="'  + price.value + '"></td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
     $tbody.append(row);

	 quantity.value = null;
	 price.value = null;
	 barcode.value = null;
}


function removeFromModal(e) {
	e.target.parentElement.parentElement.remove();
}


//_______________________________CREATE NEW ORDER____________________________
function addInCreateTable() {
	let barcode = document.querySelector(".add-barcode");
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	var productUrl = baseUrl + "/api/product"

	var url = productUrl + "?barcode=" + barcode.value;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
			console.log(data);
	   		displayInCreateTable(data);
	   },
	   error: handleAjaxError
	});
}

function displayInCreateTable(e) {
	let quantity = document.querySelector(".add-quantity");
	let price = document.querySelector(".add-price");
	let barcode = document.querySelector(".add-barcode");
	
	var $tbody = $('#order-add-table').find('tbody');
		var buttonHtml = '<button class="btn btn-outline-danger" onclick=removeFromModal(event)>Delete</button>'
		var row = '<tr class="new-row">'
		+ '<td class="new-barcode">' + e.barcode + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td><input type="number" class="form-control w-50 new-quantity" value="'  + quantity.value + '"></td>'
		+ '<td><input type="number" class="form-control w-50 new-price" value="'  + price.value + '"></td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
     $tbody.append(row);

	 quantity.value = null;
	 price.value = null;
	 barcode.value = null;
}

//____________________________________PLACE NEW ORDER________________________________________
function CreateNewOrder(e) {
	console.log("update click registered!");
	let rows = document.getElementsByClassName("new-row");
	let req = [];
	for(let i=0;i<rows.length;i++) {
		let elem = rows[i];
		let barcode = elem.querySelector(".new-barcode").innerText;
		let quantity = elem.querySelector(".new-quantity").value;
		let price = elem.querySelector(".new-price").value;

		let obj = {
			barcode,
			quantity,
			"sellingPrice": price
		};
		req.push(obj);
	}
	console.log(req);
	var json = JSON.stringify(req);
	var url = getOrderUrl();

	console.log(json);

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },
	   success: function(response) {
			$('#add-order-modal').modal('toggle');
			$('#order-add-table').find('tbody').empty();
	   		getOrderList();
	   },
	   error: handleAjaxError
	});
}


//____________________________________SUBMIT UPDATE ORDER________________________________________
function updateOrder(e) {
	console.log("update click registered!");
	let rows = document.getElementsByClassName("update-row");
	let req = [];
	for(let i=0;i<rows.length;i++) {
		let elem = rows[i];
		let barcode = elem.querySelector(".update-barcode").innerText;
		let quantity = elem.querySelector(".update-quantity").value;
		let price = elem.querySelector(".update-price").value;

		let obj = {
			barcode,
			quantity,
			"sellingPrice": price
		};
		req.push(obj);
	}
	console.log(req);
	var json = JSON.stringify(req);
	var url = getOrderUrl() + "/" + globalOrderId;

	console.log(json);

	$.ajax({
	   url: url,
	   type: 'PUT',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },
	   success: function(response) {
	   		getOrderList();
			$('#order-edit-modal').modal('toggle');
	   },
	   error: handleAjaxError
	});
	
}



//____________________________________DETAILS BUTTON FUNCTIONALITY______________________________

function displayOrderDetails(id){
	var url = getOrderUrl() + "/" + id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displayOrder(data);
	   },
	   error: handleAjaxError
	});
}

function displayUploadData(){
 	resetUploadDialog(); 	
	$('#upload-order-modal').modal('toggle');
}

function displayOrder(data){
	console.log(data);
	var $orderId = document.querySelector("#order-id")
	console.log($orderId);
	$orderId.innerText = ` (Id: ${data[0].orderId})`;
	var $tbody = $('#order-items-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		var row = '<tr>'
		+ '<td>' + e.barcode + '</td>'
		+ '<td>' + e.name + '</td>'
		+ '<td>'  + e.quantity + '</td>'
		+ '<td>'  + e.sellingPrice + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}	
	$('#order-items-modal').modal('toggle');
}


//INITIALIZATION CODE
function init(){
	$('#add-order-confirm').click(CreateNewOrder);
	$('#refresh-data').click(getOrderList);
	$('#upload-data').click(displayUploadData);
	// $('#process-data').click(processData);
	// $('#download-errors').click(downloadErrors);
    // $('#orderFile').on('change', updateFileName)
}

$(document).ready(init);
$(document).ready(getOrderList);













