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
            return;
        }

        logDebug(`Sending to Perplexity API:\nLine Count: ${lineCount}\nTheme: ${theme}`);

        const requestBody = {
            model: "sonar-medium-chat",
            messages: [
                {
                    role: "system",
                    content: "You are a poetic AI assistant. Generate a poem based on the given theme and number of lines."
                },
                {
                    role: "user",
                    content: `Generate a ${lineCount}-line poem about ${theme}.`
                }
            ]
        };

        logDebug(`Request Body:\n${JSON.stringify(requestBody, null, 2)}`);

        console.log("Attempting to send request to API");
        logDebug('Sending request to API...');

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify(requestBody)
        });

        console.log(`Received response with status: ${response.status}`);
        logDebug(`Received response with status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${errorText}`);
        }

        console.log('Parsing response JSON...');
        logDebug('Parsing response JSON...');
        const data = await response.json();
        logDebug(`API Response:\n${JSON.stringify(data, null, 2)}`);

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            document.getElementById('poem-output').textContent = data.choices[0].message.content;
        } else {
            throw new Error('Unexpected API response format');
        }
    } catch (error) {
        console.error("Error in generatePoem:", error);
        logDebug(`Error calling Perplexity API:\n${error.message}`);
        document.getElementById('poem-output').textContent = "An error occurred while generating the poem. Please try again.";
        alert("An error occurred: " + error.message);
    }
}

// Helper function to log debug messages
function logDebug(message) {
    const debugLog = document.getElementById('debug-log');
    debugLog.textContent += message + '\n\n';
    console.log(message);
}

// Event listener to ensure the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    // Attach event listener to the generate poem button
    const generateButton = document.getElementById('generateButton');
    if (generateButton) {
        generateButton.addEventListener('click', generatePoem);
        console.log('Event listener attached to generate button');
    } else {
        console.error('Generate button not found in the DOM');
    }

    // Attach event listener to the test button
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', testButton);
        console.log('Event listener attached to test button');
    } else {
        console.error('Test button not found in the DOM');
    }
});

