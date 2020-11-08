import api from "../../src/api"
import useAuth from "../../src/useAuth"

export default function Order({ data }) {
    console.log("data", data)
    return (
        <>
            {
                data && data.map((order, index) => {
                    return <div key={index}>
                        <p>Cost :{order.cost}</p>
                        <p>Quantity :{order.quantity}</p>
                        <p>Product Id :{order.productId}</p>
                    </div>
                })
            }
        </>
    )
}
export const getServerSideProps = useAuth(async (context, user) => {
    let data = null;
    const res = await api.get(context, `/transactions?id=${context.query.orderid}`)
    if (res)
        data = res.data;
    return { props: { data } }
})