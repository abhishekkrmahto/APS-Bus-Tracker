import { getDocs, query, where } from "firebase/firestore";
import { adminCollectionRef } from "../firebase/firebaseConfig";
import { studentCollectionRef } from "../firebase/firebaseConfig";
import { driverCollectionRef } from "../firebase/firebaseConfig";

class LoginService {
  login = async (email, password) => {
    // 1. Logic check
    if (email.endsWith(".admin")) {
      try {
        // 2. Fetch the specific admin user
        const q = query(
          adminCollectionRef,
          where("email", "==", email),
          where("password", "==", password),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          // Perform password check here
          return { success: true, user: userData };
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    } else if (email.endsWith(".student")) {
      try {
        // Fetch the specific student user
        const q = query(
          studentCollectionRef,
          where("email", "==", email),
          where("password", "==", password),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          // Perform password check here
          return { success: true, user: userData };
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
    else if (email.endsWith(".driver")) {
      try {
        // Fetch the specific driver user
        const q = query(
          driverCollectionRef,
          where("email", "==", email),
          where("password", "==", password),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          // Perform password check here
          return { success: true, user: userData };
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
    return { success: false, message: "User not found" };
  };
}

export default new LoginService();
