async function generatePoem() {
    const lineCount = document.getElementById('lineCount').value;
    const theme = document.getElementById('theme').value;

    document.getElementById('debug-log').textContent = '';
    document.getElementById('poem-output').textContent = 'Generating poem...';

    if (!lineCount || !theme || lineCount < 1 || lineCount > 10) {
        alert('Please enter a valid number of lines (1-10) and a theme.');
        return;
    }

    logDebug(`Sending to Perplexity API:\nLine Count: ${lineCount}\nTheme: ${theme}`);

    const requestBody = {
        model: "pplx-7b-chat",
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

    try {
        logDebug('Sending request to API...');
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify(requestBody)
        });

        logDebug(`Received response with status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${errorText}`);
        }

        logDebug('Parsing response JSON...');
        const data = await response.json();
        logDebug(`API Response:\n${JSON.stringify(data, null, 2)}`);

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            document.getElementById('poem-output').textContent = data.choices[0].message.content;
        } else {
            throw new Error('Unexpected API response format');
        }
    } catch (error) {
        logDebug(`Error calling Perplexity API:\n${error.message}`);
        document.getElementById('poem-output').textContent = "An error occurred while generating the poem. Please try again.";
    }
}

function logDebug(message) {
    const debugLog = document.getElementById('debug-log');
    debugLog.textContent += message + '\n\n';
    console.log(message); // Also log to console for easier debugging
}



