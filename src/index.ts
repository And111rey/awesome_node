import express from "express";
import { url } from "inspector";
const app = express();
const port = 3000;

const db = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "basic QA" },
  ],
};

app.get("/courses", (req, res) => {
  let filteredCourses = db.courses;
  if (req.query.title) {
    filteredCourses = db.courses.filter(
      (el) => el.title.indexOf(req.query.title as string) > -1
    );
  }
  res.json(filteredCourses);
});
app.get("/courses/:id", (req, res) => {
  console.log("QUERY----", req.params.id);
  const foundCourse = db.courses.find((el) => el.id === +req.params.id);
  console.log(foundCourse);
  if (!foundCourse) {
    res.sendStatus(404);
    return;
  }
  res.json(foundCourse);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
