// ============================================
// 1. API Configuration
// ============================================
const CONFIG = {
    // 🔴 YOUR API KEY IS SET BELOW
    API_KEY: 'AIzaSyD1F5IzOCd6Fd_UEIqbBzAFz1IDpPTfOCI',

    // The specific model endpoint
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',

    // System prompt for the Love Assistant personality
    SYSTEM_PROMPT: `You are a sweet, romantic love assistant on a Valentine's Day website. 
    Be helpful, loving, and supportive. 
    Use heart emojis 💕💖💗 and be encouraging about love and relationships. 
    Keep responses brief and sweet (2-3 sentences max).
    Be playful and romantic in your tone.`
};

// ============================================
// 2. The Love Assistant Function
// ============================================
async function askLoveAssistant(userMessage) {
    // Check if API key exists
    if (!CONFIG.API_KEY) {
        return "✨ Please add your API Key in config.js first! 💕";
    }

    try {
        // Prepare the data to send to Gemini
        const payload = {
            contents: [{
                parts: [{
                    text: `${CONFIG.SYSTEM_PROMPT}\n\nUser asks: ${userMessage}`
                }]
            }]
        };

        // Make the request
        const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if it worked
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Response Error:", response.status, errorData);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Extract the sweet message
        const reply = data.candidates[0].content.parts[0].text;
        return reply;

    } catch (error) {
        console.error("Love Assistant Error:", error);
        // Show specific error in console, friendly message to user
        return "💔 Oops! My love connection is a bit fuzzy. Check the browser console (F12) for details!";
    }
}

// ============================================
// 3. Example Usage (Connect this to your button)
// ============================================
// Example: If you have a button with id="askBtn" and input with id="userInput"
/*
document.getElementById('askBtn').addEventListener('click', async () => {
    const input = document.getElementById('userInput').value;
    const responseBox = document.getElementById('responseBox');
    
    responseBox.innerText = "Thinking of something sweet... 💭";
    const answer = await askLoveAssistant(input);
    responseBox.innerText = answer;
});
*/