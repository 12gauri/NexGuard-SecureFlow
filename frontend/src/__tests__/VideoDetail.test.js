import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import VideoDetail from "../components/VideoDetail";


test("renders VideoDetail component",()=>{


render(

<BrowserRouter

future={{

v7_startTransition:true,

v7_relativeSplatPath:true

}}

>


<VideoDetail/>


</BrowserRouter>


);


});
