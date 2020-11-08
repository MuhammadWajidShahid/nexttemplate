import { useState, useEffect } from "react"
import api from "../api";


export default function getUser(context) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async ()=>{
            // I am using /product route for just test purposes. You should add your own route which will return a user data
            const res = await api.getUser(context, "/products")
            setLoading(false);
            setUser(res);
        })()
    })
    return [user, loading];
}