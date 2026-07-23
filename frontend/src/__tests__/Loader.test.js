import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader";


test("renders loader component",()=>{

    render(<Loader/>);

    const loader = screen.getByRole("progressbar");

    expect(loader).toBeInTheDocument();

});
