function updateSeatDisplay() {
  const seatElement = document.getElementById("seat");
  seatElement.innerHTML = ""; // Clear existing content

  const seatType = document.getElementById("seat_type");
  seatType.innerHTML = "";

  const seatPrice = document.getElementById("seat_price");
  seatPrice.innerHTML = "";

  const totalSeatPrice = document.getElementById("total_price");
  totalSeatPrice.innerHTML = "";

  const grandTotalSeat = document.getElementById("grand_total");

  // Static values for seat type and price
  const typeName = "Economy";
  const price = 500;

  // Calculate the total price for the seats
  const totalPrice = price * seatCount;
  // Calculate grand total with discounts
  let grandTotal = totalPrice;

  // Apply discounts if more than 4 seats are selected
  if (seatCount > 3 && activeCoupons.length > 0) {
    activeCoupons.forEach((discount) => {
      grandTotal -= grandTotal * (discount / 100); // Apply discount
    });
  }

  // Update the DOM with the seat details
  selectedSeats.forEach((seatId) => {
    const seatButton = document.getElementById(seatId);
    const seatText = seatButton.textContent; // Get textContent of the button

    // Add seat details to #seat
    const seatDiv = document.createElement("div");
    seatDiv.textContent = seatText;
    seatElement.appendChild(seatDiv);

    // Add seat type to #seat_type
    const seatTypeDiv = document.createElement("div");
    seatTypeDiv.textContent = typeName;
    seatType.appendChild(seatTypeDiv);

    // Add seat price to #seat_price
    const seatPriceDiv = document.createElement("div");
    seatPriceDiv.textContent = price;
    seatPrice.appendChild(seatPriceDiv);
  });

  // Update total and grand total in the DOM
  totalSeatPrice.textContent = `Total: ${totalPrice}`;
  grandTotalSeat.textContent = `Grand Total: ${grandTotal.toFixed(2)}`;
}

// Function to apply a coupon
function applyCoupon() {
  const couponInput = document.getElementById("coupon");
  const couponCode = couponInput.value.trim();

  if (seatCount < 4) {
    alert("You need to book more than 4 seats to apply a coupon.");
    return;
  }

  // Check if coupon is valid
  const validCoupons = {
    DISCOUNT10: 10,
    SAVE20: 20,
    OFFER15: 15,
    NEW15: 15,
    Couple20: 20,
  };

  if (validCoupons[couponCode]) {
    if (!appliedCoupons.includes(couponCode)) {
      // Add discount if the coupon hasn't been applied
      appliedCoupons.push(couponCode);
      activeCoupons.push(validCoupons[couponCode]); // Add the discount percentage
      updateSeatDisplay(); // Update display after applying the coupon
      alert(`Coupon ${couponCode} applied successfully!`);
    } else {
      alert("This coupon has already been applied.");
    }
  } else {
    alert("Invalid coupon code.");
  }

  // Clear the coupon input field
  couponInput.value = "";
}

// Get seat info and initialize
function getSeatsInfo() {
  const buttons = document.getElementsByClassName("seats");
  return Array.from(buttons);
}

let seatCount = 0;
let selectedSeats = []; // Track the selected seats
let appliedCoupons = []; // Track applied coupon codes
let activeCoupons = []; // Track active discount percentages

const buttonsInfo = getSeatsInfo();
buttonsInfo.forEach((button) => {
  button.addEventListener("dblclick", () => {
    if (button.classList.contains("selected")) {
      // Deselect seat
      button.classList.remove(
        "selected",
        "bg-green-500",
        "border",
        "text-white",
        "bg-lime-600",
        "hover:bg-lime-700"
      );
      button.classList.add("bg-stone-50", "hover:bg-stone-100");
      seatCount--;
      selectedSeats = selectedSeats.filter((id) => id !== button.id); // Remove seat ID from selectedSeats array
    } else if (seatCount < 4) {
      // Select seat
      button.classList.remove("bg-stone-50", "hover:bg-stone-100");
      button.classList.add(
        "selected",
        "bg-green-500",
        "border",
        "text-white",
        "bg-lime-600",
        "hover:bg-lime-700"
      );
      seatCount++;
      selectedSeats.push(button.id); // Add seat ID to selectedSeats array
    } else {
      alert("You can only select 4 seats");
    }

    // Reset coupons if seats are less than or equal to 4
    if (seatCount <= 4) {
      appliedCoupons = [];
      activeCoupons = [];
    }

    updateSeatDisplay();
  });
});

// Attach event listener to the Apply button
const applyButton = document.querySelector("button[aria-label='Apply coupon']");
applyButton.addEventListener("click", applyCoupon);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Capture form data
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  // Validate required fields
  if (!name || !phone || !email) {
    alert("Name and Phone Number are required!");
    return;
  }

  // Redirect to confirm.html
  window.location.href = "confirm.html";
});
