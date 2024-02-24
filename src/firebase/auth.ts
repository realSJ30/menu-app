
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth } from "./firebase.config";

interface AuthCredentialsProps {
    email: string;
    password: string
}

export const createUserWithEmailPassword = async ({ email, password }: AuthCredentialsProps) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.log('Error', error)
        return null;
    }
};

export const signInWithEmailPassowrd = ({ email, password }: AuthCredentialsProps) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

export const signOutUser = () => {
    return auth.signOut();
};