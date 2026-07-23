import { render } from "@testing-library/react";
import Videos from "../components/Videos";

test("renders Videos component",()=>{

render(
<Videos videos={[]} />
);

});
