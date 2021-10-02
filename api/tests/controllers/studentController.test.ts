import app from "..";
import supertest from "supertest";
import { StatusCodes } from "http-status-codes";

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update a existent student", async () => {
    const studentToUpdate = {
      id: 1,
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.body).toMatchObject({ ...studentToUpdate }));
  });
  it("shouldnt update a existent student if id is null", async () => {
    const studentToUpdate = {
      id: null,
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST));
  });

  it("shouldnt update a existent student if the object is invalid", async () => {
    const studentToUpdate = {
      id: '2',
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      test: 'hv'
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.PARTIAL_CONTENT));
  });


  it("should delete a existent student", async () => {
    const studentIdToDelete = {
      id: 1,
    };

    await supertest(app)
      .delete("/students/delete")
      .send(studentIdToDelete)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.ACCEPTED));
  });
  it("should'nt perfom database delete if id is null", async () => {
    const studentIdToDelete = {
      id: null,
    };


    await supertest(app)
      .put("/students/delete")
      .send(studentIdToDelete)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR));
  });
});


