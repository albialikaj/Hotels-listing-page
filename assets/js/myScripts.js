var app = angular.module('hotel-website', []);
app.controller("HotelController", function ($scope, $http) {

    var url = "../assets/json/data.json";

    $http.get(url)
        .then(function (response) {
            $scope.Hotels = response.data[1].entries;
            $scope.Rooms = response.data[0].roomtypes;

            var cities = [];
            var prices = [];
            var pinakasFilters = [];
            for (var i in $scope.Hotels) {
                prices.push($scope.Hotels[i].price);
                cities.push($scope.Hotels[i].city);
                for (var b in $scope.Hotels[i].filters) {
                    pinakasFilters.push($scope.Hotels[i].filters[b]);
                }
            }

            $scope.max = Math.max(...prices);
            $scope.rangemax = $scope.max;
            $scope.sortColumn = "hotelName";
            $scope.cities = removeDublicates(cities);

            //O πίνακας pinakasFilters, μου φέρνει objects {name:"", $$key:""} οπότε για να αφαιρέσω τις διπλότυπες εγγραφές όσον αφορά το name
            //φτιάχνω εναν νέο πίνακα, με περιεχόμενο μόνο το 'name' του πίνακα pinakasFilters
            var filtra = [];
            for (var a in pinakasFilters) {
                filtra.push(pinakasFilters[a].name);
            }
            // ο πίνακας filtra έχει ακόμα dublicates οπότε τα αφαιρώ και γνωστοποιώ και το scope ποια θα είναι
            $scope.filtra = removeDublicates(filtra);


        });


    $scope.filterPrice = function (obj) {
        return obj.price > 0 && obj.price <= $scope.max;
    };
});


function removeDublicates(data) {
    return [...new Set(data)]
}


// ===== Να το μετατρέψω σε ΜΙΑ function! ====
var checkInDate = document.getElementById('checkInDate');
checkInDate.setAttribute("type", "text");
checkInDate.addEventListener("click", () => {
    checkInDate.setAttribute("type", "date");
});
checkInDate.addEventListener("blur", () => {
    checkInDate.setAttribute("type", "date");
});

var checkOutDate = document.getElementById('checkOutDate');
checkOutDate.setAttribute("type", "text");
checkOutDate.addEventListener("click", () => {
    checkOutDate.setAttribute("type", "date");
});
checkOutDate.addEventListener("blur", () => {
    checkOutDate.setAttribute("type", "date");
});