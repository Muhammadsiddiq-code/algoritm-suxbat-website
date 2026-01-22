// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../config";
// import { useNavigate } from "react-router-dom";
// import "./GroupsManagement.css";

// function GroupsManagement({ teacher }) {
//   const [groups, setGroups] = useState([]);
//   const [newGroupName, setNewGroupName] = useState("");
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [newStudentName, setNewStudentName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const fetchGroups = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/teacher/groups/${teacher.id}`
//       );
//       setGroups(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const createGroup = async () => {
//     if (!newGroupName.trim()) {
//       alert("Guruh nomini kiriting!");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE_URL}/teacher/groups`, {
//         name: newGroupName,
//         teacherId: teacher.id,
//       });
//       setNewGroupName("");
//       fetchGroups();
//     } catch (error) {
//       alert("Xatolik: " + (error.response?.data?.error || "Xatolik yuz berdi"));
//     }
//   };

//   const deleteGroup = async (id) => {
//     if (
//       !window.confirm(
//         "Guruhni o'chirmoqchimisiz? Ichidagi barcha o'quvchilar ham o'chadi!"
//       )
//     )
//       return;

//     try {
//       await axios.delete(`${API_BASE_URL}/teacher/groups/${id}`);
//       fetchGroups();
//       if (selectedGroup?.id === id) {
//         setSelectedGroup(null);
//         setStudents([]);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const selectGroup = async (group) => {
//     setSelectedGroup(group);
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/teacher/students/${group.id}`
//       );
//       setStudents(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const addStudent = async () => {
//     if (!newStudentName.trim()) {
//       alert("O'quvchi ismini kiriting!");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE_URL}/teacher/students`, {
//         fullName: newStudentName,
//         groupId: selectedGroup.id,
//       });
//       setNewStudentName("");
//       selectGroup(selectedGroup);
//     } catch (error) {
//       alert("Xatolik: " + (error.response?.data?.error || "Xatolik yuz berdi"));
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("O'quvchini o'chirmoqchimisiz?")) return;

//     try {
//       await axios.delete(`${API_BASE_URL}/teacher/students/${id}`);
//       selectGroup(selectedGroup);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const viewStudentProfile = (studentId) => {
//     navigate(`/student-profile/${studentId}`);
//   };

//   const startInterview = (student, categoryId) => {
//     navigate(`/quiz/${categoryId}`, { state: { student } });
//   };

//   return (
//     <div className="groups-management">
//       <div className="groups-section">
//         <h2>📚 Guruhlar</h2>
//         <div className="create-group">
//           <input
//             type="text"
//             value={newGroupName}
//             onChange={(e) => setNewGroupName(e.target.value)}
//             placeholder="Guruh nomi (masalan: Ertalabki 10:00)"
//             onKeyPress={(e) => e.key === "Enter" && createGroup()}
//           />
//           <button onClick={createGroup}>+ Guruh yaratish</button>
//         </div>

//         <div className="groups-list">
//           {groups.length === 0 ? (
//             <p className="no-data">Hozircha guruhlar yo'q</p>
//           ) : (
//             groups.map((group) => (
//               <div
//                 key={group.id}
//                 className={`group-item ${
//                   selectedGroup?.id === group.id ? "active" : ""
//                 }`}
//               >
//                 <div onClick={() => selectGroup(group)}>
//                   <h3>{group.name}</h3>
//                   <p>{group.Students?.length || 0} ta o'quvchi</p>
//                 </div>
//                 <button
//                   className="delete-btn"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteGroup(group.id);
//                   }}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="students-section">
//         {selectedGroup ? (
//           <>
//             <h2>👥 {selectedGroup.name} - O'quvchilar</h2>

//             <div className="add-student">
//               <input
//                 type="text"
//                 value={newStudentName}
//                 onChange={(e) => setNewStudentName(e.target.value)}
//                 placeholder="O'quvchi to'liq ismi"
//                 onKeyPress={(e) => e.key === "Enter" && addStudent()}
//               />
//               <button onClick={addStudent}>+ O'quvchi qo'shish</button>
//             </div>

//             {students.length === 0 ? (
//               <p className="no-data">Bu guruhda hozircha o'quvchilar yo'q</p>
//             ) : (
//               <div className="students-grid">
//                 {students.map((student) => {
//                   const totalInterviews = student.Interviews?.length || 0;
//                   const passedCount =
//                     student.Interviews?.filter((i) => i.percentage >= 70)
//                       .length || 0;

//                   return (
//                     <div key={student.id} className="student-card">
//                       <div className="student-header">
//                         <h3>{student.fullName}</h3>
//                         <button
//                           className="profile-btn"
//                           onClick={() => viewStudentProfile(student.id)}
//                         >
//                           📊 Profil
//                         </button>
//                       </div>

//                       <div className="student-stats">
//                         <div className="stat">
//                           <span className="label">Suhbatlar:</span>
//                           <span className="value">{totalInterviews}</span>
//                         </div>
//                         <div className="stat">
//                           <span className="label">O'tdi:</span>
//                           <span className="value passed">{passedCount}</span>
//                         </div>
//                         <div className="stat">
//                           <span className="label">O'tmadi:</span>
//                           <span className="value failed">
//                             {totalInterviews - passedCount}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="student-actions">
//                         <button
//                           className="interview-btn"
//                           onClick={() =>
//                             navigate("/categories", { state: { student } })
//                           }
//                         >
//                           🎤 Suhbat qilish
//                         </button>
//                         <button
//                           className="delete-student-btn"
//                           onClick={() => deleteStudent(student.id)}
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="select-prompt">
//             <div className="prompt-icon">👈</div>
//             <h3>Guruhni tanlang</h3>
//             <p>O'quvchilarni ko'rish uchun chap tarafdan guruhni tanlang</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GroupsManagement;
















import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "./GroupsManagement.css";
import { FaHandPointLeft } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TbHttpDelete } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";

function GroupsManagement({ teacher }) {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/groups/${teacher.id}`
      );
      setGroups(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createGroup = async () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/teacher/groups`, {
        name: newGroupName,
        teacherId: teacher.id,
      });
      setNewGroupName("");
      fetchGroups();
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  const deleteGroup = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this group? All students inside will be deleted too!"
      )
    )
      return;

    try {
      await axios.delete(`${API_BASE_URL}/teacher/groups/${id}`);
      fetchGroups();
      if (selectedGroup?.id === id) {
        setSelectedGroup(null);
        setStudents([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectGroup = async (group) => {
    setSelectedGroup(group);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacher/students/${group.id}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addStudent = async () => {
    if (!newStudentName.trim()) {
      alert("Please enter the student's name!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/teacher/students`, {
        fullName: newStudentName,
        groupId: selectedGroup.id,
      });
      setNewStudentName("");
      selectGroup(selectedGroup);
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/teacher/students/${id}`);
      selectGroup(selectedGroup);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const viewStudentProfile = (studentId) => {
    navigate(`/student-profile/${studentId}`);
  };

  return (
    <div className="groups-management-layout">
      {/* Sidebar: Groups */}
      <div className="sidebar-section">
        <div className="section-header">
          <h2>Groups</h2>
          <span className="badge">{groups.length}</span>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New Group Name..."
            onKeyPress={(e) => e.key === "Enter" && createGroup()}
          />
          <button className="add-btn" onClick={createGroup}>
            <IoIosPeople />
          </button>
        </div>

        <div className="list-container">
          {groups.length === 0 ? (
            <p className="empty-state">No groups yet</p>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                className={`list-item ${
                  selectedGroup?.id === group.id ? "active" : ""
                }`}
                onClick={() => selectGroup(group)}
              >
                <div className="item-info">
                  <h3>{group.name}</h3>
                  <span>{group.Students?.length || 0} Students</span>
                </div>
                <button
                  className="icon-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteGroup(group.id);
                  }}
                  title="Delete Group"
                >
                  <TbHttpDelete />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content: Students */}
      <div className="main-section">
        {selectedGroup ? (
          <>
            <div className="main-header">
              <div>
                <h2>{selectedGroup.name}</h2>
                <p className="subtitle">Manage students and interviews</p>
              </div>
              <div className="add-student-wrapper">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Student Full Name"
                  onKeyPress={(e) => e.key === "Enter" && addStudent()}
                />
                <button className="primary-btn" onClick={addStudent}>
                  {/* + Add Student */}
                  <BsPersonFillAdd />
                </button>
              </div>
            </div>

            {students.length === 0 ? (
              <div className="empty-content">
                <div className="empty-icon">👥</div>
                <h3>No students in this group</h3>
                <p>Add a student to get started</p>
              </div>
            ) : (
              <div className="students-grid">
                {students.map((student) => {
                  const totalInterviews = student.Interviews?.length || 0;
                  const passedCount =
                    student.Interviews?.filter((i) => i.percentage >= 70)
                      .length || 0;

                  return (
                    <div key={student.id} className="student-card">
                      <div className="student-card-header">
                        <h3>{student.fullName}</h3>
                        <button
                          className="profile-link"
                          onClick={() => viewStudentProfile(student.id)}
                        >
                          {/* Profile ↗ */}
                          <CgProfile />
                        </button>
                      </div>

                      <div className="stats-row">
                        <div className="stat-box">
                          <span className="stat-label">Total</span>
                          <span className="stat-value">{totalInterviews}</span>
                        </div>
                        <div className="stat-box success">
                          <span className="stat-label">Passed</span>
                          <span className="stat-value">{passedCount}</span>
                        </div>
                        <div className="stat-box danger">
                          <span className="stat-label">Failed</span>
                          <span className="stat-value">
                            {totalInterviews - passedCount}
                          </span>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="action-btn start"
                          onClick={() =>
                            navigate("/categories", { state: { student } })
                          }
                        >
                          <MdAccessTimeFilled /> Start Interview
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <TbHttpDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="no-selection">
            <div className="illustration">
              <span className="iconsG">
                {" "}
                <FaHandPointLeft />{" "}
              </span>
            </div>
            <h2>Select a Group</h2>
            <p>Choose a group from the left sidebar to manage students</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupsManagement;