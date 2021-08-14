import Club from "../components/Club";
import Room from "../components/Room";

export const routerSetting=[
    {
        path: "/",
        exact: true,
        children: <Room />
    },
    {
        path: "/club",
        exact: false,
        children: <Club />
    },
]