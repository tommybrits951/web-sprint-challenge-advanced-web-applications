import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import Spinner from "./Spinner";


describe("Check to see if Spinner renders on login", () => {
  test("spinner renders at login", () => {
    render(<Spinner on={true} />)
    const icon = screen.getByText('Please wait...')
    expect(icon).toBeTruthy()
  })
  test('spinner off', () => {
    render(<Spinner on={false} />)
    const icon = screen.queryAllByText('Please wait...')
    
    expect(icon).toHaveLength(0)

})
})