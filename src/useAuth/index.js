import api from "../api"

export default function useAuth(callBack) {
    return async function (context) {
        const user = await api.get(context, "/products");
        if (user) {
            const props = await callBack(context, user?.data)
            return props;
        }
        return { props: {} };
    }
} 