import { screen, render } from "@testing-library/react";
import { vi } from "vitest";
import { TasksPage } from "./TasksPage";

import { getTasksByUser, addTask } from "../services/taskService";

vi.mock("../services/taskService.ts");

import userEvent from "@testing-library/user-event";

describe("Testeando el componente de TaskPage", () => {
  it("Se espera encontrar el titulo de la pagina", () => {
    render(<TasksPage uid="1" />);

    const titulo = screen.getByText("Mis tareas");
    const titulo2 = screen.getByText(/mis tareas/i);

    expect(titulo).toBeDefined();
    expect(titulo2).toBeDefined();
  });

  it("Se espera encontrar el titulo de la pagina", () => {
    render(<TasksPage uid="1" />);

    const titulo = screen.getByRole("heading", { name: /mis tareas/i });

    expect(titulo).toBeDefined();
  });

  it("vamos a comprobar el funcionamiento de getTasksByUser", async () => {
    vi.mocked(getTasksByUser).mockResolvedValueOnce([
      {
        id: "1",
        completed: false,
        title: "prueba1",
        userId: "1",
      },
    ]);

    render(<TasksPage uid="1" />);

    const titulo = await screen.findByText(/prueba1/i);

    expect(titulo).toBeDefined();
  });

  it("vamos a probar que se renderiza el nuevo elemento creado con addTask", async () => {
    vi.mocked(getTasksByUser).mockResolvedValueOnce([
      {
        id: "1",
        completed: false,
        title: "prueba1",
        userId: "1",
      },
    ]);

    vi.mocked(addTask).mockResolvedValueOnce({
      id: "2",
      completed: false,
      title: "prueba2",
      userId: "1",
    });

    render(<TasksPage uid="1" />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "tarea2");
    await userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    const tituloAgregado = await screen.getByText("prueba2");

    expect(tituloAgregado).toBeDefined();
  });
});
