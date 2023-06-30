import "./App.scss";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ViewSubmission from "./components/ViewSubmission";
import NewSubmission from "./components/NewSubmission";
import EditSubmission from "./components/EditSubmission";
import Submission from "./components/Submission";
import Submissions from "./components/Submissions";
import { submissionsData } from "./data/submissions";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Types } from "./components/Submission/types";

const App = () => {
  const [data, setData] = useState<Types.Submission[]>(
    JSON.parse(localStorage.getItem("submissions") as string)
  );

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissionsData));
    setData(JSON.parse(localStorage.getItem("submissions") as string));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Submissions data={data} setData={setData} />
                  <div
                    style={{
                      marginTop: "3.75rem",
                      paddingLeft: "9.375rem",
                      paddingRight: "8.375rem",
                      paddingBottom: "9.375rem",
                      display: "flex",
                      gap: "1.9rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {data?.map((submission) => (
                      <Submission key={submission.id} submission={submission} />
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/view/:id"
              element={<ViewSubmission data={data} setData={setData} />}
            />
            <Route path="/add" element={<NewSubmission setData={setData} />} />
            <Route
              path="/edit/:id"
              element={<EditSubmission data={data} setData={setData} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
