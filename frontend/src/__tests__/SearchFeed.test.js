import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import SearchFeed from "../components/SearchFeed";


test("renders SearchFeed component",()=>{


render(

<BrowserRouter

future={{

v7_startTransition:true,

v7_relativeSplatPath:true

}}

>


<SearchFeed/>


</BrowserRouter>


);


});
