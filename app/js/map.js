function initMap() {
  
  const iconBase = location.host === "arstanbek353.github.io" ?
  "https://arstanbek353.github.io/icapia/dist/images/dist/" : 
  location.origin + '/images/dist/';

  const mapNode = document.getElementById("map")
  if (mapNode) {
    const locationNodes = document.querySelectorAll('.map__item')
    const map = new google.maps.Map(mapNode, {
      zoom: 10,
      center: window.locationGroups[0].center,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    window.locationGroups.forEach(g => {
      const markers = g.locations.map((position, i) => {
        const label = position.label;
        const marker = new google.maps.Marker({
          position: position.position,
          icon: iconBase + 'marker.svg'
        });
    
        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
        });
        return marker;
      });
      // Add a marker clusterer to manage the markers.
      new markerClusterer.MarkerClusterer({ markers, map });
    })

    locationNodes.forEach(node => {
      node.addEventListener('click', (e) => {
        const position = {
          lat: +node.dataset.lat, 
          lng: +node.dataset.lng
        }
        console.log(position)
        map.panTo(position)
      })
    })
  }

  // contact map

  const contactNode = document.getElementById("map-contact")
  const uluru = {lat: 40.676190, lng: -74.008581}
  if (contactNode) {
    const mapContact = new google.maps.Map(contactNode, {
      zoom: 10,
      center: uluru,
    });

    const infowindow = new google.maps.InfoWindow({
      content: '23133 Hawthorne Boulevard,ofc 204<br>  Torrance, CA 90505',
      ariaLabel: "Uluru",
    });

    const markerContact = new google.maps.Marker({
      position: uluru,
      map: mapContact,
      title: "ICAPIA",
      icon: iconBase + 'marker.svg'
    });

    markerContact.addListener("click", () => {
      infowindow.open({
        anchor: markerContact,
        mapContact,
      });
    });
  }

}

window.initMap = initMap;