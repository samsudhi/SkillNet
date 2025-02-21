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

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "sonar-medium-online",
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
        logDebug(`API Response:\n${JSON.stringify(data, null, 2)}`);
        document.getElementById('poem-output').textContent = data.choices[0].message.content;
    } catch (error) {
        logDebug(`Error calling Perplexity API:\n${error.message}`);
        document.getElementById('poem-output').textContent = "An error occurred while generating the poem. Please try again.";
    }
}

function logDebug(message) {
    const debugLog = document.getElementById('debug-log');
    debugLog.textContent += message + '\n\n';
}

