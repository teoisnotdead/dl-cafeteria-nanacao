const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  test("GET /cafes devuelve un status code 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("nombre");
  });

  test("DELETE /cafes/:id devuelve 404 si el id no existe", async () => {
    const nonExistentId = 999;
    const response = await request(server).delete(`/cafes/${nonExistentId}`).set("Authorization", "token-valido");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "No se encontró ningún cafe con ese id");
  });
});
