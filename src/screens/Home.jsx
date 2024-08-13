// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = ({ userProfile }) => {

  // const navigate = useNavigate();

  console.log("user profile in home is " + userProfile?.firstName)
  // const token = localStorage.getItem('token');
  // if(!token) {
  //   navigate('/signin');
  // }

  return (
    <>
      <Header />
      {userProfile ? (
        <>
          <h1 className="text-white">{userProfile.firstName}</h1>
          <h1 className="text-white">{userProfile.role}</h1>
        </>
      ) : (
        <h1>User profile is not available</h1>
      )}
    </>
  );
}

export default Home