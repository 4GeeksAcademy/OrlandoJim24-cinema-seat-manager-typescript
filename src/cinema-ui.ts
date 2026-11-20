/**
 * Cinema Seat Manager - Interactive Web UI
 * Uses Tailwind CSS for styling and DOM manipulation for interactivity
 * Reuses seating logic from cinema-logic.ts
 */

import {
  initializeCinemaSeats,
  reserveSeat,
  countSeats,
  findAdjacentSeats,
} from "./cinema-logic";

let cinema = initializeCinemaSeats();
let highlightedSeats: [number, number, number] | null = null;

/**
 * Renders the cinema seating chart in the DOM
 */
function renderSeatingChart(): void {
  const chartContainer = document.getElementById("seating-chart");
  if (!chartContainer) return;

  chartContainer.innerHTML = "";

  // Create column headers
  const headerRow = document.createElement("div");
  headerRow.className = "grid gap-2 mb-2";
  headerRow.style.gridTemplateColumns = "40px repeat(10, 1fr)";
  headerRow.style.alignItems = "center";

  const cornerLabel = document.createElement("div");
  cornerLabel.textContent = "";
  headerRow.appendChild(cornerLabel);

  for (let col = 0; col < 10; col++) {
    const header = document.createElement("div");
    header.className = "text-center text-sm font-semibold text-slate-700";
    header.textContent = col.toString();
    headerRow.appendChild(header);
  }
  chartContainer.appendChild(headerRow);

  // Create seat rows
  for (let row = 0; row < 8; row++) {
    const rowContainer = document.createElement("div");
    rowContainer.className = "grid gap-2 mb-2";
    rowContainer.style.gridTemplateColumns = "40px repeat(10, 1fr)";
    rowContainer.style.alignItems = "center";

    // Row label
    const rowLabel = document.createElement("div");
    rowLabel.className = "text-sm font-semibold text-slate-700";
    rowLabel.textContent = row.toString();
    rowContainer.appendChild(rowLabel);

    // Seats
    for (let col = 0; col < 10; col++) {
      const seatButton = document.createElement("button");
      const isOccupied = cinema[row][col] === 1;
      const isHighlighted =
        highlightedSeats &&
        ((highlightedSeats[1] === col && highlightedSeats[0] === row) ||
          (highlightedSeats[2] === col && highlightedSeats[0] === row));

      seatButton.className =
        "w-10 h-10 rounded font-semibold text-white transition-all transform hover:scale-110";

      if (isOccupied) {
        seatButton.className +=
          " bg-red-500 cursor-not-allowed opacity-70 hover:scale-100";
        seatButton.disabled = true;
        seatButton.textContent = "X";
      } else if (isHighlighted) {
        seatButton.className +=
          " bg-blue-500 shadow-lg shadow-blue-300 ring-2 ring-blue-300";
        seatButton.textContent = "L";
        seatButton.disabled = true;
      } else {
        seatButton.className += " bg-green-500 hover:bg-green-600 cursor-pointer";
        seatButton.textContent = "L";
        seatButton.onclick = () => handleSeatClick(row, col);
      }

      rowContainer.appendChild(seatButton);
    }

    chartContainer.appendChild(rowContainer);
  }
}

/**
 * Handles seat click events
 */
function handleSeatClick(row: number, col: number): void {
  const message = reserveSeat(cinema, row, col);
  updateUI();

  // Show success/error message
  showMessage(
    message.includes("Success")
      ? `✓ ${message}`
      : `✗ ${message}`,
    message.includes("Success")
  );
}

/**
 * Updates the entire UI (counts and seating chart)
 */
function updateUI(): void {
  updateCounts();
  renderSeatingChart();
}

/**
 * Updates the seat count display
 */
function updateCounts(): void {
  const [available, occupied] = countSeats(cinema);

  const availableEl = document.getElementById("available-count");
  const occupiedEl = document.getElementById("occupied-count");
  const totalEl = document.getElementById("total-count");

  if (availableEl) availableEl.textContent = available.toString();
  if (occupiedEl) occupiedEl.textContent = occupied.toString();
  if (totalEl) totalEl.textContent = (available + occupied).toString();
}

/**
 * Finds and highlights adjacent seats
 */
function handleFindAdjacent(): void {
  highlightedSeats = findAdjacentSeats(cinema);
  renderSeatingChart();

  if (highlightedSeats) {
    showMessage(
      `✓ Found adjacent seats at row ${highlightedSeats[0]}, columns ${highlightedSeats[1]} and ${highlightedSeats[2]}`,
      true
    );
  } else {
    showMessage("✗ No adjacent available seats found", false);
  }
}

/**
 * Resets the cinema (clears all reservations and highlights)
 */
function handleReset(): void {
  cinema = initializeCinemaSeats();
  highlightedSeats = null;
  updateUI();
  showMessage("✓ Cinema reset - all seats are now available", true);
}

/**
 * Shows a temporary message to the user
 */
function showMessage(message: string, isSuccess: boolean): void {
  const messageEl = document.getElementById("message");
  if (!messageEl) return;

  messageEl.textContent = message;
  messageEl.className = isSuccess
    ? "text-green-700 font-semibold"
    : "text-red-700 font-semibold";

  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000);
}

/**
 * Initializes the web UI when DOM is ready
 */
export function initializeUI(): void {
  // Attach button handlers
  const findButton = document.getElementById("find-adjacent-btn");
  if (findButton) {
    findButton.addEventListener("click", handleFindAdjacent);
  }

  const resetButton = document.getElementById("reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", handleReset);
  }

  // Initial render
  updateUI();
}
