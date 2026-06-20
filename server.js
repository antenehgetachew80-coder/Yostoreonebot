const express = requires('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyparser.json());

const VERIFY_TOKEN = 'Yostoreone1604776';
const PAGE_ACCESS_TOKEN= 'EAAXSqKobyoEBR69bMBEvCda32GcxL1OnKrDVFnQBCVvdmi1CIp3WfZCGeZA1CPIrFwmoBDZCdkzZB7oFrYYhaJ2ZAOaTilNhKqTJQ6D2J6FGrdTokJI04ppj3nBZAQcHSw8UclpTsAYgpI7oDWQ0tfWZCd2t8qemNW0pbqZBmGLjvfRlTMOCHccQI3GKbUQZCoDtLPRo69XAyjAZDZD'; //You'll replace this later!

//Your 19 answers
const ANSWERS = {
Answer 1: Red #E74C3C: Excitement, passion, urgency, boldness. Used to stimulate appetite and create a sense of action (e.g., Coca-Cola, YouTube).',
Answer 2: Orange #E67E22: Enthusiasm, creativity, friendliness, warmth. Encourages social interaction and fun (e.g., Fanta, Nickelodeon).',
Answer 3: Coral #FF5A5F: Vibrant, welcoming, energetic. Popular in modern tech and hospitality to feel friendly and approachable (e.g., Airbnb).',
Answer 4: Yellow #F39C12: Optimism, happiness, creativity, warmth. Grabs attention quickly but can cause eye strain if overused (e.g., IKEA, Snapchat).',
Answer 5: Gold #FFD700: Luxury, prestige, success, quality. Often paired with darker colors for high-end brand identities.',
Answer 6: Green #27AE60: Health, nature, growth, calmness, renewal. Used extensively for eco-friendly brands, wellness, and finance (e.g., Spotify, Starbucks).',
Answer 7: Lime Green #1ED860: Energy, youth, creativity, freshness. Spotify's signature shade conveys a modern, accessible vibe.',
Answer 8: Blue #3498DB: Trust, security, professionalism, calmness. The most universally liked color, popular for corporate, tech, and healthcare brands (e.g., Facebook, LinkedIn).',
Answer 9: Navy #163A8E: Authority, stability, reliability. Projects a more serious and established feel (e.g., Booking.com).',
Answer 10: Cerulean #007BA7: Tranquility, clarity, calming peace. Associated with the sky and water, creates a serene feeling.',
Answer 11: Purple #9B59B6: Luxury, creativity, wisdom, sophistication. Historically associated with royalty (e.g., Cadbury, Hallmark).',
Answer 12: Electric Pink #FF00BF: Playful, energetic, modern, bold. Used by brands wanting to stand out (e.g., Lyft).',
Answer 13: Pink #E91E63: Compassion, love, youthful energy. Often associated with romance and nurturing.',
Answer 14: Brown #795548: Reliability, earthiness, comfort, stability. Often used for natural, rustic, or agricultural products (e.g., UPS, Hershey's).',
Answer 15: Cream #FFFDD0: Elegance, warmth, calmness. A softer alternative to white for a more inviting feel.',
Answer 16: Ivory #FFFFF0: Purity, simplicity, luxury. Similar to cream but with a slightly cooler undertone.',
Answer 17:  Black #2C3E50: Elegance, power, sophistication, authority. Creates a sense of exclusivity and premium quality (e.g., Nike, Chanel).',
Answer 18: White #ECF0F1: Purity, cleanliness, simplicity, minimalism. Creates a sense of space and clarity (e.g., Apple, Tesla).',
Answer 19: Grey #95A5A6: Neutral, timeless, professional, balanced. A safe, understated choice for technology and corporate sectors (e.g., Apple, Wikipedia).'
  };

  // Webhook verification
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error');
  }
});

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const event = entry.messaging[0];
      
      if (event.message && event.message.text) {
        const senderId = event.sender.id;
        const userMessage = event.message.text.trim();
        
        if (userMessage.toLowerCase() === 'menu') {
          sendMainMenu(senderId);
          return;
        }
        
        const answer = ANSWERS[userMessage];
        if (answer) {
          sendMessage(senderId, answer);
        } else {
          sendMessage(senderId, 'Please send a number between 1-19 or type "menu"');
        }
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

function sendMainMenu(recipientId) {
  const message = {
    recipient: { id: recipientId },
    message: {
      text: '🔢 Choose a number 1-19:',
      quick_replies: []
    }
  };
  
  for (let i = 1; i <= 19; i++) {
    message.message.quick_replies.push({
      content_type: 'text',
      title: ${i},
      payload: ANSWER_${i}
    });
  }
  
  axios.post(https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}, message);
}

function sendMessage(recipientId, text) {
  axios.post(https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}, {
    recipient: { id: recipientId },
    message: { text: text }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}'));

