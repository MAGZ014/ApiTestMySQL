import z from "zod";

const clientSchema = z.object({
  nombre: z.string(),
  correo: z.string().email(),
  cuatrimestre: z.number(),
  password: z.string(),
  carrera: z.number(),
  id_rol: z.number(),
});

export function validateClient(input) {
  return clientSchema.safeParse(input);
}

export function validatePartialClient(input) {
  return clientSchema.partial().safeParse(input);
}
