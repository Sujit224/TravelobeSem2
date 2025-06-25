import ReviewList from "../components/ui/ReviewList";
import { Link } from "react-router-dom";

export default function ReviewsPage() {
  return (
    <div className="reviews-page">
      <ReviewList refresh={0} />
      <div className="go-back-container">
        <Link to="/rateus" className="link-goback-button">← Go back</Link>
      </div>    </div>
  );
}