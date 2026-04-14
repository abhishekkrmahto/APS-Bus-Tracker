import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const updateDriverLocationInDB = async (email, lat, lng) => {
  if (!lat || !lng) return;

  try {
    const driverRef = doc(db, "drivers", email);

    await updateDoc(driverRef, {
      latitude: lat,
      longitude: lng,
    });
  } catch (err) {
    console.log(err);
  }
};