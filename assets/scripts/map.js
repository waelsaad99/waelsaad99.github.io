function dropdownFunction() {
  document.getElementById("unitsDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];

      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function initMap() {
  var locations = [
    [
      (unit = "616517"),
      (lat = 45.5471),
      (long = -122.9139),
      (propertyId = 4),
      (property = "Intel-RB1"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "610512"),
      (lat = 42.9961),
      (long = -89.5689),
      (propertyId = 3),
      (property = "Voyager Hall"),
      (alert = true),
      (status = "Disconnected"),
      (type = "otis one")
    ],
    [
      (unit = "616540"),
      (lat = 33.723),
      (long = -117.8024),
      (propertyId = 2),
      (property = "Kaiser Permanente Tustin Ranch Medical Offices"),
      (alert = false),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "636863"),
      (lat = 26.88179),
      (long = -80.125),
      (propertyId = 1),
      (property = "UTC Center for Intelligent Buildings"),
      (alert = false),
      (status = "Disconnected"),
      (type = "otis one")
    ],
    [
      (unit = "636864"),
      (lat = 26.88177),
      (long = -80.12502),
      (propertyId = 1),
      (property = "UTC Center for Intelligent Buildings"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis one")
    ],
    [
      (unit = "636874"),
      (lat = 22.88177),
      (long = -80.12502),
      (propertyId = 6),
      (property = "Building 1"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis")
    ],
    [
      (unit = "636870"),
      (lat = 20.88177),
      (long = -80.12502),
      (propertyId = 5),
      (property = "Building 2"),
      (alert = true),
      (status = "Shutdown"),
      (type = "otis")
    ]
  ];
  var styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e"
        }
      ]
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878"
        }
      ]
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680"
        }
      ]
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#172f50"
        }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70"
        }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    disableDefaultUI: true,
    styles: styles
  });
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();
  var alertwindow = new google.maps.InfoWindow();
  var marker,
    alertMarker,
    i,
    j,
    alertCount = 0,
    otisOneCount = 0,
    otisOneIcon = "";
  //number of units in dropdown
  var totalNumberOfUnits = (function() {
    var dropbtn = document.getElementById("dropbtn");
    var selected = "Select from all units (" + locations.length + ")";
    dropbtn.innerHTML += selected;
  })();

  for (i = 0; i < locations.length; i++) {
    var num = locations[i][3];
    var name = locations[i][4];
    var filterLoc = locations
      .filter(function(loc) {
        return loc[3] === num;
      })
      .map(function(locat) {
        return locat;
      });

    //number of alerts in map footer
    var totalNumberOfAlerts = (function() {
      if (locations[i][5] && locations[i][7] == "otis one") {
        alertCount++;
        document.getElementById("otis-map__alert").innerHTML =
          "<i class='icon-alert'></i>Alerts (" + alertCount + ")";
      }
    })();

    //map footer alerts tooltip
    var footerAlertsToolTip = (function() {
      var alertLoc =
        locations[i][5] && locations[i][7] == "otis one"
          ? locations
              .filter(function(loc) {
                return loc[3] === locations[i][3];
              })
              .map(function(locat) {
                return locat;
              })
              .filter(function(loc) {
                return loc[5] == true;
              })
              .map(function(loc) {
                return loc[0];
              })
          : "";
      var alertUnits =
        locations[i][5] && locations[i][7] == "otis one"
          ? "<div class='alertwindow'><span class='alertwindow__header'><span>" +
            locations[i][4] +
            "</span></span><ul class='alertwindow__list'>" +
            alertLoc.map(function(loc) {
              return (
                "<li><img src='assets/images/alert.svg'/><a href='unitsUrl/" +
                loc +
                "'>Unit : " +
                loc +
                "<span class='alertwindow__status'>" +
                locations[i][6] +
                "</span></a></li>"
              );
            }) +
            "</ul></div>"
          : "";
      document.getElementById(
        "otis-map__alert-tooltip"
      ).innerHTML += alertUnits;
    })();

    //number  of otis one units in map footer
    var numberOfOtisOneUnits = (function() {
      if (locations[i][7] == "otis one") {
        otisOneCount++;
        document.getElementById("otis-map__unit").innerHTML =
          "<i class='icon-location'></i>Displaying " +
          otisOneCount +
          " Otis One units";
      }
    })();
    //dropdown options
    var dropdownOptions = (function() {
      var dropdown = document.getElementById("unitsDropdown");
      if (locations[i][7] == "otis one") {
        otisOneIcon = "<i class='icon-smart-energy'></i>";
      } else otisOneIcon = "<img style='width:28px'></img>";

      $("#unitsDropdown, #otis-map__alert-tooltip").niceScroll({
        cursorcolor: "#021227",
        cursorborder: "1px solid #586981",
        cursorwidth: "6px"
      });
      var option =
        "<ul><span id='" +
        num +
        "'>" +
        name +
        "</span>" +
        filterLoc
          .map(function(loc) {
            return (
              "<li><a href='unitsUrl/" +
              loc[0] +
              "'>" +
              otisOneIcon +
              "  " +
              loc[0] +
              "</a></li>"
            );
          })
          .join("") +
        "";
      if (!document.getElementById(num)) dropdown.innerHTML += option;
    })();

    //adding markers on map
    var addMarkersOnMap = (function() {
      var markerImage = {
        url: "assets/images/marker.svg",
        size: new google.maps.Size(46, 46),
        scaledSize: new google.maps.Size(50, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(25, 12)
      };
      marker =
        locations[i][7] == "otis one"
          ? new google.maps.Marker({
              position: new google.maps.LatLng(
                locations[i][1],
                locations[i][2]
              ),
              map: map,
              label: {
                text: "" + filterLoc.length,
                color: "black"
              },
              icon: markerImage,
              zIndex: 1
            })
          : "";
      if (locations[i][7] == "otis one") {
        loc = new google.maps.LatLng(
          marker.position.lat(),
          marker.position.lng()
        );
        bounds.extend(loc);
      }
    })();
    //adding alerts markers on map
    var addingAlertMarkersOnMap = (function() {
      var alertImage = {
        url: "assets/images/alert.svg",
        size: new google.maps.Size(46, 46),
        scaledSize: new google.maps.Size(50, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 0),
        labelOrigin: new google.maps.Point(25, 16)
      };
      alertMarker =
        locations[i][5] && locations[i][7] == "otis one"
          ? new google.maps.Marker({
              position: new google.maps.LatLng(
                locations[i][1],
                locations[i][2]
              ),
              map: map,
              label: {
                text:
                  "" +
                  filterLoc
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc;
                    }).length,
                color: "black"
              },
              icon: alertImage,
              zIndex: 1
            })
          : "";
    })();

    //normal markers events
    var markersEvents = (function() {
      markerHover =
        locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              marker,
              "mouseover",
              (function(marker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat[0];
                    });
                  var units =
                    "<div class='infowindow'><span class='infowindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='infowindow__list'>" +
                    filtLoc
                      .map(function(loc) {
                        return (
                          "<li><a href='unitsUrl/" +
                          loc +
                          "'>Unit : " +
                          loc +
                          "</a></li>"
                        );
                      })
                      .join(" ") +
                    "</ul></div>";
                  alertwindow.close();
                  infowindow.setContent(units);
                  infowindow.innerHTML += units;
                  infowindow.open(map, marker);
                };
              })(marker, i)
            )
          : "";

      var windX = window.matchMedia("(max-width: 1024px)");
      if (windX.matches) {
        markerClickMobile =
          locations[i][7] == "otis one"
            ? google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                  return function() {
                    var filtLoc = locations
                      .filter(function(loc) {
                        return loc[3] === locations[i][3];
                      })
                      .map(function(locat) {
                        return locat[0];
                      });
                    var units =
                      "<div class='infowindow'><span class='infowindow__header'><span>" +
                      locations[i][4] +
                      "</span></span><ul class='infowindow__list'>" +
                      filtLoc
                        .map(function(loc) {
                          return (
                            "<li><a href='unitsUrl/" +
                            loc +
                            "'>Unit : " +
                            loc +
                            "</a></li>"
                          );
                        })
                        .join(" ") +
                      "</ul></div>";
                    alertwindow.close();
                    infowindow.setContent(units);
                    infowindow.innerHTML += units;
                    infowindow.open(map, marker);
                  };
                })(marker, i)
              )
            : "";
      } else {
        markerClick =
          locations[i][7] == "otis one"
            ? google.maps.event.addListener(
                marker,
                "click",
                (function(marker, i) {
                  return function() {
                    var filtLoc = locations
                      .filter(function(loc) {
                        return loc[3] === locations[i][3];
                      })
                      .map(function(locat) {
                        return locat[0];
                      });
                    window.location = "/unitUrl/" + locations[i][0];
                  };
                })(marker, i)
              )
            : "";
      }
    })();

    //alert markers events
    var alertMarkerEvents = (function() {
      alertHover =
        locations[i][5] && locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              alertMarker,
              "mouseover",
              (function(alertMarker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat;
                    })
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc[0];
                    });
                  var unit =
                    "<div class='alertwindow'><span class='alertwindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='alertwindow__list'>" +
                    filtLoc.map(function(loc) {
                      return (
                        "<li><img src='assets/images/alert.svg'/><a href='unitsUrl/" +
                        loc +
                        "'>Unit : " +
                        loc +
                        "<span class='alertwindow__status'>" +
                        locations[i][6] +
                        "</span></a></li>"
                      );
                    }) +
                    "</ul></div>";
                  infowindow.close();
                  alertwindow.setContent(unit);
                  alertwindow.innerHTML += unit;
                  alertwindow.open(map, alertMarker);
                };
              })(alertMarker, i)
            )
          : "";
      alertClick =
        locations[i][5] && locations[i][7] == "otis one"
          ? google.maps.event.addListener(
              alertMarker,
              "click",
              (function(alertMarker, i) {
                return function() {
                  var filtLoc = locations
                    .filter(function(loc) {
                      return loc[3] === locations[i][3];
                    })
                    .map(function(locat) {
                      return locat;
                    })
                    .filter(function(loc) {
                      return loc[5] == true;
                    })
                    .map(function(loc) {
                      return loc[0];
                    });
                  var unit =
                    "<div class='alertwindow'><span class='alertwindow__header'><span>" +
                    locations[i][4] +
                    "</span></span><ul class='alertwindow__list'>" +
                    filtLoc.map(function(loc) {
                      return (
                        "<li><img src='assets/images/alert.svg'/><a href=unitsUrl/" +
                        loc +
                        "'>Unit : " +
                        loc +
                        "<span class='alertwindow__status'>" +
                        locations[i][6] +
                        "</span></a></li>"
                      );
                    }) +
                    "</ul></div>";
                  infowindow.close();
                  alertwindow.setContent(unit);
                  alertwindow.innerHTML += unit;
                  alertwindow.open(map, alertMarker);
                };
              })(alertMarker, i)
            )
          : "";
    })();
  }
  map.fitBounds(bounds);
  map.panToBounds(bounds);
}
