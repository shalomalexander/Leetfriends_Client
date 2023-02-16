import { useState } from "react";
// import api from "../../axiosConfig";
import { Input } from "../../components/Input";
import styles from "./index.module.css";

export function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (e) => {
    const val = e.target.value;
    if (val.length > 10) return;
    if (e.target.validity.valid) setPhoneNumber(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = { phoneNumber };
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
              value={phoneNumber}
              placeholder="Enter your 10 digit phone number"
              onChange={(event) => handlePhoneNumberChange(event)}
              pattern="^-?[0-9]\d*\.?\d*$"
            />

            <button
              type="submit"
              disabled={phoneNumber.length !== 10}
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
