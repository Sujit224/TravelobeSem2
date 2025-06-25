import { useState } from "react";
import ReviewForm from "./components/ui/ReviewForm";
// import ReviewList from "./components/ReviewList";
import { Link } from "react-router-dom";
import "./Feedback_app.css"
import Header from './components/custom/Header'


function Feedback_app() {
  const [refreshKey, setRefreshKey] = useState(0);
  console.log("Feedback_app rendered")

  return (
    <>
    {/* <Header/> */}
    <div className="app">
      <ReviewForm onReviewAdded={() => setRefreshKey((k) => k + 1)} />
        <Link to="/rateus/reviews" className="link-button">View All Reviews →</Link>

    </div>
    </>
  );
}

export default Feedback_app;