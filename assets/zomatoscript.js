const zomato = 'de43d27a3cd24ba7f3cf0f80ebc01963'

//https://developers.zomato.com/api/v2.1/locations?query=Auckland


$(function(){

	let center = [-36.85235938460808,174.76295471191406];

	let map = L.map('map').setView(center,17);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F2enMiLCJhIjoiY2o2bGdyZWFxMHJwNDMycGRlaHhodjBibyJ9.EVnDU1mjogJTMM0y1zYCOg').addTo(map);

	let locationUrl = 'https://developers.zomato.com/api/v2.1/search?lat=-36.85235938460808&lon=174.76295471191406'


		$.ajax({
		url:locationUrl,
		headers:{'user-key':zomato},
		dataType:'json',
		success:function(res){

		let eatries = res.restaurants;

		let eatrieIcon = L.icon({
								iconUrl: 'assets/marker.svg',
								iconSize:[30,30]
								});

		_(eatries).each(function(eatrie){

			let location = L.latLng(eatrie.restaurant.location.latitude,eatrie.restaurant.location.longitude);
			let marker = L.marker(location,{icon:eatrieIcon}).addTo(map);
			marker.eatrieid = eatrie.restaurant.id;

			marker.on('click',function(){

						let venueUrl = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+this.eatrieid;

						console.log(venueUrl);

							$.ajax({
								url:venueUrl,
								dataType:'json',
								headers:{'user-key':zomato},
								success:function(res){

										console.log(res);

									$('.modal-title').text(res.name);
									$('.modal-body').text(res.user_rating.aggregate_rating);
									$('<img src='+res.thumb+'>').appendTo('.modal-body');
									$('.modal-footer .btn').attr('href',res.menu_url);



									// let photos = res.response.venue.photos.groups[0].items;

									// $('.modal-title').text(res.response.venue.name);
									// $('.rating').text(res.response.venue.location.address);
									// $('.rating').text(res.response.venue.rating);

									// $('.modal-body').empty();	

									// _(photos).each(function(photo){
									// 	let photoPath = photo.prefix +'150x150'+photo.suffix;
									// 	$('<img src='+photoPath+'>').appendTo('.modal-body');

									// });

									$('#myModal').modal('show');
								}
							});
					})

		})

					









		}
	});






});
