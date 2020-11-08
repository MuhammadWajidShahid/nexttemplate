import MaterialTable from "material-table";
import { getSession, signIn, useSession } from "next-auth/client";
import api from "../src/api";
import redirect from "../src/redirect";

export default function Order({ data }) {
    const [session, loading] = useSession();
    if (!session && !loading) {
        if (window)
            signIn()
        return <div>protected</div>
    }
    return (
        <div style={{ maxWidth: '70%', margin: "0 auto", padding: "15px" }}>
            <MaterialTable
                columns={[
                    { title: 'Cost', field: 'cost' },
                    { title: 'Quantity', field: 'quantity' },
                    { title: 'Product Id', field: 'productId' }
                ]}
                data={data}
                title="Dummy Data"
            />
        </div>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session)
        await redirect(context, `/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}${encodeURIComponent(context.req.url)}`)
    let data = null;
    if (session) {
        const res = await api.get(session, "/transactions")
        if (res)
            data = res.data;
    }
    return {
        props: { session, data }
    }
}