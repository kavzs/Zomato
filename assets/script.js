const version = '?v=20170906'
const clientid = '&client_id=UJLNHBWLZUZ3CFXCCGYFUN2IDQ4OKBD1CPB5VCD5HLNNS1AW'
const clientSecret = '&client_secret=KPPWVBHVIS10PZ1N2BRUIS1DPIOR3KOBE4PVENDTZZ0SCV3M'
const key = version + clientid + clientSecret;

$(function(){

	let center = [-36.85235938460808,174.76295471191406];

	let map = L.map('map').setView(center,17);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F2enMiLCJhIjoiY2o2bGdyZWFxMHJwNDMycGRlaHhodjBibyJ9.EVnDU1mjogJTMM0y1zYCOg').addTo(map);


	let exploreUrl = 'https://api.foursquare.com/v2/venues/explore'+key+'&query=bar&limit=50&ll=-36.7893192324409,174.771409034729';

	$.ajax({
		url:exploreUrl,
		dataType:'jsonp',
		success:function(res){

			console.log(res);


			let data = res.response.groups[0].items;

			let venues = _(data).map(function(item){

				return {
						latlng:[item.venue.location.lat,item.venue.location.lng],
						description: item.venue.name,
						iconImage: 'assets/marker.svg',
						venueid: item.venue.id
					};
				
			});



			_(venues).each(function(venue){

					let venueIcon = L.icon({
												iconUrl: venue.iconImage,
												iconSize:[30,30]
											});
					let marker = L.marker(venue.latlng,{icon:venueIcon}).addTo(map);

					marker.venueid = venue.venueid;




					marker.on('click',function(){

						let venueUrl = 'https://api.foursquare.com/v2/venues/'+this.venueid+key;

						console.log(venueUrl);

							$.ajax({
								url:venueUrl,
								dataType:'jsonp',
								success:function(res){
									let photos = res.response.venue.photos.groups[0].items;

									$('.modal-title').text(res.response.venue.name);
									$('.rating').text(res.response.venue.location.address);
									$('.rating').text(res.response.venue.rating);

									$('.modal-body').empty();	

									_(photos).each(function(photo){
										let photoPath = photo.prefix +'150x150'+photo.suffix;
										$('<img src='+photoPath+'>').appendTo('.modal-body');

									});

									$('#myModal').modal('show');
								}
							});
					})
			});
		}
	});
});