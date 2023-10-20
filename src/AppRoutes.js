import {Home} from "./component/Home"
import {Login} from "./component/Login"
import {Reg} from "./component/Reg"
import {Faq} from "./component/Faqs"
import {News} from "./component/News"

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        index: '/login',
        element: <Login />
    },
    {
        index: '/reg',
        element: <Reg />
    },
    {
        index: '/faq',
        element: <Faq />
    },
    {
        index: '/news',
        element: <News />
    },
];

export default AppRoutes;
