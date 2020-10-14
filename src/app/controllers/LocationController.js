import Locations from '../models/Locations';

class LocationController {
  async locations(req, res) {
    req.body.map(async (location) => {
      const userExists = await Locations.findOne({
        where: { email: location.email },
      });

      location.latitude = location.lat;
      location.longitude = location.lon;
      delete location.lat;
      delete location.lon;

      if (userExists) {
        const { id } = userExists;

        const userLocation = await Locations.findByPk(id);

        const { email } = await userLocation.update(location);

        if (email) req.io.emit('locations', location);

        return res.sendStatus(200);
      }

      const { id } = await Locations.create(location);

      if (id) req.io.emit('locations', location);

      return res.sendStatus(200);
    });
  }

  async sync(req, res) {
    req.body.map(async (location) => {
      const userExists = await Locations.findOne({
        where: { email: location.email },
      });

      location.latitude = location.lat;
      location.longitude = location.lon;
      delete location.lat;
      delete location.lon;

      if (userExists) {
        const { id } = userExists;

        const userLocation = await Locations.findByPk(id);

        const { email } = await userLocation.update(location);

        if (email) req.io.emit('locations', location);

        return res.sendStatus(200);
      }

      const { id } = await Locations.create(location);

      if (id) req.io.emit('locations', location);

      return res.sendStatus(200);
    });
  }

  async index(req, res) {
    const locations = await Locations.findAll();

    if (!locations) {
      return res
        .status(401)
        .json({ error: 'Ocorreu um erro inesperado. Tente novamente!' });
    }

    return res.json(
      locations.map((location) => {
        const { name, email, latitude, longitude } = location;

        return { name, email, latitude, longitude };
      })
    );
  }

  async show(req, res) {
    const userLocation = await Locations.findOne({
      where: { email: req.body.email },
    });

    if (!userLocation) {
      return res
        .status(401)
        .json({ error: 'Ocorreu um erro inesperado. Tente novamente!' });
    }

    const { name, email, latitude, longitude } = userLocation;

    return res.json({ name, email, latitude, longitude });
  }
}

export default new LocationController();
