/**
 * Cinema Seat Manager - Main Entry Point
 * Runs console tests in Node.js environment
 * Loads web UI in browser environment
 */

// Only run console tests in Node.js environment (not in browser)
if (typeof document === "undefined") {
  // ========== CONSOLE MODE ==========
  // This runs when executed via: npm run console

  import("./cinema-logic.js").then((module) => {
    const { initializeCinemaSeats, reserveSeat, countSeats, findAdjacentSeats } =
      module;

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

    // Verify the cinema seating matrix
    const cinema = initializeCinemaSeats();
    console.log("Cinema Seating Matrix (8 rows x 10 seats):");
    console.log(cinema);

    // Display the cinema seating chart
    displayCinemaSeats(cinema);

    // Test the reserveSeat function
    console.log("\n--- Testing Seat Reservation ---");
    const message1 = reserveSeat(cinema, 3, 4);
    console.log(message1);

    const message2 = reserveSeat(cinema, 3, 4);
    console.log(message2);

    // Display the updated seating chart
    console.log("\nUpdated Cinema Seating Chart:");
    displayCinemaSeats(cinema);

    // Count and display seat statistics
    const [availableCount, occupiedCount] = countSeats(cinema);
    const totalSeats = availableCount + occupiedCount;

    console.log("\n--- Seat Statistics ---");
    console.log(`Available seats: ${availableCount}`);
    console.log(`Occupied seats: ${occupiedCount}`);
    console.log(`Total seats: ${totalSeats}`);

    // Test the findAdjacentSeats function
    console.log("\n--- Finding Adjacent Available Seats ---");
    const adjacentPair = findAdjacentSeats(cinema);

    if (adjacentPair !== null) {
      const [row, col1, col2] = adjacentPair;
      console.log(
        `Found adjacent seats at row ${row}, columns ${col1} and ${col2}.`
      );
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

    console.log(
      `Expected: 80 available, 0 occupied, adjacent seats at row 0, columns 0 and 1`
    );
    console.log(
      `Actual: ${emptyAvailable} available, ${emptyOccupied} occupied, adjacent seats at row ${
        emptyAdjacent ? emptyAdjacent[0] : "N/A"
      }, columns ${
        emptyAdjacent ? emptyAdjacent[1] + " and " + emptyAdjacent[2] : "N/A"
      }`
    );

    const test1Pass =
      emptyAvailable === 80 &&
      emptyOccupied === 0 &&
      emptyAdjacent !== null &&
      emptyAdjacent[0] === 0 &&
      emptyAdjacent[1] === 0 &&
      emptyAdjacent[2] === 1;
    console.log(`Result: ${test1Pass ? "PASS ✓" : "FAIL ✗"}\n`);

    // TEST 2: Partially Occupied Cinema (using the existing cinema from above)
    console.log("TEST 2: Partially Occupied Cinema (79 available, 1 occupied)");
    console.log("----------------------------------------");
    const [partialAvailable, partialOccupied] = countSeats(cinema);
    const partialAdjacent = findAdjacentSeats(cinema);

    console.log(
      `Expected: 79 available, 1 occupied, adjacent seats can be found`
    );
    console.log(
      `Actual: ${partialAvailable} available, ${partialOccupied} occupied, adjacent seats ${
        partialAdjacent !== null
          ? "found at row " +
            partialAdjacent[0] +
            ", columns " +
            partialAdjacent[1] +
            " and " +
            partialAdjacent[2]
          : "not found"
      }`
    );

    const test2Pass =
      partialAvailable === 79 &&
      partialOccupied === 1 &&
      partialAdjacent !== null;
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

    const [nearlyFullAvailable, nearlyFullOccupied] =
      countSeats(nearlyFullCinema);
    const nearlyFullAdjacent = findAdjacentSeats(nearlyFullCinema);

    console.log(
      `Expected: Some available seats (non-zero), no adjacent pairs (null)`
    );
    console.log(
      `Actual: ${nearlyFullAvailable} available, ${nearlyFullOccupied} occupied, adjacent seats ${
        nearlyFullAdjacent !== null ? "found (unexpected)" : "not found (correct)"
      }`
    );

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

    console.log(
      `Expected: 0 available, 80 occupied, no adjacent seats (null), reservation fails`
    );
    console.log(
      `Actual: ${fullAvailable} available, ${fullOccupied} occupied, adjacent seats ${
        fullAdjacent !== null ? "found (unexpected)" : "not found (correct)"
      }`
    );
    console.log(`Reservation attempt: "${fullReservationResult}"`);

    const test4Pass =
      fullAvailable === 0 &&
      fullOccupied === 80 &&
      fullAdjacent === null &&
      fullReservationResult.includes("already occupied");
    console.log(`Result: ${test4Pass ? "PASS ✓" : "FAIL ✗"}\n`);

    // SUMMARY
    console.log("========================================");
    console.log("TEST SUMMARY");
    console.log("========================================");
    const passCount = [test1Pass, test2Pass, test3Pass, test4Pass].filter(
      (result) => result
    ).length;
    console.log(`Tests Passed: ${passCount}/4`);
    console.log(
      test1Pass
        ? "✓ Test 1 (Empty Cinema): PASS"
        : "✗ Test 1 (Empty Cinema): FAIL"
    );
    console.log(
      test2Pass
        ? "✓ Test 2 (Partially Occupied): PASS"
        : "✗ Test 2 (Partially Occupied): FAIL"
    );
    console.log(
      test3Pass
        ? "✓ Test 3 (Nearly Full Cinema): PASS"
        : "✗ Test 3 (Nearly Full Cinema): FAIL"
    );
    console.log(
      test4Pass
        ? "✓ Test 4 (Completely Full): PASS"
        : "✗ Test 4 (Completely Full): FAIL"
    );
    console.log("========================================\n");
  });
} else {
  // ========== BROWSER MODE ==========
  // This runs when loaded in the browser
  import("./style.css");
  import("./cinema-ui").then((module) => {
    module.initializeUI();
  });
}

