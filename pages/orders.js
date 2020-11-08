import MaterialTable from "material-table";
import api from "../src/api";
import Link from "../src/Link";
import useAuth from "../src/useAuth";

export default function Order({ data }) {

    return (
        <div style={{ maxWidth: '70%', margin: "0 auto", padding: "15px" }}>
            <MaterialTable
                columns={[
                    { title: 'ID', field: 'id', render: rowData => <Link href={{ pathname: "/orders/[orderid]", query: { orderid: `${rowData.id}` } }} style={{ color: "blue" }}>{rowData.id}</Link> },
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
export const getServerSideProps = useAuth(async (context, user) => {
    let data = null;
    const res = await api.get(context, `/transactions`)
    if (res)
        data = res.data;
    return {
        props: { user, data }
    }
})