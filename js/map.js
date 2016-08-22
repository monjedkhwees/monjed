var map;
var marker;
var infowindow;
var locations = [{
    name: 'bairut',
    lat: 33.893197,  
    lng: 35.501933,
    wikiPageid: 4608353
  },
  {
    name: "Alrawshe",
    lat: 33.887212,
    lng: 35.473351,
    wikiPageid: 4608353
  },
  {
    name: 'sanae',
    lat: 33.893421,  
    lng: 35.490153 ,
    wikiPageid: 4608353
  },
  {
    name: 'amircan unevercity',
    lat: 33.889787, 
    lng: 35.474789,
    wikiPageid: 4608353
  },
  {
    name: 'International College',
    lat: 33.893421,  
    lng: 35.490153,
    wikiPageid: 4608353
  },
  {
    name: "barbar",
    lat: 33.892744,
    lng: 35.471570,
    wikiPageid: 4608353
  }
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.893197,
      lng: 35.501933
    },
    zoom: 13
  });
  infowindow = new google.maps.InfoWindow({
    content: "<p>My Info Window Content</p>"
  });
  
  var viewModel = function() {
    var self = this;
    self.locations = ko.observableArray(locations);
    
   self.locations().forEach(function(location) {
      // create marker object for each location
      var marker = new google.maps.Marker({
        position: {
          lat: location.lat,
          lng: location.lng
        },
        map: map
      });
      // store reference to marker in marker property of location item
      location.marker = marker;
      // attach click event listener to marker
      marker.addListener('click', function() {
        //console.log("click");
        getWikiData(location);
      });
    });


}


//v
//ar wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&redirects=return&pageids=" + locations[0].wikiPageid + "|" + locations[1].wikiPageid + "|" + locations[2].wikiPageid + "|" + locations[3].wikiPageid + "|" + locations[4].wikiPageid + "|" + locations[5].wikiPageid + "&excontinue="
/*function drop() {
  for (var i =0; i < markerArray.length; i++) {
    setTimeout(function() {
      addMarkerMethod();
    }, i * 200);
  }
}*/

    self.value = ko.observable('');
  self.search = ko.computed(function() {
      return ko.utils.arrayFilter(self.locations(), function(place) {
        console.log(place);
        var match = place.name.toLowerCase().indexOf(self.value().toLowerCase()) >= 0;
        place.marker.setVisible(match);
        return match;
      });
    });
    
  


  ko.applyBindings(new viewModel());
}
function getWikiData(location) {
  var marker = location.marker;
  var name = location.name;
   var query = location.name,
        dt = 'jsonp',
        wikiBase = 'http://en.wikipedia.org/w/api.php',
        wikiUrl = wikiBase + '?action=opensearch&search=' + query + '&format=json&callback=wikiCallback';

    var x = $.ajax({
            url: wikiUrl,
            dataType: dt,
            success: function(response){
                       var wikiArticleUrl = response[3][0];
                       console.log(wikiArticleUrl);
                      infowindow.setContent('<p>' + name + '</p>' +
                        '<a href="' + wikiArticleUrl + '" target="_blank">go to Wikipedia Article<a/>');
                      infowindow.open(map, marker);
                      toggleBounce(marker);

                     }
            });

}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

  
function googleError(){
  window.alert(" please try again");
}


