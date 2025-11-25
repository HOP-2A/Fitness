import Link from "next/link";
import React from "react";

const TeacherDashboard = ({ teacher = { name: "Zolbayar" } }) => {
  const stats = [
    { title: "Active Students", value: 42, subtitle: "+3 this week" },
    { title: "Avg. Weekly Workouts", value: 4.3, subtitle: "per student" },
    { title: "Avg. Progress", value: "+6%", subtitle: "since last month" },
    { title: "Pending Reviews", value: 5, subtitle: "forms to grade" },
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
          <div className="grid grid-cols-4 gap-4 mb-4">
            {stats.map((s) => (
              <div key={s.title} className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-xs text-gray-500">{s.title}</div>
                <div className="text-2xl font-bold mt-1">{s.value}</div>
                <div className="text-sm text-green-600 mt-2">{s.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-semibold mb-2">Team progress</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">
              [Chart placeholder — integrate recharts/D3]
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
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

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold mb-2">Recent activity</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Nov 25 — Anu completed Cardio Blast</li>
              <li>Nov 24 — Bataa submitted progress form</li>
              <li>Nov 23 — New student Ene joined</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h4 className="font-semibold mb-2">Todo List</h4>
            <textarea
              className="w-full h-24 p-2 border rounded-md"
              placeholder="Write task here"
            ></textarea>
            <div className="mt-2 text-right">
              <button className="px-3 py-1 rounded-md bg-green-600 text-white">
                Save
              </button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="mt-6 text-xs text-gray-500">
        Need more features? Add CSV export, class templates, or automated
        emails.
      </footer>
    </div>
  );
};

export default TeacherDashboard;
