// Clase base que define los métodos CRUD básicos
export class BaseController {
  // El constructor toma tres argumentos: el modelo de datos (para interactuar con la base de datos),
  // y dos funciones de validación (una para validación completa y otra para validación parcial).
  constructor(model, validate = null, validatePartial = null) {
    this.model = model;
    this.validate = validate;
    this.validatePartial = validatePartial;
  }
  // Método para obtener todos los elementos del modelo
  async getAll(req, res) {
    const items = await this.model.getAll();
    res.json(items);
  }

  // Método para obtener un elemento por ID
  async getById(req, res) {
    const { id } = req.params;
    const item = await this.model.getById({ id });
    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(item);
  }

  // Método para crear un nuevo elemento
  async create(req, res) {
    const result = this.validate(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newItem = await this.model.create({ input: result.data });
    res.status(201).json(newItem);
  }

  // Método para eliminar un elemento por ID
  async delete(req, res) {
    const { id } = req.params;
    const result = await this.model.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ message: "Deleted" });
  }

  // Método para actualizar un elemento por ID
  async update(req, res) {
    const result = this.validatePartial(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedItem = await this.model.update({ id, input: result.data });
    return res.json(updatedItem);
  }
}
