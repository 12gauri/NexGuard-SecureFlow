import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../components/Navbar";


test("renders navbar",()=>{

render(
<BrowserRouter>
<Navbar/>
</BrowserRouter>
);

});
