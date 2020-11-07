import { getSession } from 'next-auth/client'
import api from '../src/api';
import redirect from '../src/redirect';
function Dashboard({ session }) {
    if (!session)
        return <div>protected</div>
    return (
        <div>
            You are able to see this because you are signed in
        </div>
    )
}
export default Dashboard;
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session)
        await redirect(context, "/")
    if (session) {
        const res = await api.get(session, "/products")
        if (res)
            console.log(res.data)
    }
    return {
        props: { session }
    }
}