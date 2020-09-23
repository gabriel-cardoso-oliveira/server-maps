class LocationController {
  async locations(req, res) {
    console.log('Headers:\n', req.headers);
    console.log('Locations:\n', req.body);
    console.log('------------------------------');

    req.io.emit('locations', req.body);

    res.sendStatus(200);
  }

  async sync(req, res) {
    console.log('Headers:\n', req.headers);
    console.log('Synced Locations:\n', req.body);
    console.log('------------------------------');

    req.io.emit('locations', req.body);

    res.sendStatus(200);
  }
}

export default new LocationController();
