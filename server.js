const express = require('express');
const bodyParser =require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
const VERIFY_TOKEN = 'Yostoreone1604776';
const PAGE_ACCESS_TOKEN = 'EAAXSqKobyoEBR69bMBEvCda32GcxL1OnKrDVFnQBCVvdmi1CIp3WfZCGeZA1CPIrFwmoBDZCdkzZB7oFrYYhaJ2ZAOaTilNhKqTJQ6D2J6FGrdTokJI04ppj3nBZAQcHSw8UclpTsAYgpI7oDWQ0tfWZCd2t8qemNW0pbqZBmGLjvfRlTMOCHccQI3GKbUQZCoDtLPRo69XAyjAZDZD';
// My 19 color answers
const ANSWERS = {  
'1': 'Answer 1: Red #E74C3C: Excitement, passion, urgency, boldness. Used to stimulate appetite and create a sense of action (e.g., Coca-Cola, YouTube).',  
'2': 'Answer 2: Orange #E67E22: Enthusiasm, creativity, friendliness, warmth. Encourages social interaction and fun (e.g., Fanta, Nickelodeon).',  
'3': 'Answer 3: Coral #FF5A5F: Vibrant, welcoming, energetic. Popular in modern tech and hospitality to feel friendly and approachable (e.g., Airbnb).',  
'4': 'Answer 4: Yellow #F39C12: Optimism, happiness, creativity, warmth. Grabs attention quickly but can cause eye strain if overused (e.g., IKEA, Snapchat).',  
'5': 'Answer 5: Gold #FFD700: Luxury, prestige, success, quality. Often paired with darker colors for high-end brand identities.',  
'6': 'Answer 6: Green #27AE60: Health, nature, growth, calmness, renewal. Used extensively for eco-friendly brands, wellness, and finance (e.g., Spotify, Starbucks).',  
'7': 'Answer 7: Lime Green #1ED860: Energy, youth, creativity, freshness. Spotify signature shade conveys a modern, accessible vibe.',  
'8': 'Answer 8: Blue #3498DB: Trust, security, professionalism, calmness. The most universally liked color, popular for corporate, tech, and healthcare brands (e.g., Facebook, LinkedIn).',  
'9': 'Answer 9: Navy #163A8E: Authority, stability, reliability. Projects a more serious and established feel (e.g., Booking.com).',  
'10': 'Answer 10: Cerulean #007BA7: Tranquility, clarity, calming peace. Associated with the sky and water, creates a serene feeling.',  
'11': 'Answer 11: Purple #9B59B6: Luxury, creativity, wisdom, sophistication. Historically associated with royalty (e.g., Cadbury, Hallmark).',  
'12': 'Answer 12: Electric Pink #FF00BF: Playful, energetic, modern, bold. Used by brands wanting to stand out (e.g., Lyft).',  '13': 'Answer 13: Pink #E91E63: Compassion, love, youthful energy. Often associated with romance and nurturing.',  
'14': 'Answer 14: Brown #795548: Reliability, earthiness, comfort, stability. Often used for natural, rustic, or agricultural products (e.g., UPS, Hershey).',  
'15': 'Answer 15: Cream #FFFDD0: Elegance, warmth, calmness. A softer alternative to white for a more inviting feel.',  
'16': 'Answer 16: Ivory #FFFFF0: Purity, simplicity, luxury. Similar to cream but with a slightly cooler undertone.',  
'17': 'Answer 17: Black #2C3E50: Elegance, power, sophistication, authority. Creates a sense of exclusivity and premium quality (e.g., Nike, Chanel).',  
'18': 'Answer 18: White #ECF0F1: Purity, cleanliness, simplicity, minimalism. Creates a sense of space and clarity (e.g., Apple, Tesla).',  
'19': 'Answer 19: Grey #95A5A6: Neutral, timeless, professional, balanced. A safe, understated choice for technology and corporate sectors (e.g., Apple, Wikipedia).'
};
// Webhook verification
app.get('/webhook', (req, res) => {  
if (req.query['hub.verify_token'] === VERIFY_TOKEN) {  
res.send(req.query['hub.challenge']);  
} else {    
res.send('Error');  
}
});
// Handle incoming message
sapp.post('/webhook', (req, res) => {  
const body = req.body;  

if (body.object === 'page') {    
body.entry.forEach(entry => {      
const event = entry.messaging[0];      
if (event.message && event.message.text) {        
const senderId = event.sender.id;        const userMessage = event.message.text.trim();        console.log('User sent:', userMessage); // Debug log        
if (userMessage.toLowerCase() === 'menu') {          sendMainMenu(senderId);          return;        
}        
const answer = ANSWERS[userMessage];        if (answer) {          
sendMessage(senderId, answer);        
} else {          
sendMessage(senderId, 'Please send a number between 1-19 or type "menu"');        
}      
}    
});    res.status(200).send('EVENT_RECEIVED');  
} else {    
res.sendStatus(404);  
}
});
// Send main menu with 19 buttons
function sendMainMenu(recipientId) {  
const message = {    
recipient: { id: recipientId },    
message: {      
text: '🔢 Choose a number 1-19:',      quick_replies: []    
}  
};  
for (let i = 1; i <= 19; i++) {    
message.message.quick_replies.push({      
content_type: 'text',      
title: `${i}`,      
payload: `ANSWER_${i}`    
});  
}  axios.post(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, message)    
.then(() => {      
console.log('Menu sent successfully');    
})    
.catch(error => {      
console.error('Error sending menu:', error.response ? error.response.data : error.message);    
});
}
// Send a single message
function sendMessage(recipientId, text) {  
axios.post(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {    
recipient: { id: recipientId },    
message: { text: text }  
})  
.then(() => {    
console.log('Message sent successfully');  
})  
.catch(error => {    
console.error('Error sending message:', error.response ? error.response.data : error.message);  
});
}
// Start the serverconst 
PORT = process.env.PORT || 3000;app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));