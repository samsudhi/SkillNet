// Function to fetch available models
async function getAvailableModels() {
    try {
        const response = await fetch('https://api.perplexity.ai/models', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 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'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Available models:", data);
        displayModels(data);
    } catch (error) {
        console.error("Error fetching models:", error);
        alert("Error fetching models: " + error.message);
    }
}

// Function to display models in the HTML
function displayModels(models) {
    const modelList = document.getElementById('model-list');
    modelList.innerHTML = '<h3>Available Models:</h3>';
    const ul = document.createElement('ul');
    models.forEach(model => {
        const li = document.createElement('li');
        li.textContent = model.id;
        ul.appendChild(li);
    });
    modelList.appendChild(ul);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const fetchModelsButton = document.getElementById('fetch-models');
    if (fetchModelsButton) {
        fetchModelsButton.addEventListener('click', getAvailableModels);
    }
});

