import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  background-repeat: no-repeat;
  background-size: cover;

  .logo-image {
    position: relative;
    width: 330px;
    height: 120px;
    top: 18%;
    right: 15%;
    margin-top: -70%;
    margin-left: -120px;
  }

  .background-bar {
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .form-container {
    display: flex;
    flex-direction: row;
    width: 350px;
    height: 300px;
    background: ${(props) => props.theme.colors.white};
    // box-shadow: 0px 9px 30px rgba(162, 160, 160, 0.07);
    // border-radius: 6.5px;
    // padding: 15px;
    left: 2%;
    position: absolute;
    margin-top: 170px;
    margin-left: 70%;
    background: transparent;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    margin-left: -10px;
    margin-top: 20%;
    position: absolute;
    z-index: 1;
  }

  .password-show {
    position: absolute;
    left: 255px;
    cursor: pointer;
    top: 45px;
    height: 13px;
  }

  // .where-to-find img{
  //     align-items: center;
  //     position: relative;
  //     display: flex;
  //     left: 68%;
  //     top: 35px;
  //     z-index: 1;
  // }

  .title-two {
    float: right;
    display: flex;
    flex-direction: row;
    margin: 22px;
    z-index: 1;
  }

  .phrase-head img {
    align-items: center;
    position: absolute;
    display: flex;
    left: 50px;
    margin-top: 32px;
    z-index: 1;
    flex-direction: row;
  }

  // .icons-midia{
  //     display: flex;
  //     align-items: center;
  //     float: right;
  //     z-index: 1;
  //     margin: 0px;
  //     z-index: 1;
  // }

  .hollow-circle img {
    text-align: center;
    position: absolute;
    bottom: 0px;
    width: 12%;
    right: 78%;
    margin-bottom: 28%;
    z-index: 1;
  }

  .oca-image img {
    text-align: center;
    position: absolute;
    bottom: 0px;
    width: 20%;
    right: 30%;
    z-index: 1;
  }

  .circle-blue img {
    text-align: center;
    position: absolute;
    flex-direction: row;
    bottom: 0px;
    width: 6%;
    right: 0px;
    margin-bottom: 50px;
    z-index: 1;
  }

  .image-one img {
    display: flex;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20.1%;
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .image-two img {
    margin-top: 0px;
    position: absolute;
    display: flex;
    left: 20%;
    bottom: 0px;
    width: 40.3%;
    height: 100%;
  }

  .image-three img {
    margin-left: 0;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20.1%;
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    animation-name: slideIn;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-delay: -1s;
  }

  .image-four img {
    margin-top: 0px;
    margin-bottom: 0px;
    position: absolute;
    left: 20%;
    right: 0px;
    bottom: 0px;
    width: 40.3%;
    height: 100%;
    animation-name: slideIn;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-delay: -2s;
  }

  .image-five img {
    margin-left: 0;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20.1%;
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    animation-name: slideIn;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-delay: -4s;
  }

  .image-six img {
    margin-top: 0px;
    margin-bottom: 0px;
    position: absolute;
    left: 20%;
    right: 0px;
    bottom: 0px;
    width: 40.3%;
    height: 100%;
    animation-name: slideIn;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-delay: -2s;
  }

  .image-seven img {
    margin-left: 0;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20.1%;
    height: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    // animation-name: slideIn;
    // animation-duration: 4s;
    // animation-iteration-count: infinite;
    // animation-delay: -5s;
  }

  .image-eigth img {
    margin-top: 0px;
    margin-bottom: 0px;
    position: absolute;
    left: 20%;
    right: 0px;
    bottom: 0px;
    width: 40.3%;
    height: 100%;
    animation-name: slideIn;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }

  .icon-info img {
    text-align: center;
    position: absolute;
    top: 70%;
    width: -30%;
    left: 0px;
    margin-bottom: 28%;
    z-index: 1;
  }

  .icon-info-ods img {
    text-align: center;
    position: absolute;
    top: 85%;
    width: -30%;
    left: 0px;
    z-index: 1;
  }

  .background-bar {
    background: #326ebe;
    z-index: 1;
  }

  @keyframes slideIn {
    0% {
      // transform: translateX(0);
      opacity: 0;
    }
    50% {
      // transform: translateX(0);
      opacity: 1;
    }
    100% {
      // transform: translateX(0);
      opacity: 0;
    }
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .blinking-text {
    animation: blink 2s infinite;
  }

  .error-input {
    outline: none;
    box-shadow: 0 0 3px 1px red;
  }
`;
