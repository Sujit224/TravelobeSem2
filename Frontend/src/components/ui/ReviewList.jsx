import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewList({ refresh }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/feedback");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [refresh]);

  return (
    <div className="review-list">
      <h2>Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
      <div className="review-grid">
       { reviews.map((r, idx) => (
          <div key={idx} className="review">
             {/* <img src={`https://i.pravatar.cc/150?u=${r.name}`} alt={r.name} className="avatar" /> */}
             <img src={`https://picsum.photos/seed/${r.name}/150`} alt={r.name} className="avatar" />
            <strong>{r.name}</strong>  
            {/* {r.rating} <span style={{color:"gold"}}> ★ </span>  */}

            {[...Array(r.rating)].map((_, i) => (
              <span style={{color:"gold"}}> ★ </span>
              ))}

            <p>{r.comment}</p>
          </div>
        ))}

        </div>
      )}
    </div>
  );
}