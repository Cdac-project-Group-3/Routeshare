import { Link } from "react-router-dom";

import "./NotFound.css";

 

function NotFound() {

  return (

    <div className="not-found">

      <div className="not-found-emoji">🛣️</div>

      <h1>404</h1>

      <p className="not-found-title">This route is off the map</p>

      <p className="not-found-subtitle">

        The page you are looking for does not exist or has been moved.

      </p>

      <Link to="/avail" className="btn btn-primary">

        ← Back to available rides

      </Link>

    </div>

  );

}

 

export default NotFound;