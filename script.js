// Fetch CSV data and process it
let assignments = [];

fetch("assignments.csv")
    .then(response => response.text())
    .then(data => {
        // Parse CSV into an array of objects
        const rows = data.split("\n").slice(1); // Skip the header row
        rows.forEach(row => {
            const cols = row.split(",");
            assignments.push({
                name: cols[0],
                rollNumber: cols[1].trim().toLowerCase(), // Convert to lowercase
                christmasFriend: cols[2],
                friendRollNumber: cols[3]
            });
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
