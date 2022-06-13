import React from "react";

import { 
  render, cleanup,  waitForElement, fireEvent, getByText, prettyDOM, 
  getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";


import Application from "components/Application";
import axios from "axios";

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const interview = getAllByTestId(container, "appointment").find(a => queryByText(a, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(interview, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(interview, "Are you really really sure??")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    // 6. Check that the element with the text "Deleting" is displayed.
    fireEvent.click(getByText(interview, "Yes"));
    expect(getByText(interview, "Deleting...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(interview, "Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(d => getByText(d, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

});

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. render the application component
    const { container } = render(<Application />);

    // 2. wait until "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const interview = getAllByTestId(container, "appointment").find(a => queryByText(a, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(d => getByText(d, "Monday"));
  
    // 3. click the edit button
    fireEvent.click(getByAltText(interview, "Edit"));

    // 4. update the value to "Fjord Windstar"
    const input = getByPlaceholderText(interview, "Enter Student Name" );

    fireEvent.change(input, { target: { value: "Fjord Windstar" }});
    fireEvent.click(getByAltText(interview, "Sylvia Palmer"));

    // 5. click the save button
    fireEvent.click(getByText(interview, "Save"));
    
    // 6. confirm the 'Saving...' element is displayed 
    expect(getByText(interview, "Saving...")).toBeInTheDocument();

    // 7. wait until the interview with "Fjord Windstar" is displayed
    await waitForElement(() => getByText(interview, "Fjord Windstar"));

   // 8. check that the DayListItem with the text "Monday" has not changed".
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
})

  it("shows the save error when failing to save an appointment", () => {
    // const axiosFakeFail = jest.fn((url) => {
    //   return axios.put
    // })

    // const { container } = render(<Application />);

    // const appointments = getAllByTestId(container, "appointment");
    // const appointment = appointments[0];  //use this scope our tests to the first appointment node

    // fireEvent.click(getByAltText(appointment, "Add"));  //pass appointment as the 'container' 
    // const input = getByPlaceholderText(appointment, "Enter Student Name" );

    // fireEvent.change(input, { target: { value: "Fjord Windstar" }});
    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // fireEvent.click(getByText(appointment, "Save"));

    // axios.reject("string of literal garbage");
    // console.log(prettyDOM(container));
  });


});
