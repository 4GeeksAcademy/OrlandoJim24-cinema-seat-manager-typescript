/**
 * Shared cinema seating logic - reusable functions for both console and web UI
 * Uses two-dimensional arrays only (no objects or classes for seating data)
 */

/**
 * Initializes a cinema seating matrix with 8 rows and 10 seats per row.
 * All seats are initially available (represented by 0).
 * 0 = available seat, 1 = occupied seat
 * 
 * @returns A 2D array representing the cinema seating layout
 */
export function initializeCinemaSeats(): number[][] {
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
export function reserveSeat(seatingArray: number[][], row: number, column: number): string {
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

/**
 * Counts available and occupied seats in the cinema.
 * Uses nested loops to iterate through all seats in the matrix
 * and returns the counts as a tuple [available, occupied].
 * 
 * @param seatingArray - The 2D array representing cinema seats
 * @returns A tuple with [availableSeats, occupiedSeats]
 */
export function countSeats(seatingArray: number[][]): [number, number] {
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

/**
 * Finds the first pair of horizontally adjacent available seats.
 * Searches from top to bottom and left to right within each row.
 * Adjacent seats must both be available (0) and in the same row.
 * 
 * @param seatingArray - The 2D array representing cinema seats
 * @returns A tuple [row, firstColumn, secondColumn] or null if no pair exists
 */
export function findAdjacentSeats(seatingArray: number[][]): [number, number, number] | null {
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
