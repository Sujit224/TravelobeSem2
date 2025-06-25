import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ onReviewAdded }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/feedback", {
        name,
        comment,
        rating,
      });
      setName("");
      setComment("");
      setRating(1);
      onReviewAdded(); 
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    

     <div className="form-container">
    <form  onSubmit={handleSubmit} className="responsive-form">
      <h2>Submit Your Review</h2>

       <div className="form-group">
         <input
        type="text"
        value={name}
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      </div>
   
      <div className="form-group">
      <textarea
        value={comment}
        placeholder="Write a comment..."
        onChange={(e) => setComment(e.target.value)}
        required
      />
       
      </div>

      <div className="form-group">
       <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      </div>

     

      <button className="feedback_button" type="submit">Submit</button>
    </form>
  </div>



    
  );
}