"use client";

import Link from "next/link";
import TodoList from "./TodoList"; // TodoList.jsx-ийг import хийж байна

const TeacherDashboard = ({ teacher = { id: "T001", name: "Zolbayar" } }) => {
  const upcoming = [
    {
      id: 1,
      title: "Strength Circuit",
      time: "Nov 26, 2025 — 10:00 AM",
      students: 12,
    },
    {
      id: 2,
      title: "Swim Technique",
      time: "Nov 27, 2025 — 4:30 PM",
      students: 8,
    },
  ];

  const students = [
    { id: "S001", name: "Anu", lastWorkout: "Nov 24", progress: "+8%" },
    // { id: "S002", name: "Bataa", lastWorkout: "Nov 23", progress: "+2%" },ednariig hard code bish backend deer bga dasgaliin haruuldag bolgo
    { id: "S003", name: "Chin", lastWorkout: "Nov 25", progress: "-1%" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {teacher.name}
          </h1>
          <p className="text-sm text-gray-600">
            Teacher dashboard • Fitness Track
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border">Quick actions</button>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            TZ
          </div>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        <section className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-semibold mb-3">Upcoming sessions</h3>
            <ul className="space-y-3">
              {upcoming.map((u) => (
                <li key={u.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{u.title}</div>
                    <div className="text-sm text-gray-500">
                      {u.time} • {u.students} students
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-md border">
                      View
                    </button>
                    <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                      Start
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Students</h4>
              <Link href={"/teacher/exercise"}>
                <button className="text-sm px-4 py-2 rounded-lg border">
                  Give exercises
                </button>
              </Link>
              <button className="text-sm">See all</button>
            </div>
            <div className="space-y-3">
              {students.map((st) => (
                <div key={st.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{st.name}</div>
                    <div className="text-xs text-gray-500">
                      Last workout: {st.lastWorkout}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{st.progress}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold mb-2">Todo List</h4>
            <TodoList teacherId={teacher.id} />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TeacherDashboard;

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import TodoList from "./TodoList";

// const TeacherDashboard = ({ teacherId }) => {
//   const [teacher, setTeacher] = useState(null);
//   const [upcoming, setUpcoming] = useState([]);
//   const [students, setStudents] = useState([]);

//   // Load teacher info
//   useEffect(() => {
//     const fetchTeacher = async () => {
//       try {
//         const res = await fetch(`/api/teacher/${teacherId}`);
//         const data = await res.json();
//         setTeacher(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTeacher();
//   }, [teacherId]);

//   // Load upcoming sessions
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await fetch(`/api/sessions?teacherId=${teacherId}`);
//         const data = await res.json();
//         setUpcoming(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchSessions();
//   }, [teacherId]);

//   // Load students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch(`/api/students?teacherId=${teacherId}`);
//         const data = await res.json();
//         setStudents(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStudents();
//   }, [teacherId]);

//   if (!teacher) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <header className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">
//             Welcome back, {teacher.name}
//           </h1>
//           <p className="text-sm text-gray-600">
//             Teacher dashboard • Fitness Track
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="px-4 py-2 rounded-lg border">Quick actions</button>
//           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
//             {teacher.name
//               .split(" ")
//               .map((n) => n[0])
//               .join("")}
//           </div>
//         </div>
//       </header>

//       <main className="grid grid-cols-12 gap-6">
//         <section className="col-span-8">
//           <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
//             <h3 className="font-semibold mb-3">Upcoming sessions</h3>
//             <ul className="space-y-3">
//               {upcoming.map((u) => (
//                 <li key={u.id} className="flex items-center justify-between">
//                   <div>
//                     <div className="font-medium">{u.title}</div>
//                     <div className="text-sm text-gray-500">
//                       {new Date(u.time).toLocaleString()} • {u.students}{" "}
//                       students
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1 rounded-md border">
//                       View
//                     </button>
//                     <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
//                       Start
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         <aside className="col-span-4 space-y-4">
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h4 className="font-semibold">Students</h4>
//               <Link href={"/teacher/exercise"}>
//                 <button className="text-sm px-4 py-2 rounded-lg border">
//                   Give exercises
//                 </button>
//               </Link>
//               <button className="text-sm">See all</button>
//             </div>
//             <div className="space-y-3">
//               {students.map((st) => (
//                 <div key={st.id} className="flex items-center justify-between">
//                   <div>
//                     <div className="font-medium">{st.name}</div>
//                     <div className="text-xs text-gray-500">
//                       Last workout: {st.lastWorkout}
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-700">{st.progress}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Todo List */}
//           <div className="bg-white rounded-xl shadow-sm p-4">
//             <h4 className="font-semibold mb-2">Todo List</h4>
//             <TodoList teacherId={teacherId} />
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// };

// export default TeacherDashboard;
