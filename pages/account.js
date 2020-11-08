import { Container, Tooltip } from "@material-ui/core";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import api from "../src/api";
import useAuth from "../src/useAuth";

export default function Account({ user, data }) {

    return (
        <Container style={{ margin: "2rem", display: "flex", justifyContent: "center" }}>

            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#8884d8" />
                <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
        </Container>
    );
}

export const getServerSideProps = useAuth(async (context, user) => {
    let data = null;
    const res = await api.get(context, "/transactions")
    if (res)
        data = res.data;
    return { props: { user, data } }
})