import { useEffect, useMemo, useState } from "react";
import api from "./axiosConfig";

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { Tasks } from "./components/Tasks";
import { Loader } from "./components/Loader";

import styles from "./styles/app.module.css";

const LOCALSTORAGE_MEMBERS_KEY = "leetcode-members";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [loggedInUserLeetcodeProfile, setLoggedInUserLeetcodeProfile] =
    useState({});
  const [dataLoading, setDataLoading] = useState(false);

  const onRemoveTask = (memberId) => {
    setMembers((currentState) =>
      currentState.filter((member) => member.id !== memberId)
    );
  };

  const submitMember = async (newMemberRequest) => {
    setDataLoading(true);
    const leetcodeMembers = [...members, newMemberRequest];
    getUsersLeetcodeProfile(leetcodeMembers).then((data) => {
      if (leetcodeMembers.length === data.response.length) {
        const updatedLeetcodeMembers = leetcodeMembers.map(
          (currentValue, index) => {
            return { ...currentValue, data: data.response[index].data };
          }
        );
        setMembers(updatedLeetcodeMembers);
      }
      setDataLoading(false);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_MEMBERS_KEY, JSON.stringify(members));
    }
  }, [members]);

  useEffect(() => {
    const membersLocal = localStorage.getItem(LOCALSTORAGE_MEMBERS_KEY);
    membersLocal && setMembers(JSON.parse(membersLocal));
    setIsLoading(false);
  }, []);

  const totalMembers = useMemo(() => {
    return members.length;
  }, [members]);

  const getUsersLeetcodeProfile = async (membersList) => {
    const url = `/api/get-all-members-leetcode-profile`;
    const request = membersList;
    return api
      .post(url, request)
      .then((res) => res.data)
      .catch((err) => {
        alert(err);
      });
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

        <Form onSubmit={submitMember} />

        {dataLoading ? (
          <Loader />
        ) : (
          <>
            <Tasks
              onRemoveTask={onRemoveTask}
              members={members}
              loggedInUserLeetcodeProfile={loggedInUserLeetcodeProfile}
            />
            <footer className={styles.footer}>
              <h6>
                Total users:
                <span>{totalMembers}</span>
              </h6>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
