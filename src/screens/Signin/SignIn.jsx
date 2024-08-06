import { Button } from "antd";
import './SignIn.css';
import { useCallback, useState } from "react";
import { useUserSignin } from "../../hooks/mutations/user";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const { mutateAsync: signinUserAsync } = useUserSignin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem('token');
  if(token) {
    navigate('/');
  }
  
  const handleFormSubmit = useCallback( async (e) => {
    e.preventDefault();
    const response = await signinUserAsync({ email, password });
    console.log("Response from custom hook", response)
    navigate('/');
    window.location.reload();
  }, [email, password, signinUserAsync, navigate])

  return (
    <div className="wrapper">
      <div className="from-container">
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Enter your email address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Enter your password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button disabled={!email || !password} type="primary" htmlType="submit" style={{ width: '100%' }}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
