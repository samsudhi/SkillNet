document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('poemForm');
    form.removeEventListener('submit', form.handleSubmit);

    // Function to initialize or get API key
    function initializeApiKey() {
        let apiKey = localStorage.getItem('openaiApiKey');
        if (!apiKey) {
            apiKey = prompt('Please enter your OpenAI API key:');
            if (apiKey) {
                localStorage.setItem('openaiApiKey', apiKey);
            } else {
                document.getElementById('poemText').innerText = 'API key required to generate poems!';
                return null; // Return null to indicate failure
            }
        }
        return apiKey; // Return the key if valid
    }

    const apiKey = initializeApiKey();
    if (!apiKey) return; // Stop here if no key, but inside the listener function

    form.handleSubmit = async function(event) {
        event.preventDefault();

        const lines = parseInt(document.getElementById('lines').value, 10);
        const topic = document.getElementById('topic').value.trim();
        const humor = parseInt(document.getElementById('humor').value, 10);

        if (isNaN(lines) || isNaN(humor) || !topic) {
            document.getElementById('poemText').innerText = 'Please fill in all fields correctly!';
            return;
        }

        const prompt = `Write a ${lines}-line poem about ${topic}. Make it humor level ${humor} (0 is serious, 5 is very funny).`;
        document.getElementById('poemText').innerText = 'Generating your poem...';

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 20 + lines * 15,
                    temperature: Math.min(0.5 + humor * 0.1, 1.0)
                }),
                cache: 'no-store'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const poem = data.choices[0].message.content.trim();
            document.getElementById('poemText').innerText = poem;
        } catch (error) {
            document.getElementById('poemText').innerText = 'Oops, something went wrong! Try again.';
            console.error('Full Error:', error.message);
        }
    };

    form.addEventListener('submit', form.handleSubmit);
});