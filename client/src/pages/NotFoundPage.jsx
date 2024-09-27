import "../styles/NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  //console.log("notfoundpage success")
  return (
    <div className="container">
      <h1>404 - Not Found</h1>
      <p>unfortunately the page you are looking for does not exist.</p>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
}
