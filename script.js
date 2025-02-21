async function generatePoem() {
    const lineCount = document.getElementById('lineCount').value;
    const theme = document.getElementById('theme').value;

    // Clear previous debug logs
    document.getElementById('debug-log').textContent = '';

    // Check if lineCount and theme are valid
    if (!lineCount || !theme || lineCount < 1 || lineCount > 10) {
        alert('Please enter a valid number of lines (1-10) and a theme.');
        return;
    }

    // Log user input
    logDebug(`Sending to Perplexity API:\nLine Count: ${lineCount}\nTheme: ${theme}`);

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY_HERE' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "sonar-pro",
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
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${errorText}`);
        }

        const data = await response.json();

        // Log the API response
        logDebug(`API Response:\n${JSON.stringify(data, null, 2)}`);

        // Display the poem
        document.getElementById('poem-output').textContent = data.choices[0].message.content;
    } catch (error) {
        // Log any errors
        logDebug(`Error calling Perplexity API:\n${error}`);
    }
}

// Helper function to log messages to the debug section
function logDebug(message) {
    const debugLog = document.getElementById('debug-log');
    debugLog.textContent += message + '\n\n';
}
