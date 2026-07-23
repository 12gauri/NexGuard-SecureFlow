import {render,screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import SearchBar from "../components/SearchBar";


test("renders search bar",()=>{

render(
<BrowserRouter>
<SearchBar/>
</BrowserRouter>
);


expect(
screen.getByRole("textbox")
).toBeInTheDocument();

});
