function generatePoem() {
    const lineCount = document.getElementById('lineCount').value;
    const theme = document.getElementById('theme').value.toLowerCase();
    
    if (!lineCount || !theme) {
        alert('Please enter both the number of lines and a theme.');
        return;
    }
    
    let poem = '';
    for (let i = 0; i < lineCount; i++) {
        poem += generateLine(theme) + '\n';
    }
    
    document.getElementById('poem-output').textContent = poem;
}

function generateLine(theme) {
    const adjectives = ['beautiful', 'mysterious', 'gentle', 'fierce', 'radiant', 'serene', 'vibrant', 'tranquil'];
    const nouns = ['sun', 'moon', 'star', 'ocean', 'mountain', 'forest', 'river', 'sky'];
    const verbs = ['shines', 'whispers', 'dances', 'dreams', 'inspires', 'flows', 'echoes', 'glows'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    
    return `The ${adj} ${theme} ${verb} like a ${noun}`;
}
