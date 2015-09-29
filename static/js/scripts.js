// problem: user selections need to find matches from the database

// send data with http request 
// server recieves request
// server queries database based on request
// server sends response from database


// when form element is selected/deselcted
var userFormInputs = $("form input").change( function () {
	
	// get form data
	var formData = {};
//TODO: refactor this :]
	formData.climate = $("input[name='climate']:checked").map(function () {
		return this.value;
	}).get();

	formData.light = $("input[name='light']:checked").map(function () {
		return this.value;
	}).get();

	formData.pollutants = $("input[name='pollutants']:checked").map(function () {
		return this.value;
	}).get();

	// formData = JSON.stringify(formData);

	// console.log(formData);
	jQuery.post('/plant-query', formData, function (data, status) {
		console.log(status, data);
		$("#results").html(data.map( function (plant) {
			return "<li>"+plant.commonName+"</li>";
		}));
	})

});



// climate : ['dry', 'humid'],
// light : ['low-light'],
// pollution : ['benzene', 'formaldehyde']