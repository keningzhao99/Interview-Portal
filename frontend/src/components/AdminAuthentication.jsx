// import React, { createContext, useContext, useState, useEffect } from "react";
// import firebase from "/firebase";

// const AdminContext = createContext({
//   authenticated: null,
//   setAuthenticated: () => {},
// });

// // AdminProvider component
// const AdminProvider({ children }) {
//   const [authenticated, setAuthenticated] = useState(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setAuthenticated(!!user);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AdminContext.Provider value={{ authenticated, setAuthenticated }}>
//       {children}
//     </AdminContext.Provider>
//   );
// }

// // Custom hook for using the AdminContext
// export const useAdminContext = () => useContext(AdminContext);
