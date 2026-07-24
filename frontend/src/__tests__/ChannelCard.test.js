import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ChannelCard from "../components/ChannelCard";


const channel = {
    id: {
        channelId: "123"
    },

    snippet: {
        title: "Test Channel",

        thumbnails: {
            medium: {
                url: "test.jpg"
            }
        }
    },

    statistics: {
        subscriberCount: "1000"
    }
};


test("renders channel card", () => {

    render(
        <BrowserRouter>
            <ChannelCard channel={channel}/>
        </BrowserRouter>
    );


    expect(
        screen.getByRole("img")
    ).toBeInTheDocument();

});
