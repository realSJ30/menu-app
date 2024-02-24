
import { IOptions, ItemColumn } from "@/global.types";
import { push, ref, remove, set, update } from "firebase/database";
import { db } from "./firebase.config";


interface DataProps {
    data: ItemColumn | IOptions;
    path: string;
}

export const pushData = ({ data, path }: DataProps) => {
    const dataRef = ref(db, path);
    const newData = push(dataRef);
    set(newData, data).catch((err) => {
        console.log(err);
    });
};

export const updateData = ({ data, path }: DataProps) => {
    const dataRef = ref(db, path);
    update(dataRef, data).catch((error) => {
        console.log(error);
    });
};

export const removeData = ({ path }: { path: string }) => {
    const dataRef = ref(db, path);
    remove(dataRef).catch((err) => {
        console.log(err);
    });
};
