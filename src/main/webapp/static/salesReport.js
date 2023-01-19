function getSalesReportUrl(){
    var baseUrl = $("meta[name=baseUrl]").attr("content")
    return baseUrl + "/api/reports/sales";
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
         + '<td>' + parseFloat(b.revenue ).toFixed(2)+ '</td>'
         + '</tr>';
         $tbody.append(row);
     }
 }
 
 //INITIALIZATION CODE
 function init(){
    $('#filter-sales-report').click(filterSalesReport);
    filterSalesReport();
 }
 
 $(document).ready(init);