// import { useContext, useState } from "react";
// import "./login.scss";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//   const [error, setError] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navitage = useNavigate();

//   const { dispatch } = useContext(AuthContext);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN" });
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(userCredential.user);
//         dispatch({ type: "LOGIN", payload: user });
//         navitage("/");
//       })
//       .catch((error) => {
//         setError(true);
//       });
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//         {error && <span>Wrong email or password!</span>}
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import * as Components from "../../Styled/StyledComponent";
import styles, { layout } from "../../style";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
const Login = () => {
  const [hidden, sethidden] = useState(true);
  const [signIn] = React.useState(false);
  const [values, setValues] = useState({ name: "", email: "", pass: "" });
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleSignin = (ev) => {
    ev.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        const user = res.user;
        sethidden(true);
        dispatch({ type: "LOGIN", payload: user });
        console.log(user);
        navigate("/");
      })
      .catch((err) => {
        sethidden(false);
        console.log(
          "Error",
          err,
          "CODE : ",
          err.code,
          "MESSAGE : ",
          err.message
        );
      });

    console.log(auth);
    console.log(values);
  };
  return (
    <section id="lsform" className={`${layout.section} ${styles.flexCenter}  `}>
      <Components.Container>
        <Components.SignInContainer signinin={signIn}>
          <Components.Form>
            <svg
              width="120.76998243117072"
              height="80.009375"
              viewBox="0 0 250 210.95651168546"
              className="css-1j8o68f"
            >
              <defs id="SvgjsDefs1189"></defs>
              <g
                id="SvgjsG1190"
                featurekey="symbolFeature-0"
                transform="matrix(1.7838030244437983,0,0,1.7838030244437983,67.9718159816214,-14.787727004592403)"
                fill="rgb(43 108 255)"
              >
                <title xmlns="http://www.w3.org/2000/svg">
                  Rainy Day - 25 Icon Set - Expanded - 64 - Stroke 1.5 - 2020
                  [Recovered]
                </title>
                <g xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                  <path d="M32,49.07A12.13,12.13,0,0,1,19.89,37c0-6.36,10.82-22.69,11.28-23.38L32,12.33l.83,1.25c.46.69,11.28,17,11.28,23.38A12.13,12.13,0,0,1,32,49.07ZM32,16c-3.44,5.35-10.11,16.61-10.11,21a10.11,10.11,0,1,0,20.22,0C42.11,32.57,35.44,21.31,32,16Z"></path>
                  <polygon points="34.11 28.95 32.69 27.53 42.23 18 56.32 18 56.32 20 43.05 20 34.11 28.95"></polygon>
                  <path d="M50.07,15.64H42.73V8.29h7.34Zm-5.34-2h3.34V10.29H44.73Z"></path>
                  <path d="M52.23,48.32H44.89V41h7.34Zm-5.34-2h3.34V43H46.89Z"></path>
                  <rect x="52.96" y="8.29" width="5.68" height="2"></rect>
                  <rect x="52.96" y="10.83" width="5.68" height="2"></rect>
                  <rect x="54" y="43" width="6" height="2"></rect>
                  <rect x="52.96" y="13.64" width="5.68" height="2"></rect>
                  <rect x="54" y="46" width="6" height="2"></rect>
                  <path d="M12.18,19.19H4.83V11.84h7.35Zm-5.35-2h3.35V13.84H6.83Z"></path>
                  <path d="M21.58,58.82H14.23V51.47h7.35Zm-5.35-2h3.35V53.47H16.23Z"></path>
                  <rect x="15.07" y="13.84" width="5.68" height="2"></rect>
                  <rect x="15.07" y="16.38" width="5.68" height="2"></rect>
                  <polygon points="27.01 31.88 16.8 23.61 7.48 23.61 7.48 21.61 17.5 21.61 28.27 30.32 27.01 31.88"></polygon>
                  <polygon points="16.96 50.54 6.73 50.54 6.73 48.54 16.12 48.54 26.09 38.4 27.51 39.8 16.96 50.54"></polygon>
                  <rect x="3.94" y="54.57" width="8.08" height="2"></rect>
                  <polygon points="58.32 51.2 44.39 51.2 34.91 39.74 36.45 38.46 45.33 49.2 58.32 49.2 58.32 51.2"></polygon>
                </g>
              </g>
              <g
                id="SvgjsG1191"
                featurekey="nameFeature-0"
                transform="matrix(2.143308088240873,0,0,2.143308088240873,-3.9305574605802156,81.62260549029088)"
                fill="rgb(43 108 255)"
              >
                <path d="M8.76 13.84 c0.04 -0.12 0.12 -0.24 0.28 -0.24 l4.96 0 c0.16 0 0.24 0.12 0.28 0.24 l6.92 25.72 c0.04 0.24 -0.12 0.44 -0.36 0.44 l-4.56 0 c-0.12 0 -0.24 -0.08 -0.28 -0.24 l-1.56 -5.6 l-5.84 0 l-1.52 5.6 c-0.04 0.16 -0.12 0.24 -0.28 0.24 l-4.6 0 c-0.24 0 -0.4 -0.2 -0.36 -0.44 z M9.88 29.2 l3.32 0 l-1.72 -6.04 z M16.04 31.560000000000002 l1.84 6 c0.08 0.24 0.52 0.2 0.4 -0.12 l-6.4 -21.28 c-0.12 -0.52 -0.8 -0.56 -0.92 0 l-6.2 21.28 c-0.12 0.28 0.32 0.4 0.44 0.16 l1.76 -6.04 l9.08 0 z M7.08 31.04 l4.36 -14.72 l4.44 14.72 l-8.8 0 z M35.949 13.239999999999998 c5.52 0 9.08 2.2 9.08 8.28 l0 10.52 c0 4.52 -1.68 7.28 -6.44 8.2 l0 2.48 c0 0.2 -0.2 0.4 -0.4 0.4 l-4.56 0 c-0.2 0 -0.4 -0.2 -0.4 -0.4 l0 -2.48 c-4.48 -0.84 -6.48 -3.48 -6.48 -8.2 l0 -10.52 c0 -5.92 3.24 -8.28 9.2 -8.28 z M39.748999999999995 30.759999999999998 l0 -7.92 c0 -3.52 -1.92 -4.24 -3.6 -4.24 l-0.52 0 c-2.48 0 -3.56 1.64 -3.56 4.24 l0 7.92 c0 3.48 1.92 4.24 3.56 4.24 l0.52 0 c2.48 0 3.6 -1.68 3.6 -4.24 z M30.788999999999998 36.24 c1.04 1.12 2.64 1.68 4.6 1.68 l0.2 0 l0 2.6 c0 0.28 0.4 0.32 0.4 0 l0 -2.6 l0.4 0 c3.8 0 6.24 -2.4 6.24 -6.2 l0 -9.92 c0 -4.08 -2.16 -6.28 -6.24 -6.28 l-1 0 c-4.12 0 -6.24 2.2 -6.24 6.28 l0 9.92 c0 1.88 0.52 3.44 1.64 4.52 z M36.388999999999996 37.4 l-1 0 c-1.84 0 -3.32 -0.48 -4.24 -1.48 c-1 -1 -1.56 -2.4 -1.56 -4.2 l0 -9.92 c0 -3.8 2.04 -5.8 5.8 -5.8 l1 0 c3.84 0 5.76 1.96 5.76 5.8 l0 9.92 c0 1.68 -0.56 3.2 -1.6 4.24 c-1.08 0.88 -2.52 1.44 -4.16 1.44 z M65.458 30.759999999999998 l0 -16.8 c0 -0.2 0.16 -0.36 0.36 -0.36 l4.56 0 c0.2 0 0.36 0.16 0.36 0.36 l0 18.08 c0 5.76 -3.16 8.36 -9.12 8.36 c-5.64 0 -9.16 -2.24 -9.16 -8.36 l0 -18.08 c0 -0.2 0.16 -0.36 0.36 -0.36 l4.6 0 c0.2 0 0.36 0.16 0.36 0.36 l0 16.8 c0 3.48 1.96 4.24 3.6 4.24 l0.48 0 c2.48 0 3.6 -1.68 3.6 -4.24 z M54.937999999999995 16.16 l0 15.56 c0 3.6 2.44 6.2 6.24 6.2 l1 0 c3.8 0 6.28 -2.72 6.28 -6.2 l0 -15.56 c0 -0.36 -0.48 -0.4 -0.48 0 l0 15.56 c0 3.28 -2.36 5.68 -5.8 5.68 l-1 0 c-3.36 0 -5.76 -2.16 -5.76 -5.68 l0 -15.56 c0 -0.36 -0.48 -0.36 -0.48 0 z M83.687 13.84 c0.04 -0.12 0.12 -0.24 0.28 -0.24 l4.96 0 c0.16 0 0.24 0.12 0.28 0.24 l6.92 25.72 c0.04 0.24 -0.12 0.44 -0.36 0.44 l-4.56 0 c-0.12 0 -0.24 -0.08 -0.28 -0.24 l-1.56 -5.6 l-5.84 0 l-1.52 5.6 c-0.04 0.16 -0.12 0.24 -0.28 0.24 l-4.6 0 c-0.24 0 -0.4 -0.2 -0.36 -0.44 z M84.80699999999999 29.2 l3.32 0 l-1.72 -6.04 z M90.96699999999998 31.560000000000002 l1.84 6 c0.08 0.24 0.52 0.2 0.4 -0.12 l-6.4 -21.28 c-0.12 -0.52 -0.8 -0.56 -0.92 0 l-6.2 21.28 c-0.12 0.28 0.32 0.4 0.44 0.16 l1.76 -6.04 l9.08 0 z M82.00699999999999 31.04 l4.36 -14.72 l4.44 14.72 l-8.8 0 z M111.476 23.8 c3.04 1.44 7 3.72 7 7.84 c0 1.2 -0.2 3.52 -1.52 5.48 c-1.48 2.2 -3.8 3.28 -7 3.28 c-3.4 0 -7.36 -1.64 -8.6 -5.36 c-0.04 -0.12 0 -0.24 0.12 -0.32 l3.68 -3.16 c0.16 -0.12 0.4 -0.12 0.52 0.08 c0.08 0.2 0.24 0.52 0.44 0.92 c0.6 1.24 2.04 2.48 3.64 2.48 c1.24 0 2.92 -0.68 2.92 -2.6 c0 -1.84 -2.52 -2.88 -4.08 -3.48 c-1.8 -0.72 -3.64 -1.64 -5.2 -3 c-1.64 -1.52 -2.44 -3.2 -2.44 -5.2 c0 -5 4.6 -7.52 8.96 -7.52 c3.44 0 6 1.8 7.68 5.36 c0.08 0.16 0 0.36 -0.12 0.44 l-3.56 2.48 c-0.16 0.08 -0.24 0.08 -0.4 -0.12 c-1.36 -1.96 -2.56 -2.88 -4.16 -2.88 c-0.84 0 -2.8 0.32 -2.8 1.8 c0 1.8 3.32 2.72 4.92 3.48 z M104.196 34.84 c1 2 3.76 3.16 6 3.16 c2.92 0 5.28 -2 5.6 -5.04 c0.4 -3.72 -2.52 -5.32 -5.4 -6.76 l-1.28 -0.56 c-2.96 -1.32 -5.12 -2.32 -5.12 -5.08 c0 -3.04 2.8 -4.44 5.56 -4.44 c2.52 0 3.84 1.48 4.52 2.4 c0.24 0.32 0.64 0.04 0.4 -0.28 c-0.68 -0.84 -2.12 -2.6 -4.92 -2.6 c-3.16 0 -6.04 1.56 -6.04 4.92 c0 3 2.4 4.16 5.44 5.56 l1.24 0.6 c3.96 1.88 5.4 3.64 5.08 6.2 c-0.6 4.08 -3.72 4.6 -5.08 4.6 c-3 0 -5 -1.8 -5.6 -2.92 c-0.2 -0.2 -0.48 0 -0.4 0.24 z"></path>
              </g>
            </svg>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              autoComplete=""
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Components.Input
              autoComplete=""
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, pass: e.target.value }))
              }
            />
            <Components.ParagraphError hidden={hidden}>
              Wrong Email and Password
            </Components.ParagraphError>
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={handleSignin}>
              Sigin In
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinin={signIn}>
          <Components.RightOverlayPanel signinin={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
          </Components.RightOverlayPanel>
        </Components.OverlayContainer>
      </Components.Container>
    </section>
  );
};

export default Login;
