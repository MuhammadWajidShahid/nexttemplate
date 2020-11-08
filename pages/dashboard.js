import api from '../src/api';
import useAuth from '../src/useAuth';

function Dashboard({ user, data }) {
    console.log(user, data)
    return (
        <div>
            You are able to see this because you are signed in
        </div>
    )
}
export default Dashboard;
export const getServerSideProps = useAuth(async function (context, user) {
    const res = await api.get(context, "/products")
    
    return {
        props: { user, data: res?.data }
    }
})