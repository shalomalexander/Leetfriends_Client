import { useState } from "react";
// import api from "../../axiosConfig";

import { Input } from "../../components/Input";
import styles from "./index.module.css";

export function Otp() {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (e) => {
    const val = e.target.value;
    if (val.length > 4) return;
    if (e.target.validity.valid) setOtp(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { otp };
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.display_row}>
          <img
            className={styles.main_icon}
            src="src\asset\img\leetfriends_icon.svg"
            alt=""
          />
          <h1>Leetfriends</h1>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="tel"
              value={otp}
              placeholder="Enter your 4 digit OTP"
              onChange={(event) => handleOtpChange(event)}
              pattern="^-?[0-9]\d*\.?\d*$"
            />

            <button
              type="submit"
              disabled={otp.length !== 4}
              className={styles.form__button}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
