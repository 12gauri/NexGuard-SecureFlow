import {render,screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import VideoCard from "../components/VideoCard";


const video={
id:{
videoId:"123"
},
snippet:{
title:"Test Video",
channelTitle:"Test Channel",
thumbnails:{
medium:{
url:"test.jpg"
}
}
}
};


test("renders video card",()=>{

render(
<BrowserRouter>
<VideoCard video={video}/>
</BrowserRouter>
);


expect(
screen.getByText("Test Video")
).toBeInTheDocument();

});
