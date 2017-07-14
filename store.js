///////////////////////////////////////////////////////////////ajax for POST (creating data)
$("#nameaddbutton").on('click', function(){
	const nameval = $('#nameaddbox').val();
	const lastnameval = $('#lastnameaddbox').val();
	//const idval = $('#idaddbox').val();
	$('#nameaddbox').val("");
	$('#lastnameaddbox').val("");
	$('#idaddbox').val("");
	if(nameval === "" || lastnameval === "")
		alert("Fill all fields!!!!");
	else{
		$.ajax({
			url			: '/users',
			type        : 'post',
			data        : JSON.stringify({
							name: nameval,
							lastname: lastnameval,
							//id: idval
							id: ""
						  }), 
			contentType : "application/json",
			success     : function(data) { 
							alert("Done");
							const mydata = JSON.parse(data);
							alert("Here is your ID "+ mydata.id);
						},
			error       : function(err) {
							alert('Error adding data');
						}
		});
	}
});
//////////////////////////////////////////////////////////////////ajax for GET single person
$("#searcher").on('click', function(){
	const searchval = $('#searchtextbox').val();
	$('#searchtextbox').val("");
	$.ajax({
		url			: '/users/' + searchval,
		type        : 'get',
		success     : function(data) {
						const mydata = JSON.parse(data);
						console.log(mydata);
						console.log(mydata.name);
						
						$("#nameaddbox").val(mydata.name)  ;
						$("#lastnameaddbox").val(mydata.lastname)  ;
						$("#idaddbox").val(mydata.id)  ;
					},
		error       : function(err) {
						alert('Error getting data');
					}
	});
});
///////////////////////////////////////////////////////////////ajax for Delete (removing data)
$("#deleter").on('click',function(){
	const deleteval = $("#deletetextbox").val();
	$("#deletetextbox").val("");
	$.ajax({
		url			:"/users/"+deleteval,
		type		:'delete',
		contentType : "application/json",
		success 	: function(){
						alert("data is deleted");
					},
		error 		: function(){
						alert("Error deleting data");
					}
	});
});
////////////////////////////////////////////////////////////// ajax for PUT (updating data)
$("#updatebutton").on('click', function(){
	const nameval = $('#nameaddbox').val();
	const lastnameval = $('#lastnameaddbox').val();
	const idval = $('#idaddbox').val();
	$('#nameaddbox').val("");
	$('#lastnameaddbox').val("");
	$('#idaddbox').val("");
	$.ajax({
		url 		: '/users',
		type		: 'put',
		data		: JSON.stringify({
							name: nameval,
							lastname: lastnameval,
							id: idval
						  }),
		contentType : 'application/json',
		success 	: function(){
						alert("Data updated!");
					},
		error 		: function(){
						alert("Error updating data");
					}
	});
});
/////////////////////////////////////////////////////////// ajax for GET (getting the list of all people)
$("#showallbutton").on('click', function(){
	$.ajax({
		url 		: '/users',
		type		: 'get',
		success 	: function(data){
						let mydata = JSON.parse(data);
						const keys = Object.keys(mydata);
						$("#pId").empty();
						$("#pId").append('<p>List of people</p>');
						keys.forEach(function(item){
							let liname=$('<li> Name: '+mydata[item].name+'</li>');
							let lilname=$('<li> Last Name: '+mydata[item].lastname+'</li>');
							let liid=$('<li> ID: '+mydata[item].id+'</li>');
							let br = $('<br>');
							$("#pId").append(liname);
							$("#pId").append(lilname);
							$("#pId").append(liid);
							$("#pId").append(br);
						});
					},
		error 		: function(){
						alert("Error getting the list");
					}
	});
});

















