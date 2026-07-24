import {render,screen} from "@testing-library/react";
import Sidebar from "../components/Sidebar";


test("renders sidebar",()=>{

render(<Sidebar/>);

expect(
screen.getByText(/New/i)
).toBeInTheDocument();

});
