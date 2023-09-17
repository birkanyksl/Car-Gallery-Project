const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");


//  Start UI Object 

const ui = new UI();


const storage = new Storage();



// Loading All Events

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addCar);
    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });
    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars);
}

function addCar(e) {
    e.preventDefault();


    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === "" || price === "" || url === "") {
        ui.displayMessage("Tüm alanları doldurun...", "danger");
    }
    else {
        // New Car
        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar); // Adding Vehicles to interface
        storage.addCarToStorage(newCar);
    }

    ui.displayMessage("Araç başarıyla eklendi...", "success");
    ui.clearInputs(titleElement, urlElement, priceElement);


}

function deleteCar(e) {
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme işemi başarıyla gerçekleşti", "success");
    }

}

function clearAllCars() {


    if (confirm("Tüm araçlar silinecek. Emin misiniz?")){

        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
}