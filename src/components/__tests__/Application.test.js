import React from "react";

import { 
  render, cleanup,  waitForElement, fireEvent, getByText, prettyDOM, 
  getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";


import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {


  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];  //use this scope our tests to the first appointment node

    fireEvent.click(getByAltText(appointment, "Add"));  //pass appointment as the 'container' 
    const input = getByPlaceholderText(appointment, "Enter Student Name" );

    fireEvent.change(input, { target: { value: "Fjord Windstar" }});
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));
    expect(getByText(appointment, "Fjord Windstar")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(d => queryByText(d, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  })

});

