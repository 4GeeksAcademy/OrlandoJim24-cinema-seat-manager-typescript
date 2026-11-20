/**
 * Initializes a cinema seating matrix with 8 rows and 10 seats per row.
 * All seats are initially available (represented by 0).
 * 0 = available seat, 1 = occupied seat
 * 
 * @returns A 2D array representing the cinema seating layout
 */
function initializeCinemaSeats(): number[][] {
  const rows = 8;
  const seatsPerRow = 10;
  const cinemaSeats: number[][] = [];

  for (let row = 0; row < rows; row++) {
    const seatRow: number[] = [];
    for (let seat = 0; seat < seatsPerRow; seat++) {
      seatRow.push(0); // 0 = available
    }
    cinemaSeats.push(seatRow);
  }

  return cinemaSeats;
}

// Verify the cinema seating matrix
const cinema = initializeCinemaSeats();
console.log("Cinema Seating Matrix (8 rows x 10 seats):");
console.log(cinema);

/**
 * Displays the cinema seating chart in a readable format.
 * L = available seat (0), X = occupied seat (1)
 * Includes row and column labels for easy navigation.
 * 
 * @param seatingArray - The 2D array representing cinema seats
 */
function displayCinemaSeats(seatingArray: number[][]): void {
  // Print header with column numbers
  console.log("\nCinema Seating Chart:");
  console.log("   0 1 2 3 4 5 6 7 8 9"); // Column headers

  // Loop through each row
  for (let row = 0; row < seatingArray.length; row++) {
    let seatLine = row + "  "; // Row number with spacing

    // Loop through each seat in the row
    for (let seat = 0; seat < seatingArray[row].length; seat++) {
      // Display 'L' for available (0) or 'X' for occupied (1)
      if (seatingArray[row][seat] === 0) {
        seatLine += "L ";
      } else {
        seatLine += "X ";
      }
    }

    console.log(seatLine);
  }
}

// Display the cinema seating chart
displayCinemaSeats(cinema);

/**
 * Reserves a seat in the cinema.
 * Validates row and column positions, checks seat availability,
 * and marks the seat as occupied (1) if available.
 * 
 * @param seatingArray - The 2D array representing cinema seats
 * @param row - Row number (0-7)
 * @param column - Column number (0-9)
 * @returns A message indicating the result of the reservation attempt
 */
function reserveSeat(seatingArray: number[][], row: number, column: number): string {
  // Check if row is valid
  if (row < 0 || row >= seatingArray.length) {
    return `Error: Invalid row number ${row}. Please select a row between 0 and ${seatingArray.length - 1}.`;
  }

  // Check if column is valid
  if (column < 0 || column >= seatingArray[row].length) {
    return `Error: Invalid column number ${column}. Please select a seat between 0 and ${seatingArray[row].length - 1}.`;
  }

  // Check if seat is available
  if (seatingArray[row][column] === 0) {
    // Seat is available, mark it as occupied
    seatingArray[row][column] = 1;
    return `Success: Seat at row ${row}, column ${column} has been reserved!`;
  } else {
    // Seat is already occupied
    return `Failure: Seat at row ${row}, column ${column} is already occupied.`;
  }
}

// Test the reserveSeat function
console.log("\n--- Testing Seat Reservation ---");
const message1 = reserveSeat(cinema, 3, 4);
console.log(message1);

const message2 = reserveSeat(cinema, 3, 4);
console.log(message2);

// Display the updated seating chart
console.log("\nUpdated Cinema Seating Chart:");
displayCinemaSeats(cinema);

/**
 * Counts available and occupied seats in the cinema.
 * Uses nested loops to iterate through all seats in the matrix
 * and returns the counts as a tuple [available, occupied].
 * 
 * @param seatingArray - The 2D array representing cinema seats
 * @returns A tuple with [availableSeats, occupiedSeats]
 */
function countSeats(seatingArray: number[][]): [number, number] {
  let availableSeats = 0;
  let occupiedSeats = 0;

  // Loop through each row
  for (let row = 0; row < seatingArray.length; row++) {
    // Loop through each seat in the row
    for (let seat = 0; seat < seatingArray[row].length; seat++) {
      // Count available (0) and occupied (1) seats
      if (seatingArray[row][seat] === 0) {
        availableSeats++;
      } else {
        occupiedSeats++;
      }
    }
  }

  return [availableSeats, occupiedSeats];
}

// Count and display seat statistics
const [availableCount, occupiedCount] = countSeats(cinema);
const totalSeats = availableCount + occupiedCount;

console.log("\n--- Seat Statistics ---");
console.log(`Available seats: ${availableCount}`);
console.log(`Occupied seats: ${occupiedCount}`);
console.log(`Total seats: ${totalSeats}`);

/**
 * Finds the first pair of horizontally adjacent available seats.
 * Searches from top to bottom and left to right within each row.
 * Adjacent seats must both be available (0) and in the same row.
 * 
 * @param seatingArray - The 2D array representing cinema seats
 * @returns A tuple [row, firstColumn, secondColumn] or null if no pair exists
 */
function findAdjacentSeats(seatingArray: number[][]): [number, number, number] | null {
  // Loop through each row
  for (let row = 0; row < seatingArray.length; row++) {
    // Loop through each seat, checking current and next seat for adjacency
    // Loop only up to seatsPerRow - 1 to avoid going out of bounds
    for (let column = 0; column < seatingArray[row].length - 1; column++) {
      // Check if both current and next seats are available (0)
      if (seatingArray[row][column] === 0 && seatingArray[row][column + 1] === 0) {
        // Found adjacent available seats
        return [row, column, column + 1];
      }
    }
  }

  // No adjacent available seats found
  return null;
}

// Test the findAdjacentSeats function
console.log("\n--- Finding Adjacent Available Seats ---");
const adjacentPair = findAdjacentSeats(cinema);

if (adjacentPair !== null) {
  const [row, col1, col2] = adjacentPair;
  console.log(`Found adjacent seats at row ${row}, columns ${col1} and ${col2}.`);
} else {
  console.log("No adjacent available seats found in the cinema.");
}

// ============================================================================
// COMPREHENSIVE TESTING SECTION
// ============================================================================

console.log("\n\n========================================");
console.log("CINEMA SEAT MANAGER - COMPREHENSIVE TESTS");
console.log("========================================\n");

// TEST 1: Empty Cinema
console.log("TEST 1: Empty Cinema (All seats available)");
console.log("----------------------------------------");
const emptyCinema = initializeCinemaSeats();
const [emptyAvailable, emptyOccupied] = countSeats(emptyCinema);
const emptyAdjacent = findAdjacentSeats(emptyCinema);

console.log(`Expected: 80 available, 0 occupied, adjacent seats at row 0, columns 0 and 1`);
console.log(`Actual: ${emptyAvailable} available, ${emptyOccupied} occupied, adjacent seats at row ${emptyAdjacent ? emptyAdjacent[0] : "N/A"}, columns ${emptyAdjacent ? emptyAdjacent[1] + " and " + emptyAdjacent[2] : "N/A"}`);

const test1Pass = emptyAvailable === 80 && emptyOccupied === 0 && emptyAdjacent !== null && emptyAdjacent[0] === 0 && emptyAdjacent[1] === 0 && emptyAdjacent[2] === 1;
console.log(`Result: ${test1Pass ? "PASS ✓" : "FAIL ✗"}\n`);

// TEST 2: Partially Occupied Cinema (using the existing cinema from above)
console.log("TEST 2: Partially Occupied Cinema (79 available, 1 occupied)");
console.log("----------------------------------------");
const [partialAvailable, partialOccupied] = countSeats(cinema);
const partialAdjacent = findAdjacentSeats(cinema);

console.log(`Expected: 79 available, 1 occupied, adjacent seats can be found`);
console.log(`Actual: ${partialAvailable} available, ${partialOccupied} occupied, adjacent seats ${partialAdjacent !== null ? "found at row " + partialAdjacent[0] + ", columns " + partialAdjacent[1] + " and " + partialAdjacent[2] : "not found"}`);

const test2Pass = partialAvailable === 79 && partialOccupied === 1 && partialAdjacent !== null;
console.log(`Result: ${test2Pass ? "PASS ✓" : "FAIL ✗"}\n`);

// TEST 3: Nearly Full Cinema (only scattered single available seats, no adjacent pairs)
console.log("TEST 3: Nearly Full Cinema (only single available seats)");
console.log("----------------------------------------");
const nearlyFullCinema: number[][] = [];
// Create a cinema with only scattered single available seats
for (let row = 0; row < 8; row++) {
  const rowSeats: number[] = [];
  for (let col = 0; col < 10; col++) {
    // Place occupied seats, but leave single available seats scattered (no adjacent pairs)
    if ((row + col) % 3 === 0) {
      rowSeats.push(0); // Single available seat
    } else {
      rowSeats.push(1); // Occupied
    }
  }
  nearlyFullCinema.push(rowSeats);
}

const [nearlyFullAvailable, nearlyFullOccupied] = countSeats(nearlyFullCinema);
const nearlyFullAdjacent = findAdjacentSeats(nearlyFullCinema);

console.log(`Expected: Some available seats (non-zero), no adjacent pairs (null)`);
console.log(`Actual: ${nearlyFullAvailable} available, ${nearlyFullOccupied} occupied, adjacent seats ${nearlyFullAdjacent !== null ? "found (unexpected)" : "not found (correct)"}`);

const test3Pass = nearlyFullAdjacent === null;
console.log(`Result: ${test3Pass ? "PASS ✓" : "FAIL ✗"}\n`);

// TEST 4: Completely Full Cinema
console.log("TEST 4: Completely Full Cinema (all seats occupied)");
console.log("----------------------------------------");
const fullCinema: number[][] = [];
// Create a cinema where all seats are occupied
for (let row = 0; row < 8; row++) {
  const rowSeats: number[] = [];
  for (let col = 0; col < 10; col++) {
    rowSeats.push(1); // All occupied
  }
  fullCinema.push(rowSeats);
}

const [fullAvailable, fullOccupied] = countSeats(fullCinema);
const fullAdjacent = findAdjacentSeats(fullCinema);
const fullReservationResult = reserveSeat(fullCinema, 0, 0);

console.log(`Expected: 0 available, 80 occupied, no adjacent seats (null), reservation fails`);
console.log(`Actual: ${fullAvailable} available, ${fullOccupied} occupied, adjacent seats ${fullAdjacent !== null ? "found (unexpected)" : "not found (correct)"}`);
console.log(`Reservation attempt: "${fullReservationResult}"`);

const test4Pass = fullAvailable === 0 && fullOccupied === 80 && fullAdjacent === null && fullReservationResult.includes("already occupied");
console.log(`Result: ${test4Pass ? "PASS ✓" : "FAIL ✗"}\n`);

// SUMMARY
console.log("========================================");
console.log("TEST SUMMARY");
console.log("========================================");
const passCount = [test1Pass, test2Pass, test3Pass, test4Pass].filter(result => result).length;
console.log(`Tests Passed: ${passCount}/4`);
console.log(test1Pass ? "✓ Test 1 (Empty Cinema): PASS" : "✗ Test 1 (Empty Cinema): FAIL");
console.log(test2Pass ? "✓ Test 2 (Partially Occupied): PASS" : "✗ Test 2 (Partially Occupied): FAIL");
console.log(test3Pass ? "✓ Test 3 (Nearly Full Cinema): PASS" : "✗ Test 3 (Nearly Full Cinema): FAIL");
console.log(test4Pass ? "✓ Test 4 (Completely Full): PASS" : "✗ Test 4 (Completely Full): FAIL");
console.log("========================================\n");
