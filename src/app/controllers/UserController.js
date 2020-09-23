import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já existe. E-mail em uso!',
      });
    }

    const { id, name, email, administrator } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      administrator,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number(),
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const { userId, email, oldPassword } = req.body;

    const user = await User.findByPk(userId || req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          error: 'Usuário já existe. E-mail em uso!',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não corresponde' });
    }

    const { id, name, administrator, status } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      administrator,
      status,
    });
  }

  async updateStatus(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
      status: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const { userId, status } = req.body;

    const user = await User.findByPk(userId);

    const { id } = await user.update(req.body);

    return res.json({ id, status });
  }

  async show(req, res) {
    const users = await User.findAll();

    if (!users) {
      return res
        .status(401)
        .json({ error: 'Ocorreu um erro inesperado. Tente novamente!' });
    }

    return res.json(
      users.map((user) => {
        const { id, name, email, administrator, status } = user;

        return {
          id,
          name,
          email,
          administrator,
          status,
        };
      })
    );
  }
}

export default new UserController();