// Test function to check if button click is working
function testButton() {
    console.log("Test button clicked - " + new Date().toISOString());
    alert("Test button clicked!");
}

// Main function to generate poem
async function generatePoem() {
    try {
        console.log("generatePoem function called - " + new Date().toISOString());
        
        const lineCount = document.getElementById('lineCount').value;
        const theme = document.getElementById('theme').value;
        
        console.log(`Inputs - Line Count: ${lineCount}, Theme: ${theme}`);

        document.getElementById('debug-log').textContent = '';
        document.getElementById('poem-output').textContent = 'Generating poem...';

        if (!lineCount || !theme || lineCount < 1 || lineCount > 10) {
            console.log("Invalid input detected");
            alert('Please enter a valid number of lines (1-10) and a theme.');
