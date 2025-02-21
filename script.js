async function generatePoem() {
    const lineCount = document.getElementById('lineCount').value;
    const theme = document.getElementById('theme').value;
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
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

    const data = await response.json();
    document.getElementById('poem-output').textContent = data.choices[0].message.content;
}
