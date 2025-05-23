document.getElementById('percentileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get input values
    const mathMarks = parseInt(document.getElementById('mathMarks').value);
    const physicsMarks = parseInt(document.getElementById('physicsMarks').value);
    const chemistryMarks = parseInt(document.getElementById('chemistryMarks').value);
    const examDate = document.getElementById('examDate').value;
    const shift = document.getElementById('shift').value;
    
    try {
        // Call backend API
        const response = await fetch('http://localhost:3000/api/calculate-percentile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mathMarks,
                physicsMarks,
                chemistryMarks,
                examDate,
                shift
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Display results
        document.getElementById('percentileValue').textContent = data.percentile.toFixed(2);
        document.getElementById('displayMarks').textContent = data.totalMarks + "/200";
        document.getElementById('displayMath').textContent = mathMarks + "/100";
        document.getElementById('displayPhysics').textContent = physicsMarks + "/50";
        document.getElementById('displayChemistry').textContent = chemistryMarks + "/50";
        
        // Format and display date
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const displayDate = new Date(examDate).toLocaleDateString('en-US', dateOptions);
        document.getElementById('displayDate').textContent = displayDate;
        
        document.getElementById('displayShift').textContent = shift === "1" ? "Shift 1 (Morning)" : "Shift 2 (Afternoon)";
        
        // Show result card
        document.getElementById('result').style.display = 'block';
        
        // Scroll to result
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
    }
});
