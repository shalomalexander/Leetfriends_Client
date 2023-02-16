import { useMemo } from "react";

import { Task } from "../Task";
import { BoxAlert } from "../BoxAlert";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./index.module.css";

export function Tasks({
  tasks,
  searchTaskName,
  onRemoveTask,
  onChangeCompletedTask,
  members,
  loggedInUserLeetcodeProfile,
}) {
  return (
    <ul className={styles.tasks}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th className={styles.easy_label}>Easy</th>
            <th className={styles.medium_label}>Medium</th>
            <th className={styles.hard_label}>Hard</th>
            <th>All</th>
            <th>Contest Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members
            .sort(
              (a, b) =>
                parseInt(b?.data?.userContestRanking?.rating) -
                parseInt(a?.data?.userContestRanking?.rating)
            )
            .map((member) => (
              <tr key={member.id}>
                <td>{member?.data?.matchedUser?.profile?.ranking}</td>
                <td>{member?.data?.matchedUser?.username}</td>
                <td>
                  {
                    member?.data?.matchedUser?.submitStatsGlobal
                      .acSubmissionNum[1].count
                  }
                </td>
                <td>
                  {
                    member?.data?.matchedUser?.submitStatsGlobal
                      .acSubmissionNum[2].count
                  }
                </td>
                <td>
                  {
                    member?.data?.matchedUser?.submitStatsGlobal
                      .acSubmissionNum[3].count
                  }
                </td>
                <td>
                  {
                    member?.data?.matchedUser?.submitStatsGlobal
                      .acSubmissionNum[0].count
                  }
                </td>
                <td>
                  {member?.data?.userContestRanking
                    ? parseInt(member?.data?.userContestRanking?.rating)
                    : null}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.task__button}
                    onClick={() => onRemoveTask(member.id)}
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </ul>
  );
}
