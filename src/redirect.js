import Router from "next/router";

export default async (context, target) => {
    if (context.res) {
        // server
        // 303: "See other"
        context.res.setHeader('Location', target);
        context.res.statusCode = 303;

    } else {
        // In the browser, we just pretend like this never even happened ;)
        await Router.replace(target);
    }
};