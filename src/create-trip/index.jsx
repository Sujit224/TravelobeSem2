import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {FcGoogle} from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
   const [openDialog,setOpenDialog] = useState(false)

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    console.log('OAuth Success:', codeResp);
    
    GetUserProfile(codeResp.access_token);
  },
  onError: (error) => console.log('OAuth Error:', error)
});


  const onGenerateTrip = async () => {
    
    const user = localStorage.getItem('user');

    if(!user){ //If  user not found make the openDialog show so that it asks for SignIn
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData.budget) ||
      !formData.traveller ||
      !formData.location
    ) {
      toast("Please fill all the details");
      return;
    }
    
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    
    
  };

  const GetUserProfile = async (access_token) => {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userData = await response.json();
        console.log('User Info:', userData);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setOpenDialog(false);
        onGenerateTrip();
        
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] dark:from-[#18181b] dark:to-[#27272a] transition-colors duration-300 py-12 px-4 md:px-0">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-12">
        <h2 className="font-extrabold text-3xl md:text-4xl text-center mb-2 bg-gradient-to-r from-blue-900 to-green-400 bg-clip-text text-transparent">
          Plan Your Trip
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 text-lg">
          Just provide some basic information to customize your itinerary.
        </p>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Where do you want to go?
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />

        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Number of days
          </label>
          <Input
            placeholder="Ex. 3"
            type="number"
            className="w-full rounded-lg border-gray-300 dark:border-zinc-700"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            What's your budget?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-xl cursor-pointer  transition-transform transform active:translate  active:shadow-inner duration-200 hover:shadow-lg dark:bg-zinc-800  ${
                  formData?.budget === item.title
                    ? "border-2 border-[#38ef7d] bg-[#e0ffe6] dark:bg-[#232d26]"
                    : ""
                }`}
              >
                <div className="text-2xl mb-1 ">{item.icon}</div>
                <div className="font-bold ">{item.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Who's traveling?
          </label>
          <div className="grid grid-cols-4 gap-3">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg dark:bg-zinc-800 dark:border-zinc-700 ${
                  formData?.traveller === item.people
                    ? "border-2 border-[#38ef7d] bg-[#e0ffe6] dark:bg-[#232d26]"
                    : ""
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="w-fit px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-[#38ef7d] to-[#11998e] text-white shadow-lg hover:from-[#11998e] hover:to-[#38ef7d] transition-all duration-200"
            onClick={onGenerateTrip}
            
          >
            Generate Trip
          </Button>
        </div>
      </div>

       <Dialog open={openDialog}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
          <DialogHeader>
            <DialogDescription>
              <img src="/TravelobeLogo.png" />
              <h2 className="font-bold text-lg mt-3">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
               
                onClick={login}
                varient="outline"
                className="mt-5 w-full flex gap-2 items-center"
              >
                <FcGoogle className="h-10 w-8" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
