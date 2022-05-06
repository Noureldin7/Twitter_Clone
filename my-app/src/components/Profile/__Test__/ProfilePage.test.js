import "@testing-library/jest-dom";
import { render, screen, container, fireEvent } from "@testing-library/react";
import ProfilePage from "../ProfilePage";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

describe("Edit Profile Test", () => {
  //if (screen.queryByTestId("Edit-Profile-Button"))
  {
    // Test Name

    it("Should open edit profile pop up and Change Name.", () => {
      setTimeout(
        render(
          <MemoryRouter initialEntries={["/Profile/626554804da8e6986213b877"]}>
            <ProfilePage />
          </MemoryRouter>
        ),
        3000
      );
      screen.debug();
      let userID = localStorage.getItem("userId");

      console.log(userID);
      const buttonElement = screen.queryByTestId("Edit-Profile-Button");
      const SaveElement = screen.queryByText(/Save/i);
      const NameElement = screen.queryByTestId("Edit-Profile-Name-Element");

      expect(NameElement).toBeInTheDocument();

      fireEvent.click(buttonElement);
      expect(SaveElement).toBeInTheDocument();

      const editProfileNameElement = screen.queryByTestId("editProfile-Name");
      expect(editProfileNameElement).toBeInTheDocument();
      fireEvent.change(editProfileNameElement, { target: { value: "Karim" } });
      expect(editProfileNameElement.value).toBe("Karim");

      fireEvent.click(SaveElement);
      expect(SaveElement).not.toBeVisible();
      expect(NameElement.innerHTML).toBe("Karim");
    });

    // Test Empty Name
    it("Should open edit profile pop up and Change to Empty Name.", () => {
      setTimeout(
        render(
          <MemoryRouter initialEntries={["/Profile/626554804da8e6986213b877"]}>
            <ProfilePage />
          </MemoryRouter>
        ),
        3000
      );
      const buttonElement = screen.queryByTestId("Edit-Profile-Button");
      const SaveElement = screen.queryByText(/Save/i);
      const NameElement = screen.queryByTestId("Edit-Profile-Name-Element");
      expect(NameElement).toBeInTheDocument();
      fireEvent.click(buttonElement);
      expect(SaveElement).toBeInTheDocument();

      const editProfileNameElement = screen.queryByTestId("editProfile-Name");
      expect(editProfileNameElement).toBeInTheDocument();
      fireEvent.change(editProfileNameElement, { target: { value: "" } });
      expect(editProfileNameElement.value).toBe("");

      fireEvent.click(SaveElement);
      expect(SaveElement).toBeInTheDocument();
    });

    // Test Bio
    it("Should open edit profile pop up and Change Bio.", () => {
      setTimeout(
        render(
          <MemoryRouter initialEntries={["/Profile/626554804da8e6986213b877"]}>
            <ProfilePage />
          </MemoryRouter>
        ),
        3000
      );
      const buttonElement = screen.queryByTestId("Edit-Profile-Button");
      const SaveElement = screen.queryByText(/Save/i);

      const BioElement = screen.queryByTestId("Edit-Profile-Bio-Element"); //Data rendered in profile page

      expect(BioElement).toBeInTheDocument();

      fireEvent.click(buttonElement);
      expect(SaveElement).toBeInTheDocument();

      const editProfileBioElement = screen.queryByTestId("editProfile-Bio");
      expect(editProfileBioElement).toBeInTheDocument();
      fireEvent.change(editProfileBioElement, {
        target: { value: "Hello World" },
      });
      expect(editProfileBioElement.value).toBe("Hello World"); // Data in text field

      fireEvent.click(SaveElement);
      expect(SaveElement).not.toBeVisible();
      expect(BioElement.innerHTML).toBe("Hello World"); // Data changed in profile page
    });

    // Test Location
    it("Should open edit profile pop up and Change Location.", () => {
      setTimeout(
        render(
          <MemoryRouter initialEntries={["/Profile/626554804da8e6986213b877"]}>
            <ProfilePage />
          </MemoryRouter>
        ),
        3000
      );
      const buttonElement = screen.queryByTestId("Edit-Profile-Button");
      const SaveElement = screen.queryByText(/Save/i);

      const LocationElement = screen.queryByTestId(
        "Edit-Profile-Location-Element"
      ); //Data rendered in profile page

      expect(LocationElement).toBeInTheDocument();

      fireEvent.click(buttonElement);
      expect(SaveElement).toBeInTheDocument();

      const editProfileLocationElement = screen.queryByTestId(
        "editProfile-Location"
      );
      expect(editProfileLocationElement).toBeInTheDocument();
      fireEvent.change(editProfileLocationElement, {
        target: { value: "Hello World" },
      });
      expect(editProfileLocationElement.value).toBe("Hello World"); // Data in text field

      fireEvent.click(SaveElement);
      expect(SaveElement).not.toBeVisible();
      expect(LocationElement.innerHTML).toContain("Hello World"); // Data changed in profile page
    });

    // Test Website
    it("Should open edit profile pop up and Change Website.", () => {
      setTimeout(
        render(
          <MemoryRouter initialEntries={["/Profile/626554804da8e6986213b877"]}>
            <ProfilePage />
          </MemoryRouter>
        ),
        3000
      );
      const buttonElement = screen.queryByTestId("Edit-Profile-Button");
      const SaveElement = screen.queryByText(/Save/i);

      const WebsiteElement = screen.queryByTestId(
        "Edit-Profile-Website-Element"
      ); //Data rendered in profile page

      expect(WebsiteElement).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
      fireEvent.click(buttonElement);
      expect(SaveElement).toBeInTheDocument();

      const editProfileWebsiteElement = screen.queryByTestId(
        "editProfile-Website"
      );
      expect(editProfileWebsiteElement).toBeInTheDocument();
      fireEvent.change(editProfileWebsiteElement, {
        target: { value: "Hello World" },
      });
      expect(editProfileWebsiteElement.value).toBe("Hello World"); // Data in text field

      fireEvent.click(SaveElement);
      expect(SaveElement).not.toBeVisible();
      expect(WebsiteElement.innerHTML).toContain("Hello World"); // Data changed in profile page
    });
    //} else {
    // const FollowElement = screen.queryByTestId("Follow-Profile-Button");
    // const FollowersElement = screen.queryByTestId("Followers-Profile");
    // if (screen.queryByText("Follow")) {
    //   // Test Follow
    //   it("Should open edit profile pop up and Change Followers up.", () => {
    //     render(<MockProfilePage />);
    //     expect(FollowElement).toBeInTheDocument();
    //     fireEvent.click(FollowElement);
    //   });
    // } else if (screen.queryAllByAltText("Unfollow"))
    //   // Test UnFollow
    //   it("Should open edit profile pop up and Change Followers down.", () => {
    //     render(<MockProfilePage />);
    //     expect(FollowElement).toBeInTheDocument();
    //     fireEvent.click(FollowElement);
    //     const CheckElement = screen.getAllByText("Unfollow");
    //     expect(CheckElement).toBeInTheDocument();
    //     const unFollowButton = screen.queryByTestId("Follow-Profile-Pop-Button");
    //   });
  }
});