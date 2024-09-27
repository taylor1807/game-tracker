import "../styles/NewPostPage.css";
//found this on the reactRouter docs to auto navigate to the homepage after form submission

import { useNavigate } from "react-router-dom";

import GameForm from "../components/GameForm";

export default function NewPostPage() {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      //console.log(formData)
      await fetch("http://localhost:8080/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      //console.log("succesfull")
      navigate("/");
    } catch (error) {
      console.error("there was a problem submitting the form:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add A New Game</h1>
      <GameForm onSubmit={handleFormSubmit} />
    </div>
  );
}
