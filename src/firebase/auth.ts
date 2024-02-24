
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

export const signInWithEmailPassowrd = async ({ email, password }: AuthCredentialsProps) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.log('Error', error)
        return null;
    }
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const user = await signInWithPopup(auth, provider);
        return user;
    } catch (error) {
        console.log('Error', error)
        return null;
    }

};

export const signOutUser = () => {
    return auth.signOut();
};