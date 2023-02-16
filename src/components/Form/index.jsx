import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FaPlus } from "react-icons/fa";

import { Input } from "../Input";
import { SuccessToast } from "../SuccessToast";
import styles from "./index.module.css";
import { useEffect } from "react";
const LOCALSTORAGE_MEMBERS_KEY = "leetcode-members";

export function Form({ onSubmit }) {
  const [member, setMember] = useState("");
  const [memberExist, setMemberExist] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedMembers = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_MEMBERS_KEY)
    ) || [];

    let memberAlreadyExist = false;
 
    storedMembers.forEach((x) => {
      if (member.toUpperCase() === x.member.toUpperCase()) {
        memberAlreadyExist = true;
        setMemberExist(true);
      }
    });

    if (!!member && !memberAlreadyExist) {
      const newMember = {
        id: uuid(),
        member: member,
        data: null,
      };

      onSubmit(newMember);
      setMemberExist(false);
      setMember("");
    }
  };

  useEffect(() => {
    setMemberExist(false);
  }, [member]);

  return (
    <>
      {memberExist && <SuccessToast />}

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          value={member}
          placeholder="Name of Leetcode user"
          onChange={(event) => setMember(event.target.value)}
        />

        <button
          type="submit"
          disabled={member === ""}
          className={styles.form__button}
        >
          Add
        </button>
      </form>
    </>
  );
}
