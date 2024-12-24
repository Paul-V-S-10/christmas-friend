// Fetch CSV data and process it
let assignments = [];

fetch("assignments.csv")
    .then(response => response.text())
    .then(data => {
        // Parse CSV into an array of objects
        const rows = data.split("\n").slice(1); // Skip the header row
        rows.forEach(row => {
            const cols = row.split(",");
            if (cols.length >= 5) { // Ensure there are enough columns
                assignments.push({
                    year: cols[0].trim(),
                    name: cols[1].trim(),
                    rollNumber: cols[2].trim().toLowerCase(), // Convert to lowercase
                    christmasFriend: cols[3].trim(),
                    friendRollNumber: cols[4].trim()
                });
            }
        });
    })
    .catch(error => console.error("Error loading CSV:", error));

// Event listener for form submission
document.getElementById("friendForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the roll number entered by the user and convert it to lowercase
    const rollNumber = document.getElementById("rollNumber").value.trim().toLowerCase();

    // Find the matching record in the assignments (case-insensitive)
    const record = assignments.find(item => item.rollNumber === rollNumber);

    // Display the result
    const resultDiv = document.getElementById("result");
    const friendName = document.getElementById("friendName");

    if (record) {
        friendName.textContent = `${record.christmasFriend} (Roll Number: ${record.friendRollNumber})`;
        resultDiv.classList.remove("hidden");
    } else {
        friendName.textContent = "Roll number not found. Please try again.";
        resultDiv.classList.remove("hidden");
    }
});
