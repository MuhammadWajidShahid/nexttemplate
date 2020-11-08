import Router from "next/router";

export default async function Redirect (context, target) {
    if (context && context.res) {
        // server
        // 303: "See other"
        await context.res.setHeader('Location', target);
        context.res.statusCode = 303;
        return;

    } else {
        // In the browser, we just pretend like this never even happened ;)
        await Router.replace(target);
    }
};