import { useEffect } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const data=localStorage.getItem("token");
  const Navigate=useNavigate();
  useEffect(() => {
    if (!data) {
      Navigate("/login");
    }
  }, [data, Navigate]);
  return (
    <div className="container my-3">
      
      <AddNote  showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}></Notes>
    </div>
  );
}

export default Home;
