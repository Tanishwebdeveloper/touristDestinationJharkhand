// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoutes = ({ role, children }) => {
//   // here we will send the request to the backend and then fetches the role from the backend and then assign duties as per the user
//   try {
//     const navigate = Navigate();
//     const [allowed, setallowed] = useState(null);
//     useEffect(() => {
//       axios
//         .get("http://localhost:5000/api/auth/authorizerole", {
//           withCredentials: true,
//         })
//         .then((resp) => {
//           if (resp.data.role === role) {
//             setallowed(resp.data.role === role);
//           }
//         })
//         .catch(() => {
//           setallowed(false);
//         }, [role]);
//     });

//     if (allowed === null) {
//       return <div>Loading....</div>;
//     } else if (allowed === false) {
//       return <Navigate to="/loginpage" />;
//     }
//     return children;
//   } catch (error) {
//     throw new Error("Error while handling the prpotected routes in the react ",error.message);
//   }
// };

// export default ProtectedRoutes;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ role, children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    // If no role is specified, just check if user is authenticated
    if (!role) {
      const userRole = localStorage.getItem("userRole");
      setAllowed(!!userRole);
      return;
    }
    
    axios
      .get("http://localhost:5000/api/users/authorizerole", { withCredentials: true })
      .then((resp) => {
        if (resp.data.role?.toLowerCase() === role?.toLowerCase()) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(() => setAllowed(false));
  }, [role]);

  if (allowed === null) {
    return <div>Loading...</div>;
  }

  if (allowed === false) {
    return <Navigate to="/loginpage" replace />;
  }

  return children;
};

export default ProtectedRoutes;