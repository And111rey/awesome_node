import express from "express";
import { url } from "inspector";
const app = express();
const port = 3000;

const HTTP_STATUSES ={
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,


}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

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
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourse);
});

app.post("/courses", (req, res) => {
  if(!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return 
  }
  let createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  res.status(200).json(db.courses)

  
});

app.delete("/courses/:id", (req, res) => {
  console.log("QUERY----", req.params.id);
  db.courses = db.courses.filter((el) => el.id !== +req.params.id);
 
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req, res) => {
  if(!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return 
  }
  console.log("QUERY----", req.params.id);
  const foundCourse = db.courses.find((el) => el.id === +req.params.id);
  console.log(foundCourse);

  
  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  foundCourse.title = req.body.title
  res.json(foundCourse)
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
