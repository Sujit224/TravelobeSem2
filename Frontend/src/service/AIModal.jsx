
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey); 
 
    export const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json', 
    };

    // Model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            { 
              text: 'Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. ' +
                    'Provide hotel options with: HotelName, Hotel address, Price, hotel image url, geo coordinates (as latitude/longitude object), rating (1-5), descriptions. ' +
                    'Also suggest itinerary with: placeName, Place Details, Place Image Url, Geo Coordinates (as latitude/longitude object), ticket Pricing, rating (1-5), ' +
                    'time travel (duration), and best time to visit for each day. Format response as pure JSON without markdown code blocks.'
            },
          ],
        },
        {
          role: 'model',
          parts: [
            { 
              text: JSON.stringify({
                travelPlan: {
                  location: "Las Vegas",
                  duration: "3 Days",
                  budget: "Cheap",
                  hotels: [
                    {
                      hotelName: "Flamingo Las Vegas",
                      address: "3555 S Las Vegas Blvd",
                      price: "$40-$150/night",
                      imageUrl: "https://example.com/flamingo.jpg",
                      geoCoordinates: { latitude: 36.1162, longitude: -115.1706 },
                      rating: 3.5,
                      description: "Iconic hotel with great pool and central location"
                    }
                  ],
                  itinerary: {
                    day1: [
                      {
                        placeName: "Bellagio Fountains",
                        details: "Famous water show",
                        imageUrl: "https://example.com/fountains.jpg",
                        coordinates: { latitude: 36.1126, longitude: -115.1741 },
                        pricing: "Free",
                        rating: 4.8,
                        duration: "30 minutes",
                        bestTime: "Evening"
                      }
                    ]
                  }
                }
              })
            }
          ],
        }
      ],
    });


    
   



