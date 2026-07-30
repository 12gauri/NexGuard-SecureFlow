import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ChannelDetail from "../components/ChannelDetail";


test("renders ChannelDetail component",()=>{


render(

<BrowserRouter

future={{

v7_startTransition:true,

v7_relativeSplatPath:true

}}

>


<ChannelDetail/>


</BrowserRouter>


);


});
